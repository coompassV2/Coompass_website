
import { TransactionItem } from "./types";

/**
 * Gets a user-friendly description of the transaction type
 */
export const getTypeDescription = (transaction: TransactionItem): string => {
  if (transaction.type === "digitalcoins") {
    return "Digital Coins earned from mission";
  } else if (transaction.type === "donations") {
    return "Donation to organization";
  } else {
    return "Transaction";
  }
};
