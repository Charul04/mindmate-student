
import React from "react";

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
@keyframes book-wave {
  0%, 100% { transform: rotate(-12deg);}
  15% { transform: rotate(-6deg);}
  30% { transform: rotate(18deg);}
  45% { transform: rotate(-6deg);}
  60% { transform: rotate(16deg);}
  80% { transform: rotate(-12deg);}
}
`;

export default function BookStandingIllustration() {
  // Image dimensions for positioning hand (estimate; if you have actual hand PNG, we can use that)
  return (
    <div className="flex w-full items-end justify-center select-none relative">
      <style>{style}</style>
      {/* Main Book Image */}
      <img
        src="/lovable-uploads/0cbd4e41-525c-4065-b38f-2d99e102d63e.png"
        alt="Cheerful cartoon book says Hi!"
        style={{
          width: "260px",
          maxWidth: "100%",
          height: "auto",
          animation:
            "hero-bounce 2.2s cubic-bezier(.62,1.11,.5,1) infinite, hero-glow 3.2s ease-in-out infinite",
        }}
        className="animate-fade-in"
      />
      {/* Waving Hand - right top corner, looks like it's part of the book */}
      {/* Replace this rectangle with a hand PNG for improved realism */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          right: "45px",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background:
            "linear-gradient(120deg, #fbbf24 75%, #f59e42 100%)",
          border: "3px solid #ffeca0",
          boxShadow: "0 6px 18px 6px rgba(251,191,36,.15)",
          zIndex: 2,
          transformOrigin: "60% 95%",
          animation: "book-wave 1.6s cubic-bezier(.72,1.1,.53,1.18) infinite",
          opacity: 0.86,
        }}
        aria-label="Waving hand"
      ></div>
    </div>
  );
}

