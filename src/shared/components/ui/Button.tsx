import { cn } from '../../lib/cn'
import { motion } from 'framer-motion'

type Props = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  className,
}: Props) {
  return (
    <motion.div whileTap={{ scale: disabled ? 1 : 0.97 }} className={cn(fullWidth && 'w-full')}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold rounded-[10px] transition-all duration-200 cursor-pointer select-none',
          variant === 'primary' && 'bg-[var(--color-clay-500)] text-white hover:bg-[var(--color-clay-600)] shadow-sm',
          variant === 'secondary' && 'bg-transparent text-[var(--color-espresso-900)] border-[1.5px] border-[var(--color-line)] hover:border-[var(--color-espresso-700)] hover:bg-[var(--color-ivory-100)]',
          variant === 'ghost' && 'bg-transparent text-[var(--color-espresso-700)] hover:text-[var(--color-espresso-900)] hover:bg-[var(--color-ivory-100)]',
          variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700',
          size === 'sm' && 'text-xs px-3 py-1.5',
          size === 'md' && 'text-sm px-5 py-2.5',
          size === 'lg' && 'text-base px-6 py-3',
          fullWidth && 'w-full',
          disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
          className,
        )}
      >
        {children}
      </button>
    </motion.div>
  )
}
