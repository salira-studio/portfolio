import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

interface WishlistButtonProps {
  itemId: string
  itemType: 'destination' | 'package'
  className?: string
  size?: number
  onToggle?: (isWishlisted: boolean) => void
}

function getWishlist(): string[] {
  try {
    return JSON.parse(localStorage.getItem('travel_wishlist') || '[]')
  } catch {
    return []
  }
}

function setWishlist(items: string[]) {
  localStorage.setItem('travel_wishlist', JSON.stringify(items))
}

export function WishlistButton({ itemId, itemType, className = '', size = 20, onToggle }: WishlistButtonProps) {
  const key = `${itemType}:${itemId}`
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const wishlist = getWishlist()
    setIsWishlisted(wishlist.includes(key))
  }, [key])

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const wishlist = getWishlist()
    const newState = !isWishlisted
    const updated = newState ? [...wishlist, key] : wishlist.filter(id => id !== key)
    setWishlist(updated)
    setIsWishlisted(newState)
    setAnimating(true)
    setTimeout(() => setAnimating(false), 400)
    onToggle?.(newState)
  }

  return (
    <button
      onClick={toggle}
      className={`relative flex items-center justify-center rounded-full transition-all ${className}`}
      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <AnimatePresence>
        {animating && isWishlisted && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#F4B942]"
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * 60 * Math.PI) / 180) * 12,
                  y: Math.sin((i * 60 * Math.PI) / 180) * 12,
                }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
      <motion.div
        animate={animating ? { scale: [1, 1.4, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          size={size}
          className={`transition-colors duration-200 ${isWishlisted ? 'fill-[#F4B942] text-[#F4B942]' : 'text-white/70 hover:text-[#F4B942]'}`}
        />
      </motion.div>
    </button>
  )
}

export { getWishlist, setWishlist }
