import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, MessageSquare, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

interface MobileDraftNavProps {
  onNavigate?: () => void
}

export function MobileDraftNav({ onNavigate }: MobileDraftNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const reduced = usePrefersReducedMotion()

  const sheets = [
    { num: 'SHEET 01', label: 'Draft Statement (Hero)', href: '/#hero' },
    { num: 'SHEET 02', label: 'Proof: Case Studies', href: '/#case-studies' },
    { num: 'SHEET 03', label: 'Engineering Specs', href: '/#services' },
    { num: 'SHEET 04', label: 'The Drafting Sprints', href: '/#how-we-work' },
    { num: 'SHEET 05', label: 'Transparent Scope & Pricing', href: '/#pricing' },
    { num: 'SHEET 06', label: 'Studio Dispatch', href: '/#contact' },
  ]

  const handleLinkClick = (href: string) => {
    setIsOpen(false)
    if (onNavigate) onNavigate()

    if (href.startsWith('/#') && location.pathname === '/') {
      const targetId = href.replace('/#', '')
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="md:hidden">
      {/* ── Toggle Button (Min 44x44px touch target) ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close blueprint index' : 'Open blueprint index'}
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--salira-border-draft)] bg-[var(--salira-paper-lifted)] text-[var(--salira-blueprint)] transition-colors hover:border-[var(--salira-blueprint)] active:scale-95"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* ── Drawer Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-16 z-50 flex flex-col bg-[var(--salira-paper)]/95 p-6 backdrop-blur-lg"
          >
            <div className="relative flex flex-1 flex-col justify-between overflow-y-auto rounded-xl border border-[var(--salira-border-draft)] bg-[var(--salira-paper-lifted)] p-6 shadow-xl">
              {/* Sheet Corner Marks */}
              <div className="salira-sheet-corner salira-corner-tl" />
              <div className="salira-sheet-corner salira-corner-tr" />
              <div className="salira-sheet-corner salira-corner-bl" />
              <div className="salira-sheet-corner salira-corner-br" />

              <div>
                <div className="flex items-center justify-between border-b border-[var(--salira-border-draft)] pb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--salira-graphite-muted)]">
                  <span className="text-[var(--salira-blueprint)] font-bold">INDEX · DRAWING SHEETS</span>
                  <span>REV 2026.09</span>
                </div>

                {/* Primary Nav Links */}
                <div className="mt-4 space-y-1">
                  <Link
                    to="/work"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between rounded-lg p-2.5 font-display text-lg font-bold text-[var(--salira-graphite)] hover:bg-[var(--salira-border-draft)]/20"
                  >
                    <span>All Case Studies &amp; Demos</span>
                    <ArrowUpRight size={16} className="text-[var(--salira-redpen)]" />
                  </Link>

                  <div className="my-3 border-t border-[var(--salira-border-draft)]" />

                  {/* Numbered Sheets Navigation */}
                  <div className="space-y-1">
                    {sheets.map((s) => (
                      <a
                        key={s.num}
                        href={s.href}
                        onClick={(e) => {
                          if (location.pathname === '/') {
                            e.preventDefault()
                            handleLinkClick(s.href)
                          } else {
                            setIsOpen(false)
                          }
                        }}
                        className="flex items-center justify-between rounded p-2 text-xs font-mono transition-colors hover:bg-white"
                      >
                        <span className="font-bold text-[var(--salira-blueprint)]">{s.num}</span>
                        <span className="text-[var(--salira-graphite)]">{s.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct Communication Channels */}
              <div className="mt-6 border-t border-[var(--salira-border-draft)] pt-4">
                <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-[var(--salira-graphite-muted)]">
                  DIRECT STUDIO DISPATCH
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <a
                    href="tel:+917397430568"
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-[var(--salira-border-draft)] bg-white py-2.5 text-[var(--salira-graphite)]"
                  >
                    <Phone size={13} className="text-[var(--salira-blueprint)]" />
                    <span>Call Studio</span>
                  </a>
                  <a
                    href="https://wa.me/917397430568"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-[var(--salira-blueprint)] py-2.5 text-white"
                  >
                    <MessageSquare size={13} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
