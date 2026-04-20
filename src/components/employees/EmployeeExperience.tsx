
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { missions } from "@/data/missions"; // This import stays the same
import { Link } from "react-router-dom";

interface EmployeeExperienceProps {
  employeeName: string;
}

export function EmployeeExperience({ employeeName }: EmployeeExperienceProps) {
  // Generate pseudo-random mission selection based on employee name
  const getEmployeeMissions = (name: string) => {
    // Simple hash function for the seed
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Select a random number of missions (2-5)
    const count = 2 + (hash % 4);
    
    // Shuffled missions array - using a deterministic approach based on employee name
    const shuffled = [...missions].sort((a, b) => {
      const hashA = (hash + parseInt(a.id)) % missions.length;
      const hashB = (hash + parseInt(b.id)) % missions.length;
      return hashA - hashB;
    });

    return shuffled.slice(0, count);
  };

  const employeeMissions = getEmployeeMissions(employeeName);

  return (
    <div className="glass-card p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Volunteering Experience</h3>
        <div className="space-y-4">
          {employeeMissions.map((mission, index) => (
            <Link key={mission.id} to={`/missions/${mission.id}`} className="block mb-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-card hover:bg-coompass-success/20 hover:text-coompass-success transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://api.dicebear.com/7.x/shapes/svg?seed=${mission.organization}-${index}`} />
                  <AvatarFallback>{mission.organization[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{mission.title}</h4>
                  <p className="text-sm text-muted-foreground truncate">{mission.organization}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {mission.causes.slice(0, 2).map((cause) => (
                      <span key={cause} className="text-xs px-2 py-1 rounded-full bg-accent-foreground/10">
                        {cause}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {mission.postedDate}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
