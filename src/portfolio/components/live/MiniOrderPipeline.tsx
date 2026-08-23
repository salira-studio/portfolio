import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion'
import { stageAt, useTicker } from './orderFlow'
import { StagePill } from './StagePill'
import { cn } from '../../../shared/lib/cn'

/* Row interval — three staggered rows make a full wave every ~5.1s. */
const ROW_MS = 1700

const ORDERS = [
  { id: '#1042', item: 'Masala Dosa ×2' },
  { id: '#1043', item: 'Full Meals ×1' },
  { id: '#1044', item: 'Filter Coffee ×2' },
]

export function MiniOrderPipeline() {
  const reduced = usePrefersReducedMotion()
  const tick = useTicker(ROW_MS, !reduced)

  return (
    <div
      className="rounded-xl border border-[var(--sl-line)] bg-[var(--sl-surface)] p-3 shadow-sm"
      role="img"
      aria-label="Live view of the AURA restaurant console order pipeline: three orders continuously advance between new, preparing and ready."
    >
      <div aria-hidden="true" className="flex items-center justify-between px-1 pb-2.5">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--sl-ink-faint)]">
          Console · Orders today
        </span>
        <span
          className={cn(
            'inline-flex items-center gap-1 text-[10px] font-semibold',
            reduced ? 'text-[var(--sl-ink-faint)]' : 'text-emerald-700',
          )}
        >
          <span className={cn('h-1.5 w-1.5 rounded-full bg-emerald-500', !reduced && 'animate-pulse')} />
          {reduced ? 'Sample state' : 'Auto-updating'}
        </span>
      </div>

      <div aria-hidden="true" className="space-y-1.5">
        {ORDERS.map((order, i) => {
          const stage = reduced ? stageAt(2 - i) : stageAt(tick + i)
          return (
            <div
              key={order.id}
              className="flex items-center justify-between gap-2 rounded-lg border border-[var(--sl-line-light)] bg-[var(--sl-paper)] px-3 py-2"
            >
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold">{order.item}</p>
                <p className="text-[10px] text-[var(--sl-ink-faint)]">{order.id}</p>
              </div>
              <StagePill stage={stage.id} />
            </div>
          )
        })}
      </div>

      <p className="sr-only">
        Three sample orders are shown in different states — new, preparing and ready — to demonstrate the live order pipeline without any backend.
      </p>
    </div>
  )
}
