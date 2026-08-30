import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Shield, Clock, Award, ChevronRight, ArrowRight, Globe, Headphones } from 'lucide-react'
import { SearchWidget } from '../components/SearchWidget'
import { DestinationCard } from '../components/DestinationCard'
import { PackageCard } from '../components/PackageCard'
import { reviews } from '../../data/reviews'
import { getPackages, getDestinations, useStoreVersion } from '../../data/travelStore'

const TRAVEL_BASE = '/work/travel/customer'

const stats = [
  { value: '30K+', label: 'Happy Travellers' },
  { value: '120+', label: 'Destinations' },
  { value: '500+', label: 'Packages' },
  { value: '10+', label: 'Years Experience' },
]

const whyUs = [
  { icon: Shield, title: 'Best Price Guarantee', desc: 'We match any lower price you find within 48 hours of booking.' },
  { icon: Clock, title: '24/7 Expert Support', desc: 'Our travel experts are always available — before, during, and after your trip.' },
  { icon: Award, title: 'Award-Winning Service', desc: 'Recognized as India\'s best travel platform for 5 consecutive years.' },
  { icon: Globe, title: 'Global Network', desc: 'Trusted partners across 120+ destinations worldwide.' },
  { icon: Headphones, title: 'Personalised Planning', desc: 'Every itinerary is crafted around your preferences, budget, and dreams.' },
  { icon: Star, title: '4.9/5 Rated', desc: 'Over 30,000 verified reviews from travellers who loved every moment.' },
]

const howItWorks = [
  { step: '01', title: 'Choose Destination', desc: 'Browse 120+ curated destinations and find your dream location.' },
  { step: '02', title: 'Customize Package', desc: 'Select dates, add experiences, and tailor the itinerary to your style.' },
  { step: '03', title: 'Book & Pay Securely', desc: 'Confirm your booking with our secure, multi-option payment gateway.' },
  { step: '04', title: 'Travel & Enjoy', desc: 'Pack your bags. We handle everything else so you can travel stress-free.' },
]

