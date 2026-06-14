/**
 * One Nordic home rendered in two seasons. Both full scenes are drawn
 * and cross-faded by opacity so toggling summer↔winter feels like the
 * same garden changing through the year. Decorative (aria-hidden).
 */

function House({ winter }: { winter?: boolean }) {
  return (
    <g filter="url(#ssShadow)">
      <polygon points="452,194 545,136 638,194" fill="#2A332C" />
      <rect x="596" y="146" width="18" height="34" rx="3" fill="#39443D" />
      <rect x="470" y="190" width="150" height="96" rx="6" fill="url(#ssWall)" />
      {/* windows */}
      <rect x="486" y="210" width="36" height="34" rx="4" fill={winter ? '#BcdAe8' : '#ECC081'} />
      <rect x="502" y="210" width="4" height="34" fill="#FBFAF5" />
      <rect x="486" y="225" width="36" height="4" fill="#FBFAF5" />
      <rect x="574" y="210" width="36" height="34" rx="4" fill="#CFE3D8" />
      <rect x="590" y="210" width="4" height="34" fill="#FBFAF5" />
      <rect x="574" y="225" width="36" height="4" fill="#FBFAF5" />
      {/* door */}
      <rect x="528" y="246" width="30" height="40" rx="3" fill="#0E5C3F" />
      <circle cx="552" cy="266" r="2.4" fill="#ECC081" />
      {winter && (
        <g fill="#FFFFFF">
          {/* snow on roof + eaves */}
          <polygon points="452,194 545,136 638,194 620,194 545,150 470,194" opacity="0.95" />
          <rect x="466" y="186" width="158" height="7" rx="3.5" />
        </g>
      )}
    </g>
  )
}

export function SeasonScene({
  season,
  className = '',
}: {
  season: 'summer' | 'winter'
  className?: string
}) {
  const isSummer = season === 'summer'
  const fade = 'transition-opacity duration-700 ease-out'

  return (
    <svg
      viewBox="0 0 760 420"
      className={`block h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ssLawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#46B279" />
          <stop offset="1" stopColor="#2C9560" />
        </linearGradient>
        <linearGradient id="ssWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBFAF5" />
          <stop offset="1" stopColor="#ECE9DE" />
        </linearGradient>
        <linearGradient id="ssSnow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E5EFF6" />
        </linearGradient>
        <radialGradient id="ssSunWarm" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFF1CF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#FFF1CF" stopOpacity="0" />
        </radialGradient>
        <filter id="ssShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0A3D2A" floodOpacity="0.16" />
        </filter>
        <clipPath id="ssLawnClip">
          <path d="M0 282 Q380 260 760 282 L760 420 L0 420 Z" />
        </clipPath>
      </defs>

      <rect width="760" height="420" fill="#E9F0EA" />

      {/* ---------- SUMMER ---------- */}
      <g className={fade} style={{ opacity: isSummer ? 1 : 0 }}>
        <rect width="760" height="420" fill="#E7F2EC" />
        <circle cx="618" cy="92" r="150" fill="url(#ssSunWarm)" />
        <circle cx="618" cy="92" r="32" fill="#F1D89B" opacity="0.6" />
        <path d="M0 282 Q380 260 760 282 L760 420 L0 420 Z" fill="url(#ssLawn)" />
        <g clipPath="url(#ssLawnClip)">
          <rect x="0" y="270" width="95" height="160" fill="#FFFFFF" opacity="0.07" />
          <rect x="190" y="270" width="95" height="160" fill="#FFFFFF" opacity="0.07" />
          <rect x="380" y="270" width="95" height="160" fill="#FFFFFF" opacity="0.07" />
          <rect x="570" y="270" width="95" height="160" fill="#FFFFFF" opacity="0.07" />
          <rect x="95" y="270" width="95" height="160" fill="#0A3D2A" opacity="0.06" />
          <rect x="285" y="270" width="95" height="160" fill="#0A3D2A" opacity="0.06" />
          <rect x="475" y="270" width="95" height="160" fill="#0A3D2A" opacity="0.06" />
          <rect x="665" y="270" width="95" height="160" fill="#0A3D2A" opacity="0.06" />
        </g>
        <rect x="436" y="266" width="120" height="22" rx="11" fill="#2F9C63" />
        <House />
        {/* leafy tree */}
        <ellipse cx="120" cy="330" rx="86" ry="14" fill="#0A3D2A" opacity="0.13" />
        <rect x="112" y="262" width="14" height="70" rx="5" fill="#5C4632" />
        <g filter="url(#ssShadow)">
          <circle cx="120" cy="236" r="52" fill="#2E7D54" />
          <circle cx="84" cy="258" r="36" fill="#2A7A50" />
          <circle cx="156" cy="256" r="38" fill="#2A7A50" />
        </g>
        {/* flowers */}
        <g>
          <circle cx="250" cy="320" r="6" fill="#E0A04D" />
          <circle cx="270" cy="328" r="6" fill="#46C98B" />
          <circle cx="690" cy="320" r="6" fill="#E0A04D" />
        </g>
      </g>

      {/* ---------- WINTER ---------- */}
      <g className={fade} style={{ opacity: isSummer ? 0 : 1 }}>
        <rect width="760" height="420" fill="#E2ECF3" />
        <circle cx="618" cy="90" r="120" fill="#FFFFFF" opacity="0.45" />
        <circle cx="618" cy="90" r="30" fill="#FFFFFF" opacity="0.8" />
        <path d="M0 282 Q380 260 760 282 L760 420 L0 420 Z" fill="url(#ssSnow)" />
        {/* cleared driveway */}
        <path d="M300 420 L348 312 L430 312 L478 420 Z" fill="#2A3A31" />
        <path d="M348 312 L430 312 L436 326 L342 326 Z" fill="#33473B" />
        <House winter />
        {/* snow banks in front */}
        <ellipse cx="120" cy="360" rx="120" ry="26" fill="#FFFFFF" />
        <ellipse cx="640" cy="372" rx="150" ry="28" fill="#FFFFFF" />
        <ellipse cx="300" cy="392" rx="60" ry="16" fill="#FFFFFF" />
        {/* bare tree with snow */}
        <rect x="112" y="262" width="14" height="74" rx="5" fill="#5C4632" />
        <g stroke="#5C4632" strokeWidth="6" strokeLinecap="round" fill="none">
          <path d="M119 280 L92 250" />
          <path d="M119 286 L150 256" />
          <path d="M119 268 L104 244" />
          <path d="M119 272 L138 246" />
        </g>
        <g fill="#FFFFFF">
          <circle cx="92" cy="250" r="7" />
          <circle cx="150" cy="256" r="7" />
          <circle cx="119" cy="262" r="8" />
          <circle cx="104" cy="244" r="5" />
          <circle cx="138" cy="246" r="5" />
        </g>
        {/* falling snow */}
        <g fill="#FFFFFF">
          <circle cx="220" cy="120" r="3.5" className="animate-float" />
          <circle cx="500" cy="90" r="3" className="animate-float-slow" />
          <circle cx="380" cy="150" r="2.6" className="animate-float" style={{ animationDelay: '1.2s' }} />
          <circle cx="660" cy="150" r="3" className="animate-float-slow" style={{ animationDelay: '0.6s' }} />
          <circle cx="170" cy="180" r="2.4" className="animate-float" style={{ animationDelay: '0.4s' }} />
        </g>
      </g>
    </svg>
  )
}
