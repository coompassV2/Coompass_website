
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Award, MessageCircle, Mail, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Employee } from "./types";
import { getAvatarUrl, getInitials } from "@/utils/avatarUtils";
import { OneOnOneChatDialog } from "./OneOnOneChatDialog";

interface VolunteerDialogProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VolunteerDialog({ employee, isOpen, onClose }: VolunteerDialogProps) {
  const { t } = useTranslation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleContactClick = () => {
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  if (!employee) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={getAvatarUrl(employee.name)} alt={employee.name} />
                <AvatarFallback className="text-lg">{getInitials(employee.name)}</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-xl">{employee.name}</DialogTitle>
                <p className="text-muted-foreground">{t('Volunteer')}</p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Status badges */}
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-green-500/20 text-green-700">
                {t('Active')}
              </Badge>
              <Badge variant="outline">{t('Team Member')}</Badge>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-coompass-success">{employee.activeMissions}</div>
                <div className="text-sm text-muted-foreground">{t('Active Missions')}</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-coompass-success">{employee.completeMissions}</div>
                <div className="text-sm text-muted-foreground">{t('Completed')}</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-coompass-success">{employee.volunteerHours}</div>
                <div className="text-sm text-muted-foreground">{t('Total Hours')}</div>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="text-sm text-muted-foreground">{t('Joined')}: </span>
                  <span>{employee.joinDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="text-sm text-muted-foreground">{t('Last Login')}: </span>
                  <span>{employee.lastLogin}</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="font-medium mb-3">{t('Skills')}</h4>
              <div className="flex flex-wrap gap-2">
                {(employee.skills?.length ?? 0) > 0 ? (
                  employee.skills!.map((skill) => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">{t('No skills listed')}</span>
                )}
              </div>
            </div>

            {/* Causes */}
            <div>
              <h4 className="font-medium mb-3">{t('Causes')}</h4>
              <div className="flex flex-wrap gap-2">
                {(employee.causes?.length ?? 0) > 0 ? (
                  employee.causes!.map((cause) => (
                    <Badge key={cause} variant="outline">{cause}</Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">{t('No causes listed')}</span>
                )}
              </div>
            </div>

            {/* Recent activity */}
            <div>
              <h4 className="font-medium mb-3">{t('Recent Activity')}</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4 text-coompass-success" />
                  <span>{t('Completed Beach Cleanup mission')}</span>
                  <span className="text-muted-foreground">2 days ago</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-coompass-success" />
                  <span>{t('Joined Food Bank volunteering')}</span>
                  <span className="text-muted-foreground">1 week ago</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleContactClick}
                className="flex-1 bg-coompass-success hover:bg-coompass-success/90"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {t('Contact')}
              </Button>
              <Button variant="outline" className="flex-1">
                <Mail className="h-4 w-4 mr-2" />
                {t('Send Email')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 1:1 Chat Dialog */}
      <OneOnOneChatDialog
        employee={employee}
        isOpen={isChatOpen}
        onClose={handleChatClose}
      />
    </>
  );
}
