import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
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
import { ApiMission } from "@/types/missions";
import { formatDatePt } from "@/lib/dateFormat";
import { cn } from "@/lib/utils";

interface CompanyScheduledMissionsTableProps {
  missions: ApiMission[];
  isLoading?: boolean;
  /** Used when API rows omit `company_name` (e.g. some dev proxies); same as logged-in company. */
  currentCompanyName?: string | null;
}

export function CompanyScheduledMissionsTable({
  missions,
  isLoading = false,
  currentCompanyName,
}: CompanyScheduledMissionsTableProps) {
  const { t } = useTranslation();

  const getOwnerLabel = (mission: ApiMission) => {
    if (mission.created_by_entity_type === "nonprofit") {
      return mission.organization_name?.trim() || t("companyProject.ownerNonprofitFallback");
    }
    return (
      mission.company_name?.trim() ||
      currentCompanyName?.trim() ||
      t("companyProject.ownerCompanyFallback")
    );
  };

  const statusBadgeClass = "text-xs whitespace-nowrap px-3 py-0.5";

  const getStatusBadge = (mission: ApiMission) => {
    const executionStatus = mission.execution_status ?? "not_started";
    if (mission.approval_status === "rejected") {
      return <Badge className={cn("bg-muted text-muted-foreground", statusBadgeClass)}>{t("Rejected")}</Badge>;
    }
    if (executionStatus === "completed") {
      return (
        <Badge className={cn("bg-purple-500/20 text-purple-700 dark:text-purple-400", statusBadgeClass)}>
          {t("Completed (mission)")}
        </Badge>
      );
    }
    if (executionStatus === "in_progress") {
      return (
        <Badge className={cn("bg-green-500/20 text-green-700 dark:text-green-400", statusBadgeClass)}>
          {t("In Progress")}
        </Badge>
      );
    }
    return (
      <Badge className={cn("bg-blue-500/20 text-blue-700 dark:text-blue-400", statusBadgeClass)}>
        {t("Not Started")}
      </Badge>
    );
  };

  return (
    <div className="glass-card p-4">
      <div className="mb-3">
        <h3 className="text-base font-semibold">{t("Missões Agendadas")}</h3>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground py-6 text-center">
          {t("Loading...")}
        </p>
      ) : missions.length === 0 ? (
        <p className="text-sm text-muted-foreground py-6 text-center">
          {t("No scheduled missions yet.")}
        </p>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-auto max-h-[280px]">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs">{t("Mission")}</TableHead>
                  <TableHead className="text-xs">{t("companyProject.ownerLabel")}</TableHead>
                  <TableHead className="text-xs">{t("Date")}</TableHead>
                  <TableHead className="text-xs">{t("companyProject.acceptedOverRequiredLabel")}</TableHead>
                  <TableHead className="text-xs">{t("Status")}</TableHead>
                  <TableHead className="text-right text-xs">{t("Actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {missions.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium text-sm">{m.title}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {getOwnerLabel(m)}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {m.start_date && m.end_date
                        ? `${formatDatePt(m.start_date)} – ${formatDatePt(m.end_date)}`
                        : formatDatePt(m.start_date)}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {(m.approved_candidates_count ?? 0)}/{m.volunteers_required ?? 0}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(m)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-xs" asChild>
                        <Link to={`/company/missions/${m.id}`}>{t("View")}</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
