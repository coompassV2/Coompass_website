
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, UserPlus, Briefcase, Clock, ListCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScoreCard } from "@/components/ScoreCard";
import { getAvatarUrl, getInitials } from "@/utils/avatarUtils";

interface EmployeeProfileCardProps {
  employee: {
    id: number;
    name: string;
    department?: string;
    role?: string;
    volunteerHours: number;
    completeMissions: number;
    joinDate: string;
  };
}

export function EmployeeProfileCard({ employee }: EmployeeProfileCardProps) {
  return (
    <div className="glass-card p-6">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={getAvatarUrl(employee.name)} alt={employee.name} />
            <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{employee.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">Working at</p>
            <p className="font-medium">Coompass</p>
            
            {/* Employment information */}
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5" />
              <span>{employee.department || "Product Department"} • {employee.role || "Team Member"}</span>
            </div>
          </div>
        </div>

        {/* Employee Stats Section */}
        <div className="bg-card/50 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3">This Year's Impact</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-coompass-primary" />
              <div>
                <p className="text-sm font-medium">Volunteer Hours</p>
                <p className="text-lg font-bold">{employee.volunteerHours}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ListCheck className="h-4 w-4 text-coompass-success" />
              <div>
                <p className="text-sm font-medium">Completed Missions</p>
                <p className="text-lg font-bold">{employee.completeMissions}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Score Card */}
        <ScoreCard />

        <div className="flex items-center gap-2">
          <Button className="flex-1" variant="default">
            Invite to Mission
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chat with {employee.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add {employee.name} as friend</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
