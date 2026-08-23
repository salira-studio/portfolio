import type { ReactNode } from 'react'
import { Bowl, C, CurryLeaf, FriedBits, Plate, RiceMound, SideCup, Steam } from './dishArtParts'
import type { Archetype } from './dishArtParts'

function Dosa() {
  return (
    <>
      <Plate>
        <path d="M64 230 C 92 174, 170 156, 296 176 C 330 182, 340 204, 322 220 C 250 256, 120 260, 74 242 Z" fill={C.crisp} />
        <path d="M64 230 C 92 174, 170 156, 296 176 C 306 178, 315 184, 318 192 C 240 212, 110 222, 68 238 Z" fill={C.gold} />
        <path d="M298 180 C 316 186, 328 200, 320 216 L 294 222 Z" fill={C.goldDeep} />
        {[[130, 206], [172, 196], [214, 190], [252, 194], [156, 218], [228, 208]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx={7 - (i % 3)} ry={4 - (i % 2)} fill={C.crispChar} opacity=".5" />
        ))}
        <path d="M110 212 C 150 194, 230 184, 286 192" stroke="#FFF3D6" strokeWidth="7" strokeLinecap="round" fill="none" opacity=".7" />
      </Plate>
      <SideCup x={112} fill="#9DB06A" />
      <SideCup x={290} fill="#C77B3A" />
      <Steam x={190} y={126} tone={C.brown} />
    </>
  )
}

function Idli() {
  return (
    <>
      <Plate>
        {[0, 1].map((i) => (
          <g key={i}>
            <ellipse cx={148 + i * 104} cy={214} rx="58" ry="34" fill="#EFE6CF" />
            <ellipse cx={148 + i * 104} cy={206} rx="58" ry="34" fill={C.milk} />
            <ellipse cx={130 + i * 104} cy={198} rx="26" ry="12" fill="#FFFFFF" opacity=".9" />
          </g>
        ))}
        <SideCup x={296} fill="#9DB06A" r={26} />
      </Plate>
      <Steam x={200} y={128} tone={C.brown} />
    </>
  )
}

function PodiIdli() {
  return (
    <>
      <Plate>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <ellipse cx={122 + i * 80} cy={224 - (i % 2) * 10} rx="44" ry="27" fill="#EFE6CF" />
            <ellipse cx={122 + i * 80} cy={218 - (i % 2) * 10} rx="44" ry="27" fill="#D9A05B" />
            <ellipse cx={122 + i * 80} cy={216 - (i % 2) * 10} rx="38" ry="22" fill="#E8B36A" />
            {Array.from({ length: 14 }).map((_, j) => (
              <circle key={j} cx={100 + ((j * 53 + i * 31) % 46)} cy={206 - (i % 2) * 10 + ((j * 37) % 24)} r="1.8" fill={C.chili} opacity=".65" />
            ))}
          </g>
        ))}
        <SideCup x={318} fill="#B9822F" r={24} />
      </Plate>
    </>
  )
}

function Vada() {
  return (
    <>
      <Plate>
        {[0, 1].map((i) => (
          <g key={i}>
            <circle cx={150 + i * 102} cy={220} r="50" fill={C.goldDeep} />
            <circle cx={150 + i * 102} cy={215} r="50" fill={C.gold} />
            <circle cx={150 + i * 102} cy={215} r="15" fill={C.paperDeep} />
            <circle cx={132 + i * 102} cy={201} r="8" fill="#C99539" />
            <circle cx={168 + i * 102} cy={227} r="6" fill="#C99539" />
          </g>
        ))}
        <SideCup x={298} fill="#C77B3A" r={26} />
      </Plate>
      <Steam x={200} y={124} tone={C.brown} />
    </>
  )
}

function Upma() {
  return (
    <>
      <Plate>
        <RiceMound tone="#EFD9A8" />
        {[[160, 196], [232, 190], [204, 210], [258, 206]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="9" ry="6" fill={C.gold} />
        ))}
        <CurryLeaf x={236} y={172} />
        <SideCup x={310} fill="#C77B3A" r={24} />
      </Plate>
      <Steam x={200} y={128} tone={C.brown} />
    </>
  )
}

