import React from "react";

export default function NonprofitsHero() {
  return (
    <div
      className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center"
      style={{
        backgroundImage: "url('/for-nonprofits-hero.jpg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          For Nonprofits
        </h1>
        <p className="text-lg md:text-2xl font-light drop-shadow">
          Expand your reach and amplify your impact
        </p>
      </div>
    </div>
  );
} 