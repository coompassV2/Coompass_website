import React from "react";

export function LeroyMerlinHeroImage() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative">
      <div 
        className="w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/lm-hero-image.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
}
