import { cn } from '../../../shared/lib/cn'
import { ORDER_STAGES, STAGE_PILL_CLASS, type OrderStageId } from './orderFlow'

export function StagePill({
  stage,
  className,
}: {
  stage: OrderStageId
  className?: string
}) {
  const label = ORDER_STAGES.find((s) => s.id === stage)?.label ?? stage
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide transition-colors duration-500',
        STAGE_PILL_CLASS[stage],
        className,
      )}
    >
      {label}
    </span>
  )
}
