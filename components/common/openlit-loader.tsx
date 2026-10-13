import { cn } from 'lib/utils'

// OpenLIT mark, traced from /static/images/logo.png. Drawn hairline-style: a dim
// construction outline, a bright stroke that traces it, then the brand fill rising
// inside the drop. Motion uses one ease, (.32, .72, 0, 1), and the nodes follow the
// drop by a short stagger.
const DROP =
  'M256 483L242 483.1L224 481.2L209 478.1L194 473.3L180 467.3L167 460.1L154 451.2L141 440.1L131 429.7L121.8 418L111.7 402L105.8 390L99.8 374L95.9 359L93.6 345L92.6 329L92.8 320L93.7 309L96.7 292L101.7 275L109 258L114.6 248L157.2 181L190.2 126L208.4 94L223 67L235.4 43L247 19.1L248 17.7L249 17.5L250 18.4L252 22L257.2 33L260.2 41L263.3 52L265.3 62L266.3 71L266.3 90L265.2 99L263.3 109L260.2 120L257.3 128L253.2 137L249.4 144L238.9 160L233.8 169L229.6 179L226.7 189L224.7 203L224.8 216L226.8 229L228.8 236L231.8 244L235.6 252L239.9 259L244.3 265L249.6 271L255 276.2L261 281L267 285.1L275 289.5L287 294.3L300 297.4L308 297.9L320 296.7L326 296.6L335 297.5L341 298.6L348 300.7L355 303.6L361 306.9L367 311L372.9 316L378.6 322L383.1 328L387.3 335L391.2 344L393.3 351L394.4 357L395.1 366L394.3 377L392.2 386L389.3 394L384.1 404L377.2 415L368.2 427L359 437.2L348 447.2L339 454.2L328 461.3L317 467.3L306 472.1L295 476L283 479.3L267 482.1Z'
const NODES =
  'M342 273.3L288 273.5L282 272.2L278 270.7L268 265.4L263 261.4L259 257.3L255.8 253L252.9 248L250.3 242L247.6 231L247.6 205L248.6 203L252 198.5L257 194.8L260 193.5L266 192.5L323 192.5L330 193L341 182.9L344.4 179L345.4 177L345.5 134L344.4 131L342 128L336.5 123L331.9 118L322 108.9L316 107.5L306 107.5L301 108.5L293 107.4L290 105.9L287 101.4L286.5 98L286.6 68L288.2 64L292 60.8L295 59.6L318 59.5L322 60L326 59.6L329 60.7L332 62.6L333.2 64L334.4 67L334.5 92L334.9 95L342 102.5L358 118.1L361 118.5L406 118.6L410.1 120L411.4 121L412.4 123L412.5 185L412 188L409 190.3L405 191.5L359 191.6L357 192.6L354.1 195L344.6 205L343.5 208L343.7 271L343 272.9Z'

const VIEW_BOX = '84 8 338 484'
const VIEW_HEIGHT = 484
const ASPECT = 338 / 484

const DROP_COLOR = '#F97A06'
const NODES_COLOR = '#F95B1D'

const STYLES = `
.ol-loader-trace {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: ol-loader-trace 2.8s infinite;
}
.ol-loader-fill {
  clip-path: inset(100% 0 0 0);
  -webkit-clip-path: inset(100% 0 0 0);
  animation: ol-loader-fill 2.8s infinite;
}
.ol-loader-nodes { animation-delay: 0.16s; }
@keyframes ol-loader-trace {
  0% { stroke-dashoffset: 1; opacity: 1; animation-timing-function: cubic-bezier(.32, .72, 0, 1); }
  45% { stroke-dashoffset: 0; opacity: 1; }
  82% { stroke-dashoffset: 0; opacity: 1; animation-timing-function: cubic-bezier(.32, .72, 0, 1); }
  100% { stroke-dashoffset: 0; opacity: 0; }
}
@keyframes ol-loader-fill {
  0%, 22% { clip-path: inset(100% 0 0 0); -webkit-clip-path: inset(100% 0 0 0); opacity: 1; animation-timing-function: cubic-bezier(.32, .72, 0, 1); }
  68% { clip-path: inset(0 0 0 0); -webkit-clip-path: inset(0 0 0 0); opacity: 1; }
  82% { clip-path: inset(0 0 0 0); -webkit-clip-path: inset(0 0 0 0); opacity: 1; animation-timing-function: cubic-bezier(.32, .72, 0, 1); }
  100% { clip-path: inset(0 0 0 0); -webkit-clip-path: inset(0 0 0 0); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .ol-loader-trace { animation: none; stroke-dashoffset: 0; }
  .ol-loader-fill { animation: none; clip-path: none; -webkit-clip-path: none; }
}
`

function Shape({ d, stroke, className }: { d: string; stroke?: string; className?: string }) {
  return <path d={d} pathLength={1} stroke={stroke} className={className} />
}

export default function OpenlitLoader({
  size = 56,
  label = 'Loading',
  className,
}: {
  /** Rendered height in px. */
  size?: number
  label?: string
  className?: string
}) {
  // Keep strokes a ~1.25px hairline whatever the rendered size.
  const strokeWidth = (1.25 * VIEW_HEIGHT) / size
  const width = Math.round(size * ASPECT)

  return (
    <span
      role="status"
      aria-live="polite"
      className={cn('relative inline-block shrink-0', className)}
      style={{ width, height: size }}
    >
      <style>{STYLES}</style>
      <span className="sr-only">{label}</span>

      <span aria-hidden className="ol-loader-fill absolute inset-0">
        <svg viewBox={VIEW_BOX} width={width} height={size} className="block">
          <path d={DROP} fill={DROP_COLOR} />
        </svg>
      </span>
      <span aria-hidden className="ol-loader-fill ol-loader-nodes absolute inset-0">
        <svg viewBox={VIEW_BOX} width={width} height={size} className="block">
          <path d={NODES} fill={NODES_COLOR} />
        </svg>
      </span>

      <svg
        aria-hidden
        viewBox={VIEW_BOX}
        width={width}
        height={size}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        className="absolute inset-0 overflow-visible"
      >
        <g className="stroke-stone-300 dark:stroke-stone-700">
          <Shape d={DROP} />
          <Shape d={NODES} />
        </g>
        <Shape d={DROP} stroke={DROP_COLOR} className="ol-loader-trace" />
        <Shape d={NODES} stroke={NODES_COLOR} className="ol-loader-trace ol-loader-nodes" />
      </svg>
    </span>
  )
}
