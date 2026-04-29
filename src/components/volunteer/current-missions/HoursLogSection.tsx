
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HoursLogEntry } from "./HoursLogEntry";
import { Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getStoredToken } from "@/services/authApi";
import { getMissionHours } from "@/services/volunteerMissionsApi";
import type { MissionHoursLogEntry } from "@/types/missions";

interface HoursLogSectionProps {
  missionId: string;
}

export function HoursLogSection({ missionId }: HoursLogSectionProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [entries, setEntries] = useState<MissionHoursLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({
    approvedHours: 0,
    pendingHours: 0,
    rejectedHours: 0,
  });

  useEffect(() => {
    const fetchHours = async () => {
      if (!user?.id) {
        setEntries([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const token = getStoredToken();
      const { data } = await getMissionHours(missionId, token);
      setEntries(data?.entries ?? []);
      setTotals(
        data?.totals ?? {
          approvedHours: 0,
          pendingHours: 0,
          rejectedHours: 0,
        }
      );
      setLoading(false);
    };
    void fetchHours();
  }, [missionId, user?.id]);

  return (
    <div className="space-y-4">
      <Separator />
      
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-4 w-4" />
          <h4 className="text-sm font-medium">{t("Hours Log")}</h4>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-2">
            <div className="text-lg font-semibold text-green-700 dark:text-green-400">
              {totals.approvedHours}
            </div>
            <div className="text-xs text-green-600 dark:text-green-500">
              {t("Approved")}
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-lg p-2">
            <div className="text-lg font-semibold text-yellow-700 dark:text-yellow-400">
              {totals.pendingHours}
            </div>
            <div className="text-xs text-yellow-600 dark:text-yellow-500">
              {t("Pending")}
            </div>
          </div>
          <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-2">
            <div className="text-lg font-semibold text-red-700 dark:text-red-400">
              {totals.rejectedHours}
            </div>
            <div className="text-xs text-red-600 dark:text-red-500">
              {t("Rejected")}
            </div>
          </div>
        </div>

        <ScrollArea className="h-40">
          <div className="space-y-1">
            {loading ? (
              <div className="text-center py-4 text-muted-foreground">
                <p className="text-sm">{t("Loading hours log...")}</p>
              </div>
            ) : entries.length > 0 ? (
              entries.map((entry) => (
                <HoursLogEntry key={entry.id} entry={entry} />
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">{t("No hours logged yet")}</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
