
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { BarChart, FileText, Download, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { formatDatePt } from "@/lib/dateFormat";

interface PartnershipReportsDialogProps {
  partnership: {
    id: number;
    organization: {
      name: string;
    };
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PartnershipReportsDialog({ partnership, isOpen, onClose }: PartnershipReportsDialogProps) {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleDownload = (reportType: string) => {
    toast({
      title: t("Downloading Report"),
      description: t("Your {reportType} report is being prepared for download.", { reportType }),
    });
  };

  if (!partnership) return null;

  const reports = [
    { id: 1, name: t("Q1 Impact Summary"), date: "2025-01-15", type: "Impact" },
    { id: 2, name: t("Volunteer Hours Log"), date: "2025-02-10", type: "Activity" },
    { id: 3, name: t("SDG Alignment Report"), date: "2025-03-20", type: "Impact" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("Partnership Reports")}: {partnership.organization.name}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="all" className="mt-4">
          <TabsList>
            <TabsTrigger value="all">{t("All Reports")}</TabsTrigger>
            <TabsTrigger value="impact">{t("Impact")}</TabsTrigger>
            <TabsTrigger value="activity">{t("Activity")}</TabsTrigger>
          </TabsList>
          
          {["all", "impact", "activity"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {reports
                .filter(report => tab === "all" || report.type.toLowerCase() === tab)
                .map((report) => (
                  <Card key={report.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {report.type === "Impact" ? (
                          <BarChart className="h-5 w-5 text-coompass-success" />
                        ) : (
                          <FileText className="h-5 w-5 text-blue-500" />
                        )}
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDatePt(report.date)}
                          </p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownload(report.name)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {t("Download")}
                      </Button>
                    </div>
                  </Card>
                ))}
                
              {reports.filter(report => tab === "all" || report.type.toLowerCase() === tab).length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <FileText className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p>{t("No reports available in this category.")}</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-4 flex justify-end">
          <Button onClick={onClose}>
            {t("Close")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
