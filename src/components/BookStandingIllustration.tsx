
import React from "react";

// We'll use Tailwind's theme variables for background/fill adaptation.
export default function BookStandingIllustration() {
  // Pick SVG book colors that work for both light and dark themes
  // (blues, yellows, indigo, white). Use a waving hand.
  return (
    <div className="flex w-full items-end justify-center select-none">
      <svg
        viewBox="0 0 110 180"
        width={170}
        height={240}
        aria-hidden="true"
        className="animate-fade-in"
      >
        {/* Shadow */}
        <ellipse cx="55" cy="170" rx="34" ry="10" fill="#a5b4fc" opacity="0.15" />
        {/* Legs */}
        <rect x="35" y="145" width="7" height="24" rx="3" fill="#818cf8" />
        <rect x="68" y="145" width="7" height="24" rx="3" fill="#818cf8" />
        {/* Feet */}
        <ellipse cx="39" cy="171" rx="7" ry="4" fill="#fed7aa" />
        <ellipse cx="72" cy="171" rx="7" ry="4" fill="#fed7aa" />
        {/* Book (standing) */}
        <rect x="18" y="36" width="75" height="113" rx="15" fill="#facc15" stroke="#ffe066" strokeWidth="3"/>
        {/* Book "pages" */}
        <rect x="24" y="43" width="62" height="96" rx="10" fill="#fffbea" />
        {/* Spine highlight */}
        <rect x="23" y="50" width="8" height="80" rx="3" fill="#818cf8" opacity="0.8" />
        {/* Face */}
        <ellipse cx="43" cy="90" rx="8" ry="8" fill="#fff" />
        <ellipse cx="77" cy="90" rx="8" ry="8" fill="#fff" />
        {/* Eyes */}
        <circle cx="43" cy="90" r="2.3" fill="#444a64" />
        <circle cx="77" cy="90" r="2.3" fill="#444a64" />
        {/* Smile */}
        <path d="M48 101 Q60 110 72 101" stroke="#444a64" strokeWidth="2" fill="none" />
        {/* Right hand - waving */}
        <g style={{ transformOrigin: "104px 75px" }}>
          <g className="animate-[waveBookHand_1s_ease-in-out_infinite]">
            {/* "Arm" */}
            <rect x="87" y="77" width="18" height="6" rx="3" fill="#facc15" transform="rotate(17 97 80)" />
            {/* Palm */}
            <ellipse cx="106" cy="80" rx="5.3" ry="6" fill="#fffbe7" stroke="#fed7aa" strokeWidth="1"/>
            {/* Fingers */}
            <rect x="109.5" y="74" width="2" height="7" rx="1" fill="#fed7aa" />
            <rect x="106.8" y="72.8" width="2" height="7" rx="1" fill="#fed7aa" />
            <rect x="104" y="72.5" width="2" height="7" rx="1" fill="#fed7aa" />
          </g>
        </g>
        {/* Left hand - to the side */}
        <g>
          {/* "Arm" */}
          <rect x="1" y="113" width="18" height="6" rx="3" fill="#facc15" transform="rotate(-24 10 116)" />
          {/* Palm */}
          <ellipse cx="3" cy="117" rx="5.3" ry="6" fill="#fffbe7" stroke="#fed7aa" strokeWidth="1"/>
        </g>
        {/* Keyframes for hand wave */}
        <style>
          {`
            @keyframes waveBookHand {
              0%, 60%, 100% { transform: rotate(0deg);}
              20% { transform: rotate(14deg);}
              40% { transform: rotate(-22deg);}
              55% { transform: rotate(5deg);}
              70% { transform: rotate(-11deg);}
            }
            .animate-\\[waveBookHand_1s_ease-in-out_infinite\\] {
              animation: waveBookHand 1s ease-in-out infinite;
            }
          `}
        </style>
      </svg>
    </div>
  );
}
