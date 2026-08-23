import { cn } from '../../lib/cn'

type BadgeVariant = 'veg' | 'non-veg' | 'popular' | 'signature' | 'sold-out'

const variantStyles: Record<BadgeVariant, string> = {
  veg: 'bg-[var(--color-leaf-600)] text-white',
  'non-veg': 'bg-red-600 text-white',
  popular: 'bg-[var(--color-brass-500)] text-white',
  signature: 'bg-[var(--color-espresso-900)] text-white',
  'sold-out': 'bg-gray-200 text-gray-500',
}

export function Badge({
  variant,
  children,
  className,
}: {
  variant: BadgeVariant
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
