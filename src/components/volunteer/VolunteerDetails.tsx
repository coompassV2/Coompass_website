import { ScoreCard } from "@/components/ScoreCard";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSessionMode } from "@/hooks/useSessionMode";
import { useVolunteerData } from "@/hooks/useVolunteerData";

export function VolunteerDetails() {
  const [certificateOpen, setCertificateOpen] = useState(false);
  const { isDemo, userId } = useSessionMode();
  const { volunteerData } = useVolunteerData(userId);
  
  const handleOpenCertificate = () => {
    setCertificateOpen(true);
  };

  // Demo data for showcase
  const demoHours = 38;
  
  // Use demo hours if in demo mode, real hours if authenticated
  const displayHours = isDemo ? demoHours : (volunteerData?.volunteer_hours || 0);

  return (
    <div className="space-y-6">
      {/* Certificate Request Dialog */}
      <Dialog open={certificateOpen} onOpenChange={setCertificateOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="p-4 text-center">
            <h2 className="text-xl font-bold mb-4">Request Volunteer Certificate</h2>
            <p className="mb-6">You can request an official certificate for your {displayHours} hours of volunteer work.</p>
            <div className="flex justify-center">
              <img 
                src="https://api.dicebear.com/7.x/shapes/svg?seed=certificate"
                alt="Certificate"
                className="w-64 h-64 mb-4"
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              This certificate will be sent to your registered email within 24-48 hours.
            </p>
            <Button>Request Certificate</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
