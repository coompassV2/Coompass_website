
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/home/Header";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCurrentPersona } from "@/components/app-sidebar/SidebarMenuConfig";
import { PersonaType } from "@/utils/personaLabels";
import { useToast } from "@/hooks/use-toast";
import { GuideHeader } from "@/components/help-center/guide-details/GuideHeader";
import { GuideContentLoader } from "@/components/help-center/guide-details/GuideContentLoader";
import { 
  getGuideTitleFromId, 
  bookmarkGuide, 
  shareGuide 
} from "@/components/help-center/guide-details/guideUtils";

export default function GuideDetails() {
  const { guideId } = useParams<{ guideId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activePersona, setActivePersona] = useState<PersonaType>("company");
  const [guideTitle, setGuideTitle] = useState("");
  const [guideDescription, setGuideDescription] = useState("");

  useEffect(() => {
    // Set active persona based on localStorage or default to "company"
    const persona = getCurrentPersona();
    if (persona) {
      setActivePersona(persona);
    }
    
    // Set the title based on the guide ID
    if (guideId) {
      const title = getGuideTitleFromId(guideId);
      setGuideTitle(title);
      setGuideDescription("Detailed guide for " + title.toLowerCase());
      document.title = `${title} | Coompass Help Center`;
    }
  }, [guideId]);

  const handleBookmark = () => {
    // Save the guide to bookmarks
    if (!guideId) return;
    
    const result = bookmarkGuide(guideId);
    
    if (result.success) {
      if (result.alreadyBookmarked) {
        toast({
          title: "Already bookmarked",
          description: "This guide is already in your bookmarks.",
        });
      } else {
        toast({
          title: "Guide bookmarked",
          description: "You can find this guide in your bookmarked guides section.",
        });
      }
    }
  };

  const handleShare = () => {
    // Copy the current URL to clipboard
    const success = shareGuide();
    
    if (success) {
      toast({
        title: "Link copied",
        description: "Guide link copied to clipboard.",
      });
    } else {
      toast({
        title: "Sharing failed",
        description: "Could not copy link to clipboard. Try again or share manually.",
      });
    }
  };

  const handleBackClick = () => {
    // Use browser history to go back if possible
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="p-6">
            <GuideHeader 
              title={guideTitle}
              description={guideDescription}
              guideId={guideId || ""}
              handleBookmark={handleBookmark}
              handleShare={handleShare}
              handleBackClick={handleBackClick}
            />
            
            <ScrollArea className="h-[calc(100vh-300px)] pr-4">
              {guideId && <GuideContentLoader guideId={guideId} />}
            </ScrollArea>
          </Card>
        </div>
      </main>
    </div>
  );
}
