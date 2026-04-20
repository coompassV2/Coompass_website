
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeRangeSelector } from "@/components/chart/TimeRangeSelector";
import { filterTransactions } from "@/utils/transactions";
import { useChartData } from "@/hooks/useChartData";
import { WalletChart } from "./WalletChart";
import { WalletOverviewHeader } from "./WalletOverviewHeader";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

interface WalletOverviewProps {
  activeTab: string;
}

export function WalletOverview({ activeTab }: WalletOverviewProps) {
  const [selectedDays, setSelectedDays] = useState(7);
  const { theme } = useTheme();
  const isLight = theme === "light";
  
  const allTransactions = filterTransactions("balance", "all");
  const { chartData, totalValues } = useChartData(allTransactions, selectedDays, activeTab);
  
  const getTitle = () => {
    switch (activeTab) {
      case "balance":
        return "Total Balance";
      case "digitalcoins":
        return "My Digital Coins";
      case "donations":
        return "My Donations";
      default:
        return "Total Balance";
    }
  };

  const getTotalValue = () => {
    switch (activeTab) {
      case "balance":
        return `$${totalValues.balance.toFixed(2)}`;
      case "digitalcoins":
        return `$${totalValues.digitalcoins.toFixed(2)}`;
      case "donations":
        return `$${totalValues.donations.toFixed(2)}`;
      default:
        return `$${totalValues.balance.toFixed(2)}`;
    }
  };

  return (
    <Card className={cn(
      "mb-6",
      isLight ? "bg-white/80 backdrop-blur-sm" : "glass-card bg-black/30"
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>
          <WalletOverviewHeader 
            title={getTitle()} 
            value={getTotalValue()} 
          />
        </CardTitle>
        <div className="flex items-center">
          <TimeRangeSelector
            selectedDays={selectedDays}
            onSelectedDaysChange={setSelectedDays}
          />
        </div>
      </CardHeader>
      <CardContent>
        <WalletChart chartData={chartData} />
      </CardContent>
    </Card>
  );
}
