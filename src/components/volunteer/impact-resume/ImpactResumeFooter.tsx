
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, X } from "lucide-react";
import { toast } from "sonner";
import { ImpactResumeFooterProps } from "./types";

export function ImpactResumeFooter({ showFooter, onClose }: ImpactResumeFooterProps) {
  const { t } = useTranslation();

  const handleDownloadPDF = () => {
    toast.info(t("Coming Soon"));
  };

  if (!showFooter) return null;

  return (
    <div className="flex-shrink-0 animate-fade-in">
      <Separator className="mb-4" />
      <div className="flex justify-between">
        <Button onClick={onClose} variant="outline" className="flex items-center gap-2">
          <X className="h-4 w-4" />
          {t("Close")}
        </Button>
        <Button onClick={handleDownloadPDF} variant="secondary" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          {t("Download PDF")}
        </Button>
      </div>
    </div>
  );
}
