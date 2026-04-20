
import { useTranslation } from "react-i18next";
import { Mission } from "@/components/missions/MissionCard";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MissionParticipantsInfoProps {
  mission: Mission;
}

export function MissionParticipantsInfo({ mission }: MissionParticipantsInfoProps) {
  const { t } = useTranslation();
  const participants = mission.participantsCount ?? 0;
  const volunteersRequired = Math.max(0, mission.volunteers ?? 0);
  const spotsLeft =
    mission.spotsLeft != null
      ? mission.spotsLeft
      : Math.max(0, volunteersRequired - participants);
  const progressValue =
    volunteersRequired > 0 ? Math.min(100, (participants / volunteersRequired) * 100) : 0;

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="mb-3 text-lg font-medium">{t("Participants")}</h3>
        <div className="mb-3 flex items-end justify-between">
          <p className="text-2xl font-semibold leading-none">{participants}</p>
          <p className="text-xs text-muted-foreground">
            {participants} / {volunteersRequired}
          </p>
        </div>
        <Progress value={progressValue} className="mb-3 h-2" />
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>{t("Joined")}: {participants}</p>
          <p>{t("Spots left")}: {spotsLeft}</p>
          <p>{t("Required")}: {volunteersRequired}</p>
        </div>
      </CardContent>
    </Card>
  );
}
