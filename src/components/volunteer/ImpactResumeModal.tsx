import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ImpactResumeProfileSummary } from "./impact-resume/ImpactResumeProfileSummary";
import { ImpactResumeStatsGrid } from "./impact-resume/ImpactResumeStatsGrid";
import { ImpactResumeSdgsSection } from "./impact-resume/ImpactResumeSdgsSection";
import { ImpactResumeCausesSection } from "./impact-resume/ImpactResumeCausesSection";
import { ImpactResumeSkillsSection } from "./impact-resume/ImpactResumeSkillsSection";
import { ImpactResumeOrganizationsSection } from "./impact-resume/ImpactResumeOrganizationsSection";
import { ImpactResumeRegionalSection } from "./impact-resume/ImpactResumeRegionalSection";
import { ImpactResumeFooter } from "./impact-resume/ImpactResumeFooter";
import { ImpactResumeModalProps, ImpactResumeData } from "./impact-resume/types";
import { useImpactResumeData } from "@/hooks/useImpactResumeData";

const DEMO_DATA: ImpactResumeData = {
  profile: {
    name: "Rodrigo Silva",
    company: "Coompass",
    level: 3,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rodrigo",
  },
  stats: {
    missionsCompleted: 12,
    volunteerHours: 42,
    associationsHelped: 4,
  },
  sdgsImpacted: [
    {
      id: 3,
      name: "Good Health and Well-being",
      key: "good_health_and_well_being",
      image_url:
        "https://e4k4c4x9.delivery.rocketcdn.me/en/wp-content/uploads/sites/15/2020/06/sustainable-development-goal-3.jpg",
    },
    {
      id: 13,
      name: "Climate Action",
      key: "climate_action",
      image_url:
        "https://e4k4c4x9.delivery.rocketcdn.me/en/wp-content/uploads/sites/15/2020/06/sustainable-development-goal-13.jpg",
    },
    {
      id: 15,
      name: "Life on Land",
      key: "life_on_land",
      image_url:
        "https://e4k4c4x9.delivery.rocketcdn.me/en/wp-content/uploads/sites/15/2020/06/sustainable-development-goal-15.jpg",
    },
  ],
  causesSupported: ["Environment", "Education", "Hunger"],
  topSkills: ["Communication", "Leadership", "Organization"],
  organizations: ["Porto Food Bank", "Clean Seas Initiative", "Crescer Association"],
  regionalImpact: ["Porto Metropolitan Area", "Northern Portugal"],
};

export function ImpactResumeModal({ isOpen, onClose, userId, isDemo }: ImpactResumeModalProps) {
  const { t } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showFooter, setShowFooter] = useState(false);
  const { data, loading, error } = useImpactResumeData(userId, isDemo);

  const displayData = isDemo ? DEMO_DATA : data;
  const sdgsImpacted = displayData?.sdgsImpacted ?? [];

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px threshold
        setShowFooter(isNearBottom);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      // Check initial state
      handleScroll();
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isOpen]);

  // Reset footer visibility when modal opens
  useEffect(() => {
    if (isOpen) {
      setShowFooter(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{t('Impact Resumé')}</DialogTitle>
        </DialogHeader>

        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto space-y-6"
        >
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 flex flex-col gap-2">
              <p className="text-sm text-destructive">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
              >
                {t("Retry")}
              </Button>
            </div>
          )}
          {loading && !displayData && (
            <div className="space-y-6">
              <Skeleton className="h-32 w-full" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
              </div>
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          )}
          {displayData && (
            <>
              <ImpactResumeProfileSummary profile={displayData.profile} />

              <ImpactResumeStatsGrid stats={displayData.stats} />

              <ImpactResumeSdgsSection sdgs={sdgsImpacted} />

              <ImpactResumeCausesSection causes={displayData.causesSupported} />

              <ImpactResumeSkillsSection skills={displayData.topSkills} />

              <ImpactResumeOrganizationsSection organizations={displayData.organizations} />

              <ImpactResumeRegionalSection regions={displayData.regionalImpact} />
            </>
          )}
        </div>

        <ImpactResumeFooter showFooter={showFooter} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
