/**
 * Auth helpers only. No Supabase client in the frontend – all data goes through the backend.
 * Re-exports from authApi for compatibility with existing imports.
 */
export {
  getCurrentUser,
  cleanupAuthState,
  signOut,
} from "@/services/authApi";
