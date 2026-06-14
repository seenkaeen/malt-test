/**
 * The hero's signature visual: a calm, premium Nordic home + freshly
 * mown lawn, rendered entirely in SVG (no external images — fast, crisp
 * at any size, always on-brand). Decorative, so aria-hidden.
 */
export function HomeScene({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 600"
      className={`block h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hsSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E7F2EC" />
          <stop offset="1" stopColor="#F4F7F0" />
        </linearGradient>
        <linearGradient id="hsLawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#46B279" />
          <stop offset="1" stopColor="#2C9560" />
        </linearGradient>
        <linearGradient id="hsWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBFAF5" />
          <stop offset="1" stopColor="#ECE9DE" />
        </linearGradient>
        <radialGradient id="hsSun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFF6DF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#FFF6DF" stopOpacity="0" />
        </radialGradient>
        <filter id="hsShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#0A3D2A" floodOpacity="0.16" />
        </filter>
        <clipPath id="hsLawnClip">
          <path d="M0 330 Q360 300 720 330 L720 600 L0 600 Z" />
        </clipPath>
      </defs>

      {/* sky */}
      <rect width="720" height="600" fill="url(#hsSky)" />
      <circle cx="560" cy="120" r="190" fill="url(#hsSun)" />
      <circle cx="560" cy="116" r="36" fill="#EFD49B" opacity="0.5" />

      {/* clouds */}
      <g fill="#FFFFFF">
        <ellipse cx="180" cy="92" rx="74" ry="22" opacity="0.6" />
        <ellipse cx="244" cy="104" rx="52" ry="17" opacity="0.55" />
        <ellipse cx="470" cy="70" rx="46" ry="14" opacity="0.45" />
      </g>

      {/* birds */}
      <g stroke="#6F8579" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.5">
        <path d="M120 150 q10 -9 20 0 q10 -9 20 0" />
        <path d="M180 132 q7 -6 14 0 q7 -6 14 0" />
      </g>

      {/* distant treeline */}
      <g>
        <g fill="#9AC9AF" opacity="0.75">
          <circle cx="60" cy="318" r="48" />
          <circle cx="150" cy="322" r="40" />
          <circle cx="250" cy="316" r="52" />
          <circle cx="700" cy="320" r="48" />
        </g>
        <g fill="#7FBE9B">
          <circle cx="110" cy="330" r="40" />
          <circle cx="210" cy="332" r="44" />
          <circle cx="300" cy="332" r="36" />
        </g>
      </g>

      {/* lawn */}
      <path d="M0 330 Q360 300 720 330 L720 600 L0 600 Z" fill="url(#hsLawn)" />
      <g clipPath="url(#hsLawnClip)">
        <rect x="0" y="320" width="90" height="280" fill="#FFFFFF" opacity="0.07" />
        <rect x="180" y="320" width="90" height="280" fill="#FFFFFF" opacity="0.07" />
        <rect x="360" y="320" width="90" height="280" fill="#FFFFFF" opacity="0.07" />
        <rect x="540" y="320" width="90" height="280" fill="#FFFFFF" opacity="0.07" />
        <rect x="90" y="320" width="90" height="280" fill="#0A3D2A" opacity="0.06" />
        <rect x="270" y="320" width="90" height="280" fill="#0A3D2A" opacity="0.06" />
        <rect x="450" y="320" width="90" height="280" fill="#0A3D2A" opacity="0.06" />
        <rect x="630" y="320" width="90" height="280" fill="#0A3D2A" opacity="0.06" />
        <path d="M0 330 Q360 300 720 330 L720 360 Q360 332 0 360 Z" fill="#0A3D2A" opacity="0.12" />
      </g>

      {/* flagstone path from the door */}
      <path
        d="M556 352 C 528 432, 486 500, 486 600 L598 600 C598 500, 612 432, 600 352 Z"
        fill="#ECE7D8"
        opacity="0.55"
      />

      {/* house */}
      <ellipse cx="545" cy="360" rx="150" ry="22" fill="#0A3D2A" opacity="0.14" />
      <polygon points="442,256 545,194 648,256" fill="#2A332C" />
      <polygon points="442,256 545,194 545,206 456,256" fill="#1F2620" opacity="0.5" />
      <rect x="604" y="200" width="20" height="40" rx="3" fill="#39443D" />
      <rect x="462" y="252" width="166" height="104" rx="6" fill="url(#hsWall)" filter="url(#hsShadow)" />
      {/* lit window */}
      <rect x="486" y="276" width="42" height="40" rx="4" fill="#ECC081" />
      <rect x="505" y="276" width="4" height="40" fill="#FBFAF5" />
      <rect x="486" y="294" width="42" height="4" fill="#FBFAF5" />
      {/* cool window */}
      <rect x="566" y="276" width="42" height="40" rx="4" fill="#CFE3D8" />
      <rect x="585" y="276" width="4" height="40" fill="#FBFAF5" />
      <rect x="566" y="294" width="42" height="4" fill="#FBFAF5" />
      {/* door */}
      <rect x="532" y="312" width="34" height="44" rx="3" fill="#0E5C3F" />
      <circle cx="559" cy="336" r="2.5" fill="#ECC081" />
      {/* gable round window */}
      <circle cx="545" cy="232" r="11" fill="#CFE3D8" stroke="#2A332C" strokeWidth="3" />

      {/* hedge beside house */}
      <rect x="430" y="338" width="120" height="22" rx="11" fill="#2F9C63" />
      <rect x="430" y="338" width="120" height="6" rx="3" fill="#5FD49B" opacity="0.6" />

      {/* foreground tree */}
      <ellipse cx="150" cy="442" rx="96" ry="16" fill="#0A3D2A" opacity="0.14" />
      <rect x="142" y="372" width="16" height="74" rx="5" fill="#5C4632" />
      <g filter="url(#hsShadow)">
        <circle cx="150" cy="346" r="56" fill="#2E7D54" />
        <circle cx="110" cy="368" r="40" fill="#2A7A50" />
        <circle cx="188" cy="366" r="42" fill="#2A7A50" />
      </g>
      <circle cx="132" cy="330" r="22" fill="#3C9468" opacity="0.7" />

      {/* small plantings */}
      <g>
        <circle cx="612" cy="350" r="9" fill="#2F9C63" />
        <circle cx="628" cy="352" r="7" fill="#46C98B" />
        <circle cx="620" cy="344" r="3" fill="#E0A04D" />
        <circle cx="446" cy="352" r="8" fill="#2F9C63" />
        <circle cx="436" cy="354" r="5" fill="#46C98B" />
      </g>
    </svg>
  )
}
