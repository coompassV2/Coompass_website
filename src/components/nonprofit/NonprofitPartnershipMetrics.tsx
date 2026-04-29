
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, TrendingUp, Calendar, Users, Download, Share2, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function NonprofitPartnershipMetrics() {
  const { t } = useTranslation();

  // Mock data for partnership metrics
  const metrics = {
    totalPartners: 12,
    activeProjects: 8,
    volunteerHours: 437,
    fundingReceived: 75000,
    goalProgress: 68,
    partnerGrowth: "+25%"
  };

  return (
    <div className="space-y-4">
      <div className="glass-card p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-semibold">{t('Partnership Impact')}</h2>
          <div className="flex gap-1.5">
            <Button variant="outline" size="sm" className="text-xs">
              <Share2 className="h-3.5 w-3.5 mr-1.5" />
              {t('Share')}
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              {t('Export')}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <Card className="p-3 border-border bg-blue-50/30 dark:bg-blue-900/20">
            <div className="text-xs text-muted-foreground mb-0.5">{t('Total Partners')}</div>
            <div className="text-xl font-bold">{metrics.totalPartners}</div>
          </Card>
          
          <Card className="p-3 border-border bg-green-50/30 dark:bg-green-900/20">
            <div className="text-xs text-muted-foreground mb-0.5">{t('Active Projects')}</div>
            <div className="text-xl font-bold">{metrics.activeProjects}</div>
          </Card>
          
          <Card className="p-3 border-border bg-purple-50/30 dark:bg-purple-900/20">
            <div className="text-xs text-muted-foreground mb-0.5">{t('Volunteer Hours')}</div>
            <div className="text-xl font-bold">{metrics.volunteerHours}</div>
          </Card>
          
          <Card className="p-3 border-border bg-amber-50/30 dark:bg-amber-900/20 relative">
            <div className="text-xs text-muted-foreground mb-0.5">{t('Funding Received')}</div>
            <div className="text-xl font-bold">${metrics.fundingReceived.toLocaleString()}</div>
            <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-full text-[10px]">
              <Clock className="h-2.5 w-2.5" />
              {t('Coming Soon')}
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-3 relative">
            <h3 className="text-sm font-medium">{t('Funding Goal Progress')}</h3>
            <div className="absolute top-0 right-0 flex items-center gap-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-full text-[10px]">
              <Clock className="h-2.5 w-2.5" />
              {t('Coming Soon')}
            </div>
            <div className="space-y-1.5 opacity-50">
              <div className="flex justify-between text-xs">
                <span>${metrics.fundingReceived.toLocaleString()}</span>
                <span>${(metrics.fundingReceived / (metrics.goalProgress / 100)).toLocaleString()}</span>
              </div>
              <Progress value={metrics.goalProgress} className="h-1.5" />
              <p className="text-xs text-muted-foreground">{metrics.goalProgress}% {t('of annual partnership funding goal')}</p>
            </div>
            <div className="h-[100px] flex items-center justify-center bg-muted/20 rounded-lg opacity-50">
              <p className="text-muted-foreground text-xs">{t('Funding sources breakdown')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
