
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, TrendingUp, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function DonationTracker() {
  const { t } = useTranslation();
  
  // Mock donation data
  const donationData = {
    totalReceived: 75250,
    yearlyGoal: 120000,
    percentComplete: 62,
    recentDonations: [
      { id: 1, name: "Tech4Good Inc.", amount: 5000, date: "Apr 2, 2025", type: "corporate" },
      { id: 2, name: "Community Foundation", amount: 7500, date: "Mar 28, 2025", type: "grant" },
      { id: 3, name: "Anonymous Donor", amount: 1000, date: "Mar 25, 2025", type: "individual" },
      { id: 4, name: "Local Business Group", amount: 2500, date: "Mar 20, 2025", type: "corporate" }
    ],
    monthlyTrend: "+12.5% from last month"
  };
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{t('Donation Overview')}</h2>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {t('Export Report')}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 border-border">
            <div className="text-sm text-muted-foreground mb-1">{t('Total Received')}</div>
            <div className="text-2xl font-bold">${donationData.totalReceived.toLocaleString()}</div>
          </Card>
          
          <Card className="p-4 border-border">
            <div className="text-sm text-muted-foreground mb-1">{t('Yearly Goal')}</div>
            <div className="text-2xl font-bold">${donationData.yearlyGoal.toLocaleString()}</div>
          </Card>
          
          <Card className="p-4 border-border">
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm text-muted-foreground">{t('Progress')}</div>
              <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
                {donationData.percentComplete}%
              </Badge>
            </div>
            <Progress value={donationData.percentComplete} className="h-2 mt-2" />
          </Card>
          
          <Card className="p-4 border-border">
            <div className="text-sm text-muted-foreground mb-1">{t('Monthly Trend')}</div>
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="font-medium">{donationData.monthlyTrend}</span>
            </div>
          </Card>
        </div>
        
        <h3 className="font-medium text-lg mb-4">{t('Recent Contributions')}</h3>
        <div className="space-y-3">
          {donationData.recentDonations.map((donation) => (
            <div key={donation.id} className="flex justify-between items-center p-3 border border-border rounded-md hover:bg-accent/5 transition-colors">
              <div>
                <p className="font-medium">{donation.name}</p>
                <p className="text-sm text-muted-foreground">{donation.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={
                  donation.type === 'corporate' ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400" :
                  donation.type === 'grant' ? "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400" :
                  "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                }>
                  {donation.type === 'corporate' ? t('Corporate') :
                   donation.type === 'grant' ? t('Grant') : t('Individual')}
                </Badge>
                <span className="font-semibold">${donation.amount.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline">
            {t('View All Donations')}
            <ArrowUpRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