const floatingCards = [
  { name: 'London', country: 'England', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&q=80', price: '₹95,000', offset: '-translate-y-8' },
  { name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&q=80', price: '₹78,000', offset: 'translate-y-4' },
  { name: 'Ladakh', country: 'India', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=300&q=80', price: '₹35,000', offset: '-translate-y-2' },
]

export default function Home() {
  useStoreVersion() // re-render when admin changes store
  const featuredDestinations = getDestinations().filter(d => d.featured).slice(0, 6)
  const featuredPackages = getPackages().filter(p => p.featured).slice(0, 4)

  return (
    <div className="bg-[#FDFAF5]">
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Warm gradient background — amber/sand tones */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, #FFF3D6 0%, #FFF8EE 35%, #FDFAF5 60%, #F0EDE8 100%)'
        }}>
          {/* Warm amber radial glows */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(ellipse 70% 60% at 15% 70%, rgba(244,185,66,0.22) 0%, transparent 60%),
              radial-gradient(ellipse 50% 50% at 85% 25%, rgba(234,160,50,0.15) 0%, transparent 55%)
            `
          }} />
          {/* Mountain silhouette */}
          <svg className="absolute bottom-0 left-0 right-0 w-full opacity-25" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#F4B942" d="M0,320 L0,200 L120,100 L240,180 L400,60 L600,150 L720,40 L900,160 L1080,80 L1260,180 L1440,100 L1440,320 Z" />
            <path fill="#E8A020" opacity="0.5" d="M0,320 L0,240 L180,160 L360,220 L540,120 L720,200 L900,140 L1080,200 L1260,140 L1440,180 L1440,320 Z" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text + Search */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-[#F4B942]/15 border border-[#F4B942]/30 text-[#B45309] px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Star size={14} className="fill-[#F4B942] text-[#F4B942]" />
              Trusted by 30,000+ travellers
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl xl:text-6xl font-bold text-[#1C1917] leading-[1.15] mb-6"
            >
              Every Journey Has{' '}
              <br className="hidden sm:block" />
              a Story{' '}
              <span className="text-[#F4B942]">Worth Telling</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#78716C] text-lg mb-8 max-w-lg leading-relaxed"
            >
              Discover 120+ breathtaking destinations with personalised itineraries, expert guides, and memories that last a lifetime.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <SearchWidget />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-6 mt-6"
            >
              {[
                { v: '₹0', label: 'Booking Fee' },
                { v: '100%', label: 'Secure Payment' },
                { v: 'Free', label: 'Cancellation (24h)' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 text-xs text-[#78716C]">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[#1C1917] font-medium">{item.v}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Floating Cards */}
          <div className="hidden lg:flex items-center justify-center relative h-[480px]">
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, x: 40, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.7 }}
                className={`absolute ${card.offset} ${i === 0 ? 'left-0 top-10' : i === 1 ? 'right-0 top-24' : 'left-16 bottom-10'}`}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 1.2 }}
                  className="w-48 bg-white backdrop-blur-xl border border-[#E8E0D5] rounded-2xl overflow-hidden shadow-2xl"
                >
                  <div className="h-28 bg-cover bg-center" style={{ backgroundImage: `url(${card.image})` }} />
                  <div className="p-3">
                    <p className="text-[#1C1917] font-semibold text-sm">{card.name}</p>
                    <p className="text-[#78716C] text-xs">{card.country}</p>
                    <p className="text-[#F4B942] font-bold text-sm mt-1">{card.price}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-[#F4B942]/5 border-y border-[#F4B942]/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <p className="text-3xl font-bold text-[#F4B942]">{stat.value}</p>
                <p className="text-[#78716C] text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Destinations ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#F4B942] text-sm font-medium uppercase tracking-wider mb-2">Explore the World</p>
            <h2 className="text-3xl font-bold text-[#1C1917]">Popular Destinations</h2>
          </div>
          <Link to={`${TRAVEL_BASE}/destinations`} className="hidden sm:flex items-center gap-2 text-[#F4B942] text-sm font-medium hover:gap-3 transition-all">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredDestinations.map((d, i) => <DestinationCard key={d.id} destination={d} index={i} />)}
        </div>
        <div className="mt-6 sm:hidden text-center">
          <Link to={`${TRAVEL_BASE}/destinations`} className="inline-flex items-center gap-2 text-[#F4B942] text-sm font-medium">
            View All Destinations <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Tour Packages ── */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#F4B942] text-sm font-medium uppercase tracking-wider mb-2">Curated for You</p>
              <h2 className="text-3xl font-bold text-[#1C1917]">Featured Packages</h2>
            </div>
            <Link to={`${TRAVEL_BASE}/packages`} className="hidden sm:flex items-center gap-2 text-[#F4B942] text-sm font-medium hover:gap-3 transition-all">
              All Packages <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredPackages.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#F4B942] text-sm font-medium uppercase tracking-wider mb-2">Why Travellers Love Us</p>
          <h2 className="text-3xl font-bold text-[#1C1917]">Your Journey, Our Passion</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyUs.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white border border-[#E8E0D5] rounded-2xl p-6 hover:border-[#F4B942]/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#F4B942]/10 border border-[#F4B942]/20 flex items-center justify-center mb-4 group-hover:bg-[#F4B942]/20 transition-colors">
                <item.icon size={22} className="text-[#F4B942]" />
              </div>
              <h3 className="text-[#1C1917] font-semibold mb-2">{item.title}</h3>
              <p className="text-[#78716C] text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#F4B942] text-sm font-medium uppercase tracking-wider mb-2">Simple Process</p>
            <h2 className="text-3xl font-bold text-[#1C1917]">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#F4B942]/0 via-[#F4B942]/40 to-[#F4B942]/0" />
            {howItWorks.map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-[#F4B942]/10 border-2 border-[#F4B942]/30 flex items-center justify-center text-[#F4B942] font-bold text-xl mx-auto mb-4 relative z-10">
                  {step.step}
                </div>
                <h3 className="text-[#1C1917] font-semibold mb-2">{step.title}</h3>
                <p className="text-[#78716C] text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#F4B942] text-sm font-medium uppercase tracking-wider mb-2">Real Stories</p>
          <h2 className="text-3xl font-bold text-[#1C1917]">Travellers Love VoyageAI</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.slice(0, 3).map((review, i) => (
            <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white border border-[#E8E0D5] rounded-2xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className={j < review.rating ? 'fill-[#F4B942] text-[#F4B942]' : 'text-[#1C1917]/20'} />
                ))}
              </div>
              <h4 className="text-[#1C1917] font-semibold text-sm mb-2">"{review.title}"</h4>
              <p className="text-[#78716C] text-sm leading-relaxed mb-4 line-clamp-3">{review.body}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#E8E0D5]">
                <div className="w-9 h-9 rounded-full bg-[#F4B942]/20 border border-[#F4B942]/30 flex items-center justify-center text-[#F4B942] text-xs font-bold">
                  {review.avatar}
                </div>
                <div>
                  <p className="text-[#1C1917] text-sm font-medium">{review.author}</p>
                  <p className="text-[#78716C] text-xs">{review.city} · {review.destination}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1917] mb-4">
              Ready to Write Your <span className="text-[#F4B942]">Next Chapter?</span>
            </h2>
            <p className="text-[#78716C] mb-8 leading-relaxed">
              Join 30,000+ travellers who've discovered the world with VoyageAI. Your dream destination is one click away.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={`${TRAVEL_BASE}/packages`}
                className="flex items-center gap-2 bg-[#F4B942] hover:bg-[#e5ab38] text-[#0D1117] font-semibold px-8 py-4 rounded-xl transition-colors text-sm">
                Explore Packages <ArrowRight size={18} />
              </Link>
              <Link to={`${TRAVEL_BASE}/contact`}
                className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-[#1C1917] px-8 py-4 rounded-xl transition-colors text-sm">
                Talk to an Expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
