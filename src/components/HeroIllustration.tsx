
import React from "react";

// Animation keyframes as inline styles for SVG
const bounceAnim = {
  animation: "bounce 2.2s cubic-bezier(.62,1.11,.5,1) infinite"
};
const sparkle1Anim = {
  animation: "sparkle1 2.6s ease-in-out infinite"
};
const sparkle2Anim = {
  animation: "sparkle2 2.6s ease-in-out infinite 1.2s"
};
const sparkle3Anim = {
  animation: "sparkle3 2.6s ease-in-out infinite 2s"
};
const style = `
@keyframes bounce {
  0%, 100% { transform: translateY(0);}
  15% { transform: translateY(-13px);}
  30% { transform: translateY(0);}
}
@keyframes sparkle1 {
  0%, 20%, 100% { opacity: 0;}
  10% { opacity: 1;}
}
@keyframes sparkle2 {
  0%, 60%, 100% { opacity: 0;}
  65% { opacity: 1;}
}
@keyframes sparkle3 {
  0%, 80%, 100% { opacity: 0;}
  85% { opacity: 1;}
}
`;

export default function HeroIllustration() {
  return (
    <div className="w-full flex items-center justify-center relative select-none">
      {/* Animation styles */}
      <style>{style}</style>
      <svg
        viewBox="0 0 280 180"
        width={240}
        height={150}
        aria-hidden="true"
        className="mx-auto mb-4 lg:mb-0"
      >
        {/* Background */}
        <rect x="24" y="54" width="232" height="104" rx="20" fill="#f0f6ff" opacity=".5"/>
        {/* Book shadow */}
        <ellipse cx="140" cy="148" rx="52" ry="12" fill="#a5b4fc" opacity=".18" />
        {/* Cute bouncing book */}
        <g style={bounceAnim}>
          {/* Book base */}
          <rect x="87" y="100" width="106" height="28" rx="8" fill="#facc15" />
          {/* Book pages */}
          <rect x="92" y="104" width="96" height="16" rx="5" fill="#fffdea" />
          {/* Book spine */}
          <rect x="125" y="100" width="30" height="28" rx="7" fill="#818cf8" opacity=".9"/>
          {/* Happy face */}
          <ellipse cx="140" cy="117" rx="7" ry="7" fill="#fff" />
          <ellipse cx="160" cy="117" rx="7" ry="7" fill="#fff" />
          {/* Eyes */}
          <circle cx="140" cy="117" r="2.2" fill="#444a64" />
          <circle cx="160" cy="117" r="2.2" fill="#444a64" />
          {/* Smile */}
          <path d="M143 124 q7 4 14 0" stroke="#444a64" strokeWidth="2" fill="none" />
        </g>
        {/* Animated sparkles */}
        <g>
          <g style={sparkle1Anim}>
            <polygon points="105,85 108,90 112,85 110,91 115,93 110,93 109,99 107,93 101,93 106,91" fill="#facc15" opacity="0.7"/>
          </g>
          <g style={sparkle2Anim}>
            <polygon points="180,80 184,84 188,80 186,86 190,88 185,88 184,93 182,88 177,88 183,86" fill="#bae6fd" opacity="0.7"/>
          </g>
          <g style={sparkle3Anim}>
            <polygon points="145,70 148,73 151,70 150,76 155,78 150,78 149,83 147,77 143,78 148,76" fill="#fed7aa" opacity="0.75"/>
          </g>
        </g>
      </svg>
    </div>
  );
}
