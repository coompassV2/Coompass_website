
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Check, X } from "lucide-react";
import { ApplicationDetailsDialogProps } from "./types";

export function ApplicationDetailsDialog({ 
  application, 
  open, 
  onOpenChange, 
  onEdit, 
  onWithdraw 
}: ApplicationDetailsDialogProps) {
  const { t } = useTranslation();
  
  if (!application) return null;
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="bg-yellow-500/10 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400 px-2 py-1 rounded-md text-sm">{t('Pending')}</span>;
      case 'shortlisted':
        return <span className="bg-green-500/10 text-green-700 dark:bg-green-950 dark:text-green-400 px-2 py-1 rounded-md text-sm">{t('Shortlisted')}</span>;
      case 'rejected':
        return <span className="bg-red-500/10 text-red-700 dark:bg-red-950 dark:text-red-400 px-2 py-1 rounded-md text-sm">{t('Rejected')}</span>;
      default:
        return <span className="px-2 py-1 rounded-md text-sm">{status}</span>;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{application.projectTitle}</DialogTitle>
          <DialogDescription className="text-coompass-primary">
            {application.organization}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">{t('Application Status')}</h4>
            {getStatusBadge(application.status)}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium">{t('Submitted Date')}</h4>
              <p className="mt-1">{application.submittedDate}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">{t('Location')}</h4>
              <p className="mt-1">{application.location}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">{t('Budget')}</h4>
              <p className="mt-1">{application.budget}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">{t('Estimated Hours')}</h4>
              <p className="mt-1">{application.estimatedHours} {t('hours')}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium">{t('Project Details')}</h4>
            <p className="mt-1 text-sm">{application.projectDetails}</p>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-md">
            <h4 className="text-sm font-medium">{t('Your Cover Letter')}</h4>
            <p className="mt-2 text-sm">{application.coverLetter}</p>
          </div>
          
          {application.status === 'shortlisted' && (
            <div className="bg-green-500/10 border border-green-200 rounded-md p-4">
              <div className="flex gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <div>
                  <h4 className="text-sm font-medium text-green-700 dark:text-green-400">
                    {t('You\'ve been shortlisted!')}
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    {t('The organization is interested in your application and may contact you soon for next steps.')}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {application.status === 'rejected' && (
            <div className="bg-red-500/10 border border-red-200 rounded-md p-4">
              <div className="flex gap-2">
                <X className="h-5 w-5 text-red-500" />
                <div>
                  <h4 className="text-sm font-medium text-red-700 dark:text-red-400">
                    {t('Application not selected')}
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                    {t('The organization has decided to proceed with other candidates. View similar opportunities in the Available Projects tab.')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          {application.status === 'pending' && (
            <div className="flex flex-wrap gap-2 w-full justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onEdit(application)}
              >
                {t('Edit Application')}
              </Button>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => {
                  onOpenChange(false);
                  onWithdraw(application);
                }}
                className="border-red-500 text-red-500 hover:bg-red-500/10"
              >
                {t('Withdraw Application')}
              </Button>
            </div>
          )}
          {application.status === 'shortlisted' && (
            <Button 
              size="sm"
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-1"
            >
              <FileText className="h-4 w-4" />
              {t('View Client Contact Details')}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
