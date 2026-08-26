import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * Soft warm orbs that drift as the user scrolls — ambient background motion.
 */
export function ScrollAmbient() {
  const reduced = usePrefersReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 45, damping: 28, mass: 0.4 })

  const y1 = useTransform(smooth, [0, 1], [0, 180])
  const y2 = useTransform(smooth, [0, 1], [0, -140])
  const y3 = useTransform(smooth, [0, 1], [40, -80])
  const x1 = useTransform(smooth, [0, 1], [0, 60])
  const x2 = useTransform(smooth, [0, 1], [0, -50])
  const scale = useTransform(smooth, [0, 0.5, 1], [1, 1.08, 1])

  useEffect(() => {
    if (reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    setEnabled(true)
  }, [reduced])

  if (!enabled) return null

  return (
    <div className="sl-scroll-ambient" aria-hidden="true">
      <motion.div
        className="sl-orb sl-orb-peach"
        style={{ y: y1, x: x1, scale }}
      />
      <motion.div
        className="sl-orb sl-orb-mist"
        style={{ y: y2, x: x2 }}
      />
      <motion.div
        className="sl-orb sl-orb-gold"
        style={{ y: y3 }}
      />
    </div>
  )
}
