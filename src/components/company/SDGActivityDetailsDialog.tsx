
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Award, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SDGActivityDetailsDialogProps {
  activity: {
    id: number;
    sdg: string;
    description: string;
    participation: number;
    impact: string;
    details?: {
      date?: string;
      duration?: string;
      location?: string;
      achievements?: string[];
      partners?: string[];
      goals?: string;
    };
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SDGActivityDetailsDialog({ activity, isOpen, onClose }: SDGActivityDetailsDialogProps) {
  const { t } = useTranslation();
  
  if (!activity) return null;
  
  // Extract details with default values
  const details = activity.details || {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <div className={cn(
              "p-1.5 rounded-md",
              activity.impact === "High" ? "bg-green-500/20" : 
              activity.impact === "Medium" ? "bg-amber-500/20" : "bg-blue-500/20"
            )}>
              <Sparkles className="h-5 w-5" />
            </div>
            {activity.sdg} Initiative
          </DialogTitle>
          <DialogDescription className="text-base mt-1">
            {activity.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Key metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-border rounded-lg p-4 flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">{t('Participation')}</p>
                <p className="font-medium">{activity.participation} {t('employees')}</p>
              </div>
            </div>
            
            <div className="border border-border rounded-lg p-4 flex items-center gap-3">
              <Award className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">{t('Impact Rating')}</p>
                <p className="font-medium">{activity.impact}</p>
              </div>
            </div>
            
            <div className="border border-border rounded-lg p-4 flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">{t('Duration')}</p>
                <p className="font-medium">{details.duration || 'Ongoing'}</p>
              </div>
            </div>
          </div>

          {/* Additional details */}
          {details.date && (
            <div>
              <h3 className="font-medium mb-2">{t('Event Date')}</h3>
              <p className="text-muted-foreground">{details.date}</p>
            </div>
          )}
          
          {details.location && (
            <div>
              <h3 className="font-medium mb-2">{t('Location')}</h3>
              <p className="text-muted-foreground">{details.location}</p>
            </div>
          )}
          
          {details.goals && (
            <div>
              <h3 className="font-medium mb-2">{t('Goals')}</h3>
              <p className="text-muted-foreground">{details.goals}</p>
            </div>
          )}
          
          {details.achievements && details.achievements.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">{t('Key Achievements')}</h3>
              <ul className="list-disc pl-5 space-y-1">
                {details.achievements.map((achievement, index) => (
                  <li key={index} className="text-muted-foreground">{achievement}</li>
                ))}
              </ul>
            </div>
          )}
          
          {details.partners && details.partners.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">{t('Partner Organizations')}</h3>
              <div className="flex flex-wrap gap-2">
                {details.partners.map((partner, index) => (
                  <Badge key={index} variant="outline">{partner}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>{t('Close')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
