
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarUrl, getInitials } from "@/utils/avatarUtils";

export function NonprofitTeam() {
  const { t } = useTranslation();
  
  // Team members with real employee names to get their photos
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Executive Director",
      department: "Leadership",
      email: "sarah@nonprofitorg.org",
      phone: "+1 (555) 123-4567",
      linkedin: "sarahjohnson"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      position: "Program Director",
      department: "Programs",
      email: "michael@nonprofitorg.org",
      phone: "+1 (555) 234-5678",
      linkedin: "michaelrodriguez"
    },
    {
      id: 3,
      name: "Aisha Patel",
      position: "Development Manager",
      department: "Fundraising",
      email: "aisha@nonprofitorg.org",
      phone: "+1 (555) 345-6789",
      linkedin: "aishapatel"
    },
    {
      id: 4,
      name: "David Kim",
      position: "Communications Director",
      department: "Marketing",
      email: "david@nonprofitorg.org",
      phone: "+1 (555) 456-7890",
      linkedin: "davidkim"
    },
    {
      id: 5,
      name: "Maria Gonzalez",
      position: "Volunteer Coordinator",
      department: "Programs",
      email: "maria@nonprofitorg.org",
      phone: "+1 (555) 567-8901",
      linkedin: "mariagonzalez"
    },
    {
      id: 6,
      name: "James Wilson",
      position: "Finance Manager",
      department: "Finance",
      email: "james@nonprofitorg.org",
      phone: "+1 (555) 678-9012",
      linkedin: "jameswilson"
    }
  ];
  
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{t('Team')}</h2>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          {t('Add Team Member')}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <Card key={member.id} className="p-4 hover:bg-accent/5 transition-colors">
            <div className="flex flex-col items-center text-center space-y-3">
              <Avatar className="h-24 w-24">
                <AvatarImage 
                  src={getAvatarUrl(member.name)} 
                  alt={member.name}
                />
                <AvatarFallback className="bg-background text-2xl">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-muted-foreground">{member.position}</p>
                <Badge variant="outline" className="mt-1">
                  {member.department}
                </Badge>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
