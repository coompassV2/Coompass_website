
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CompletedProject } from "./types";

interface PortfolioDialogProps {
  project: CompletedProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

export function PortfolioDialog({ project, open, onOpenChange, onSubmit }: PortfolioDialogProps) {
  const { t } = useTranslation();
  
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('Add to Portfolio')}</DialogTitle>
          <DialogDescription>
            {t('Include')} {project.title} {t('in your public portfolio')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">{t('Project Visibility')}</h4>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="makePublic"
                defaultChecked
                className="rounded"
              />
              <label htmlFor="makePublic" className="text-sm">
                {t('Make this project visible in my public portfolio')}
              </label>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">{t('Information to Include')}</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includeClient"
                  defaultChecked
                  className="rounded"
                />
                <label htmlFor="includeClient" className="text-sm">
                  {t('Client name')}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includeFeedback"
                  defaultChecked
                  className="rounded"
                />
                <label htmlFor="includeFeedback" className="text-sm">
                  {t('Client feedback')}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includeImpact"
                  defaultChecked
                  className="rounded"
                />
                <label htmlFor="includeImpact" className="text-sm">
                  {t('Impact metrics')}
                </label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">{t('Portfolio Category')}</h4>
            <select className="w-full px-3 py-2 border rounded-md">
              <option value="sustainability">{t('Sustainability Consulting')}</option>
              <option value="esg">{t('ESG Reporting')}</option>
              <option value="impact">{t('Impact Assessment')}</option>
              <option value="training">{t('Training & Education')}</option>
            </select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('Cancel')}
          </Button>
          <Button onClick={onSubmit}>
            {t('Add to Portfolio')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
