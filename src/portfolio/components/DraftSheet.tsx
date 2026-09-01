import React from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

interface DraftSheetProps {
  id?: string
  sheetNumber: string
  title: string
  revision?: string
  coordinates?: string
  classification?: string
  children: React.ReactNode
  className?: string
  marginAnnotation?: React.ReactNode
}

/**
 * Numbered Blueprint Sheet Component ("The Working Draft")
 * Encases sections as individual technical sheets with drawing registration marks,
 * metadata header blocks, and paper elevation.
 */
export function DraftSheet({
  id,
  sheetNumber,
  title,
  revision = 'REV 2026.09',
  coordinates = '13.0827° N, 80.2707° E',
  classification = 'TECHNICAL WORKING DRAFT',
  children,
  className = '',
  marginAnnotation,
}: DraftSheetProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id={id}
      className={`relative scroll-mt-20 px-3 py-10 sm:px-6 sm:py-16 md:px-8 ${className}`}
    >
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-6xl rounded-xl border border-[var(--salira-border-draft)] bg-[var(--salira-paper-lifted)] p-5 shadow-[0_12px_40px_rgba(10,61,98,0.04)] sm:p-8 md:p-10"
      >
        {/* ── Sheet Corner Registration Marks ── */}
        <div className="salira-sheet-corner salira-corner-tl" />
        <div className="salira-sheet-corner salira-corner-tr" />
        <div className="salira-sheet-corner salira-corner-bl" />
        <div className="salira-sheet-corner salira-corner-br" />

        {/* ── Technical Blueprint Header Bar ── */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--salira-border-draft)] pb-4 text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--salira-graphite-muted)]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded bg-[var(--salira-blueprint)] px-2 py-0.5 font-bold text-white">
              <span>{sheetNumber}</span>
            </span>
            <span className="font-semibold text-[var(--salira-blueprint)]">{title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[9px] text-[var(--salira-graphite-muted)]">
            <span className="hidden md:inline">
              COORD: <span className="text-[var(--salira-graphite)]">{coordinates}</span>
            </span>
            <span>
              STATUS: <span className="font-bold text-[var(--salira-redpen)]">{revision}</span>
            </span>
            <span className="hidden sm:inline rounded border border-[var(--salira-border-draft)] px-1.5 py-0.5 text-[8px] tracking-widest text-[var(--salira-blueprint)]">
              {classification}
            </span>
          </div>
        </div>

        {/* ── Main Sheet Content ── */}
        <div className="relative">
          {children}

          {/* ── Margin Annotation (if provided) ── */}
          {marginAnnotation && (
            <div className="mt-8 border-t border-dashed border-[var(--salira-border-draft)] pt-4 text-xs">
              {marginAnnotation}
            </div>
          )}
        </div>

        {/* ── Blueprint Footer Stamp ── */}
        <div className="mt-10 flex items-center justify-between border-t border-[var(--salira-border-draft)] pt-3 font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--salira-graphite-muted)]">
          <span>SALIRA STUDIO · SYSTEM DRAFT</span>
          <span className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-[var(--salira-blueprint)]" />
            100% EXPOSED ARCHITECTURE
          </span>
        </div>
      </motion.div>
    </section>
  )
}
