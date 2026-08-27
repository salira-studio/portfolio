/**
 * AnimatedBackground — Pure CSS animated particle/orb background
 * No canvas, no JS crashes. Works everywhere.
 * Drop inside any `relative overflow-hidden` container.
 */
export function EvenMesh() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Floating orbs — CSS animated */}
      <span className="sl-orb-float" style={{
        position: 'absolute', borderRadius: '50%',
        width: 480, height: 480,
        top: '-80px', right: '-60px',
        background: 'radial-gradient(circle, rgba(198,71,43,0.12) 0%, rgba(217,164,65,0.07) 50%, transparent 70%)',
        filter: 'blur(55px)',
        animation: 'meshFloat1 18s ease-in-out infinite alternate',
      }} />
      <span className="sl-orb-float" style={{
        position: 'absolute', borderRadius: '50%',
        width: 420, height: 420,
        bottom: '-60px', left: '-50px',
        background: 'radial-gradient(circle, rgba(46,111,94,0.12) 0%, rgba(91,168,143,0.06) 50%, transparent 70%)',
        filter: 'blur(50px)',
        animation: 'meshFloat2 22s ease-in-out infinite alternate',
      }} />
      <span className="sl-orb-float" style={{
        position: 'absolute', borderRadius: '50%',
        width: 320, height: 320,
        top: '30%', left: '40%',
        background: 'radial-gradient(circle, rgba(217,164,65,0.10) 0%, transparent 65%)',
        filter: 'blur(45px)',
        animation: 'meshFloat3 26s ease-in-out infinite alternate',
      }} />

      {/* Flowing particle dots — pure CSS */}
      {Array.from({ length: 28 }).map((_, i) => {
        const colors = ['#C6472B','#D9A441','#2E6F5E','#5BA88F','#E07A5F','#C49535']
        const col = colors[i % colors.length]
        const size = 3 + (i % 4) * 2        // 3, 5, 7, 9 px
        const left = (i * 37 + 5) % 95
        const top = (i * 53 + 10) % 88
        const dur = 8 + (i % 6) * 3         // 8–23s
        const del = (i * 0.7) % 8           // staggered delay
        const anim = `meshDot${(i % 4) + 1}`

        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              background: col,
              opacity: 0.45,
              filter: `blur(0.5px) drop-shadow(0 0 ${size}px ${col})`,
              animation: `${anim} ${dur}s ease-in-out ${del}s infinite alternate`,
            }}
          />
        )
      })}
    </div>
  )
}

export default EvenMesh
