import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { Calendar, FileText, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiMission, IncompleteMissionSetup } from "@/types/missions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDatePt } from "@/lib/dateFormat";

type MissionItem = {
  id: string;
  title: string;
  description: string;
  approvalStatus: ApiMission["approval_status"];
  executionStatus: ApiMission["execution_status"];
  organization: string;
  startDate: string;
  endDate: string;
  location: string;
  approvedCandidatesCount: number;
  volunteersRequired: number;
};

interface CompanyMissionsSectionProps {
  activeMissions: ApiMission[];
  pastMissions: ApiMission[];
  incompleteMissionSetups?: IncompleteMissionSetup[];
  isLoading?: boolean;
}

export function CompanyMissionsSection({
  activeMissions,
  pastMissions,
  incompleteMissionSetups = [],
  isLoading = false,
}: CompanyMissionsSectionProps) {
  const { t } = useTranslation();

  const mapMissionItem = (mission: ApiMission): MissionItem => ({
    id: mission.id,
    title: mission.title,
    description: mission.description ?? "",
    approvalStatus: mission.approval_status,
    executionStatus: mission.execution_status ?? "not_started",
    organization: mission.organization_name ?? "Nonprofit",
    startDate: mission.start_date ?? mission.created_at,
    endDate: mission.end_date ?? mission.start_date ?? mission.created_at,
    location: mission.is_virtual ? t("Remote") : mission.location || t("In-Person"),
    approvedCandidatesCount: mission.approved_candidates_count ?? 0,
    volunteersRequired: mission.volunteers_required ?? 0,
  });

  const activeMissionItems = useMemo<MissionItem[]>(
    () => activeMissions.map(mapMissionItem),
    [activeMissions, t]
  );
  const pastMissionItems = useMemo<MissionItem[]>(
    () => pastMissions.map(mapMissionItem),
    [pastMissions, t]
  );

  const getStatusBadge = (mission: MissionItem) => {
    if (mission.approvalStatus === "rejected") {
      return <Badge className="bg-muted text-muted-foreground text-xs">{t("Rejected")}</Badge>;
    }
    if (mission.executionStatus === "completed") {
      return (
        <Badge className="bg-purple-500/20 text-purple-700 dark:text-purple-400 text-xs">
          {t("Completed (mission)")}
        </Badge>
      );
    }
    if (mission.executionStatus === "cancelled") {
      return <Badge className="bg-muted text-muted-foreground text-xs">{t("Cancelled")}</Badge>;
    }
    if (mission.executionStatus === "in_progress") {
      return (
        <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 text-xs">
          {t("In Progress")}
        </Badge>
      );
    }
    if (mission.approvalStatus === "pending") {
      return <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400 text-xs">{t("Pending")}</Badge>;
    }
    return <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400 text-xs">{t("Not Started")}</Badge>;
  };

  const renderMissionRow = (mission: MissionItem) => (
    <Link
      key={mission.id}
      to={`/company/missions/${mission.id}`}
      className="block w-full p-3 border border-border rounded-lg hover:bg-foreground/5 transition-colors cursor-pointer"
    >
      <div>
        <h4 className="font-medium text-sm">{mission.title}</h4>
        <div className="mt-1 flex items-center justify-between gap-2">
          <div className="flex items-center text-xs text-blue-500">{mission.organization}</div>
          {getStatusBadge(mission)}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-0.5">
            <MapPin className="h-3 w-3" />
            {mission.location}
          </span>
          <span className="inline-flex items-center gap-0.5">
            <Calendar className="h-3 w-3" />
            {mission.startDate && mission.endDate
              ? `${formatDatePt(mission.startDate)} – ${formatDatePt(mission.endDate)}`
              : formatDatePt(mission.startDate)}
          </span>
          <span className="inline-flex items-center gap-0.5">
            <FileText className="h-3 w-3" />
            {mission.approvedCandidatesCount}/{mission.volunteersRequired} {t("accepted/required")}
          </span>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="glass-card p-4">
      {incompleteMissionSetups.length > 0 ? (
        <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h3 className="text-sm font-semibold text-foreground mb-1">
            {t("companyProject.incompleteMissionsTitle")}
          </h3>
          <p className="text-xs text-muted-foreground mb-3">{t("companyProject.incompleteMissionsHint")}</p>
          <ul className="space-y-2">
            {incompleteMissionSetups.map((setup) => (
              <li
                key={setup.id}
                className="flex flex-col gap-2 rounded-md border border-border bg-card/50 p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{setup.title}</p>
                  <p className="text-xs text-muted-foreground">{t("companyProject.incompleteMissionStatus")}</p>
                </div>
                <Button variant="outline" size="sm" className="shrink-0" asChild>
                  <Link to={`/missions/create?projectId=${encodeURIComponent(setup.id)}`}>
                    {t("companyProject.resumeMission")}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <h3 className="text-base font-semibold mb-3">{t("Missions")}:</h3>
      <Tabs defaultValue="ativas" className="w-full">
        <TabsList className="mb-3 h-8 text-xs">
          <TabsTrigger value="ativas" className="text-xs">{t("Active (missions tab)")}</TabsTrigger>
          <TabsTrigger value="passadas" className="text-xs">{t("Past")}</TabsTrigger>
        </TabsList>
        <TabsContent value="ativas" className="mt-0 space-y-2">
          {isLoading ? (
            <p className="text-sm text-muted-foreground py-4 text-center">{t("Loading...")}</p>
          ) : activeMissionItems.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">{t("No active missions.")}</p>
          ) : (
            activeMissionItems.map(renderMissionRow)
          )}
        </TabsContent>
        <TabsContent value="passadas" className="mt-0 space-y-2">
          {isLoading ? (
            <p className="text-sm text-muted-foreground py-4 text-center">{t("Loading...")}</p>
          ) : pastMissionItems.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">{t("No past missions.")}</p>
          ) : (
            pastMissionItems.map(renderMissionRow)
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-3 text-center">
        <Link to="/company/missions" className="text-xs text-coompass-success hover:underline">
          {t("View All Missions")}
        </Link>
      </div>
    </div>
  );
}
