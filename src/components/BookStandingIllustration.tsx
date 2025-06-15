
import React from "react";

// Animation styles for bounce, glow, and pop
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
@keyframes bubble-appear {
  0% { opacity: 0; transform: scale(0.4) translateY(-10px);}
  60% { opacity: 1; transform: scale(1.1) translateY(-24px);}
  100% { opacity: 1; transform: scale(1) translateY(-24px);}
}
`;

export default function BookStandingIllustration() {
  return (
    <div className="flex w-full items-end justify-center select-none relative">
      <style>{style}</style>
      {/* Soft radial blue/purple glow background for the app feel */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "52%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          width: "320px",
          height: "230px",
          // Soft blue-violet radial gradient for a modern playful glow
          background: "radial-gradient(circle at 60% 35%, #a5b4fc88 30%, #60a5fa44 70%, transparent 95%)",
          filter: "blur(10px)",
          opacity: 0.8,
        }}
      />
      {/* Speech bubble "Hi!!" */}
      <div
        className="absolute select-none"
        style={{
          zIndex: 2,
          left: "56%",
          bottom: "88%",
          transform: "translateX(-50%)",
          animation: "bubble-appear 0.65s cubic-bezier(.62,1.11,.5,1) 0.2s both",
        }}
      >
        <div className="rounded-full px-6 py-2 bg-yellow-200/90 border-2 border-yellow-300 drop-shadow text-sky-900 text-xl font-black font-sans shadow" style={{
          fontFamily: "'Comic Sans MS', Comic Sans, Arial, Chalkboard, sans-serif",
          letterSpacing: "0.02em",
          boxShadow: "0 2px 22px 0 #fbbf24a0, 0 1px 4px #0ea5e91a"
        }}>
          Hi!!
        </div>
      </div>
      {/* Main Book Image with bounce and glowing filter */}
      <img
        src="/lovable-uploads/0cbd4e41-525c-4065-b38f-2d99e102d63e.png"
        alt="Cheerful cartoon book says Hi!"
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
