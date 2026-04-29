
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";
import { Mission } from "@/components/missions/MissionCard";
import { useTaxonomyLists } from "@/hooks/useTaxonomyLists";
import { translateCauseName, translateSkillName } from "@/utils/taxonomyI18n";

interface MissionSidebarProps {
  mission: Mission;
}

export function MissionSidebar({ mission }: MissionSidebarProps) {
  const { t } = useTranslation();
  const { causes, skills } = useTaxonomyLists();
  const hasCauses = (mission.causes?.length ?? 0) > 0;
  const hasSkills = (mission.skills?.length ?? 0) > 0;
  const beneficiaries =
    typeof (mission as any).beneficiariesCount === "number"
      ? (mission as any).beneficiariesCount
      : undefined;
  const hasBeneficiaries = typeof beneficiaries === "number" && beneficiaries > 0;
  const normalize = (value: string) =>
    value
      .toLowerCase()
      .replace(/_/g, "-")
      .replace(/&/g, " ")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  const getCauseLabel = (name: string) => {
    const normalizedName = normalize(name);
    const cause =
      causes.find((item) => item.name === name || item.key === name || item.slug === name) ??
      causes.find((item) => normalize(item.key ?? item.slug ?? item.name) === normalizedName) ??
      causes.find(
        (item) => normalize(translateCauseName(item, t)) === normalizedName
      );
    return translateCauseName(cause ?? { name }, t);
  };

  const getSkillLabel = (name: string) => {
    const normalizedName = normalize(name);
    const skill =
      skills.find((item) => item.name === name || item.key === name || item.slug === name) ??
      skills.find((item) => normalize(item.key ?? item.slug ?? item.name) === normalizedName) ??
      skills.find(
        (item) => normalize(translateSkillName(item, t)) === normalizedName
      );
    return translateSkillName(skill ?? { name }, t);
  };

  if (!hasCauses && !hasSkills) return null;

  return (
    <div className="space-y-6">
      {/* Cause Areas */}
      {hasCauses ? (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">{t("Cause Areas")}</h2>
            <div className="flex flex-wrap gap-2">
              {mission.causes?.map((cause, index) => (
                <Badge key={index} variant="secondary" className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">
                  <Tag className="h-3 w-3 mr-1" />
                  {getCauseLabel(cause)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}
      
      {/* Skills */}
      {hasSkills ? (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">{t("Required Skills")}</h2>
            <div className="flex flex-wrap gap-2">
              {mission.skills?.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                  <Tag className="h-3 w-3 mr-1" />
                  {getSkillLabel(skill)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Beneficiaries */}
      {hasBeneficiaries ? (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold">
              {t("Alcance da Ação")}
            </h2>
            <p className="text-sm text-muted-foreground mb-1">
              {t("Nº Beneficiários")}
            </p>
            <p className="text-3xl text-foreground">
              {beneficiaries?.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
