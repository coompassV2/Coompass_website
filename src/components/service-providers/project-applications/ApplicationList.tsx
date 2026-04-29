
import { useState } from "react";
import { ApplicationCard } from "./ApplicationCard";
import { ApplicationDetailsDialog } from "./ApplicationDetailsDialog";
import { WithdrawDialog } from "./WithdrawDialog";
import { Application } from "./types";

interface ApplicationListProps {
  applications: Application[];
  onWithdrawApplication: (applicationId: string) => void;
  onEditApplication: (application: Application) => void;
}

export function ApplicationList({
  applications,
  onWithdrawApplication,
  onEditApplication
}: ApplicationListProps) {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setShowDetailsDialog(true);
  };

  const handleWithdrawApplication = (application: Application) => {
    setSelectedApplication(application);
    setShowWithdrawDialog(true);
  };

  const confirmWithdrawApplication = () => {
    if (!selectedApplication) return;
    
    onWithdrawApplication(selectedApplication.id);
    setShowWithdrawDialog(false);
  };

  return (
    <>
      <div className="space-y-6">
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onViewDetails={handleViewDetails}
            onEdit={onEditApplication}
            onWithdraw={handleWithdrawApplication}
          />
        ))}
      </div>

      {/* Application Details Dialog */}
      <ApplicationDetailsDialog
        application={selectedApplication}
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        onEdit={onEditApplication}
        onWithdraw={handleWithdrawApplication}
      />

      {/* Withdraw Application Dialog */}
      <WithdrawDialog
        application={selectedApplication}
        open={showWithdrawDialog}
        onOpenChange={setShowWithdrawDialog}
        onConfirm={confirmWithdrawApplication}
      />
    </>
  );
}
