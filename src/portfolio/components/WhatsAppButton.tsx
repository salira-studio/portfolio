import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

const WHATSAPP_NUMBER = '917397430568'
const PRE_FILLED_MSG = "Hi SaLira Studio, I'm interested in discussing a custom software build."

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 400 && !hasScrolled) {
        setHasScrolled(true)
        const showTimer = setTimeout(() => setShowTooltip(true), 1200)
        const hideTimer = setTimeout(() => setShowTooltip(false), 7000)
        return () => {
          clearTimeout(showTimer)
          clearTimeout(hideTimer)
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [hasScrolled])

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PRE_FILLED_MSG)}`

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      {/* ── Technical Drafting Tooltip ── */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-64 rounded-lg border border-[var(--salira-border-draft-strong)] bg-[var(--salira-paper-lifted)] p-3.5 shadow-lg backdrop-blur-md"
          >
            {/* Corner registration marks */}
            <div className="salira-sheet-corner salira-corner-tl" />
            <div className="salira-sheet-corner salira-corner-tr" />
            <div className="salira-sheet-corner salira-corner-bl" />
            <div className="salira-sheet-corner salira-corner-br" />

            <button
              onClick={() => setShowTooltip(false)}
              aria-label="Dismiss dispatch alert"
              className="absolute top-2 right-2 text-[var(--salira-graphite-muted)] hover:text-[var(--salira-blueprint)]"
            >
              <X size={13} />
            </button>
            <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--salira-blueprint)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--salira-redpen)] animate-pulse" />
              <span>DIRECT DISPATCH CHANNEL</span>
            </div>
            <p className="mt-1 font-display text-xs font-bold text-[var(--salira-graphite)]">
              Engineering a custom business app?
            </p>
            <p className="mt-1 font-mono text-[10px] text-[var(--salira-graphite-soft)] leading-relaxed">
              Chat directly with an engineer. No sales pressure.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Blueprint Reskinned WhatsApp Button ── */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Studio Dispatch"
        data-draft-target="WhatsApp Dispatch"
        className="group relative flex h-13 w-13 items-center justify-center rounded-xl border border-[var(--salira-border-draft-strong)] bg-[var(--salira-blueprint)] text-white shadow-[0_8px_24px_rgba(10,61,98,0.25)] transition-all duration-200 hover:bg-[#082F4D] hover:shadow-[0_12px_32px_rgba(10,61,98,0.35)] active:scale-95"
        whileHover={reduced ? {} : { scale: 1.05 }}
        whileTap={reduced ? {} : { scale: 0.95 }}
      >
        {/* Subtle WhatsApp Green Verification Dot */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#20BD5A] ring-2 ring-[var(--salira-paper)] shadow-2xs">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
        </span>

        {/* WhatsApp Icon in Clean White */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6 transition-transform duration-200 group-hover:scale-110"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </div>
  )
}
