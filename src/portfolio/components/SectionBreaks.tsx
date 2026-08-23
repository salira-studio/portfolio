interface SectionBreakProps {
  /* Background of the section being left */
  from: string
  /* Fill of the section being entered */
  to: string
  variant?: 'curve' | 'angle' | 'dune'
}

export function SectionBreak({ from, to, variant = 'curve' }: SectionBreakProps) {
  const paths: Record<string, string> = {
    curve: 'M0,74 C240,18 480,96 720,64 C960,32 1200,88 1440,40 L1440,96 L0,96 Z',
    angle: 'M0,96 L1440,14 L1440,96 Z',
    dune: 'M0,52 C320,110 640,10 960,58 C1180,90 1330,70 1440,44 L1440,96 L0,96 Z',
  }

  return (
    <div aria-hidden="true" className="relative -mb-px" style={{ backgroundColor: from }}>
      <svg
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        className="block h-12 w-full sm:h-[72px]"
      >
        <path d={paths[variant]} fill={to} />
      </svg>
    </div>
  )
}
