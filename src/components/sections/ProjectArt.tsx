import { useId } from 'react'
import type { ProjectArt as ArtKind } from '../../data/projects'

/*
 * Illustrated previews for case studies that have no screenshot yet.
 * Each is a small, hand-drawn interface scene in the site's palette —
 * an impression of the product, not a fake screenshot. Rendered with
 * preserveAspectRatio="slice" so it fills any bento tile.
 */

const INK = '#ededef'
const FAINT = '#808088'
const AMBER = '#f59e0b'
const PANEL = '#121216'
const LINE = 'rgb(255 255 255 / 0.09)'
const MONO = "'Geist Mono Variable', ui-monospace, monospace"
const SERIF = "'Instrument Serif', Georgia, serif"
const SANS = "'Inter Variable', system-ui, sans-serif"

function useSafeId() {
  return useId().replace(/[^a-zA-Z0-9_-]/g, '')
}

function Backdrop({ id, glow = AMBER, at = '78% 18%' }: { id: string; glow?: string; at?: string }) {
  const [cx, cy] = at.split(' ')
  return (
    <>
      <defs>
        <radialGradient id={`${id}-glow`} cx={cx} cy={cy} r="70%">
          <stop offset="0" stopColor={glow} stopOpacity="0.22" />
          <stop offset="1" stopColor={glow} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-dots`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="rgb(255 255 255 / 0.06)" />
        </pattern>
      </defs>
      <rect width="640" height="400" fill="#0c0c0f" />
      <rect width="640" height="400" fill={`url(#${id}-dots)`} />
      <rect width="640" height="400" fill={`url(#${id}-glow)`} />
    </>
  )
}

/* KROX — corporate site in a browser window. */
function WebArt() {
  const id = useSafeId()
  return (
    <>
      <Backdrop id={id} />
      <defs>
        <linearGradient id={`${id}-hero`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a2a12" />
          <stop offset="0.55" stopColor="#1b1712" />
          <stop offset="1" stopColor="#0f0f12" />
        </linearGradient>
        <linearGradient id={`${id}-t1`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2622" />
          <stop offset="1" stopColor="#16161a" />
        </linearGradient>
      </defs>
      <rect x="60" y="46" width="520" height="330" rx="14" fill={PANEL} stroke={LINE} />
      <path d="M60 80h520" stroke={LINE} />
      {[82, 96, 110].map((x) => (
        <circle key={x} cx={x} cy="63" r="4" fill="rgb(255 255 255 / 0.12)" />
      ))}
      <rect x="200" y="55" width="240" height="16" rx="8" fill="rgb(255 255 255 / 0.04)" />
      <text x="320" y="66.5" textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill={FAINT}>
        krox-design.vercel.app
      </text>

      <text x="84" y="116" fontFamily={SERIF} fontSize="22" fill={INK}>
        KROX
      </text>
      {[420, 458, 496].map((x) => (
        <rect key={x} x={x} y="106" width="28" height="4" rx="2" fill="rgb(255 255 255 / 0.18)" />
      ))}
      <rect x="532" y="99" width="26" height="18" rx="9" fill="none" stroke={AMBER} strokeOpacity="0.7" />

      <rect x="84" y="146" width="200" height="16" rx="3" fill={INK} fillOpacity="0.88" />
      <rect x="84" y="170" width="150" height="16" rx="3" fill={INK} fillOpacity="0.45" />
      <rect x="84" y="200" width="190" height="5" rx="2.5" fill="rgb(255 255 255 / 0.16)" />
      <rect x="84" y="212" width="160" height="5" rx="2.5" fill="rgb(255 255 255 / 0.16)" />
      <rect x="84" y="232" width="84" height="22" rx="11" fill={AMBER} />
      <rect x="176" y="232" width="70" height="22" rx="11" fill="none" stroke="rgb(255 255 255 / 0.2)" />

      <rect x="316" y="140" width="242" height="118" rx="10" fill={`url(#${id}-hero)`} />
      <path d="M316 236 l60 -44 l40 28 l50 -52 l92 72 v18 a10 10 0 0 1 -10 10 h-222 a10 10 0 0 1 -10 -10z" fill="rgb(255 255 255 / 0.04)" />
      <circle cx="520" cy="168" r="12" fill={AMBER} fillOpacity="0.5" />

      {[84, 248, 412].map((x, i) => (
        <rect key={x} x={x} y="276" width="146" height="66" rx="8" fill={`url(#${id}-t1)`} stroke={i === 1 ? AMBER : LINE} strokeOpacity={i === 1 ? 0.5 : 1} />
      ))}
      {[308, 320, 332].map((x, i) => (
        <circle key={x} cx={x} cy="358" r={i === 1 ? 3 : 2.2} fill={i === 1 ? AMBER : 'rgb(255 255 255 / 0.2)'} />
      ))}
    </>
  )
}

function bottle(cx: number, y: number) {
  return `M${cx - 5} ${y}h10v28c0 8 12 10 12 22v68q0 6-6 6h-22q-6 0-6-6v-68c0-12 12-14 12-22z`
}

/* Maria Maria — boutique wine storefront with checkout. */
function CommerceArt() {
  const id = useSafeId()
  const products = [
    { x: 84, name: 'Rosso', price: '€24' },
    { x: 246, name: 'Riserva', price: '€38' },
    { x: 408, name: 'Bianco', price: '€19' },
  ]
  return (
    <>
      <Backdrop id={id} glow="#9f1239" at="18% 85%" />
      <defs>
        <linearGradient id={`${id}-wine`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4c0f1c" />
          <stop offset="1" stopColor="#14060a" />
        </linearGradient>
      </defs>
      <rect x="60" y="40" width="520" height="340" rx="14" fill={PANEL} stroke={LINE} />
      <text x="84" y="80" fontFamily={SERIF} fontStyle="italic" fontSize="21" fill={INK}>
        Maria Maria
      </text>
      {[388, 426, 464].map((x) => (
        <rect key={x} x={x} y="70" width="26" height="4" rx="2" fill="rgb(255 255 255 / 0.18)" />
      ))}
      <circle cx="545" cy="72" r="11" fill="none" stroke="rgb(255 255 255 / 0.2)" />
      <circle cx="552" cy="64" r="4" fill={AMBER} />

      {products.map((p, i) => (
        <g key={p.name}>
          <rect x={p.x} y="100" width="148" height="190" rx="10" fill="rgb(255 255 255 / 0.025)" stroke={i === 1 ? AMBER : LINE} strokeOpacity={i === 1 ? 0.55 : 1} />
          <ellipse cx={p.x + 74} cy="244" rx="30" ry="5" fill="black" fillOpacity="0.5" />
          <path d={bottle(p.x + 74, 112)} fill={`url(#${id}-wine)`} stroke="rgb(255 255 255 / 0.08)" />
          <rect x={p.x + 63} y="186" width="22" height="26" rx="2" fill="#efe6d6" fillOpacity="0.85" />
          <rect x={p.x + 67} y="194" width="14" height="2" fill={AMBER} />
          <text x={p.x + 14} y="270" fontFamily={SANS} fontSize="11" fill={INK}>
            {p.name}
          </text>
          <text x={p.x + 134} y="270" textAnchor="end" fontFamily={MONO} fontSize="10" fill={FAINT}>
            {p.price}
          </text>
        </g>
      ))}

      <rect x="84" y="306" width="230" height="56" rx="8" fill="rgb(255 255 255 / 0.03)" stroke={LINE} />
      <path d="M96 344c30-26 50 8 80-10s40-20 70-4 30 12 56-6" fill="none" stroke="rgb(255 255 255 / 0.14)" />
      <path d="M96 352c34-18 54 2 84-8s46-14 74-2 28 6 48-4" fill="none" stroke="rgb(255 255 255 / 0.08)" />
      <circle cx="210" cy="328" r="4" fill={AMBER} />
      <circle cx="210" cy="328" r="9" fill={AMBER} fillOpacity="0.18" />

      <rect x="408" y="314" width="148" height="40" rx="20" fill={AMBER} />
      <text x="482" y="338" textAnchor="middle" fontFamily={SANS} fontSize="12" fontWeight="600" fill="#0a0a0c">
        Checkout
      </text>
      <text x="342" y="338" fontFamily={MONO} fontSize="9" fill={FAINT}>
        stripe
      </text>
    </>
  )
}

/* Vehicle App — live GPS route and maintenance reminders on a phone. */
function MobileArt() {
  const id = useSafeId()
  return (
    <>
      <Backdrop id={id} glow="#6366f1" at="85% 30%" />
      <defs>
        <clipPath id={`${id}-screen`}>
          <rect x="222" y="58" width="176" height="176" rx="16" />
        </clipPath>
      </defs>

      {/* Admin view, set back behind the phone. */}
      <g transform="rotate(7 520 220)" opacity="0.55">
        <rect x="430" y="70" width="170" height="300" rx="24" fill={PANEL} stroke={LINE} />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <circle cx="456" cy={118 + i * 44} r="8" fill="rgb(255 255 255 / 0.08)" />
            <rect x="472" y={112 + i * 44} width="80" height="5" rx="2.5" fill="rgb(255 255 255 / 0.25)" />
            <rect x="472" y={122 + i * 44} width="50" height="4" rx="2" fill="rgb(255 255 255 / 0.1)" />
          </g>
        ))}
      </g>

      <rect x="208" y="28" width="204" height="410" rx="34" fill={PANEL} stroke="rgb(255 255 255 / 0.14)" />
      <rect x="282" y="40" width="56" height="9" rx="4.5" fill="#050506" />

      <g clipPath={`url(#${id}-screen)`}>
        <rect x="222" y="58" width="176" height="176" fill="#0e0e12" />
        {[80, 112, 150, 190].map((y) => (
          <path key={y} d={`M222 ${y} L398 ${y + 18}`} stroke="rgb(255 255 255 / 0.05)" strokeWidth="6" />
        ))}
        {[250, 300, 352].map((x) => (
          <path key={x} d={`M${x} 58 L${x - 24} 234`} stroke="rgb(255 255 255 / 0.05)" strokeWidth="6" />
        ))}
        <path d="M244 214 L262 168 L300 160 L318 118 L366 104 L378 76" fill="none" stroke={AMBER} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="244" cy="214" r="5" fill={INK} />
        <circle cx="378" cy="76" r="12" fill={AMBER} fillOpacity="0.2" />
        <circle cx="378" cy="76" r="5" fill={AMBER} />
        <circle cx="318" cy="118" r="7" fill="#0a0a0c" stroke={INK} strokeWidth="2" />
      </g>

      <rect x="222" y="246" width="176" height="72" rx="12" fill="rgb(255 255 255 / 0.04)" stroke={LINE} />
      <text x="236" y="270" fontFamily={SANS} fontSize="11.5" fontWeight="500" fill={INK}>
        Oil change
      </text>
      <text x="384" y="270" textAnchor="end" fontFamily={MONO} fontSize="9" fill={AMBER}>
        DUE SOON
      </text>
      <text x="236" y="286" fontFamily={MONO} fontSize="9" fill={FAINT}>
        in 1,200 km
      </text>
      <rect x="236" y="298" width="148" height="4" rx="2" fill="rgb(255 255 255 / 0.08)" />
      <rect x="236" y="298" width="112" height="4" rx="2" fill={AMBER} />

      <rect x="222" y="328" width="176" height="56" rx="12" fill="rgb(255 255 255 / 0.03)" stroke={LINE} />
      <text x="236" y="352" fontFamily={SANS} fontSize="11.5" fontWeight="500" fill={INK}>
        Tyre check
      </text>
      <text x="236" y="368" fontFamily={MONO} fontSize="9" fill={FAINT}>
        in 14 days
      </text>
    </>
  )
}

/* School Library — HTTP calls against a layered .NET Web API. */
function ApiArt() {
  const id = useSafeId()
  const calls = [
    { m: 'GET', p: '/api/books', s: '200' },
    { m: 'POST', p: '/api/loans', s: '201' },
    { m: 'GET', p: '/api/students/42', s: '200' },
    { m: 'PATCH', p: '/api/loans/7', s: '204' },
  ]
  const layers = ['Domain', 'Application', 'Infrastructure']
  return (
    <>
      <Backdrop id={id} at="30% 20%" />
      <rect x="48" y="52" width="330" height="300" rx="12" fill={PANEL} stroke={LINE} />
      <path d="M48 84h330" stroke={LINE} />
      <text x="66" y="72" fontFamily={MONO} fontSize="9.5" fill={FAINT}>
        library.http
      </text>
      <circle cx="356" cy="68" r="3.5" fill={AMBER} />
      {calls.map((c, i) => (
        <g key={c.p} fontFamily={MONO} fontSize="11">
          <text x="66" y={114 + i * 26} fill={AMBER}>
            {c.m}
          </text>
          <text x="122" y={114 + i * 26} fill={INK}>
            {c.p}
          </text>
          <text x="360" y={114 + i * 26} textAnchor="end" fill={FAINT}>
            {c.s}
          </text>
        </g>
      ))}
      <path d="M66 228h294" stroke={LINE} strokeDasharray="3 4" />
      <g fontFamily={MONO} fontSize="10">
        <text x="66" y="252" fill={FAINT}>
          {'{'}
        </text>
        <text x="80" y="270" fill={FAINT}>
          "title": <tspan fill={INK}>"Il nome della rosa"</tspan>,
        </text>
        <text x="80" y="288" fill={FAINT}>
          "available": <tspan fill={AMBER}>true</tspan>,
        </text>
        <text x="80" y="306" fill={FAINT}>
          "dueBack": <tspan fill={INK}>null</tspan>
        </text>
        <text x="66" y="324" fill={FAINT}>
          {'}'}
        </text>
      </g>

      {layers.map((name, i) => (
        <g key={name}>
          <rect x="408" y={70 + i * 62} width="184" height="44" rx="10" fill="rgb(255 255 255 / 0.03)" stroke={i === 0 ? AMBER : LINE} strokeOpacity={i === 0 ? 0.6 : 1} />
          <text x="424" y={97 + i * 62} fontFamily={SANS} fontSize="12" fill={INK}>
            {name}
          </text>
          <text x="576" y={97 + i * 62} textAnchor="end" fontFamily={MONO} fontSize="8.5" fill={FAINT}>
            {String(i + 1).padStart(2, '0')}
          </text>
          {i < 2 && <path d={`M500 ${114 + i * 62}v18`} stroke="rgb(255 255 255 / 0.18)" />}
        </g>
      ))}
      <path d="M500 238v20" stroke="rgb(255 255 255 / 0.18)" />
      <ellipse cx="500" cy="268" rx="52" ry="10" fill={PANEL} stroke={LINE} />
      <path d="M448 268v40c0 5.5 23 10 52 10s52-4.5 52-10v-40" fill={PANEL} stroke={LINE} />
      <text x="500" y="298" textAnchor="middle" fontFamily={MONO} fontSize="9.5" fill={INK}>
        PostgreSQL
      </text>
      <rect x="452" y="332" width="96" height="20" rx="10" fill="none" stroke="rgb(255 255 255 / 0.18)" />
      <text x="500" y="345.5" textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill={FAINT}>
        docker · render
      </text>
    </>
  )
}

const scenes: Record<ArtKind, () => React.JSX.Element> = {
  web: WebArt,
  commerce: CommerceArt,
  mobile: MobileArt,
  api: ApiArt,
}

export function ProjectArt({ kind, className }: { kind: ArtKind; className?: string }) {
  const Scene = scenes[kind]
  return (
    <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <Scene />
    </svg>
  )
}
