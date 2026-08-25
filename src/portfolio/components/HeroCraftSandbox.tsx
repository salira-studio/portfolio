import { useState, useRef } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import {
  Activity,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Terminal,
  RefreshCw,
  Code2,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * Domain-Agnostic Hero Craft Sandbox
 * Demonstrates high-performance engineering, fullstack architecture,
 * and extreme craft without tying the studio to any single industry.
 */
export function HeroCraftSandbox() {
  const reduced = usePrefersReducedMotion()
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Interactive Engine Modes: 'performance' vs 'architecture'
  const [engineMode, setEngineMode] = useState<'performance' | 'architecture'>('architecture')
  const [activeLayer, setActiveLayer] = useState<number | null>(null)
  const [pingRunning, setPingRunning] = useState(false)
  const [benchmarkResult, setBenchmarkResult] = useState<{ latency: number; fps: number; score: number } | null>({
    latency: 0.4,
    fps: 120,
    score: 100,
  })

  // 3D Gyroscopic mouse-tracking tilt
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 100, damping: 20, mass: 0.5 })
  const sy = useSpring(my, { stiffness: 100, damping: 20, mass: 0.5 })

  const rotateX = useTransform(sy, [0, 1], [6, -6])
  const rotateY = useTransform(sx, [0, 1], [-8, 8])

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (reduced) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mx.set(0.5)
    my.set(0.5)
    setActiveLayer(null)
  }

  const runBenchmark = () => {
    if (pingRunning) return
    setPingRunning(true)
    setTimeout(() => {
      setBenchmarkResult({
        latency: Number((Math.random() * 0.4 + 0.2).toFixed(1)),
        fps: Math.floor(Math.random() * 5 + 118),
        score: 100,
      })
      setPingRunning(false)
    }, 600)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg [perspective:1400px]"
    >
      {/* Background Living Ambient Glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-[32px] blur-3xl opacity-60"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(217, 164, 65, 0.18), rgba(198, 71, 43, 0.15) 45%, transparent 70%)',
        }}
        animate={reduced ? {} : { scale: [1, 1.05, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main 3D Tilt Container */}
      <motion.div
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative sl-specular-panel rounded-3xl p-5 sm:p-7 text-white"
      >
        {/* Top Console Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#10B981] animate-pulse" />
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-white/80">
              <Terminal size={13} className="text-[var(--sl-gold)]" />
              <span>salira-core::engine</span>
            </div>
          </div>

          {/* Tactile Engine Mode Switcher */}
          <div className="flex items-center rounded-xl bg-white/[0.08] p-1 ring-1 ring-white/10">
            <button
              onClick={() => setEngineMode('architecture')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-semibold transition-all ${
                engineMode === 'architecture'
                  ? 'bg-[var(--sl-gold)] text-black shadow-xs font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Layers size={11} />
              <span>Architecture</span>
            </button>
            <button
              onClick={() => setEngineMode('performance')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-semibold transition-all ${
                engineMode === 'performance'
                  ? 'bg-[var(--sl-gold)] text-black shadow-xs font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Zap size={11} />
              <span>Telemetry</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display Area */}
        <div className="mt-5 min-h-[260px]">
          <AnimatePresence mode="wait">
            {engineMode === 'architecture' ? (
              /* ── 3D Exploded Software Architecture Stack ── */
              <motion.div
                key="arch"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between text-[11px] text-white/50 font-mono">
                  <span>SYSTEM ANATOMY</span>
                  <span className="text-[var(--sl-gold)]">100% Bespoke Code</span>
                </div>

                {/* Layer 1: Client Human Interface */}
                <div
                  onMouseEnter={() => setActiveLayer(1)}
                  className={`group relative rounded-xl border p-3.5 transition-all duration-300 ${
                    activeLayer === 1
                      ? 'border-[var(--sl-gold)] bg-white/[0.12] shadow-lg shadow-[var(--sl-glow-gold)]'
                      : 'border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[rgba(217,164,65,0.2)] text-[var(--sl-gold)]">
                        <Sparkles size={14} />
                      </span>
                      <div>
                        <h4 className="text-xs font-semibold text-white">01 · Fluid Human Interface</h4>
                        <p className="text-[10px] text-white/50">React 19, Flutter, Swift, WebGL, 120 FPS micro-animations</p>
                      </div>
                    </div>
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[9px] text-[var(--sl-gold)]">
                      Tier 1
                    </span>
                  </div>
                </div>

                {/* Dynamic Data Sync Line */}
                <div className="flex justify-center">
                  <div className="flex items-center gap-1 text-[9px] font-mono text-white/40">
                    <div className="h-2 w-px bg-white/20" />
                    <span>WebSocket Realtime Sync Line (Sub-20ms)</span>
                    <div className="h-2 w-px bg-white/20" />
                  </div>
                </div>

                {/* Layer 2: State & Optimistic Engine */}
                <div
                  onMouseEnter={() => setActiveLayer(2)}
                  className={`group relative rounded-xl border p-3.5 transition-all duration-300 ${
                    activeLayer === 2
                      ? 'border-[#10B981] bg-white/[0.12] shadow-lg'
                      : 'border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[rgba(16,185,129,0.2)] text-[#10B981]">
                        <Cpu size={14} />
                      </span>
                      <div>
                        <h4 className="text-xs font-semibold text-white">02 · State Engine & Optimistic Core</h4>
                        <p className="text-[10px] text-white/50">Instant local mutations, conflict resolution, offline-ready cache</p>
                      </div>
                    </div>
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[9px] text-[#10B981]">
                      Real-Time
                    </span>
                  </div>
                </div>

                {/* Layer 3: Secure Infrastructure & Code Vault */}
                <div
                  onMouseEnter={() => setActiveLayer(3)}
                  className={`group relative rounded-xl border p-3.5 transition-all duration-300 ${
                    activeLayer === 3
                      ? 'border-[var(--sl-oxblood)] bg-white/[0.12] shadow-lg'
                      : 'border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[rgba(198,71,43,0.2)] text-[#F87171]">
                        <ShieldCheck size={14} />
                      </span>
                      <div>
                        <h4 className="text-xs font-semibold text-white">03 · Source Code Ownership Vault</h4>
                        <p className="text-[10px] text-white/50">100% full IP transfer, clean repo structure, zero vendor lock-in</p>
                      </div>
                    </div>
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[9px] text-[#F87171]">
                      Client Retained
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ── Live Performance Telemetry Dial & Benchmark ── */
              <motion.div
                key="perf"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-white/50">LIVE CLIENT BENCHMARKS</span>
                  <button
                    onClick={runBenchmark}
                    disabled={pingRunning}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--sl-gold)]/20 px-2.5 py-1 text-[10px] font-bold text-[var(--sl-gold)] ring-1 ring-[var(--sl-gold)]/40 hover:bg-[var(--sl-gold)] hover:text-black transition-colors"
                  >
                    <RefreshCw size={10} className={pingRunning ? 'animate-spin' : ''} />
                    <span>{pingRunning ? 'Testing...' : 'Run Benchmark'}</span>
                  </button>
                </div>

                {/* Score Gauge Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
                    <p className="font-mono text-2xl font-bold text-[var(--sl-gold)]">
                      {benchmarkResult?.latency}ms
                    </p>
                    <p className="mt-1 text-[9px] font-medium text-white/50">Render Latency</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
                    <p className="font-mono text-2xl font-bold text-[#10B981]">
                      {benchmarkResult?.fps}
                    </p>
                    <p className="mt-1 text-[9px] font-medium text-white/50">Target FPS</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
                    <p className="font-mono text-2xl font-bold text-white">
                      100/100
                    </p>
                    <p className="mt-1 text-[9px] font-medium text-white/50">Lighthouse Score</p>
                  </div>
                </div>

                {/* Animated Waveform / Event Stream */}
                <div className="rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-[10px] space-y-1.5">
                  <div className="flex items-center justify-between text-white/40 pb-1 border-b border-white/5">
                    <span>LIVE EVENT DISPATCH</span>
                    <span className="text-[#10B981]">CONNECTED</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <CheckCircle2 size={11} className="text-[#10B981]" />
                    <span className="truncate">&gt; Local state mutation: completed (0.2ms)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <CheckCircle2 size={11} className="text-[#10B981]" />
                    <span className="truncate">&gt; End-to-end type safety: verified (0 errors)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <CheckCircle2 size={11} className="text-[#10B981]" />
                    <span className="truncate">&gt; Full codebase: 100% unminified &amp; documented</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Status Chip */}
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] text-white/50 font-mono">
          <div className="flex items-center gap-1.5">
            <Code2 size={12} className="text-[var(--sl-gold)]" />
            <span>Web · iOS · Android · Desktop</span>
          </div>
          <div className="flex items-center gap-1 text-[var(--sl-gold)]">
            <Activity size={12} />
            <span>Active Engine</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
