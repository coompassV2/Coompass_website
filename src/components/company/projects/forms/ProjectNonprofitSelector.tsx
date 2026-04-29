
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Home, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NonprofitOption {
  id: string;
  name: string;
}

interface ProjectNonprofitSelectorProps {
  formData: {
    invitedNonprofits: string[];
  };
  organizations: NonprofitOption[];
  onNonprofitSelect: (orgId: string) => void;
  onRemoveNonprofit: (orgId: string) => void;
  /** When true, show helper that partner is required (e.g. Voluntariado). */
  partnerRequired?: boolean;
  error?: string;
}

export function ProjectNonprofitSelector({ 
  formData, 
  organizations,
  onNonprofitSelect, 
  onRemoveNonprofit,
  partnerRequired = false,
  error,
}: ProjectNonprofitSelectorProps) {
  const { t } = useTranslation();

  const selectedNonprofits = organizations.filter(org => 
    formData.invitedNonprofits.includes(org.id)
  );

  const availableNonprofits = organizations.filter(org => 
    !formData.invitedNonprofits.includes(org.id)
  );

  return (
    <div className="space-y-4">
      <h3 className="font-medium flex items-center gap-2">
        <Home className="h-4 w-4" />
        {t("companyProject.inviteInstitutions")}
      </h3>
      {partnerRequired && (
        <p className="text-sm text-muted-foreground">{t("companyProject.volunteerPartnerHint")}</p>
      )}
      
      {availableNonprofits.length > 0 && (
        <div className="space-y-2">
          <Select onValueChange={onNonprofitSelect}>
            <SelectTrigger
              aria-invalid={Boolean(error)}
              className={cn(error && "border-destructive focus:ring-destructive")}
            >
              <SelectValue placeholder={t("companyProject.choosePartnerPlaceholder")} />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {availableNonprofits.map((org) => (
                <SelectItem key={org.id} value={org.id}>
                  {org.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      )}
      {!availableNonprofits.length && error && <p className="text-sm text-destructive">{error}</p>}
      
      {selectedNonprofits.length > 0 && (
        <div className="space-y-2">
          <Label>{t("companyProject.selectedPartners")}</Label>
          <div className="flex flex-wrap gap-2">
            {selectedNonprofits.map((org) => (
              <Badge key={org.id} variant="secondary" className="flex items-center gap-1">
                {org.name}
                <button
                  type="button"
                  onClick={() => onRemoveNonprofit(org.id)}
                  className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
