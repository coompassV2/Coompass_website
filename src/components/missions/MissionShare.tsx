
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mission } from "@/components/missions/MissionCard";
import { Share2, Twitter, Facebook, Linkedin, Link2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface MissionShareProps {
  mission: Mission;
}

export function MissionShare({ mission }: MissionShareProps) {
  const { t } = useTranslation();
  
  const shareUrl = `${window.location.origin}/missions/${mission.id}`;
  
  const shareOnTwitter = () => {
    const text = `${t("Check out this volunteer mission")}: ${mission.title} ${shareUrl}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };
  
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };
  
  const shareOnLinkedIn = () => {
    const text = `${mission.title} - ${mission.organization}`;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(text)}`, '_blank');
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        title: t("Link copied"),
        description: t("Mission link copied to clipboard"),
      });
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-3 flex items-center">
          <Share2 className="h-4 w-4 mr-2" />
          {t("Share this mission")}
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="h-9 w-full justify-start" 
            onClick={shareOnTwitter}
          >
            <Twitter className="h-4 w-4 mr-2" />
            Twitter
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="h-9 w-full justify-start" 
            onClick={shareOnFacebook}
          >
            <Facebook className="h-4 w-4 mr-2" />
            Facebook
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="h-9 w-full justify-start" 
            onClick={shareOnLinkedIn}
          >
            <Linkedin className="h-4 w-4 mr-2" />
            LinkedIn
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="h-9 w-full justify-start" 
            onClick={copyToClipboard}
          >
            <Link2 className="h-4 w-4 mr-2" />
            {t("Copy")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
