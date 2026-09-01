import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

interface ManifestoHeroProps {
  ctaHref?: string
  onCtaClick?: () => void
}

/**
 * Character timing model: Each character's chalk stroke is strictly causal.
 * A letter remains 100% invisible until the matchlight tip reaches its exact coordinate,
 * then draws progressively over its duration and stays permanently visible.
 */
interface CharTiming {
  char: string
  start: number
  duration: number
  xPercent: number
}

const LINE_1_TIMINGS: CharTiming[] = [
  { char: 'W', start: 0.15, duration: 0.18, xPercent: 3.5 },
  { char: 'E', start: 0.35, duration: 0.14, xPercent: 8.5 },
  { char: ' ', start: 0.49, duration: 0.04, xPercent: 11.5 },
  { char: 'B', start: 0.53, duration: 0.16, xPercent: 14.8 },
  { char: 'U', start: 0.70, duration: 0.13, xPercent: 20.0 },
  { char: 'I', start: 0.84, duration: 0.10, xPercent: 24.5 },
  { char: 'L', start: 0.95, duration: 0.12, xPercent: 28.5 },
  { char: 'D', start: 1.08, duration: 0.15, xPercent: 35.0 },
  { char: ' ', start: 1.23, duration: 0.05, xPercent: 38.5 },
  { char: 'S', start: 1.28, duration: 0.16, xPercent: 40.5 },
  { char: 'O', start: 1.45, duration: 0.15, xPercent: 45.5 },
  { char: 'F', start: 1.61, duration: 0.13, xPercent: 51.5 },
  { char: 'T', start: 1.75, duration: 0.13, xPercent: 58.0 },
  { char: 'W', start: 1.89, duration: 0.19, xPercent: 66.0 },
  { char: 'A', start: 2.09, duration: 0.15, xPercent: 73.0 },
  { char: 'R', start: 2.25, duration: 0.15, xPercent: 79.5 },
  { char: 'E', start: 2.41, duration: 0.14, xPercent: 86.0 },
]

const LINE_2_TIMINGS: CharTiming[] = [
  { char: 'T', start: 2.67, duration: 0.13, xPercent: 4.0 },
  { char: 'H', start: 2.81, duration: 0.15, xPercent: 10.0 },
  { char: 'A', start: 2.97, duration: 0.15, xPercent: 16.5 },
  { char: 'T', start: 3.13, duration: 0.13, xPercent: 23.0 },
  { char: ' ', start: 3.26, duration: 0.05, xPercent: 26.0 },
  { char: 'F', start: 3.31, duration: 0.13, xPercent: 30.0 },
  { char: 'I', start: 3.45, duration: 0.10, xPercent: 34.5 },
  { char: 'T', start: 3.56, duration: 0.13, xPercent: 39.0 },
  { char: 'S', start: 3.70, duration: 0.16, xPercent: 45.0 },
  { char: ' ', start: 3.86, duration: 0.05, xPercent: 47.5 },
  { char: 'E', start: 3.91, duration: 0.14, xPercent: 51.0 },
  { char: 'X', start: 4.06, duration: 0.14, xPercent: 57.0 },
  { char: 'A', start: 4.21, duration: 0.15, xPercent: 63.5 },
  { char: 'C', start: 4.37, duration: 0.14, xPercent: 69.5 },
  { char: 'T', start: 4.52, duration: 0.13, xPercent: 75.5 },
  { char: 'L', start: 4.66, duration: 0.12, xPercent: 82.0 },
  { char: 'Y', start: 4.79, duration: 0.15, xPercent: 88.0 },
  { char: '.', start: 4.95, duration: 0.12, xPercent: 93.5 },
]

