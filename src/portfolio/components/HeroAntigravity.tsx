import React, { useEffect, useRef } from 'react'

// Strict Studio Palette Hex & RGB definitions
const PALETTE = {
  ink: { hex: '#17161B', r: 23, g: 22, b: 27 },
  deepPine: { hex: '#1D2B26', r: 29, g: 43, b: 38 },
  oxblood: { hex: '#C6472B', r: 198, g: 71, b: 43 },
  mutedGold: { hex: '#D9A441', r: 217, g: 164, b: 65 },
  deepTeal: { hex: '#2E6F5E', r: 46, g: 111, b: 94 },
  warmPaper: { hex: '#F5F1EA', r: 245, g: 241, b: 234 },
}

interface FloatingElement {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  baseRadius: number
  z: number // Depth: 0.2 (far) to 1.0 (foreground)
  role: 'oxblood' | 'gold' | 'teal'
  hasCoreSpark: boolean
  aspectRatio: number // For pebble/pill elongation
  angle: number
  angularVelocity: number
  swayPhase: number
  swaySpeed: number
  swayAmp: number
  trail: { x: number; y: number; alpha: number }[]
}

// Mute saturation helper (75% saturation target)
function getMutedRgb(
  base: { r: number; g: number; b: number },
  saturationFactor = 0.78
): { r: number; g: number; b: number } {
  const gray = 0.299 * base.r + 0.587 * base.g + 0.114 * base.b
  return {
    r: Math.round(gray + (base.r - gray) * saturationFactor),
    g: Math.round(gray + (base.g - gray) * saturationFactor),
    b: Math.round(gray + (base.b - gray) * saturationFactor),
  }
}

const MUTED_OXBLOOD = getMutedRgb(PALETTE.oxblood, 0.78)
const MUTED_GOLD = getMutedRgb(PALETTE.mutedGold, 0.76)
const MUTED_TEAL = getMutedRgb(PALETTE.deepTeal, 0.78)
const MUTED_PINE = getMutedRgb(PALETTE.deepPine, 0.8)

function lerpColor(
  c1: { r: number; g: number; b: number },
  c2: { r: number; g: number; b: number },
  t: number
): { r: number; g: number; b: number } {
  const clampedT = Math.max(0, Math.min(1, t))
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * clampedT),
    g: Math.round(c1.g + (c2.g - c1.g) * clampedT),
    b: Math.round(c1.b + (c2.b - c1.b) * clampedT),
  }
}

