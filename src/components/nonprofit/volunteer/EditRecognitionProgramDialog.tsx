
import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface RecognitionProgram {
  id: string;
  title: string;
  description: string;
  frequency: string;
  criteria: string;
  createdAt: Date;
  totalNominations: number;
  activeNominations: number;
}

interface EditRecognitionProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program: RecognitionProgram | null;
  onUpdateProgram: (program: RecognitionProgram) => void;
}

export function EditRecognitionProgramDialog({
  open,
  onOpenChange,
  program,
  onUpdateProgram,
}: EditRecognitionProgramDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    frequency: "monthly",
    criteria: "",
  });

  useEffect(() => {
    if (program) {
      setFormData({
        title: program.title,
        description: program.description,
        frequency: program.frequency,
        criteria: program.criteria,
      });
    }
  }, [program]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.criteria) {
      toast.error(t('Please fill in all required fields'));
      return;
    }
    
    if (program) {
      onUpdateProgram({
        ...program,
        ...formData,
      });
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t('Edit Recognition Program')}</DialogTitle>
          <DialogDescription>
            {t('Update the details of this recognition program')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">{t('Program Title')}</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={t('Ex: Voluntário do Mês')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">{t('Description')}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={t('Describe what this award recognizes')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="frequency">{t('Frequency')}</Label>
              <Select 
                value={formData.frequency}
                onValueChange={(value) => setFormData({ ...formData, frequency: value })}
              >
                <SelectTrigger id="frequency">
                  <SelectValue placeholder={t('Select frequency')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">{t('One-time')}</SelectItem>
                  <SelectItem value="monthly">{t('Monthly')}</SelectItem>
                  <SelectItem value="quarterly">{t('Quarterly')}</SelectItem>
                  <SelectItem value="annual">{t('Annual')}</SelectItem>
                  <SelectItem value="milestone">{t('Milestone-based')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="criteria">{t('Award Criteria')}</Label>
              <Textarea
                id="criteria"
                value={formData.criteria}
                onChange={(e) => setFormData({ ...formData, criteria: e.target.value })}
                placeholder={t('Define the criteria for earning this award')}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('Cancel')}
            </Button>
            <Button type="submit">{t('Update Program')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
