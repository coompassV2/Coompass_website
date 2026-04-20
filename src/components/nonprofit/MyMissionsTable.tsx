import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import type { Mission } from "@/types/organization";
import { apiGet, getStoredToken } from "@/services/authApi";
import { ApiMission, MissionsResponse } from "@/types/missions";
import { MapPin } from "lucide-react";
import { formatDatePt } from "@/lib/dateFormat";

/** Org name used when user has no organization in context (demo / NonprofitProfileCard). */
const DEFAULT_NONPROFIT_ORG_NAME = "Community Environmental Alliance";

interface MyMissionsTableProps {
  showLaunchMission?: boolean;
  organizationNameOverride?: string;
  nonprofitId?: string;
  readOnly?: boolean;
}

export function MyMissionsTable({
  showLaunchMission = true,
  organizationNameOverride,
  nonprofitId,
  readOnly = false,
}: MyMissionsTableProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orgMissions, setOrgMissions] = useState<Mission[]>([]);

  const userOrganizationName =
    user?.user_metadata && typeof (user.user_metadata as { organization_name?: string }).organization_name === "string"
      ? (user.user_metadata as { organization_name: string }).organization_name
      : DEFAULT_NONPROFIT_ORG_NAME;
  const orgName = organizationNameOverride?.trim() || userOrganizationName;

  useEffect(() => {
    let cancelled = false;
    const token = getStoredToken();
    const mapMission = (m: ApiMission): Mission => ({
      id: m.id,
      title: m.title,
      organization: orgName,
      description: m.description ?? "",
      hours: m.hours ?? 0,
      volunteers: m.volunteers_required ?? 0,
      location: m.is_virtual ? "Virtual" : m.location || "In-Person",
      postedDate: m.created_at ? formatDatePt(m.created_at, "") : "",
      startDate: m.start_date ? formatDatePt(m.start_date, "") : undefined,
      endDate: m.end_date ? formatDatePt(m.end_date, "") : undefined,
      isActive:
        m.approval_status === "approved" &&
        m.execution_status !== "completed" &&
        m.execution_status !== "cancelled",
      approvalStatus: m.approval_status,
      executionStatus: m.execution_status ?? "not_started",
      startedAt: m.started_at ?? null,
      approvedCandidatesCount: m.approved_candidates_count ?? 0,
    });

    setLoading(true);
    const routeScopedNonprofitId = nonprofitId?.trim() ?? "";
    const endpoint = routeScopedNonprofitId
      ? `/api/nonprofit/public-missions?id=${encodeURIComponent(routeScopedNonprofitId)}`
      : "/api/nonprofit/missions";
    apiGet<MissionsResponse>(endpoint, token)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setOrgMissions([]);
          return;
        }
        const byStartDate = (a: ApiMission, b: ApiMission) => {
          const aTs = a.start_date ? new Date(a.start_date).getTime() : Number.POSITIVE_INFINITY;
          const bTs = b.start_date ? new Date(b.start_date).getTime() : Number.POSITIVE_INFINITY;
          if (aTs !== bTs) return aTs - bTs;
          const aCreatedTs = a.created_at ? new Date(a.created_at).getTime() : Number.POSITIVE_INFINITY;
          const bCreatedTs = b.created_at ? new Date(b.created_at).getTime() : Number.POSITIVE_INFINITY;
          return aCreatedTs - bCreatedTs;
        };
        setOrgMissions([...(data?.missions ?? [])].sort(byStartDate).map(mapMission));
      })
      .catch(() => {
        if (!cancelled) setOrgMissions([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [orgName, nonprofitId]);

  const activeMissions = orgMissions.filter((m) => m.isActive !== false);
  const pastMissions = orgMissions.filter((m) => m.isActive === false);

  if (loading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-semibold">
            {showLaunchMission ? t("My Missions") : t("Organization Missions")}
          </CardTitle>
          {showLaunchMission && !readOnly ? (
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
              <Link to="/missions/create">{t("Launch Mission")}</Link>
            </Button>
          ) : null}
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="h-8 bg-muted rounded animate-pulse w-48" />
            <div className="rounded-md border">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 border-b border-border p-3 last:border-b-0"
                >
                  <div className="h-4 bg-muted rounded animate-pulse flex-1" />
                  <div className="h-4 bg-muted rounded animate-pulse w-24" />
                  <div className="h-5 bg-muted rounded animate-pulse w-16" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-semibold">
          {showLaunchMission ? t("My Missions") : t("Organization Missions")}
        </CardTitle>
        {showLaunchMission && !readOnly ? (
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
            <Link to="/missions/create">{t("Launch Mission")}</Link>
          </Button>
        ) : null}
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="ativas" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-xs h-9">
            <TabsTrigger value="ativas" className="text-xs">
              {t("Active (missions tab)")}
            </TabsTrigger>
            <TabsTrigger value="passadas" className="text-xs">
              {t("Past")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ativas" className="mt-3">
            {activeMissions.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">
                {t("No active missions yet.")}
              </p>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-auto max-h-[280px]">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-xs">{t("Mission")}</TableHead>
                        <TableHead className="text-xs">{t("Date")}</TableHead>
                        <TableHead className="text-xs">{t("Location")}</TableHead>
                        <TableHead className="text-xs">{t("Volunteers")}</TableHead>
                        <TableHead className="text-xs">{t("Status")}</TableHead>
                        <TableHead className="text-right text-xs">{t("Actions")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeMissions.map((m) => (
                        <TableRow key={m.id}>
                          <TableCell className="font-medium text-sm">{m.title}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {m.startDate && m.endDate
                              ? `${m.startDate} – ${m.endDate}`
                              : m.postedDate || "-"}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {m.location || "-"}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {`${m.approvedCandidatesCount ?? 0}/${m.volunteers ?? 0}`}
                          </TableCell>
                          <TableCell>
                            {m.executionStatus === "not_started" ? (
                              <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400 text-xs">
                                {t("Not Started")}
                              </Badge>
                            ) : (
                              <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 text-xs">
                                {t("Active")}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="sm" className="text-xs" asChild>
                                <Link to={`/missions/${m.id}`}>{t("View")}</Link>
                              </Button>
                              {!readOnly && m.approvalStatus === "approved" && (
                                <>
                                  {m.executionStatus === "not_started" && (
                                    <Button variant="ghost" size="sm" className="text-xs" asChild>
                                      <Link to={`/missions/${m.id}/edit`}>{t("Edit")}</Link>
                                    </Button>
                                  )}
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="passadas" className="mt-3">
            {pastMissions.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">
                {t("No past missions yet.")}
              </p>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-auto max-h-[280px]">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-xs">{t("Mission")}</TableHead>
                        <TableHead className="text-xs">{t("Date")}</TableHead>
                        <TableHead className="text-xs">{t("Location")}</TableHead>
                        <TableHead className="text-xs">{t("Volunteers")}</TableHead>
                        <TableHead className="text-xs">{t("Status")}</TableHead>
                        <TableHead className="text-right text-xs">{t("Actions")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pastMissions.map((m) => (
                        <TableRow key={m.id}>
                          <TableCell className="font-medium text-sm">{m.title}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {m.startDate && m.endDate
                              ? `${m.startDate} – ${m.endDate}`
                              : m.postedDate || "-"}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {m.location || "-"}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {`${m.approvedCandidatesCount ?? 0}/${m.volunteers ?? 0}`}
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-muted text-muted-foreground text-xs">
                              {t("Past")}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="sm" className="text-xs" asChild>
                                <Link to={`/missions/${m.id}`}>{t("View")}</Link>
                              </Button>
                              {!readOnly && m.approvalStatus === "approved" && (
                                <>
                                  {m.executionStatus === "not_started" && (
                                    <Button variant="ghost" size="sm" className="text-xs" asChild>
                                      <Link to={`/missions/${m.id}/edit`}>{t("Edit")}</Link>
                                    </Button>
                                  )}
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
