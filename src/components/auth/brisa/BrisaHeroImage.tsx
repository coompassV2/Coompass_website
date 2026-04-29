
import React from "react";

export function BrisaHeroImage() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative">
      <div 
        className="w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/lovable-uploads/8c7a6a49-9512-4922-bddc-a347a3b204e8.png')"
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
}
