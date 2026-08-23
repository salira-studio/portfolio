import { cn } from '../../lib/cn'

type Props = {
  label: string
  selected?: boolean
  onClick?: () => void
  className?: string
}

export function Chip({ label, selected = false, onClick, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer select-none',
        selected
          ? 'bg-[var(--color-espresso-900)] text-white'
          : 'bg-white border border-[var(--color-line)] text-[var(--color-espresso-700)] hover:border-[var(--color-espresso-700)]',
        className,
      )}
    >
      {label}
    </button>
  )
}
