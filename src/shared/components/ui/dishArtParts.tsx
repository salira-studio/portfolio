import type { ReactNode } from 'react'

export type Archetype =
  | 'dosa'
  | 'idli'
  | 'vada'
  | 'podi-idli'
  | 'upma'
  | 'biryani'
  | 'biryani-veg'
  | 'rice'
  | 'rice-curd'
  | 'rice-tamarind'
  | 'meals'
  | 'starter'
  | 'starter-pepper'
  | 'starter-paneer'
  | 'starter-gobi'
  | 'starter-sukka'
  | 'soup'
  | 'soup-rasam'
  | 'appalam'
  | 'pickle'
  | 'raita'
  | 'tumbler-coffee'
  | 'tumbler-chai'
  | 'tumbler-white'
  | 'coconut'
  | 'soda'
  | 'rose-milk'
  | 'payasam'
  | 'kesari'
  | 'jamun'
  | 'mysore-pak'
  | 'kitchen'

export const C = {
  paper: '#F3EAD7',
  paperDeep: '#E7DABD',
  plate: '#FBF6EA',
  plateRim: '#E3D5B6',
  shadow: '#D9C9A6',
  gold: '#DCA84B',
  goldDeep: '#B9822F',
  crisp: '#E7B75C',
  crispChar: '#A96F2C',
  clay: '#B4532A',
  clayDeep: '#8F3D1F',
  chili: '#9C3D2E',
  leaf: '#55683B',
  leafLight: '#7A8C55',
  cream: '#FFFDF6',
  milk: '#F5EDDC',
  brown: '#6B4A2A',
  steel: '#C9C2B4',
  steelDeep: '#A69E8E',
}

export function Plate({ children }: { children?: ReactNode }) {
  return (
    <>
      <ellipse cx="200" cy="250" rx="152" ry="44" fill={C.shadow} opacity=".5" />
      <ellipse cx="200" cy="234" rx="154" ry="78" fill={C.plateRim} />
      <ellipse cx="200" cy="230" rx="138" ry="66" fill={C.plate} />
      {children}
    </>
  )
}

export function Bowl({ rim = C.clay }: { rim?: string }) {
  return (
    <>
      <ellipse cx="200" cy="258" rx="142" ry="38" fill={C.shadow} opacity=".5" />
      <path d="M68 186a132 82 0 0 0 264 0z" fill={rim} />
      <path d="M80 194a120 70 0 0 0 240 0c0-12-54 16-120 16s-120-28-120-16z" fill="#00000014" />
    </>
  )
}

export function Steam({ x, y, tone = '#FFFFFF', o = 0.55 }: { x: number; y: number; tone?: string; o?: number }) {
  return (
    <g stroke={tone} strokeWidth="7" strokeLinecap="round" fill="none" opacity={o}>
      <path d={`M${x} ${y}c-10 -16 10 -24 0 -40`} />
      <path d={`M${x + 34} ${y - 6}c-10 -16 10 -24 0 -40`} />
      <path d={`M${x - 32} ${y - 4}c-8 -13 8 -20 0 -33`} />
    </g>
  )
}

export function CurryLeaf({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return (
    <g transform={`${flip ? `translate(${400} 0) scale(-1 1) ` : ''}translate(${x} ${y})`}>
      <path d="M0 0c14 -22 34 -30 52 -28 -4 20 -22 36 -48 34z" fill={C.leaf} />
      <path d="M2 2c12 -16 28 -24 44 -23" stroke={C.leafLight} strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  )
}

export function SideCup({ x, fill, r = 30 }: { x: number; fill: string; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={268} r={r + 8} fill="#EDE3CC" />
      <circle cx={x} cy={265} r={r - 8} fill={fill} />
    </g>
  )
}

export function RiceMound({ x = 200, y = 214, rx = 92, tone = '#F7F1DF' }: { x?: number; y?: number; rx?: number; tone?: string }) {
  return (
    <g>
      <ellipse cx={x} cy={y + 14} rx={rx} ry={40} fill={tone} opacity=".75" />
      <ellipse cx={x} cy={y} rx={rx} ry={42} fill={tone} />
      {[-52, -18, 18, 50].map((dx, i) => (
        <ellipse key={i} cx={x + dx} cy={y - 10 + (i % 2) * 8} rx={rx * 0.24} ry={rx * 0.11} fill="#FFFFFF" opacity=".65" />
      ))}
    </g>
  )
}

export function FriedBits({
  x,
  y,
  n = 6,
  spread = 74,
  tone = C.chili,
  deep = C.clayDeep,
  cube = false,
}: {
  x: number
  y: number
  n?: number
  spread?: number
  tone?: string
  deep?: string
  cube?: boolean
}) {
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const a = (i / n) * Math.PI * 2
        const px = x + Math.cos(a) * spread * (0.45 + ((i * 37) % 55) / 100)
        const py = y + Math.sin(a) * spread * 0.42 * (0.5 + ((i * 53) % 45) / 100)
        if (cube) {
          return (
            <g key={i}>
              <rect x={px - 13} y={py - 13} width={26} height={26} rx={6} fill={deep} />
              <rect x={px - 13} y={py - 17} width={26} height={26} rx={6} fill={tone} />
            </g>
          )
        }
        return (
          <g key={i}>
            <ellipse cx={px} cy={py + 4} rx={17} ry={13} fill={deep} />
            <ellipse cx={px} cy={py} rx={17} ry={13} fill={tone} />
            <ellipse cx={px - 5} cy={py - 4} rx={6} ry={3} fill="#FFFFFF" opacity=".35" />
          </g>
        )
      })}
    </g>
  )
}
