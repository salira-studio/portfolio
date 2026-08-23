export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

export function formatTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

export function generateOrderNumber(): string {
  const prefix = 'A'
  const num = Math.floor(1000 + Math.random() * 9000)
  return `${prefix}${num}`
}

export function timeAgo(iso: string): string {
  const now = Date.now()
  const then = new Date(iso).getTime()
  const diffMs = now - then
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}