// Sparse chalk dust flecks that drift near the match tip during writing
const CHALK_DUST_FLECKS = [
  { left: '4%', top: '24%', delay: 0.28, driftX: 3, driftY: 6 },
  { left: '16%', top: '22%', delay: 0.65, driftX: -2, driftY: 8 },
  { left: '29%', top: '26%', delay: 1.02, driftX: 4, driftY: 5 },
  { left: '42%', top: '23%', delay: 1.38, driftX: -3, driftY: 7 },
  { left: '67%', top: '25%', delay: 1.98, driftX: 2, driftY: 6 },
  { left: '80%', top: '24%', delay: 2.32, driftX: -4, driftY: 7 },
  { left: '11%', top: '72%', delay: 2.90, driftX: 3, driftY: 6 },
  { left: '31%', top: '70%', delay: 3.40, driftX: -2, driftY: 8 },
  { left: '58%', top: '74%', delay: 4.15, driftX: 4, driftY: 6 },
  { left: '76%', top: '71%', delay: 4.60, driftX: -3, driftY: 7 },
  { left: '89%', top: '73%', delay: 4.88, driftX: 2, driftY: 5 },
]

export function ManifestoHero({
  ctaHref = '#case-studies',
  onCtaClick,
}: ManifestoHeroProps) {
  const prefersReduced = usePrefersReducedMotion()
  const skipAnimation = prefersReduced

  return (
    <motion.section
      aria-label="SaLira Studio Introduction"
      className="relative isolate w-full overflow-hidden text-[#1C1B19] px-6 sm:px-10 lg:px-16 py-24 sm:py-32 lg:py-44"
      initial={
        skipAnimation
          ? { backgroundColor: '#EDE8DC' }
          : { backgroundColor: '#0D0F0E' }
      }
      animate={{ backgroundColor: '#EDE8DC' }}
      transition={
        skipAnimation
          ? { duration: 0 }
          : {
              duration: 0.65,
              delay: 5.52, // 450ms hold after writing finishes at 5.07s
              ease: [0.22, 1, 0.36, 1],
            }
      }
    >

      {/* ── 2. Enhanced Slate & Concrete Paper Grain Texture Overlay (6.5% Opacity) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none opacity-[0.065] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '160px 160px',
        }}
      />

      {/* ── Editorial Container with Generous Whitespace ── */}
      <div className="relative z-10 mx-auto max-w-5xl text-left">
        
        {/* Eyebrow Tag: "BESPOKE SOFTWARE STUDIO" */}
        <motion.div
          initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            skipAnimation
              ? { duration: 0 }
              : { duration: 0.5, delay: 5.45, ease: [0.16, 1, 0.3, 1] }
          }
          className="mb-8 sm:mb-12"
        >
          <p className="font-manifesto-sans text-xs sm:text-sm font-medium tracking-[0.22em] uppercase text-[#6B6860]">
            BESPOKE SOFTWARE STUDIO
          </p>
        </motion.div>

        {/* ── Chalkboard Headline Writing Stage ── */}
        <div className="relative mb-8 sm:mb-12">
          
          {/* Layer A: Chalk-Drawn State on Dark Board (soft chalk white #EDEAE2, contrast > 14:1) */}
          {!skipAnimation && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 select-none z-10"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: 5.52,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h1
                className="font-typewriter text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] font-normal leading-[1.06] sm:leading-[1.02] tracking-tight text-[#EDEAE2]"
                style={{
                  letterSpacing: '-0.02em',
                  textShadow: '0 0 1.5px rgba(237, 234, 226, 0.6), 0 0 3px rgba(237, 234, 226, 0.28)',
                }}
              >
                {/* Line 1: Strict Per-Letter Causal Stroke Reveal */}
                <span className="block whitespace-nowrap">
                  {LINE_1_TIMINGS.map((item, idx) => {
                    if (item.char === ' ') {
                      return (
                        <span key={idx} className="inline-block w-[0.26em]">
                          &nbsp;
                        </span>
                      )
                    }
                    return (
                      <span key={idx} className="relative inline-block overflow-hidden">
                        <motion.span
                          className="inline-block"
                          initial={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                          animate={{
                            clipPath: 'polygon(0% 0%, 105% 0%, 102% 100%, 0% 100%)',
                          }}
                          transition={{
                            duration: item.duration,
                            delay: item.start,
                            ease: [0.33, 0.0, 0.2, 1.0],
                          }}
                        >
                          {item.char}
                        </motion.span>
                      </span>
                    )
                  })}
                </span>

                {/* Line 2: Strict Per-Letter Causal Stroke Reveal */}
                <span className="block whitespace-nowrap mt-0.5 sm:mt-1">
                  {LINE_2_TIMINGS.map((item, idx) => {
                    if (item.char === ' ') {
                      return (
                        <span key={idx} className="inline-block w-[0.26em]">
                          &nbsp;
                        </span>
                      )
                    }
                    return (
                      <span key={idx} className="relative inline-block overflow-hidden">
                        <motion.span
                          className="inline-block"
                          initial={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                          animate={{
                            clipPath: 'polygon(0% 0%, 105% 0%, 102% 100%, 0% 100%)',
                          }}
                          transition={{
                            duration: item.duration,
                            delay: item.start,
                            ease: [0.33, 0.0, 0.2, 1.0],
                          }}
                        >
                          {item.char}
                        </motion.span>
                      </span>
                    )
                  })}
                </span>
              </h1>
            </motion.div>
          )}

          {/* Layer B: Final Daylight Ink-Black Lettering (Permanent & Synchronous) */}
          <div className="relative z-0">
            <h1
              className="font-typewriter text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] font-normal leading-[1.06] sm:leading-[1.02] tracking-tight text-[#1C1B19]"
              style={{ letterSpacing: '-0.02em' }}
            >
              <span className="block whitespace-nowrap">
                {LINE_1_TIMINGS.map((item, idx) => {
                  if (item.char === ' ') {
                    return (
                      <span key={idx} className="inline-block w-[0.26em]">
                        &nbsp;
                      </span>
                    )
                  }
                  return (
                    <span key={idx} className="relative inline-block overflow-hidden">
                      <motion.span
                        className="inline-block"
                        initial={
                          skipAnimation
                            ? { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
                            : { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }
                        }
                        animate={{
                          clipPath: 'polygon(0% 0%, 105% 0%, 102% 100%, 0% 100%)',
                        }}
                        transition={
                          skipAnimation
                            ? { duration: 0 }
                            : {
                                duration: item.duration,
                                delay: item.start,
                                ease: [0.33, 0.0, 0.2, 1.0],
                              }
                        }
                      >
                        {item.char}
                      </motion.span>
                    </span>
                  )
                })}
              </span>

              <span className="block whitespace-nowrap mt-0.5 sm:mt-1">
                {LINE_2_TIMINGS.map((item, idx) => {
                  if (item.char === ' ') {
                    return (
                      <span key={idx} className="inline-block w-[0.26em]">
                        &nbsp;
                      </span>
                    )
                  }
                  return (
                    <span key={idx} className="relative inline-block overflow-hidden">
                      <motion.span
                        className="inline-block"
                        initial={
                          skipAnimation
                            ? { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
                            : { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }
                        }
                        animate={{
                          clipPath: 'polygon(0% 0%, 105% 0%, 102% 100%, 0% 100%)',
                        }}
                        transition={
                          skipAnimation
                            ? { duration: 0 }
                            : {
                                duration: item.duration,
                                delay: item.start,
                                ease: [0.33, 0.0, 0.2, 1.0],
                              }
                        }
                      >
                        {item.char}
                      </motion.span>
                    </span>
                  )
                })}
              </span>
            </h1>
          </div>

          {/* ── 3. Soft Ambient Match Spotlight Overlay (gentle warm localized brightening) ── */}
          {!skipAnimation && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 overflow-visible"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.85, 0.85, 0.85, 0],
              }}
              transition={{
                duration: 5.3,
                delay: 0.1,
                times: [0, 0.06, 0.92, 0.96, 1],
                ease: 'easeInOut',
              }}
            >
              <motion.div
                className="absolute h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255, 238, 190, 0.18) 0%, rgba(255, 215, 130, 0.08) 45%, transparent 70%)',
                  mixBlendMode: 'screen',
                }}
                initial={{ left: '3.5%', top: '22%' }}
                animate={{
                  left: [
                    ...LINE_1_TIMINGS.filter((t) => t.char !== ' ').map((t) => `${t.xPercent}%`),
                    ...LINE_2_TIMINGS.filter((t) => t.char !== ' ').map((t) => `${t.xPercent}%`),
                  ],
                  top: [
                    ...LINE_1_TIMINGS.filter((t) => t.char !== ' ').map(() => '24%'),
                    ...LINE_2_TIMINGS.filter((t) => t.char !== ' ').map(() => '74%'),
                  ],
                }}
                transition={{
                  duration: 5.0,
                  delay: 0.15,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          )}

          {/* ── 4. Organic Matchlight Point & Chalk Writing Tip Glow ── */}
          {!skipAnimation && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-30 overflow-visible"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 1, 1, 0.85, 0],
              }}
              transition={{
                duration: 5.3,
                delay: 0.1,
                times: [0, 0.04, 0.93, 0.97, 0.99, 1],
                ease: 'easeInOut',
              }}
            >
              <motion.div
                className="absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255, 252, 240, 1) 0%, rgba(255, 220, 145, 0.88) 28%, rgba(245, 166, 35, 0.35) 58%, transparent 78%)',
                  boxShadow:
                    '0 0 28px 10px rgba(255, 218, 135, 0.65), 0 0 60px 24px rgba(245, 166, 35, 0.22)',
                  mixBlendMode: 'screen',
                }}
                initial={{ left: '3.5%', top: '22%', scale: 0.7 }}
                animate={{
                  left: [
                    ...LINE_1_TIMINGS.filter((t) => t.char !== ' ').map((t) => `${t.xPercent}%`),
                    ...LINE_2_TIMINGS.filter((t) => t.char !== ' ').map((t) => `${t.xPercent}%`),
                  ],
                  top: [
                    ...LINE_1_TIMINGS.filter((t) => t.char !== ' ').map((_, idx) =>
                      idx % 2 === 0 ? '21%' : '25%'
                    ),
                    ...LINE_2_TIMINGS.filter((t) => t.char !== ' ').map((_, idx) =>
                      idx % 2 === 0 ? '71%' : '76%'
                    ),
                  ],
                  scale: [
                    0.7,
                    ...Array(LINE_1_TIMINGS.length - 3).fill(1.02),
                    0.85, // pen lift between lines
                    ...Array(LINE_2_TIMINGS.length - 3).fill(1.02),
                    0.4,  // extinguishing
                  ],
                }}
                transition={{
                  duration: 5.0,
                  delay: 0.15,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          )}

          {/* ── 5. Sparse Atmospheric Chalk Dust Flecks ── */}
          {!skipAnimation && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-25 overflow-visible">
              {CHALK_DUST_FLECKS.map((fleck, i) => (
                <motion.span
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-[#EDEAE2]"
                  style={{ left: fleck.left, top: fleck.top }}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0, 0.45, 0.3, 0],
                    x: fleck.driftX,
                    y: fleck.driftY,
                    scale: [0.8, 1, 0.6],
                  }}
                  transition={{
                    duration: 0.35,
                    delay: fleck.delay,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>
          )}

        </div>

        {/* One-Line Subtext: Calm humanist sans-serif (Archivo) fading in once daylight arrives */}
        <motion.p
          initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            skipAnimation
              ? { duration: 0 }
              : {
                  duration: 0.55,
                  delay: 5.95, // Follows daybreak transition
                  ease: [0.16, 1, 0.3, 1],
                }
          }
          className="font-manifesto-sans text-lg sm:text-xl md:text-2xl text-[#6B6860] font-normal leading-relaxed mb-12 sm:mb-16 max-w-3xl"
        >
          No bloat. No monthly rent. No leftover code.
        </motion.p>

        {/* Single Primary CTA Button: Sharp corners, flat solid vermilion */}
        <motion.div
          initial={skipAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            skipAnimation
              ? { duration: 0 }
              : {
                  duration: 0.55,
                  delay: 6.15,
                  ease: [0.16, 1, 0.3, 1],
                }
          }
          className="flex items-center justify-start"
        >
          <a
            href={ctaHref}
            onClick={onCtaClick}
            className="group inline-flex items-center justify-center gap-3 bg-[#E8452C] hover:bg-[#C4451C] active:bg-[#B03B15] text-white px-7 py-4 sm:px-8 sm:py-4.5 font-manifesto-sans text-sm sm:text-base font-semibold tracking-wide rounded-none transition-colors duration-150 cursor-pointer select-none"
            style={{
              borderRadius: 0,
              boxShadow: 'none',
            }}
          >
            <span>Read the case studies</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-150 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </motion.div>

      </div>
    </motion.section>
  )
}
export default ManifestoHero
