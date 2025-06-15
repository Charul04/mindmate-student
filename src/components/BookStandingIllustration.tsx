
import React from "react";

// Animation styles for bounce, glow, scale, and rocking rotation
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
@keyframes hero-scale {
  0%, 100% { transform: scale(1);}
  50% { transform: scale(1.06);}
}
@keyframes hero-rock {
  0%, 100% { transform: rotate(-3deg); }
  25% { transform: rotate(2deg);}
  50% { transform: rotate(-2deg);}
  75% { transform: rotate(3deg);}
}
`;

export default function BookStandingIllustration() {
  return (
    <div className="flex w-full items-end justify-center select-none relative">
      <style>{style}</style>
      {/* Soft radial blue/purple glow in the background */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "52%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          width: "320px",
          height: "230px",
          background: "radial-gradient(circle at 60% 35%, #a5b4fc88 30%, #60a5fa44 70%, transparent 95%)",
          filter: "blur(10px)",
          opacity: 0.8,
        }}
      />
      {/* Main Book Image with bounce, glowing filter, scale, and rock */}
      <img
        src="/lovable-uploads/0cbd4e41-525c-4065-b38f-2d99e102d63e.png"
        alt="Cheerful cartoon book"
        style={{
          width: "220px",
          maxWidth: "92vw",
          height: "auto",
          animation:
            "hero-bounce 2.1s cubic-bezier(.62,1.11,.5,1) infinite, hero-glow 3.3s ease-in-out infinite, hero-scale 2.7s ease-in-out infinite, hero-rock 4.2s cubic-bezier(.55,.32,.49,1.13) infinite",
          zIndex: 1,
          position: "relative",
        }}
        className="animate-fade-in"
      />
    </div>
  );
}

