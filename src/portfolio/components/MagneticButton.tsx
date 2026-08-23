import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  [key: string]: any
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.28,
  ...props
}: MagneticButtonProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 18, stiffness: 220, mass: 0.2 }
  const smoothX = useSpring(x, springConfig)
  const smoothY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const distanceX = clientX - centerX
    const distanceY = clientY - centerY

    x.set(distanceX * strength)
    y.set(distanceY * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  if (reduced) {
    return (
      <div className={`inline-block ${className}`} {...props}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className={`btn-magnetic inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
