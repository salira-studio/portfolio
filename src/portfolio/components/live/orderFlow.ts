import { useEffect, useState } from 'react'

/* Shared vocabulary for the portfolio's live order-flow simulations.
   Everything is client-side state + timers — same model as the AURA demo. */

export const ORDER_STAGES = [
  { id: 'new', label: 'New', caption: 'Order placed in the customer app' },
  { id: 'preparing', label: 'Preparing', caption: 'The kitchen picks it up and starts cooking' },
  { id: 'ready', label: 'Ready', caption: 'Marked ready — the customer sees it instantly' },
] as const

export type OrderStageId = (typeof ORDER_STAGES)[number]['id']

export function stageAt(index: number) {
  return ORDER_STAGES[((index % ORDER_STAGES.length) + ORDER_STAGES.length) % ORDER_STAGES.length]
}

/* One design-system hue, expressed as rising intensity:
   outlined → washed → solid accent. */
export const STAGE_PILL_CLASS: Record<OrderStageId, string> = {
  new: 'border border-[var(--sl-line)] bg-[var(--sl-surface)] text-[var(--sl-ink-soft)]',
  preparing: 'border border-transparent bg-[var(--sl-accent-wash)] text-[var(--sl-accent-strong)]',
  ready: 'border border-transparent bg-[var(--sl-accent)] text-white',
}

/* A single interval that drives a whole simulation; disabled when paused
   or when the visitor prefers reduced motion. */
export function useTicker(intervalMs: number, enabled: boolean): number {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!enabled || intervalMs <= 0) return
    const id = window.setInterval(() => setTick((t) => t + 1), intervalMs)
    return () => window.clearInterval(id)
  }, [enabled, intervalMs])

  return tick
}
