import { useState, useEffect } from 'react';
import { getStoredToken, apiGet } from '@/services/authApi';

export interface VolunteerData {
  id: string;
  full_name: string;
  email: string | null;
  department: string | null;
  avatar_url: string | null;
  description: string | null;
  location: string | null;
  skills: string[] | null;
  sdgs: string[] | null;
  cause_areas: string[] | null;
  volunteer_hours: number | null;
  completed_missions: number | null;
  created_at: string | null;
  updated_at: string | null;
}

export const useVolunteerData = (userId?: string) => {
  const [volunteerData, setVolunteerData] = useState<VolunteerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVolunteerData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const token = getStoredToken();
        const { data, error: err } = await apiGet<VolunteerData>('/api/volunteers/me', token);

        if (err) {
          setError(err);
          return;
        }
        if (!data) {
          setError('No volunteer data found');
          return;
        }
        setVolunteerData({
          ...data,
          volunteer_hours: data.volunteer_hours ?? 0,
          completed_missions: data.completed_missions ?? 0,
          cause_areas: data.cause_areas ?? [],
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteerData();
  }, [userId]);

  return { volunteerData, loading, error };
};
