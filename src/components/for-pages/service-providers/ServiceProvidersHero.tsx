import React from "react";

export default function ServiceProvidersHero() {
  return (
    <div
      className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center"
      style={{
        backgroundImage: "url('/for-service-providers-hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          For Service Providers
        </h1>
        <p className="text-lg md:text-2xl font-light drop-shadow">
          Grow your impact-focused business
        </p>
      </div>
    </div>
  );
} 