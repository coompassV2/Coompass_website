
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Organization } from "@/types/organization";
import { Card, CardContent } from "@/components/ui/card";
import { GoalBadge } from "./GoalBadge";
import { Badge } from "@/components/ui/badge";
import { SDGs } from "@/data/sdgs";
import { BadgeCheck } from "lucide-react";

interface OrganizationInfoDialogProps {
  organization: Organization | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OrganizationInfoDialog = ({
  organization,
  open,
  onOpenChange,
}: OrganizationInfoDialogProps) => {
  if (!organization) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <img
              src={`https://api.dicebear.com/7.x/shapes/svg?seed=${organization.id}`}
              alt={organization.name}
              className="h-10 w-10 rounded-lg"
            />
            <DialogTitle className="text-xl">{organization.name}</DialogTitle>
            {organization.isVerified && (
              <BadgeCheck className="h-5 w-5 text-green-500" />
            )}
          </div>
          <DialogDescription>
            {organization.category && (
              <Badge variant="outline" className="mt-2">
                {organization.category}
              </Badge>
            )}
            {organization.country && (
              <Badge variant="outline" className="mt-2 ml-2">
                {organization.country}
              </Badge>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-2">About</h3>
              <p className="text-muted-foreground">{organization.description}</p>
            </CardContent>
          </Card>

          {organization.activeMissions !== undefined && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Mission Activity</h3>
                <p className="text-muted-foreground">
                  This organization has <span className="font-semibold">{organization.activeMissions}</span> active missions.
                </p>
              </CardContent>
            </Card>
          )}

          {organization.goals && organization.goals.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Sustainable Development Goals</h3>
                <div className="flex flex-wrap gap-2">
                  {organization.goals.map((goalId) => {
                    const goalDetails = SDGs.find(sdg => sdg.id === goalId);
                    return (
                      <div key={goalId} className="flex flex-col items-center">
                        <GoalBadge goal={goalId} />
                        {goalDetails && (
                          <span className="text-xs text-center mt-1">
                            {goalDetails.name}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {organization.tags && organization.tags.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Service Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {organization.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
