import { motion } from 'framer-motion'
import { Globe, Users, Heart, Shield, Leaf } from 'lucide-react'
import { Link } from 'react-router-dom'

const TRAVEL_BASE = '/work/travel/customer'

const team = [
  { name: 'Arjun Mehta', role: 'Founder & CEO', avatar: 'AM', bio: '15+ years in luxury travel, former VP at Thomas Cook India', color: 'from-amber-500 to-orange-600' },
  { name: 'Priya Nair', role: 'Head of Experiences', avatar: 'PN', bio: 'Destination expert who has visited 80+ countries personally', color: 'from-teal-500 to-emerald-600' },
  { name: 'Vikram Joshi', role: 'Tech & Innovation Lead', avatar: 'VJ', bio: 'Building AI-powered personalisation for travel since 2018', color: 'from-blue-500 to-indigo-600' },
  { name: 'Deepa Krishnan', role: 'Customer Success', avatar: 'DK', bio: 'Ensuring every journey exceeds expectations', color: 'from-pink-500 to-rose-600' },
]

const values = [
  { icon: Heart, title: 'Passion for Travel', desc: 'We live and breathe travel. Every itinerary is crafted with genuine love and expertise.' },
  { icon: Shield, title: 'Trust & Transparency', desc: 'No hidden fees, no surprises. Clear pricing, honest advice, and total accountability.' },
  { icon: Users, title: 'People First', desc: 'Our travellers are family. We go the extra mile — before, during, and after every journey.' },
  { icon: Leaf, title: 'Sustainable Tourism', desc: 'We partner with eco-conscious operators and support local communities wherever we go.' },
]

export default function About() {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      {/* Hero */}
      <section className="relative py-24 bg-[#151B23] border-b border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(244,185,66,0.3) 0%, transparent 70%)'
        }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#F4B942] text-sm font-medium uppercase tracking-wider mb-3">Our Story</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              We Believe Every Journey is<br /><span className="text-[#F4B942]">Worth Telling</span>
            </h1>
            <p className="text-[#A8B0BA] text-lg leading-relaxed max-w-2xl mx-auto">
              VoyageAI was born from a simple belief: travel should be transformative, not transactional.
              We're a team of passionate explorers who've traded spreadsheets for adventure, and corporate ladders for mountain trails.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-[#F4B942]/5 border-b border-[#F4B942]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '2015', label: 'Founded' },
              { value: '30,000+', label: 'Happy Travellers' },
              { value: '120+', label: 'Destinations' },
              { value: '4.9/5', label: 'Average Rating' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <p className="text-3xl font-bold text-[#F4B942]">{stat.value}</p>
                <p className="text-[#A8B0BA] text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-[#F4B942] text-sm font-medium uppercase tracking-wider mb-3">How We Started</p>
            <h2 className="text-3xl font-bold text-white mb-5">From One Road Trip to 120 Destinations</h2>
            <div className="space-y-4 text-[#A8B0BA] leading-relaxed">
              <p>In 2015, our founder Arjun Mehta left a corporate career to take a solo road trip through Rajasthan.
                That journey changed everything. He returned knowing he wanted to help others discover that same transformative power of travel.</p>
              <p>Starting with just 3 Rajasthan packages, VoyageAI has grown to cover 120+ destinations across India and the world —
                while maintaining the personal touch that defined those early days.</p>
              <p>Today, our team of 45 travel specialists handles everything from budget backpacking to ultra-luxury retreats,
                always with the same passion that started it all: a love for meaningful journeys.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative h-72 rounded-3xl overflow-hidden bg-gradient-to-br from-amber-900 via-orange-800 to-yellow-700">
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe size={80} className="text-white/20" />
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/30 backdrop-blur rounded-2xl p-5 border border-white/10">
                <p className="text-[#F4B942] font-bold text-xl">10 Years</p>
                <p className="text-white text-sm">of crafting extraordinary journeys</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#151B23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#F4B942]/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={22} className="text-[#F4B942]" />
                </div>
                <h3 className="text-white font-semibold mb-2">{v.title}</h3>
                <p className="text-[#A8B0BA] text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Meet the Team</h2>
          <p className="text-[#A8B0BA] mt-2">The passionate people behind every journey</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member, i) => (
            <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-[#171E27] border border-white/[0.06] rounded-2xl p-5 text-center hover:border-[#F4B942]/20 transition-colors">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-xl mx-auto mb-4`}>
                {member.avatar}
              </div>
              <h3 className="text-white font-semibold">{member.name}</h3>
              <p className="text-[#F4B942] text-xs mb-2">{member.role}</p>
              <p className="text-[#A8B0BA] text-xs leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#151B23] text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore?</h2>
          <p className="text-[#A8B0BA] mb-8">Let us craft your perfect journey. Talk to one of our experts today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`${TRAVEL_BASE}/destinations`} className="bg-[#F4B942] hover:bg-[#e5ab38] text-[#0D1117] font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm">
              Explore Destinations
            </Link>
            <Link to={`${TRAVEL_BASE}/contact`} className="border border-white/20 hover:border-white/40 text-white px-8 py-3.5 rounded-xl transition-colors text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
