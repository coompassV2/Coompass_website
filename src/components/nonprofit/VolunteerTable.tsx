
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Volunteer } from "@/components/nonprofit/volunteer/VolunteerTypes";

interface VolunteerTableProps {
  volunteers: Volunteer[];
  onSelectVolunteer: (volunteer: Volunteer) => void;
}

export function VolunteerTable({ volunteers, onSelectVolunteer }: VolunteerTableProps) {
  const { t } = useTranslation();
  
  return (
    <div className="glass-card p-4">
      <h2 className="text-sm font-semibold mb-3">{t('Active Volunteers')}</h2>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-2 text-xs">{t('Name')}</TableHead>
              <TableHead className="py-2 text-xs">{t("Applied Date")}</TableHead>
              <TableHead className="py-2 text-xs">{t('Hours')}</TableHead>
              <TableHead className="py-2 text-xs">{t('Mission')}</TableHead>
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
                  <TableCell className="py-2">{volunteer.joinDate}</TableCell>
                  <TableCell className="py-2">
                    {volunteer.hours !== null ? `${volunteer.hours} hrs` : "-"}
                  </TableCell>
                  <TableCell className="py-2">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-300 px-1.5 py-0.5 rounded">
                      {volunteer.mission}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-16 text-center text-muted-foreground text-sm py-4">
                  {t('No active volunteers')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
