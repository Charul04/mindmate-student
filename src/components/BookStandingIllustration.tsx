
import React from "react";

// Animation styles for bounce and glow
const style = `
@keyframes hero-bounce {
  0%, 100% { transform: translateY(0);}
  25% { transform: translateY(-14px);}
  50% { transform: translateY(0);}
}
@keyframes hero-glow {
  0%, 100% { filter: drop-shadow(0 0 28px #ffd70070) drop-shadow(0 0 10px #38bdf880);}
  50% { filter: drop-shadow(0 0 60px #ff5af770) drop-shadow(0 0 30px #38bdf880);}
}
`;

export default function BookStandingIllustration() {
  return (
    <div className="flex w-full items-end justify-center select-none relative">
      <style>{style}</style>
      {/* Main Book Image with bounce and glowing filter */}
      <img
        src="/lovable-uploads/0cbd4e41-525c-4065-b38f-2d99e102d63e.png"
        alt="Cheerful cartoon book"
        style={{
          width: "220px",
          maxWidth: "92vw",
          height: "auto",
          animation:
            "hero-bounce 2.1s cubic-bezier(.62,1.11,.5,1) infinite, hero-glow 3.3s ease-in-out infinite",
          zIndex: 1,
          position: "relative",
        }}
        className="animate-fade-in"
      />
    </div>
  );
}

