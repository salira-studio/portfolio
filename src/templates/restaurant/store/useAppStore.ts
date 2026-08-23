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
} from '../../../shared/types/domain'
import { menuItems as seedMenu, categories as seedCategories } from '../data/menu'
import { restaurant as seedRestaurant } from '../data/seed'

/* ── Cross-tab live sync ─────────────────────────────────────────────
   The customer PWA and restaurant console may run side-by-side in
   separate windows/tabs. Every mutation mirrors through localStorage +
   BroadcastChannel so both surfaces stay in lockstep during demos.  */
const SYNC_KEY = 'aura-app-store-v2'
let applyingRemote = false
const syncChannel =
  typeof window !== 'undefined' && typeof BroadcastChannel !== 'undefined'
    ? new BroadcastChannel('aura-demo-sync-v2')
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

interface AppState {
  restaurant: Restaurant
  categories: Category[]
  menuItems: MenuItem[]
  customers: Customer[]
  orders: Order[]
  cart: CartItem[]
  cartFulfilment: FulfilmentType
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
  setCartAddress: (a: string) => void
  setCartContact: (c: { name: string; phone: string; email: string }) => void
  setCartPaymentMethod: (m: string) => void

  placeOrder: (notes?: string) => Order | null
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  setActiveOrder: (id: string | null) => void
  resetDemo: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      restaurant: seedRestaurant,
      categories: seedCategories,
      menuItems: seedMenu,
      customers: [],
      orders: [],
      cart: [],
      cartFulfilment: 'delivery' as FulfilmentType,
      cartAddress: '',
      cartContact: {
        name: '',
        phone: '',
        email: '',
      },
      cartPaymentMethod: 'UPI',
      orderSeq: 4821,
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
      setCartAddress: (a) => set({ cartAddress: a }),
      setCartContact: (c) => set({ cartContact: c }),
      setCartPaymentMethod: (m) => set({ cartPaymentMethod: m }),

      placeOrder: (notes = '') => {
        const s = get()
        if (s.cart.length === 0) return null

        const subtotal = s.cart.reduce((sum, c) => sum + c.price * c.quantity, 0)
        const deliveryFee =
          s.cartFulfilment === 'delivery' ? s.restaurant.deliveryFee : 0
        const tax = Math.round(subtotal * s.restaurant.taxRate)
        const total = subtotal + deliveryFee + tax
        const now = new Date().toISOString()
        const num = `A${s.orderSeq}`
        const customerName = s.cartContact.name.trim() || 'Guest Diner'

        const order: Order = {
          id: `ord-${Date.now()}`,
          orderNumber: num,
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
          address: s.cartFulfilment === 'delivery' ? s.cartAddress : '',
          contact: {
            name: customerName,
            phone: s.cartContact.phone || '+91 98765 00000',
            email: s.cartContact.email || 'guest@aura.kitchen',
          },
          paymentMethod: s.cartPaymentMethod,
          paymentStatus: s.cartPaymentMethod === 'Cash on Delivery' ? 'cod' : 'paid',
          subtotal,
          deliveryFee,
          tax,
          total,
          notes,
          createdAt: now,
          updatedAt: now,
        }

        const newSeq = s.orderSeq + 1
        const updatedOrders = [order, ...s.orders]

        set({
          orders: updatedOrders,
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

      resetDemo: () => {
        const resetState = {
          menuItems: seedMenu.map((m) => ({ ...m })),
          orders: [],
          customers: [],
          cart: [],
          cartFulfilment: 'delivery' as FulfilmentType,
          cartAddress: '',
          cartContact: {
            name: '',
            phone: '',
            email: '',
          },
          cartPaymentMethod: 'UPI',
          orderSeq: 4821,
          activeOrderId: null,
        }
        set(resetState)
      },
    }),
    {
      name: SYNC_KEY,
      storage: createJSONStorage(() => syncStorage),
      partialize: (state) => ({
        menuItems: state.menuItems,
        orders: state.orders,
        customers: state.customers,
        cart: state.cart,
        cartFulfilment: state.cartFulfilment,
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
        // If state was wrapped in persist { state: ... } or raw object
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
