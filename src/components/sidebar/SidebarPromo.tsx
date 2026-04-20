import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Sparkles, Users } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useTranslation } from "react-i18next";
import type { UserRole } from "@/contexts/AuthContext";

interface SidebarPromoProps {
  isCollapsed: boolean;
  role?: UserRole;
}

export function SidebarPromo({ isCollapsed, role }: SidebarPromoProps) {
  const { t } = useTranslation();
  const isCompany = role === "company_admin";
  const isVolunteer = role === "volunteer";
  const isNonprofit = role === "nonprofit";

  if (!isVolunteer || isCompany || isNonprofit) return null;

  // Different promo content based on persona
  const promoContent = {
    volunteer: {
      title: t("Launch Your Initiative"),
      description: t("Propose a volunteering initiative"),
      buttonText: t("Create Initiative"),
      buttonIcon: <Users className="h-4 w-4" />,
      linkPath: "/coming-soon",
      isPro: false,
      soon: true
    },
    default: {
      title: "AI-Powered ESG Assistant",
      description: "Scale your sustainability impact with smart AI automation.",
      buttonText: "Ask AI",
      buttonIcon: <Sparkles className="h-4 w-4" />,
      linkPath: "/ask-ai",
      isPro: false
    }
  };
  
  // Choose the appropriate content based on persona
  const content = isVolunteer ? promoContent.volunteer : promoContent.default;
  const showSoon = isVolunteer && (content as { soon?: boolean }).soon;

  if (isCollapsed) {
    return (
      <div className="px-2 mt-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to={content.linkPath}>
              <Button 
                className={cn(
                  "w-full border-0 text-white", 
                  isVolunteer
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700" 
                    : "bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600"
                )}
                size="icon"
              >
                {content.buttonIcon}
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{content.buttonText}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className={cn(
      "mt-6 p-4 rounded-xl backdrop-blur-sm border", 
      isVolunteer
        ? "bg-gradient-to-br from-purple-500/20 to-indigo-600/20 border-purple-500/20" 
        : "bg-gradient-to-br from-green-400/20 to-emerald-500/20 border-green-500/20"
    )}>
      <div className="relative flex items-center gap-2">
        <h3 className="font-semibold text-black dark:text-white mb-1 text-sm">{content.title}</h3>
        {showSoon && (
          <span className="text-xs bg-red-500/90 text-white px-2 py-0.5 rounded-full shrink-0">{t("Soon")}</span>
        )}
      </div>
      <p className="text-xs text-black/80 dark:text-gray-300 mb-3">{content.description}</p>
      <Link to={content.linkPath}>
        <Button className={cn(
          "w-full text-white border-0",
          isVolunteer
            ? "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700" 
            : "bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600"
        )}>
          {content.buttonIcon}
          {content.buttonText}
        </Button>
      </Link>
    </div>
  );
}
