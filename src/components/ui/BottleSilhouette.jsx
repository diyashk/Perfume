/**
 * Abstract bottle silhouette used where a lightweight 2D mark is better than
 * another WebGL canvas (collection visuals, final CTA). Tinted by `liquid`.
 */
export default function BottleSilhouette({ className = '', liquid = '#e3d1a0' }) {
  return (
    <svg viewBox="0 0 200 460" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.42)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
        </linearGradient>
        <linearGradient id="juiceGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
          <stop offset="40%" stopColor={liquid} />
          <stop offset="100%" stopColor={liquid} />
        </linearGradient>
        <clipPath id="bottleClip">
          <path d="M104 10 L104 76 Q104 96 122 110 L172 152 Q180 160 180 174 L180 360 Q180 392 150 412 Q120 432 100 432 Q80 432 50 412 Q20 392 20 360 L20 174 Q20 160 28 152 L78 110 Q96 96 96 76 L96 10 A4 4 0 0 1 100 8 L104 10 Z" />
        </clipPath>
        <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#cbb589" />
          <stop offset="50%" stopColor="#a98c5d" />
          <stop offset="100%" stopColor="#cbb589" />
        </linearGradient>
      </defs>

      <path
        d="M104 6 L104 74 Q104 96 122 110 L172 152 Q180 160 180 174 L180 360 Q180 392 150 412 Q120 432 100 432 Q80 432 50 412 Q20 392 20 360 L20 174 Q20 160 28 152 L78 110 Q96 96 96 74 L96 6 A6 6 0 0 1 104 6 Z"
        fill="url(#glassGrad)"
      />

      <g clipPath="url(#bottleClip)">
        <rect x="20" y="250" width="160" height="210" fill="url(#juiceGrad)" />
        <rect x="20" y="250" width="160" height="6" fill="rgba(255,255,255,0.35)" />
      </g>

      <path
        d="M104 6 L104 74 Q104 96 122 110 L172 152 Q180 160 180 174 L180 360 Q180 392 150 412 Q120 432 100 432 Q80 432 50 412 Q20 392 20 360 L20 174 Q20 160 28 152 L78 110 Q96 96 96 74 L96 6"
        fill="none"
        stroke="rgba(201,168,120,0.5)"
        strokeWidth="1.5"
      />

      <path
        d="M46 300 L54 296 M46 340 L58 334 M150 300 L156 296 M138 380 L152 372"
        stroke="rgba(255,255,255,0.65)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <rect x="85" y="4" width="30" height="10" rx="2" fill="url(#capGrad)" />
      <rect x="85" y="14" width="30" height="5" fill="url(#glassGrad)" />

      <path
        d="M100 168 L100 242"
        stroke="rgba(201,168,120,0.55)"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="100" cy="202" r="22" fill="none" stroke="rgba(184,160,120,0.8)" strokeWidth="1.5" />
      <circle cx="100" cy="202" r="14" fill="none" stroke="rgba(184,160,120,0.5)" strokeWidth="1" />
    </svg>
  )
}