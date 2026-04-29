
import { useTranslation } from "react-i18next";
import { CalendarIcon, FileText, MessageSquare, ThumbsUp, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useCallback } from "react";

export function RecentActivities() {
  const { t } = useTranslation();
  const [activities, setActivities] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Mock data generator - would be replaced with API call. contentKey + contentParam used for i18n.
  const generateMockActivities = (pageNum: number, pageSize: number = 10) => {
    const baseActivities = [
      { type: "mission_completed", user: "Team Alpha", contentKey: "activity_completed_mission", contentParam: { name: "Beach Cleanup" }, icon: ThumbsUp },
      { type: "employee_joined", user: "Emily Johnson", contentKey: "activity_joined_program", contentParam: {}, icon: User },
      { type: "partnership_created", user: "HR Team", contentKey: "activity_partnered_with", contentParam: { name: "Green Earth Foundation" }, icon: MessageSquare },
      { type: "report_generated", user: "System", contentKey: "activity_generated_report", contentParam: {}, icon: FileText },
      { type: "mission_scheduled", user: "Mark Thompson", contentKey: "activity_scheduled_mission", contentParam: { name: "Coding Workshop" }, icon: CalendarIcon },
      { type: "mission_completed", user: "Team Beta", contentKey: "activity_completed_mission", contentParam: { name: "Food Drive" }, icon: ThumbsUp },
      { type: "employee_joined", user: "Sarah Williams", contentKey: "activity_joined_program", contentParam: {}, icon: User },
      { type: "partnership_created", user: "Management", contentKey: "activity_partnered_with", contentParam: { name: "Ocean Conservation Society" }, icon: MessageSquare }
    ];

    const getTimeAgo = (index: number, pageNum: number): { key: string; count?: number } => {
      const totalIndex = (pageNum - 1) * pageSize + index;
      if (totalIndex === 0) return { key: "2 hours ago" };
      if (totalIndex === 1) return { key: "Yesterday" };
      if (totalIndex < 5) return { key: "{{count}} days ago", count: totalIndex + 1 };
      if (totalIndex < 10) return { key: "{{count}} weeks ago", count: Math.floor(totalIndex / 2) };
      return { key: "{{count}} weeks ago", count: Math.floor(totalIndex / 7) };
    };

    return Array.from({ length: pageSize }, (_, index) => {
      const base = baseActivities[index % baseActivities.length];
      return {
        id: (pageNum - 1) * pageSize + index + 1,
        ...base,
        timeAgo: getTimeAgo(index, pageNum)
      };
    });
  };

  const loadMoreActivities = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newActivities = generateMockActivities(page);
    
    if (newActivities.length < 10) {
      setHasMore(false);
    }
    
    setActivities(prev => [...prev, ...newActivities]);
    setPage(prev => prev + 1);
    setLoading(false);
  }, [page, loading, hasMore]);

  // Initial load
  useEffect(() => {
    loadMoreActivities();
  }, []); // Only run once on mount

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    
    // Load more when user scrolls to within 100px of the bottom
    if (scrollHeight - scrollTop <= clientHeight + 100 && hasMore && !loading) {
      loadMoreActivities();
    }
  }, [hasMore, loading, loadMoreActivities]);

  return (
    <div className="glass-card p-4">
      <h3 className="text-base font-semibold mb-3">{t('Recent Activities')}</h3>

      <ScrollArea className="h-[280px] w-full" onScrollCapture={handleScroll}>
        <div className="space-y-1.5 pr-2">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-2.5 p-2 hover:bg-foreground/5 rounded-lg transition-colors">
              <div className="flex items-center justify-center h-7 w-7 shrink-0 bg-foreground/10 rounded-full">
                <activity.icon className="h-3.5 w-3.5 text-coompass-success" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs">
                  <span className="font-medium">{activity.user}</span> {activity.contentKey ? t(activity.contentKey, activity.contentParam || {}) : (activity as any).content}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {activity.timeAgo?.count != null ? t(activity.timeAgo.key, { count: activity.timeAgo.count }) : activity.timeAgo ? t(activity.timeAgo.key) : ""}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center justify-center py-2">
              <div className="text-xs text-muted-foreground">{t('Loading more activities...')}</div>
            </div>
          )}

          {!hasMore && activities.length > 0 && (
            <div className="flex items-center justify-center py-2">
              <div className="text-xs text-muted-foreground">{t('No more activities to load')}</div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
