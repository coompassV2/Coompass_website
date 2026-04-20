import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { apiGet, apiPost, getStoredToken } from "@/services/authApi";
import { ApiMission, MissionsResponse } from "@/types/missions";
import { PendingMissionApprovalDialog } from "./PendingMissionApprovalDialog";
import { ChevronRight } from "lucide-react";
import { formatDatePt } from "@/lib/dateFormat";

interface PendingMissionApprovalsTableProps {
  /** Custom title. Omit to use default "Missions Pending Approval". */
  title?: string;
  /** Max missions to show. Omit or 0 = show all. */
  maxVisible?: number;
  /** Show "View all pending" link when there are more than maxVisible. */
  showViewAllLink?: boolean;
  /** Max height for scroll area. Omit when showing full list. */
  maxHeight?: string;
}

export function PendingMissionApprovalsTable({
  title,
  maxVisible = 3,
  showViewAllLink = true,
  maxHeight,
}: PendingMissionApprovalsTableProps) {
  const { t } = useTranslation();
  const [missions, setMissions] = useState<ApiMission[]>([]);
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [selectedMission, setSelectedMission] = useState<ApiMission | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const load = async () => {
    const token = getStoredToken();
    const { data, error } = await apiGet<MissionsResponse>("/api/nonprofit/missions/pending", token);
    if (!error) setMissions(data?.missions ?? []);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const handleAction = async (missionId: string, action: "approve" | "reject") => {
    const token = getStoredToken();
    setSubmittingId(missionId);
    await apiPost(`/api/nonprofit/missions/${missionId}/${action}`, {}, token);
    setSubmittingId(null);
    await load();
  };

  const handleRowClick = (mission: ApiMission) => {
    setSelectedMission(mission);
    setDialogOpen(true);
  };

  const displayMissions = maxVisible > 0 ? missions.slice(0, maxVisible) : missions;
  const hasMore = maxVisible > 0 && missions.length > maxVisible;
  const scrollMaxHeight = maxHeight ?? (maxVisible > 0 ? "320px" : "70vh");

  const locationDisplay = (m: ApiMission) => (m.is_virtual ? t("Virtual") : (m.location || "-"));

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold">{title ?? t("Missions Pending Approval")}</CardTitle>
        {showViewAllLink && missions.length > 0 && (
          <Link
            to="/nonprofit/missions/pending"
            className="text-sm text-coompass-primary hover:underline flex items-center gap-1"
          >
            {t("View all pending")}
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {loading ? (
          <p className="text-sm text-muted-foreground py-6 text-center">{t("Loading...")}</p>
        ) : missions.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            {t("No pending missions to approve.")}
          </p>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-auto" style={{ maxHeight: scrollMaxHeight }}>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs">{t("Mission")}</TableHead>
                    <TableHead className="text-xs">{t("Company")}</TableHead>
                    <TableHead className="text-xs">{t("Dates")}</TableHead>
                    <TableHead className="text-xs">{t("Location")}</TableHead>
                    <TableHead className="text-xs">{t("Status")}</TableHead>
                    <TableHead className="text-xs w-8" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayMissions.map((mission) => (
                    <TableRow
                      key={mission.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleRowClick(mission)}
                    >
                      <TableCell className="text-sm font-medium">{mission.title}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {mission.company_name ?? "-"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {mission.start_date && mission.end_date
                          ? `${formatDatePt(mission.start_date)} – ${formatDatePt(mission.end_date)}`
                          : formatDatePt(mission.start_date)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {locationDisplay(mission)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-amber-500/20 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                        >
                          {t("Pending")}
                        </Badge>
                      </TableCell>
                      <TableCell className="w-8">
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {hasMore && (
              <div className="border-t px-3 py-2 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {t("Showing first {{count}} pending missions.", { count: maxVisible })}
                </p>
                <Link
                  to="/nonprofit/missions/pending"
                  className="text-xs text-coompass-primary hover:underline"
                >
                  {t("View all")}
                </Link>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <PendingMissionApprovalDialog
        mission={selectedMission}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onApprove={(id) => handleAction(id, "approve")}
        onReject={(id) => handleAction(id, "reject")}
        isSubmitting={submittingId !== null}
      />
    </Card>
  );
}
