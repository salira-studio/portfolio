import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Truck,
  Store,
  ShieldCheck,
  UtensilsCrossed,
} from 'lucide-react'
import { CUSTOMER_BASE } from '../../routes'
import { useAppStore } from '../../store/useAppStore'
import { FoodImage } from '../../../../shared/components/ui/FoodImage'
import { formatPrice } from '../../../../shared/lib/format'

const TABLES = Array.from({ length: 20 }, (_, i) => `Table ${String(i + 1).padStart(2, '0')}`)

export default function Cart() {
  const navigate = useNavigate()
  const cart = useAppStore((s) => s.cart)
  const menuItems = useAppStore((s) => s.menuItems)
  const updateCartQty = useAppStore((s) => s.updateCartQty)
  const removeFromCart = useAppStore((s) => s.removeFromCart)
  const fulfilment = useAppStore((s) => s.cartFulfilment)
  const setFulfilment = useAppStore((s) => s.setCartFulfilment)
  const tableNumber = useAppStore((s) => s.cartTableNumber)
  const setTableNumber = useAppStore((s) => s.setCartTableNumber)
  const restaurant = useAppStore((s) => s.restaurant)

  const subtotal = cart.reduce((sum, c) => sum + c.price * c.quantity, 0)
  const deliveryFee = fulfilment === 'delivery' ? restaurant.deliveryFee : 0
  const parcelPackCharge = fulfilment === 'takeaway' ? 20 : 0
  const tax = Math.round(subtotal * restaurant.taxRate)
  const total = subtotal + deliveryFee + parcelPackCharge + tax

  function optionLabel(menuItemId: string, groupId: string, optionId: string) {
    const item = menuItems.find((m) => m.id === menuItemId)
    const group = item?.optionGroups.find((g) => g.id === groupId)
    const opt = group?.options.find((o) => o.id === optionId)
    return opt?.name ?? optionId
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-[var(--color-ivory-100)] flex items-center justify-center text-[var(--color-cocoa-300)] mb-4 border border-[var(--color-line)]">
          <ShoppingBag size={36} strokeWidth={1.5} />
        </div>
        <h2 className="font-display text-2xl font-bold text-[var(--color-espresso-900)] mb-2">
          Your Bag is Empty
        </h2>
        <p className="text-sm text-[var(--color-cocoa-400)] mb-8 leading-relaxed">
          Looks like you haven't added any South Indian specialties to your order yet.
        </p>
        <Link
          to={`${CUSTOMER_BASE}/menu`}
          className="inline-flex items-center gap-2 bg-[var(--color-clay-500)] text-[#13294B] px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-[var(--color-clay-600)] transition-all shadow-sm"
        >
          <span>Explore the Menu</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-ivory-50)] py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Title */}
        <div className="flex items-baseline justify-between border-b border-[var(--color-line-light)] pb-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-espresso-900)]">
              Your Order
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-cocoa-400)] mt-0.5">
              Review dishes and choose your dining preferences
            </p>
          </div>
          <Link
            to={`${CUSTOMER_BASE}/menu`}
            className="text-xs sm:text-sm font-semibold text-[var(--color-clay-500)] hover:text-[var(--color-clay-600)] flex items-center gap-1"
          >
            <Plus size={14} />
            <span>Add more dishes</span>
          </Link>
        </div>

        {/* Responsive Desktop 2-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Items List + Fulfilment Selector */}
          <div className="lg:col-span-8 space-y-6">
            {/* Fulfilment Toggle Card */}
            <div className="bg-white rounded-2xl p-5 border border-[var(--color-line)] shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-cocoa-400)] block">
                Dining & Delivery Mode
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setFulfilment('dine-in')}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                    fulfilment === 'dine-in'
                      ? 'bg-[var(--color-espresso-900)] text-white border-[var(--color-espresso-900)] shadow-sm'
                      : 'bg-white text-[var(--color-espresso-800)] border-[var(--color-line)] hover:bg-[var(--color-ivory-50)]'
                  }`}
                >
                  <UtensilsCrossed size={16} />
                  <span>Dine-In (Table)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFulfilment('takeaway')}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                    fulfilment === 'takeaway'
                      ? 'bg-[var(--color-espresso-900)] text-white border-[var(--color-espresso-900)] shadow-sm'
                      : 'bg-white text-[var(--color-espresso-800)] border-[var(--color-line)] hover:bg-[var(--color-ivory-50)]'
                  }`}
                >
                  <Store size={16} />
                  <span>Takeaway (Parcel)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFulfilment('delivery')}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                    fulfilment === 'delivery'
                      ? 'bg-[var(--color-espresso-900)] text-white border-[var(--color-espresso-900)] shadow-sm'
                      : 'bg-white text-[var(--color-espresso-800)] border-[var(--color-line)] hover:bg-[var(--color-ivory-50)]'
                  }`}
                >
                  <Truck size={16} />
                  <span>Doorstep Delivery</span>
                </button>
              </div>

              {/* Table Selector if Dine-In */}
              {fulfilment === 'dine-in' && (
                <div className="pt-2 border-t border-[var(--color-line-light)]">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-[var(--color-espresso-900)]">
                      Select Table Number
                    </label>
                    <span className="text-xs text-[var(--color-clay-600)] font-medium">
                      Selected: {tableNumber || 'Table 01'}
                    </span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {TABLES.map((tbl) => (
                      <button
                        key={tbl}
                        type="button"
                        onClick={() => setTableNumber(tbl)}
                        className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                          tableNumber === tbl
                            ? 'bg-[var(--color-clay-500)] text-[#13294B] border-[var(--color-clay-500)]'
                            : 'bg-[var(--color-ivory-50)] text-[var(--color-espresso-800)] border-[var(--color-line)] hover:bg-white'
                        }`}
                      >
                        {tbl}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {fulfilment === 'takeaway' && (
                <p className="text-xs text-[var(--color-cocoa-400)] pt-1">
                  Freshly packed in eco-friendly banana leaf containers. Ready at express counter in 15 mins (+₹20 parcel fee).
                </p>
              )}

              {fulfilment === 'delivery' && (
                <p className="text-xs text-[var(--color-cocoa-400)] pt-1">
                  Hot dispatch right to your doorstep across Karunya Nagar & Alandurai (+₹30 delivery fee).
                </p>
              )}
            </div>

            {/* Cart Items List */}
            <div className="space-y-3">
              <AnimatePresence>
                {cart.map((ci) => (
                  <motion.div
                    key={ci.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-[var(--color-line)] shadow-xs hover:border-[var(--color-line-dark)] transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-[var(--color-ivory-100)] border border-[var(--color-line-light)]">
                        <FoodImage
                          src={ci.image}
                          alt={ci.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display font-semibold text-base sm:text-lg text-[var(--color-espresso-900)] truncate">
                          {ci.name}
                        </h3>
                        {ci.selectedOptions.length > 0 && (
                          <p className="text-xs text-[var(--color-cocoa-400)] mt-0.5 line-clamp-1">
                            {ci.selectedOptions
                              .map((so) =>
                                optionLabel(ci.menuItemId, so.groupId, so.optionId),
                              )
                              .join(' · ')}
                          </p>
                        )}
                        <p className="text-xs font-semibold text-[var(--color-clay-600)] mt-1">
                          {formatPrice(ci.price)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--color-line-light)]">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-[var(--color-ivory-100)] rounded-xl p-1 border border-[var(--color-line-light)]">
                        <button
                          onClick={() => updateCartQty(ci.id, ci.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center text-[var(--color-espresso-900)] hover:bg-[var(--color-ivory-50)]"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="text-sm font-bold w-6 text-center text-[var(--color-espresso-900)]">
                          {ci.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQty(ci.id, ci.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center text-[var(--color-espresso-900)] hover:bg-[var(--color-ivory-50)]"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="font-display font-bold text-base text-[var(--color-espresso-900)] min-w-[70px] text-right">
                        {formatPrice(ci.price * ci.quantity)}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(ci.id)}
                        className="text-[var(--color-cocoa-300)] hover:text-red-600 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column (4 cols): Order Summary Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 border border-[var(--color-line)] shadow-xs space-y-5 sticky top-24">
              <h2 className="font-display text-lg font-bold text-[var(--color-espresso-900)] pb-3 border-b border-[var(--color-line-light)]">
                Bill Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[var(--color-cocoa-500)]">
                  <span>Item Subtotal ({cart.length} items)</span>
                  <span className="font-medium text-[var(--color-espresso-900)]">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-[var(--color-cocoa-500)]">
                  <span>
                    {fulfilment === 'dine-in'
                      ? `Dine-In (${tableNumber || 'Table 01'})`
                      : fulfilment === 'takeaway'
                      ? 'Parcel Packaging'
                      : 'Delivery Fee'}
                  </span>
                  <span className="font-medium text-[var(--color-espresso-900)]">
                    {fulfilment === 'delivery'
                      ? formatPrice(deliveryFee)
                      : fulfilment === 'takeaway'
                      ? formatPrice(parcelPackCharge)
                      : 'Free'}
                  </span>
                </div>

                <div className="flex justify-between text-[var(--color-cocoa-500)]">
                  <span>GST & Restaurant Tax (5%)</span>
                  <span className="font-medium text-[var(--color-espresso-900)]">
                    {formatPrice(tax)}
                  </span>
                </div>

                <div className="border-t border-[var(--color-line-light)] pt-3.5 flex justify-between items-baseline">
                  <div>
                    <span className="font-display font-bold text-lg text-[var(--color-espresso-900)]">
                      Grand Total
                    </span>
                    <span className="text-[11px] text-[var(--color-cocoa-400)] block">
                      Inclusive of all taxes
                    </span>
                  </div>
                  <span className="font-display font-bold text-2xl text-[var(--color-clay-600)]">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate(`${CUSTOMER_BASE}/checkout`)}
                className="w-full bg-[var(--color-clay-500)] hover:bg-[var(--color-clay-600)] text-[#13294B] py-4 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>

              <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-[var(--color-cocoa-400)]">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Synchronized live with kitchen console</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
