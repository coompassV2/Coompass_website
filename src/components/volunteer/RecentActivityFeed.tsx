
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Calendar, MessageSquare, ThumbsUp } from "lucide-react";

export function RecentActivityFeed() {
  const { t } = useTranslation();
  
  // Mock data - would come from API in a real implementation
  const activities = [
    {
      id: "1",
      type: "mission_completed",
      title: "Beach Cleanup",
      date: "2025-04-01",
      icon: <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />,
    },
    {
      id: "2",
      type: "mission_joined",
      title: "Food Drive",
      date: "2025-03-28",
      icon: <Calendar className="h-4 w-4 text-blue-500 shrink-0" />,
    },
    {
      id: "3",
      type: "hours_logged",
      title: "Mentoring Session",
      date: "2025-03-25",
      hours: 2,
      icon: <Clock className="h-4 w-4 text-amber-500 shrink-0" />,
    },
    {
      id: "4",
      type: "comment_received",
      title: "Great job at the Food Drive!",
      date: "2025-03-24",
      from: "Team Lead",
      icon: <MessageSquare className="h-4 w-4 text-purple-500 shrink-0" />,
    },
    {
      id: "5",
      type: "recognition",
      title: "Team Player Badge Earned",
      date: "2025-03-20",
      icon: <ThumbsUp className="h-4 w-4 text-red-500 shrink-0" />,
    }
  ];
  
  const getActivityContent = (activity: any) => {
    switch (activity.type) {
      case "mission_completed":
        return t('Completed the mission') + `: ${activity.title}`;
      case "mission_joined":
        return t('Joined new mission') + `: ${activity.title}`;
      case "hours_logged":
        return `${t('Logged')} ${activity.hours} ${t('hours for')}: ${activity.title}`;
      case "comment_received":
        return `${activity.from}: "${activity.title}"`;
      case "recognition":
        return activity.title;
      default:
        return activity.title;
    }
  };
  
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold">{t('Recent Activity')}</h3>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0">{t('Last 30 Days')}</Badge>
      </div>

      <div className="space-y-1.5">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-2.5 p-2 hover:bg-foreground/5 rounded-lg transition-colors">
            <div className="mt-0.5 shrink-0">
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs">{getActivityContent(activity)}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{activity.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
