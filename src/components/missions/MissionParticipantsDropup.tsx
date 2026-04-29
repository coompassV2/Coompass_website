
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { getInitials } from "@/utils/avatarUtils";

interface Participant {
  id: number;
  name: string;
  avatar: string;
}

interface MissionParticipantsDropupProps {
  participants: Participant[];
  isOpen: boolean;
  onClose: () => void;
}

export function MissionParticipantsDropup({ participants, isOpen, onClose }: MissionParticipantsDropupProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleParticipantClick = (participantId: number) => {
    navigate(`/employees/${participantId}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 z-50">
      <Card className="shadow-lg border">
        <CardContent className="p-4">
          <div className="max-h-60 overflow-y-auto">
            <div className="space-y-2">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => handleParticipantClick(participant.id)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={participant.avatar} alt={participant.name} />
                    <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{participant.name}</p>
                    <p className="text-xs text-muted-foreground">{t("Team Member")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
