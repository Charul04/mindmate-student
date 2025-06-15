
import React from "react";

// Animation styles for bounce, intensified glow, scale, rocking rotation, and animated aurora
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
      drop-shadow(0 0 128px #ffe066)
      drop-shadow(0 0 200px #fff38f)
      drop-shadow(0 0 62px #ffb8ec)
      drop-shadow(0 0 0px #00dcff00);
  }
  30% {
    filter:
      drop-shadow(0 0 0px #fffbe6)
      drop-shadow(0 0 210px #ffe066ee)
      drop-shadow(0 0 260px #ffe48f99)
      drop-shadow(0 0 90px #99faff99)
      drop-shadow(0 0 0px #00fffc00);
  }
  50% {
    filter:
      drop-shadow(0 0 0px #fffbe6)
      drop-shadow(0 0 270px #fffcd4ff)
      drop-shadow(0 0 380px #fdffb2dd)
      drop-shadow(0 0 80px #ffd5e1cc)
      drop-shadow(0 0 58px #99faff88);
  }
  70% {
    filter:
      drop-shadow(0 0 0px #fffbe6)
      drop-shadow(0 0 160px #ffe066c0)
      drop-shadow(0 0 180px #ffeacb99)
      drop-shadow(0 0 40px #fdc5ff88)
      drop-shadow(0 0 0px #99faff00);
  }
}

@keyframes hero-scale {
  0%, 100% { transform: scale(1);}
  50% { transform: scale(1.11);}
}
@keyframes hero-rock {
  0%, 100% { transform: rotate(-4deg); }
  25% { transform: rotate(4deg);}
  50% { transform: rotate(-3deg);}
  75% { transform: rotate(4deg);}
}
@keyframes aurora-move {
  0% {
    background-position: 0% 50%;
    opacity: 0.72;
  }
  33% {
    background-position: 100% 50%;
    opacity: 0.91;
  }
  66% {
    background-position: 50% 0%;
    opacity: 1;
  }
  100% {
    background-position: 0% 50%;
    opacity: 0.72;
  }
}
`;

export default function BookStandingIllustration() {
  return (
    <div className="flex w-full items-end justify-center select-none relative">
      <style>{style}</style>
      {/* Vibrant animated "aurora" halo effect */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "54%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          width: "340px",
          height: "220px",
          borderRadius: "50%",
          opacity: 0.83,
          background:
            "radial-gradient(ellipse 58% 36% at 50% 32%, #ffe066bb 15%, #fdc5ff99 46%, #99faff 74%, transparent 100%)",
          boxShadow: "0 0 90px 35px #fffef37d, 0 0 32px 10px #fffbe696",
          animation: "aurora-move 8.8s linear infinite alternate",
          filter: "blur(4px) brightness(1.23)",
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
          background:
            "radial-gradient(ellipse at center, #2228 50%, transparent 100%)",
          opacity: 0.28,
          zIndex: 1,
          filter: "blur(8px)",
        }}
      />
      {/* Book Image: vibrant animated glow effect */}
      <img
        src="/lovable-uploads/0cbd4e41-525c-4065-b38f-2d99e102d63e.png"
        alt="Cheerful cartoon book"
        style={{
          width: "240px",
          maxWidth: "96vw",
          height: "auto",
          animation:
            "hero-bounce 1.5s cubic-bezier(.62,1.11,.5,1) infinite, hero-glow 2s ease-in-out infinite, hero-scale 2.4s ease-in-out infinite, hero-rock 3.9s cubic-bezier(.55,.32,.49,1.13) infinite",
          zIndex: 2,
          position: "relative",
        }}
        className="animate-fade-in"
      />
    </div>
  );
}
