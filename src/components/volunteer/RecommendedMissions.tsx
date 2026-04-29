
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, ChevronRight } from "lucide-react";
import { missions } from "@/data/missions";
import type { Mission } from "@/types/organization";
import { useEffect, useMemo, useState } from "react";
import { apiGet, getStoredToken } from "@/services/authApi";
import { useVolunteerData } from "@/hooks/useVolunteerData";
import { useTaxonomyLists } from "@/hooks/useTaxonomyLists";
import { cn } from "@/lib/utils";

interface ApiMission {
  id: string;
  title: string;
  description: string;
  hours: number;
  volunteers_required: number;
  location: string;
  is_virtual?: boolean;
  causes?: string[];
  skills?: string[];
  company_name?: string | null;
  organization_name?: string | null;
  organization_logo_url?: string | null;
  company_logo_url?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  created_at?: string;
  participants_count?: number;
  spots_left?: number;
  is_joined?: boolean;
}

interface MissionsResponse {
  missions: ApiMission[];
}

interface RecommendedMissionsProps {
  userId?: string;
  isDemo?: boolean;
}

function normalizeSkill(value: string): string {
  return value.trim().toLowerCase();
}

function missionNeedsVolunteers(mission: Mission): boolean {
  if (mission.isFull) return false;
  if (typeof mission.spotsLeft === "number") return mission.spotsLeft > 0;
  if (typeof mission.participantsCount === "number") return mission.participantsCount < mission.volunteers;
  return mission.volunteers > 0;
}

function toUiMission(apiMission: ApiMission): Mission {
  return {
    id: apiMission.id,
    title: apiMission.title,
    organization: apiMission.organization_name || apiMission.company_name || "Organization",
    description: apiMission.description ?? "",
    hours: Number(apiMission.hours) || 0,
    volunteers: Number(apiMission.volunteers_required) || 0,
    location: apiMission.is_virtual ? "Remote" : apiMission.location || "On-site",
    postedDate: apiMission.start_date || apiMission.created_at || "",
    startDate: apiMission.start_date ?? undefined,
    endDate: apiMission.end_date ?? undefined,
    causes: apiMission.causes ?? [],
    skills: apiMission.skills ?? [],
    participantsCount: apiMission.participants_count ?? 0,
    spotsLeft:
      typeof apiMission.spots_left === "number"
        ? apiMission.spots_left
        : Math.max(0, (Number(apiMission.volunteers_required) || 0) - (apiMission.participants_count ?? 0)),
    isFull:
      typeof apiMission.spots_left === "number"
        ? apiMission.spots_left <= 0
        : (apiMission.participants_count ?? 0) >= (Number(apiMission.volunteers_required) || 0),
    isJoined: apiMission.is_joined ?? false,
    organizationLogoUrl:
      apiMission.organization_logo_url ?? apiMission.company_logo_url ?? undefined,
  };
}

function pickRandom<T>(items: T[], count: number): T[] {
  if (items.length <= count) return items;
  const pool = [...items];
  const picked: T[] = [];
  while (picked.length < count && pool.length > 0) {
    const index = Math.floor(Math.random() * pool.length);
    const [item] = pool.splice(index, 1);
    picked.push(item);
  }
  return picked;
}

export function RecommendedMissions({ userId, isDemo = false }: RecommendedMissionsProps) {
  const { t } = useTranslation();
  const { volunteerData } = useVolunteerData(userId);
  const { causes } = useTaxonomyLists();

  const getCauseLabel = (name: string) => {
    const cause = causes.find((item) => item.name === name);
    const key = cause?.slug ?? cause?.key ?? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return t(`taxonomy.cause.${key}`, { defaultValue: name });
  };
  const [catalogMissions, setCatalogMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loadMissions = async () => {
      setLoading(true);

      if (isDemo) {
        if (!cancelled) {
          setCatalogMissions(missions as Mission[]);
          setLoading(false);
        }
        return;
      }

      const token = getStoredToken();
      const { data, error } = await apiGet<MissionsResponse>("/api/missions?skill_match_only=false", token);
      if (cancelled) return;

      if (error || !data?.missions) {
        setCatalogMissions(missions as Mission[]);
        setLoading(false);
        return;
      }

      setCatalogMissions(data.missions.map(toUiMission));
      setLoading(false);
    };

    void loadMissions();

    return () => {
      cancelled = true;
    };
  }, [isDemo]);

  const recommendedMissions = useMemo(() => {
    const volunteerSkillSet = new Set((volunteerData?.skills ?? []).map(normalizeSkill));
    const openMissions = catalogMissions.filter((mission) => missionNeedsVolunteers(mission) && !mission.isJoined);

    const matched = openMissions.filter((mission) => {
      const missionSkills = (mission.skills ?? []).map(normalizeSkill);
      if (missionSkills.length === 0 || volunteerSkillSet.size === 0) return false;
      return missionSkills.some((skill) => volunteerSkillSet.has(skill));
    });

    if (matched.length > 0) {
      return matched.slice(0, 3);
    }

    return pickRandom(openMissions, 3);
  }, [catalogMissions, volunteerData?.skills]);
  
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold">{t('Recommended Missions')}</h3>
        <Link to="/missions">
          <Button variant="link" className="text-coompass-primary p-0 h-auto text-xs">
            {t('View All')}
            <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
          </Button>
        </Link>
      </div>

      <div className="space-y-2">
        {loading ? (
          <p className="text-xs text-muted-foreground">{t("Loading")}</p>
        ) : null}
        {!loading && recommendedMissions.length === 0 ? (
          <p className="text-xs text-muted-foreground">{t("No data yet")}</p>
        ) : null}
        {recommendedMissions.map((mission) => (
          <Link
            key={mission.id}
            to={`/missions/${mission.id}`}
            className="block"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between p-3 hover:bg-foreground/5 rounded-lg transition-colors cursor-pointer gap-3">
              <div className="flex items-start gap-3">
                <img
                  src={mission.image || `https://api.dicebear.com/7.x/shapes/svg?seed=${mission.organization}`}
                  alt="Mission"
                  className="h-10 w-10 rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{mission.title}</div>
                  <div className="text-xs text-coompass-primary mb-0.5 truncate">{mission.organization}</div>
                  <div className="flex items-center text-xs text-muted-foreground flex-wrap gap-x-2 gap-y-0">
                    <span className="inline-flex items-center gap-0.5">
                      <MapPin className="h-3 w-3" />
                      {mission.location}
                    </span>
                    <span className="inline-flex items-center gap-0.5">
                      <Calendar className="h-3 w-3" />
                      {mission.postedDate}
                    </span>
                    <span className="inline-flex items-center gap-0.5">
                      <Clock className="h-3 w-3" />
                      {mission.hours} {t('hrs')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1 md:mt-0 shrink-0">
                {(mission.causes ?? []).slice(0, 2).map((cause) => (
                  <Badge
                    key={cause}
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 bg-green-500/10 text-green-700 dark:bg-green-950 dark:text-green-400"
                  >
                    {getCauseLabel(cause)}
                  </Badge>
                ))}
                {mission.skills?.length ? (
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] px-1.5 py-0",
                      "bg-blue-500/10 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                    )}
                  >
                    {t("Skill match")}
                  </Badge>
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
