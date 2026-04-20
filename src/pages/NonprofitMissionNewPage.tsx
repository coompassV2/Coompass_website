import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { getStoredToken, apiPost } from "@/services/authApi";
import { SEOManager } from "@/components/shared/SEOManager";

const INITIAL_FORM_DATA = {
  title: "",
  description: "",
  contacts: [""],
  scheduleType: "one_time" as "one_time" | "recurring",
  hoursRequired: 0,
  volunteersRequired: 0,
  beneficiariesCount: 0,
  requiresInterview: false,
  startDate: "",
  endDate: "",
  isVirtual: false,
  address: "",
  district: "",
  ods: [] as number[],
  causes: [] as string[],
  skills: [] as string[],
  requirements: "",
};

export default function NonprofitMissionNewPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleContinue = (data: typeof INITIAL_FORM_DATA) => {
    setFormData(data);
    setCurrentStep(2);
    setError(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    const token = getStoredToken();
    if (!token) {
      setError(t("Session expired. Please sign in again."));
      setLoading(false);
      return;
    }
    const payload = {
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
      district: formData.isVirtual ? "" : formData.district || "",
      contacts: formData.contacts || [],
      ods: formData.ods || [],
      causes: formData.causes || [],
      skills: formData.skills || [],
      scheduleType: formData.scheduleType || "one_time",
      requirements: formData.requirements || "",
    };
    const { data, error: err } = await apiPost<{ id: string; title: string }>(
      "/api/nonprofit/missions",
      payload,
      token
    );
    setLoading(false);
    if (err) {
      setError(err);
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
      <AppSidebar />
      <main
        className={cn(
          "min-h-screen flex flex-col transition-all duration-300 ease-in-out p-4 md:p-6 lg:p-8",
          !isMobile && "responsive-layout"
        )}
      >
        <div className="shrink-0">
          <PageHeader
            title={t("Launch Mission")}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          <div className="mb-4">
            <Button variant="ghost" size="sm" className="gap-1 -ml-2" asChild>
              <Link
                to="/nonprofit/dashboard"
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                {t("Dashboard")}
              </Link>
            </Button>
          </div>

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

          <div className="flex-1 rounded-b-xl bg-zinc-900 dark:bg-zinc-950 px-6 pb-6 pt-4 text-white flex flex-col min-h-0">
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
                      currentStep === 1 ? "text-white" : "text-gray-400"
                    )}
                  >
                    {t("Mission Details")}
                  </span>
                  <div className="h-[2px] w-12 bg-gray-600 mx-4" />
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
                      currentStep === 2 ? "text-white" : "text-gray-400"
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
                  />
                ) : (
                  <ReviewStep
                    formData={formData}
                    onBack={() => setCurrentStep(1)}
                    onSubmit={handleSubmit}
                    isSubmitting={loading}
                  />
                )}
              </div>
            </div>
          </div>
      </main>
    </div>
  );
}
