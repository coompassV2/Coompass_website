import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Building2, ChevronDown, GraduationCap, HandHeart, Landmark, LineChart } from "lucide-react";

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
        <a href="/services" className={navLink} onClick={(e) => { e.preventDefault(); handleNavigation('/services'); }}>Services</a>
        <a href="/about-us" className={navLink} onClick={(e) => { e.preventDefault(); handleNavigation('/about-us'); }}>About Us</a>
        <a href="/pricing" className={navLink} onClick={(e) => { e.preventDefault(); handleNavigation('/pricing'); }}>Pricing</a>
        <div className="group relative">
          <button
            className={`${navLink} inline-flex items-center gap-1`}
            type="button"
            aria-haspopup="menu"
          >
            Solutions
            <ChevronDown className="h-4 w-4" />
          </button>
          <div className="pointer-events-none absolute left-0 top-full z-40 w-72 pt-2 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
            <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
              <button onClick={() => handleNavigation('/personas/companies')} className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100">
                <Building2 className="h-4 w-4 text-emerald-600" />
                Companies
              </button>
              <button onClick={() => handleNavigation('/personas/nonprofits')} className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100">
                <HandHeart className="h-4 w-4 text-emerald-600" />
                Nonprofit Organizations
              </button>
              <button onClick={() => handleNavigation('/personas/universities-schools')} className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100">
                <GraduationCap className="h-4 w-4 text-emerald-600" />
                University and Schools
              </button>
              <button onClick={() => handleNavigation('/personas/municipalities')} className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100">
                <Landmark className="h-4 w-4 text-emerald-600" />
                Municipalities and Institutions
              </button>
              <button onClick={() => handleNavigation('/personas/investors-stakeholders')} className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100">
                <LineChart className="h-4 w-4 text-emerald-600" />
                Investors and Stakeholders
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Right: CTAs */}
      <div className="flex items-center gap-4">
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
