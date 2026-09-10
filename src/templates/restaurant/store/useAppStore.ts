import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type {
  MenuItem,
  Category,
  CartItem,
  Order,
  Customer,
  Restaurant,
  OrderStatus,
  FulfilmentType,
  SelectedOption,
  Expense,
} from '../../../shared/types/domain'
import { menuItems as seedMenu, categories as seedCategories } from '../data/menu'
import { restaurant as seedRestaurant } from '../data/seed'

/* ── Cross-tab live sync ─────────────────────────────────────────────
   The customer PWA and restaurant console may run side-by-side in
   separate windows/tabs. Every mutation mirrors through localStorage +
   BroadcastChannel so both surfaces stay in lockstep during demos.  */
const SYNC_KEY = 'annachis-app-store-v2'
let applyingRemote = false
const syncChannel =
  typeof window !== 'undefined' && typeof BroadcastChannel !== 'undefined'
    ? new BroadcastChannel('annachis-demo-sync-v2')
    : null

function mirrorWrite(value: string) {
  try {
    localStorage.setItem(SYNC_KEY, value)
  } catch {
    /* storage unavailable */
  }
  if (!applyingRemote && syncChannel) {
    try {
      syncChannel.postMessage(value)
    } catch {
      /* ignore channel error */
    }
  }
}

const syncStorage = {
  getItem: (name: string) => {
    try {
      return localStorage.getItem(name)
    } catch {
      return null
    }
  },
  setItem: (name: string, value: string) => {
    if (name === SYNC_KEY) mirrorWrite(value)
    else {
      try {
        localStorage.setItem(name, value)
      } catch {
        /* storage full or unavailable */
      }
    }
  },
  removeItem: (name: string) => {
    try {
      localStorage.removeItem(name)
    } catch {
      /* ignore */
    }
  },
}

/**
 * Computes category-aware dish code for order numbering,
 * e.g. VEGDOSA, NVBIRYANI, VEGTIFFIN, VEGMEALS, VEGBEV, NVSTARTER
 */
export function computeOrderCategoryCode(cart: CartItem[], menuItems: MenuItem[]): string {
  if (cart.length === 0) return 'GENERAL'

  let hasVeg = false
  let hasNonVeg = false
  const categoryQuantities: Record<string, number> = {}

  for (const item of cart) {
    const menuItem = menuItems.find((m) => m.id === item.menuItemId)
    const isVeg = menuItem?.tags?.includes('veg') ?? true
    if (isVeg) hasVeg = true
    else hasNonVeg = true

    const cat = (menuItem?.category || 'tiffin').toLowerCase()
    categoryQuantities[cat] = (categoryQuantities[cat] || 0) + item.quantity
  }

  // Diet indicator: VEG, NV, or MIX
  const diet = hasNonVeg && hasVeg ? 'MIX' : hasNonVeg ? 'NV' : 'VEG'

  // Pick top category by quantity ordered
  const sorted = Object.entries(categoryQuantities).sort((a, b) => b[1] - a[1])
  const primaryCat = sorted[0]?.[0] || 'tiffin'

  let catCode = 'TIFFIN'
  if (primaryCat.includes('dosa')) catCode = 'DOSA'
  else if (primaryCat.includes('tiffin')) catCode = 'TIFFIN'
  else if (primaryCat.includes('meal')) catCode = 'MEALS'
  else if (primaryCat.includes('biryani')) catCode = 'BIRYANI'
  else if (primaryCat.includes('starter')) catCode = 'STARTER'
  else if (primaryCat.includes('drink') || primaryCat.includes('bev')) catCode = 'BEV'
  else if (primaryCat.includes('sweet') || primaryCat.includes('dessert')) catCode = 'SWEET'

  return `${diet}${catCode}`
}

/**
 * Generates an order number in format #AN-<CATEGORY>-<DATE>-<SEQ>
 * e.g. #AN-VEGDOSA-260910-101
 */
export function generateOrderNumber(
  cart: CartItem[],
  menuItems: MenuItem[],
  seq: number,
  date: Date = new Date(),
): string {
  const catTag = computeOrderCategoryCode(cart, menuItems)
  const yy = String(date.getFullYear()).slice(-2)
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const dateStr = `${yy}${mm}${dd}`
  const seqStr = String(seq).padStart(3, '0')

  return `#AN-${catTag}-${dateStr}-${seqStr}`
}

interface AppState {
  restaurant: Restaurant
  categories: Category[]
  menuItems: MenuItem[]
  customers: Customer[]
  orders: Order[]
  expenses: Expense[]
  cart: CartItem[]
  cartFulfilment: FulfilmentType
  cartTableNumber: string
  cartAddress: string
  cartContact: { name: string; phone: string; email: string }
  cartPaymentMethod: string
  orderSeq: number
  activeOrderId: string | null

