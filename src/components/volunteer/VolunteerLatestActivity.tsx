import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ActivityItem {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  timestamp: string;
}

const activities: ActivityItem[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  user: {
    name: "Ricardo A.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo",
  },
  action: "Joined a mission",
  timestamp: "4 days ago"
}));

export function VolunteerLatestActivity({ className }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <div className={cn("glass-card p-6", className)}>
      <h3 className="text-lg font-semibold mb-4">{t("Latest Activity")}</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3 text-sm">
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <span className="font-medium">{activity.user.name}</span>
              <span className="text-muted-foreground"> {activity.action}</span>
            </div>
            <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
