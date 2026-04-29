
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
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Award, X, User, Calendar, Trophy } from "lucide-react";

interface Recognition {
  id: number;
  programId: string;
  awardName: string;
  volunteer: string;
  date: string;
  status: string;
}

interface ReviewNominationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recognition: Recognition | null;
  onAward: (recognitionId: number) => void;
  onReject: (recognitionId: number) => void;
}

export function ReviewNominationDialog({
  open,
  onOpenChange,
  recognition,
  onAward,
  onReject,
}: ReviewNominationDialogProps) {
  const { t } = useTranslation();
  const [reviewNotes, setReviewNotes] = useState("");

  if (!recognition) return null;

  const handleAward = () => {
    onAward(recognition.id);
    setReviewNotes("");
    onOpenChange(false);
  };

  const handleReject = () => {
    onReject(recognition.id);
    setReviewNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            {t('Review Nomination')}
          </DialogTitle>
          <DialogDescription>
            {t('Review this volunteer nomination and decide whether to grant the award')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Nomination Details */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                {recognition.awardName}
              </h3>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {t('Pending Review')}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="font-medium">{t('Volunteer')}:</span>
                <span>{recognition.volunteer}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="font-medium">{t('Nominated')}:</span>
                <span>{recognition.date}</span>
              </div>
            </div>
          </div>

          {/* Mock nomination details */}
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium">{t('Nomination Reason')}</Label>
              <div className="mt-1 p-3 bg-muted/50 rounded-md text-sm">
                {t('This volunteer has consistently demonstrated exceptional dedication and impact. They have contributed over 50 hours this month and led several successful community initiatives.')}
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium">{t('Volunteer Stats')}</Label>
              <div className="mt-1 p-3 bg-muted/50 rounded-md text-sm">
                <p>{t('Total Hours')}: 120</p>
                <p>{t('Projects Completed')}: 8</p>
                <p>{t('Community Impact Score')}: 95/100</p>
              </div>
            </div>
          </div>

          {/* Review Notes */}
          <div className="space-y-2">
            <Label htmlFor="reviewNotes">{t('Review Notes')} ({t('Optional')})</Label>
            <Textarea
              id="reviewNotes"
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              placeholder={t('Add any notes about your decision...')}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('Cancel')}
          </Button>
          <Button variant="destructive" onClick={handleReject}>
            <X className="h-4 w-4 mr-2" />
            {t('Reject')}
          </Button>
          <Button onClick={handleAward}>
            <Award className="h-4 w-4 mr-2" />
            {t('Grant Award')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
