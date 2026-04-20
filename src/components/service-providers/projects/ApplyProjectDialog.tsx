
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AvailableProject } from "./types";

interface ApplyProjectDialogProps {
  project: AvailableProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApplyProjectDialog({ project, open, onOpenChange }: ApplyProjectDialogProps) {
  const { t } = useTranslation();
  const [coverLetter, setCoverLetter] = useState("");

  if (!project) return null;

  const handleSubmitApplication = () => {
    if (!coverLetter.trim()) {
      toast.error(t('Please provide a cover letter or note'));
      return;
    }

    toast.success(t('Application submitted successfully'));
    onOpenChange(false);
    setCoverLetter("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {project && (
          <>
            <DialogHeader>
              <DialogTitle>{t('Apply for Project')}</DialogTitle>
              <DialogDescription>
                {project.title} - {project.organization}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium" htmlFor="coverLetter">
                  {t('Cover Letter / Project Proposal')}
                </label>
                <Textarea
                  id="coverLetter"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder={t('Introduce yourself and explain why you are a good fit for this project...')}
                  rows={6}
                  className="mt-2"
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">{t('Attachments')}</h4>
                <div className="border border-dashed border-border rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    {t('Drop files here or click to upload')}
                  </p>
                  <Button variant="outline" size="sm">
                    {t('Select Files')}
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {t('Cancel')}
              </Button>
              <Button onClick={handleSubmitApplication}>
                {t('Submit Application')}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
