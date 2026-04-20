
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

interface ReportImageDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportImageDialog({ isOpen, onClose }: ReportImageDialogProps) {
  const { t } = useTranslation();

  const handleDownloadPng = () => {
    // Create a link to download the image
    const link = document.createElement('a');
    link.href = '/lovable-uploads/ff841e43-a11e-4923-9327-3c8b488d8a10.png';
    link.download = 'impact-report.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadCsv = () => {
    console.log('Downloading CSV...');
    // CSV download logic would go here
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-hidden p-0">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="relative">
            <img 
              src="/lovable-uploads/ff841e43-a11e-4923-9327-3c8b488d8a10.png"
              alt="Impact Hub Report"
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button onClick={onClose} variant="outline" className="bg-white/90 hover:bg-white">
                {t('Close')}
              </Button>
              <Button onClick={handleDownloadPng} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="h-4 w-4 mr-2" />
                {t('Download .png')}
              </Button>
              <Button onClick={handleDownloadCsv} className="bg-green-600 hover:bg-green-700 text-white">
                <Download className="h-4 w-4 mr-2" />
                {t('Download .csv')}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