export const HeroAntigravity: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let isVisible = true
    let isReducedMotion = false

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    isReducedMotion = mediaQuery.matches

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches
      if (isReducedMotion) {
        cancelAnimationFrame(animationFrameId)
        drawStaticScene()
      } else {
        lastTime = performance.now()
        animationFrameId = requestAnimationFrame(renderLoop)
      }
    }
    mediaQuery.addEventListener('change', handleReducedMotionChange)

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let isMobile = false

    let elements: FloatingElement[] = []

    function initElements() {
      isMobile = width < 640
      // Desktop: ~15 objects, Mobile: ~7 objects
      const count = isMobile ? 7 : 15
      elements = []

      // 50% Oxblood, 25% Gold (larger/slower), 25% Teal (smaller/faster)
      for (let i = 0; i < count; i++) {
        let role: 'oxblood' | 'gold' | 'teal'
        let baseRadius: number
        let speedMult: number

        if (i < Math.round(count * 0.5)) {
          role = 'oxblood'
          baseRadius = 40 + Math.random() * 45 // Medium-large
          speedMult = 0.55 + Math.random() * 0.45
        } else if (i < Math.round(count * 0.75)) {
          role = 'gold'
          baseRadius = 55 + Math.random() * 50 // Larger, weighted, slower
          speedMult = 0.35 + Math.random() * 0.35
        } else {
          role = 'teal'
          baseRadius = 24 + Math.random() * 32 // Smaller, agile, faster
          speedMult = 0.8 + Math.random() * 0.6
        }

        // Only 1-2 elements total carry the Warm Paper spark glint
        const hasCoreSpark = i === 0 || (!isMobile && i === Math.round(count * 0.5))

        // Depth z: 0.25 (far) to 1.0 (near)
        const z = 0.3 + Math.random() * 0.7

        // Antigravity drift: upward buoyancy (vy < 0) with gentle variance
        const vy = -(0.15 + Math.random() * 0.28) * speedMult * z
        const vx = (Math.random() - 0.5) * 0.22 * speedMult * z

        elements.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          vx,
          vy,
          baseRadius,
          z,
          role,
          hasCoreSpark,
          aspectRatio: 1.05 + Math.random() * 0.45, // Soft organic pebble/lens ratio
          angle: Math.random() * Math.PI * 2,
          angularVelocity: (Math.random() - 0.5) * 0.003,
          swayPhase: Math.random() * Math.PI * 2,
          swaySpeed: 0.008 + Math.random() * 0.012,
          swayAmp: 0.15 + Math.random() * 0.25,
          trail: [],
        })
      }
    }

    function handleResize() {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)

      initElements()

      if (isReducedMotion) {
        drawStaticScene()
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      handleResize()
    })
    resizeObserver.observe(canvas)

    // Pause physics calculation when offscreen
    const intersectionObserver = new IntersectionObserver((entries) => {
      isVisible = entries[0]?.isIntersecting ?? false
    })
    intersectionObserver.observe(canvas)

    let lastTime = performance.now()

    // ── Helper: Draw single element with physics-driven color logic ──
    function drawElement(
      ctx: CanvasRenderingContext2D,
      el: FloatingElement,
      currentTime: number
    ) {
      const radius = el.baseRadius * el.z
      const speed = Math.sqrt(el.vx * el.vx + el.vy * el.vy)

      // 1. Height-based shift:
      // normY: 0 (top of hero) -> 1 (bottom of hero)
      const normY = Math.max(0, Math.min(1, el.y / (height || 1)))
      // Higher in viewport = warmer/brighter (more gold/paper influence);
      // Lower in viewport = cooler/dimmer (more teal/pine influence)
      const heightWarmth = 1 - normY

      // Base role color
      let baseRoleColor = MUTED_OXBLOOD
      if (el.role === 'gold') baseRoleColor = MUTED_GOLD
      if (el.role === 'teal') baseRoleColor = MUTED_TEAL

      // Interpolate with height:
      // High: blend toward gold; Low: blend toward deep pine/teal
      let dynamicColor = baseRoleColor
      if (heightWarmth > 0.5) {
        const warmFactor = (heightWarmth - 0.5) * 0.55
        dynamicColor = lerpColor(dynamicColor, MUTED_GOLD, warmFactor)
      } else {
        const coolFactor = (0.5 - heightWarmth) * 0.55
        dynamicColor = lerpColor(dynamicColor, MUTED_PINE, coolFactor)
      }

      // 4. Depth / Parallax layering:
      // Objects further back shift toward Deep Pine / Ink and lower opacity
      const depthColor = lerpColor(MUTED_PINE, dynamicColor, el.z)
      const depthOpacity = 0.38 + el.z * 0.28 + heightWarmth * 0.1 // 40% - 70% soft translucency

      // 2. Velocity-based shift:
      // Fast speed = cool motion trail with Teal accent
      // Slow/stationary speed = soft Oxblood glow bloom (warmth & weight)
      const speedNorm = Math.min(1, speed / 0.55)

      // Render motion trail for faster objects
      if (!isReducedMotion && speedNorm > 0.35 && el.trail.length > 1) {
        const trailAlpha = (speedNorm - 0.35) * 0.45 * el.z
        ctx.save()
        for (let t = 0; t < el.trail.length - 1; t++) {
          const pt = el.trail[t]
          const ratio = (t + 1) / el.trail.length
          const trRadius = radius * ratio * 0.65
          const trAlpha = trailAlpha * ratio * 0.5

          const grad = ctx.createRadialGradient(
            pt.x,
            pt.y,
            0,
            pt.x,
            pt.y,
            trRadius
          )
          grad.addColorStop(
            0,
            `rgba(${MUTED_TEAL.r}, ${MUTED_TEAL.g}, ${MUTED_TEAL.b}, ${trAlpha})`
          )
          grad.addColorStop(
            1,
            `rgba(${MUTED_TEAL.r}, ${MUTED_TEAL.g}, ${MUTED_TEAL.b}, 0)`
          )

          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(pt.x, pt.y, trRadius, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      // Draw Main Floating Body (translucent glass-like form)
      ctx.save()
      ctx.translate(el.x, el.y)
      ctx.rotate(el.angle)
      ctx.scale(el.aspectRatio, 1 / el.aspectRatio)

      // Stillness bloom for slow moving objects (Oxblood glow)
      if (speedNorm < 0.6) {
        const bloomFactor = (1 - speedNorm / 0.6) * 0.4 * el.z
        const bloomGrad = ctx.createRadialGradient(
          0,
          0,
          radius * 0.4,
          0,
          0,
          radius * 1.9
        )
        bloomGrad.addColorStop(
          0,
          `rgba(${MUTED_OXBLOOD.r}, ${MUTED_OXBLOOD.g}, ${MUTED_OXBLOOD.b}, ${bloomFactor * 0.55})`
        )
        bloomGrad.addColorStop(
          1,
          `rgba(${MUTED_OXBLOOD.r}, ${MUTED_OXBLOOD.g}, ${MUTED_OXBLOOD.b}, 0)`
        )
        ctx.fillStyle = bloomGrad
        ctx.beginPath()
        ctx.arc(0, 0, radius * 1.9, 0, Math.PI * 2)
        ctx.fill()
      }

      // Body Gradient: soft translucent glass diffusion
      const bodyGrad = ctx.createRadialGradient(
        -radius * 0.25,
        -radius * 0.25,
        radius * 0.05,
        0,
        0,
        radius
      )
      bodyGrad.addColorStop(
        0,
        `rgba(${depthColor.r}, ${depthColor.g}, ${depthColor.b}, ${depthOpacity})`
      )
      bodyGrad.addColorStop(
        0.55,
        `rgba(${depthColor.r}, ${depthColor.g}, ${depthColor.b}, ${depthOpacity * 0.7})`
      )
      bodyGrad.addColorStop(
        1,
        `rgba(${depthColor.r}, ${depthColor.g}, ${depthColor.b}, 0)`
      )

      ctx.fillStyle = bodyGrad
      ctx.beginPath()
      ctx.arc(0, 0, radius, 0, Math.PI * 2)
      ctx.fill()

      // Spark Glint (Warm Paper #F5F1EA on 1-2 elements only)
      if (el.hasCoreSpark) {
        const sparkPulse = 0.65 + Math.sin(currentTime * 0.002 + el.id) * 0.25
        const sparkRadius = Math.max(2, radius * 0.12 * el.z)
        const sparkGrad = ctx.createRadialGradient(
          -radius * 0.2,
          -radius * 0.2,
          0,
          -radius * 0.2,
          -radius * 0.2,
          sparkRadius * 2.5
        )
        sparkGrad.addColorStop(
          0,
          `rgba(${PALETTE.warmPaper.r}, ${PALETTE.warmPaper.g}, ${PALETTE.warmPaper.b}, ${0.85 * sparkPulse})`
        )
        sparkGrad.addColorStop(
          0.4,
          `rgba(${PALETTE.warmPaper.r}, ${PALETTE.warmPaper.g}, ${PALETTE.warmPaper.b}, ${0.4 * sparkPulse})`
        )
        sparkGrad.addColorStop(
          1,
          `rgba(${PALETTE.warmPaper.r}, ${PALETTE.warmPaper.g}, ${PALETTE.warmPaper.b}, 0)`
        )

        ctx.fillStyle = sparkGrad
        ctx.beginPath()
        ctx.arc(-radius * 0.2, -radius * 0.2, sparkRadius * 2.5, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    // ── 3. Proximity-based interaction: subtle color bridge between near neighbors ──
    function drawProximityBridges(ctx: CanvasRenderingContext2D) {
      if (isMobile || elements.length < 2) return

      const maxDistance = 210

      for (let i = 0; i < elements.length; i++) {
        for (let j = i + 1; j < elements.length; j++) {
          const a = elements[i]
          const b = elements[j]

          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDistance) {
            const proximityFactor = Math.pow(1 - dist / maxDistance, 2)
            if (proximityFactor < 0.04) continue

            const bridgeAlpha = proximityFactor * 0.22 * Math.min(a.z, b.z)

            // Get base colors of each interacting object
            const colorA =
              a.role === 'oxblood'
                ? MUTED_OXBLOOD
                : a.role === 'gold'
                  ? MUTED_GOLD
                  : MUTED_TEAL
            const colorB =
              b.role === 'oxblood'
                ? MUTED_OXBLOOD
                : b.role === 'gold'
                  ? MUTED_GOLD
                  : MUTED_TEAL

            // Linear gradient thread connecting centers
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
            grad.addColorStop(
              0,
              `rgba(${colorA.r}, ${colorA.g}, ${colorA.b}, ${bridgeAlpha})`
            )
            grad.addColorStop(
              0.5,
              `rgba(${Math.round((colorA.r + colorB.r) / 2)}, ${Math.round((colorA.g + colorB.g) / 2)}, ${Math.round((colorA.b + colorB.b) / 2)}, ${bridgeAlpha * 1.3})`
            )
            grad.addColorStop(
              1,
              `rgba(${colorB.r}, ${colorB.g}, ${colorB.b}, ${bridgeAlpha})`
            )

            ctx.save()
            ctx.strokeStyle = grad
            ctx.lineWidth = 1.2 * Math.min(a.z, b.z)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
    }

    // ── Static Scene for Reduced Motion ──
    function drawStaticScene() {
      if (!ctx || width === 0 || height === 0) return

      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, width, height)

      // Draw peaceful resting arrangement
      elements.forEach((el, index) => {
        // Fixed positions for balanced composition
        el.x = ((index * 73) % 85 + 7) * (width / 100)
        el.y = ((index * 59) % 80 + 10) * (height / 100)
        drawElement(ctx, el, 0)
      })

      ctx.restore()
    }

    // ── Animation / Physics Loop ──
    function renderLoop(currentTime: number) {
      if (!ctx || width === 0 || height === 0) return

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1)
      lastTime = currentTime

      if (isVisible && !isReducedMotion) {
        ctx.save()
        ctx.scale(dpr, dpr)
        ctx.clearRect(0, 0, width, height)

        // Physics step
        elements.forEach((el) => {
          // Buoyant upward drift with deceleration/acceleration sinusoidal draft
          el.swayPhase += el.swaySpeed
          const draftX = Math.sin(el.swayPhase) * el.swayAmp
          const draftY = Math.cos(el.swayPhase * 0.7) * (el.swayAmp * 0.4)

          el.x += (el.vx + draftX * 0.2) * (dt * 60)
          el.y += (el.vy + draftY * 0.15) * (dt * 60)
          el.angle += el.angularVelocity * (dt * 60)

          // Soft boundary wrap (antigravity rising smoothly from bottom when exiting top)
          const pad = el.baseRadius * 2
          if (el.y < -pad) {
            el.y = height + pad * 0.5
            el.x = Math.random() * width
            el.trail = []
          } else if (el.y > height + pad) {
            el.y = -pad * 0.5
            el.x = Math.random() * width
            el.trail = []
          }

          if (el.x < -pad) {
            el.x = width + pad * 0.5
            el.trail = []
          } else if (el.x > width + pad) {
            el.x = -pad * 0.5
            el.trail = []
          }

          // Maintain short history for motion trails
          el.trail.push({ x: el.x, y: el.y, alpha: 1 })
          if (el.trail.length > 5) {
            el.trail.shift()
          }
        })

        // Draw proximity bridges first (behind elements)
        drawProximityBridges(ctx)

        // Draw elements sorted by depth z so foreground overlaps background
        const sorted = [...elements].sort((a, b) => a.z - b.z)
        sorted.forEach((el) => {
          drawElement(ctx, el, currentTime)
        })

        ctx.restore()
      }

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(renderLoop)
      }
    }

    if (!isReducedMotion) {
      lastTime = performance.now()
      animationFrameId = requestAnimationFrame(renderLoop)
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      mediaQuery.removeEventListener('change', handleReducedMotionChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full select-none"
      aria-hidden="true"
      style={{
        mixBlendMode: 'screen',
        opacity: 0.95,
      }}
    />
  )
}
export default HeroAntigravity
