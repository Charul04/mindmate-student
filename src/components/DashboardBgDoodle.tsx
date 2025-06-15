
import React from "react";

/**
 * Subtle decorative animated dashboard background SVG for depth and vibrancy
 */
export default function DashboardBgDoodle() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none flex justify-center items-center animate-fade-in-slow">
      <svg width="1100" height="560" className="hidden md:block" style={{ top: '-10%', left: '-5%' }} viewBox="0 0 1100 560" fill="none" aria-hidden>
        <ellipse
          cx="250"
          cy="320"
          rx="230"
          ry="110"
          fill="url(#bg1)"
          opacity="0.24"
        />
        <ellipse
          cx="900"
          cy="140"
          rx="150"
          ry="90"
          fill="url(#bg2)"
          opacity="0.19"
        />
        <ellipse
          cx="750"
          cy="500"
          rx="180"
          ry="60"
          fill="url(#bg3)"
          opacity="0.22"
        />
        <defs>
          <radialGradient id="bg1" cx="0" cy="0" r="1" gradientTransform="rotate(20) scale(230 130)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a5b4fc" />
            <stop offset="1" stopColor="#6366f1" />
          </radialGradient>
          <radialGradient id="bg2" cx="0" cy="0" r="1" gradientTransform="rotate(17) scale(170 80)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6ee7b7" />
            <stop offset="1" stopColor="#22d3ee" />
          </radialGradient>
          <radialGradient id="bg3" cx="0" cy="0" r="1" gradientTransform="rotate(10) scale(220 80)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fbbf24" />
            <stop offset="1" stopColor="#818cf8" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

