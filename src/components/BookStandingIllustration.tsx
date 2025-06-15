
import React from "react";

// Simple keyframes for bounce and glow animation
const style = `
@keyframes hero-bounce {
  0%, 100% { transform: translateY(0);}
  25% { transform: translateY(-16px);}
  50% { transform: translateY(0);}
}
@keyframes hero-glow {
  0%, 100% { filter: drop-shadow(0 0 30px #ffd700) drop-shadow(0 0 12px #38bdf8);}
  50% { filter: drop-shadow(0 0 65px #ff5af7) drop-shadow(0 0 30px #38bdf8);}
}
`;

export default function BookStandingIllustration() {
  return (
    <div className="flex w-full items-end justify-center select-none relative">
      <style>{style}</style>
      <img
        src="/lovable-uploads/0cbd4e41-525c-4065-b38f-2d99e102d63e.png"
        alt="Cheerful cartoon book says Hi!"
        style={{
          width: "260px",
          maxWidth: "100%",
          height: "auto",
          animation: "hero-bounce 2.2s cubic-bezier(.62,1.11,.5,1) infinite, hero-glow 3.2s ease-in-out infinite",
        }}
        className="animate-fade-in"
      />
    </div>
  );
}
