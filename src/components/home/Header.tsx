import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  variant?: "dark" | "light";
}

export function Header({ variant = "dark" }: HeaderProps) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  // Conditional styles
  const isLight = variant === "light";
  const headerBg = isLight
    ? isScrolled
      ? "bg-white/80 backdrop-blur-md"
      : ""
    : isScrolled
      ? "bg-black/20 backdrop-blur-md"
      : "";
  const navLink = isLight
    ? "text-gray-900 hover:text-green-600 transition-colors duration-300"
    : "text-white/80 hover:text-white transition-colors duration-300";
  const ctaBtn = isLight
    ? "text-gray-900/80 hover:text-gray-900 hover:bg-gray-900/10 transition-colors px-6 py-2 font-light tracking-wide rounded-md"
    : "text-white/80 hover:text-white hover:bg-white/10 transition-colors px-6 py-2 font-light tracking-wide rounded-md";

  return (
    <header className={`fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-8 lg:p-12 transition-all duration-300 ${headerBg}`}>
      {/* Left: Logo */}
      <div className="flex items-center">
        <img 
          src={isLight
            ? "https://coompass.lovable.app/lovable-uploads/ed0df35e-439d-4191-8e03-881490d2a245.png"
            : "/lovable-uploads/4be2e00f-693c-4dd3-be7d-8a3ddce5c065.png"
          }
          alt="Coompass Logo" 
          className="h-8 cursor-pointer font-light tracking-wide"
          onClick={() => handleNavigation('/')}
        />
      </div>
      
      {/* Center: Navigation Links */}
      <nav className="flex items-center gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger className={`flex items-center gap-1 ${navLink}`}>
            Product
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white/95">
            <DropdownMenuItem className="hover:bg-green-100 hover:text-green-700" onClick={() => handleNavigation('/for-companies')}>For companies</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-green-100 hover:text-green-700" onClick={() => handleNavigation('/for-nonprofits')}>For nonprofits</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-green-100 hover:text-green-700" onClick={() => handleNavigation('/for-volunteers')}>For volunteers</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <a href="/pricing" className={navLink} onClick={(e) => { e.preventDefault(); handleNavigation('/pricing'); }}>Pricing</a>
        <a href="/about-us" className={navLink} onClick={(e) => { e.preventDefault(); handleNavigation('/about-us'); }}>About Us</a>
        <a href="https://coompass.medium.com/" target="_blank" rel="noopener noreferrer" className={navLink}>Blog</a>
      </nav>

      {/* Right: CTAs */}
      <div className="flex items-center gap-4">
        <button
          className={ctaBtn}
          onClick={() => handleNavigation('/')}
        >
          Open app
        </button>
        <button
          className={ctaBtn}
          onClick={() => handleNavigation('/register')}
        >
          Get free trial
        </button>
      </div>
    </header>
  );
}
