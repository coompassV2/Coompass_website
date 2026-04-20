import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Rocket } from "lucide-react";
import { toast } from "sonner";
import { BasicProjectInfoForm } from "./forms/BasicProjectInfoForm";
import { ProjectTimelineForm } from "./forms/ProjectTimelineForm";
import { ProjectGoalsForm } from "./forms/ProjectGoalsForm";
import {
  ProjectParticipantSelector,
  type ProjectParticipantOption,
} from "./forms/ProjectParticipantSelector";
import { ProjectNonprofitSelector, type NonprofitOption } from "./forms/ProjectNonprofitSelector";
import { getStoredToken, apiGet, apiPost } from "@/services/authApi";
import { fetchCompanyUsers } from "@/services/companyUsersApi";
import type { ApiCompanyProject } from "@/types/companyProjects";
import type { CompanyProjectCreateResponse } from "@/types/companyProjects";

const VOLUNTARIADO = "Voluntariado";
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function sanitizeTextInput(value: string): string {
  if (value === "undefined" || value === "null") {
    return "";
  }
  return value;
}

interface CreateCompanyProjectFormProps {
  onSuccess: (payload: {
    project: ApiCompanyProject;
    nextStep: "mission" | null;
    createMissionAfter: boolean;
  }) => void;
  onCancel: () => void;
  /** When true, show as standalone form (e.g. on a page) with title/description; when false, only the form fields (for dialog) */
  showHeader?: boolean;
}

type FieldErrorKey =
  | "title"
  | "description"
  | "projectMode"
  | "category"
  | "locationType"
  | "periodicidade"
  | "startDate"
  | "endDate"
  | "invitedNonprofits";

type FieldErrors = Partial<Record<FieldErrorKey, string>>;

