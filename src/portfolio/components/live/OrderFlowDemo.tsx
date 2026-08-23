import { useState } from 'react'
import { ArrowRight, Check, MonitorCog, Pause, Play, Smartphone } from 'lucide-react'
import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion'
import { LiveBadge } from '../LiveBadge'
import { ORDER_STAGES, useTicker } from './orderFlow'
import { StagePill } from './StagePill'
import { cn } from '../../../shared/lib/cn'

/* How long each stage holds before advancing. Three stages ≈ 6.6s loop. */
const STAGE_MS = 2200

export function OrderFlowDemo() {
  const reduced = usePrefersReducedMotion()
  const [paused, setPaused] = useState(false)
  const tick = useTicker(STAGE_MS, !reduced && !paused)

  /* Reduced motion: freeze on the final "Ready" end-state frame. */
  const stageIndex = reduced ? ORDER_STAGES.length - 1 : tick % ORDER_STAGES.length
  const stage = ORDER_STAGES[stageIndex]
  const isPaused = !reduced && paused

  return (
    <div
      className="sl-card relative p-5 sm:p-6"
      role="img"
      aria-label={
        reduced
          ? 'Static preview of an AURA order at its final stage: marked ready on the restaurant console after moving through new and preparing.'
          : 'Animated demonstration of an AURA order moving between the customer app and the restaurant console: new, then preparing, then ready. The sequence loops automatically.'
      }
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <span className="sl-label">Live demonstration</span>
        <div className="flex items-center gap-2">
          <LiveBadge paused={isPaused} className="hidden sm:inline-flex" />
          {!reduced && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              aria-label={paused ? 'Resume the order simulation' : 'Pause the order simulation'}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[var(--sl-line)] bg-[var(--sl-surface)] text-[var(--sl-ink-soft)] transition-colors hover:border-[var(--sl-ink-faint)] hover:text-[var(--sl-ink)]"
            >
              {paused ? <Play size={11} /> : <Pause size={11} />}
            </button>
          )}
        </div>
      </div>

      {/* Two sides of the system */}
      <div aria-hidden="true" className="mt-5 grid grid-cols-2 items-stretch gap-2.5 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
        {/* Customer app panel */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className={cn(
            'rounded-xl border bg-[var(--sl-paper)] p-3.5 transition-colors duration-500 sm:p-4',
            stageIndex === 0 ? 'border-[var(--sl-accent-soft)]' : 'border-[var(--sl-line)]',
          )}
        >
          <div className="flex items-center gap-1.5">
            <Smartphone size={13} strokeWidth={1.8} className="text-[var(--sl-ink-faint)]" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--sl-ink-faint)]">
              Customer app
            </span>
          </div>
          <div className="mt-3 rounded-lg bg-[var(--sl-surface)] ring-1 ring-[var(--sl-line)] p-2.5">
            <p className="truncate text-xs font-semibold sm:text-sm">Masala Dosa ×2</p>
            <p className="mt-0.5 truncate text-[10px] text-[var(--sl-ink-faint)]">#1042 · Pickup</p>
            <StagePill stage={stage.id} className="mt-2.5" />
          </div>
        </div>

        {/* Connector */}
        <div className="relative hidden items-center justify-center sm:flex">
          <ArrowRight
            size={16}
            className={cn(
              'transition-colors duration-700',
              stageIndex >= 1 ? 'text-[var(--sl-accent)]' : 'text-[var(--sl-ink-faint)]',
            )}
          />
        </div>

        {/* Console panel */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className={cn(
            'rounded-xl border bg-[var(--sl-paper)] p-3.5 transition-colors duration-500 sm:p-4',
            stageIndex === 0 ? 'border-[var(--sl-line)]' : 'border-[var(--sl-accent-soft)]',
          )}
        >
          <div className="flex items-center gap-1.5">
            <MonitorCog size={13} strokeWidth={1.8} className="text-[var(--sl-ink-faint)]" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--sl-ink-faint)]">
              Restaurant console
            </span>
          </div>
          <div className="mt-3 rounded-lg bg-[var(--sl-surface)] ring-1 ring-[var(--sl-line)] p-2.5">
            <div className="h-1.5 w-4/5 rounded-full bg-[var(--sl-line)]" />
            <div className="mt-1.5 h-1.5 w-2/5 rounded-full bg-[var(--sl-line-light)]" />
            <div className="mt-2.5 flex items-center justify-between gap-2">
              <StagePill stage={stage.id} />
              <Check
                size={13}
                strokeWidth={2.5}
                className={cn(
                  'transition-opacity duration-700',
                  stageIndex === 2 ? 'text-[var(--sl-accent)] opacity-100' : 'opacity-0',
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Progress track */}
      <div aria-hidden="true" className="relative mt-7 px-1">
        <div className="h-1 rounded-full bg-[var(--sl-line-light)]">
          <div
            className="h-1 rounded-full bg-gradient-to-r from-[var(--sl-accent-soft)] to-[var(--sl-accent)] transition-all duration-700 ease-in-out"
            style={{ width: `${(stageIndex / (ORDER_STAGES.length - 1)) * 100}%` }}
          />
        </div>
        {/* Nodes */}
        {ORDER_STAGES.map((s, i) => (
          <span
            key={s.id}
            style={{ left: `${(i / (ORDER_STAGES.length - 1)) * 100}%` }}
            className={cn(
              'absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-700',
              i <= stageIndex
                ? 'border-[var(--sl-accent)] bg-[var(--sl-accent)]'
                : 'border-[var(--sl-line)] bg-[var(--sl-surface)]',
            )}
          />
        ))}
        {/* Traveling token — customer on the left, console on the right */}
        <span
          style={{ left: `${(stageIndex / (ORDER_STAGES.length - 1)) * 100}%` }}
          className={cn(
            'absolute top-1/2 z-10 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-sm transition-all duration-700 ease-in-out',
            stageIndex === 2 ? 'bg-[var(--sl-accent)]' : 'bg-white ring-1 ring-[var(--sl-accent-soft)]',
          )}
        >
          {stageIndex === 2 && (
            <Check size={10} strokeWidth={3.5} className="text-white" />
          )}
        </span>
      </div>
      <div aria-hidden="true" className="mt-2 flex justify-between px-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--sl-ink-faint)]">
        {ORDER_STAGES.map((s, i) => (
          <span key={s.id} className={cn('transition-colors duration-500', i === stageIndex && 'text-[var(--sl-accent-strong)]')}>
            {s.label}
          </span>
        ))}
      </div>

      {/* Act caption */}
      <p
        aria-hidden="true"
        className="mt-4 min-h-8 border-t border-[var(--sl-line-light)] pt-3 text-xs leading-relaxed text-[var(--sl-ink-soft)] transition-colors sm:text-sm"
      >
        <span className="font-semibold text-[var(--sl-ink)]">{stage.label}. </span>
        {stage.caption}
      </p>

      <p className="sr-only">{stage.caption}</p>
    </div>
  )
}
