import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Mail, Target } from "lucide-react";
import { useTaxonomyLists } from "@/hooks/useTaxonomyLists";

const SDG_IMAGE_BASE =
  "https://e4k4c4x9.delivery.rocketcdn.me/en/wp-content/uploads/sites/15/2020/06/sustainable-development-goal";

function getSdgImageUrl(goalId: number): string {
  return `${SDG_IMAGE_BASE}-${goalId}.jpg`;
}

function normalizeTaxonomyKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/&/g, " and ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function resolveItemTaxonomyKey(item: { name: string; key?: string; slug?: string }): string {
  return normalizeTaxonomyKey(item.key ?? item.slug ?? item.name);
}

interface ReviewStepProps {
  formData: any;
  onBack: () => void;
  onSubmit: () => void | Promise<void>;
  isSubmitting?: boolean;
  missionImageUrl?: string | null;
  missionDocuments?: File[];
  submitButtonLabelKey?: string;
  submittingButtonLabelKey?: string;
}

function getCauseLabel(
  t: (k: string, o?: { defaultValue?: string }) => string,
  value: string,
  causes: { name: string; slug?: string; key?: string }[]
): string {
  const normalizedValue = normalizeTaxonomyKey(value);
  const cause =
    causes.find((x) => x.name === value || x.slug === value || x.key === value) ??
    causes.find((x) => resolveItemTaxonomyKey(x) === normalizedValue) ??
    causes.find((x) => normalizeTaxonomyKey(t(`taxonomy.cause.${resolveItemTaxonomyKey(x)}`, { defaultValue: x.name })) === normalizedValue);
  const key = cause ? resolveItemTaxonomyKey(cause) : normalizedValue;
  return t(`taxonomy.cause.${key}`, { defaultValue: value });
}

function getSkillLabel(
  t: (k: string, o?: { defaultValue?: string }) => string,
  value: string,
  skills: { name: string; key?: string; slug?: string }[]
): string {
  const normalizedValue = normalizeTaxonomyKey(value);
  const skill =
    skills.find((x) => x.name === value || x.key === value || x.slug === value) ??
    skills.find((x) => resolveItemTaxonomyKey(x) === normalizedValue) ??
    skills.find((x) => normalizeTaxonomyKey(t(`taxonomy.skill.${resolveItemTaxonomyKey(x)}`, { defaultValue: x.name })) === normalizedValue);
  const key = skill ? resolveItemTaxonomyKey(skill) : normalizedValue;
  return t(`taxonomy.skill.${key}`, { defaultValue: value });
}

function getSdgLabel(t: (k: string, o?: { defaultValue?: string }) => string, sdg: { id: number; name: string; key?: string }): string {
  const key = sdg.key ?? `sdg_${sdg.id}`;
  return t(`taxonomy.sdg.${key}`, { defaultValue: sdg.name });
}

