export const LogoIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 512 512"
    className="animate-float"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#glow)">
      <path 
        d="M100 70 h312 a30 30 0 0 1 30 30 v312 a30 30 0 0 1 -30 30 h-312 a30 30 0 0 1 -30 -30 v-312 a30 30 0 0 1 30 -30z"
        fill="#14b8a6"
      />
      <path 
        d="M260 240 l-60 -60 m0 120 l120 -120"
        stroke="#f8fafc"
        strokeWidth="40"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
  </svg>
);

export const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-green-600">
    <path d="M17.6 6.64a8.2 8.2 0 0 0-14.26 8.18L2 22l7.5-1.26a8.2 8.2 0 0 0 8.02-2.06 8.23 8.23 0 0 0 .09-12.05Z" />
    <path d="M14.5 14.5c-1.21.51-2.1.46-3.1-.22l-1.93-1.76c-.94-.87-1.05-2.31-.25-3.35l.94-1.32c.37-.52.37-1.2 0-1.72l-2.13-2.86" />
  </svg>
);

export const EnhanceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.337 1.342L3 12l5.763 1.858a2 2 0 0 1 1.342 1.34L12 21l1.895-5.803a2 2 0 0 1 1.34-1.339L21 12l-5.763-1.858a2 2 0 0 1-1.342-1.34L12 3Z" />
  </svg>
);

export const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);