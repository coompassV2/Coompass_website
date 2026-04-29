
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HandHelping } from "lucide-react";
import { Mission } from "@/components/missions/MissionCard";
import { Badge } from "@/components/ui/badge";

interface MissionParticipantsProps {
  mission: Mission;
}

export function MissionParticipants({ mission }: MissionParticipantsProps) {
  const { t } = useTranslation();
  
  // Mock data for participants
  const participants = [
    { id: 1, name: "John", image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952" },
    { id: 2, name: "Alice", image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7" },
    { id: 3, name: "Bob", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" },
    { id: 4, name: "Carol", image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952" },
    { id: 5, name: "Dave", image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7" },
  ];
  
  const totalParticipants = 6;
  const remainingSpots = mission.isActive ? mission.volunteers - totalParticipants : 0;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{t("Current Participants")}</h2>
          <span className="text-sm text-muted-foreground">
            {totalParticipants} {t("of")} {mission.volunteers} {t("volunteers")}
          </span>
        </div>
        
        {/* Participants avatars - style similar to mission card */}
        <div className="mb-4">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex -space-x-2">
              {participants.slice(0, 3).map((participant) => (
                <Avatar key={participant.id} className="border-2 border-background w-8 h-8">
                  <AvatarImage src={participant.image} alt={participant.name} />
                  <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {totalParticipants} {t("participants")}
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Badge variant="outline" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/20">
              {mission.hours} {t("Hours")}
            </Badge>
            <Badge variant="outline" className="bg-orange-500/20 text-orange-500 border-orange-500/20">
              {mission.volunteers} {t("Volunteers")}
            </Badge>
          </div>
        </div>
        
        {/* Individual participants */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
          {participants.map((participant) => (
            <div key={participant.id} className="flex flex-col items-center">
              <Avatar className="h-12 w-12 mb-2">
                <AvatarImage src={participant.image} alt={participant.name} />
                <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-center">{participant.name}</span>
            </div>
          ))}
        </div>
        
        {mission.isActive && (
          <div className="text-center p-4 bg-muted rounded-md">
            <p className="text-muted-foreground mb-2">
              {remainingSpots} {t("spots remaining")}
            </p>
            <Button className="bg-coompass-success hover:bg-coompass-success/90 text-white">
              <HandHelping className="h-4 w-4 mr-2" />
              {t("Join this Mission")}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