function Biryani({ veg = false }: { veg?: boolean }) {
  return (
    <>
      <Bowl rim={veg ? '#8F6A34' : C.clayDeep} />
      <ellipse cx="200" cy="188" rx="118" ry="30" fill={veg ? '#E5C77E' : '#EBC489'} />
      <ellipse cx="200" cy="182" rx="118" ry="32" fill={veg ? '#F0D79A' : '#F2CE93'} />
      {[-70, -28, 18, 62].map((dx, i) => (
        <ellipse key={i} cx={200 + dx} cy={176 + (i % 2) * 10} rx="26" ry="11" fill="#FFF6DE" opacity=".85" />
      ))}
      {veg
        ? [[140, 170], [252, 166], [196, 158]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="12" ry="8" fill={i === 1 ? C.leafLight : '#D9834A'} />
          ))
        : [[146, 172], [248, 168]].map(([x, y], i) => (
            <g key={i}>
              <ellipse cx={x} cy={y} rx="15" ry="10" fill="#8A4A33" />
              <ellipse cx={x} cy={(y as number) - 3} rx="13" ry="8" fill={C.chili} />
            </g>
          ))}
      <CurryLeaf x={252} y={148} flip />
      <path d="M96 168c-8-10-6-22 2-30 8 10 8 22-2 30z" fill={C.leaf} />
      <Steam x={200} y={120} o={0.4} />
    </>
  )
}

function Rice({ tone }: { tone: string }) {
  return (
    <>
      <Plate>
        <RiceMound tone="#F8F2E1" />
        <path d={`M132 206q68 ${tone === '#E9C464' ? '-26' : '18'} 136 0`} stroke={tone} strokeWidth="12" strokeLinecap="round" fill="none" opacity=".85" />
        {tone === '#E9C464' && (
          <>
            <ellipse cx="164" cy="196" rx="7" ry="4" fill="#C99539" />
            <ellipse cx="240" cy="202" rx="7" ry="4" fill="#C99539" />
            <CurryLeaf x={210} y={182} />
          </>
        )}
        {tone === '#B4532A' && (
          <>
            <ellipse cx="168" cy="198" rx="8" ry="5" fill="#8F3D1F" />
            <ellipse cx="238" cy="204" rx="8" ry="5" fill="#8F3D1F" />
            <CurryLeaf x={214} y={184} />
          </>
        )}
        {tone === '#FBF7EC' &&
          [[162, 200], [236, 194]].map(([x, y], i) => (
            <g key={i}>
              <ellipse cx={x} cy={y} rx="10" ry="7" fill="#E8DFC8" />
              <ellipse cx={(x as number) + 3} cy={(y as number) - 2} rx="4" ry="3" fill={C.leafLight} />
            </g>
          ))}
      </Plate>
      <Steam x={200} y={130} tone={C.brown} o={0.35} />
    </>
  )
}

function Meals() {
  return (
    <>
      <ellipse cx="200" cy="256" rx="168" ry="40" fill={C.shadow} opacity=".5" />
      <path d="M32 214 Q 200 176 368 214 L 356 250 Q 200 288 44 250 Z" fill="#6E8A44" />
      <path d="M32 214 Q 200 176 368 214 L 364 226 Q 200 190 36 226 Z" fill="#7FA050" />
      <RiceMound x={200} y={196} rx={74} tone="#F8F2E1" />
      {([[92, 232, '#C77B3A'], [138, 244, '#9DB06A'], [200, 250, '#B4532A'], [262, 244, '#E2B33C'], [308, 232, '#8A5A2B']] as const).map(([x, y, c], i) => (
        <g key={i}>
          <circle cx={x} cy={y + 4} r="21" fill="#5E7538" />
          <circle cx={x} cy={y} r="21" fill={c} />
          <circle cx={x - 6} cy={y - 6} r="6" fill="#FFFFFF" opacity=".3" />
        </g>
      ))}
      <ellipse cx="336" cy="212" rx="17" ry="11" fill="#F0E3BE" transform="rotate(-18 336 212)" />
      <ellipse cx="66" cy="212" rx="17" ry="11" fill="#F0E3BE" transform="rotate(14 66 212)" />
      <CurryLeaf x={258} y={162} />
      <Steam x={140} y={140} tone={C.brown} o={0.35} />
    </>
  )
}

