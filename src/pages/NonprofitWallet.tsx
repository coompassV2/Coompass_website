import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { WalletHeader } from "@/components/wallet/WalletHeader";
import { WalletOverview } from "@/components/wallet/WalletOverview";
import { TransactionsList } from "@/components/wallet/TransactionsList";
import { BalanceCards } from "@/components/wallet/BalanceCards";
import { useTheme } from "@/hooks/useTheme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone } from "lucide-react";
import { CampaignDialog } from "@/components/wallet/dialogs/CampaignDialog";

const NonprofitWallet = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("balance");
  
  // Dialog states
  const [campaignDialogOpen, setCampaignDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="responsive-layout p-6">
        <WalletHeader title={t("Nonprofit Resource Center")} theme={theme} toggleTheme={toggleTheme} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <button 
                className={`h-8 px-4 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "balance" 
                    ? "bg-coompass-success/20 text-coompass-success" 
                    : "hover:bg-muted"
                }`}
                onClick={() => setActiveTab("balance")}
              >
                {t("Organization Funds")}
              </button>
              <button 
                className={`h-8 px-4 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "donations" 
                    ? "bg-coompass-success/20 text-coompass-success" 
                    : "hover:bg-muted"
                }`}
                onClick={() => setActiveTab("donations")}
              >
                {t("Received Donations")}
              </button>
              <button 
                className={`h-8 px-4 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "campaigns" 
                    ? "bg-coompass-success/20 text-coompass-success" 
                    : "hover:bg-muted"
                }`}
                onClick={() => setActiveTab("campaigns")}
              >
                {t("Fundraising Campaigns")}
              </button>
            </div>
            
            <WalletOverview activeTab={activeTab} />
          </div>
          
          <div className="flex flex-col gap-6">
            <BalanceCards />
            
            {/* Moved the Create Fundraising Campaign card to appear below the BalanceCards */}
            <Card className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/50 dark:to-blue-950/50 border-blue-200 dark:border-blue-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>{t("Create Fundraising Campaign")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t("Launch a campaign to raise funds for your nonprofit's initiatives.")}</p>
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                    onClick={() => setCampaignDialogOpen(true)}
                  >
                    {t("Create Fundraising Campaign")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-6">
          <TransactionsList activeTab={activeTab} />
        </div>
      </div>
      
      {/* Dialogs */}
      <CampaignDialog 
        isOpen={campaignDialogOpen} 
        onClose={() => setCampaignDialogOpen(false)} 
      />
    </div>
  );
};

export default NonprofitWallet;
