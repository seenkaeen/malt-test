import type { ServiceArt as ServiceArtKey } from '../../data/services'

interface Props {
  art: ServiceArtKey
  className?: string
}

const svgProps = {
  viewBox: '0 0 320 200',
  className: 'block h-full w-full',
  preserveAspectRatio: 'xMidYMid slice',
  'aria-hidden': true,
} as const

function Lawn() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="lawnBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EEF8F1" />
          <stop offset="1" stopColor="#DCF0E4" />
        </linearGradient>
        <linearGradient id="lawnTurf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3DAE71" />
          <stop offset="1" stopColor="#2B9560" />
        </linearGradient>
        <clipPath id="lawnClip">
          <path d="M0 120 Q160 104 320 120 L320 200 L0 200 Z" />
        </clipPath>
      </defs>
      <rect width="320" height="200" fill="url(#lawnBg)" />
      <circle cx="268" cy="46" r="26" fill="#F2DCAE" opacity="0.6" />
      <circle cx="268" cy="46" r="15" fill="#E0A04D" />
      <path d="M0 120 Q160 104 320 120 L320 200 L0 200 Z" fill="url(#lawnTurf)" />
      <g clipPath="url(#lawnClip)">
        <rect x="0" y="100" width="40" height="100" fill="#ffffff" opacity="0.09" />
        <rect x="80" y="100" width="40" height="100" fill="#ffffff" opacity="0.09" />
        <rect x="160" y="100" width="40" height="100" fill="#ffffff" opacity="0.09" />
        <rect x="240" y="100" width="40" height="100" fill="#ffffff" opacity="0.09" />
        <rect x="40" y="100" width="40" height="100" fill="#0A3D2A" opacity="0.08" />
        <rect x="120" y="100" width="40" height="100" fill="#0A3D2A" opacity="0.08" />
        <rect x="200" y="100" width="40" height="100" fill="#0A3D2A" opacity="0.08" />
        <rect x="280" y="100" width="40" height="100" fill="#0A3D2A" opacity="0.08" />
      </g>
      {/* mower */}
      <g>
        <path d="M186 120 L244 72" stroke="#0C1410" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M236 66 L256 80" stroke="#0C1410" strokeWidth="7" strokeLinecap="round" fill="none" />
        <rect x="112" y="96" width="46" height="26" rx="7" fill="#0C1410" />
        <rect x="96" y="112" width="92" height="40" rx="12" fill="#0E5C3F" />
        <rect x="150" y="120" width="30" height="10" rx="5" fill="#46C98B" />
        <circle cx="114" cy="153" r="15" fill="#0C1410" />
        <circle cx="114" cy="153" r="6" fill="#46C98B" />
        <circle cx="176" cy="153" r="15" fill="#0C1410" />
        <circle cx="176" cy="153" r="6" fill="#46C98B" />
      </g>
    </svg>
  )
}

function Window() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="winBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EAF3F2" />
          <stop offset="1" stopColor="#DCEDEA" />
        </linearGradient>
        <linearGradient id="winGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F5FBFF" />
          <stop offset="1" stopColor="#DDEEF0" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#winBg)" />
      <rect x="70" y="30" width="180" height="138" rx="12" fill="#FBFAF5" stroke="#D9D5C8" strokeWidth="2" />
      <rect x="84" y="44" width="152" height="110" rx="6" fill="url(#winGlass)" />
      <polygon points="98,54 132,54 102,98 86,98" fill="#ffffff" opacity="0.55" />
      <polygon points="150,54 168,54 122,150 104,150" fill="#ffffff" opacity="0.3" />
      <rect x="156" y="44" width="8" height="110" fill="#FBFAF5" />
      <rect x="84" y="95" width="152" height="8" fill="#FBFAF5" />
      {/* squeegee */}
      <g transform="rotate(-38 160 100)">
        <rect x="154" y="40" width="12" height="74" rx="6" fill="#0C1410" />
        <rect x="138" y="112" width="44" height="13" rx="5" fill="#0E5C3F" />
        <rect x="138" y="123" width="44" height="5" rx="2" fill="#46C98B" />
      </g>
      {/* sparkles */}
      <g fill="#E0A04D">
        <path d="M214 60 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" />
      </g>
      <g fill="#46C98B">
        <path d="M110 118 l2.4 5.6 5.6 2.4 -5.6 2.4 -2.4 5.6 -2.4 -5.6 -5.6 -2.4 5.6 -2.4 z" />
      </g>
    </svg>
  )
}

