import { useState } from "react";
import { useTranslation } from "react-i18next";
import { WalletHeader } from "@/components/wallet/WalletHeader";
import { WalletOverview } from "@/components/wallet/WalletOverview";
import { TransactionsList } from "@/components/wallet/TransactionsList";
import { BalanceCards } from "@/components/wallet/BalanceCards";
import { useTheme } from "@/hooks/useTheme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Landmark, Gift } from "lucide-react";
import { DonateDialog } from "@/components/wallet/dialogs/DonateDialog";
import { MatchingDialog } from "@/components/wallet/dialogs/MatchingDialog";

const CompanyWallet = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("balance");
  
  // Dialog states
  const [donateDialogOpen, setDonateDialogOpen] = useState(false);
  const [matchingDialogOpen, setMatchingDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="responsive-layout p-6">
        <WalletHeader title={t("Corporate Wallet")} theme={theme} toggleTheme={toggleTheme} />
        
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
                {t("Corporate Funds")}
              </button>
              <button 
                className={`h-8 px-4 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "donations" 
                    ? "bg-coompass-success/20 text-coompass-success" 
                    : "hover:bg-muted"
                }`}
                onClick={() => setActiveTab("donations")}
              >
                {t("Donations Made")}
              </button>
              <button 
                className={`h-8 px-4 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "grants" 
                    ? "bg-coompass-success/20 text-coompass-success" 
                    : "hover:bg-muted"
                }`}
                onClick={() => setActiveTab("grants")}
              >
                {t("Active Grants")}
              </button>
              <button 
                className={`h-8 px-4 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "impact" 
                    ? "bg-coompass-success/20 text-coompass-success" 
                    : "hover:bg-muted"
                }`}
                onClick={() => setActiveTab("impact")}
              >
                {t("Impact Investments")}
              </button>
            </div>
            
            <WalletOverview activeTab={activeTab} />
          </div>
          
          <div className="flex flex-col gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border-green-200 dark:border-green-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Gift className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>{t("Make a Donation")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t("Support nonprofits and social causes with financial contributions.")}</p>
                  <Button 
                    variant="outline" 
                    className="w-full border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50"
                    onClick={() => setDonateDialogOpen(true)}
                  >
                    {t("Donate")}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/50 dark:to-sky-950/50 border-blue-200 dark:border-blue-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>{t("Matching Programs")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t("Match your employees' donations to amplify your company's social impact.")}</p>
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                    onClick={() => setMatchingDialogOpen(true)}
                  >
                    {t("Set Up Matching")}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <BalanceCards />
          </div>
        </div>
        
        <div className="mt-6">
          <TransactionsList activeTab={activeTab} />
        </div>
      </div>
      
      {/* Dialogs */}
      <DonateDialog 
        isOpen={donateDialogOpen} 
        onClose={() => setDonateDialogOpen(false)} 
      />
      <MatchingDialog 
        isOpen={matchingDialogOpen} 
        onClose={() => setMatchingDialogOpen(false)} 
      />
    </div>
  );
};

export default CompanyWallet;