  toggleAvailability: (itemId: string) => void
  updateMenuPrice: (itemId: string, price: number) => void

  addToCart: (
    item: MenuItem,
    quantity: number,
    selectedOptions: SelectedOption[],
  ) => void
  updateCartQty: (cartItemId: string, qty: number) => void
  removeFromCart: (cartItemId: string) => void
  clearCart: () => void
  setCartFulfilment: (f: FulfilmentType) => void
  setCartTableNumber: (table: string) => void
  setCartAddress: (a: string) => void
  setCartContact: (c: { name: string; phone: string; email: string }) => void
  setCartPaymentMethod: (m: string) => void

  placeOrder: (notes?: string) => Order | null
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  setActiveOrder: (id: string | null) => void

  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void
  deleteExpense: (id: string) => void

  resetDemo: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      restaurant: seedRestaurant,
      categories: seedCategories,
      menuItems: seedMenu,
      customers: [], // Clean state: no pre-seeded mock customers
      orders: [], // Clean state: no pre-seeded mock orders
      expenses: [], // Clean state: no pre-seeded mock expenses
      cart: [],
      cartFulfilment: 'dine-in' as FulfilmentType,
      cartTableNumber: 'Table 01',
      cartAddress: '',
      cartContact: {
        name: '',
        phone: '',
        email: '',
      },
      cartPaymentMethod: 'UPI',
      orderSeq: 101,
      activeOrderId: null,

      setActiveOrder: (id) => set({ activeOrderId: id }),

      toggleAvailability: (itemId) => {
        set((s) => ({
          menuItems: s.menuItems.map((m) =>
            m.id === itemId ? { ...m, available: !m.available } : m,
          ),
        }))
      },

      updateMenuPrice: (itemId, price) => {
        set((s) => ({
          menuItems: s.menuItems.map((m) =>
            m.id === itemId ? { ...m, price } : m,
          ),
        }))
      },

