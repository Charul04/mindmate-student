
import React from "react";

// Animation keyframes as inline styles for SVG
const bounceAnim = {
  animation: "bounce 2.2s cubic-bezier(.62,1.11,.5,1) infinite"
};
const handWaveAnim = {
  animation: "wave 1s ease-in-out infinite"
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
const bubbleAnim = {
  animation: "bubble-pop 0.5s cubic-bezier(.7,-0.3,.4,1.7) 0.6s both"
};

const style = `
@keyframes bounce {
  0%, 100% { transform: translateY(0);}
  15% { transform: translateY(-13px);}
  30% { transform: translateY(0);}
}
@keyframes wave {
  0%, 60%, 100% { transform: rotate(0deg);}
  20% { transform: rotate(-10deg);}
  40% { transform: rotate(18deg);}
  50% { transform: rotate(-6deg);}
  70% { transform: rotate(12deg);}
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
@keyframes bubble-pop {
  0% { opacity: 0; transform: scale(0.3) translateY(-16px);}
  80% { opacity: 1; transform: scale(1.1) translateY(-18px);}
  100% { opacity: 1; transform: scale(1) translateY(-18px);}
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

        {/* Speech bubble saying "hii!" */}
        <g style={bubbleAnim}>
          <g>
            <ellipse cx="186" cy="86" rx="26" ry="15" fill="#fffde4" stroke="#ffe38c" strokeWidth="2" />
            <polygon points="172,103 183,99 180,107" fill="#fffde4" stroke="#ffe38c" strokeWidth="1" />
            <text
              x="185"
              y="91"
              textAnchor="middle"
              fontWeight="bold"
              fontSize="1.35rem"
              fontFamily="Comic Sans MS, Comic Sans, Chalkboard, Arial"
              fill="#ffc700"
              style={{userSelect: "none"}}
            >hii!</text>
          </g>
        </g>

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

          {/* Waving hand! */}
          <g style={{
            ...handWaveAnim,
            transformOrigin: "172px 111px", // pivot at wrist
          }}>
            {/* Cartoon hand: palm (circle) + 4 fingers (rounded rects) */}
            <ellipse cx="177" cy="111" rx="5" ry="7" fill="#fffbe7" stroke="#fed7aa" strokeWidth="2"/>
            {/* four fingers */}
            <rect x="176" y="101" width="3" height="8" rx="1.3" fill="#fed7aa" stroke="#facc15" strokeWidth="0.6"/>
            <rect x="173" y="103" width="2.2" height="7" rx="1.1" fill="#fed7aa" stroke="#facc15" strokeWidth="0.6"/>
            <rect x="170.7" y="105" width="2" height="7" rx="1" fill="#fed7aa" stroke="#facc15" strokeWidth="0.6"/>
            <rect x="179.1" y="104" width="2" height="7" rx="1" fill="#fed7aa" stroke="#facc15" strokeWidth="0.6"/>
            {/* thumb */}
            <rect x="182" y="112" width="2.6" height="6.3" rx="1.1" fill="#fed7aa" stroke="#facc15" strokeWidth="0.5" transform="rotate(34 183 115)" />
          </g>
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
