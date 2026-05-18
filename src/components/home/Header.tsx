import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Building2,
  ChevronDown,
  GraduationCap,
  HandHeart,
  Landmark,
  LineChart,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CALENDLY_URL = "https://calendly.com/hello-coompass/sessao-coompass";

const SOLUTION_LINKS = [
  { label: "Companies", path: "/personas/companies", icon: Building2 },
  { label: "Nonprofit Organizations", path: "/personas/nonprofits", icon: HandHeart },
  { label: "University and Schools", path: "/personas/universities-schools", icon: GraduationCap },
  { label: "Municipalities and Institutions", path: "/personas/municipalities", icon: Landmark },
  { label: "Investors and Stakeholders", path: "/personas/investors-stakeholders", icon: LineChart },
] as const;

interface HeaderProps {
  variant?: "dark" | "light";
}

export function Header({ variant = "dark" }: HeaderProps) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
    setMobileOpen(false);
  };

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
  const mobileNavLink = isLight
    ? "w-full rounded-lg px-3 py-2.5 text-left text-base text-gray-900 hover:bg-gray-100"
    : "w-full rounded-lg px-3 py-2.5 text-left text-base text-white/90 hover:bg-white/10";
  const ctaBtn = isLight
    ? "text-gray-900/80 hover:text-gray-900 hover:bg-gray-900/10 transition-colors px-4 py-2 font-light tracking-wide rounded-md sm:px-6"
    : "text-white/80 hover:text-white hover:bg-white/10 transition-colors px-4 py-2 font-light tracking-wide rounded-md sm:px-6";
  const menuBtnClass = isLight
    ? "text-gray-900 hover:bg-gray-900/10"
    : "text-white hover:bg-white/10";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 flex items-center justify-between gap-3 px-4 py-4 transition-all duration-300 sm:px-6 sm:py-5 lg:px-12 lg:py-6 ${headerBg}`}
    >
      <div className="flex min-w-0 shrink items-center">
        <img
          src={
            isLight
              ? "https://coompass.lovable.app/lovable-uploads/ed0df35e-439d-4191-8e03-881490d2a245.png"
              : "/lovable-uploads/4be2e00f-693c-4dd3-be7d-8a3ddce5c065.png"
          }
          alt="Coompass Logo"
          className="h-7 w-auto cursor-pointer sm:h-8"
          onClick={() => handleNavigation("/")}
        />
      </div>

      <nav className="hidden items-center gap-4 md:flex lg:gap-6">
        <a href="/services" className={navLink} onClick={(e) => { e.preventDefault(); handleNavigation("/services"); }}>
          Services
        </a>
        <a href="/about-us" className={navLink} onClick={(e) => { e.preventDefault(); handleNavigation("/about-us"); }}>
          About Us
        </a>
        <a href="/pricing" className={navLink} onClick={(e) => { e.preventDefault(); handleNavigation("/pricing"); }}>
          Pricing
        </a>
        <div className="group relative">
          <button className={`${navLink} inline-flex items-center gap-1`} type="button" aria-haspopup="menu">
            Solutions
            <ChevronDown className="h-4 w-4" />
          </button>
          <div className="pointer-events-none absolute left-0 top-full z-40 w-72 pt-2 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group:focus-within:pointer-events-auto group:focus-within:opacity-100">
            <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
              {SOLUTION_LINKS.map(({ label, path, icon: Icon }) => (
                <button
                  key={path}
                  onClick={() => handleNavigation(path)}
                  className="inline-flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                >
                  <Icon className="h-4 w-4 shrink-0 text-emerald-600" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={`${ctaBtn} hidden sm:inline-flex`}>
          Book a demo
        </a>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={`md:hidden ${menuBtnClass}`}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(100vw-2rem,20rem)] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              <button type="button" onClick={() => handleNavigation("/services")} className={mobileNavLink}>
                Services
              </button>
              <button type="button" onClick={() => handleNavigation("/about-us")} className={mobileNavLink}>
                About Us
              </button>
              <button type="button" onClick={() => handleNavigation("/pricing")} className={mobileNavLink}>
                Pricing
              </button>
              <p className="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Solutions</p>
              {SOLUTION_LINKS.map(({ label, path, icon: Icon }) => (
                <button
                  key={path}
                  type="button"
                  onClick={() => handleNavigation(path)}
                  className={`${mobileNavLink} inline-flex items-center gap-2`}
                >
                  <Icon className="h-4 w-4 shrink-0 text-emerald-600" />
                  {label}
                </button>
              ))}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-medium text-white hover:bg-sky-600"
                onClick={() => setMobileOpen(false)}
              >
                Book a demo
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
