
import { useMemo } from 'react';
import { TransactionItem } from '@/utils/transactions';
import { parseTxDate } from '@/utils/transactions';
import { formatDayMonthPt, toISODateKey } from '@/lib/dateFormat';

// Calculate the balances and totals for the chart
export function useChartData(transactions: TransactionItem[], days: number, activeTab: string) {
  const chartData = useMemo(() => {
    const now = new Date();
    const startDate = new Date();
    
    // Set the start date based on the selected period
    if (days === 30) {
      startDate.setDate(now.getDate() - 30);
    } else if (days === 90) {
      startDate.setDate(now.getDate() - 90);
    } else {
      startDate.setDate(now.getDate() - 7); // Default to 7 days
    }
    
    const dataMap = new Map<string, { label: string; balance: number; digitalcoins: number; donations: number }>();
    
    // Initialize days in the date range
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateKey = toISODateKey(date);
      dataMap.set(dateKey, {
        label: formatDayMonthPt(date),
        balance: 0,
        digitalcoins: 0,
        donations: 0,
      });
    }
    
    // Process transactions
    let runningBalance = 0;
    const sortedTransactions = [...transactions].sort((a, b) => {
      const dateA = parseTxDate(a.date);
      const dateB = parseTxDate(b.date);
      return dateA.getTime() - dateB.getTime();
    });
    
    sortedTransactions.forEach(tx => {
      if (!tx.date) return;
      
      const txDate = parseTxDate(tx.date);
      if (txDate < startDate) return;
      
      const dateKey = toISODateKey(txDate);
      // Convert amount to number regardless of its type
      const amount = typeof tx.amount === 'string'
        ? parseFloat(tx.amount.replace(/[^0-9.-]+/g, ""))
        : tx.amount;
      
      if (dataMap.has(dateKey)) {
        const data = dataMap.get(dateKey);
        if (!data) return;
        
        if (tx.type === "digitalcoins") {
          data.digitalcoins += amount;
          runningBalance += amount;
        } else if (tx.type === "donations") {
          data.donations += amount;
          runningBalance -= amount;
        }
        
        data.balance = runningBalance;
        dataMap.set(dateKey, data);
      }
    });
    
    // Convert map to sorted array by ISO key (safe lexicographic date sorting)
    return Array.from(dataMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, values]) => ({
        time: values.label,
        balance: values.balance,
        digitalcoins: values.digitalcoins,
        donations: values.donations,
      }));
  }, [transactions, days]);

  // Generate the correct data based on active tab
  const tabChartData = useMemo(() => {
    if (chartData.length === 0) return [];
    
    return chartData.map(item => ({
      time: item.time,
      value: activeTab === "balance" ? item.balance :
             activeTab === "digitalcoins" ? item.digitalcoins :
             activeTab === "donations" ? item.donations : item.balance
    }));
  }, [chartData, activeTab]);

  // Calculate total values
  const totalValues = useMemo(() => {
    let digitalCoinsTotal = 0;
    let donationsTotal = 0;

    transactions.forEach(tx => {
      // Convert amount to number regardless of its type
      const amount = typeof tx.amount === 'string'
        ? parseFloat(tx.amount.replace(/[^0-9.-]+/g, ""))
        : tx.amount;
        
      if (tx.type === "digitalcoins") {
        digitalCoinsTotal += amount;
      } else if (tx.type === "donations") {
        donationsTotal += amount;
      }
    });

    return {
      digitalcoins: digitalCoinsTotal,
      donations: donationsTotal,
      balance: digitalCoinsTotal - donationsTotal
    };
  }, [transactions]);

  return { chartData: tabChartData, totalValues };
}
