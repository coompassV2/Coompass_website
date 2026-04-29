import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSessionMode } from "@/hooks/useSessionMode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Heart, Users, TreeDeciduous, FileText } from "lucide-react";
import { ImpactResumeModal } from "./ImpactResumeModal";

export function PersonalImpactMetrics() {
  const { t } = useTranslation();
  const { userId, isDemo } = useSessionMode();
  const [showImpactResume, setShowImpactResume] = useState(false);
  
  // Mock data - would come from API in a real implementation
  const impactData = {
    totalMissions: 12,
    totalHours: 42,
    causesSupported: ["Environment", "Education", "Hunger"],
    teamContribution: "15%",
    topSkills: ["Communication", "Leadership", "Organization"],
    badges: [
      { name: "First Mission", icon: <Award className="h-4 w-4" /> },
      { name: "Team Player", icon: <Users className="h-4 w-4" /> },
      { name: "Environmental Hero", icon: <TreeDeciduous className="h-4 w-4" /> }
    ]
  };
  
  return (
    <>
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">{t('Personal Impact')}</h3>
          <div className="flex items-center gap-2">
            <Badge className="bg-coompass-primary">{t('Level')} 3</Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowImpactResume(true)}
              className="flex items-center gap-1"
            >
              <FileText className="h-3 w-3" />
              {t('Impact Resumé')}
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-card/50 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">{t('Causes Supported')}</div>
            <div className="flex flex-wrap gap-2">
              {impactData.causesSupported.map((cause) => (
                <Badge key={cause} variant="outline">{cause}</Badge>
              ))}
            </div>
          </div>
          
          <div className="bg-card/50 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">{t('Top Skills')}</div>
            <div className="flex flex-wrap gap-2">
              {impactData.topSkills.map((skill) => (
                <Badge key={skill} variant="outline" className="bg-blue-500/10 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="bg-card/50 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">{t('Achievements')}</div>
            <div className="flex flex-wrap gap-3">
              {impactData.badges.map((badge, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-1">
                    {badge.icon}
                  </div>
                  <span className="text-xs">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-card/50 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">{t('Team Contribution')}</div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="text-lg font-semibold">{impactData.teamContribution}</span>
              <span className="text-sm text-muted-foreground">{t('of company total')}</span>
            </div>
          </div>
        </div>
      </div>

      <ImpactResumeModal
        isOpen={showImpactResume}
        onClose={() => setShowImpactResume(false)}
        userId={userId}
        isDemo={isDemo}
      />
    </>
  );
}
