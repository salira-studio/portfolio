import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MapPin,
  Phone,
  User,
  Mail,
  ArrowLeft,
  Truck,
  Store,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { CUSTOMER_BASE } from '../../routes'
import { useAppStore } from '../../store/useAppStore'
import { FoodImage } from '../../../../shared/components/ui/FoodImage'
import { formatPrice } from '../../../../shared/lib/format'

export default function Checkout() {
  const navigate = useNavigate()
  const cart = useAppStore((s) => s.cart)
  const fulfilment = useAppStore((s) => s.cartFulfilment)
  const address = useAppStore((s) => s.cartAddress)
  const contact = useAppStore((s) => s.cartContact)
  const paymentMethod = useAppStore((s) => s.cartPaymentMethod)
  const setFulfilment = useAppStore((s) => s.setCartFulfilment)
  const setAddress = useAppStore((s) => s.setCartAddress)
  const setContact = useAppStore((s) => s.setCartContact)
  const setPaymentMethod = useAppStore((s) => s.setCartPaymentMethod)
  const placeOrder = useAppStore((s) => s.placeOrder)
  const restaurant = useAppStore((s) => s.restaurant)

  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // If cart is empty, redirect back to menu
  useEffect(() => {
    if (cart.length === 0) {
      navigate(`${CUSTOMER_BASE}/menu`, { replace: true })
    }
  }, [cart, navigate])

  const subtotal = cart.reduce((sum, c) => sum + c.price * c.quantity, 0)
  const deliveryFee = fulfilment === 'delivery' ? restaurant.deliveryFee : 0
  const tax = Math.round(subtotal * restaurant.taxRate)
  const total = subtotal + deliveryFee + tax

  function handlePlaceOrder() {
    if (fulfilment === 'delivery' && !address.trim()) {
      setErrorMsg('Please enter your delivery address to proceed.')
      return
    }

    setIsSubmitting(true)
    setErrorMsg('')

    try {
      const order = placeOrder(notes)
      if (order) {
        navigate(`${CUSTOMER_BASE}/order/${order.id}`)
      }
    } catch {
      setIsSubmitting(false)
      setErrorMsg('Failed to create order. Please try again.')
    }
  }

  if (cart.length === 0) return null

  return (
    <div className="min-h-screen bg-[var(--color-ivory-50)] py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-line-light)] pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`${CUSTOMER_BASE}/cart`)}
              className="p-2 rounded-xl bg-white border border-[var(--color-line)] text-[var(--color-espresso-900)] hover:bg-[var(--color-ivory-100)] transition-colors shadow-2xs"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-espresso-900)]">
                Checkout
              </h1>
              <p className="text-xs sm:text-sm text-[var(--color-cocoa-400)]">
                Complete your details and place your order
              </p>
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
            {errorMsg}
          </div>
        )}

        {/* Responsive 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Form Fields */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Fulfilment Mode & Address */}
            <section className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[var(--color-line)] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base sm:text-lg font-bold text-[var(--color-espresso-900)] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[var(--color-clay-500)] text-white text-xs flex items-center justify-center font-sans font-bold">
                    1
                  </span>
                  <span>Fulfilment Method</span>
                </h2>
                <span className="text-xs text-[var(--color-cocoa-400)]">
                  {fulfilment === 'delivery' ? 'Delivered to Door' : 'Pickup at Kitchen'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setFulfilment('delivery')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all border ${
                    fulfilment === 'delivery'
                      ? 'bg-[var(--color-espresso-900)] text-white border-[var(--color-espresso-900)] shadow-sm'
                      : 'bg-white text-[var(--color-espresso-800)] border-[var(--color-line)] hover:bg-[var(--color-ivory-50)]'
                  }`}
                >
                  <Truck size={16} />
                  <span>Delivery (₹40)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFulfilment('pickup')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all border ${
                    fulfilment === 'pickup'
                      ? 'bg-[var(--color-espresso-900)] text-white border-[var(--color-espresso-900)] shadow-sm'
                      : 'bg-white text-[var(--color-espresso-800)] border-[var(--color-line)] hover:bg-[var(--color-ivory-50)]'
                  }`}
                >
                  <Store size={16} />
                  <span>Pickup (Free)</span>
                </button>
              </div>

              {fulfilment === 'delivery' ? (
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-semibold text-[var(--color-espresso-800)] block">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-3.5 top-3 text-[var(--color-cocoa-300)]"
                    />
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Flat 4B, Kalakshetra Heights, Adyar, Chennai 600041"
                      rows={3}
                      className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-ivory-50)] border border-[var(--color-line)] rounded-xl text-sm placeholder:text-[var(--color-cocoa-300)] focus:outline-none focus:border-[var(--color-clay-500)] resize-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-[var(--color-ivory-100)] rounded-xl border border-[var(--color-line-light)] text-xs text-[var(--color-cocoa-500)] space-y-1">
                  <p className="font-semibold text-[var(--color-espresso-900)]">
                    Kitchen Pickup Address:
                  </p>
                  <p>14 Kalakshetra Avenue, Adyar, Chennai 600041</p>
                  <p className="text-[11px] text-[var(--color-clay-600)] font-medium pt-1">
                    Your order will be ready at the express takeaway counter in ~15-20 mins.
                  </p>
                </div>
              )}
            </section>

            {/* Step 2: Contact Information */}
            <section className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[var(--color-line)] shadow-xs space-y-4">
              <h2 className="font-display text-base sm:text-lg font-bold text-[var(--color-espresso-900)] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--color-clay-500)] text-white text-xs flex items-center justify-center font-sans font-bold">
                  2
                </span>
                <span>Contact Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-[var(--color-espresso-800)]">
                    Your Name
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-cocoa-300)]"
                    />
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) =>
                        setContact({ ...contact, name: e.target.value })
                      }
                      placeholder="e.g. Priya Sundaram"
                      className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-ivory-50)] border border-[var(--color-line)] rounded-xl text-sm placeholder:text-[var(--color-cocoa-300)] focus:outline-none focus:border-[var(--color-clay-500)]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--color-espresso-800)]">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-cocoa-300)]"
                    />
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) =>
                        setContact({ ...contact, phone: e.target.value })
                      }
                      placeholder="+91 98450 12345"
                      className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-ivory-50)] border border-[var(--color-line)] rounded-xl text-sm placeholder:text-[var(--color-cocoa-300)] focus:outline-none focus:border-[var(--color-clay-500)]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--color-espresso-800)]">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-cocoa-300)]"
                    />
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) =>
                        setContact({ ...contact, email: e.target.value })
                      }
                      placeholder="priya@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-ivory-50)] border border-[var(--color-line)] rounded-xl text-sm placeholder:text-[var(--color-cocoa-300)] focus:outline-none focus:border-[var(--color-clay-500)]"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Step 3: Payment Method & Kitchen Notes */}
            <section className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[var(--color-line)] shadow-xs space-y-4">
              <h2 className="font-display text-base sm:text-lg font-bold text-[var(--color-espresso-900)] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--color-clay-500)] text-white text-xs flex items-center justify-center font-sans font-bold">
                  3
                </span>
                <span>Payment & Instructions</span>
              </h2>

              <div className="space-y-2.5">
                {[
                  { id: 'UPI', label: 'UPI (GPay / PhonePe / Paytm / QR)', tag: 'Instant' },
                  { id: 'Card', label: 'Credit or Debit Card', tag: 'Simulated' },
                  { id: 'Cash on Delivery', label: 'Cash on Delivery / Pay on Pickup', tag: 'COD' },
                ].map((m) => (
                  <label
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === m.id
                        ? 'border-[var(--color-clay-500)] bg-[var(--color-clay-500)]/5 ring-1 ring-[var(--color-clay-500)]'
                        : 'border-[var(--color-line)] hover:bg-[var(--color-ivory-50)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === m.id}
                        onChange={() => setPaymentMethod(m.id)}
                        className="accent-[var(--color-clay-500)]"
                      />
                      <span className="text-sm font-semibold text-[var(--color-espresso-900)]">
                        {m.label}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-[var(--color-clay-600)] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {m.tag}
                    </span>
                  </label>
                ))}
              </div>

              {/* Kitchen Note */}
              <div className="pt-3 border-t border-[var(--color-line-light)] space-y-1.5">
                <label className="text-xs font-semibold text-[var(--color-espresso-800)]">
                  Notes for the Chef / Delivery
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Extra coconut chutney, ring doorbell twice"
                  className="w-full px-4 py-2.5 bg-[var(--color-ivory-50)] border border-[var(--color-line)] rounded-xl text-sm placeholder:text-[var(--color-cocoa-300)] focus:outline-none focus:border-[var(--color-clay-500)]"
                />
              </div>
            </section>
          </div>

          {/* Right Column (4 cols): Sticky Order Breakdown & Action */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[var(--color-line)] shadow-sm space-y-5">
              <h2 className="font-display text-lg font-bold text-[var(--color-espresso-900)]">
                Order Breakdown
              </h2>

              {/* Items Compact Preview */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((ci) => (
                  <div key={ci.id} className="flex items-center gap-3 text-xs">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[var(--color-ivory-100)]">
                      <FoodImage src={ci.image} alt={ci.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[var(--color-espresso-900)] truncate">
                        {ci.name}
                      </p>
                      <p className="text-[11px] text-[var(--color-cocoa-400)]">
                        Qty: {ci.quantity}
                      </p>
                    </div>
                    <span className="font-semibold text-[var(--color-espresso-900)]">
                      {formatPrice(ci.price * ci.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--color-line-light)] pt-4 space-y-2.5 text-sm">
                <div className="flex justify-between text-[var(--color-cocoa-500)]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[var(--color-espresso-900)]">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-[var(--color-cocoa-500)]">
                  <span>Fulfilment ({fulfilment})</span>
                  <span className="font-medium text-[var(--color-espresso-900)]">
                    {deliveryFee > 0 ? formatPrice(deliveryFee) : 'Free'}
                  </span>
                </div>
                <div className="flex justify-between text-[var(--color-cocoa-500)]">
                  <span>Taxes (5% GST)</span>
                  <span className="font-medium text-[var(--color-espresso-900)]">
                    {formatPrice(tax)}
                  </span>
                </div>
                <div className="border-t border-[var(--color-line-light)] pt-3 flex justify-between items-baseline">
                  <span className="font-display font-bold text-lg text-[var(--color-espresso-900)]">
                    Total Due
                  </span>
                  <span className="font-display font-bold text-2xl text-[var(--color-clay-600)]">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handlePlaceOrder}
                className="w-full bg-[var(--color-clay-500)] hover:bg-[var(--color-clay-600)] disabled:opacity-50 text-white py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <Sparkles size={18} />
                <span>Place Order — {formatPrice(total)}</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--color-cocoa-400)] text-center">
                <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                <span>Instant dispatch to Restaurant Kitchen Console</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
