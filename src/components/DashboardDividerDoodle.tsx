
import React from "react";

/**
 * Playful squiggle or line under the "Your MindMate+ Dashboard" heading
 */
export default function DashboardDividerDoodle() {
  return (
    <div className="flex justify-center w-full -mt-3 mb-8 animate-fade-in">
      <svg width="168" height="18" viewBox="0 0 168 18" fill="none">
        <path
          d="M6 12Q47 0 65 10t42-3q13 5 31-4 19-10 21 2"
          stroke="#6366f1"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="12 7"
          opacity="0.23"
        />
        <ellipse cx="39" cy="14" rx="7" ry="3" fill="#38bdf8" opacity=".14" />
        <ellipse cx="126" cy="7" rx="4" ry="2" fill="#a5b4fc" opacity=".13" />
      </svg>
    </div>
  );
}
