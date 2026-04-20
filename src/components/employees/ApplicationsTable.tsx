import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDatePt } from "@/lib/dateFormat";
import { MissionApplication } from "./types";

interface ApplicationsTableProps {
  applications: MissionApplication[];
}

function nonprofitInitials(name: string): string {
  const chunks = name.trim().split(/\s+/).filter(Boolean);
  if (chunks.length === 0) return "NP";
  if (chunks.length === 1) return chunks[0].slice(0, 2).toUpperCase();
  return `${chunks[0][0]}${chunks[1][0]}`.toUpperCase();
}

export function ApplicationsTable({ applications }: ApplicationsTableProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isLightMode = theme === "light";

  if (applications.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border/80 bg-muted/15 p-10 text-center text-sm text-muted-foreground">
        {t("No applications to show")}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-x-auto rounded-lg border border-border/60",
        isLightMode && "bg-white shadow-sm"
      )}
    >
      <Table
        className={cn(isLightMode ? "bg-white" : "bg-black/20 backdrop-blur-sm")}
      >
        <TableHeader>
          <TableRow
            className={cn(
              "border-b hover:bg-transparent",
              isLightMode && "bg-gray-50"
            )}
          >
            <TableHead className="min-w-[120px] whitespace-nowrap">{t("Name")}</TableHead>
            <TableHead className="min-w-[120px] whitespace-nowrap">{t("Volunteer Department")}</TableHead>
            <TableHead className="min-w-[140px] whitespace-nowrap">{t("Mission")}</TableHead>
            <TableHead className="min-w-[160px] whitespace-nowrap">{t("Nonprofit")}</TableHead>
            <TableHead className="min-w-[100px] whitespace-nowrap">{t("Status")}</TableHead>
            <TableHead className="whitespace-nowrap">{t("Application date")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow
              key={app.id}
              className={cn(
                isLightMode ? "text-gray-700 hover:bg-gray-50" : "hover:bg-foreground/5"
              )}
            >
              <TableCell className="font-medium">{app.volunteerName}</TableCell>
              <TableCell className="text-muted-foreground">{app.volunteerDepartment || "—"}</TableCell>
              <TableCell>
                <Link
                  to={`/missions/${app.missionId}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {app.missionTitle}
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex max-w-[240px] items-center gap-2">
                  <Avatar className="h-7 w-7 border border-border">
                    <AvatarImage src={app.nonprofitLogoUrl ?? undefined} alt={app.nonprofitName} />
                    <AvatarFallback className="text-[10px]">{nonprofitInitials(app.nonprofitName)}</AvatarFallback>
                  </Avatar>
                  <span className="truncate text-sm">{app.nonprofitName}</span>
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">
                {t(app.status)}
              </TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">
                {formatDatePt(app.appliedAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
