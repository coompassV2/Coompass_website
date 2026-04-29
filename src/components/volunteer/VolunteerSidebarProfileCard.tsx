import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Briefcase, Clock, ListCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useVolunteerData } from "@/hooks/useVolunteerData";
import { useSessionMode } from "@/hooks/useSessionMode";
import { goalColors } from "@/components/organizations/GoalBadge";
import {
  loadVolunteerPreferences,
  saveVolunteerPreferences,
  type VolunteerPreferences,
} from "@/utils/volunteerPreferences";
import { useTranslation } from "react-i18next";
import { useTaxonomyLists } from "@/hooks/useTaxonomyLists";
import { translateCauseName, translateSdgName, translateSkillName } from "@/utils/taxonomyI18n";

export function VolunteerSidebarProfileCard() {
  const { t } = useTranslation();
  const { isDemo, userId } = useSessionMode();
  const { volunteerData, loading, error } = useVolunteerData(userId);
  const { skills, causes, sdgs } = useTaxonomyLists();

  const [preferences, setPreferences] = useState<VolunteerPreferences>({
    skills: [],
    causeAreas: [],
    sdgs: [],
  });
  const [initialized, setInitialized] = useState(false);

  const [skillsSearch, setSkillsSearch] = useState("");
  const [causeAreasSearch, setCauseAreasSearch] = useState("");
  const [sdgsSearch, setSdgsSearch] = useState("");

  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  // Demo data for showcase
  const demoProfile = {
    name: "Rodrigo Silva",
    email: "rodrigo@coompass.org",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rodrigo",
    company: "Coompass",
    department: "Product Department • Senior Developer",
    hours: 42,
    missions: 7,
  };

  const demoPreferences = {
    skills: [
      "Graphic Design",
      "Visual Arts",
      "Drawing",
      "Photography",
      "Graphic Design / Print",
      "Family Support",
      "Youth Mentoring",
      "Recycling",
      "Advocacy",
      "Web Design",
    ],
    sdgs: ["Quality Education", "Climate Action", "Reduced Inequalities"],
    causeAreas: ["Culture", "Employability", "Community"],
  };

  const displayName = isDemo
    ? demoProfile.name
    : volunteerData?.full_name || "Add your name";
  const displayAvatar = isDemo
    ? demoProfile.avatar
    : volunteerData?.avatar_url ||
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix";
  const displayCompany = isDemo
    ? demoProfile.company
    : "Add your company";
  const displayDepartment = isDemo
    ? demoProfile.department
    : "Add your role";
  const displayHours = isDemo
    ? demoProfile.hours
    : volunteerData?.volunteer_hours || 0;
  const displayMissions = isDemo
    ? demoProfile.missions
    : volunteerData?.completed_missions || 0;

  const defaultSkills =
    isDemo || !volunteerData?.skills || volunteerData.skills.length === 0
      ? demoPreferences.skills
      : volunteerData.skills;

  const defaultCauseAreas =
    isDemo ||
    !volunteerData?.cause_areas ||
    volunteerData.cause_areas.length === 0
      ? demoPreferences.causeAreas
      : volunteerData.cause_areas;

  const sdgOptions = sdgs.map((sdg) => ({
    value: sdg.name,
    label: translateSdgName(sdg, t),
  }));
  const causeAreaOptions = causes.map((cause) => cause.name);

  const defaultSDGs =
    isDemo || !volunteerData?.sdgs || volunteerData.sdgs.length === 0
      ? demoPreferences.sdgs
      : volunteerData.sdgs;

  const getSkillLabel = (name: string) => {
    const skill = skills.find((item) => item.name === name);
    return translateSkillName(skill ?? { name }, t);
  };

  const getCauseLabel = (name: string) => {
    const cause = causes.find((item) => item.name === name);
    return translateCauseName(cause ?? { name }, t);
  };

  useEffect(() => {
    if (initialized) return;
    if (!isDemo && loading) return;

    const defaults: VolunteerPreferences = {
      skills: defaultSkills,
      causeAreas: defaultCauseAreas,
      sdgs: defaultSDGs,
    };

    const loaded = loadVolunteerPreferences(isDemo, defaults);
    setPreferences(loaded);
    setInitialized(true);
  }, [isDemo, loading, initialized, defaultSkills, defaultCauseAreas, defaultSDGs]);

  if (loading && !isDemo) {
    return (
      <div className="glass-card p-4">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 bg-muted rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
            </div>
          </div>
          <div className="h-16 bg-muted rounded-lg animate-pulse" />
          <div className="h-16 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  if (error && !isDemo) {
    return (
      <div className="glass-card p-4">
        <div className="text-center text-muted-foreground">
          <p>{t("Error loading profile")}: {error}</p>
        </div>
      </div>
    );
  }

  const selectedSDGs = sdgs.filter((sdg) => preferences.sdgs.includes(sdg.name));

  const skillsCount = preferences.skills.length;
  const causeAreasCount = preferences.causeAreas.length;
  const sdgCount = preferences.sdgs.length;

  const filteredSkills = defaultSkills.filter((skill) =>
    skill.toLowerCase().includes(skillsSearch.toLowerCase()),
  );

  const filteredCauseAreas = causeAreaOptions.filter((area) =>
    area.toLowerCase().includes(causeAreasSearch.toLowerCase()),
  );

  const filteredSDGs = sdgOptions.filter((sdg) =>
    sdg.label.toLowerCase().includes(sdgsSearch.toLowerCase()),
  );

  const updatePreferences = (key: keyof VolunteerPreferences, value: string) => {
    setPreferences((prev) => {
      const currentList = prev[key];
      const exists = currentList.includes(value);
      const nextList = exists
        ? currentList.filter((item) => item !== value)
        : [...currentList, value];

      const nextPreferences = {
        ...prev,
        [key]: nextList,
      };

      saveVolunteerPreferences(isDemo, nextPreferences);
      return nextPreferences;
    });
  };

  const MAX_VISIBLE_CHIPS = 6;

  return (
    <>
      <div className="glass-card p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">{t("My Profile")}</h3>
          <Button
            size="xs"
            onClick={() => setIsPreferencesOpen(true)}
            className="px-3 py-1 h-7 rounded-full text-xs font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 border-0"
          >
            Editar
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={displayAvatar} alt={displayName} />
              <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{displayName}</p>
              <p className="text-[11px] text-muted-foreground mt-1">
                Working at
              </p>
              <p className="text-xs font-medium truncate">{displayCompany}</p>

              <div className="flex items-center gap-1 mt-1 text-[11px] text-muted-foreground">
                <Briefcase className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{displayDepartment}</span>
              </div>
            </div>
          </div>

          <div className="bg-card/50 rounded-lg p-3">
            <h4 className="text-[11px] font-medium mb-2">
              This Year's Impact
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-coompass-primary shrink-0" />
                <div>
                  <p className="text-[11px] font-medium">{t("Volunteer Hours")}</p>
                  <p className="text-base font-bold">{displayHours}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ListCheck className="h-4 w-4 text-coompass-success shrink-0" />
                <div>
                  <p className="text-[11px] font-medium">{t("Completed Missions")}</p>
                  <p className="text-base font-bold">{displayMissions}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-3 text-[11px]">
              <div>
                <h5 className="font-medium mb-1">{t("Skills")}</h5>
                <div className="flex flex-wrap gap-1.5">
                  {preferences.skills
                    .slice(0, MAX_VISIBLE_CHIPS)
                    .map((skill) => (
                      <Badge key={skill} variant="outline">
                        {getSkillLabel(skill)}
                      </Badge>
                    ))}
                  {preferences.skills.length > MAX_VISIBLE_CHIPS && (
                    <Badge variant="outline">
                      +{preferences.skills.length - MAX_VISIBLE_CHIPS}
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-1">{t("Cause Areas")}</h5>
                <div className="flex flex-wrap gap-1.5">
                  {preferences.causeAreas
                    .slice(0, MAX_VISIBLE_CHIPS)
                    .map((area) => (
                      <Badge key={area} variant="outline">
                        {getCauseLabel(area)}
                      </Badge>
                    ))}
                  {preferences.causeAreas.length > MAX_VISIBLE_CHIPS && (
                    <Badge variant="outline">
                      +{preferences.causeAreas.length - MAX_VISIBLE_CHIPS}
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-1">{t("SDGs")}</h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSDGs
                    .slice(0, MAX_VISIBLE_CHIPS)
                    .map((sdg) => (
                      <Badge
                        key={sdg.id}
                        className="px-3 py-1 font-medium text-white"
                        style={{ backgroundColor: goalColors[sdg.id] }}
                      >
                        {sdg.id}. {translateSdgName(sdg, t)}
                      </Badge>
                    ))}
                  {selectedSDGs.length > MAX_VISIBLE_CHIPS && (
                    <Badge variant="outline">
                      +{selectedSDGs.length - MAX_VISIBLE_CHIPS}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isPreferencesOpen} onOpenChange={setIsPreferencesOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("Edit preferences")}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 text-sm">
            <div>
              <h4 className="font-medium mb-2">{t("Skills")}</h4>
              <Input
                placeholder={t("Search skills...")}
                value={skillsSearch}
                onChange={(e) => setSkillsSearch(e.target.value)}
                className="text-xs mb-2"
              />
              <div className="max-h-56 overflow-y-auto space-y-1">
                {filteredSkills.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center space-x-2 text-xs"
                  >
                    <Checkbox
                      checked={preferences.skills.includes(skill)}
                      onCheckedChange={() => updatePreferences("skills", skill)}
                    />
                    <span>{getSkillLabel(skill)}</span>
                  </label>
                ))}
                {filteredSkills.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    {t("No results found.")}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">{t("Cause Areas")}</h4>
              <Input
                placeholder={t("Search cause areas...")}
                value={causeAreasSearch}
                onChange={(e) => setCauseAreasSearch(e.target.value)}
                className="text-xs mb-2"
              />
              <div className="max-h-56 overflow-y-auto space-y-1">
                {filteredCauseAreas.map((area) => (
                  <label
                    key={area}
                    className="flex items-center space-x-2 text-xs"
                  >
                    <Checkbox
                      checked={preferences.causeAreas.includes(area)}
                      onCheckedChange={() =>
                        updatePreferences("causeAreas", area)
                      }
                    />
                    <span>{getCauseLabel(area)}</span>
                  </label>
                ))}
                {filteredCauseAreas.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    {t("No results found.")}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">{t("SDGs")}</h4>
              <Input
                placeholder={t("Search SDGs...")}
                value={sdgsSearch}
                onChange={(e) => setSdgsSearch(e.target.value)}
                className="text-xs mb-2"
              />
              <div className="max-h-56 overflow-y-auto space-y-1">
                {filteredSDGs.map((sdg) => (
                  <label
                    key={sdg.value}
                    className="flex items-center space-x-2 text-xs"
                  >
                    <Checkbox
                      checked={preferences.sdgs.includes(sdg.value)}
                      onCheckedChange={() => updatePreferences("sdgs", sdg.value)}
                    />
                    <span>{sdg.label}</span>
                  </label>
                ))}
                {filteredSDGs.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    {t("No results found.")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

