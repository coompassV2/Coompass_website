// Presents the main navigation menu, using the menu config

import { useTranslation } from "react-i18next";
import { SidebarNavItem } from "../sidebar/SidebarNavItem";
import { SidebarPromo } from "../sidebar/SidebarPromo";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/contexts/AuthContext";

interface SidebarMenuTreeProps {
  sidebarMenu: Array<any>;
  isCollapsed: boolean;
  isMobile: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  role?: UserRole;
  loading?: boolean;
}

const skeletonRows = [100, 80, 92, 68, 88, 74];

export function SidebarMenuTree({ sidebarMenu, isCollapsed, isMobile, setIsMobileMenuOpen, role, loading = false }: SidebarMenuTreeProps) {
  const { t } = useTranslation();

  return (
    <>
      <nav className="flex-1 py-4 px-3">
        {loading ? (
          <div className="space-y-1">
            {skeletonRows.map((width, index) => (
              <div key={`skeleton-row-${index}`} className={cn("nav-link mb-1", isCollapsed && "justify-center px-2")}>
                <Skeleton className="h-[14px] w-[14px] shrink-0 rounded-sm" />
                {!isCollapsed && <Skeleton className="h-3" style={{ width: `${width}%` }} />}
              </div>
            ))}
            <div className={cn("my-4", isCollapsed ? "mx-2" : "mx-4")}>
              <Separator className="bg-border/60" />
            </div>
            {skeletonRows.slice(0, 3).map((width, index) => (
              <div key={`skeleton-row-bottom-${index}`} className={cn("nav-link mb-1", isCollapsed && "justify-center px-2")}>
                <Skeleton className="h-[14px] w-[14px] shrink-0 rounded-sm" />
                {!isCollapsed && <Skeleton className="h-3" style={{ width: `${width}%` }} />}
              </div>
            ))}
          </div>
        ) : (
          <>
            {sidebarMenu.map((item, index) => (
              item.divider ? (
                <div key={`divider-${index}`} className={cn("my-4", isCollapsed ? "mx-2" : "mx-4")}>
                  <Separator className="bg-border/60" />
                </div>
              ) : (
                <SidebarNavItem
                  key={`${item.path ?? item.name ?? index}`}
                  {...item}
                  name={t(item.name)}
                  isCollapsed={isCollapsed}
                  onClick={() => isMobile && setIsMobileMenuOpen(false)}
                />
              )
            ))}
            <SidebarPromo isCollapsed={isCollapsed} role={role} />
          </>
        )}
      </nav>
    </>
  );
}

