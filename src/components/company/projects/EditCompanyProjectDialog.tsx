import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BasicProjectInfoForm } from "./forms/BasicProjectInfoForm";
import { ProjectTimelineForm } from "./forms/ProjectTimelineForm";
import { ProjectGoalsForm } from "./forms/ProjectGoalsForm";
import { ProjectNonprofitSelector, type NonprofitOption } from "./forms/ProjectNonprofitSelector";
import { apiGet, getStoredToken } from "@/services/authApi";
import type { CompanyProject } from "./types";

type EditPayload = {
  title: string;
  description: string;
  category: string;
  project_mode: string;
  periodicidade: string | null;
  district: string;
  location_details: string | null;
  start_date: string;
  end_date: string;
  project_goals: string | null;
  partner_nonprofit_ids: string[];
  target_nonprofit_id: string | null;
};

interface EditCompanyProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: CompanyProject;
  saving?: boolean;
  onSave: (payload: EditPayload) => Promise<void>;
}

function sanitizeTextInput(value: string): string {
  if (value === "undefined" || value === "null") return "";
  return value;
}

export function EditCompanyProjectDialog({
  open,
  onOpenChange,
  project,
  saving = false,
  onSave,
}: EditCompanyProjectDialogProps) {
  const { t } = useTranslation();
  const [organizations, setOrganizations] = useState<NonprofitOption[]>([]);
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
    invitedNonprofits: [] as string[],
  });

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const token = getStoredToken();
    apiGet<{ organizations: { id: string; name: string }[] }>("/api/organizations", token)
      .then(({ data, error }) => {
        if (cancelled || error) return;
        setOrganizations((data?.organizations ?? []).map((org) => ({ id: org.id, name: org.name })));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setFormData({
      title: project.title ?? "",
      description: project.description ?? "",
      category: project.category ?? "",
      projectMode: project.projectMode ?? "",
      startDate: project.startDate ?? "",
      endDate: project.endDate ?? "",
      locationType: project.district ?? "",
      periodicidade: project.periodicidade ?? "",
      locationDetails: project.locationDetails ?? "",
      projectGoals: project.projectGoals ?? "",
      invitedNonprofits: project.partnerNonprofitIds ?? [],
    });
  }, [open, project]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: sanitizeTextInput(value) }));
  };

  const handleNonprofitSelect = (orgId: string) => {
    if (formData.invitedNonprofits.includes(orgId)) return;
    setFormData((prev) => ({ ...prev, invitedNonprofits: [...prev.invitedNonprofits, orgId] }));
  };

  const removeNonprofit = (orgId: string) => {
    setFormData((prev) => ({
      ...prev,
      invitedNonprofits: prev.invitedNonprofits.filter((id) => id !== orgId),
    }));
  };

  const handleSave = async () => {
    const normalized = {
      ...formData,
      title: sanitizeTextInput(formData.title),
      description: sanitizeTextInput(formData.description),
      locationDetails: sanitizeTextInput(formData.locationDetails),
      projectGoals: sanitizeTextInput(formData.projectGoals),
    };

    if (
      !normalized.title ||
      !normalized.description ||
      !normalized.category ||
      !normalized.projectMode ||
      !normalized.startDate ||
      !normalized.endDate ||
      !normalized.locationType
    ) {
      toast.error(t("companyProject.fillRequiredFields"));
      return;
    }
    if (new Date(normalized.startDate) > new Date(normalized.endDate)) {
      toast.error(t("companyProject.endDateAfterStart"));
      return;
    }
    if (normalized.category === "Voluntariado" && normalized.invitedNonprofits.length === 0) {
      toast.error(t("companyProject.volunteerPartnerRequired"));
      return;
    }

    await onSave({
      title: normalized.title,
      description: normalized.description,
      category: normalized.category,
      project_mode: normalized.projectMode,
      periodicidade: normalized.periodicidade || null,
      district: normalized.locationType,
      location_details: normalized.locationDetails || null,
      start_date: normalized.startDate,
      end_date: normalized.endDate,
      project_goals: normalized.projectGoals || null,
      partner_nonprofit_ids: normalized.invitedNonprofits,
      target_nonprofit_id: normalized.invitedNonprofits[0] ?? null,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t("companyProject.editProjectTitle")}</DialogTitle>
          <DialogDescription>{t("companyProject.editProjectDescription")}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <BasicProjectInfoForm formData={formData} onInputChange={handleInputChange} />
          <ProjectTimelineForm formData={formData} onInputChange={handleInputChange} />
          <ProjectGoalsForm formData={formData} onInputChange={handleInputChange} />
          <ProjectNonprofitSelector
            formData={formData}
            organizations={organizations}
            onNonprofitSelect={handleNonprofitSelect}
            onRemoveNonprofit={removeNonprofit}
            partnerRequired={formData.category === "Voluntariado"}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            {t("Cancel")}
          </Button>
          <Button type="button" onClick={() => void handleSave()} disabled={saving}>
            {saving ? t("Saving...") : t("Save Changes")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
