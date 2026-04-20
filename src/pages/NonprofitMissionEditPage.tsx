import { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { MissionDetailsStep } from "@/components/missions/MissionDetailsStep";
import { ReviewStep } from "@/components/missions/ReviewStep";
import { useAuth } from "@/contexts/AuthContext";
import {
  getStoredToken,
  apiGet,
  apiPatch,
  uploadMissionImage,
  listMissionAttachments,
  deleteMissionAttachment,
  uploadMissionAttachment,
  type MissionAttachmentItem,
} from "@/services/authApi";
import { useToast } from "@/hooks/use-toast";
import { validateProfileImage } from "@/utils/profileImages";
import type { ApiMission, MissionResponse, MissionsResponse } from "@/types/missions";

interface NonprofitProfileLookupResponse {
  id: string;
}

interface CompanyProfileLookupResponse {
  id: string;
}

function apiMissionToFormData(m: ApiMission) {
  return {
    title: m.title,
    description: m.description ?? "",
    pointOfContact: m.point_of_contact || "",
    hoursRequired: m.hours ?? 0,
    volunteersRequired: m.volunteers_required ?? 0,
    beneficiariesCount: m.beneficiaries_count ?? 0,
    requiresInterview: m.requires_interview ?? false,
    startDate: m.start_date ?? "",
    endDate: m.end_date ?? "",
    isVirtual: m.is_virtual ?? false,
    address: m.location ?? "",
    ods: m.sdgs ?? [],
    causes: m.causes ?? [],
    skills: m.skills ?? [],
    requirements: m.requirements ?? "",
    missionImageUrl: m.mission_image_url ?? "",
    scheduleType: (m.schedule_type ?? "one_time") as "one_time" | "recurring",
    district: m.district ?? "",
  };
}

export default function NonprofitMissionEditPage() {
  const { id } = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const isCompanyRoute = location.pathname.startsWith("/company");

  const [loading, setLoading] = useState(false);
  const [loadingMission, setLoadingMission] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<ReturnType<typeof apiMissionToFormData> | null>(null);
  const [missionImageFile, setMissionImageFile] = useState<File | null>(null);
  const [missionImagePreviewUrl, setMissionImagePreviewUrl] = useState<string | null>(null);
  const [missionDocuments, setMissionDocuments] = useState<File[]>([]);
  const [existingMissionDocuments, setExistingMissionDocuments] = useState<
    MissionAttachmentItem[]
  >([]);

  const nonprofitIdFromMetadata =
    (user?.user_metadata as { nonprofit_id?: string } | undefined)?.nonprofit_id ?? null;
  const companyIdFromMetadata =
    (user?.user_metadata as { company_id?: string } | undefined)?.company_id ?? null;

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!id) {
        setLoadingMission(false);
        return;
      }
      setLoadingMission(true);
      const token = getStoredToken();
      let effectiveNonprofitId = nonprofitIdFromMetadata;
      let effectiveCompanyId = companyIdFromMetadata;
      if (user?.role === "nonprofit" && !effectiveNonprofitId) {
        const { data: nonprofitProfile, error: nonprofitProfileError } =
          await apiGet<NonprofitProfileLookupResponse>("/api/nonprofit/profile", token);
        if (cancelled) return;
        if (nonprofitProfileError || !nonprofitProfile?.id) {
          setLoadingMission(false);
          setError(nonprofitProfileError ?? t("You do not have permission to edit this mission"));
          return;
        }
        effectiveNonprofitId = nonprofitProfile.id;
      }
      if (user?.role === "company_admin" && !effectiveCompanyId) {
        const { data: companyProfile, error: companyProfileError } =
          await apiGet<CompanyProfileLookupResponse>("/api/company/profile", token);
        if (cancelled) return;
        if (companyProfileError || !companyProfile?.id) {
          setLoadingMission(false);
          setError(companyProfileError ?? t("You do not have permission to edit this mission"));
          return;
        }
        effectiveCompanyId = companyProfile.id;
      }
      const { data, error: err } = await apiGet<MissionResponse>(`/api/missions/${id}`, token);
      let missionData = data?.mission ?? null;
      let missionError = err;
      const shouldTryCompanyFallback =
        user?.role === "company_admin" &&
        !missionData &&
        typeof missionError === "string" &&
        /forbidden|permission|required/i.test(missionError);
      if (shouldTryCompanyFallback) {
        const { data: companyData, error: companyError } = await apiGet<MissionsResponse>(
          "/api/company/missions",
          token
        );
        if (cancelled) return;
        if (!companyError) {
          missionData = (companyData?.missions ?? []).find((mission) => mission.id === id) ?? null;
          missionError = missionData ? undefined : missionError;
        }
      }
      if (cancelled) return;
      setLoadingMission(false);
      if (missionError || !missionData) {
        setError(missionError ?? t("Mission not found"));
        return;
      }
      const m = missionData;
      if (m.approval_status !== "approved") {
        setError(t("Only published missions can be edited"));
        return;
      }
      const nonprofitOwner =
        user?.role === "nonprofit" &&
        !!effectiveNonprofitId &&
        m.organization_id === effectiveNonprofitId;
      const companyOwner =
        user?.role === "company_admin" &&
        !!effectiveCompanyId &&
        m.company_id === effectiveCompanyId &&
        m.created_by_entity_type === "company";
      if (!nonprofitOwner && !companyOwner) {
        setError(t("You do not have permission to edit this mission"));
        return;
      }
      setFormData(apiMissionToFormData(m));
      if (m.mission_image_url) {
        setMissionImagePreviewUrl(m.mission_image_url);
      }
      const { files } = await listMissionAttachments(id, token);
      if (!cancelled) {
        setExistingMissionDocuments((files ?? []).filter((file) => file.category === "documents"));
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [id, user?.role, nonprofitIdFromMetadata, companyIdFromMetadata, t]);

  useEffect(() => {
    return () => {
      if (missionImagePreviewUrl && missionImagePreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(missionImagePreviewUrl);
      }
    };
  }, [missionImagePreviewUrl]);

  const handleContinue = (data: typeof formData) => {
    if (data) {
      const merged = {
        ...data,
        missionImageUrl: formData?.missionImageUrl ?? "",
      };
      setFormData(merged);
      setCurrentStep(2);
      setError(null);
    }
  };

  const handleMissionImageChange = (file: File | null) => {
    if (missionImagePreviewUrl && missionImagePreviewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(missionImagePreviewUrl);
    }
    if (!file) {
      setMissionImageFile(null);
      setMissionImagePreviewUrl(formData?.missionImageUrl ?? null);
      return;
    }
    const validationError = validateProfileImage(file);
    if (validationError) {
      setError(t(validationError));
      setMissionImageFile(null);
      setMissionImagePreviewUrl(formData?.missionImageUrl ?? null);
      return;
    }
    setMissionImageFile(file);
    setMissionImagePreviewUrl(URL.createObjectURL(file));
    setError(null);
  };

  const handleSubmit = async () => {
    const token = getStoredToken();
    if (!token) {
      setError(t("Session expired. Please sign in again."));
      return;
    }
    if (!id || !formData) return;

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
      contacts: Array.isArray(formData.contacts)
        ? formData.contacts
        : formData.pointOfContact
          ? [String(formData.pointOfContact).trim()]
          : [],
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
    } else if (formData.missionImageUrl) {
      payload.missionImageUrl = formData.missionImageUrl;
    }

    const { error: patchError } = await apiPatch<{ mission: ApiMission }>(
      `/api/missions/${id}`,
      payload,
      token
    );
    if (!patchError && missionDocuments.length > 0) {
      for (const file of missionDocuments) {
        const { error: uploadError } = await uploadMissionAttachment(
          id,
          "documents",
          file,
          token
        );
        if (uploadError) {
          setLoading(false);
          setError(uploadError);
          return;
        }
      }
    }
    setLoading(false);
    if (patchError) {
      setError(patchError);
      return;
    }
    toast({ title: t("Mission updated") });
    navigate(isCompanyRoute ? `/company/missions/${id}` : `/missions/${id}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">{t("Loading...")}</p>
      </div>
    );
  }

  if (loadingMission || !formData) {
    return (
      <div className="min-h-screen bg-background">
        {!isCompanyRoute && <AppSidebar />}
        <main className={cn("min-h-screen flex flex-col p-4 md:p-6 lg:p-8", !isMobile && "responsive-layout")}>
          <PageHeader title={t("Edit Mission")} theme={theme} toggleTheme={toggleTheme} />
          <p className="text-sm text-muted-foreground">
            {loadingMission ? t("Loading...") : error ?? t("Mission not found")}
          </p>
        </main>
      </div>
    );
  }

  const displayImageUrl = missionImagePreviewUrl ?? formData.missionImageUrl ?? null;
  const handleDeleteExistingMissionDocument = async (fileId: string) => {
    const token = getStoredToken();
    if (!token || !id) return;
    const { error: deleteError } = await deleteMissionAttachment(id, fileId, token);
    if (deleteError) {
      setError(deleteError);
      return;
    }
    setExistingMissionDocuments((prev) => prev.filter((file) => file.id !== fileId));
  };

  return (
    <div className="min-h-screen bg-background">
      {!isCompanyRoute && <AppSidebar />}
      <main
        className={cn(
          "min-h-screen flex flex-col transition-all duration-300 ease-in-out p-4 md:p-6 lg:p-8",
          !isMobile && "responsive-layout"
        )}
      >
        <div className="shrink-0">
          <PageHeader title={t("Edit Mission")} theme={theme} toggleTheme={toggleTheme} />
          <div className="mb-4">
            <Button variant="ghost" size="sm" className="gap-1 -ml-2" asChild>
              <Link
                to={isCompanyRoute ? `/company/missions/${id}` : `/missions/${id}`}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                {t("Back")}
              </Link>
            </Button>
          </div>
          {error && (
            <div className="mb-4 p-4 rounded-lg bg-destructive/10 text-destructive text-sm" role="alert">
              {error}
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col min-h-0 w-full border rounded-xl border-border bg-card shadow-sm min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold shrink-0 px-6 pt-6 pb-4 text-foreground">
            {t("Edit Mission")}
          </h1>

          <div className="flex-1 rounded-b-xl bg-muted/30 dark:bg-muted/20 px-6 pb-6 pt-4 flex flex-col min-h-0">
            <div className="flex shrink-0 items-center justify-center gap-4 mb-6">
              <div className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    currentStep === 1 ? "bg-coompass-success" : "bg-muted"
                  )}
                >
                  1
                </div>
                <span
                  className={cn(
                    "ml-2 text-sm whitespace-nowrap",
                    currentStep === 1 ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {t("Mission Details")}
                </span>
                <div className="h-[2px] w-12 bg-border mx-4" />
              </div>
              <div className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    currentStep === 2 ? "bg-coompass-success" : "bg-muted"
                  )}
                >
                  2
                </div>
                <span
                  className={cn(
                    "ml-2 text-sm whitespace-nowrap",
                    currentStep === 2 ? "text-foreground" : "text-muted-foreground"
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
                  missionImagePreviewUrl={displayImageUrl}
                  onMissionImageChange={handleMissionImageChange}
                  missionDocuments={missionDocuments}
                  onMissionDocumentsChange={setMissionDocuments}
                  existingMissionDocuments={existingMissionDocuments}
                  onDeleteExistingMissionDocument={handleDeleteExistingMissionDocument}
                />
              ) : (
                <ReviewStep
                  formData={formData}
                  onBack={() => setCurrentStep(1)}
                  onSubmit={handleSubmit}
                  isSubmitting={loading}
                  missionImageUrl={displayImageUrl}
                  missionDocuments={missionDocuments}
                  submitButtonLabelKey="Save changes"
                  submittingButtonLabelKey="Saving..."
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
