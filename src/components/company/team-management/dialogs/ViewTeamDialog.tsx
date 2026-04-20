
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import { Team } from "../types";
import { formatDatePt } from "@/lib/dateFormat";

interface ViewTeamDialogProps {
  isOpen: boolean;
  onClose: () => void;
  team: Team | null;
}

export function ViewTeamDialog({ isOpen, onClose, team }: ViewTeamDialogProps) {
  const { t } = useTranslation();

  if (!team) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-coompass-success" />
            {team.name}
          </DialogTitle>
          <DialogDescription>
            {team.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <div>
            <h3 className="text-sm font-medium mb-2">{t('Team Members')} ({team.members.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {team.members.map((member) => (
                <div key={member.id} className="flex items-center p-2 bg-muted/50 rounded-md">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`} />
                    <AvatarFallback>{member.avatar}</AvatarFallback>
                  </Avatar>
                  <span>{member.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">{t('Active Missions')} ({team.activeMissions})</h3>
            {team.activeMissions > 0 ? (
              <div className="space-y-2">
                {Array(team.activeMissions).fill(0).map((_, i) => (
                  <div key={i} className="p-2 bg-muted/50 rounded-md">
                    <div className="font-medium">{t('Mission')} {i + 1}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDatePt(new Date(Date.now() + i * 86400000))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {t('No active missions for this team.')}
              </p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>
            {t('Close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
