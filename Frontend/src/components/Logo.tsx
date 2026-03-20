export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient for modern look */}
        <linearGradient id="bloodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#b30616', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#930511', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Shadow filter for depth */}
        <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Background - cream color for modern contrast */}
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        rx="16"
        fill="#FBF2E1"
      />
      
      {/* Blood drop shape with gradient and shadow */}
      <path
        d="M 50 22 C 50 22, 33 42, 33 57 C 33 69, 41 78, 50 78 C 59 78, 67 69, 67 57 C 67 42, 50 22, 50 22 Z"
        fill="url(#bloodGradient)"
        filter="url(#dropShadow)"
      />
      
      {/* Subtle shine highlight for 3D effect */}
      <ellipse
        cx="43"
        cy="40"
        rx="5"
        ry="8"
        fill="white"
        opacity="0.2"
      />
      
      {/* Plus symbol - white and crisp */}
      <g filter="url(#dropShadow)">
        {/* Vertical line of + */}
        <rect x="46.5" y="42" width="7" height="28" fill="white" rx="3.5" />
        {/* Horizontal line of + */}
        <rect x="36" y="52.5" width="28" height="7" fill="white" rx="3.5" />
      </g>
      
      {/* Subtle inner glow on plus for modern touch */}
      <g opacity="0.4">
        <rect x="47" y="42.5" width="6" height="27" fill="white" rx="3" />
        <rect x="36.5" y="53" width="27" height="6" fill="white" rx="3" />
      </g>
    </svg>
  );
}
