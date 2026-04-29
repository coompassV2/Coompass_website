
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { SkillsInventory } from "@/components/volunteer/SkillsInventory";
import { InterestAreas } from "@/components/volunteer/InterestAreas";
import { SDGAlignment } from "@/components/volunteer/SDGAlignment";
import { SkillRecommendations } from "@/components/volunteer/SkillRecommendations";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";

export default function VolunteerSkills() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success(t("Skills and preferences saved successfully"));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={t('Skills & Interests Profile')}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <div className="flex justify-end mb-6">
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? t('Saving...') : t('Save Profile')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <SkillsInventory />
            <InterestAreas />
          </div>
          
          <div className="space-y-6">
            <SDGAlignment />
            <SkillRecommendations />
          </div>
        </div>
      </main>
    </div>
  );
}
