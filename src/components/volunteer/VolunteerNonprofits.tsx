import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { organizationsData } from "@/data/organizations";
import { Card } from "@/components/ui/card";
import { Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";
import { useSessionMode } from "@/hooks/useSessionMode";

export function VolunteerNonprofits() {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [animationPlayState, setAnimationPlayState] = useState<'running' | 'paused'>('running');
  const { isDemo } = useSessionMode();
  const [userNonprofits] = useState<any[]>([]);
  const loading = false;

  // Get demo organizations for showcase
  const demoOrganizations = React.useMemo(() => {
    return [...organizationsData]
      .sort(() => Math.random() - 0.5)
      .slice(0, 12);
  }, []);

  // Use demo organizations if in demo mode, real nonprofits if authenticated
  const organizations = isDemo ? demoOrganizations : userNonprofits;

  const handleMouseEnter = () => {
    setIsPaused(true);
    setAnimationPlayState('paused');
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setAnimationPlayState('running');
  };

  // Create an organization card that can be reused for both the original and duplicate lists
  const renderOrganizationCard = (org: any, isDuplicate = false) => (
    <Link to={`/organizations/${org.id}`} key={isDuplicate ? `dup-${org.id}` : org.id}>
      <Card className="w-64 shrink-0 p-4 border shadow-sm hover:shadow-md transition-shadow duration-200 hover:bg-coompass-success/20 hover:text-coompass-success">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <img
              src={`https://api.dicebear.com/7.x/shapes/svg?seed=${org.id}`}
              alt={org.name || org.organization_name}
              className="w-10 h-10 rounded-lg"
            />
            <h4 className="font-semibold line-clamp-1">{org.name || org.organization_name}</h4>
          </div>
          {(org.category || org.organization_type) && (
            <div className="text-xs text-muted-foreground mt-1">
              <span>Category: <span className="text-[#0FA0CE]">{org.category || org.organization_type}</span></span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            {org.country && (
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full">
                {org.country}
              </span>
            )}
            {org.featured && (
              <span className="px-2 py-1 bg-purple-500/20 text-purple-500 rounded-full">
                Featured
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );

  if (loading && !isDemo) {
    return (
      <div className="glass-card w-full overflow-hidden rounded-lg relative">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h3 className="text-lg font-medium">{t("Nonprofits I've volunteered for")}</h3>
        </div>
        <div className="py-3 px-4">
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-64 shrink-0 p-4 space-y-2">
                <div className="h-10 w-10 bg-muted rounded-lg animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card w-full overflow-hidden rounded-lg relative">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <h3 className="text-lg font-medium">{t("Nonprofits I've volunteered for")}</h3>
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          {isPaused ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isPaused ? "Paused" : "Live updates"}
        </span>
      </div>

      <div
        className="py-3 px-4 relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {organizations.length > 0 ? (
          <div
            ref={scrollRef}
            className="flex gap-4 w-max animate-scroll"
            style={{
              animation: `scroll 50s linear infinite ${animationPlayState}`,
            }}
          >
            {/* First set of organizations */}
            {organizations.map((org) => renderOrganizationCard(org))}
            
            {/* Duplicate the same cards to create a seamless loop */}
            {organizations.map((org) => renderOrganizationCard(org, true))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">{t("No nonprofits yet. Start volunteering to see organizations here!")}</p>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </div>
  );
}
