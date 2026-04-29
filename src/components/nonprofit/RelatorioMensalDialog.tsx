import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Download,
  CheckCircle2,
  MapPin,
  Users,
  Clock,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";
import { SDGs } from "@/data/sdgs";
import { formatMonthYearPt } from "@/lib/dateFormat";
import { useTranslation } from "react-i18next";
import { translateSdgName } from "@/utils/sdgI18n";
import { useNonprofitMissionMetrics } from "@/hooks/useNonprofitMissionMetrics";
import { useNonprofitExtendedMetrics } from "@/hooks/useNonprofitExtendedMetrics";
import { apiGet, getStoredToken } from "@/services/authApi";
import type { NonprofitProfileResponse } from "@/components/nonprofit/NonprofitProfileCard";
import { Document, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";
import type { ApiMission, MissionsResponse } from "@/types/missions";
import { PORTUGAL_DISTRICTS } from "@/constants/portugalDistricts";

const FALLBACK_NONPROFIT_NAME = "Nonprofit";
const SDG_IMAGE_BASE =
  "https://e4k4c4x9.delivery.rocketcdn.me/en/wp-content/uploads/sites/15/2020/06/sustainable-development-goal";

function getSdgImageUrl(goal: number): string {
  return `${SDG_IMAGE_BASE}-${goal}.jpg`;
}

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

type MonthlyReportData = {
  missoes: number;
  areas: string[];
  ods: number[];
  numeroBeneficiarios: number;
  numeroVoluntarios: number;
  horasVoluntariado: number;
  competenciasDesenvolvidas: string[];
};

const monthlyPdfStyles = StyleSheet.create({
  page: { padding: 32, fontSize: 11, fontFamily: "Helvetica", color: "#111827" },
  title: { fontSize: 20, fontWeight: 700, marginBottom: 4 },
  subtitle: { fontSize: 11, color: "#6B7280", marginBottom: 16 },
  section: { marginBottom: 14 },
  sectionTitle: { fontSize: 12, fontWeight: 700, marginBottom: 6 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  label: { color: "#374151" },
  value: { fontWeight: 700 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  chip: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 6,
  },
});

interface RelatorioMensalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  reportData?: MonthlyReportData;
}

export function RelatorioMensalDialog({
  isOpen,
  onClose,
  reportData,
}: RelatorioMensalDialogProps) {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<NonprofitProfileResponse | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [missions, setMissions] = useState<ApiMission[]>([]);
  const [missionsLoading, setMissionsLoading] = useState(false);
  const [missionsError, setMissionsError] = useState<string | null>(null);
  const {
    data: metricsData,
    loading: metricsLoading,
    error: metricsError,
  } = useNonprofitMissionMetrics("30d", { enabled: isOpen });
  const {
    data: extendedData,
    loading: extendedLoading,
    error: extendedError,
  } = useNonprofitExtendedMetrics("30d", { enabled: isOpen });

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    setProfileLoading(true);
    setProfileError(null);

    apiGet<NonprofitProfileResponse>("/api/nonprofit/profile", getStoredToken())
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setProfileError(error);
          return;
        }
        setProfile(data ?? null);
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

  const missionDistricts = useMemo(() => {
    const districtEntries = PORTUGAL_DISTRICTS.map((district) => ({
      original: district,
      normalized: normalizeText(district),
    })).sort((a, b) => b.normalized.length - a.normalized.length);
    const seen = new Set<string>();
    const normalized = missions
      .map((mission) => {
        if (mission.is_virtual) return "";
        const missionDistrict = mission.district?.trim() ?? "";
        const missionLocation = mission.location?.trim() ?? "";

        if (missionDistrict) {
          const districtMatch = districtEntries.find(
            (entry) => entry.normalized === normalizeText(missionDistrict)
          );
          if (districtMatch) return districtMatch.original;
        }

        const locationNormalized = normalizeText(missionLocation);
        if (!locationNormalized || locationNormalized === "virtual" || locationNormalized === "remote") {
          return "";
        }

        const districtFromLocation = districtEntries.find((entry) =>
          new RegExp(`(^|\\W)${entry.normalized}(\\W|$)`, "i").test(locationNormalized)
        );
        return districtFromLocation?.original ?? "";
      })
      .filter((entry) => {
        if (!entry || seen.has(entry)) return false;
        seen.add(entry);
        return true;
      });

    return normalized;
  }, [missions]);

  const missionSkills = useMemo(() => {
    const seen = new Set<string>();
    const normalized = missions
      .flatMap((mission) => mission.skills ?? [])
      .map((skill) => skill.trim())
      .filter((skill) => {
        if (!skill || seen.has(skill)) return false;
        seen.add(skill);
        return true;
      });
    return normalized;
  }, [missions]);

  const computedData = useMemo<MonthlyReportData>(() => {
    const causeAreas = extendedData?.cause_areas_by_hours ?? [];
    const selectedSdgs =
      (extendedData?.sdg_alignment.most_used?.length ?? 0) > 0
        ? extendedData?.sdg_alignment.most_used
        : (extendedData?.sdg_alignment.radar ?? []);

    const hoursFromSeries = metricsData?.timeseries.volunteer_hours_by_month.reduce(
      (sum, point) => sum + point.hours,
      0
    );

    return {
      missoes: metricsData?.missions.finished ?? 0,
      areas: missionDistricts,
      ods: selectedSdgs.slice(0, 6).map((item) => item.id),
      numeroBeneficiarios: metricsData?.beneficiaries_completed_total ?? 0,
      numeroVoluntarios: metricsData?.participants.enrolled_total ?? 0,
      horasVoluntariado: metricsData?.volunteer_hours_total ?? hoursFromSeries ?? 0,
      competenciasDesenvolvidas:
        missionSkills.length > 0 ? missionSkills : causeAreas.slice(0, 8).map((item) => item.name),
    };
  }, [extendedData, metricsData, missionDistricts, missionSkills]);

  const data = reportData ?? computedData;
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
  const loading = !reportData && (metricsLoading || extendedLoading || profileLoading || missionsLoading);
  const errors = [metricsError, extendedError, profileError, missionsError].filter(Boolean);

  const odsWithMeta = data.ods
    .map((id) => SDGs.find((s) => s.id === id))
    .filter(Boolean);

  const handleDownload = async () => {
    try {
      const reportDate = new Date();
      const isoDate = reportDate.toISOString().split("T")[0];
      const odsLabels = odsWithMeta.map(
        (sdg) => `ODS ${sdg.id}: ${translateSdgName(sdg, t)}`
      );

      const doc = (
        <Document>
          <Page size="A4" style={monthlyPdfStyles.page}>
            <Text style={monthlyPdfStyles.title}>Relatório Mensal</Text>
            <Text style={monthlyPdfStyles.subtitle}>
              {organizationName} • {formatMonthYearPt(reportDate)}
            </Text>

            <View style={monthlyPdfStyles.section}>
              <Text style={monthlyPdfStyles.sectionTitle}>Indicadores Principais</Text>
              <View style={monthlyPdfStyles.row}>
                <Text style={monthlyPdfStyles.label}>Missões Completas</Text>
                <Text style={monthlyPdfStyles.value}>{data.missoes.toLocaleString("pt-PT")}</Text>
              </View>
              <View style={monthlyPdfStyles.row}>
                <Text style={monthlyPdfStyles.label}>Nº Beneficiários</Text>
                <Text style={monthlyPdfStyles.value}>
                  {data.numeroBeneficiarios.toLocaleString("pt-PT")}
                </Text>
              </View>
              <View style={monthlyPdfStyles.row}>
                <Text style={monthlyPdfStyles.label}>Nº de Voluntários</Text>
                <Text style={monthlyPdfStyles.value}>
                  {data.numeroVoluntarios.toLocaleString("pt-PT")}
                </Text>
              </View>
              <View style={monthlyPdfStyles.row}>
                <Text style={monthlyPdfStyles.label}>Horas de Voluntariado</Text>
                <Text style={monthlyPdfStyles.value}>
                  {data.horasVoluntariado.toLocaleString("pt-PT")}
                </Text>
              </View>
            </View>

            <View style={monthlyPdfStyles.section}>
              <Text style={monthlyPdfStyles.sectionTitle}>Áreas de Atuação</Text>
              <Text>{data.areas.length > 0 ? data.areas.join(", ") : "Sem dados"}</Text>
            </View>

            <View style={monthlyPdfStyles.section}>
              <Text style={monthlyPdfStyles.sectionTitle}>ODS</Text>
              <View style={monthlyPdfStyles.chipRow}>
                {(odsLabels.length > 0 ? odsLabels : ["Sem dados"]).map((label) => (
                  <Text key={label} style={monthlyPdfStyles.chip}>
                    {label}
                  </Text>
                ))}
              </View>
            </View>

            <View style={monthlyPdfStyles.section}>
              <Text style={monthlyPdfStyles.sectionTitle}>Competências Desenvolvidas</Text>
              <View style={monthlyPdfStyles.chipRow}>
                {(data.competenciasDesenvolvidas.length > 0
                  ? data.competenciasDesenvolvidas
                  : ["Sem dados"]
                ).map((skill) => (
                  <Text key={skill} style={monthlyPdfStyles.chip}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>
          </Page>
        </Document>
      );

      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `relatorio-mensal-${isoDate}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Relatório mensal em PDF transferido");
    } catch {
      toast.error("Não foi possível gerar o PDF.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100vw-1rem)] sm:w-[92vw] max-w-3xl max-h-[92vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 space-y-0 pb-4 border-b">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-12 w-12 shrink-0 border border-border">
              <AvatarImage src={organizationLogo} alt={organizationName} />
              <AvatarFallback>{organizationInitials}</AvatarFallback>
            </Avatar>
            <DialogTitle className="text-base sm:text-lg font-semibold truncate">
              {organizationName}
            </DialogTitle>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
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
          <p className="text-sm font-medium text-muted-foreground">
            Relatório Mensal ·{" "}
            {formatMonthYearPt(new Date())}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card className="p-4 flex flex-col">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-0.5">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                Missões Completas
              </div>
              <div className="text-xl font-bold">{loading ? "—" : data.missoes}</div>
            </Card>
            <Card className="p-4 flex flex-col">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-0.5">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                Áreas de Atuação
              </div>
              {loading ? (
                <div className="text-sm font-medium">—</div>
              ) : data.areas.length > 0 ? (
                <ul className="mt-1 flex flex-wrap gap-1.5">
                  {data.areas.map((area) => (
                    <li
                      key={area}
                      className="text-xs sm:text-sm rounded-md bg-muted/40 px-2.5 py-1.5 leading-tight"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm font-medium text-muted-foreground">Sem dados</div>
              )}
            </Card>
            <Card className="p-4 sm:col-span-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <span className="font-medium">ODS</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {loading ? (
                  <span className="text-sm text-muted-foreground">A carregar...</span>
                ) : odsWithMeta.length > 0 ? (
                  odsWithMeta.map((sdg) => (
                    <div
                      key={sdg.id}
                      className="flex items-center gap-2 rounded-md border border-border/70 bg-muted/30 px-2.5 py-2"
                      title={translateSdgName(sdg, t)}
                    >
                      <img
                        src={getSdgImageUrl(sdg.id)}
                        alt={`ODS ${sdg.id}: ${translateSdgName(sdg, t)}`}
                        className="h-9 w-9 rounded object-cover shrink-0 shadow-sm"
                      />
                      <span className="text-xs sm:text-sm leading-tight font-medium">
                        {translateSdgName(sdg, t)}
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">Sem dados</span>
                )}
              </div>
            </Card>
            <Card className="p-4 flex flex-col">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-0.5">
                <Users className="h-3.5 w-3.5 shrink-0" />
                Nº Beneficiários
              </div>
              <div className="text-xl font-bold">
                {loading ? "—" : data.numeroBeneficiarios.toLocaleString("pt-PT")}
              </div>
            </Card>
            <Card className="p-4 flex flex-col">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-0.5">
                <Users className="h-3.5 w-3.5 shrink-0" />
                Nº de Voluntários
              </div>
              <div className="text-xl font-bold">
                {loading ? "—" : data.numeroVoluntarios.toLocaleString("pt-PT")}
              </div>
            </Card>
            <Card className="p-4 flex flex-col sm:col-span-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-0.5">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                Horas de Voluntariado
              </div>
              <div className="text-xl font-bold">
                {loading ? "—" : data.horasVoluntariado.toLocaleString("pt-PT")}
              </div>
            </Card>
          </div>

          <Card className="p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <GraduationCap className="h-3.5 w-3.5 shrink-0" />
              Competências desenvolvidas
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {loading ? (
                <li className="text-sm text-muted-foreground">A carregar...</li>
              ) : data.competenciasDesenvolvidas.length > 0 ? (
                data.competenciasDesenvolvidas.map((skill) => (
                  <li
                    key={skill}
                    className="text-xs sm:text-sm rounded-md border border-border/60 bg-muted/30 px-2.5 py-1.5 leading-tight"
                  >
                    {skill}
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground">Sem dados</li>
              )}
            </ul>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
