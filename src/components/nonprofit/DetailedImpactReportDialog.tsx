
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { formatDatePt } from "@/lib/dateFormat";

interface DetailedImpactReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  impactData: {
    peopleBenefitted: number;
    fundingSecured: number;
    volunteersEngaged: number;
    projectsCompleted: number;
    impactCategories: Array<{ name: string; hours: number }>;
  };
}

export function DetailedImpactReportDialog({ 
  isOpen, 
  onClose, 
  impactData 
}: DetailedImpactReportDialogProps) {
  const { t } = useTranslation();
  
  const reportDate = formatDatePt(new Date());
  
  // Mock SDG alignment data
  const sdgAlignment = [
    { sdg: 1, title: "No Poverty", percentage: 85 },
    { sdg: 3, title: "Good Health and Well-being", percentage: 92 },
    { sdg: 4, title: "Quality Education", percentage: 78 },
    { sdg: 8, title: "Decent Work and Economic Growth", percentage: 67 },
    { sdg: 11, title: "Sustainable Cities and Communities", percentage: 73 },
    { sdg: 17, title: "Partnerships for the Goals", percentage: 89 }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {t('Detailed Impact Report')}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {t('Generated on')}: {reportDate}
          </p>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Key Metrics Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">{t('Key Impact Metrics')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 border-border bg-blue-50/30 dark:bg-blue-900/20">
                <div className="text-sm text-muted-foreground mb-1">{t('People Benefitted')}</div>
                <div className="text-2xl font-bold">{impactData.peopleBenefitted.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {t('Direct beneficiaries across all programs')}
                </div>
              </Card>
              
              <Card className="p-4 border-border bg-green-50/30 dark:bg-green-900/20">
                <div className="text-sm text-muted-foreground mb-1">{t('Funding Secured')}</div>
                <div className="text-2xl font-bold">${impactData.fundingSecured.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {t('Total funding raised for initiatives')}
                </div>
              </Card>
              
              <Card className="p-4 border-border bg-purple-50/30 dark:bg-purple-900/20">
                <div className="text-sm text-muted-foreground mb-1">{t('Volunteers Engaged')}</div>
                <div className="text-2xl font-bold">{impactData.volunteersEngaged}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {t('Active volunteers contributing time')}
                </div>
              </Card>
              
              <Card className="p-4 border-border bg-amber-50/30 dark:bg-amber-900/20">
                <div className="text-sm text-muted-foreground mb-1">{t('Projects Completed')}</div>
                <div className="text-2xl font-bold">{impactData.projectsCompleted}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {t('Successfully completed initiatives')}
                </div>
              </Card>
            </div>
          </div>

          {/* Impact by Cause Areas */}
          <div>
            <h3 className="text-lg font-medium mb-4">{t('Impact Distribution by Cause Areas')}</h3>
            <div className="space-y-4">
              {impactData.impactCategories.map((category, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{t(category.name)}</span>
                    <span className="text-sm text-muted-foreground">{category.hours.toLocaleString()} h</span>
                  </div>
                  <Progress
                    value={impactData.impactCategories.reduce((s, c) => s + c.hours, 0) > 0
                      ? (category.hours / impactData.impactCategories.reduce((s, c) => s + c.hours, 0)) * 100
                      : 0}
                    className="h-3"
                  />
                  <div className="text-xs text-muted-foreground">
                    {t('Hours dedicated to this cause area')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SDG Alignment Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">{t('UN Sustainable Development Goals Alignment')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sdgAlignment.map((sdg) => (
                <Card key={sdg.sdg} className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="outline" className="font-bold">
                      SDG {sdg.sdg}
                    </Badge>
                    <span className="text-sm font-medium">{sdg.title}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{t('Alignment Score')}</span>
                      <span className="text-sm font-medium">{sdg.percentage}%</span>
                    </div>
                    <Progress value={sdg.percentage} className="h-2" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">{t('Impact Summary')}</h3>
            <Card className="p-4 bg-muted/50">
              <p className="text-sm leading-relaxed">
                {t('Our organization has demonstrated significant impact across multiple cause areas, benefitting')} {impactData.peopleBenefitted.toLocaleString()} {t('people and securing')} ${impactData.fundingSecured.toLocaleString()} {t('in funding. With')} {impactData.volunteersEngaged} {t('active volunteers and')} {impactData.projectsCompleted} {t('completed projects, we continue to make meaningful progress toward achieving the UN Sustainable Development Goals while creating positive change in our communities.')}
              </p>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