function Starter({ variant }: { variant: 'chicken65' | 'pepper' | 'paneer' | 'gobi' | 'sukka' }) {
  const tones = {
    chicken65: { t: C.chili, d: '#7C2D22', cube: false },
    pepper: { t: '#7A5230', d: '#5C3B20', cube: false },
    paneer: { t: '#E8B36A', d: C.clayDeep, cube: true },
    gobi: { t: '#D9913F', d: '#B06A24', cube: false },
    sukka: { t: '#9C4A2E', d: '#6E3018', cube: false },
  }[variant]
  return (
    <>
      <Bowl rim={variant === 'paneer' ? '#8F6A34' : '#3E3226'} />
      <ellipse cx="200" cy="192" rx="112" ry="26" fill="#241C13" />
      <FriedBits x={200} y={186} n={variant === 'paneer' ? 5 : 7} spread={82} tone={tones.t} deep={tones.d} cube={tones.cube} />
      {[[120, 152], [270, 150]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y}c8-12 22-16 34-14-3 12-16 22-32 19z`} fill={C.leaf} transform={`rotate(${i ? 12 : -10} ${x} ${y})`} />
      ))}
      {variant === 'pepper' &&
        Array.from({ length: 16 }).map((_, i) => (
          <circle key={i} cx={110 + ((i * 61) % 180)} cy={158 + ((i * 43) % 60)} r="2.4" fill="#2E241A" opacity=".7" />
        ))}
      {(variant === 'chicken65' || variant === 'sukka') && (
        <g transform="translate(292 118) rotate(24)">
          <rect x="-4" y="-64" width="8" height="128" rx="4" fill="#D8CBAE" />
          <rect x="-4" y="-64" width="8" height="52" rx="4" fill="#C4B592" />
        </g>
      )}
      <Steam x={200} y={116} o={0.35} />
    </>
  )
}

function Soup({ tone, garnish }: { tone: string; garnish: 'drumstick' | 'tomato' }) {
  return (
    <>
      <Bowl rim={C.steelDeep} />
      <ellipse cx="200" cy="190" rx="118" ry="28" fill={tone} />
      <ellipse cx="164" cy="184" rx="42" ry="12" fill="#FFFFFF" opacity=".22" />
      {garnish === 'drumstick' ? (
        <g transform="translate(236 176) rotate(-14)">
          <rect x="-8" y="-34" width="16" height="68" rx="8" fill="#7E8C4A" />
          <rect x="-8" y="-34" width="16" height="20" rx="8" fill="#93A159" />
        </g>
      ) : (
        <g>
          <ellipse cx="240" cy="182" rx="14" ry="9" fill="#C7502E" />
          <ellipse cx="236" cy="179" rx="7" ry="4" fill="#E06A45" />
        </g>
      )}
      {[[150, 196], [196, 200], [252, 198]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={C.leaf} />
      ))}
      <Steam x={200} y={118} o={0.5} />
    </>
  )
}

function Appalam() {
  return (
    <>
      <Plate>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 7} ${-i * 9})`}>
            <ellipse cx={196} cy={216} rx="88" ry="40" fill={i === 2 ? C.gold : '#EBD9A6'} />
            <ellipse cx={196} cy={211} rx="88" ry="40" fill={i === 2 ? '#F2CD74' : '#F4E3B2'} />
            {[[-40, -6], [8, -12], [44, 0], [-12, 6]].map(([dx, dy], j) => (
              <ellipse key={j} cx={196 + dx} cy={211 + dy} rx="10" ry="5" fill="#FFF8E2" opacity=".8" />
            ))}
          </g>
        ))}
      </Plate>
    </>
  )
}

function Pickle() {
  return (
    <>
      <ellipse cx="200" cy="252" rx="120" ry="30" fill={C.shadow} opacity=".5" />
      <path d="M128 132h144v86a72 34 0 0 1-144 0z" fill="#C77B3A" />
      <path d="M128 132h144v20H128z" fill="#A95F26" />
      <path d="M136 108h128l-8 26H144z" fill="#8F6A34" />
      <ellipse cx="200" cy="106" rx="64" ry="12" fill="#A97E36" />
      <ellipse cx="200" cy="102" rx="64" ry="12" fill="#C99539" />
      <path d="M148 150c20-12 84-12 104 0M148 178c20-12 84-12 104 0" stroke="#8F3D1F" strokeWidth="7" strokeLinecap="round" fill="none" opacity=".55" />
      <ellipse cx="200" cy="216" rx="58" ry="14" fill="#B4532A" />
      <ellipse cx="184" cy="212" rx="16" ry="7" fill="#D96C3A" />
    </>
  )
}

