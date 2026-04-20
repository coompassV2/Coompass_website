import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Info, HandHelping } from "lucide-react";
import { Link } from "react-router-dom";
import { missions } from "@/data/missions"; // This import stays the same

interface MissionRowProps {
  title: string;
  organization: string;
  description: string;
  hours: number;
  volunteers: number;
  location: string;
  postedDate: string;
  isActive?: boolean;
  id?: string;
}

export function MissionRow({
  title,
  organization,
  description,
  hours,
  volunteers,
  location,
  postedDate,
  isActive = true,
  id: providedId,
}: MissionRowProps) {
  const { t } = useTranslation();
  
  const missionId = providedId || missions.find(
    m => m.title === title && m.organization === organization
  )?.id || "";
  
  const participants = [
    { id: 1, name: "John", image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952" },
    { id: 2, name: "Alice", image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7" },
    { id: 3, name: "Bob", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" },
  ];
  
  const totalParticipants = 6;
  const remainingSpots = isActive ? volunteers - totalParticipants : 0;

  return (
    <div className="glass-card p-4 hover:bg-coompass-success/20 hover:text-coompass-success transition-colors">
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={`https://api.dicebear.com/7.x/shapes/svg?seed=${organization}`} />
          <AvatarFallback>{organization[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium truncate">{title}</h4>
            <span className={cn(
              "text-xs px-2 py-1 rounded-full ml-2",
              isActive 
                ? "bg-green-500/10 text-green-500" 
                : "bg-red-500/10 text-red-500"
            )}>
              {isActive ? t("Active") : t("Finished")}
            </span>
          </div>

          <p className="text-sm text-muted-foreground truncate mb-2">
            <span className="text-[#0FA0CE]">{organization}</span> • 
            <span className="inline-flex items-center">
              <span className={cn(
                "w-2 h-2 rounded-full mx-2",
                location === "In-Person" ? "bg-[#7E69AB]" : "bg-[#9b87f5]"
              )}></span>
              {location}
            </span> • 
            <span className="text-muted-foreground">{t("Posted")} {postedDate}</span>
          </p>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {participants.map((participant) => (
                    <Avatar key={participant.id} className="border-2 border-background w-6 h-6">
                      <AvatarImage src={participant.image} alt={participant.name} />
                      <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {totalParticipants} {t("participants")}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full">
                  {hours} {t("Hours")}
                </span>
                <span className="px-2 py-1 bg-orange-500/20 text-orange-500 rounded-full">
                  {volunteers} {t("Volunteers")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isActive && (
                <span className="text-sm text-muted-foreground mr-2">
                  {remainingSpots} {t("spots available")}
                </span>
              )}
              <Button 
                variant="outline"
                size="sm"
                asChild
              >
                <Link to={`/missions/${missionId}`}>
                  <Info className="h-4 w-4 mr-2" />
                  {t("Learn more")}
                </Link>
              </Button>
              {isActive && (
                <Button 
                  size="sm"
                  className="bg-coompass-success hover:bg-coompass-success/90 text-white"
                >
                  <HandHelping className="h-4 w-4 mr-2" />
                  {t("Help")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
