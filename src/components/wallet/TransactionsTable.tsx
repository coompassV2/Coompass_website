
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { TransactionItem } from "@/utils/transactionUtils";
import { TransactionRow } from "./TransactionRow";

interface TransactionsTableProps {
  transactions: TransactionItem[];
  activeTab: string;
  personaType: 'company' | 'nonprofit' | 'volunteer';
}

export function TransactionsTable({ transactions, activeTab, personaType }: TransactionsTableProps) {
  const { theme } = useTheme();
  const isLightMode = theme === "light";

  // Customize empty state messages based on persona and active tab
  const getEmptyStateMessage = () => {
    if (personaType === 'company') {
      switch (activeTab) {
        case "donations": return "No donations have been made yet";
        case "grants": return "No grant programs are currently active";
        case "impact": return "No impact metrics are available yet";
        default: return "No transactions found for the selected filters";
      }
    } 
    else if (personaType === 'nonprofit') {
      switch (activeTab) {
        case "donations": return "No donations have been received yet";
        case "grants": return "No grants have been applied for or received";
        case "campaigns": return "No fundraising campaigns are active";
        default: return "No transactions found for the selected filters";
      }
    }
    else {
      // volunteer
      switch (activeTab) {
        case "tokens": return "No tokens have been earned yet";
        case "rewards": return "No rewards have been claimed yet";
        case "donations": return "No donations have been made yet";
        default: return "No transactions found for the selected filters";
      }
    }
  };

  return (
    <div className={cn(
      "rounded-lg overflow-hidden border border-border shadow-sm",
      isLightMode ? "shadow-md" : ""
    )}>
      <table className={cn(
        "w-full",
        isLightMode 
          ? "bg-white" 
          : "bg-black/20 backdrop-blur-sm"
      )}>
        <thead>
          <tr className={cn(
            "border-b border-border",
            isLightMode ? "bg-gray-50" : ""
          )}>
            <th className={cn(
              "text-left py-3 px-4 text-xs font-medium",
              isLightMode ? "text-gray-700" : "text-muted-foreground"
            )}>
              Description
            </th>
            <th className={cn(
              "text-left py-3 px-4 text-xs font-medium",
              isLightMode ? "text-gray-700" : "text-muted-foreground"
            )}>
              Status
            </th>
            <th className={cn(
              "text-left py-3 px-4 text-xs font-medium",
              isLightMode ? "text-gray-700" : "text-muted-foreground"
            )}>
              Date
            </th>
            <th className={cn(
              "text-left py-3 px-4 text-xs font-medium",
              isLightMode ? "text-gray-700" : "text-muted-foreground"
            )}>
              Amount
            </th>
            <th className={cn(
              "text-left py-3 px-4 text-xs font-medium",
              isLightMode ? "text-gray-700" : "text-muted-foreground"
            )}>
              Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <TransactionRow 
                key={tx.id} 
                transaction={tx} 
                isLightMode={isLightMode}
                personaType={personaType}
                activeTab={activeTab}
              />
            ))
          ) : (
            <tr className={cn(
              isLightMode ? "text-gray-700" : ""
            )}>
              <td colSpan={5} className="py-8 text-center text-muted-foreground">
                {getEmptyStateMessage()}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
