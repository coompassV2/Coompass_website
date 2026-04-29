
export interface Application {
  id: string;
  projectTitle: string;
  organization: string;
  submittedDate: string;
  location: string;
  budget: string;
  estimatedHours: number;
  status: "pending" | "shortlisted" | "rejected";
  coverLetter?: string;
  projectDetails?: string;
}

export interface ApplicationDetailsDialogProps {
  application: Application | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (application: Application) => void;
  onWithdraw: (application: Application) => void;
}

export interface WithdrawDialogProps {
  application: Application | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}
