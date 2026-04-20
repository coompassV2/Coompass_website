import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus, UserPlus } from "lucide-react";
import { getInitials } from "@/utils/avatarUtils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteTeamMemberDialog } from "./InviteTeamMemberDialog";
import { AddAdministratorDialog } from "./AddAdministratorDialog";
import { AddTeamLeadDialog } from "./AddTeamLeadDialog";

export function CompanyTeamStructure() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isAddAdminDialogOpen, setIsAddAdminDialogOpen] = useState(false);
  const [isAddTeamLeadDialogOpen, setIsAddTeamLeadDialogOpen] = useState(false);
  
  // Mock team structure data with real photos
  const admins = [
    {
      id: 1,
      name: "Jennifer Williams",
      title: "CSR Director",
      photoUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Volunteering Lead",
      photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];
  
  const teamLeads = [
    {
      id: 3,
      name: "Sofia Martinez",
      title: "Marketing Team Lead",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Alex Chen",
      title: "Tech Team Lead",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "David Wilson",
      title: "Environmental Team Lead",
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const handleInvite = () => {
    setIsInviteDialogOpen(true);
  };

  const handleAddAdministrator = () => {
    setIsAddAdminDialogOpen(true);
  };

  const handleAddTeamLead = () => {
    setIsAddTeamLeadDialogOpen(true);
  };

  const handleManageAllTeamMembers = () => {
    navigate('/company/employees?tab=teams');
  };

  return (
    <>
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{t('Team Structure')}</h2>
          
          <Button size="sm" onClick={handleInvite}>
            <UserPlus className="h-4 w-4 mr-2" />
            {t('Invite')}
          </Button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">{t('Administrators')}</h3>
            
            <div className="space-y-3">
              {admins.map((admin) => (
                <div 
                  key={admin.id} 
                  className="flex items-center p-3 hover:bg-foreground/5 rounded-lg transition-colors"
                >
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={admin.photoUrl} alt={admin.name} />
                    <AvatarFallback>{getInitials(admin.name)}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="font-medium">{admin.name}</div>
                    <div className="text-sm text-muted-foreground">{admin.title}</div>
                  </div>
                </div>
              ))}
              
              <Button 
                variant="ghost" 
                className="w-full border border-dashed border-border hover:border-primary hover:bg-primary/5 h-14"
                onClick={handleAddAdministrator}
              >
                <Plus className="h-4 w-4 mr-2" />
                {t('Add Administrator')}
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">{t('Team Leads')}</h3>
            
            <div className="space-y-3">
              {teamLeads.map((lead) => (
                <div 
                  key={lead.id} 
                  className="flex items-center p-3 hover:bg-foreground/5 rounded-lg transition-colors"
                >
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={lead.photoUrl} alt={lead.name} />
                    <AvatarFallback>{getInitials(lead.name)}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-sm text-muted-foreground">{lead.title}</div>
                  </div>
                </div>
              ))}
              
              <Button 
                variant="ghost" 
                className="w-full border border-dashed border-border hover:border-primary hover:bg-primary/5 h-14"
                onClick={handleAddTeamLead}
              >
                <Plus className="h-4 w-4 mr-2" />
                {t('Add Team Lead')}
              </Button>
            </div>
          </div>
          
          <div className="pt-2">
            <Button variant="outline" className="w-full" onClick={handleManageAllTeamMembers}>
              {t('Manage All Team Members')}
            </Button>
          </div>
        </div>
      </div>

      {/* Invite Team Member Dialog */}
      <InviteTeamMemberDialog
        isOpen={isInviteDialogOpen}
        onClose={() => setIsInviteDialogOpen(false)}
      />

      {/* Add Administrator Dialog */}
      <AddAdministratorDialog
        isOpen={isAddAdminDialogOpen}
        onClose={() => setIsAddAdminDialogOpen(false)}
      />

      {/* Add Team Lead Dialog */}
      <AddTeamLeadDialog
        isOpen={isAddTeamLeadDialogOpen}
        onClose={() => setIsAddTeamLeadDialogOpen(false)}
      />
    </>
  );
}
