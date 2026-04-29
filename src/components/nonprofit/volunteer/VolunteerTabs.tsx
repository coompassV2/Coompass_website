import { VolunteerDirectoryTab } from "./VolunteerDirectoryTab";
import { Volunteer, PendingVolunteer } from "./VolunteerTypes";

interface VolunteerTabsProps {
  searchQuery: string;
  volunteers: Volunteer[];
  pendingVolunteers: PendingVolunteer[];
  loading: boolean;
  error: string | null;
  rejectingApplicationId: string | null;
  onRejectVolunteer: (applicationId: string, decisionNote?: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  onRetry: () => Promise<void>;
}

export function VolunteerTabs({
  searchQuery,
  volunteers,
  pendingVolunteers,
  loading,
  error,
  rejectingApplicationId,
  onRejectVolunteer,
  onRetry,
}: VolunteerTabsProps) {
  return (
    <VolunteerDirectoryTab
      searchQuery={searchQuery}
      volunteers={volunteers}
      pendingVolunteers={pendingVolunteers}
      loading={loading}
      error={error}
      rejectingApplicationId={rejectingApplicationId}
      onRejectVolunteer={onRejectVolunteer}
      onRetry={onRetry}
    />
  );
}
