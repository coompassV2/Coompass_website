
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionsFilter } from "./TransactionsFilter";
import { TransactionsTable } from "./TransactionsTable";
import { filterTransactions } from "@/utils/transactions";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

export function TransactionsList({ activeTab }: { activeTab: string }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const { theme } = useTheme();
  const isLightMode = theme === "light";
  const location = useLocation();
  const pathName = location.pathname;
  const isNonprofitPath = pathName.includes('/nonprofit/');
  const isCompanyPath = pathName.includes('/company/');
  const isVolunteerPath = pathName.includes('/volunteer/');
  
  const filteredTransactions = filterTransactions(activeTab, activeFilter);

  // Define persona-specific titles
  const getTitle = () => {
    if (isCompanyPath) {
      return "All Transactions";
    } 
    else if (isNonprofitPath) {
      return "All Transactions";
    }
    else if (isVolunteerPath) {
      return "All Transactions";
    }
    else {
      // Default fallback
      switch (activeTab) {
        case "balance": return "Transaction History";
        case "tokens": return "Earned Tokens History";
        case "rewards": return "Rewards Redemption";
        case "donations": return "My Donations History";
        default: return "Transaction History";
      }
    }
  };

  const title = getTitle();

  return (
    <Card className={cn(
      "w-full border-0 shadow-none",
      isLightMode ? "bg-transparent" : "bg-transparent"
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-0">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {!isNonprofitPath && !isCompanyPath && !isVolunteerPath && (
          <TransactionsFilter 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter} 
          />
        )}
      </CardHeader>
      <CardContent className="px-0">
        <TransactionsTable 
          transactions={filteredTransactions} 
          activeTab={activeTab}
          personaType={pathName.includes('/company/') ? 'company' : 
                      (isNonprofitPath ? 'nonprofit' : 'volunteer')}
        />
      </CardContent>
    </Card>
  );
}
