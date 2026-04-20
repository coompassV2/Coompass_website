import { useState } from "react";
import { useTranslation } from "react-i18next";
import { WalletHeader } from "@/components/wallet/WalletHeader";
import { WalletOverview } from "@/components/wallet/WalletOverview";
import { TransactionsList } from "@/components/wallet/TransactionsList";
import { BalanceCards } from "@/components/wallet/BalanceCards";
import { useTheme } from "@/hooks/useTheme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, HandHeart } from "lucide-react";
import { DonateDialog } from "@/components/wallet/dialogs/DonateDialog";
import { RewardsDialog } from "@/components/wallet/dialogs/RewardsDialog";

const VolunteerWallet = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("balance");
  
  // Dialog states
  const [rewardsDialogOpen, setRewardsDialogOpen] = useState(false);
  const [donateDialogOpen, setDonateDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="responsive-layout p-6">
        <WalletHeader title={t("Volunteer Rewards Hub")} theme={theme} toggleTheme={toggleTheme} />
        
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
                {t("My Balance")}
              </button>
              <button 
                className={`h-8 px-4 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "tokens" 
                    ? "bg-coompass-success/20 text-coompass-success" 
                    : "hover:bg-muted"
                }`}
                onClick={() => setActiveTab("tokens")}
              >
                {t("Earned Tokens")}
              </button>
              <button 
                className={`h-8 px-4 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "rewards" 
                    ? "bg-coompass-success/20 text-coompass-success" 
                    : "hover:bg-muted"
                }`}
                onClick={() => setActiveTab("rewards")}
              >
                {t("Available Rewards")}
              </button>
              <button 
                className={`h-8 px-4 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "donations" 
                    ? "bg-coompass-success/20 text-coompass-success" 
                    : "hover:bg-muted"
                }`}
                onClick={() => setActiveTab("donations")}
              >
                {t("My Donations")}
              </button>
            </div>
            
            <WalletOverview activeTab={activeTab} />
          </div>
          
          <div className="flex flex-col gap-6">
            <BalanceCards />
            
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 border-amber-200 dark:border-amber-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <span>{t("Claim Rewards")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t("Exchange your earned tokens for gift cards and other rewards.")}</p>
                  <Button 
                    variant="outline" 
                    className="w-full border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50"
                    onClick={() => setRewardsDialogOpen(true)}  
                  >
                    {t("Claim your prize")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/50 dark:to-rose-950/50 border-pink-200 dark:border-pink-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <HandHeart className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                  <span>{t("Make a Donation")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t("Support causes you care about by donating your earned tokens.")}</p>
                  <Button 
                    variant="outline" 
                    className="w-full border-pink-300 dark:border-pink-700 text-pink-700 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-900/50"
                    onClick={() => setDonateDialogOpen(true)}  
                  >
                    {t("Donate")}
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
      <RewardsDialog 
        isOpen={rewardsDialogOpen} 
        onClose={() => setRewardsDialogOpen(false)} 
      />
      
      <DonateDialog 
        isOpen={donateDialogOpen} 
        onClose={() => setDonateDialogOpen(false)} 
        personaType="volunteer"
      />
    </div>
  );
};

export default VolunteerWallet;
