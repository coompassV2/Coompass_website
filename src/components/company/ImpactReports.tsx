import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Download, ChevronDown, FileText, File, Image } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImpactKPIsDialog } from "./ImpactKPIsDialog";

interface ImpactReportsProps {
  showFullReportButton?: boolean;
}

export function ImpactReports({ showFullReportButton = false }: ImpactReportsProps) {
  const { t } = useTranslation();
  const [isKPIsDialogOpen, setIsKPIsDialogOpen] = useState(false);
  const [isExportSoonOpen, setIsExportSoonOpen] = useState(false);
  
  // Mock data for quarterly reports
  const quarterlyData = [
    { month: t('Jan'), hours: 152, impact: 78, missions: 4 },
    { month: t('Feb'), hours: 189, impact: 82, missions: 5 },
    { month: t('Mar'), hours: 205, impact: 91, missions: 6 },
    { month: t('Apr'), hours: 178, impact: 85, missions: 4 },
    { month: t('May'), hours: 243, impact: 95, missions: 7 },
    { month: t('Jun'), hours: 210, impact: 89, missions: 5 },
  ];
  
  // Mock data for yearly trends
  const yearlyData = [
    { year: '2022', hours: 1245, impact: 72, missions: 28 },
    { year: '2023', hours: 1890, impact: 80, missions: 42 },
    { year: '2024', hours: 2350, impact: 88, missions: 56 },
    { year: '2025 YTD', hours: 1177, impact: 92, missions: 31 },
  ];

  const handleSeeAsImage = () => {
    setIsKPIsDialogOpen(true);
  };

  const handleExportAction = () => {
    setIsExportSoonOpen(true);
  };

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">{t('Impact Reports')}</h2>
          <p className="text-sm text-muted-foreground">{t('Volunteer contribution and impact metrics')}</p>
        </div>
        
        <div className="flex gap-2">
          {showFullReportButton && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  {t('Export Full Report')}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border border-border">
                <DropdownMenuItem onClick={handleSeeAsImage} className="focus:bg-green-500 focus:text-white">
                  <Image className="h-4 w-4 mr-2" />
                  {t('See as Image')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportAction} className="focus:bg-green-500 focus:text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  {t('Export as CSV')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportAction} className="focus:bg-green-500 focus:text-white">
                  <File className="h-4 w-4 mr-2" />
                  {t('Export as PDF')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="quarterly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="quarterly">{t('Quarterly')}</TabsTrigger>
          <TabsTrigger value="yearly">{t('Yearly')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="quarterly" className="space-y-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quarterlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="hours" name={t('Volunteer Hours')} fill="#10B981" />
                <Bar yAxisId="right" dataKey="missions" name={t('Missions')} fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={quarterlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="impact" name={t('Impact Score')} stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="yearly" className="space-y-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="hours" name={t('Volunteer Hours')} fill="#10B981" />
                <Bar yAxisId="right" dataKey="missions" name={t('Missions')} fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yearlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="impact" name={t('Impact Score')} stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>

      <ImpactKPIsDialog 
        isOpen={isKPIsDialogOpen} 
        onClose={() => setIsKPIsDialogOpen(false)} 
      />

      <Dialog open={isExportSoonOpen} onOpenChange={setIsExportSoonOpen}>
        <DialogContent className="sm:max-w-xs">
          <DialogHeader>
            <DialogTitle>{t('Coming Soon')}</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
