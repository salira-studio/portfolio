import { cn } from '../../lib/cn'

type BadgeVariant = 'veg' | 'non-veg' | 'popular' | 'signature' | 'sold-out' | 'warning'

const variantStyles: Record<BadgeVariant, string> = {
  veg: 'bg-[#3A7D2C] text-white',
  'non-veg': 'bg-[#C0392B] text-white',
  popular: 'bg-[#D6890F] text-[#13294B]',
  signature: 'bg-[#C0217A] text-white',
  'sold-out': 'bg-[#EFECE6] text-[#5C5A62]',
  warning: 'bg-[#FAF6DC] text-[#706600] border border-[#E0D8A0]',
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
