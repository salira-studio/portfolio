import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

interface CursorState {
  label: string | null
  variant: 'default' | 'hover' | 'button' | 'card' | 'hidden'
}

export function CustomCursor() {
  const reduced = usePrefersReducedMotion()
  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: coarse)').matches
  })
  const [cursorState, setCursorState] = useState<CursorState>({
    label: null,
    variant: 'default',
  })
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      // Find if hovering over any custom cursor target
      const target = (e.target as HTMLElement).closest(
        '[data-cursor], a, button, [role="button"]'
      ) as HTMLElement | null

      if (target) {
        const customType = target.getAttribute('data-cursor')
        const customText = target.getAttribute('data-cursor-text')

        if (customType === 'view' || customType === 'open') {
          setCursorState({
            label: customText || (customType === 'view' ? 'View' : 'Open'),
            variant: 'card',
          })
        } else if (customType === 'hidden') {
          setCursorState({ label: null, variant: 'hidden' })
        } else if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a') {
          setCursorState({
            label: null,
            variant: target.classList.contains('btn-magnetic') ? 'button' : 'hover',
          })
        } else {
          setCursorState({ label: null, variant: 'hover' })
        }
      } else {
        setCursorState({ label: null, variant: 'default' })
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY, isVisible, isTouchDevice])

  if (reduced || isTouchDevice || !isVisible) {
    return null
  }

  const isCard = cursorState.variant === 'card'
  const isButton = cursorState.variant === 'button'
  const isHover = cursorState.variant === 'hover'
  const isHidden = cursorState.variant === 'hidden'

  if (isHidden) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 flex items-center justify-center font-sans select-none"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        animate={{
          width: isCard ? 72 : isButton ? 44 : isHover ? 28 : 10,
          height: isCard ? 72 : isButton ? 44 : isHover ? 28 : 10,
          backgroundColor: isCard
            ? 'rgba(198, 71, 43, 0.92)'
            : isButton
            ? 'rgba(23, 22, 27, 0.12)'
            : isHover
            ? 'rgba(198, 71, 43, 0.16)'
            : 'rgba(23, 22, 27, 0.75)',
          scale: 1,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 300,
          mass: 0.4,
        }}
        className="flex items-center justify-center rounded-full backdrop-blur-[2px] shadow-sm"
      >
        {isCard && cursorState.label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[11px] font-semibold tracking-wider text-[var(--sl-paper)] uppercase"
          >
            {cursorState.label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  )
}
