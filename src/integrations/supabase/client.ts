/**
 * No Supabase client in the frontend – all data goes through the backend API.
 * This file is kept for type imports only. Do not import `supabase` from here.
 */
import type { Database } from "./types";

/** @deprecated Use backend API (e.g. apiGet('/api/volunteers/me', token)) instead. */
export const supabase = new Proxy({} as import("@supabase/supabase-js").SupabaseClient<Database>, {
  get() {
    throw new Error(
      "Supabase is not used in the frontend. Use the backend API (e.g. /api/volunteers/me, /api/missions/current) instead."
    );
  },
});