export function ReviewStep({
  formData,
  onBack,
  onSubmit,
  isSubmitting,
  missionImageUrl,
  missionDocuments = [],
  submitButtonLabelKey = "Publish Mission",
  submittingButtonLabelKey = "Publishing...",
}: ReviewStepProps) {
  const { t } = useTranslation();
  const { sdgs, causes, skills } = useTaxonomyLists();
  const contactsDisplay = Array.isArray(formData.contacts)
    ? formData.contacts.join(", ")
    : (formData.pointOfContact ?? formData.contacts ?? "");

  return (
    <div className="space-y-6">
      <div className="bg-background/80 dark:bg-black/30 backdrop-blur-lg border border-border dark:border-white/10 p-6 rounded-xl">
        <h2 className="text-2xl font-semibold text-foreground dark:text-white mb-6">{t("Mission Summary")}</h2>
        
        <div className="space-y-4">
          {missionImageUrl && (
            <div className="rounded-lg overflow-hidden border border-border dark:border-white/10">
              <img
                src={missionImageUrl}
                alt={t("Mission image")}
                className="w-full h-48 md:h-56 object-cover"
              />
            </div>
          )}
          <div>
            <h3 className="text-lg font-medium text-foreground dark:text-white">{formData.title}</h3>
            <p className="text-muted-foreground mt-2">{formData.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-foreground dark:text-white" />
            <span className="text-foreground dark:text-white">{t("Point of contact:")}</span>
            <span className="text-muted-foreground">{contactsDisplay}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-foreground dark:text-white" />
            <span className="text-foreground dark:text-white">{t("From")}</span>
            <span className="text-muted-foreground">{formData.startDate}</span>
            <span className="text-foreground dark:text-white">{t("to")}</span>
            <span className="text-muted-foreground">{formData.endDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-foreground dark:text-white" />
            <span className="text-foreground dark:text-white">{t("District")}:</span>
            <span className="text-muted-foreground">{formData.district || "-"}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-foreground dark:text-white">{t("Initiative type")}:</span>
            <span className="text-muted-foreground">
              {formData.scheduleType === "recurring" ? t("Recurring") : t("One-time")}
            </span>
          </div>

          {formData.requiresInterview ? (
            <div className="flex items-center gap-2">
              <span className="text-foreground dark:text-white">{t("Requires prior interview")}</span>
            </div>
          ) : null}

          {!formData.isVirtual && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{formData.address}</span>
            </div>
          )}

          {(Array.isArray(formData.ods) ? formData.ods : []).length > 0 && (
            <div className="pt-4 border-t border-border dark:border-white/10">
              <h4 className="text-sm font-medium text-foreground dark:text-white mb-2 flex items-center gap-1">
                <Target className="h-4 w-4" />
                {t("SDGs")}
              </h4>
              <div className="flex flex-wrap gap-2">
                {(formData.ods as number[]).map((id) => {
                  const sdg = sdgs.find((s) => s.id === id);
                  const imageUrl = sdg && (sdg.image_url ?? "").trim()
                    ? sdg.image_url!
                    : getSdgImageUrl(id);
                  return sdg ? (
                    <span
                      key={id}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 border border-emerald-200/60 dark:border-emerald-800/40"
                    >
                      <img
                        src={imageUrl}
                        alt=""
                        className="h-6 w-6 rounded object-cover shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      {sdg.id}. {getSdgLabel(t, sdg)}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border dark:border-white/10">
            <div>
              <h4 className="text-sm font-medium text-foreground dark:text-white mb-2">{t("Causes")}</h4>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(formData.causes) ? formData.causes.map((cause: string) => (
                  <span
                    key={cause}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200 border border-amber-200/60 dark:border-amber-800/40"
                  >
                    {getCauseLabel(t, cause, causes)}
                  </span>
                )) : null}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground dark:text-white mb-2">{t("Required Skills")}</h4>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(formData.skills) ? formData.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-200 border border-indigo-200/60 dark:border-indigo-800/40"
                  >
                    {getSkillLabel(t, skill, skills)}
                  </span>
                )) : null}
              </div>
            </div>
          </div>

          {typeof formData.beneficiariesCount === "number" && (
            <div className="pt-4 border-t border-border dark:border-white/10">
              <h4 className="text-sm font-medium text-foreground dark:text-white mb-1">
                {t("Initiative reach")}
              </h4>
              <p className="text-lg font-semibold text-foreground dark:text-white">
                {formData.beneficiariesCount}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("Indicate approximate number of beneficiaries reached")}
              </p>
            </div>
          )}

          {formData.requirements && (
            <div className="pt-4 border-t border-border dark:border-white/10">
              <h4 className="text-sm font-medium text-foreground dark:text-white mb-2">{t("Additional requirements")}</h4>
              <p className="text-muted-foreground">{formData.requirements}</p>
            </div>
          )}

          {missionDocuments.length > 0 ? (
            <div className="pt-4 border-t border-border dark:border-white/10">
              <h4 className="text-sm font-medium text-foreground dark:text-white mb-2">
                {t("Documents")}
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {missionDocuments.map((file, index) => (
                  <li key={`${file.name}-${index}`}>{file.name}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 bg-background dark:bg-black/60 border-border dark:border-white/10 text-foreground dark:text-white hover:bg-coompass-success/20"
        >
          {t("Back")}
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-coompass-success hover:bg-coompass-success/90 text-white"
        >
          {isSubmitting ? t(submittingButtonLabelKey) : t(submitButtonLabelKey)}
        </Button>
      </div>
    </div>
  );
}