export function CreateCompanyProjectForm({
  onSuccess,
  onCancel,
  showHeader = false,
}: CreateCompanyProjectFormProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [createMissionAfter, setCreateMissionAfter] = useState(true);
  const [organizations, setOrganizations] = useState<NonprofitOption[]>([]);
  const [participantOptions, setParticipantOptions] = useState<ProjectParticipantOption[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    projectMode: "",
    startDate: "",
    endDate: "",
    locationType: "",
    periodicidade: "",
    locationDetails: "",
    projectGoals: "",
    invitedParticipants: [] as string[],
    invitedNonprofits: [] as string[],
  });

  useEffect(() => {
    let cancelled = false;
    const token = getStoredToken();
    apiGet<{ organizations: { id: string; name: string }[] }>("/api/organizations", token)
      .then(({ data, error: reqError }) => {
        if (cancelled || reqError) return;
        setOrganizations((data?.organizations ?? []).map((o) => ({ id: o.id, name: o.name })));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadParticipantOptions = async () => {
      const limit = 100;
      let page = 1;
      let total = 0;
      let fetchedCount = 0;
      const collected = new Map<string, ProjectParticipantOption>();

      do {
        const { data, error } = await fetchCompanyUsers({ page, limit });
        if (cancelled || error) return;

        const users = data?.users ?? [];
        total = data?.total ?? users.length;
        fetchedCount += users.length;
        for (const user of users) {
          if (user.source === "invite") continue;
          if (typeof user.id !== "string" || !UUID_REGEX.test(user.id)) continue;
          if (collected.has(user.id)) continue;
          collected.set(user.id, {
            id: user.id,
            name: (user.full_name ?? "").trim() || user.email,
            email: user.email,
          });
        }
        page += 1;
      } while (!cancelled && fetchedCount < total && total > 0);

      if (cancelled) return;
      const options = [...collected.values()].sort((a, b) => a.name.localeCompare(b.name));
      setParticipantOptions(options);
    };

    void loadParticipantOptions().catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    if (field in fieldErrors) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (field === "startDate" || field === "endDate") {
      setFieldErrors((prev) => ({ ...prev, endDate: undefined }));
    }
    setFormData((prev) => ({ ...prev, [field]: sanitizeTextInput(value) }));
  };

  const handleNonprofitSelect = (orgId: string) => {
    if (fieldErrors.invitedNonprofits) {
      setFieldErrors((prev) => ({ ...prev, invitedNonprofits: undefined }));
    }
    if (!formData.invitedNonprofits.includes(orgId)) {
      setFormData((prev) => ({
        ...prev,
        invitedNonprofits: [...prev.invitedNonprofits, orgId],
      }));
    }
  };

  const removeNonprofit = (orgId: string) => {
    setFormData((prev) => ({
      ...prev,
      invitedNonprofits: prev.invitedNonprofits.filter((id) => id !== orgId),
    }));
  };

  const handleParticipantSelect = (volunteerId: string) => {
    if (!formData.invitedParticipants.includes(volunteerId)) {
      setFormData((prev) => ({
        ...prev,
        invitedParticipants: [...prev.invitedParticipants, volunteerId],
      }));
    }
  };

  const removeParticipant = (volunteerId: string) => {
    setFormData((prev) => ({
      ...prev,
      invitedParticipants: prev.invitedParticipants.filter((id) => id !== volunteerId),
    }));
  };

  const submitProject = async () => {
    const normalizedFormData = {
      ...formData,
      title: sanitizeTextInput(formData.title).trim(),
      description: sanitizeTextInput(formData.description).trim(),
      category: sanitizeTextInput(formData.category).trim(),
      projectMode: sanitizeTextInput(formData.projectMode).trim(),
      startDate: sanitizeTextInput(formData.startDate).trim(),
      endDate: sanitizeTextInput(formData.endDate).trim(),
      locationType: sanitizeTextInput(formData.locationType).trim(),
      locationDetails: sanitizeTextInput(formData.locationDetails),
      projectGoals: sanitizeTextInput(formData.projectGoals),
    };

    const nextFieldErrors: FieldErrors = {};
    const requiredFieldMessage = t("companyProject.requiredField");
    if (!normalizedFormData.title) nextFieldErrors.title = requiredFieldMessage;
    if (!normalizedFormData.description) nextFieldErrors.description = requiredFieldMessage;
    if (!normalizedFormData.projectMode) nextFieldErrors.projectMode = requiredFieldMessage;
    if (!normalizedFormData.category) nextFieldErrors.category = requiredFieldMessage;
    if (!normalizedFormData.locationType) nextFieldErrors.locationType = requiredFieldMessage;
    if (!normalizedFormData.periodicidade) nextFieldErrors.periodicidade = requiredFieldMessage;
    if (!normalizedFormData.startDate) nextFieldErrors.startDate = requiredFieldMessage;
    if (!normalizedFormData.endDate) nextFieldErrors.endDate = requiredFieldMessage;
    if (normalizedFormData.category === VOLUNTARIADO && normalizedFormData.invitedNonprofits.length === 0) {
      nextFieldErrors.invitedNonprofits = t("companyProject.volunteerPartnerRequired");
    }
    if (
      normalizedFormData.startDate &&
      normalizedFormData.endDate &&
      new Date(normalizedFormData.startDate) >= new Date(normalizedFormData.endDate)
    ) {
      nextFieldErrors.endDate = t("companyProject.endDateAfterStart");
    }
    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      return;
    }
    setFieldErrors({});
    setIsLoading(true);
    try {
      const token = getStoredToken();
      if (!token) {
        toast.error(t("companyProject.sessionExpired"));
        setIsLoading(false);
        return;
      }
      const body: Record<string, unknown> = {
        title: normalizedFormData.title,
        description: normalizedFormData.description,
        category: normalizedFormData.category,
        project_mode: normalizedFormData.projectMode,
        periodicidade: normalizedFormData.periodicidade || null,
        district: normalizedFormData.locationType,
        location_details: normalizedFormData.locationDetails || null,
        start_date: normalizedFormData.startDate,
        end_date: normalizedFormData.endDate,
        project_goals: normalizedFormData.projectGoals || null,
        partner_nonprofit_ids: normalizedFormData.invitedNonprofits,
        invited_user_ids: normalizedFormData.invitedParticipants,
      };
      const { data, error } = await apiPost<CompanyProjectCreateResponse>("/api/company/projects", body, token);
      if (error || !data?.project) {
        toast.error(error ?? t("companyProject.createFailed"));
        setIsLoading(false);
        return;
      }
      setFieldErrors({});
      toast.success(t("companyProject.createSuccess"));
      onSuccess({
        project: data.project,
        nextStep: data.next_step ?? null,
        createMissionAfter,
      });
      setFormData({
        title: "",
        description: "",
        category: "",
        projectMode: "",
        startDate: "",
        endDate: "",
        locationType: "",
        periodicidade: "",
        locationDetails: "",
        projectGoals: "",
        invitedParticipants: [],
        invitedNonprofits: [],
      });
    } catch {
      toast.error(t("companyProject.createFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submitProject();
  };

  const isVoluntariado = formData.category === VOLUNTARIADO;

  return (
    <>
      {showHeader && (
        <div className="mb-6">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            {t("companyProject.createPageTitle")}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t("companyProject.createPageSubtitle")}
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <BasicProjectInfoForm
          formData={formData}
          onInputChange={handleInputChange}
          errors={{
            title: fieldErrors.title,
            description: fieldErrors.description,
            projectMode: fieldErrors.projectMode,
            category: fieldErrors.category,
            locationType: fieldErrors.locationType,
            periodicidade: fieldErrors.periodicidade,
          }}
        />
        <ProjectTimelineForm
          formData={formData}
          onInputChange={handleInputChange}
          errors={{
            startDate: fieldErrors.startDate,
            endDate: fieldErrors.endDate,
          }}
        />
        <ProjectGoalsForm formData={formData} onInputChange={handleInputChange} />
        <ProjectParticipantSelector
          formData={formData}
          participants={participantOptions}
          onParticipantSelect={handleParticipantSelect}
          onRemoveParticipant={removeParticipant}
        />
        <ProjectNonprofitSelector
          formData={formData}
          organizations={organizations}
          onNonprofitSelect={handleNonprofitSelect}
          onRemoveNonprofit={removeNonprofit}
          partnerRequired={isVoluntariado}
          error={fieldErrors.invitedNonprofits}
        />
        <div className="flex justify-end gap-3 pt-4 border-t">
          <div className="mr-auto flex items-center gap-2">
            <Checkbox
              id="create-mission-after-project"
              checked={createMissionAfter}
              onCheckedChange={(checked) => setCreateMissionAfter(checked === true)}
              disabled={isLoading}
            />
            <Label htmlFor="create-mission-after-project" className="text-sm font-normal">
              {t("companyProject.createMissionAfterProject")}
            </Label>
          </div>
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            {t("Cancel")}
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? t("Creating...") : t("Create Project")}
          </Button>
        </div>
      </form>
    </>
  );
}
