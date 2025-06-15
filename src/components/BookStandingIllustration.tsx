
import React from "react";

// CSS keyframes for bounce+glow (existing), hand wave and eye blink
const style = `
@keyframes hero-bounce {
  0%, 100% { transform: translateY(0);}
  25% { transform: translateY(-16px);}
  50% { transform: translateY(0);}
}
@keyframes hero-glow {
  0%, 100% { filter: drop-shadow(0 0 30px #ffd700) drop-shadow(0 0 12px #38bdf8);}
  50% { filter: drop-shadow(0 0 65px #ff5af7) drop-shadow(0 0 30px #38bdf8);}
}
@keyframes hand-wave {
  0%, 100% { transform: rotate(-10deg) translateY(-8px); }
  20% { transform: rotate(8deg) translateY(-8px);}
  40% { transform: rotate(-15deg) translateY(-8px);}
  60% { transform: rotate(9deg) translateY(-8px);}
  80% { transform: rotate(-8deg) translateY(-8px);}
}
@keyframes eye-blink {
  0%, 8%, 10%, 100% { transform: scaleY(1);}
  9% { transform: scaleY(0.15);}
}
`;

export default function BookStandingIllustration() {
  return (
    <div className="flex w-full items-end justify-center select-none relative">
      <style>{style}</style>
      <svg
        width="260"
        height="285"
        viewBox="0 0 260 285"
        fill="none"
        style={{
          animation:
            "hero-bounce 2.2s cubic-bezier(.62,1.11,.5,1) infinite, hero-glow 3.2s ease-in-out infinite",
        }}
        className="animate-fade-in"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow */}
        <ellipse
          cx="130"
          cy="272"
          rx="78"
          ry="12"
          fill="#000"
          fillOpacity="0.13"
        />
        {/* Book Body */}
        <rect
          x="45"
          y="36"
          width="170"
          height="205"
          rx="28"
          fill="#fff"
          stroke="#334155"
          strokeWidth="5"
        />
        {/* Book Cover - left side */}
        <rect
          x="36"
          y="46"
          width="30"
          height="200"
          rx="13"
          fill="#38bdf8"
          stroke="#334155"
          strokeWidth="3"
        />
        {/* Book Cover - right side */}
        <rect
          x="194"
          y="46"
          width="30"
          height="200"
          rx="13"
          fill="#38bdf8"
          stroke="#334155"
          strokeWidth="3"
        />
        {/* Left hand (static) */}
        <g>
          <ellipse
            cx="34"
            cy="72"
            rx="12"
            ry="22"
            fill="#fde68a"
            stroke="#334155"
            strokeWidth="3"
            transform="rotate(-24 34 72)"
          />
          {/* Fingers detail */}
          <ellipse
            cx="33"
            cy="62"
            rx="3"
            ry="6"
            fill="#fffceb"
            opacity="0.7"
            transform="rotate(-18 33 62)"
          />
        </g>
        {/* Right hand (waving) */}
        <g
          style={{
            transformOrigin: "226px 72px",
            animation: "hand-wave 1.6s cubic-bezier(.4,.8,.57,1.25) infinite",
          }}
        >
          <ellipse
            cx="226"
            cy="72"
            rx="12"
            ry="22"
            fill="#fde68a"
            stroke="#334155"
            strokeWidth="3"
            transform="rotate(24 226 72)"
          />
          {/* Fingers detail */}
          <ellipse
            cx="228"
            cy="60"
            rx="3"
            ry="6"
            fill="#fffceb"
            opacity="0.7"
            transform="rotate(13 228 60)"
          />
        </g>
        {/* Book Pages lines */}
        <line
          x1="61"
          y1="70"
          x2="199"
          y2="70"
          stroke="#e0e7ef"
          strokeWidth="2"
          strokeDasharray="6 8"
        />
        <line
          x1="61"
          y1="99"
          x2="199"
          y2="99"
          stroke="#f3f5fa"
          strokeWidth="1.8"
          strokeDasharray="4 10"
        />
        {/* Face group */}
        <g>
          {/* Eyes */}
          <g>
            {/* Left eye white */}
            <ellipse
              cx="101"
              cy="110"
              rx="17"
              ry="18"
              fill="#fff"
              stroke="#333c55"
              strokeWidth="2"
            />
            {/* Right eye white */}
            <ellipse
              cx="159"
              cy="110"
              rx="17"
              ry="18"
              fill="#fff"
              stroke="#333c55"
              strokeWidth="2"
            />
            {/* Left iris */}
            <ellipse cx="101" cy="117" rx="7" ry="8" fill="#2986cc" />
            {/* Right iris */}
            <ellipse cx="159" cy="117" rx="7" ry="8" fill="#2986cc" />
            {/* Left pupil */}
            <ellipse cx="102.5" cy="119.5" rx="2.5" ry="3.5" fill="#232b38" />
            {/* Right pupil */}
            <ellipse cx="160.5" cy="120.5" rx="2.5" ry="3.5" fill="#232b38" />

            {/* Left eyelid for blink */}
            <ellipse
              cx="101"
              cy="110"
              rx="17"
              ry="18"
              fill="#fff"
              style={{
                transformOrigin: "101px 110px",
                animation: "eye-blink 4.5s ease-in-out infinite",
                opacity: 0.33,
              }}
            />
            {/* Right eyelid for blink */}
            <ellipse
              cx="159"
              cy="110"
              rx="17"
              ry="18"
              fill="#fff"
              style={{
                transformOrigin: "159px 110px",
                animation: "eye-blink 4.35s 0.2s ease-in-out infinite",
                opacity: 0.33,
              }}
            />
          </g>
          {/* Happy eyebrows */}
          <path
            d="M87 91 Q101 86 115 91"
            stroke="#283250"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M145 91 Q159 86 173 94"
            stroke="#283250"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Cute smile */}
          <path
            d="M110 135 Q130 155 149 135"
            stroke="#d97706"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Blush marks */}
          <ellipse
            cx="83"
            cy="125"
            rx="5"
            ry="2"
            fill="#fbbf24"
            opacity="0.34"
          />
          <ellipse
            cx="177"
            cy="125"
            rx="5"
            ry="2"
            fill="#fbbf24"
            opacity="0.34"
          />
        </g>
        {/* "Hi!" Speech Bubble */}
        <g>
          <ellipse
            cx="210"
            cy="30"
            rx="39"
            ry="17"
            fill="#fffbea"
            stroke="#fbbf24"
            strokeWidth="2"
            filter="url(#bubbleshadow)"
          />
          <polygon
            points="193,35 195,54 213,39"
            fill="#fffbea"
            stroke="#fbbf24"
            strokeWidth="1"
          />
          <text
            x="195"
            y="36"
            textAnchor="middle"
            fontFamily="Comic Sans MS, Arial, sans-serif"
            fontWeight="bold"
            fontSize="21"
            fill="#fbbf24"
            stroke="#ae7e14"
            strokeWidth="0.4"
            style={{
              letterSpacing: "2px",
              userSelect: "none"
            }}
          >
            HI!
          </text>
        </g>
        {/* SVG Filter for bubble shadow */}
        <defs>
          <filter id="bubbleshadow" x="0" y="0" width="1.9" height="2">
            <feDropShadow dx="0" dy="2" stdDeviation="1.4" floodColor="#fde68a" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
