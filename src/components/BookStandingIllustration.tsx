
import React from "react";

// Animation styles for bounce, *extra-strong* glow, scale, and rocking rotation
const style = `
@keyframes hero-bounce {
  0%, 100% { transform: translateY(0);}
  25% { transform: translateY(-14px);}
  50% { transform: translateY(0);}
}
@keyframes hero-glow {
  0%, 100% {
    filter:
      drop-shadow(0 0 0px #fffbe6)
      drop-shadow(0 0 64px #ffe066)
      drop-shadow(0 0 92px #fff9cf)
      drop-shadow(0 0 0px #ff278f00);
  }
  30% {
    filter:
      drop-shadow(0 0 0px #fffbe6)
      drop-shadow(0 0 96px #ffe066bb)
      drop-shadow(0 0 180px #fffbe670)
      drop-shadow(0 0 0px #ff278f00);
  }
  50% {
    filter:
      drop-shadow(0 0 0px #fffbe6)
      drop-shadow(0 0 140px #ffe066cc)
      drop-shadow(0 0 220px #fffde899)
      drop-shadow(0 0 32px #ffb4ec88);
  }
  70% {
    filter:
      drop-shadow(0 0 0px #fffbe6)
      drop-shadow(0 0 110px #ffe066b0)
      drop-shadow(0 0 150px #fffde699)
      drop-shadow(0 0 0px #ff278f00);
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
      {/* No colored background glow */}
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
      {/* Book Image: extra intense animated glow effect */}
      <img
        src="/lovable-uploads/7904b90e-4387-4607-94d4-323992ccaaeb.png"
        alt="Cheerful cartoon book saying Hi!"
        style={{
          width: "240px",
          maxWidth: "96vw",
          height: "auto",
          animation:
            "hero-bounce 1.7s cubic-bezier(.62,1.11,.5,1) infinite, hero-glow 2.2s ease-in-out infinite, hero-scale 2.2s ease-in-out infinite, hero-rock 3.6s cubic-bezier(.55,.32,.49,1.13) infinite",
          zIndex: 2,
          position: "relative",
        }}
        className="animate-fade-in"
      />
    </div>
  );
}

