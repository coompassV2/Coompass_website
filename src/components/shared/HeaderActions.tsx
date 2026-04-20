import { Settings, LogOut, ChevronDown, User, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useIsMobile } from "@/hooks/use-mobile";
import { memo, useCallback, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { useVolunteerData } from "@/hooks/useVolunteerData";
import { signOut } from "@/lib/supabase";
import { useSessionMode } from "@/hooks/useSessionMode";
import { PersonaType } from "@/utils/demoUtils";
import { getOktaLogoutUrl } from "@/utils/oktaAuth";
import { profilePathForUser, settingsForRole, useAuth } from "@/contexts/AuthContext";

interface HeaderActionsProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

/** Persona from route overrides session/localStorage so company/volunteer layouts never show wrong identity. */
function personaFromPathname(pathname: string): PersonaType | null {
  if (pathname.startsWith("/company")) return "company";
  if (pathname.startsWith("/volunteer")) return "volunteer";
  if (pathname.startsWith("/nonprofit")) return "organization";
  if (pathname.startsWith("/executive") || pathname.startsWith("/stakeholder")) return "stakeholder";
  return null;
}

const DEMO_DATA = {
  volunteer: {
    name: "Rodrigo Silva",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rodrigo",
  },
};

function HeaderActionsComponent({ theme, toggleTheme }: HeaderActionsProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { user, loading: authLoading } = useAuth();
  const { isDemo, userId, persona: sessionPersona, loading: sessionLoading } = useSessionMode();
  const { volunteerData, loading: volunteerLoading } = useVolunteerData(userId);

  const routePersona = personaFromPathname(location.pathname);
  const currentPersona = routePersona ?? sessionPersona;

  const getUserMetadataString = useCallback(
    (key: string) => {
      const value = user?.user_metadata?.[key];
      return typeof value === "string" ? value : undefined;
    },
    [user]
  );

  const authDisplayName = useMemo(() => {
    return getUserMetadataString("full_name") ?? user?.email ?? "User";
  }, [getUserMetadataString, user?.email]);

  const authAvatarUrl =
    getUserMetadataString("avatar_url") ??
    getUserMetadataString("profile_image") ??
    getUserMetadataString("picture") ??
    null;

  const handleSignOut = async () => {
    const destination = "/";
    const oktaLogoutUrl = getOktaLogoutUrl(`${window.location.origin}${destination}`);

    try {
      await signOut();
    } catch (error) {
      // Even if backend logout fails, client session must end.
      console.error("Error while signing out:", error);
    }

    // Remove persona/company session hints to avoid stale dashboard state.
    localStorage.removeItem("selected-brisa-company");
    localStorage.removeItem("demo-persona");
    if (oktaLogoutUrl) {
      window.location.assign(oktaLogoutUrl);
      return;
    }
    navigate(destination, { replace: true });
  };

  const userDisplay = useMemo(() => {
    if (currentPersona === "volunteer") {
      if (isDemo) return { name: DEMO_DATA.volunteer.name, logo: DEMO_DATA.volunteer.logo };
      return {
        name: volunteerData?.full_name || authDisplayName,
        logo: volunteerData?.avatar_url ?? authAvatarUrl ?? null,
      };
    }
    if (isDemo) return { name: "Demo User", logo: null };
    return {
      name: authDisplayName,
      logo: authAvatarUrl ?? null,
    };
  }, [currentPersona, isDemo, volunteerData, authDisplayName, authAvatarUrl]);

  const isHeaderLoading =
    sessionLoading ||
    (!isDemo &&
      (!currentPersona ||
        authLoading ||
        (currentPersona === "volunteer" && volunteerLoading)));

  const settingsPath = useMemo(() => {
    if (user?.role) {
      return settingsForRole(user.role);
    }
    if (currentPersona === "organization") return "/nonprofit/settings";
    if (currentPersona === "company") return "/company/settings";
    return "/volunteer/settings";
  }, [currentPersona, user?.role]);

  const profilePath = profilePathForUser(user?.role);

  return (
    <div className="flex items-center gap-1.5 md:gap-3 overflow-x-auto pb-2 md:pb-0">
      <LanguageSwitcher />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-coompass-success/10 hover:text-coompass-success"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">{t("Toggle theme")}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Toggle {theme === "dark" ? "light" : "dark"} mode</p>
        </TooltipContent>
      </Tooltip>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-white hover:bg-purple-50 hover:text-purple-600 border-gray-200 text-gray-700 text-xs dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-purple-300"
          >
            <div className="flex items-center gap-1.5">
              {isHeaderLoading ? (
                <Skeleton className="h-4 w-4 rounded" />
              ) : (
                <Avatar className="h-4 w-4">
                  {userDisplay.logo && (
                    <AvatarImage
                      src={userDisplay.logo}
                      alt={userDisplay.name}
                    />
                  )}
                  <AvatarFallback className="text-[10px]">{userDisplay.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
              )}
              {isHeaderLoading ? (
                <Skeleton className="hidden md:inline-flex h-3 w-20" />
              ) : (
                <span className="hidden md:inline text-xs font-medium">{userDisplay.name}</span>
              )}
              <ChevronDown className="h-3.5 w-3.5" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg z-50 dark:bg-gray-900 dark:text-white dark:border-gray-700">
          {(user?.role || currentPersona === "organization" || currentPersona === "company" || currentPersona === "volunteer") && (
            <>
              <DropdownMenuItem
                className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-gray-800 dark:hover:text-purple-300 text-xs"
                asChild
              >
                <Link to={profilePath}>
                  <User className="h-3.5 w-3.5" />
                  <span>{t("Profile")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-gray-800 dark:hover:text-purple-300 text-xs"
                asChild
              >
                <Link to={settingsPath}>
                  <Settings className="h-3.5 w-3.5" />
                  <span>{t("Settings")}</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem
            className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-gray-800 dark:hover:text-purple-300 text-xs"
            onClick={handleSignOut}
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>{t("Log out")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export const HeaderActions = memo(HeaderActionsComponent);
