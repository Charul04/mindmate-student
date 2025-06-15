
import React from "react";

export default function BookStandingIllustration() {
  // theme-aware colors (feel free to adjust for even better match)
  const isDark =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Fallback color tokens for illustration
  const bookFill = isDark ? "#b07d4b" : "#c79349";
  const outline = isDark ? "#422B14" : "#6d4718";
  const armLegColor = isDark ? "#ad8355" : "#af7741";
  const faceShadow = isDark ? "#66492E" : "#a9732b";
  const pageFill = "#fff8e3";
  const speechBg = isDark ? "#c2a985" : "#f8ecda";
  const textColor = isDark ? "#222" : "#442d17";

  return (
    <div className="flex w-full items-end justify-center select-none">
      <svg
        viewBox="0 0 220 285"
        width={190}
        height={265}
        aria-hidden="true"
        className="animate-fade-in"
        style={{ maxWidth: "100%", height: "auto" }}
      >
        {/* Shadow */}
        <ellipse
          cx="110"
          cy="260"
          rx="45"
          ry="13"
          fill="#b08d5c"
          opacity="0.13"
        />
        {/* Speech bubble */}
        <g>
          <ellipse
            cx="65"
            cy="54"
            rx="58"
            ry="40"
            fill={speechBg}
            stroke={outline}
            strokeWidth="3"
          />
          <path
            d="M 65 94 Q 70 102, 90 105 Q 72 99, 82 112"
            fill="none"
            stroke={speechBg}
            strokeWidth="14"
          />
          <text
            x="41"
            y="65"
            fontFamily="'Fredoka One', 'Arial Rounded MT Bold', Arial, sans-serif"
            fontSize="38"
            fontWeight="bold"
            fill={textColor}
            style={{ letterSpacing: "2px" }}
          >
            HI!
          </text>
        </g>
        {/* Left arm (waving) */}
        <g>
          {/* Arm */}
          <path
            d="M42 103 Q14 70 42 50"
            stroke={armLegColor}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Palm */}
          <ellipse
            cx="32"
            cy="43"
            rx="11"
            ry="13"
            fill={bookFill}
            stroke={outline}
            strokeWidth="4"
          />
          {/* Fingers (spread) */}
          <path
            d="M26 28 Q30 36 32 43"
            stroke={armLegColor}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M36 26 Q34 36 32 43"
            stroke={armLegColor}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M41 32 Q36 37 32 43"
            stroke={armLegColor}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M44 38 Q37 40 32 43"
            stroke={armLegColor}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </g>
        {/* Right arm (on hip) */}
        <g>
          {/* Arm */}
          <path
            d="M176 110 Q210 135 165 162"
            stroke={armLegColor}
            strokeWidth="9"
            fill="none"
            strokeLinecap="round"
          />
          {/* Palm */}
          <ellipse
            cx="171"
            cy="172"
            rx="10"
            ry="13"
            fill={bookFill}
            stroke={outline}
            strokeWidth="4"
            transform="rotate(-17 171 172)"
          />
        </g>
        {/* Book body */}
        <g>
          {/* Main body */}
          <rect
            x="45"
            y="80"
            width="130"
            height="120"
            rx="20"
            fill={bookFill}
            stroke={outline}
            strokeWidth="8"
          />
          {/* Pages (top) */}
          <path
            d="M55 92 Q110 60 170 93"
            fill="none"
            stroke={pageFill}
            strokeWidth="13"
          />
          <path
            d="M55 100 Q110 75 170 100"
            fill="none"
            stroke={pageFill}
            strokeWidth="6"
          />
          {/* Book "spine" line */}
          <path
            d="M64 94 Q62 150 65 195"
            fill="none"
            stroke={outline}
            strokeWidth="5"
            opacity="0.2"
          />
        </g>
        {/* Legs */}
        <g>
          {/* Left leg */}
          <rect
            x="77"
            y="197"
            width="14"
            height="40"
            rx="7"
            fill={armLegColor}
            stroke={outline}
            strokeWidth="3"
          />
          {/* Right leg */}
          <rect
            x="130"
            y="205"
            width="15"
            height="34"
            rx="7"
            fill={armLegColor}
            stroke={outline}
            strokeWidth="3"
          />
        </g>
        {/* Feet */}
        <g>
          {/* Left foot */}
          <ellipse
            cx="84"
            cy="243"
            rx="16"
            ry="7"
            fill={armLegColor}
            stroke={outline}
            strokeWidth="3"
          />
          {/* Right foot */}
          <ellipse
            cx="137"
            cy="237"
            rx="15"
            ry="7"
            fill={armLegColor}
            stroke={outline}
            strokeWidth="3"
          />
        </g>
        {/* Face */}
        <g>
          {/* Eyes */}
          <ellipse
            cx="92"
            cy="145"
            rx="14"
            ry="14"
            fill="#fff"
            stroke={outline}
            strokeWidth="2"
          />
          <ellipse
            cx="130"
            cy="145"
            rx="14"
            ry="14"
            fill="#fff"
            stroke={outline}
            strokeWidth="2"
          />
          {/* Pupils */}
          <circle cx="95" cy="148" r="6" fill="#222" />
          <circle cx="133" cy="148" r="6" fill="#222" />
          {/* Brows */}
          <path
            d="M84 134 Q92 130 100 134"
            stroke={outline}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M122 134 Q130 131 138 134"
            stroke={outline}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Smile */}
          <path
            d="M104 158 Q111 169 122 158"
            stroke={outline}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          {/* Cheek shadow */}
          <ellipse
            cx="104"
            cy="153"
            rx="4"
            ry="2"
            fill={faceShadow}
            opacity="0.25"
          />
          <ellipse
            cx="120"
            cy="153"
            rx="4"
            ry="2"
            fill={faceShadow}
            opacity="0.25"
          />
        </g>
      </svg>
    </div>
  );
}

