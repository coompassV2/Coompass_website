
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Award, Mail, Clock, Calendar, Star } from "lucide-react";
import { RecognitionAwardDialog } from "./RecognitionAwardDialog";
import { toast } from "sonner";

interface VolunteerRecognitionProps {
  volunteers: any[];
}

export function VolunteerRecognition({ volunteers }: VolunteerRecognitionProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showAwardDialog, setShowAwardDialog] = useState(false);
  
  // Sort volunteers by hours (highest first) for leaderboard
  const sortedVolunteers = [...volunteers].sort((a, b) => b.hours - a.hours);
  
  // Mock data for awards and certificates
  const [recognitionPrograms, setRecognitionPrograms] = useState([
    {
      id: 1,
      title: "Volunteer of the Month",
      description: "Recognizes exceptional volunteer contributions each month",
      frequency: "Monthly",
      upcoming: "Apr 30, 2025",
      recipients: 1
    },
    {
      id: 2,
      title: "100 Hours Club",
      description: "Celebrates volunteers who contribute 100+ hours in a year",
      frequency: "Continuous",
      upcoming: "Ongoing",
      recipients: 8
    },
    {
      id: 3,
      title: "Annual Volunteer Awards",
      description: "Formal recognition ceremony for outstanding volunteers",
      frequency: "Annual",
      upcoming: "Dec 15, 2025",
      recipients: 5
    }
  ]);

  const handleCreateAward = (award: any) => {
    const newAward = {
      id: recognitionPrograms.length + 1,
      title: award.title,
      description: award.description,
      frequency: award.frequency.charAt(0).toUpperCase() + award.frequency.slice(1),
      upcoming: "TBD",
      recipients: 0
    };
    
    setRecognitionPrograms([...recognitionPrograms, newAward]);
  };

  const handleSendAward = (programId: number) => {
    toast.success(t('Recognition emails sent to recipients'));
  };

  const handleViewAllPrograms = () => {
    navigate("/coming-soon");
  };

  const handleUseCertificate = (certificateType: string) => {
    navigate(`/nonprofit/volunteers/certificate?type=${certificateType}`);
  };
  
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{t('Volunteer Recognition')}</h2>
        <Button size="sm" onClick={() => setShowAwardDialog(true)}>
          <Award className="h-4 w-4 mr-2" />
          {t('Create Award')}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-4">{t('Top Contributors')}</h3>
          <div className="space-y-3">
            {sortedVolunteers.slice(0, 3).map((volunteer, index) => (
              <Card key={volunteer.id} className="p-4 hover:bg-accent/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                    {index === 0 ? (
                      <Trophy className="h-5 w-5 text-amber-500" />
                    ) : index === 1 ? (
                      <Trophy className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Trophy className="h-5 w-5 text-amber-700" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{volunteer.name}</h4>
                      <Badge className="bg-blue-500/20 text-blue-700">
                        {volunteer.hours} {t('hrs')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {volunteer.skills.slice(0, 2).join(", ")}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-4">{t('Certificate Templates')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Card className="p-3 border-dashed">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{t('Hours Recognition')}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleUseCertificate('hours')}
                  >
                    {t('Use')}
                  </Button>
                </div>
              </Card>
              <Card className="p-3 border-dashed">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{t('Appreciation')}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleUseCertificate('appreciation')}
                  >
                    {t('Use')}
                  </Button>
                </div>
              </Card>
              <Card className="p-3 border-dashed">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{t('Special Achievement')}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleUseCertificate('achievement')}
                  >
                    {t('Use')}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">{t('Recognition Programs')}</h3>
          <div className="space-y-4">
            {recognitionPrograms.map((program) => (
              <Card key={program.id} className="p-4 hover:bg-accent/5 transition-colors">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <h4 className="font-medium flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-2" />
                      {program.title}
                    </h4>
                    <Badge variant="outline">
                      {program.recipients} {t('recipients')}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {program.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {program.frequency}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {program.upcoming}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSendAward(program.id)}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      {t('Send')}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-6">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleViewAllPrograms}
            >
              {t('View All Recognition Programs')}
            </Button>
          </div>
        </div>
      </div>

      <RecognitionAwardDialog 
        open={showAwardDialog} 
        onOpenChange={setShowAwardDialog}
        onCreateAward={handleCreateAward}
      />
    </div>
  );
}
