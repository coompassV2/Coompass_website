
import { Badge as BadgeType } from "@/types/organization";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { badges } from "@/data/leaderboard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BadgesListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BadgesListDialog({ open, onOpenChange }: BadgesListDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl">{t("Volunteer Badges")}</DialogTitle>
          <DialogDescription>
            {t("Complete various volunteering activities to earn these badges")}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="grid gap-4">
            {badges.map((badge) => (
              <div 
                key={badge.id} 
                className="flex items-start gap-4 p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  <img 
                    src={`https://api.dicebear.com/7.x/bottts/svg?seed=${badge.id}&backgroundColor=${badge.color.replace('#', '')}`} 
                    alt={badge.name}
                    className="w-12 h-12" 
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-md">{badge.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{badge.description}</p>
                  <div className="mt-2">
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                      {t("How to earn:")} {badge.howToEarn || t("Complete specific volunteering activities")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
