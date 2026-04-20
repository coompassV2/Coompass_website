
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Calendar, Users, ChevronUp } from "lucide-react";
import { Mission } from "@/types/organization";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MissionParticipantsDropup } from "./MissionParticipantsDropup";
import { useState } from "react";

interface MissionDetailsDialogProps {
  mission: Mission | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MissionDetailsDialog({ mission, isOpen, onClose }: MissionDetailsDialogProps) {
  const { t } = useTranslation();
  const [showParticipants, setShowParticipants] = useState(false);

  if (!mission) return null;

  // Mock participants data
  const participants = [
    { id: 1, name: "John Smith", avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=40&h=40&fit=crop&crop=face" },
    { id: 2, name: "Alice Johnson", avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=40&h=40&fit=crop&crop=face" },
    { id: 3, name: "Bob Wilson", avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=40&h=40&fit=crop&crop=face" },
    { id: 4, name: "Carol Davis", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face" },
    { id: 5, name: "Dave Miller", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
    { id: 6, name: "Eva Brown", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{mission.title}</DialogTitle>
          <DialogDescription asChild>
            <Link 
              to={`/organizations/${mission.organization.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-coompass-primary hover:underline cursor-pointer"
            >
              {mission.organization}
            </Link>
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <Badge className={mission.isActive ? 
                  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : 
                  "bg-red-500/10 text-red-500"
                }>
                  {mission.isActive ? t("Active") : t("Finished")}
                </Badge>
                <Badge className={mission.location === "Remote" ? 
                  "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" : 
                  "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                }>
                  {mission.location}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{t("Posted")} {mission.postedDate}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">{t("Description")}</h3>
              <p className="text-sm">{mission.description}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">{t("Required Skills")}</h3>
              <div className="flex flex-wrap gap-2">
                {(mission.skills ?? []).length > 0 ? (
                  (mission.skills ?? []).map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="bg-blue-500/10 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">{t("No skills specified.")}</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">{t("Causes")}</h3>
              <div className="flex flex-wrap gap-2">
                {(mission.causes ?? []).length > 0 ? (
                  (mission.causes ?? []).map((cause, idx) => (
                    <Badge key={idx} variant="outline">
                      {cause}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">{t("No causes specified.")}</p>
                )}
              </div>
            </div>

            {/* Active Participants Section */}
            <div className="relative">
              <h3 className="font-medium mb-2">{t("Active Participants")}</h3>
              <div 
                className="bg-muted/30 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setShowParticipants(!showParticipants)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {participants.slice(0, 4).map((participant) => (
                        <img
                          key={participant.id}
                          src={participant.avatar}
                          alt={participant.name}
                          className="w-8 h-8 rounded-full border-2 border-background"
                        />
                      ))}
                      {participants.length > 4 && (
                        <div className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium">
                          +{participants.length - 4}
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium">
                      {participants.length} {t("participants")}
                    </span>
                  </div>
                  <ChevronUp className={`h-4 w-4 transition-transform ${showParticipants ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Participants Dropdown */}
              <MissionParticipantsDropup 
                participants={participants}
                isOpen={showParticipants}
                onClose={() => setShowParticipants(false)}
              />
            </div>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium mb-4">{t("Mission Details")}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <h4 className="text-xs text-muted-foreground">{t("Location")}</h4>
                  <p className="text-sm">{mission.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <h4 className="text-xs text-muted-foreground">{t("Hours")}</h4>
                  <p className="text-sm">{mission.hours} {t("hours")}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <h4 className="text-xs text-muted-foreground">{t("Volunteers")}</h4>
                  <p className="text-sm">{mission.volunteers} {t("needed")}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <h4 className="text-xs text-muted-foreground">{t("Posted")}</h4>
                  <p className="text-sm">{mission.postedDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          {mission.isActive && (
            <Button onClick={onClose} className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
              {t("Apply Now")}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