export function Tumbler({ drink }: { drink: 'coffee' | 'chai' | 'white' | 'coconut' | 'soda' | 'rose' }) {
  const fills = {
    coffee: { body: '#6B4226', top: '#4A2C18', froth: '#C89A6B' },
    chai: { body: '#C08A4E', top: '#A97438', froth: '#DDC39B' },
    white: { body: '#EFF0DC', top: '#DDE0BF', froth: null },
    coconut: { body: '#F4F6EA', top: '#E4EBD4', froth: null },
    soda: { body: '#E8EFB9', top: '#D6E39A', froth: null },
    rose: { body: '#F0C7CB', top: '#E5AEB4', froth: null },
  }[drink]
  return (
    <>
      <ellipse cx="200" cy="256" rx="110" ry="26" fill={C.shadow} opacity=".5" />
      <ellipse cx="286" cy="238" rx="58" ry="34" fill={C.steelDeep} />
      <ellipse cx="286" cy="232" rx="50" ry="28" fill={C.steel} />
      <path d="M142 96h104l-12 128a40 18 0 0 1-80 0z" fill={fills.body} />
      <path d="M142 96h104l-4 44a48 16 0 0 1-96 0z" fill={fills.top} />
      {fills.froth ? (
        <>
          <ellipse cx="194" cy="128" rx="49" ry="17" fill={fills.froth} />
          <ellipse cx="178" cy="124" rx="16" ry="6" fill="#FFFFFF" opacity=".5" />
        </>
      ) : (
        <ellipse cx="194" cy="112" rx="50" ry="14" fill="#FFFFFF" opacity=".45" />
      )}
      <path d="M154 120l-8 84" stroke="#FFFFFF" strokeOpacity=".35" strokeWidth="9" strokeLinecap="round" fill="none" />
      {drink === 'white' && <CurryLeaf x={148} y={92} />}
      {drink === 'soda' && (
        <>
          <circle cx="306" cy="150" r="30" fill="#D9E27E" />
          <circle cx="306" cy="150" r="30" fill="none" stroke="#B7C455" strokeWidth="4" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${306} ${150}L${306 + Math.cos(i * 2.09) * 28} ${150 + Math.sin(i * 2.09) * 28}`} stroke="#EDF3B4" strokeWidth="3" />
          ))}
        </>
      )}
      {drink === 'rose' && <path d="M252 210c22-4 44-2 62 6" stroke="#D98A94" strokeWidth="6" strokeLinecap="round" fill="none" />}
      {drink === 'coconut' && (
        <g transform="translate(300 170)">
          <ellipse cx="0" cy="0" rx="44" ry="52" fill="#7E8C4A" />
          <ellipse cx="0" cy="-6" rx="36" ry="42" fill="#93A159" />
          <ellipse cx="-8" cy="-18" rx="12" ry="16" fill="#B4C078" />
        </g>
      )}
      {(drink === 'coffee' || drink === 'chai') && <Steam x={194} y={78} o={drink === 'coffee' ? 0.5 : 0.4} />}
    </>
  )
}

function Payasam() {
  return (
    <>
      <Bowl rim="#EAE0C8" />
      <ellipse cx="200" cy="190" rx="114" ry="27" fill="#F6EBCE" />
      {[[150, 182], [206, 176], [248, 190], [178, 198], [228, 200]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="11" ry="6" fill={i % 2 ? '#EAD08F' : '#D9B96A'} />
      ))}
      {[[168, 172], [222, 168]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y}q8 -8 16 0q-8 8 -16 0`} fill="#C98A3E" />
      ))}
      <path d="M150 166q50 -14 100 0" stroke="#B9822F" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 9" fill="none" />
    </>
  )
}

function Sweets({ kind }: { kind: 'kesari' | 'jamun' | 'mysore-pak' }) {
  if (kind === 'jamun')
    return (
      <>
        <Bowl rim="#7A5A34" />
        <ellipse cx="200" cy="192" rx="112" ry="26" fill="#8F5A2C" />
        {[[152, 184], [204, 176], [250, 188], [178, 198]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y + 5} r="21" fill="#5C3A1A" />
            <circle cx={x} cy={y} r="21" fill="#8A5626" />
            <circle cx={x - 7} cy={y - 7} r="6" fill="#B47C42" />
          </g>
        ))}
        <path d="M160 158q40 -10 80 0" stroke="#C98A3E" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 8" fill="none" />
      </>
    )
  const tone = kind === 'kesari' ? '#E8963C' : '#D9A441'
  const deep = kind === 'kesari' ? '#C27424' : '#B9822F'
  return (
    <>
      <Plate>
        <g transform="translate(200 208)">
          {[[-52, 6], [4, -4], [46, 10]].map(([dx, dy], i) => (
            <g key={i} transform={`translate(${dx} ${dy}) rotate(${i * 8 - 8})`}>
              <rect x="-34" y="-20" width="68" height="40" rx="6" fill={deep} transform="skewX(-8)" />
              <rect x="-34" y="-26" width="68" height="40" rx="6" fill={tone} transform="skewX(-8)" />
              <rect x="-26" y="-20" width="22" height="8" rx="4" fill="#FFE9B8" opacity=".7" transform="skewX(-8)" />
            </g>
          ))}
          {kind === 'kesari' &&
            Array.from({ length: 10 }).map((_, i) => (
              <circle key={i} cx={-70 + ((i * 47) % 140)} cy={-30 + ((i * 31) % 54)} r="2" fill="#9C3D2E" />
            ))}
          {kind === 'mysore-pak' && (
            <>
              <circle cx="-58" cy="34" r="7" fill="#F2CD74" />
              <circle cx="66" cy="28" r="7" fill="#F2CD74" />
            </>
          )}
        </g>
        <path d="M120 246q80 22 160 0" stroke={deep} strokeWidth="5" strokeLinecap="round" fill="none" opacity=".4" />
      </Plate>
    </>
  )
}

