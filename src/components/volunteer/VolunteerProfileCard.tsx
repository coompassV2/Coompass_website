import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Briefcase } from "lucide-react";
import { useVolunteerData } from "@/hooks/useVolunteerData";
import {
  loadVolunteerPreferences,
} from "@/utils/volunteerPreferences";
import { useTranslation } from "react-i18next";
import { useTaxonomyLists } from "@/hooks/useTaxonomyLists";

const SDG_IMAGE_BASE =
  "https://e4k4c4x9.delivery.rocketcdn.me/en/wp-content/uploads/sites/15/2020/06/sustainable-development-goal";

/** Same gradient as company stats cards (AnalyticsTopCards, CorporateImpactKpisCard). */
const PROFILE_GRADIENT = "linear-gradient(135deg, #1e3a5f 0%, #2d5a87 40%, #5a9c6e 100%)";

function getSdgImageUrl(goal: number): string {
  return `${SDG_IMAGE_BASE}-${goal}.jpg`;
}

const MAX_VISIBLE_SKILLS = 4;

interface VolunteerProfileCardProps {
  userId?: string;
  isDemo: boolean;
  sessionResolved?: boolean;
}

/**
 * Profile card for the volunteer dashboard using the same data as "Meu Perfil":
 * name, avatar, company/department, skills, volunteer hours, completed missions, cause areas.
 */
export function VolunteerProfileCard({
  userId,
  isDemo,
  sessionResolved = true,
}: VolunteerProfileCardProps) {
  const { t } = useTranslation();
  const { volunteerData, loading } = useVolunteerData(userId);
  const { skills, causes, sdgs } = useTaxonomyLists();

  const demoProfile = {
    name: "Rodrigo Silva",
    email: "rodrigo@coompass.org",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rodrigo",
    company: "Coompass",
    department: "Product Department • Senior Developer",
  };

  const taxonomySkills = useMemo(() => skills.map((item) => item.name), [skills]);
  const taxonomyCauses = useMemo(() => causes.map((item) => item.name), [causes]);
  const taxonomySdgs = useMemo(() => sdgs.map((item) => item.name), [sdgs]);

  const defaultSkills = useMemo(() => {
    if (volunteerData?.skills && volunteerData.skills.length > 0) return volunteerData.skills;
    if (isDemo) return taxonomySkills.slice(0, 8);
    return [];
  }, [volunteerData?.skills, taxonomySkills, isDemo]);

  const defaultCauseAreas = useMemo(() => {
    if (volunteerData?.cause_areas && volunteerData.cause_areas.length > 0) {
      return volunteerData.cause_areas;
    }
    if (isDemo) return taxonomyCauses.slice(0, 6);
    return [];
  }, [volunteerData?.cause_areas, taxonomyCauses, isDemo]);

  const defaultSDGs = useMemo(() => {
    if (volunteerData?.sdgs && volunteerData.sdgs.length > 0) return volunteerData.sdgs;
    if (isDemo) return taxonomySdgs.slice(0, 6);
    return [];
  }, [volunteerData?.sdgs, taxonomySdgs, isDemo]);

  const preferences = useMemo(
    () =>
      loadVolunteerPreferences(isDemo, {
        skills: defaultSkills,
        causeAreas: defaultCauseAreas,
        sdgs: defaultSDGs,
      }),
    [isDemo, defaultSkills, defaultCauseAreas, defaultSDGs]
  );

  const displayName = isDemo
    ? demoProfile.name
    : volunteerData?.full_name || "Add your name";
  const displayAvatar = isDemo
    ? demoProfile.avatar
    : volunteerData?.avatar_url ||
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix";
  const displayDepartmentRaw = isDemo
    ? demoProfile.department
    : volunteerData?.department?.trim() || t("Add your department");
  const displayDepartment =
    displayDepartmentRaw.includes(" • ")
      ? displayDepartmentRaw.split(" • ")[0].trim()
      : displayDepartmentRaw;

  const visibleSkills = preferences.skills.slice(0, MAX_VISIBLE_SKILLS);
  const extraSkillsCount = Math.max(
    0,
    preferences.skills.length - MAX_VISIBLE_SKILLS
  );

  const getSkillLabel = (name: string) => {
    const skill = skills.find((item) => item.name === name);
    const key = skill?.slug ?? skill?.key ?? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return t(`taxonomy.skill.${key}`, { defaultValue: name });
  };
  const getCauseLabel = (name: string) => {
    const cause = causes.find((item) => item.name === name);
    const key = cause?.slug ?? cause?.key ?? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return t(`taxonomy.cause.${key}`, { defaultValue: name });
  };

  const shouldShowSkeleton = !isDemo && (!sessionResolved || loading);

  if (shouldShowSkeleton) {
    return (
      <Card
        className="overflow-hidden border-0"
        style={{ background: PROFILE_GRADIENT }}
      >
        <CardContent className="p-5">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-full bg-muted animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              <div className="h-3 w-32 bg-muted rounded animate-pulse" />
            </div>
          </div>
          <div className="mt-4 h-8 bg-muted rounded animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="overflow-hidden border-0"
      style={{ background: PROFILE_GRADIENT }}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <Avatar className="h-14 w-14 rounded-full border-2 border-white/20">
                <AvatarImage src={displayAvatar} alt={displayName} />
                <AvatarFallback className="bg-white/20 text-white">
                  {displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span
                className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white/30 bg-emerald-500"
                aria-hidden
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-white truncate">
                {displayName}
              </h3>
              <p className="text-xs text-white/80 mt-0.5 flex items-center gap-1.5 truncate">
                <Briefcase className="h-3.5 w-3.5 shrink-0 text-white/70" />
                <span className="truncate">{displayDepartment}</span>
              </p>
            </div>
          </div>
        </div>

        <h4 className="text-[11px] font-medium text-white/90 mt-4 mb-1.5">
          {t("Skills")}
        </h4>
        <div className="flex flex-wrap gap-2">
          {visibleSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-medium text-white"
            >
              {getSkillLabel(skill)}
            </span>
          ))}
          {extraSkillsCount > 0 && (
            <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-medium text-white">
              +{extraSkillsCount}
            </span>
          )}
        </div>

        <div className="mt-3 space-y-2">
          <h4 className="text-[11px] font-medium text-white/90 mb-1.5">
            {t("Cause Areas")}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {preferences.causeAreas.slice(0, 6).map((area) => (
              <span
                key={area}
                className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-medium text-white"
              >
                {getCauseLabel(area)}
              </span>
            ))}
            {preferences.causeAreas.length > 6 && (
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-medium text-white">
                +{preferences.causeAreas.length - 6}
              </span>
            )}
          </div>
          <h4 className="text-[11px] font-medium text-white/90 mb-1.5">
            {t("SDGs")}
          </h4>
          <div className="flex flex-wrap gap-1.5 items-center">
            {preferences.sdgs.slice(0, 6).map((name) => {
              const sdg = sdgs.find((s) => s.name === name);
              if (!sdg) return null;
              return (
                <img
                  key={sdg.id}
                  src={sdg.image_url || getSdgImageUrl(sdg.id)}
                  alt={`SDG ${sdg.id}`}
                  className="h-7 w-7 rounded object-cover"
                />
              );
            })}
            {preferences.sdgs.length > 6 && (
              <span className="text-[11px] font-medium text-white/90">
                +{preferences.sdgs.length - 6}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
