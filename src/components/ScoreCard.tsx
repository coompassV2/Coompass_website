
import { memo } from 'react';
import confetti from 'canvas-confetti';
import { toast } from "sonner";
import { ScoreProgress } from "./score/ScoreProgress";
import { ScoreStats } from "./score/ScoreStats";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";

const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#0EA5E9', '#9b87f5', '#10B981', '#f472b6', '#fbbf24']
  });
};

function ScoreCardComponent() {
  const { t } = useTranslation();

  const handleClaimPrize = () => {
    triggerConfetti();
    toast.success("Congratulations! Your prize has been claimed! 🎉");
  };

  return (
    <Card className="bg-card/50 rounded-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">{t("Current Score")}</h3>
          <button 
            onClick={handleClaimPrize}
            className="px-3 py-1 text-xs bg-coompass-primary text-white rounded-lg hover:bg-coompass-primary/90 transition-colors"
          >
            {t("Claim your prize")}
          </button>
        </div>
        <div className="flex items-center gap-8">
          <ScoreProgress percentage={95} />
          <ScoreStats passEarned={10000} level="Prodigy" />
        </div>
      </CardContent>
    </Card>
  );
}

export const ScoreCard = memo(ScoreCardComponent);
