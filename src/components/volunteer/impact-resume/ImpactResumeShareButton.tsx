import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

export function ImpactResumeShareButton() {
  const { t } = useTranslation();

  const handleClick = () => {
    toast.info(t("Coming Soon"));
  };

  return (
    <Button variant="outline" size="sm" onClick={handleClick}>
      <Share2 className="h-4 w-4 mr-2" />
      {t("Share")}
    </Button>
  );
}
