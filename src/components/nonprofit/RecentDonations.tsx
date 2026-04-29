
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RecentDonations() {
  const { t } = useTranslation();
  
  // Mock data for recent donations
  const recentDonations = [
    {
      id: 1,
      donor: "John Smith",
      amount: 250,
      date: "Apr 3, 2025",
      type: "one-time"
    },
    {
      id: 2,
      donor: "Tech for Good Corp.",
      amount: 1000,
      date: "Apr 2, 2025",
      type: "corporate"
    },
    {
      id: 3,
      donor: "Emma Wilson",
      amount: 50,
      date: "Apr 1, 2025",
      type: "recurring"
    },
    {
      id: 4,
      donor: "Anonymous",
      amount: 100,
      date: "Mar 30, 2025",
      type: "one-time"
    }
  ];
  
  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold mb-4">{t('Recent Donations')}</h2>
      
      <div className="space-y-3">
        {recentDonations.map((donation) => (
          <div 
            key={donation.id} 
            className="flex justify-between items-center p-3 border border-border rounded-md hover:bg-accent/5 transition-colors"
          >
            <div>
              <p className="font-medium">{donation.donor}</p>
              <p className="text-sm text-muted-foreground">{donation.date}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">${donation.amount}</p>
              <Badge variant="outline" className={cn(
                "text-xs",
                donation.type === "recurring" ? "text-green-600" :
                donation.type === "corporate" ? "text-blue-600" : ""
              )}>
                {donation.type === "recurring" ? t('Monthly') :
                 donation.type === "corporate" ? t('Corporate') : t('One-time')}
              </Badge>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <Button variant="outline" size="sm" asChild>
          <Link to="/nonprofit/wallet">{t('View All Donations')}</Link>
        </Button>
      </div>
    </div>
  );
}
