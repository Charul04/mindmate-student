
export default function HeroIllustration() {
  // Simple SVG illustration: student on pile of books, using a laptop with a spark/star for "AI".
  return (
    <svg viewBox="0 0 300 170" width={320} height={180} className="mx-auto mb-4 lg:mb-0" aria-hidden="true">
      <defs>
        <linearGradient id="hero-bg" x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="#a5b4fc" offset="0%" />
          <stop stopColor="#f0fdfa" offset="100%" />
        </linearGradient>
        <linearGradient id="book" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#818cf8" offset="0%" />
          <stop stopColor="#facc15" offset="100%" />
        </linearGradient>
      </defs>
      <rect width="300" height="170" rx="16" fill="url(#hero-bg)" opacity=".22"/>
      <ellipse cx="150" cy="142" rx="66" ry="9" fill="#89b4fa" opacity=".09" />
      {/* Books */}
      <rect x="95" y="130" width="110" height="14" rx="3" fill="url(#book)" />
      <rect x="110" y="120" width="80" height="12" rx="3" fill="#4256e6" />
      {/* Student */}
      <ellipse cx="150" cy="116" rx="16" ry="10" fill="#fef08a" />
      <circle cx="150" cy="110" r="7.5" fill="#bae6fd" />
      {/* Laptop */}
      <rect x="144" y="112" width="12" height="6" rx="2" fill="#e0e7ef" />
      {/* Spark/star */}
      <polygon points="170,105 174,110 178,105 176,111 181,114 175,114 174,120 172,114 166,114 171,111"
        fill="#facc15" opacity=".8"/>
    </svg>
  );
}
