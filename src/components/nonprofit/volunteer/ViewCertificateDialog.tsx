
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, Award } from "lucide-react";
import { toast } from "sonner";

interface Recognition {
  id: number;
  awardName: string;
  volunteer: string;
  date: string;
}

interface ViewCertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recognition: Recognition | null;
}

export function ViewCertificateDialog({
  open,
  onOpenChange,
  recognition,
}: ViewCertificateDialogProps) {
  const { t } = useTranslation();

  if (!recognition) return null;

  const handleDownloadPDF = () => {
    toast.success(t('Certificate PDF downloaded'));
    console.log('Download PDF for:', recognition);
  };

  const handleDownloadPNG = () => {
    toast.success(t('Certificate PNG downloaded'));
    console.log('Download PNG for:', recognition);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${recognition.awardName} Certificate`,
        text: `${recognition.volunteer} received the ${recognition.awardName} award`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success(t('Certificate link copied to clipboard'));
    }
  };

  const handleSendToVolunteer = () => {
    toast.success(t('Certificate sent to volunteer via email'));
    console.log('Send certificate to:', recognition.volunteer);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            {t('Recognition Certificate')}
          </DialogTitle>
        </DialogHeader>

        {/* Certificate Preview */}
        <div className="bg-white dark:bg-gray-900 border-2 border-amber-200 dark:border-amber-800 rounded-lg p-8 text-center space-y-6">
          <div className="flex justify-center">
            <Award className="h-16 w-16 text-amber-500" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-2">
              {t('Certificate of Recognition')}
            </h1>
            <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg">
              {t('This certificate is proudly presented to')}
            </p>
            
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              {recognition.volunteer}
            </h2>
            
            <p className="text-lg">
              {t('For outstanding achievement in')}
            </p>
            
            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 text-lg px-4 py-2">
              {recognition.awardName}
            </Badge>
            
            <div className="pt-6 space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('Date of Recognition')}: {recognition.date}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('Issued by')}: Your Organization Name
              </p>
            </div>
          </div>
          
          <div className="flex justify-center pt-4">
            <div className="border-t border-gray-300 dark:border-gray-600 pt-2 px-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('Authorized Signature')}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              {t('Share')}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadPNG}>
              <Download className="h-4 w-4 mr-2" />
              {t('PNG')}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              {t('PDF')}
            </Button>
          </div>
          <Button onClick={handleSendToVolunteer}>
            {t('Send to Volunteer')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
