
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { PendingVolunteer } from "@/components/nonprofit/volunteer/VolunteerTypes";

interface PendingVolunteerTableProps {
  volunteers: PendingVolunteer[];
  onSelectVolunteer: (volunteer: PendingVolunteer) => void;
}

export function PendingVolunteerTable({ 
  volunteers, 
  onSelectVolunteer
}: PendingVolunteerTableProps) {
  const { t } = useTranslation();
  
  return (
    <div className="glass-card p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold">{t("Applications")}</h2>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-2 text-xs">{t("Name")}</TableHead>
              <TableHead className="py-2 text-xs">{t("Applied Date")}</TableHead>
              <TableHead className="py-2 text-xs">{t("Status")}</TableHead>
              <TableHead className="py-2 text-xs">{t("Availability")}</TableHead>
              <TableHead className="py-2 text-xs">{t("Mission")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {volunteers.length > 0 ? (
              volunteers.map((volunteer) => (
                <TableRow
                  key={volunteer.id}
                  className="text-sm cursor-pointer"
                  onClick={() => onSelectVolunteer(volunteer)}
                >
                  <TableCell className="font-medium py-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-7 h-7 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs">
                        {volunteer.name.charAt(0)}
                      </div>
                      <div>
                        <span className="hover:underline text-sm">{volunteer.name}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-2">{volunteer.applyDate}</TableCell>
                  <TableCell className="py-2">
                    <Badge
                      variant="outline"
                      className={
                        volunteer.status === "accepted"
                          ? "bg-green-500/20 text-green-700 dark:bg-green-950 dark:text-green-400 border-green-500/30"
                          : "bg-amber-500/20 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-amber-500/30"
                      }
                    >
                      {volunteer.status === "accepted" ? t("Accepted") : t("Pending")}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-2">{volunteer.availability}</TableCell>
                  <TableCell className="py-2">
                    <Link
                      to={`/missions/${volunteer.missionId}`}
                      className="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-300 px-1.5 py-0.5 rounded hover:underline"
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      {volunteer.mission}
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-16 text-center text-muted-foreground text-sm py-4">
                  {t("No pending missions")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