function Kitchen() {
  return (
    <>
      {/* stovetop scene */}
      <rect x="60" y="220" width="280" height="18" rx="6" fill="#3E3226" />
      <rect x="76" y="238" width="248" height="30" rx="8" fill="#2E241A" />
      {[[120], [200], [280]].map(([x], i) => (
        <g key={i}>
          <ellipse cx={x} cy={218} rx="34" ry="8" fill={C.steelDeep} />
          <path d={`M${x - 32} 218a32 26 0 0 0 64 0z`} fill={C.steel} />
          <path d={`M${x - 26} 218a26 18 0 0 0 52 0c0-8-24 10-52 0z`} fill={i === 1 ? '#C77B3A' : i === 2 ? '#9DB06A' : '#E2B33C'} />
          <Steam x={x} y={186} o={0.5} tone={C.brown} />
        </g>
      ))}
      <CurryLeaf x={92} y={128} />
      <path d="M330 120c10-14 28-20 42-18-4 16-18 28-38 26z" fill={C.leaf} />
    </>
  )
}

const SCENES: Record<Archetype, () => ReactNode> = {
  dosa: () => <Dosa />,
  idli: () => <Idli />,
  vada: () => <Vada />,
  'podi-idli': () => <PodiIdli />,
  upma: () => <Upma />,
  biryani: () => <Biryani />,
  'biryani-veg': () => <Biryani veg />,
  rice: () => <Rice tone="#E9C464" />,
  'rice-curd': () => <Rice tone="#FBF7EC" />,
  'rice-tamarind': () => <Rice tone="#B4532A" />,
  meals: () => <Meals />,
  starter: () => <Starter variant="chicken65" />,
  'starter-pepper': () => <Starter variant="pepper" />,
  'starter-paneer': () => <Starter variant="paneer" />,
  'starter-gobi': () => <Starter variant="gobi" />,
  'starter-sukka': () => <Starter variant="sukka" />,
  soup: () => <Soup tone="#D9832E" garnish="drumstick" />,
  'soup-rasam': () => <Soup tone="#B4532A" garnish="tomato" />,
  appalam: () => <Appalam />,
  pickle: () => <Pickle />,
  raita: () => <Raita />,
  'tumbler-coffee': () => <Tumbler drink="coffee" />,
  'tumbler-chai': () => <Tumbler drink="chai" />,
  'tumbler-white': () => <Tumbler drink="white" />,
  coconut: () => <Tumbler drink="coconut" />,
  soda: () => <Tumbler drink="soda" />,
  'rose-milk': () => <Tumbler drink="rose" />,
  payasam: () => <Payasam />,
  kesari: () => <Sweets kind="kesari" />,
  jamun: () => <Sweets kind="jamun" />,
  'mysore-pak': () => <Sweets kind="mysore-pak" />,
  kitchen: () => <Kitchen />,
}

function Raita() {
  return (
    <>
      <Bowl rim="#E8DFC8" />
      <ellipse cx="200" cy="190" rx="114" ry="27" fill="#FCF9EF" />
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={i} cx={116 + ((i * 67) % 168)} cy={178 + ((i * 41) % 26)} r={5 + (i % 3)} fill="#EFD9A8" />
      ))}
      <ellipse cx="252" cy="176" rx="10" ry="5" fill={C.leaf} />
    </>
  )
}

export function DishArt({ archetype, className }: { archetype: Archetype; className?: string }) {
  const scene = SCENES[archetype] ?? SCENES.dosa
  const gid = `bg-${archetype}`
  return (
    <svg viewBox="0 0 400 300" role="img" aria-hidden="true" className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={gid} cx="50%" cy="38%" r="80%">
          <stop offset="0%" stopColor="#F6EEDA" />
          <stop offset="100%" stopColor="#EADDBE" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${gid})`} />
      {scene()}
      <rect width="400" height="300" fill="#2B2118" opacity="0.03" />
    </svg>
  )
}
