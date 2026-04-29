import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Check, ChevronDown, ChevronLeft, Search } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MissionDetailsStep } from "@/components/missions/MissionDetailsStep";
import { ReviewStep } from "@/components/missions/ReviewStep";
import {
  getStoredToken,
  apiGet,
  apiPost,
  uploadMissionImage,
  uploadMissionAttachment,
} from "@/services/authApi";
import { useAuth } from "@/contexts/AuthContext";
import { SEOManager } from "@/components/shared/SEOManager";
import { validateProfileImage } from "@/utils/profileImages";
import type { ApiCompanyProject, CompanyProjectSingleResponse } from "@/types/companyProjects";

const INITIAL_FORM_DATA = {
  title: "",
  description: "",
  contacts: [""],
  hoursRequired: 0,
  volunteersRequired: 0,
  beneficiariesCount: 0,
  requiresInterview: false,
  startDate: "",
  endDate: "",
  isVirtual: false,
  address: "",
  ods: [] as number[],
  causes: [] as string[],
  skills: [] as string[],
  requirements: "",
  missionImageUrl: "",
  scheduleType: "one_time" as "one_time" | "recurring",
  district: "",
};

type OrganizationOption = { id: string; name: string };

export default function MissionCreatePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const projectIdParam = searchParams.get("projectId");
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [missionImageFile, setMissionImageFile] = useState<File | null>(null);
  const [missionImagePreviewUrl, setMissionImagePreviewUrl] = useState<string | null>(null);
  const [nonprofits, setNonprofits] = useState<OrganizationOption[]>([]);
  const [targetNonprofitId, setTargetNonprofitId] = useState("");
  const [companyOwnedOnly, setCompanyOwnedOnly] = useState(false);
  const [nonprofitSelectorOpen, setNonprofitSelectorOpen] = useState(false);
  const [nonprofitSearch, setNonprofitSearch] = useState("");
  const [linkedProject, setLinkedProject] = useState<ApiCompanyProject | null>(null);
  const [missionDocuments, setMissionDocuments] = useState<File[]>([]);

  const isCompanyRoute = location.pathname.startsWith("/company");
  const isCompanyCreator = user?.role === "company_admin" || isCompanyRoute;

  const backLink = useMemo(() => {
    return isCompanyCreator ? "/company/our-missions" : "/nonprofit/dashboard";
  }, [isCompanyCreator]);
  const selectedNonprofit = useMemo(
    () => nonprofits.find((np) => np.id === targetNonprofitId) ?? null,
    [nonprofits, targetNonprofitId]
  );
  const filteredNonprofits = useMemo(() => {
    const query = nonprofitSearch.trim().toLowerCase();
    if (!query) return nonprofits;
    return nonprofits.filter((np) => np.name.toLowerCase().includes(query));
  }, [nonprofits, nonprofitSearch]);

  useEffect(() => {
    if (!isCompanyCreator) return;
    let cancelled = false;
    const token = getStoredToken();
    apiGet<{ organizations: OrganizationOption[] }>("/api/organizations", token)
      .then(({ data, error: reqError }) => {
        if (cancelled || reqError) return;
        const rows = (data?.organizations ?? []).map((org) => ({ id: org.id, name: org.name }));
        setNonprofits(rows);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [isCompanyCreator, projectIdParam]);

  useEffect(() => {
    if (!isCompanyCreator || !projectIdParam) {
      setLinkedProject(null);
      return;
    }
    let cancelled = false;
    const token = getStoredToken();
    apiGet<CompanyProjectSingleResponse>(`/api/company/projects/${projectIdParam}`, token)
      .then(({ data, error: reqError }) => {
        if (cancelled || reqError || !data?.project) return;
        const p = data.project as ApiCompanyProject;
        setLinkedProject(p);
        if (p.target_nonprofit_id) {
          setTargetNonprofitId(p.target_nonprofit_id);
          setNonprofits((prev) => {
            if (prev.some((x) => x.id === p.target_nonprofit_id)) return prev;
            return [
              ...prev,
              {
                id: p.target_nonprofit_id!,
                name: p.target_nonprofit_name ?? t("companyProject.nonprofitNameFallback"),
              },
            ];
          });
        }
        setFormData((prev) => ({
          ...prev,
          title: p.title || prev.title,
          description: p.description || prev.description,
          startDate: p.start_date ? String(p.start_date).slice(0, 10) : prev.startDate,
          endDate: p.end_date ? String(p.end_date).slice(0, 10) : prev.endDate,
          isVirtual: p.project_mode === "virtual",
          address: p.location_details || prev.address,
          scheduleType:
            p.periodicidade === "recorrente" ? "recurring" : p.periodicidade === "pontual" ? "one_time" : prev.scheduleType,
        }));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [isCompanyCreator, projectIdParam, t]);

  useEffect(() => {
    if (!isCompanyCreator) return;
    if (companyOwnedOnly) {
      setTargetNonprofitId("");
      return;
    }
    if (!targetNonprofitId && linkedProject?.target_nonprofit_id) {
      setTargetNonprofitId(linkedProject.target_nonprofit_id);
    }
  }, [isCompanyCreator, companyOwnedOnly, linkedProject, targetNonprofitId]);

  useEffect(() => {
    return () => {
      if (missionImagePreviewUrl && missionImagePreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(missionImagePreviewUrl);
      }
    };
  }, [missionImagePreviewUrl]);

  const handleContinue = (data: typeof INITIAL_FORM_DATA) => {
    setFormData(data);
    setCurrentStep(2);
    setError(null);
  };

  const handleMissionImageChange = (file: File | null) => {
    if (missionImagePreviewUrl && missionImagePreviewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(missionImagePreviewUrl);
    }
    if (!file) {
      setMissionImageFile(null);
      setMissionImagePreviewUrl(null);
      return;
    }

    const validationError = validateProfileImage(file);
    if (validationError) {
      setError(t(validationError));
      setMissionImageFile(null);
      setMissionImagePreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setMissionImageFile(file);
    setMissionImagePreviewUrl(objectUrl);
    setError(null);
  };

  const handleSubmit = async () => {
    const token = getStoredToken();
    if (!token) {
      setError(t("companyProject.sessionExpired"));
      return;
    }
    setLoading(true);
    setError(null);

    const payload: Record<string, unknown> = {
      title: formData.title,
      description: formData.description,
      hoursRequired: formData.hoursRequired || 0,
      volunteersRequired: formData.volunteersRequired || 0,
      beneficiariesCount: formData.beneficiariesCount ?? 0,
      requiresInterview: formData.requiresInterview ?? false,
      startDate: formData.startDate,
      endDate: formData.endDate,
      isVirtual: formData.isVirtual,
      address: formData.address || "",
      contacts: formData.contacts || [],
      ods: formData.ods || [],
      causes: formData.causes || [],
      skills: formData.skills || [],
      requirements: formData.requirements || "",
      scheduleType: formData.scheduleType || "one_time",
      district: formData.district || "",
    };

    if (missionImageFile) {
      const { url, error: uploadError } = await uploadMissionImage(missionImageFile, token);
      if (uploadError || !url) {
        setLoading(false);
        setError(uploadError ?? t("Failed to upload mission image."));
        return;
      }
      payload.missionImageUrl = url;
    }

    const endpoint = "/api/missions";
    if (isCompanyCreator) {
      payload.company_owned_only = companyOwnedOnly;
      if (!companyOwnedOnly && targetNonprofitId) {
        payload.target_nonprofit_id = targetNonprofitId;
      }
    }
    if (isCompanyCreator && projectIdParam) payload.project_id = projectIdParam;

    const { data, error: submitError } = await apiPost<{ id: string }>(endpoint, payload, token);
    if (submitError) {
      setLoading(false);
      setError(submitError);
      return;
    }
    const missionId = data?.id;
    let failedDocumentUploads = 0;
    if (missionId && missionDocuments.length > 0) {
      for (const file of missionDocuments) {
        const { error: uploadError } = await uploadMissionAttachment(
          missionId,
          "documents",
          file,
          token
        );
        if (uploadError) {
          failedDocumentUploads += 1;
          console.warn("[mission-create] document upload failed:", uploadError);
        }
      }
    }
    if (failedDocumentUploads > 0) {
      toast({
        title: t("Some files could not be uploaded."),
        description: t("Mission was created, but {{count}} document uploads failed.", {
          count: failedDocumentUploads,
        }),
        variant: "destructive",
      });
    }
    setLoading(false);

    if (isCompanyCreator) {
      navigate("/company/our-missions", {
        state: { missionCreated: data?.id, completedProjectMission: projectIdParam ?? undefined },
      });
      return;
    }
    navigate("/nonprofit/dashboard", { state: { missionCreated: data?.id } });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">{t("Loading...")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOManager title={t("Launch Mission")} noIndex={true} />
      {!isCompanyRoute && <AppSidebar />}
      <main
        className={cn(
          "min-h-screen flex flex-col transition-all duration-300 ease-in-out p-4 md:p-6 lg:p-8",
          !isMobile && "responsive-layout"
        )}
      >
        <div className="shrink-0">
          <PageHeader title={t("Launch Mission")} theme={theme} toggleTheme={toggleTheme} />
          <div className="mb-4">
            <Button variant="ghost" size="sm" className="gap-1 -ml-2" asChild>
              <Link
                to={backLink}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                {t("Back")}
              </Link>
            </Button>
          </div>

          {linkedProject && (
            <div className="mb-4 rounded-lg border border-coompass-success/30 bg-coompass-success/5 p-3 text-sm">
              {t("companyProject.missionLinkedToProjectBanner", { title: linkedProject.title })}
            </div>
          )}

          {isCompanyCreator ? (
            <div className="mb-4 rounded-lg border border-border bg-card p-3">
              <div className="mb-3 flex items-center gap-2">
                <Checkbox
                  id="company-owned-only"
                  checked={companyOwnedOnly}
                  onCheckedChange={(checked) => setCompanyOwnedOnly(checked === true)}
                />
                <Label htmlFor="company-owned-only" className="text-sm font-normal">
                  {t("companyProject.keepMissionOnCompany")}
                </Label>
              </div>
              {!companyOwnedOnly ? (
                <>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {t("companyProject.partnerNonprofitLabel")}
                  </label>
                  <Popover
                    open={nonprofitSelectorOpen}
                    onOpenChange={(next) => {
                      setNonprofitSelectorOpen(next);
                      if (!next) setNonprofitSearch("");
                    }}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        role="combobox"
                        aria-expanded={nonprofitSelectorOpen}
                        className="h-10 w-full justify-between px-3 text-sm font-normal"
                      >
                        <span className="truncate">
                          {selectedNonprofit?.name ?? t("companyProject.selectNonprofitPlaceholder")}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                      <div className="border-b p-2">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            value={nonprofitSearch}
                            onChange={(e) => setNonprofitSearch(e.target.value)}
                            onKeyDown={(e) => e.stopPropagation()}
                            placeholder={t("companyProject.searchNonprofitPlaceholder")}
                            className="h-9 pl-8"
                          />
                        </div>
                      </div>
                      <div className="max-h-64 overflow-y-auto p-1">
                        {filteredNonprofits.length === 0 ? (
                          <p className="py-6 text-center text-sm text-muted-foreground">
                            {t("companyProject.noNonprofitsFound")}
                          </p>
                        ) : (
                          filteredNonprofits.map((np) => (
                            <button
                              key={np.id}
                              type="button"
                              className="flex w-full items-center rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                              onClick={() => {
                                setTargetNonprofitId(np.id);
                                setNonprofitSelectorOpen(false);
                                setNonprofitSearch("");
                              }}
                            >
                              <span className="truncate">{np.name}</span>
                              {targetNonprofitId === np.id ? (
                                <Check className="ml-auto h-4 w-4 text-coompass-success" />
                              ) : null}
                            </button>
                          ))
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {t("companyProject.keepMissionOnCompanyHint")}
                </p>
              )}
            </div>
          )
          : null}

          {error && (
            <div
              className="mb-4 p-4 rounded-lg bg-destructive/10 text-destructive text-sm"
              role="alert"
            >
              {error}
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col min-h-0 w-full border rounded-xl border-border bg-card shadow-sm min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold shrink-0 px-6 pt-6 pb-4 text-foreground">
            {t("Create a New Mission")}
          </h1>

          <div className="flex-1 rounded-b-xl bg-muted/30 dark:bg-zinc-950 px-6 pb-6 pt-4 text-foreground dark:text-white flex flex-col min-h-0">
            <div className="flex shrink-0 items-center justify-center gap-4 mb-6">
              <div className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    currentStep === 1 ? "bg-coompass-success" : "bg-coompass-success/60"
                  )}
                >
                  1
                </div>
                <span
                  className={cn(
                    "ml-2 text-sm whitespace-nowrap",
                    currentStep === 1 ? "text-foreground dark:text-white" : "text-muted-foreground dark:text-gray-400"
                  )}
                >
                  {t("Mission Details")}
                </span>
                <div className="h-[2px] w-12 bg-border dark:bg-gray-600 mx-4" />
              </div>
              <div className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    currentStep === 2 ? "bg-coompass-success" : "bg-gray-600"
                  )}
                >
                  2
                </div>
                <span
                  className={cn(
                    "ml-2 text-sm whitespace-nowrap",
                    currentStep === 2 ? "text-foreground dark:text-white" : "text-muted-foreground dark:text-gray-400"
                  )}
                >
                  {t("Review and Publish")}
                </span>
              </div>
            </div>

            <div className="flex-1 min-h-0">
              {currentStep === 1 ? (
                <MissionDetailsStep
                  initialData={formData}
                  onContinue={handleContinue}
                  missionImagePreviewUrl={missionImagePreviewUrl}
                  onMissionImageChange={handleMissionImageChange}
                  hideRequiresInterview={Boolean(projectIdParam)}
                  missionDocuments={missionDocuments}
                  onMissionDocumentsChange={setMissionDocuments}
                />
              ) : (
                <ReviewStep
                  formData={formData}
                  onBack={() => setCurrentStep(1)}
                  onSubmit={handleSubmit}
                  isSubmitting={loading}
                  missionImageUrl={missionImagePreviewUrl}
                  missionDocuments={missionDocuments}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
