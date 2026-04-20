import React from "react";

export function LeroyMerlinNavbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Combined Leroy Merlin + Coompass Logo */}
        <img 
          src="/logos/leroymerlin-coompass.png"
          alt="Leroy Merlin + Coompass"
          className="h-12"
        />
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
            Leroy Merlin
          </a>
        </div>
      </div>
    </nav>
  );
}
