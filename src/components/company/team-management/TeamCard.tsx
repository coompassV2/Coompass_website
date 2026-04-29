
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Users, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Team } from "./types";

interface TeamCardProps {
  team: Team;
  onEdit: (team: Team) => void;
  onDelete: (team: Team) => void;
  onManageMembers: (team: Team) => void;
  onViewTeam: (team: Team) => void;
}

export function TeamCard({ team, onEdit, onDelete, onManageMembers, onViewTeam }: TeamCardProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-coompass-success" />
            {team.name}
          </CardTitle>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={() => onEdit(team)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(team)}>
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
        <CardDescription className="line-clamp-2">{team.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-medium mb-2">{t('Team Members')}:</p>
            <div className="flex -space-x-2 overflow-hidden">
              {team.members.map((member) => (
                <Avatar key={member.id} className="border-2 border-background">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`} />
                  <AvatarFallback>{member.avatar}</AvatarFallback>
                </Avatar>
              ))}
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-foreground/10 text-xs font-medium">
                +
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm">{t('Active Missions')}:</span>
            <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">
              {team.activeMissions}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => onManageMembers(team)}>
          {t('Manage Members')}
        </Button>
        <Button size="sm" onClick={() => onViewTeam(team)}>
          {t('View Team')}
        </Button>
      </CardFooter>
    </Card>
  );
}
