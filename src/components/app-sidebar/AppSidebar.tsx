// Main AppSidebar component, manages state and renders other sidebar subcomponents.
// Persona must be passed from layout (route); no session/demo inference for menu selection.

import { useTranslation } from "react-i18next";
import { ChevronLeft, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";
import { SidebarHeader } from "../sidebar/SidebarHeader";
import { SidebarMenuTree } from "./SidebarMenuTree";
import { getMenusForRole, bottomNav } from "./SidebarMenuConfig";
import { SidebarNavItem } from "../sidebar/SidebarNavItem";
import { onboardingPathForUser, settingsForRole, useAuth, type UserRole } from "@/contexts/AuthContext";

const SIDEBAR_COLLAPSED_KEY = "sidebarCollapsed";

function roleFromPathname(pathname: string): UserRole {
  if (pathname.startsWith("/company")) return "company_admin";
  if (pathname.startsWith("/nonprofit")) return "nonprofit";
  return "volunteer";
}

export function AppSidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const { user, loading } = useAuth();
  const role = (user?.role as UserRole | undefined) ?? roleFromPathname(location.pathname);
  const sidebarMenu = useMemo(() => getMenusForRole(role), [role]);
  const settingsPath = useMemo(() => {
    return settingsForRole(role);
  }, [role]);
  const requiredOnboardingPath = onboardingPathForUser(user);
  const isOnboardingLocked = Boolean(requiredOnboardingPath);
  const allowedOnboardingPath = requiredOnboardingPath ?? settingsPath;
  const effectiveMenu = useMemo(() => {
    if (!isOnboardingLocked) return sidebarMenu;
    return sidebarMenu.map((item) => {
      if (!item?.path) return item;
      const shouldDisable = item.path !== allowedOnboardingPath;
      return {
        ...item,
        disabled: item.disabled || shouldDisable,
      };
    });
  }, [allowedOnboardingPath, isOnboardingLocked, sidebarMenu]);

  const [isCollapsed, setIsCollapsed] = useState(() => {
    const savedState = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    return savedState ? JSON.parse(savedState) : false;
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    } else {
      const savedState = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
      if (savedState !== null) {
        setIsCollapsed(JSON.parse(savedState));
      } else {
        setIsCollapsed(false);
      }
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, JSON.stringify(isCollapsed));
    }
  }, [isCollapsed, isMobile]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width',
      isCollapsed ? '4rem' : '16rem'
    );
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsCollapsed(false);
  };

  return (
    <>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden hover:bg-coompass-success/20 hover:text-coompass-success"
          onClick={toggleMobileMenu}
        >
          <Menu className="h-6 w-6" />
        </Button>
      )}
      <aside className={cn(
        "h-screen fixed left-0 top-0 border-r border-border bg-gray-50/80 dark:bg-black/20 backdrop-blur-xl transition-all duration-300 z-40",
        isCollapsed ? "w-16" : "w-64",
        isMobile && !isMobileMenuOpen && "transform -translate-x-full",
        isMobile && isMobileMenuOpen && "transform translate-x-0"
      )}>
        <div className="flex flex-col h-full relative">
          <SidebarHeader isCollapsed={isCollapsed} />

          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-3 top-7 w-6 h-6 rounded-full border border-border bg-background hover:bg-coompass-success/20 hover:text-coompass-success"
              onClick={toggleSidebar}
            >
              <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
            </Button>
          )}

          <SidebarMenuTree
            sidebarMenu={effectiveMenu}
            isCollapsed={isCollapsed}
            isMobile={isMobile}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            role={role}
            loading={loading}
          />

          <div className={cn("px-3 py-4 border-t border-border", isCollapsed && "px-2")}>
            {bottomNav.map((item) => (
              <SidebarNavItem
                key={item.name}
                {...item}
                name={t(item.name)}
                isCollapsed={isCollapsed}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              />
            ))}
          </div>
        </div>
      </aside>
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}


