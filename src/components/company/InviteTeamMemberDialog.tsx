
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, UserPlus } from "lucide-react";

interface InviteTeamMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteTeamMemberDialog({ isOpen, onClose }: InviteTeamMemberDialogProps) {
  const { t } = useTranslation();
  const [inviteData, setInviteData] = useState({
    email: "",
    name: "",
    role: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { value: "admin", label: t("Administrator") },
    { value: "team_lead", label: t("Team Lead") },
    { value: "member", label: t("Team Member") }
  ];

  const handleInputChange = (field: string, value: string) => {
    setInviteData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendInvite = async () => {
    if (!inviteData.email || !inviteData.name || !inviteData.role) {
      toast.error(t("Please fill in all required fields"));
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(t("Invitation sent successfully to {{email}}", { email: inviteData.email }));
      
      // Reset form
      setInviteData({
        email: "",
        name: "",
        role: "",
        message: ""
      });
      
      onClose();
    } catch (error) {
      toast.error(t("Failed to send invitation"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            {t('Invite Team Member')}
          </DialogTitle>
          <DialogDescription>
            {t('Send an invitation to join your company team')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inviteName">{t('Full Name')} *</Label>
              <Input
                id="inviteName"
                placeholder={t('Enter full name')}
                value={inviteData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inviteEmail">{t('Email Address')} *</Label>
              <Input
                id="inviteEmail"
                type="email"
                placeholder={t('Enter email address')}
                value={inviteData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inviteRole">{t('Role')} *</Label>
            <Select value={inviteData.role} onValueChange={(value) => handleInputChange('role', value)}>
              <SelectTrigger>
                <SelectValue placeholder={t('Select a role')} />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inviteMessage">{t('Personal Message')} ({t('Optional')})</Label>
            <Textarea
              id="inviteMessage"
              placeholder={t('Add a personal message to the invitation...')}
              value={inviteData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
            <Mail className="h-4 w-4" />
            <span>{t('An invitation email will be sent to the provided address')}</span>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {t('Cancel')}
          </Button>
          <Button onClick={handleSendInvite} disabled={isLoading}>
            {isLoading ? t('Sending...') : t('Send Invitation')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
