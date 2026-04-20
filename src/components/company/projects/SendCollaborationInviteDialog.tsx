
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { Building2, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { CollaborationInviteData } from "./types";

interface SendCollaborationInviteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  organizationName: string | null;
  onSendInvite: (inviteData: CollaborationInviteData) => void;
}

export function SendCollaborationInviteDialog({ 
  isOpen, 
  onClose, 
  organizationName,
  onSendInvite
}: SendCollaborationInviteDialogProps) {
  const { t } = useTranslation();
  const [inviteData, setInviteData] = useState({
    projectTitle: "",
    collaborationType: "",
    message: "",
    timeline: "",
    budget: ""
  });

  const collaborationTypes = [
    { value: "project-partnership", label: t('Project Partnership') },
    { value: "resource-sharing", label: t('Resource Sharing') },
    { value: "volunteer-program", label: t('Volunteer Program') },
    { value: "funding-support", label: t('Funding Support') },
    { value: "skill-sharing", label: t('Skill Sharing') }
  ];

  const timelineOptions = [
    { value: "immediate", label: t('Immediate (1-2 weeks)') },
    { value: "short-term", label: t('Short-term (1-3 months)') },
    { value: "medium-term", label: t('Medium-term (3-6 months)') },
    { value: "long-term", label: t('Long-term (6+ months)') }
  ];

  const handleSend = () => {
    const completeInviteData = {
      ...inviteData,
      organizationName,
      sentDate: new Date().toISOString(),
      status: "pending"
    };
    
    onSendInvite(completeInviteData);
    
    // Reset form
    setInviteData({
      projectTitle: "",
      collaborationType: "",
      message: "",
      timeline: "",
      budget: ""
    });
    
    onClose();
  };

  const handleCancel = () => {
    // Reset form
    setInviteData({
      projectTitle: "",
      collaborationType: "",
      message: "",
      timeline: "",
      budget: ""
    });
    onClose();
  };

  if (!organizationName) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="w-10 h-10 rounded-md">
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                <Building2 className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{t('Send Collaboration Invite')}</h2>
              <p className="text-sm text-muted-foreground">{t('to')} {organizationName}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="projectTitle">{t('Project Title')}</Label>
            <Input
              id="projectTitle"
              placeholder={t('Enter the project or collaboration title')}
              value={inviteData.projectTitle}
              onChange={(e) => setInviteData(prev => ({ ...prev, projectTitle: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="collaborationType">{t('Collaboration Type')}</Label>
            <Select 
              value={inviteData.collaborationType} 
              onValueChange={(value) => setInviteData(prev => ({ ...prev, collaborationType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('Select collaboration type')} />
              </SelectTrigger>
              <SelectContent>
                {collaborationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timeline">{t('Timeline')}</Label>
              <Select 
                value={inviteData.timeline} 
                onValueChange={(value) => setInviteData(prev => ({ ...prev, timeline: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('Select timeline')} />
                </SelectTrigger>
                <SelectContent>
                  {timelineOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="budget">{t('Budget Range (Optional)')}</Label>
              <Input
                id="budget"
                placeholder={t('Ex: €5.000 - €10.000')}
                value={inviteData.budget}
                onChange={(e) => setInviteData(prev => ({ ...prev, budget: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="message">{t('Collaboration Message')}</Label>
            <Textarea
              id="message"
              placeholder={t('Describe your collaboration proposal, goals, and how this partnership would benefit both organizations...')}
              value={inviteData.message}
              onChange={(e) => setInviteData(prev => ({ ...prev, message: e.target.value }))}
              className="min-h-[120px]"
            />
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">{t('What happens next?')}</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• {t('Your invite will be sent to the organization')}</li>
              <li>• {t('They will review your proposal and respond within 5-7 business days')}</li>
              <li>• {t('You will receive a notification when they respond')}</li>
              <li>• {t('If accepted, you can start planning the collaboration details')}</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleCancel}>
            {t('Cancel')}
          </Button>
          <Button 
            onClick={handleSend}
            disabled={!inviteData.projectTitle || !inviteData.collaborationType || !inviteData.message}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
          >
            <Send className="h-4 w-4 mr-2" />
            {t('Send Invite')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
