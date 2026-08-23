import { cn } from '../../shared/lib/cn'

export function LiveBadge({
  paused = false,
  label,
  className,
}: {
  paused?: boolean
  label?: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[rgba(46,111,94,0.1)] px-2.5 py-1 text-[11px] font-semibold text-[var(--sl-teal-deep)] ring-1 ring-[rgba(46,111,94,0.25)]',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('h-1.5 w-1.5 rounded-full bg-[var(--sl-teal-deep)]', !paused && 'animate-pulse')}
      />
      {label ?? (paused ? 'Paused' : 'Live sync, no backend')}
    </span>
  )
}
