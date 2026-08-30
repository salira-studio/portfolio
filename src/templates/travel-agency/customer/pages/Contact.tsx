import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { destinations } from '../../data/destinations'

export default function Contact() {
  const [searchParams] = useSearchParams()
  const prefDest = searchParams.get('destination') || ''
  const prefPkg = searchParams.get('package') || ''
  const dest = destinations.find(d => d.id === prefDest)

  const [form, setForm] = useState({
    name: '', email: '', phone: '', destination: dest?.name || '',
    travelDate: '', travelers: '2', budget: '', message: prefPkg ? `Interested in package: ${prefPkg}` : '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const enquiries = JSON.parse(localStorage.getItem('travel_contact_enquiries') || '[]')
      enquiries.unshift({ ...form, id: Date.now().toString(), submittedOn: new Date().toISOString().split('T')[0], status: 'new' })
      localStorage.setItem('travel_contact_enquiries', JSON.stringify(enquiries))
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-[#FDFAF5]">
      {/* Header */}
      <section className="bg-[#F5F0E8] border-b border-[#E8E0D5] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#F4B942] text-sm font-medium uppercase tracking-wider mb-2">Get In Touch</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1917] mb-2">Plan Your Dream Trip</h1>
            <p className="text-[#78716C]">Our travel experts respond within 2 hours</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-5">
            {[
              { icon: MapPin, title: 'Visit Us', lines: ['42, MG Road, Prestige Towers', 'Bangalore 560001, Karnataka'] },
              { icon: Phone, title: 'Call Us', lines: ['+91 80 4123 5678', '+91 98765 12345 (WhatsApp)'] },
              { icon: Mail, title: 'Email Us', lines: ['hello@voyageai.travel', 'bookings@voyageai.travel'] },
              { icon: Clock, title: 'Working Hours', lines: ['Mon–Sat: 9:00 AM – 8:00 PM', 'Sun: 10:00 AM – 6:00 PM'] },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 bg-white border border-[#E8E0D5] rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-[#F4B942]/10 border border-[#F4B942]/20 flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-[#F4B942]" />
                </div>
                <div>
                  <h3 className="text-[#1C1917] font-semibold text-sm mb-1">{item.title}</h3>
                  {item.lines.map(line => <p key={line} className="text-[#78716C] text-sm">{line}</p>)}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center bg-white border border-emerald-500/20 rounded-2xl p-12 text-center h-full">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-[#1C1917] mb-2">Enquiry Sent!</h2>
                <p className="text-[#78716C] max-w-sm">
                  Thank you, {form.name}! Our travel expert will reach out to you at <strong className="text-[#1C1917]">{form.email}</strong> within 2 hours.
                </p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-[#F4B942] text-sm hover:underline">Submit Another Enquiry</button>
              </motion.div>
            ) : (
              <div className="bg-white border border-[#E8E0D5] rounded-2xl p-6">
                <h2 className="text-xl font-bold text-[#1C1917] mb-6">Send Us an Enquiry</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#78716C] mb-1.5 block">Full Name *</label>
                      <input required name="name" value={form.name} onChange={handleChange}
                        placeholder="Your name"
                        className="w-full bg-[#FDFAF5] border border-[#E8E0D5] rounded-xl px-4 py-3 text-sm text-[#1C1917] placeholder:text-[#78716C]/50 focus:outline-none focus:border-[#F4B942]/40 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs text-[#78716C] mb-1.5 block">Email *</label>
                      <input required name="email" type="email" value={form.email} onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full bg-[#FDFAF5] border border-[#E8E0D5] rounded-xl px-4 py-3 text-sm text-[#1C1917] placeholder:text-[#78716C]/50 focus:outline-none focus:border-[#F4B942]/40 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs text-[#78716C] mb-1.5 block">Phone</label>
                      <input name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#FDFAF5] border border-[#E8E0D5] rounded-xl px-4 py-3 text-sm text-[#1C1917] placeholder:text-[#78716C]/50 focus:outline-none focus:border-[#F4B942]/40 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs text-[#78716C] mb-1.5 block">Destination</label>
                      <input name="destination" value={form.destination} onChange={handleChange}
                        placeholder="Where would you like to go?"
                        className="w-full bg-[#FDFAF5] border border-[#E8E0D5] rounded-xl px-4 py-3 text-sm text-[#1C1917] placeholder:text-[#78716C]/50 focus:outline-none focus:border-[#F4B942]/40 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs text-[#78716C] mb-1.5 block">Travel Date</label>
                      <input type="date" name="travelDate" value={form.travelDate} onChange={handleChange}
                        className="w-full bg-[#FDFAF5] border border-[#E8E0D5] rounded-xl px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#F4B942]/40 transition-all [color-scheme:dark]" />
                    </div>
                    <div>
                      <label className="text-xs text-[#78716C] mb-1.5 block">Budget Range</label>
                      <select name="budget" value={form.budget} onChange={handleChange}
                        className="w-full bg-[#FDFAF5] border border-[#E8E0D5] rounded-xl px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#F4B942]/40 transition-all cursor-pointer">
                        <option value="" className="bg-[#F5F0E8]">Select budget</option>
                        {['Under ₹30,000', '₹30,000–₹75,000', '₹75,000–₹1,50,000', 'Above ₹1,50,000'].map(b => (
                          <option key={b} value={b} className="bg-[#F5F0E8]">{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#78716C] mb-1.5 block">Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                      placeholder="Tell us about your dream trip, special requests, or any questions..."
                      className="w-full bg-[#FDFAF5] border border-[#E8E0D5] rounded-xl px-4 py-3 text-sm text-[#1C1917] placeholder:text-[#78716C]/50 focus:outline-none focus:border-[#F4B942]/40 transition-all resize-none" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="flex items-center justify-center gap-2 w-full bg-[#F4B942] hover:bg-[#e5ab38] disabled:opacity-60 text-[#0D1117] font-semibold py-3.5 rounded-xl transition-colors text-sm">
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-[#0D1117]/30 border-t-[#0D1117] rounded-full animate-spin" />
                    ) : (
                      <><Send size={16} /> Send Enquiry</>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
