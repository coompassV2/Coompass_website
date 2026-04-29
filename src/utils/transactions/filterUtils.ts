
import { TransactionItem } from './types';
import { mockTransactions as transactions } from './mockData';

// Get the title based on the active tab
export const getTransactionsTitle = (activeTab: string): string => {
  switch (activeTab) {
    case "balance":
      return "All Transactions";
    case "digitalcoins":
      return "Digital Coins Transactions";
    case "donations":
      return "Donation Transactions";
    default:
      return "All Transactions";
  }
};

// Filter transactions based on active tab and filter button
export const filterTransactions = (activeTab: string, activeFilter: string): TransactionItem[] => {
  return transactions.filter(tx => {
    // First filter by tab
    if (activeTab === "balance") {
      // Show all transactions for Total Balance
      if (activeFilter === "all") return true;
      if (activeFilter === "received") return tx.status === "Received";
      if (activeFilter === "spent") return tx.status === "Spent";
    } else if (activeTab === "digitalcoins") {
      // Show only digital coins transactions
      if (tx.type !== "digitalcoins") return false;
      if (activeFilter === "all") return true;
      if (activeFilter === "received") return tx.status === "Received";
      if (activeFilter === "spent") return tx.status === "Spent";
    } else if (activeTab === "donations") {
      // Show only donations transactions
      if (tx.type !== "donations" && tx.type !== "donation") return false;
      if (activeFilter === "all") return true;
      if (activeFilter === "received") return tx.status === "Received";
      if (activeFilter === "spent") return tx.status === "Spent";
    }
    return true;
  });
};
