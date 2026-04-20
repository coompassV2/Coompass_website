import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { filterTransactions } from "@/utils/transactions";
import { useLocation } from "react-router-dom";

export function BalanceCards() {
  const location = useLocation();
  const pathName = location.pathname;
  
  // Get all transactions
  const allTransactions = filterTransactions("balance", "all");
  
  // Calculate totals from transactions
  let digitalCoinsTotal = 0;
  let donationsTotal = 0;

  allTransactions.forEach(tx => {
    const amount = typeof tx.amount === 'string' 
      ? parseFloat(tx.amount.replace(/[^0-9.-]+/g, ""))
      : tx.amount;
    
    if (tx.type === "digitalcoins") {
      digitalCoinsTotal += amount;
    } else if (tx.type === "donations") {
      donationsTotal += amount;
    }
  });

  // Calculate total balance
  const totalBalance = digitalCoinsTotal - donationsTotal;
  const isTotalBalancePositive = totalBalance >= 0;

  // Define persona-specific cards
  if (pathName.includes('/company/')) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="py-3 px-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Corporate Funds</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">${(totalBalance + 25000).toFixed(2)}</span>
                <div className="flex items-center px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+3.2%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="py-3 px-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Donations Made</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">${(donationsTotal + 15750).toFixed(2)}</span>
                <div className="flex items-center px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+18.3%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-3 px-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active Grants</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">${(digitalCoinsTotal + 9250).toFixed(2)}</span>
                <div className="flex items-center px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+5.7%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } 
  else if (pathName.includes('/nonprofit/')) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="py-3 px-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Organization Funds</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">${(totalBalance + 12450).toFixed(2)}</span>
                <div className="flex items-center px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+8.4%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="py-3 px-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Received Donations</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">${(donationsTotal + 8920).toFixed(2)}</span>
                <div className="flex items-center px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+12.6%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  else {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="py-3 px-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">My Balance</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">${totalBalance.toFixed(2)}</span>
                <div className={`flex items-center px-2 py-1 rounded-full ${isTotalBalancePositive ? 'bg-green-100 dark:bg-green-900/30 text-green-500' : 'bg-red-100 dark:bg-red-900/30 text-red-500'} text-xs`}>
                  {isTotalBalancePositive ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  <span>{isTotalBalancePositive ? '+10.5%' : '-0.02%'}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="py-3 px-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">My Earned Tokens</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">${digitalCoinsTotal.toFixed(2)}</span>
                <div className="flex items-center px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+24.8%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-3 px-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">My Donations</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">${donationsTotal.toFixed(2)}</span>
                <div className="flex items-center px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+12.5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
