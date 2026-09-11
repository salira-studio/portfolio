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
    <div className="space-y-16 sm:space-y-24 bg-white rest-particles">
      {/* ── 1. Hero: Responsive Editorial Composition ── */}
      <section className="relative overflow-hidden rest-hero-bg text-[var(--rest-text)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[var(--rest-text)] border border-[var(--rest-border)]">
                <Sparkles size={14} className="text-[var(--rest-primary)]" />
                <span>Kongu South Indian Kitchen · Karunya Nagar · கொங்கு தென்னிந்திய உணவு</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight text-balance">
                Authentic Kongu flavours,{' '}
                <span className="italic font-light text-[var(--rest-primary)]">
                  crafted with passion.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-[var(--rest-muted)] font-medium mt-2">
                ஆத்திரிசிய கொங்கு சுவைகள்
              </p>

              <p className="text-[var(--rest-muted)] text-base sm:text-lg max-w-xl font-normal leading-relaxed">
                Ground at dawn, roasted in pure country ghee, and served with pride.
                Experience soft Thatte idlis, cast-iron crispy ghee roasts, authentic
                banana-leaf feasts, and fragrant seeraga samba biryanis.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to={`${CUSTOMER_BASE}/menu`}
                  className="inline-flex items-center justify-center gap-2.5 bg-[var(--rest-primary)] text-[var(--rest-text)] px-7 py-4 rounded-xl font-semibold text-base shadow-md hover:bg-[var(--rest-primary-light)] transition-all active:scale-[0.99]"
                >
                  <span>Explore Menu & Order / மெனுவை ஆராய்க</span>
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="#story"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[var(--rest-cream-light)] text-[var(--rest-text)] px-6 py-4 rounded-xl font-semibold text-sm transition-colors border border-[var(--rest-border)]"
                >
                  Our Philosophy
                </a>
              </div>

              {/* Badges / Highlights */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[var(--rest-border)] text-xs text-[var(--rest-muted)]">
                <div>
                  <p className="font-semibold text-[var(--rest-text)] text-sm">100% Ghee</p>
                  <p className="text-[11px] text-[var(--rest-muted)]">Farm-churned butter</p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--rest-text)] text-sm">24h Batter</p>
                  <p className="text-[11px] text-[var(--rest-muted)]">Natural stone grinding</p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--rest-text)] text-sm">Live Sync</p>
                  <p className="text-[11px] text-[var(--rest-muted)]">Order directly to kitchen</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Image / Editorial Composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-6 relative rest-float"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3] sm:aspect-[16/11] rest-shimmer">
                <FoodImage
                  src="/food/hero.jpg"
                  alt="Annachis Signature Ghee Roast Dosa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--rest-text)]/40 via-transparent to-transparent" />

                {/* Floating Highlight Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto bg-white/95 backdrop-blur-sm p-4 rounded-xl text-[var(--rest-text)] shadow-lg max-w-xs border border-[var(--rest-border)]">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-display font-bold text-sm">
                      Ghee Roast Dosa
                    </span>
                    <span className="font-semibold text-xs text-[var(--rest-primary)]">
                      ₹180
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--rest-muted)] leading-tight">
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
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--rest-primary)] mb-1">
              Curated Offerings / தேர்ந்தெடுக்கப்பட்டவை
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--rest-text)]">
              Browse by Category / வகைப்படுத்தவும்
            </h2>
          </div>
          <Link
            to={`${CUSTOMER_BASE}/menu`}
            className="text-sm font-semibold text-[var(--rest-primary)] hover:text-[var(--rest-primary-dark)] flex items-center gap-1 group"
          >
            <span>View all dishes / அனைத்து உணவுகளும்</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                to={`${CUSTOMER_BASE}/menu?category=${cat.slug}`}
                className="rest-category-card group p-4 sm:p-5 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-display font-semibold text-base sm:text-lg text-[var(--rest-text)] group-hover:text-[var(--rest-primary)] transition-colors">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="text-xs text-[var(--rest-muted)] mt-1 line-clamp-2">
                      {cat.description}
                    </p>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[var(--rest-primary)]">
                  <span>Explore / ஆராய்க</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. Signature Dishes (Responsive 3-4 Col Grid) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--rest-primary)] mb-1">
              House Specialties / சிறப்பு உணவுகள்
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--rest-text)]">
              Signature Dishes / சிறப்பு உணவுகள்
            </h2>
            <p className="text-sm text-[var(--rest-muted)] mt-1">
              Dishes that define the kitchen of Annachies அண்ணாச்சிஸ்
            </p>
          </div>
          <Link
            to={`${CUSTOMER_BASE}/menu`}
            className="hidden sm:flex text-sm font-semibold text-[var(--rest-primary)] items-center gap-1 hover:underline"
          >
            <span>See entire menu / முழு மெனுவையும் காண்க</span>
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
                className="rest-grid-cell rest-glow-effect group flex flex-col h-full overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--rest-cream-light)]">
                  <FoodImage
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="signature">Signature</Badge>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-sm z-10">
                    <VegDot type={item.tags[0]} />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 relative z-10">
                  <div>
                    <h3 className="font-display font-semibold text-lg text-[var(--rest-text)] group-hover:text-[var(--rest-primary)] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[var(--rest-muted)] mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--rest-border)] flex items-center justify-between">
                    <span className="font-display font-bold text-lg text-[var(--rest-text)]">
                      {formatPrice(item.price)}
                    </span>
                    <span className="text-xs font-semibold bg-[var(--rest-accent)] text-[var(--rest-text)] px-3 py-1.5 rounded-lg group-hover:bg-[var(--rest-primary)] group-hover:text-[var(--rest-text)] transition-colors">
                      Customize / தனிப்பயனாக்கு
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
        <div className="bg-[var(--rest-cream-light)] rounded-3xl p-6 sm:p-10 border border-[var(--rest-border)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[var(--rest-primary)] text-[var(--rest-text)] flex items-center justify-center">
              <Flame size={18} />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--rest-text)]">
                Popular This Evening / இன்றைய சிறப்பு
              </h2>
              <p className="text-xs sm:text-sm text-[var(--rest-muted)]">
                Most ordered by diners in Karunya Nagar today
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popular.slice(0, 6).map((item) => (
              <Link
                key={item.id}
                to={`${CUSTOMER_BASE}/item/${item.id}`}
                className="rest-grid-cell flex items-center gap-4 p-3.5 bg-white rounded-xl border border-[var(--rest-border)] hover:shadow-md transition-all group"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[var(--rest-cream-light)]">
                  <FoodImage
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0 relative z-10">
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="font-display font-semibold text-sm sm:text-base text-[var(--rest-text)] truncate group-hover:text-[var(--rest-primary)] transition-colors">
                      {item.name}
                    </h3>
                    <VegDot type={item.tags[0]} />
                  </div>
                  <p className="text-xs text-[var(--rest-muted)] line-clamp-1">
                    {item.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-semibold text-sm text-[var(--rest-primary)]">
                      {formatPrice(item.price)}
                    </span>
                    <span className="text-[11px] font-medium text-[var(--rest-muted)] group-hover:text-[var(--rest-text)]">
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
        <div className="bg-white rounded-3xl overflow-hidden text-[var(--rest-text)] grid grid-cols-1 lg:grid-cols-12 shadow-lg border border-[var(--rest-border)]">
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[440px]">
            <FoodImage
              src="/food/kitchen.jpg"
              alt="Fresh Indian Spices and Morning Grinding"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[var(--rest-text)]/20 to-transparent" />
          </div>
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--rest-primary)]">
              <Leaf size={14} />
              <span>From Our Kitchen / எங்கள் சமையலறையிலிருந்து</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-balance leading-snug">
              Every dish carries authentic Kongu culinary heritage, crafted for today.
            </h2>
            <p className="text-lg text-[var(--rest-primary)] italic mt-2">
              ஒவ்வொரு உணவும் ஆத்திரிசிய கொங்கு சமையல் பாரம்பரியத்தை சுமக்கிறது
            </p>
            <p className="text-[var(--rest-muted)] text-sm sm:text-base leading-relaxed">
              Rooted in Karunya Nagar, Annachies celebrates the rich flavors of Coimbatore
              and the Kongu region. Our dosa batter ferments for an exact 24 hours to achieve
              signature airy crispness, roasted in cold-pressed sesame oil and pure country ghee.
              Our spices are hand-pounded, and our coffee is brewed from freshly ground peaberry decoction.
            </p>
            <div className="pt-2 flex items-center gap-6 text-sm text-[var(--rest-muted)]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[var(--rest-primary)]" />
                <span>Zero Artificial Colours / செயற்கை நிறம் இல்லை</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils size={18} className="text-[var(--rest-primary)]" />
                <span>Prepared Fresh to Order / புதிதாக தயாரிக்கப்படும்</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Hours & Location ── */}
      <section id="location" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[var(--rest-border)] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[var(--rest-accent)] text-[var(--rest-text)] flex items-center justify-center mx-auto md:mx-0">
              <MapPin size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-[var(--rest-text)]">
              Karunya Nagar, Coimbatore / கருண்யா நகர்
            </h3>
            <p className="text-sm text-[var(--rest-muted)] leading-relaxed">
              Siruvani Main Road, Karunya Nagar<br />
              Coimbatore, Tamil Nadu 641114
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[var(--rest-accent)] text-[var(--rest-text)] flex items-center justify-center mx-auto md:mx-0">
              <Clock size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-[var(--rest-text)]">
              Daily Service Hours / தினசரி சேவை நேரம்
            </h3>
            <p className="text-sm text-[var(--rest-muted)] leading-relaxed">
              Morning Tiffin: 7:00 AM – 11:30 AM<br />
              Banana Leaf Meals: 12:00 PM – 4:00 PM<br />
              Dinner & Tiffin: 5:30 PM – 10:30 PM
            </p>
          </div>

          <div className="flex flex-col justify-between space-y-4">
            <div>
              <h3 className="font-display font-bold text-lg text-[var(--rest-text)]">
                Ready for Dining? / உணவு தயாரா?
              </h3>
              <p className="text-sm text-[var(--rest-muted)] mt-1">
                Order online for swift pickup or doorstep delivery.
              </p>
            </div>
            <Link
              to={`${CUSTOMER_BASE}/menu`}
              className="inline-flex items-center justify-center gap-2 bg-[var(--rest-primary)] hover:bg-[var(--rest-primary-light)] text-[var(--rest-text)] px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              <span>Start Your Order / உங்கள் ஆர்டரைத் தொடங்குங்கள்</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
