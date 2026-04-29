
import React from "react";

export function BrisaNavbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Combined Grupo BRISA + Coompass Logo */}
        <img 
          src="/lovable-uploads/e65dbbd2-a111-4985-817d-18f8a1117e8b.png"
          alt="Grupo BRISA + Coompass"
          className="h-20"
        />
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            Via Verde
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            Brisa
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            Controlauto
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            Colibri
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            A-To-Be
          </a>
        </div>
      </div>
    </nav>
  );
}
