
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Trophy, Calendar } from "lucide-react";
import { RecognitionProgram, Recognition } from "./types";

interface RecognitionOverviewCardsProps {
  recognitionPrograms: RecognitionProgram[];
  allRecognitions: Recognition[];
}

export function RecognitionOverviewCards({
  recognitionPrograms,
  allRecognitions
}: RecognitionOverviewCardsProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t('Total Programs')}</p>
              <p className="text-2xl font-bold">{recognitionPrograms.length}</p>
            </div>
            <Award className="h-8 w-8 text-amber-500" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t('Active Nominations')}</p>
              <p className="text-2xl font-bold">{recognitionPrograms.reduce((sum, p) => sum + p.activeNominations, 0)}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t('Total Awards Given')}</p>
              <p className="text-2xl font-bold">{allRecognitions.filter(r => r.status === 'awarded').length}</p>
            </div>
            <Trophy className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t('This Month')}</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
