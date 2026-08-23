import type { OrderStatus } from '../../types/domain'
import { cn } from '../../lib/cn'

const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  NEW: { label: 'New', color: 'text-blue-700', bg: 'bg-blue-50' },
  ACCEPTED: { label: 'Accepted', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  PREPARING: { label: 'Preparing', color: 'text-amber-700', bg: 'bg-amber-50' },
  READY: { label: 'Ready', color: 'text-purple-700', bg: 'bg-purple-50' },
  OUT_FOR_DELIVERY: { label: 'Out for delivery', color: 'text-indigo-700', bg: 'bg-indigo-50' },
  COMPLETED: { label: 'Completed', color: 'text-gray-600', bg: 'bg-gray-100' },
}

export function StatusPill({
  status,
  className,
}: {
  status: OrderStatus
  className?: string
}) {
  const c = statusConfig[status]
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold',
        c.bg,
        c.color,
        className,
      )}
    >
      {c.label}
    </span>
  )
}

export { statusConfig }
