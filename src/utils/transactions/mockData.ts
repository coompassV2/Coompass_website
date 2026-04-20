
import { Transaction } from './types';

export const mockTransactions: Transaction[] = [
  {
    id: "t1",
    amount: "125.00",
    date: "2025-05-01",
    type: "donation",
    status: "completed",
    description: "Monthly donation to Wildlife Fund",
    recipient: "Wildlife Conservation Fund",
    sender: "John Doe",
    currency: "USD",
  },
  {
    id: "t2",
    amount: "75.50",
    date: "2025-04-28",
    type: "volunteer-reward",
    status: "completed",
    description: "Reward for 10 volunteer hours",
    recipient: "Jane Smith",
    sender: "Green Earth Initiative",
    currency: "USD",
  },
  {
    id: "t3",
    amount: "500.00",
    date: "2025-04-25",
    type: "grant",
    status: "pending",
    description: "Community garden project grant",
    recipient: "Urban Gardens Nonprofit",
    sender: "City Sustainability Fund",
    currency: "USD",
  },
  {
    id: "t4",
    amount: "250.00",
    date: "2025-04-20",
    type: "donation",
    status: "completed",
    description: "Corporate matching donation",
    recipient: "Clean Water Access",
    sender: "TechCorp Inc.",
    currency: "USD",
  },
  {
    id: "t5",
    amount: "100.00",
    date: "2025-04-15",
    type: "volunteer-reward",
    status: "processing",
    description: "Beach cleanup volunteer incentive",
    recipient: "Michael Johnson",
    sender: "Ocean Protectors",
    currency: "USD",
  }
];

// Export the transactions so they can be imported elsewhere
export { mockTransactions as transactions };
