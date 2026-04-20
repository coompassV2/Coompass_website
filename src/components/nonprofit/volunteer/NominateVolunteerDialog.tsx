
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from "sonner";

interface Volunteer {
  id: number;
  name: string;
  joinDate: string;
  lastSession: string;
  hours: number;
  skills: string[];
  status: string;
}

interface RecognitionProgram {
  id: string;
  title: string;
  description: string;
  frequency: string;
  criteria: string;
}

interface NominateVolunteerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recognitionProgram: RecognitionProgram | null;
  volunteers: Volunteer[];
  onNominate: (programId: string, volunteerId: number, reason: string) => void;
}

export function NominateVolunteerDialog({
  open,
  onOpenChange,
  recognitionProgram,
  volunteers,
  onNominate,
}: NominateVolunteerDialogProps) {
  const { t } = useTranslation();
  const [selectedVolunteerId, setSelectedVolunteerId] = useState<string>("");
  const [nominationReason, setNominationReason] = useState("");
  const [selectedVolunteers, setSelectedVolunteers] = useState<number[]>([]);

  const handleAddVolunteer = (volunteerId: string) => {
    const id = parseInt(volunteerId);
    if (id && !selectedVolunteers.includes(id)) {
      setSelectedVolunteers([...selectedVolunteers, id]);
    }
    setSelectedVolunteerId("");
  };

  const handleRemoveVolunteer = (volunteerId: number) => {
    setSelectedVolunteers(selectedVolunteers.filter(id => id !== volunteerId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recognitionProgram) {
      toast.error(t('No recognition program selected'));
      return;
    }
    
    if (selectedVolunteers.length === 0) {
      toast.error(t('Please select at least one volunteer'));
      return;
    }
    
    if (!nominationReason.trim()) {
      toast.error(t('Please provide a reason for the nomination'));
      return;
    }
    
    selectedVolunteers.forEach(volunteerId => {
      onNominate(recognitionProgram.id, volunteerId, nominationReason);
    });
    
    // Reset form
    setSelectedVolunteers([]);
    setNominationReason("");
    setSelectedVolunteerId("");
    onOpenChange(false);
    toast.success(t('Volunteer(s) nominated successfully'));
  };

  const availableVolunteers = volunteers.filter(v => !selectedVolunteers.includes(v.id));
  const getVolunteerById = (id: number) => volunteers.find(v => v.id === id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t('Nominate Volunteer')}</DialogTitle>
          <DialogDescription>
            {recognitionProgram ? (
              <>
                {t('Nominate volunteers for')} <strong>{recognitionProgram.title}</strong>
              </>
            ) : (
              t('Select volunteers to nominate for recognition')
            )}
          </DialogDescription>
        </DialogHeader>
        
        {recognitionProgram && (
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>{t('Criteria')}:</strong> {recognitionProgram.criteria}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="volunteer">{t('Select Volunteers')}</Label>
              <Select value={selectedVolunteerId} onValueChange={handleAddVolunteer}>
                <SelectTrigger id="volunteer">
                  <SelectValue placeholder={t('Choose a volunteer to nominate')} />
                </SelectTrigger>
                <SelectContent>
                  {availableVolunteers.map((volunteer) => (
                    <SelectItem key={volunteer.id} value={volunteer.id.toString()}>
                      {volunteer.name} ({volunteer.hours} {t('hours')})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedVolunteers.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedVolunteers.map((volunteerId) => {
                    const volunteer = getVolunteerById(volunteerId);
                    return volunteer ? (
                      <Badge key={volunteerId} variant="secondary" className="flex items-center gap-1">
                        {volunteer.name}
                        <button
                          type="button"
                          onClick={() => handleRemoveVolunteer(volunteerId)}
                          className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="reason">{t('Nomination Reason')}</Label>
              <Textarea
                id="reason"
                value={nominationReason}
                onChange={(e) => setNominationReason(e.target.value)}
                placeholder={t('Explain why this volunteer deserves recognition...')}
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('Cancel')}
            </Button>
            <Button type="submit">
              {t('Submit Nomination')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
