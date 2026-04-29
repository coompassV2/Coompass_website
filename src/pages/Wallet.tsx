import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { WalletHeader } from "@/components/wallet/WalletHeader";
import { WalletOverview } from "@/components/wallet/WalletOverview";
import { TransactionsList } from "@/components/wallet/TransactionsList";
import { BalanceCards } from "@/components/wallet/BalanceCards";
import { CreateToken } from "@/components/wallet/CreateToken";
import { ClaimRewards } from "@/components/wallet/ClaimRewards";
import { useTheme } from "@/hooks/useTheme";

const Wallet = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("balance");

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="responsive-layout p-6">
        <WalletHeader title={t("Wallet")} theme={theme} toggleTheme={toggleTheme} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <button 
                className={`h-8 px-4 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "balance" 
                    ? "bg-coompass-success/20 text-coompass-success" 
                    : "hover:bg-muted"
                }`}
                onClick={() => setActiveTab("balance")}
              >
                {t("Total Balance")}
              </button>
              <button 
                className={`h-8 px-4 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "digitalcoins" 
                    ? "bg-coompass-success/20 text-coompass-success" 
                    : "hover:bg-muted"
                }`}
                onClick={() => setActiveTab("digitalcoins")}
              >
                {t("My Digital Coins")}
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
            <CreateToken />
            <ClaimRewards />
          </div>
        </div>
        
        <div className="mt-6">
          <TransactionsList activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
