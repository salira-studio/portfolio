import { useState } from 'react'
import { DishArt } from './DishArt'
import { artFor } from './artMap'
import { cn } from '../../lib/cn'

/**
 * Renders a food photograph from public/food/<slug>.jpg when available,
 * otherwise falls back to AURA's illustrated dish artwork so the menu
 * never shows broken imagery.
 */
export function FoodImage({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <DishArt archetype={artFor(src)} className={cn(className, 'h-full w-full')} />
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn('object-cover', className)}
    />
  )
}