      addToCart: (item, quantity, selectedOptions) => {
        const extrasTotal = selectedOptions.reduce((sum, so) => {
          const group = item.optionGroups.find((g) => g.id === so.groupId)
          const opt = group?.options.find((o) => o.id === so.optionId)
          return sum + (opt?.priceDelta ?? 0)
        }, 0)

        const linePrice = item.price + extrasTotal
        const id = `cart-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
        const cartItem: CartItem = {
          id,
          menuItemId: item.id,
          name: item.name,
          price: linePrice,
          quantity,
          selectedOptions,
          image: item.image,
        }
        set((s) => ({ cart: [...s.cart, cartItem] }))
      },

      updateCartQty: (cartItemId, qty) =>
        set((s) => ({
          cart:
            qty <= 0
              ? s.cart.filter((c) => c.id !== cartItemId)
              : s.cart.map((c) =>
                  c.id === cartItemId ? { ...c, quantity: qty } : c,
                ),
        })),

      removeFromCart: (cartItemId) =>
        set((s) => ({ cart: s.cart.filter((c) => c.id !== cartItemId) })),

      clearCart: () => set({ cart: [] }),

      setCartFulfilment: (f) => set({ cartFulfilment: f }),
      setCartTableNumber: (table) => set({ cartTableNumber: table }),
      setCartAddress: (a) => set({ cartAddress: a }),
      setCartContact: (c) => set({ cartContact: c }),
      setCartPaymentMethod: (m) => set({ cartPaymentMethod: m }),

      placeOrder: (notes = '') => {
        const s = get()
        if (s.cart.length === 0) return null

        const subtotal = s.cart.reduce((sum, c) => sum + c.price * c.quantity, 0)
        const deliveryFee =
          s.cartFulfilment === 'delivery' ? s.restaurant.deliveryFee : 0
        const parcelPackCharge =
          s.cartFulfilment === 'takeaway' ? 20 : 0
        const tax = Math.round(subtotal * s.restaurant.taxRate)
        const total = subtotal + deliveryFee + parcelPackCharge + tax
        const now = new Date().toISOString()
        const orderNum = generateOrderNumber(s.cart, s.menuItems, s.orderSeq, new Date())
        const customerName = s.cartContact.name.trim() || 'Guest Diner'

        const order: Order = {
          id: `ord-${Date.now()}`,
          orderNumber: orderNum,
          customerId: `cust-${Date.now()}`,
          customerName,
          items: s.cart.map((c) => ({
            id: `oi-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            menuItemId: c.menuItemId,
            name: c.name,
            price: c.price,
            quantity: c.quantity,
            selectedOptions: c.selectedOptions,
            subtotal: c.price * c.quantity,
          })),
          status: 'NEW',
          fulfilment: s.cartFulfilment,
          tableNumber: s.cartFulfilment === 'dine-in' ? (s.cartTableNumber || 'Table 01') : undefined,
          address: s.cartFulfilment === 'delivery' ? s.cartAddress : '',
          contact: {
            name: customerName,
            phone: s.cartContact.phone || '+91 98765 00000',
            email: s.cartContact.email || 'guest@annachis.in',
          },
          paymentMethod: s.cartPaymentMethod,
          paymentStatus: s.cartPaymentMethod === 'Cash on Delivery' ? 'cod' : 'paid',
          subtotal,
          deliveryFee,
          parcelPackCharge,
          tax,
          total,
          notes,
          createdAt: now,
          updatedAt: now,
        }

        const newSeq = s.orderSeq + 1
        const updatedOrders = [order, ...s.orders]

        // Dynamically track customer in customer list
        const existingIdx = s.customers.findIndex(
          (c) =>
            (c.phone && c.phone === s.cartContact.phone) ||
            (c.email && c.email === s.cartContact.email),
        )
        let updatedCustomers: Customer[]
        if (existingIdx >= 0) {
          updatedCustomers = s.customers.map((c, idx) =>
            idx === existingIdx
              ? {
                  ...c,
                  name: customerName,
                  totalOrders: c.totalOrders + 1,
                  totalSpent: c.totalSpent + total,
                }
              : c,
          )
        } else {
          updatedCustomers = [
            ...s.customers,
            {
              id: `cust-${Date.now()}`,
              name: customerName,
              email: s.cartContact.email || 'guest@annachis.in',
              phone: s.cartContact.phone || '+91 98765 00000',
              address:
                s.cartFulfilment === 'delivery'
                  ? s.cartAddress
                  : s.cartFulfilment === 'dine-in'
                  ? `Dine-In (${s.cartTableNumber || 'Table 01'})`
                  : 'Takeaway (Parcel)',
              totalOrders: 1,
              totalSpent: total,
            },
          ]
        }

        set({
          orders: updatedOrders,
          customers: updatedCustomers,
          cart: [],
          orderSeq: newSeq,
          activeOrderId: order.id,
        })

        return order
      },

      updateOrderStatus: (orderId, status) => {
        const now = new Date().toISOString()
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === orderId ? { ...o, status, updatedAt: now } : o,
          ),
        }))
      },

      addExpense: (expenseData) => {
        const newExpense: Expense = {
          ...expenseData,
          id: `exp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          createdAt: new Date().toISOString(),
        }
        set((s) => ({ expenses: [newExpense, ...s.expenses] }))
      },

      deleteExpense: (id) => {
        set((s) => ({ expenses: s.expenses.filter((e) => e.id !== id) }))
      },

      resetDemo: () => {
        const resetState = {
          menuItems: seedMenu.map((m) => ({ ...m })),
          orders: [],
          customers: [],
          expenses: [],
          cart: [],
          cartFulfilment: 'dine-in' as FulfilmentType,
          cartTableNumber: 'Table 01',
          cartAddress: '',
          cartContact: {
            name: '',
            phone: '',
            email: '',
          },
          cartPaymentMethod: 'UPI',
          orderSeq: 101,
          activeOrderId: null,
        }
        set(resetState)
      },
    }),
    {
      name: SYNC_KEY,
      storage: createJSONStorage(() => syncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (!state.orders) state.orders = []
          if (!state.customers) state.customers = []
          if (!state.expenses) state.expenses = []
        }
      },
      partialize: (state) => ({
        menuItems: state.menuItems,
        orders: state.orders,
        customers: state.customers,
        expenses: state.expenses,
        cart: state.cart,
        cartFulfilment: state.cartFulfilment,
        cartTableNumber: state.cartTableNumber,
        cartAddress: state.cartAddress,
        cartContact: state.cartContact,
        cartPaymentMethod: state.cartPaymentMethod,
        orderSeq: state.orderSeq,
        activeOrderId: state.activeOrderId,
      }),
    },
  ),
)

/* Apply state arriving from another window/tab */
if (syncChannel) {
  syncChannel.onmessage = (e: MessageEvent<string>) => {
    applyingRemote = true
    try {
      const parsed = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
      if (parsed) {
        const nextState = parsed.state ?? parsed
        useAppStore.setState(nextState)
      }
    } catch {
      /* ignore malformed payloads */
    } finally {
      applyingRemote = false
    }
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === SYNC_KEY && e.newValue) {
      applyingRemote = true
      try {
        const parsed = JSON.parse(e.newValue)
        const nextState = parsed.state ?? parsed
        useAppStore.setState(nextState)
      } catch {
        /* ignore */
      } finally {
        applyingRemote = false
      }
    }
  })
}
