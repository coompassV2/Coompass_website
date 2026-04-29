import { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Badge } from "../ui/badge";

interface SidebarNavItemProps {
  name: string;
  icon: LucideIcon;
  path: string;
  isCollapsed: boolean;
  soon?: boolean;
  pro?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function SidebarNavItem({ name, icon: Icon, path, isCollapsed, soon, pro, disabled, onClick }: SidebarNavItemProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const isMailtoLink = path.startsWith("mailto:");
  const pathBase = path.split("?")[0];
  const isActive = !disabled && !isMailtoLink && location.pathname === pathBase;

  const baseClassName = cn(
    "nav-link mb-1",
    isCollapsed && "justify-center px-2",
    "text-black dark:text-gray-400 text-[12px]",
    isActive && "bg-gradient-to-r from-green-400 to-emerald-500 text-black dark:text-black",
    disabled && "pointer-events-none opacity-60"
  );

  if (disabled) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={baseClassName}>
            <Icon className="h-[14px] w-[14px] shrink-0" />
            {!isCollapsed && (
              <>
                <span>{name}</span>
              </>
            )}
          </span>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right">
            <p>{name}</p>
          </TooltipContent>
        )}
      </Tooltip>
    );
  }

  if (isMailtoLink) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={path}
            className={cn(baseClassName, "hover:text-black dark:hover:text-white")}
            onClick={onClick}
          >
            <Icon className="h-[14px] w-[14px] shrink-0" />
            {!isCollapsed && (
              <>
                <span>{name}</span>
                {soon && (
                  <Badge variant="destructive" className="ml-auto text-xs px-2 py-0 rounded-full">
                    {t("Soon")}
                  </Badge>
                )}
              </>
            )}
          </a>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right">
            <p>{name}</p>
          </TooltipContent>
        )}
      </Tooltip>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={path}
          className={cn(baseClassName, "hover:text-black dark:hover:text-white")}
          onClick={onClick}
        >
          <Icon className="h-[14px] w-[14px] shrink-0" />
          {!isCollapsed && (
            <>
              <span>{name}</span>
              {soon && (
                <Badge variant="destructive" className="ml-auto text-xs px-2 py-0 rounded-full">
                  {t("Soon")}
                </Badge>
              )}
            </>
          )}
        </Link>
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent side="right">
          <p>{name}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
