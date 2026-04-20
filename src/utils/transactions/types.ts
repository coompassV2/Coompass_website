
// Define the extended types that match what's used in the code
export type TransactionStatus = "pending" | "completed" | "failed" | "Received" | "Spent" | "processing";
export type TransactionType = "credit" | "debit" | "digitalcoins" | "donations" | "donation" | "volunteer-reward" | "grant";

// The base transaction interface
export interface Transaction {
  id: string;
  amount: string; // Changed to string only for consistency
  date: string;
  description: string;
  type: TransactionType;
  status: TransactionStatus;
  icon?: string;
  balance?: string; // Changed to string only for consistency
  category?: string;
  name?: string;
  recipient?: string;
  sender?: string;
  currency?: string;
}

// For compatibility with existing code
export type TransactionItem = Transaction;
