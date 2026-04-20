import { useVolunteerData } from "@/hooks/useVolunteerData";
import { useEffect, useState } from "react";
import { useSessionMode } from "@/hooks/useSessionMode";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { goalColors } from "@/components/organizations/GoalBadge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  loadVolunteerPreferences,
  saveVolunteerPreferences,
  type VolunteerPreferences,
} from "@/utils/volunteerPreferences";
import { useTranslation } from "react-i18next";
import { useTaxonomyLists } from "@/hooks/useTaxonomyLists";
import { translateCauseName, translateSdgName, translateSkillName } from "@/utils/taxonomyI18n";

type VolunteerInterestsCardProps = {
  compact?: boolean;
};

export function VolunteerInterestsCard({ compact = false }: VolunteerInterestsCardProps) {
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

  const [skillsPopoverOpen, setSkillsPopoverOpen] = useState(false);
  const [causeAreasPopoverOpen, setCauseAreasPopoverOpen] = useState(false);
  const [sdgsPopoverOpen, setSdgsPopoverOpen] = useState(false);

  const [skillsSearch, setSkillsSearch] = useState("");
  const [causeAreasSearch, setCauseAreasSearch] = useState("");
  const [sdgsSearch, setSdgsSearch] = useState("");

  // Demo data for showcase
  const demoData = {
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
      "Web Design"
    ],
    sdgs: ["Quality Education", "Climate Action", "Reduced Inequalities"],
    causeAreas: ["Culture", "Employability", "Community"]
  };

  // Default values from demo data or existing volunteer data
  const defaultSkills =
    isDemo || !volunteerData?.skills || volunteerData.skills.length === 0
      ? demoData.skills
      : volunteerData.skills;

  const defaultCauseAreas =
    isDemo || !volunteerData?.cause_areas || volunteerData.cause_areas.length === 0
      ? demoData.causeAreas
      : volunteerData.cause_areas;

  const sdgOptions = sdgs.map((sdg) => ({
    value: sdg.name,
    label: translateSdgName(sdg, t),
  }));
  const causeAreaOptions = causes.map((cause) => cause.name);

  const defaultSDGs =
    isDemo || !volunteerData?.sdgs || volunteerData.sdgs.length === 0
      ? demoData.sdgs
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
      <div className="glass-card p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-6 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-6 bg-muted rounded animate-pulse" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-6 w-20 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !isDemo) {
    return (
      <div className="glass-card p-6">
        <div className="text-center text-muted-foreground">
          <p>{t("Error loading interests")}: {error}</p>
        </div>
      </div>
    );
  }

  const selectedSDGs = sdgs.filter((sdg) => preferences.sdgs.includes(sdg.name));

  const skillsCount = preferences.skills.length;
  const causeAreasCount = preferences.causeAreas.length;
  const sdgCount = preferences.sdgs.length;

  const filteredSkills = defaultSkills.filter((skill) =>
    skill.toLowerCase().includes(skillsSearch.toLowerCase())
  );

  const filteredCauseAreas = causeAreaOptions.filter((area) =>
    area.toLowerCase().includes(causeAreasSearch.toLowerCase())
  );

  const filteredSDGs = sdgOptions.filter((sdg) =>
    sdg.label.toLowerCase().includes(sdgsSearch.toLowerCase())
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
    <div className={`glass-card ${compact ? "p-4" : "p-6"}`}>
      <div className={compact ? "space-y-3" : "space-y-4"}>
        <div>
          <h3 className={compact ? "text-base font-semibold mb-1" : "text-lg font-semibold mb-2"}>
            {t("Interests & Skills Summary")}
          </h3>
        </div>

        <div className="space-y-3 text-xs md:text-sm">
          {/* Skills Section */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium">{t("Skills")}</h4>
              <Popover open={skillsPopoverOpen} onOpenChange={setSkillsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="xs">
                    {t("Edit")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-3" align="end">
                  <div className="space-y-2">
                    <Input
                      placeholder={t("Search skills...")}
                      value={skillsSearch}
                      onChange={(e) => setSkillsSearch(e.target.value)}
                      className="text-xs"
                    />
                    <div className="max-h-56 overflow-y-auto space-y-1">
                      {filteredSkills.map((skill) => (
                        <label key={skill} className="flex items-center space-x-2 text-xs">
                          <Checkbox
                            checked={preferences.skills.includes(skill)}
                            onCheckedChange={() => updatePreferences("skills", skill)}
                          />
                          <span>{getSkillLabel(skill)}</span>
                        </label>
                      ))}
                      {filteredSkills.length === 0 && (
                        <p className="text-xs text-muted-foreground">
                          Nenhum resultado encontrado.
                        </p>
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-wrap gap-2">
              {preferences.skills.slice(0, MAX_VISIBLE_CHIPS).map((skill) => (
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

          {/* Cause Areas Section */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium">{t("Cause Areas")}</h4>
              <Popover open={causeAreasPopoverOpen} onOpenChange={setCauseAreasPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="xs">
                    {t("Edit")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-3" align="end">
                  <div className="space-y-2">
                    <Input
                      placeholder={t("Search cause areas...")}
                      value={causeAreasSearch}
                      onChange={(e) => setCauseAreasSearch(e.target.value)}
                      className="text-xs"
                    />
                    <div className="max-h-56 overflow-y-auto space-y-1">
                      {filteredCauseAreas.map((area) => (
                        <label key={area} className="flex items-center space-x-2 text-xs">
                          <Checkbox
                            checked={preferences.causeAreas.includes(area)}
                            onCheckedChange={() => updatePreferences("causeAreas", area)}
                          />
                          <span>{getCauseLabel(area)}</span>
                        </label>
                      ))}
                      {filteredCauseAreas.length === 0 && (
                        <p className="text-xs text-muted-foreground">
                          Nenhum resultado encontrado.
                        </p>
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-wrap gap-2">
              {preferences.causeAreas.slice(0, MAX_VISIBLE_CHIPS).map((area) => (
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

          {/* SDGs Section */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium">{t("SDGs")}</h4>
              <Popover open={sdgsPopoverOpen} onOpenChange={setSdgsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="xs">
                    {t("Edit")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-3" align="end">
                  <div className="space-y-2">
                    <Input
                      placeholder={t("Search SDGs...")}
                      value={sdgsSearch}
                      onChange={(e) => setSdgsSearch(e.target.value)}
                      className="text-xs"
                    />
                    <div className="max-h-56 overflow-y-auto space-y-1">
                      {filteredSDGs.map((sdg) => (
                        <label key={sdg.value} className="flex items-center space-x-2 text-xs">
                          <Checkbox
                            checked={preferences.sdgs.includes(sdg.value)}
                            onCheckedChange={() => updatePreferences("sdgs", sdg.value)}
                          />
                          <span>{sdg.label}</span>
                        </label>
                      ))}
                      {filteredSDGs.length === 0 && (
                        <p className="text-xs text-muted-foreground">
                          Nenhum resultado encontrado.
                        </p>
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedSDGs.slice(0, MAX_VISIBLE_CHIPS).map((sdg) => (
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
  );
}
