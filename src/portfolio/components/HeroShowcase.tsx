import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, Smartphone, Laptop, ArrowRight } from 'lucide-react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

interface Slide {
  id: number
  icon: typeof Monitor
  title: string
  highlight: string
  description: string
}

const slides: Slide[] = [
  {
    id: 0,
    icon: Monitor,
    title: 'Custom',
    highlight: 'Web Applications',
    description: 'Responsive, modern web apps built for the browser — from dashboards to full-scale platforms.',
  },
  {
    id: 1,
    icon: Smartphone,
    title: 'Mobile',
    highlight: 'App Development',
    description: 'Native-feeling apps for iOS and Android — built once, performant everywhere.',
  },
  {
    id: 2,
    icon: Laptop,
    title: 'Desktop',
    highlight: 'Software Solutions',
    description: 'Powerful, offline-capable applications for Windows, macOS, and Linux.',
  },
]

export function HeroShowcase() {
  const [current, setCurrent] = useState(0)
  const reduced = usePrefersReducedMotion()

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  useEffect(() => {
    if (reduced) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next, reduced])

  const slide = slides[current]

  return (
    <div className="relative w-full">
      {/* Slide content */}
      <div className="relative min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <slide.icon size={24} className="text-white/60" strokeWidth={1.5} />
            </div>

            {/* Text */}
            <div className="space-y-2">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {slide.title}{' '}
                <span className="sl-gradient-text-light">{slide.highlight}</span>
              </h3>
              <p className="max-w-xs text-sm leading-relaxed text-white/45">
                {slide.description}
              </p>
            </div>

            {/* CTA */}
            <a href="#services" className="group inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white">
              Learn more
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-3">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-violet-400' : 'w-1.5 bg-white/20 hover:bg-white/30'
            }`}
            aria-label={`Go to ${s.title} ${s.highlight}`}
          />
        ))}
      </div>
    </div>
  )
}
