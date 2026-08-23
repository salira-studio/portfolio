import type { DietaryTag } from '../../types/domain'

export function VegDot({ type }: { type: DietaryTag }) {
  const color = type === 'veg' ? '#3E6A38' : '#C4342D'
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-label={type}>
      <rect x="0.5" y="0.5" width="13" height="13" rx="2" stroke={color} strokeWidth="1.2" />
      <circle cx="7" cy="7" r="3" fill={color} />
    </svg>
  )
}
