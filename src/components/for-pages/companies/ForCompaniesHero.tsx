import React from "react";

export default function ForCompaniesHero() {
  return (
    <div
      className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center"
      style={{
        backgroundImage: "url('/for-companies-hero.jpg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          For Companies
        </h1>
        <p className="text-lg md:text-2xl font-light drop-shadow">
          Enhance your ESG strategy and employee engagement
        </p>
      </div>
    </div>
  );
} 