function Hedge() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="hedgeBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EEF8F1" />
          <stop offset="1" stopColor="#DDF0E5" />
        </linearGradient>
        <linearGradient id="hedgeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2F9C63" />
          <stop offset="1" stopColor="#237A4D" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#hedgeBg)" />
      <rect x="0" y="166" width="320" height="34" fill="#CFE6D6" />
      <path
        d="M34 168 L34 110 Q34 92 52 92 L268 92 Q286 92 286 110 L286 168 Z"
        fill="url(#hedgeGrad)"
      />
      <rect x="40" y="92" width="240" height="7" rx="3" fill="#5FD49B" opacity="0.7" />
      <g fill="#1F6B41" opacity="0.5">
        <circle cx="70" cy="120" r="3" />
        <circle cx="120" cy="138" r="3" />
        <circle cx="180" cy="118" r="3" />
        <circle cx="230" cy="140" r="3" />
        <circle cx="150" cy="128" r="3" />
      </g>
      {/* shears, open, trimming the top */}
      <g>
        <line x1="248" y1="96" x2="304" y2="66" stroke="#0C1410" strokeWidth="6" strokeLinecap="round" />
        <line x1="248" y1="96" x2="304" y2="90" stroke="#0C1410" strokeWidth="6" strokeLinecap="round" />
        <line x1="248" y1="96" x2="214" y2="116" stroke="#0C1410" strokeWidth="5" strokeLinecap="round" />
        <line x1="248" y1="96" x2="220" y2="128" stroke="#0C1410" strokeWidth="5" strokeLinecap="round" />
        <circle cx="210" cy="118" r="6" fill="none" stroke="#0C1410" strokeWidth="4" />
        <circle cx="217" cy="131" r="6" fill="none" stroke="#0C1410" strokeWidth="4" />
        <circle cx="248" cy="96" r="4.5" fill="#46C98B" />
      </g>
      {/* falling trimmings */}
      <g fill="#2F9C63">
        <ellipse cx="296" cy="120" rx="4" ry="2" transform="rotate(40 296 120)" />
        <ellipse cx="288" cy="140" rx="4" ry="2" transform="rotate(-20 288 140)" />
      </g>
    </svg>
  )
}

