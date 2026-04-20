import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, Table as TableIcon, Users, Clock, CheckCircle2, Heart } from "lucide-react";
import { toast } from "sonner";
import { apiGet, getStoredToken } from "@/services/authApi";
import type { NonprofitProfileResponse } from "@/components/nonprofit/NonprofitProfileCard";
import { formatMonthLabelPt } from "@/lib/dateFormat";
import { Document, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";
import type { ApiMission, MissionsResponse } from "@/types/missions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FALLBACK_NONPROFIT_NAME = "Nonprofit";

type AnnualReportRow = {
  month: string;
  monthIndex: number;
  volunteersEngaged: number;
  volunteerHours: number;
  missionsCompleted: number;
  peopleBenefitted: number;
};

const annualPdfStyles = StyleSheet.create({
  page: { padding: 30, fontSize: 10.5, fontFamily: "Helvetica", color: "#111827" },
  title: { fontSize: 20, fontWeight: 700, marginBottom: 4 },
  subtitle: { fontSize: 11, color: "#6B7280", marginBottom: 14 },
  sectionTitle: { fontSize: 12, fontWeight: 700, marginBottom: 6, marginTop: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  tableHeader: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#D1D5DB",
    paddingVertical: 6,
    marginTop: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 5,
  },
  monthCol: { width: "18%" },
  col: { width: "20.5%", textAlign: "right" },
  headerLabel: { fontWeight: 700 },
});

interface RelatorioAnualDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RelatorioAnualDialog({
  isOpen,
  onClose,
}: RelatorioAnualDialogProps) {
  const [profile, setProfile] = useState<NonprofitProfileResponse | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [missions, setMissions] = useState<ApiMission[]>([]);
  const [missionsLoading, setMissionsLoading] = useState(false);
  const [missionsError, setMissionsError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    setProfileLoading(true);
    setProfileError(null);

    apiGet<NonprofitProfileResponse>("/api/nonprofit/profile", getStoredToken())
      .then(({ data: profileData, error }) => {
        if (cancelled) return;
        if (error) {
          setProfileError(error);
          return;
        }
        setProfile(profileData ?? null);
      })
      .finally(() => {
        if (!cancelled) setProfileLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    setMissionsLoading(true);
    setMissionsError(null);

    apiGet<MissionsResponse>("/api/nonprofit/missions", getStoredToken())
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setMissionsError(error);
          return;
        }
        setMissions(data?.missions ?? []);
      })
      .finally(() => {
        if (!cancelled) setMissionsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const availableYears = useMemo(() => {
    const years = new Set<number>();
    for (const mission of missions) {
      const date = missionDate(mission);
      if (date) years.add(date.getFullYear());
    }
    const sorted = Array.from(years).sort((a, b) => b - a);
    return sorted.length > 0 ? sorted : [new Date().getFullYear()];
  }, [missions]);

  useEffect(() => {
    if (!availableYears.includes(selectedYear)) {
      setSelectedYear(availableYears[0]);
    }
  }, [availableYears, selectedYear]);

  const rows = useMemo<AnnualReportRow[]>(() => {
    const yearRows = Array.from({ length: 12 }, (_, monthIndex) => ({
      month: `${selectedYear}-${String(monthIndex + 1).padStart(2, "0")}`,
      monthIndex,
      volunteersEngaged: 0,
      volunteerHours: 0,
      missionsCompleted: 0,
      peopleBenefitted: 0,
    }));

    for (const mission of missions) {
      const date = missionDate(mission);
      if (!date || date.getFullYear() !== selectedYear) continue;
      const monthIndex = date.getMonth();
      const row = yearRows[monthIndex];
      if (!row) continue;

      const volunteers = mission.participants_count ?? mission.approved_candidates_count ?? 0;
      row.volunteersEngaged += volunteers;
      row.volunteerHours += mission.hours ?? 0;
      row.peopleBenefitted += mission.beneficiaries_count ?? 0;
      if (mission.execution_status === "completed") {
        row.missionsCompleted += 1;
      }
    }

    return yearRows;
  }, [missions, selectedYear]);

  const totals = rows.reduce(
    (acc, row) => {
      if (isFutureMonth(selectedYear, row.monthIndex)) return acc;
      return {
        volunteersEngaged: acc.volunteersEngaged + row.volunteersEngaged,
        volunteerHours: acc.volunteerHours + row.volunteerHours,
        missionsCompleted: acc.missionsCompleted + row.missionsCompleted,
        peopleBenefitted: acc.peopleBenefitted + row.peopleBenefitted,
      };
    },
    { volunteersEngaged: 0, volunteerHours: 0, missionsCompleted: 0, peopleBenefitted: 0 }
  );

  const organizationName = profile?.organization_name ?? FALLBACK_NONPROFIT_NAME;
  const organizationLogo =
    profile?.avatar_url ??
    `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(organizationName)}`;
  const organizationInitials =
    organizationName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "NP";
  const loading = missionsLoading || profileLoading;
  const errors = [missionsError, profileError].filter(Boolean);

  const handleDownload = async () => {
    try {
      const doc = (
        <Document>
          <Page size="A4" style={annualPdfStyles.page}>
            <Text style={annualPdfStyles.title}>Relatório Anual</Text>
            <Text style={annualPdfStyles.subtitle}>
              {organizationName} • {selectedYear}
            </Text>

            <Text style={annualPdfStyles.sectionTitle}>Totais do Ano</Text>
            <View style={annualPdfStyles.row}>
              <Text>Volunteers Engaged</Text>
              <Text>{totals.volunteersEngaged.toLocaleString("pt-PT")}</Text>
            </View>
            <View style={annualPdfStyles.row}>
              <Text>Volunteer Hours</Text>
              <Text>{totals.volunteerHours.toLocaleString("pt-PT")}</Text>
            </View>
            <View style={annualPdfStyles.row}>
              <Text>Missions Completed</Text>
              <Text>{totals.missionsCompleted.toLocaleString("pt-PT")}</Text>
            </View>
            <View style={annualPdfStyles.row}>
              <Text>People Benefitted</Text>
              <Text>{totals.peopleBenefitted.toLocaleString("pt-PT")}</Text>
            </View>

            <Text style={annualPdfStyles.sectionTitle}>Detalhe Mensal</Text>
            <View style={annualPdfStyles.tableHeader}>
              <Text style={[annualPdfStyles.monthCol, annualPdfStyles.headerLabel]}>Mês</Text>
              <Text style={[annualPdfStyles.col, annualPdfStyles.headerLabel]}>Volunteers</Text>
              <Text style={[annualPdfStyles.col, annualPdfStyles.headerLabel]}>Hours</Text>
              <Text style={[annualPdfStyles.col, annualPdfStyles.headerLabel]}>Missions</Text>
              <Text style={[annualPdfStyles.col, annualPdfStyles.headerLabel]}>Benefitted</Text>
            </View>
            {rows.map((row) => (
              <View key={row.month} style={annualPdfStyles.tableRow}>
                <Text style={annualPdfStyles.monthCol}>{formatMonthLabelPt(row.month)}</Text>
                <Text style={annualPdfStyles.col}>
                  {isFutureMonth(selectedYear, row.monthIndex)
                    ? "-"
                    : row.volunteersEngaged.toLocaleString("pt-PT")}
                </Text>
                <Text style={annualPdfStyles.col}>
                  {isFutureMonth(selectedYear, row.monthIndex)
                    ? "-"
                    : row.volunteerHours.toLocaleString("pt-PT")}
                </Text>
                <Text style={annualPdfStyles.col}>
                  {isFutureMonth(selectedYear, row.monthIndex)
                    ? "-"
                    : row.missionsCompleted.toLocaleString("pt-PT")}
                </Text>
                <Text style={annualPdfStyles.col}>
                  {isFutureMonth(selectedYear, row.monthIndex)
                    ? "-"
                    : row.peopleBenefitted.toLocaleString("pt-PT")}
                </Text>
              </View>
            ))}
          </Page>
        </Document>
      );

      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `relatorio-anual-${selectedYear}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Relatório anual em PDF transferido");
    } catch {
      toast.error("Não foi possível gerar o PDF.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-4 border-b">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-12 w-12 shrink-0 border border-border">
              <AvatarImage src={organizationLogo} alt={organizationName} />
              <AvatarFallback>{organizationInitials}</AvatarFallback>
            </Avatar>
            <DialogTitle className="text-lg font-semibold truncate flex items-center gap-2">
              <TableIcon className="h-4 w-4" />
              Relatório Anual · {organizationName}
            </DialogTitle>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleDownload}
              disabled={loading}
              aria-label="Transferir"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {errors.length > 0 ? <p className="text-sm text-destructive">{errors.join(" | ")}</p> : null}

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Comparação mensal dos principais indicadores ({selectedYear})
            </p>
            <div className="w-full sm:w-44">
              <Select
                value={String(selectedYear)}
                onValueChange={(value) => setSelectedYear(Number(value))}
                disabled={loading}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Volunteers Engaged</div>
                <div className="text-lg font-bold">
                  {loading ? "—" : totals.volunteersEngaged.toLocaleString("pt-PT")}
                </div>
              </div>
            </Card>
            <Card className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Volunteer Hours</div>
                <div className="text-lg font-bold">
                  {loading ? "—" : totals.volunteerHours.toLocaleString("pt-PT")}
                </div>
              </div>
            </Card>
            <Card className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Missions Completed</div>
                <div className="text-lg font-bold">
                  {loading ? "—" : totals.missionsCompleted.toLocaleString("pt-PT")}
                </div>
              </div>
            </Card>
            <Card className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">People Benefitted</div>
                <div className="text-lg font-bold">
                  {loading ? "—" : totals.peopleBenefitted.toLocaleString("pt-PT")}
                </div>
              </div>
            </Card>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">Mês</th>
                    <th className="px-3 py-2 text-left font-medium">Volunteers Engaged</th>
                    <th className="px-3 py-2 text-left font-medium">Volunteer Hours</th>
                    <th className="px-3 py-2 text-left font-medium">Missions Completed</th>
                    <th className="px-3 py-2 text-left font-medium">People Benefitted</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr className="border-t">
                      <td className="px-3 py-2 text-muted-foreground" colSpan={5}>
                        A carregar dados...
                      </td>
                    </tr>
                  ) : (
                    rows.map((row) => (
                      <tr key={row.month} className="border-t">
                        <td className="px-3 py-2">{formatMonthLabelPt(row.month)}</td>
                        <td className="px-3 py-2">
                          {isFutureMonth(selectedYear, row.monthIndex)
                            ? "-"
                            : row.volunteersEngaged.toLocaleString("pt-PT")}
                        </td>
                        <td className="px-3 py-2">
                          {isFutureMonth(selectedYear, row.monthIndex)
                            ? "-"
                            : row.volunteerHours.toLocaleString("pt-PT")}
                        </td>
                        <td className="px-3 py-2">
                          {isFutureMonth(selectedYear, row.monthIndex)
                            ? "-"
                            : row.missionsCompleted.toLocaleString("pt-PT")}
                        </td>
                        <td className="px-3 py-2">
                          {isFutureMonth(selectedYear, row.monthIndex)
                            ? "-"
                            : row.peopleBenefitted.toLocaleString("pt-PT")}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function missionDate(mission: ApiMission): Date | null {
  const raw = mission.completed_at ?? mission.end_date ?? mission.start_date ?? mission.created_at ?? null;
  if (!raw) return null;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function isFutureMonth(year: number, monthIndex: number): boolean {
  const now = new Date();
  return year === now.getFullYear() && monthIndex > now.getMonth();
}

