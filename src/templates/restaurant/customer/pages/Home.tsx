import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Flame,
  Clock,
  Sparkles,
  MapPin,
  ShieldCheck,
  Utensils,
  Leaf,
} from 'lucide-react'
import { CUSTOMER_BASE } from '../../routes'
import { useAppStore } from '../../store/useAppStore'
import { VegDot } from '../../../../shared/components/ui/VegDot'
import { Badge } from '../../../../shared/components/ui/Badge'
import { FoodImage } from '../../../../shared/components/ui/FoodImage'
import { formatPrice } from '../../../../shared/lib/format'

export default function CustomerHome() {
  const items = useAppStore((s) => s.menuItems)
  const categories = useAppStore((s) => s.categories)
  const signature = items.filter((i) => i.signature && i.available)
  const popular = items.filter((i) => i.popular && i.available)

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ── 1. Hero: Responsive Editorial Composition ── */}
      <section className="relative overflow-hidden bg-[var(--color-espresso-900)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-amber-200 border border-white/10">
                <Sparkles size={14} className="text-amber-400" />
                <span>Modern South Indian Kitchen</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-balance">
                A taste of the South,{' '}
                <span className="italic font-light text-[var(--color-clay-300)]">
                  reimagined.
                </span>
              </h1>

              <p className="text-white/80 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
                Ground at dawn, roasted in pure ghee, and crafted with intention.
                Experience slow-fermented heritage dosas, fragrant seeraga samba biryanis,
                and traditional coastal flavours.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to={`${CUSTOMER_BASE}/menu`}
                  className="inline-flex items-center justify-center gap-2.5 bg-[var(--color-clay-500)] text-white px-7 py-4 rounded-xl font-semibold text-base shadow-lg hover:bg-[var(--color-clay-400)] transition-all active:scale-[0.99]"
                >
                  <span>Explore Menu & Order</span>
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="#story"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold text-sm transition-colors border border-white/15"
                >
                  Our Philosophy
                </a>
              </div>

              {/* Badges / Highlights */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/10 text-xs text-white/70">
                <div>
                  <p className="font-semibold text-white text-sm">100% Ghee</p>
                  <p className="text-[11px] text-white/60">Farm-churned butter</p>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">24h Batter</p>
                  <p className="text-[11px] text-white/60">Natural stone grinding</p>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Live Sync</p>
                  <p className="text-[11px] text-white/60">Order directly to kitchen</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Image / Editorial Composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3] sm:aspect-[16/11]">
                <FoodImage
                  src="/food/hero.jpg"
                  alt="AURA Signature Ghee Roast Dosa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-espresso-900)]/70 via-transparent to-transparent" />

                {/* Floating Highlight Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto bg-white/95 backdrop-blur-md p-4 rounded-xl text-[var(--color-espresso-900)] shadow-xl max-w-xs border border-white/40">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-display font-bold text-sm">
                      Ghee Roast Dosa
                    </span>
                    <span className="font-semibold text-xs text-[var(--color-clay-600)]">
                      ₹180
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--color-cocoa-500)] leading-tight">
                    Crisp fermented rice crepe dusted with gunpowder podi & ghee.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. Category Quick Browse ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-clay-500)] mb-1">
              Curated Offerings
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-espresso-900)]">
              Browse by Category
            </h2>
          </div>
          <Link
            to={`${CUSTOMER_BASE}/menu`}
            className="text-sm font-semibold text-[var(--color-clay-500)] hover:text-[var(--color-clay-600)] flex items-center gap-1 group"
          >
            <span>View all dishes</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`${CUSTOMER_BASE}/menu?category=${cat.slug}`}
              className="group bg-white rounded-2xl p-4 sm:p-5 border border-[var(--color-line-light)] hover:border-[var(--color-clay-500)] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="font-display font-semibold text-base sm:text-lg text-[var(--color-espresso-900)] group-hover:text-[var(--color-clay-500)] transition-colors">
                  {cat.name}
                </h3>
                {cat.description && (
                  <p className="text-xs text-[var(--color-cocoa-400)] mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[var(--color-clay-500)]">
                <span>Explore</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3. Signature Dishes (Responsive 3-4 Col Grid) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-clay-500)] mb-1">
              House Specialties
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-espresso-900)]">
              Signature Dishes
            </h2>
            <p className="text-sm text-[var(--color-cocoa-400)] mt-1">
              Dishes that define the kitchen of AURA
            </p>
          </div>
          <Link
            to={`${CUSTOMER_BASE}/menu`}
            className="hidden sm:flex text-sm font-semibold text-[var(--color-clay-500)] items-center gap-1 hover:underline"
          >
            <span>See entire menu</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {signature.slice(0, 4).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              <Link
                to={`${CUSTOMER_BASE}/item/${item.id}`}
                className="group flex flex-col h-full bg-white rounded-2xl border border-[var(--color-line-light)] hover:border-[var(--color-clay-500)] hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-ivory-100)]">
                  <FoodImage
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="signature">Signature</Badge>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-sm">
                    <VegDot type={item.tags[0]} />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display font-semibold text-lg text-[var(--color-espresso-900)] group-hover:text-[var(--color-clay-500)] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[var(--color-cocoa-400)] mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--color-line-light)] flex items-center justify-between">
                    <span className="font-display font-bold text-lg text-[var(--color-espresso-900)]">
                      {formatPrice(item.price)}
                    </span>
                    <span className="text-xs font-semibold bg-[var(--color-ivory-100)] text-[var(--color-clay-600)] px-3 py-1.5 rounded-lg group-hover:bg-[var(--color-clay-500)] group-hover:text-white transition-colors">
                      Customize
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 4. Popular This Evening ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--color-ivory-100)] rounded-3xl p-6 sm:p-10 border border-[var(--color-line)]">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-full bg-[var(--color-clay-500)] text-white flex items-center justify-center">
              <Flame size={18} />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-espresso-900)]">
                Popular This Evening
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-cocoa-400)]">
                Most ordered by diners in Chennai tonight
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popular.slice(0, 6).map((item) => (
              <Link
                key={item.id}
                to={`${CUSTOMER_BASE}/item/${item.id}`}
                className="flex items-center gap-4 p-3.5 bg-white rounded-xl border border-[var(--color-line-light)] hover:border-[var(--color-clay-500)] hover:shadow-md transition-all group"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[var(--color-ivory-50)]">
                  <FoodImage
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="font-display font-semibold text-sm sm:text-base text-[var(--color-espresso-900)] truncate group-hover:text-[var(--color-clay-500)] transition-colors">
                      {item.name}
                    </h3>
                    <VegDot type={item.tags[0]} />
                  </div>
                  <p className="text-xs text-[var(--color-cocoa-400)] line-clamp-1">
                    {item.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-semibold text-sm text-[var(--color-clay-600)]">
                      {formatPrice(item.price)}
                    </span>
                    <span className="text-[11px] font-medium text-[var(--color-cocoa-400)] group-hover:text-[var(--color-espresso-900)]">
                      Select →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Story / Philosophy ── */}
      <section id="story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--color-espresso-900)] rounded-3xl overflow-hidden text-white grid grid-cols-1 lg:grid-cols-12 shadow-xl border border-white/10">
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[440px]">
            <FoodImage
              src="/food/kitchen.jpg"
              alt="Fresh Indian Spices and Morning Grinding"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[var(--color-espresso-900)]/80 to-transparent" />
          </div>
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-clay-300)]">
              <Leaf size={14} />
              <span>From Our Kitchen</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-balance leading-snug">
              Every dish carries a tradition spanning generations, crafted for today.
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              We source our tellicherry peppercorns and single-origin cardamoms directly from
              estates in Wayanad and Idukki. Our dosa batter ferments for an exact 24 hours
              under controlled temperature to achieve the signature airy crispness, roasted only
              in cold-pressed oils and pure A2 cow ghee.
            </p>
            <div className="pt-2 flex items-center gap-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-amber-400" />
                <span>Zero Artificial Preservatives</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils size={18} className="text-amber-400" />
                <span>Prepared Fresh to Order</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Hours & Location ── */}
      <section id="location" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[var(--color-line)] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-ivory-100)] text-[var(--color-clay-500)] flex items-center justify-center mx-auto md:mx-0">
              <MapPin size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-[var(--color-espresso-900)]">
              Adyar, Chennai
            </h3>
            <p className="text-sm text-[var(--color-cocoa-400)] leading-relaxed">
              14 Kalakshetra Avenue, Adyar<br />
              Chennai, Tamil Nadu 600041
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-ivory-100)] text-[var(--color-clay-500)] flex items-center justify-center mx-auto md:mx-0">
              <Clock size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-[var(--color-espresso-900)]">
              Daily Service Hours
            </h3>
            <p className="text-sm text-[var(--color-cocoa-400)] leading-relaxed">
              Breakfast: 7:30 AM – 11:00 AM<br />
              Lunch: 12:00 PM – 3:30 PM<br />
              Dinner: 6:30 PM – 10:30 PM
            </p>
          </div>

          <div className="flex flex-col justify-between space-y-4">
            <div>
              <h3 className="font-display font-bold text-lg text-[var(--color-espresso-900)]">
                Ready for Dining?
              </h3>
              <p className="text-sm text-[var(--color-cocoa-400)] mt-1">
                Order online for swift pickup or doorstep delivery.
              </p>
            </div>
            <Link
              to={`${CUSTOMER_BASE}/menu`}
              className="inline-flex items-center justify-center gap-2 bg-[var(--color-clay-500)] hover:bg-[var(--color-clay-600)] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              <span>Start Your Order</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
