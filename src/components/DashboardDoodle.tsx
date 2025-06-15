
import React from "react";

/**
 * Decorative dashboard doodle for top section.
 */
export default function DashboardDoodle() {
  return (
    <div className="flex justify-center pt-1 pb-6">
      {/* Simple SVG squiggle/cloud doodle */}
      <svg width="104" height="40" viewBox="0 0 104 40" fill="none" className="animate-fade-in" aria-hidden>
        <path
          d="M3 29Q24 11 51 24t48-6"
          stroke="#818CF8"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="8 4"
        />
        <ellipse cx="19" cy="18" rx="5" ry="3" fill="#A5B4FC" opacity=".15" />
        <ellipse cx="63" cy="14" rx="6" ry="4" fill="#7DD3FC" opacity=".11" />
        <ellipse cx="90" cy="25" rx="4" ry="2" fill="#6EE7B7" opacity=".12" />
      </svg>
    </div>
  );
}
