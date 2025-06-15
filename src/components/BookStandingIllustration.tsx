
import React from "react";

// Animation styles for bounce, *stronger* glow, scale, and rocking rotation
const style = `
@keyframes hero-bounce {
  0%, 100% { transform: translateY(0);}
  25% { transform: translateY(-14px);}
  50% { transform: translateY(0);}
}
@keyframes hero-glow {
  0%, 100% {
    filter:
      drop-shadow(0 0 50px #ffe066cc)
      drop-shadow(0 0 24px #60eaffcc)
      drop-shadow(0 0 10px #fffbe6aa);
  }
  50% {
    filter:
      drop-shadow(0 0 120px #ff278faa)
      drop-shadow(0 0 60px #38bdf8cc)
      drop-shadow(0 0 20px #fffbe6);
  }
}
@keyframes hero-scale {
  0%, 100% { transform: scale(1);}
  50% { transform: scale(1.09);}
}
@keyframes hero-rock {
  0%, 100% { transform: rotate(-4deg); }
  25% { transform: rotate(3deg);}
  50% { transform: rotate(-2deg);}
  75% { transform: rotate(4deg);}
}
`;

export default function BookStandingIllustration() {
  return (
    <div className="flex w-full items-end justify-center select-none relative">
      <style>{style}</style>
      {/* More intense radiant blue/purple glow in the background */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "53%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          width: "400px",
          height: "280px",
          background: "radial-gradient(circle at 60% 30%, #9ecbffcc 20%, #a5b4fccc 50%, #60a5fad5 82%, transparent 100%)",
          filter: "blur(30px)",
          opacity: 1,
        }}
      />
      {/* Subtle soft shadow under the book */}
      <div
        className="absolute"
        style={{
          left: "50%",
          bottom: "26px",
          transform: "translateX(-50%)",
          width: "120px",
          height: "38px",
          background: "radial-gradient(ellipse at center, #2228 55%, transparent 100%)",
          opacity: 0.34,
          zIndex: 1,
          filter: "blur(6px)",
        }}
      />
      {/* Book Image: bounce, *brighter glow*, scale, rock */}
      <img
        src="/lovable-uploads/0cbd4e41-525c-4065-b38f-2d99e102d63e.png"
        alt="Cheerful cartoon book"
        style={{
          width: "240px",
          maxWidth: "96vw",
          height: "auto",
          animation:
            "hero-bounce 1.7s cubic-bezier(.62,1.11,.5,1) infinite, hero-glow 2.7s ease-in-out infinite, hero-scale 2.2s ease-in-out infinite, hero-rock 3.6s cubic-bezier(.55,.32,.49,1.13) infinite",
          zIndex: 2,
          position: "relative",
        }}
        className="animate-fade-in"
      />
    </div>
  );
}
