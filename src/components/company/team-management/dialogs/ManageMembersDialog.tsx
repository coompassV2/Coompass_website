
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Team, TeamMember } from "../types";

interface ManageMembersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  team: Team | null;
  availableEmployees: TeamMember[];
  onAddMember: (teamId: number, member: TeamMember) => void;
  onRemoveMember: (teamId: number, memberId: number) => void;
}

export function ManageMembersDialog({
  isOpen,
  onClose,
  team,
  availableEmployees,
  onAddMember,
  onRemoveMember
}: ManageMembersDialogProps) {
  const { t } = useTranslation();

  if (!team) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t('Manage Team Members')}</DialogTitle>
          <DialogDescription>
            {t('Add or remove members from')} {team.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">{t('Current Members')}</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {team.members.map((member) => (
                <div key={member.id} className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`} />
                      <AvatarFallback>{member.avatar}</AvatarFallback>
                    </Avatar>
                    <span>{member.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onRemoveMember(team.id, member.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-100/20"
                  >
                    {t('Remove')}
                  </Button>
                </div>
              ))}
              {team.members.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  {t('No members in this team yet')}
                </p>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">{t('Available Employees')}</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {availableEmployees.map((employee) => (
                <div key={employee.id} className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${employee.name}`} />
                      <AvatarFallback>{employee.avatar}</AvatarFallback>
                    </Avatar>
                    <span>{employee.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onAddMember(team.id, employee)}
                    className="text-coompass-success hover:text-coompass-success hover:bg-coompass-success/20"
                  >
                    {t('Add')}
                  </Button>
                </div>
              ))}
              {availableEmployees.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  {t('No available employees to add')}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>
            {t('Done')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