function Snow() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="snowBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ECF3F8" />
          <stop offset="1" stopColor="#D9E7F1" />
        </linearGradient>
        <linearGradient id="snowGround" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E7F0F6" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#snowBg)" />
      <circle cx="64" cy="48" r="22" fill="#FFFFFF" opacity="0.7" />
      <path d="M0 132 Q160 118 320 132 L320 200 L0 200 Z" fill="url(#snowGround)" />
      {/* cleared driveway strip */}
      <path d="M126 200 L156 142 L196 142 L236 200 Z" fill="#2A3A31" />
      <path d="M156 142 L196 142 L200 152 L152 152 Z" fill="#33473B" />
      {/* snow banks */}
      <ellipse cx="58" cy="178" rx="56" ry="20" fill="#FFFFFF" />
      <ellipse cx="286" cy="182" rx="50" ry="18" fill="#FFFFFF" />
      {/* shovel */}
      <g transform="rotate(16 214 120)">
        <rect x="198" y="58" width="28" height="11" rx="5" fill="#0C1410" />
        <rect x="207" y="66" width="10" height="80" rx="5" fill="#0E5C3F" />
        <path d="M190 146 L234 146 L240 170 L184 170 Z" fill="#C7D6E0" stroke="#0C1410" strokeWidth="2" />
        <ellipse cx="212" cy="148" rx="20" ry="6" fill="#FFFFFF" />
      </g>
      {/* snowflakes */}
      <g stroke="#9DBBD2" strokeWidth="2" strokeLinecap="round">
        <g transform="translate(96 70)">
          <line x1="-6" y1="0" x2="6" y2="0" />
          <line x1="0" y1="-6" x2="0" y2="6" />
          <line x1="-4" y1="-4" x2="4" y2="4" />
          <line x1="-4" y1="4" x2="4" y2="-4" />
        </g>
        <g transform="translate(250 56)">
          <line x1="-5" y1="0" x2="5" y2="0" />
          <line x1="0" y1="-5" x2="0" y2="5" />
          <line x1="-3.5" y1="-3.5" x2="3.5" y2="3.5" />
          <line x1="-3.5" y1="3.5" x2="3.5" y2="-3.5" />
        </g>
      </g>
      <g fill="#BDD4E6">
        <circle cx="150" cy="64" r="3" />
        <circle cx="206" cy="92" r="2.5" />
        <circle cx="278" cy="108" r="2.5" />
      </g>
    </svg>
  )
}

function Pressure() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="pwBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EFF2EE" />
          <stop offset="1" stopColor="#E0E7DF" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#pwBg)" />
      {/* paved surface — grimy base */}
      <path d="M0 128 L320 128 L320 200 L0 200 Z" fill="#B9B6AB" />
      {/* clean area revealed (left of diagonal) */}
      <path d="M0 128 L168 128 L214 200 L0 200 Z" fill="#FBFAF5" />
      {/* tile seams */}
      <g stroke="#0C1410" strokeOpacity="0.08" strokeWidth="2">
        <line x1="0" y1="150" x2="320" y2="150" />
        <line x1="0" y1="174" x2="320" y2="174" />
        <line x1="80" y1="128" x2="64" y2="200" />
        <line x1="160" y1="128" x2="170" y2="200" />
        <line x1="240" y1="128" x2="268" y2="200" />
      </g>
      {/* wet sheen along boundary */}
      <path d="M168 128 L214 200 L196 200 L150 128 Z" fill="#BFE0F2" opacity="0.55" />
      {/* wand */}
      <g>
        <rect x="232" y="52" width="22" height="15" rx="4" fill="#0C1410" />
        <rect x="238" y="64" width="9" height="14" rx="3" fill="#0C1410" />
        <line x1="234" y1="60" x2="196" y2="92" stroke="#0C1410" strokeWidth="7" strokeLinecap="round" />
        <circle cx="196" cy="92" r="5" fill="#46C98B" />
      </g>
      {/* spray fan */}
      <path d="M196 92 L120 152 L178 164 Z" fill="#BFE0F2" opacity="0.6" />
      <g stroke="#8FC9E6" strokeWidth="2" strokeLinecap="round" opacity="0.8">
        <line x1="196" y1="92" x2="128" y2="150" />
        <line x1="196" y1="92" x2="150" y2="160" />
        <line x1="196" y1="92" x2="170" y2="162" />
      </g>
      <g fill="#8FC9E6">
        <circle cx="138" cy="150" r="2.5" />
        <circle cx="158" cy="158" r="2" />
        <circle cx="118" cy="140" r="2" />
      </g>
      <g fill="#46C98B">
        <path d="M70 150 l2.4 5.6 5.6 2.4 -5.6 2.4 -2.4 5.6 -2.4 -5.6 -5.6 -2.4 5.6 -2.4 z" />
      </g>
    </svg>
  )
}

export function ServiceArt({ art, className = '' }: Props) {
  const map = {
    lawn: Lawn,
    window: Window,
    hedge: Hedge,
    snow: Snow,
    pressure: Pressure,
  } as const
  const Art = map[art]
  return (
    <div className={className}>
      <Art />
    </div>
  )
}
