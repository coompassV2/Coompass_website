import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LogIn, UserPlus, FileDown, Rocket, Target, Play, CheckCircle2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { getStoredToken, apiGet } from "@/services/authApi";
import { formatDistanceToNow } from "date-fns";
import { enUS, pt } from "date-fns/locale";

export type ActivityEventType =
  | "login"
  | "joined_mission"
  | "user_registered"
  | "report_downloaded"
  | "org_launched_mission"
  | "project_created"
  | "mission_created"
  | "mission_started"
  | "mission_completed"
  | "volunteer_applied_to_mission"
  | "project_commented";

export interface ActivityFeedItem {
  id: string;
  event_type: ActivityEventType;
  actor_type: "user" | "org";
  actor_name: string;
  target_type: "mission" | "report" | "project" | null;
  target_id: string | null;
  target_name: string | null;
  mission_id?: string | null;
  project_id?: string | null;
  project_name?: string | null;
  volunteer_id?: string | null;
  user_id?: string | null;
  nonprofit_id?: string | null;
  created_at: string;
}

const EVENT_ICONS: Record<ActivityEventType, typeof LogIn> = {
  login: LogIn,
  joined_mission: Target,
  user_registered: UserPlus,
  report_downloaded: FileDown,
  org_launched_mission: Rocket,
  project_created: Rocket,
  mission_created: Rocket,
  mission_started: Play,
  mission_completed: CheckCircle2,
  volunteer_applied_to_mission: Target,
  project_commented: Target,
};

interface ActivityFeedProps {
  missionBasePath?: string;
  projectBasePath?: string;
}

export function ActivityFeed({
  missionBasePath = "/company/missions",
  projectBasePath = "/company/projects",
}: ActivityFeedProps) {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState<ActivityFeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const token = getStoredToken();
    if (!token) {
      setLoading(false);
      setItems([]);
      return;
    }
    apiGet<{ items: ActivityFeedItem[] }>("/api/company/activity-feed", token)
      .then(({ data, error: err }) => {
        if (cancelled) return;
        setLoading(false);
        if (err) {
          setItems([]);
          return;
        }
        setItems(data?.items ?? []);
      })
      .catch(() => {
        if (!cancelled) {
          setLoading(false);
          setItems([]);
        }
      });
    return () => { cancelled = true; };
  }, []);

  const formatRelative = (iso: string) => {
    try {
      const locale = i18n.language.toLowerCase().startsWith("pt") ? pt : enUS;
      return formatDistanceToNow(new Date(iso), { addSuffix: true, locale });
    } catch {
      return iso;
    }
  };

  const formatExact = (iso: string) => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  const renderAction = (item: ActivityFeedItem) => {
    const actor = item.actor_name;
    const targetName = item.target_name;
    const missionLinkId = item.target_id ?? item.mission_id ?? null;
    const missionProjectId = item.project_id ?? null;
    const missionProjectName = item.project_name ?? null;
    const renderMissionLink = (keyPrefix: string, interpolation: Record<string, string>) => {
      if (missionLinkId && targetName) {
        return (
          <>
            {t(`${keyPrefix}_prefix`, interpolation)}{" "}
            <Link
              to={`${missionBasePath}/${missionLinkId}`}
              className="text-primary hover:underline font-medium"
            >
              {targetName}
            </Link>
          </>
        );
      }
      return t(keyPrefix, interpolation);
    };
    const renderProjectLink = (keyPrefix: string, interpolation: Record<string, string>) => {
      if (item.target_id && targetName) {
        return (
          <>
            {t(`${keyPrefix}_prefix`, interpolation)}{" "}
            <Link
              to={`${projectBasePath}/${item.target_id}`}
              className="text-primary hover:underline font-medium"
            >
              {targetName}
            </Link>
          </>
        );
      }
      return t(keyPrefix, interpolation);
    };
    const renderMissionWithProjectLink = () => {
      if (!(missionLinkId && targetName && missionProjectId && missionProjectName)) {
        return renderMissionLink("activity_feed_mission_created", { actorName: actor });
      }
      return (
        <>
          {t("activity_feed_mission_created_prefix", { actorName: actor })}{" "}
          <Link
            to={`${missionBasePath}/${missionLinkId}`}
            className="text-primary hover:underline font-medium"
          >
            {targetName}
          </Link>{" "}
          {t("activity_feed_mission_created_part_of_project")}{" "}
          <Link
            to={`${projectBasePath}/${missionProjectId}`}
            className="text-primary hover:underline font-medium"
          >
            {missionProjectName}
          </Link>
        </>
      );
    };

    switch (item.event_type) {
      case "login":
        return t("activity_feed_logged_in", { userName: actor });
      case "joined_mission":
        return renderMissionLink("activity_feed_joined_mission", { userName: actor });
      case "user_registered":
        return t("activity_feed_created_account", { userName: actor });
      case "report_downloaded":
        return t("activity_feed_downloaded_report", { userName: actor });
      case "org_launched_mission":
        return renderMissionLink("activity_feed_org_launched", { orgName: actor });
      case "project_created":
        return renderProjectLink("activity_feed_project_created", { actorName: actor });
      case "mission_created":
        return renderMissionWithProjectLink();
      case "mission_started":
        return renderMissionLink("activity_feed_mission_started", { actorName: actor });
      case "mission_completed":
        return renderMissionLink("activity_feed_mission_completed", { actorName: actor });
      case "volunteer_applied_to_mission":
        return renderMissionLink("activity_feed_volunteer_applied_to_mission", { actorName: actor });
      case "project_commented":
        return renderProjectLink("activity_feed_project_commented", { actorName: actor });
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="glass-card p-4">
        <h3 className="text-base font-semibold mb-3">{t("Activity Feed")}</h3>
        <div className="h-[280px] flex items-center justify-center">
          <div className="text-sm text-muted-foreground">{t("Loading")}</div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="glass-card p-4">
        <h3 className="text-base font-semibold mb-3">{t("Activity Feed")}</h3>
        <div className="h-[280px] flex items-center justify-center rounded-lg border border-dashed border-border">
          <div className="text-sm text-muted-foreground">{t("No activity yet")}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-4">
      <h3 className="text-base font-semibold mb-3">{t("Activity Feed")}</h3>
      <TooltipProvider>
        <ScrollArea className="h-[280px] w-full">
          <div className="space-y-1.5 pr-2">
            {items.map((item) => {
              const Icon = EVENT_ICONS[item.event_type];
              return (
                <div
                  key={item.id}
                  className="flex gap-2.5 p-2 hover:bg-foreground/5 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-center h-7 w-7 shrink-0 bg-foreground/10 rounded-full">
                    <Icon className="h-3.5 w-3.5 text-coompass-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs">{renderAction(item)}</p>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-[10px] text-muted-foreground mt-0.5 cursor-help">
                          {formatRelative(item.created_at)}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{formatExact(item.created_at)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </TooltipProvider>
    </div>
  );
}
