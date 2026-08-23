import React from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  yOffset?: number
  once?: boolean
}

export function FadeUp({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  yOffset = 24,
  once = true,
}: RevealProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // cinematic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  delayChildren = 0,
  once = true,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  delayChildren?: number
  once?: boolean
}) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
  yOffset = 20,
}: {
  children: React.ReactNode
  className?: string
  yOffset?: number
}) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SlideIn({
  children,
  className = '',
  from = 'left',
  delay = 0,
  duration = 0.7,
  distance = 56,
}: {
  children: React.ReactNode
  className?: string
  from?: 'left' | 'right'
  delay?: number
  duration?: number
  distance?: number
}) {
  const reduced = usePrefersReducedMotion()
  const sign = from === 'left' ? -1 : 1

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: sign * distance }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function RevealLine({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
