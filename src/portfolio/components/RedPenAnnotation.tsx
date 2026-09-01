import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

interface RedPenAnnotationProps {
  children: React.ReactNode
  note?: string
  strikeThrough?: boolean
  type?: 'circle' | 'underline' | 'box' | 'badge'
  notePosition?: 'top' | 'bottom' | 'right' | 'inline'
  className?: string
  alwaysVisible?: boolean
}

/**
 * Hand-marked Red Pen Annotation Component
 * Used to highlight technical decisions, corrections, and engineering notes.
 * Positions annotations safely to prevent overlapping multiline text.
 */
export function RedPenAnnotation({
  children,
  note,
  strikeThrough = false,
  type = 'underline',
  notePosition = 'right',
  className = '',
  alwaysVisible = false,
}: RedPenAnnotationProps) {
  const [isHovered, setIsHovered] = useState(false)
  const reduced = usePrefersReducedMotion()

  const getPositionClasses = () => {
    switch (notePosition) {
      case 'bottom':
        return 'top-[calc(100%+8px)] left-0'
      case 'right':
        return 'left-[calc(100%+10px)] top-1/2 -translate-y-1/2'
      case 'inline':
        return 'relative ml-2 align-middle inline-flex'
      case 'top':
      default:
        return '-top-8 left-1/2 -translate-x-1/2'
    }
  }

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-draft-target={note || 'Annotation'}
    >
      {/* ── Main Text Element ── */}
      <span
        className={`relative z-10 transition-colors ${
          strikeThrough ? 'salira-strikethrough' : ''
        }`}
      >
        {children}
      </span>

      {/* ── SVG Hand-Drawn Annotations ── */}
      {(alwaysVisible || isHovered) && (
        <>
          {type === 'underline' && (
            <svg
              className="pointer-events-none absolute -bottom-1 left-0 w-full overflow-visible"
              height="6"
              viewBox="0 0 100 6"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path
                d="M 0,3 Q 25,0 50,4 Q 75,6 100,2"
                fill="none"
                stroke="var(--salira-redpen)"
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={reduced ? {} : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </svg>
          )}

          {type === 'circle' && (
            <svg
              className="pointer-events-none absolute -inset-1.5 h-[calc(100%+12px)] w-[calc(100%+12px)] overflow-visible"
              viewBox="0 0 120 40"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path
                d="M 5,20 C 5,5 115,3 115,20 C 115,37 8,38 12,22"
                fill="none"
                stroke="var(--salira-redpen)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="200"
                initial={reduced ? {} : { strokeDashoffset: 200 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
            </svg>
          )}

          {type === 'box' && (
            <span
              className="pointer-events-none absolute -inset-1 rounded border border-dashed border-[var(--salira-redpen)] bg-[var(--salira-redpen-bg)]"
              aria-hidden="true"
            />
          )}
        </>
      )}

      {/* ── Red Pen Note Callout ── */}
      {note && (
        <AnimatePresence>
          {(alwaysVisible || isHovered) && (
            <motion.span
              initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-none absolute whitespace-nowrap rounded border border-[var(--salira-redpen-border)] bg-[#FFF9F8] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--salira-redpen)] shadow-xs backdrop-blur-sm z-30 ${getPositionClasses()}`}
            >
              ✎ {note}
            </motion.span>
          )}
        </AnimatePresence>
      )}
    </span>
  )
}
