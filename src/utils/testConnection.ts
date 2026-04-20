import { getStoredToken, getSessionFromApi, apiGet } from "@/services/authApi";

/** Test backend API (session + volunteers/me). No Supabase in frontend. */
export const testSupabaseConnection = async () => {
  console.log("🔍 Testing backend API connection...");

  try {
    const token = getStoredToken();
    if (!token) {
      return {
        success: true,
        message: "No token (not logged in). Session and API tests skipped.",
        authSession: null,
        tableAccess: false,
      };
    }

    console.log("1. Testing session...");
    const sessionResult = await getSessionFromApi(token);
    if ("error" in sessionResult) {
      return { success: false, error: sessionResult.error };
    }
    console.log("✅ Session OK");

    console.log("2. Testing /api/volunteers/me...");
    const { data, error } = await apiGet<unknown>("/api/volunteers/me", token);
    if (error) {
      return { success: false, error };
    }
    console.log("✅ Volunteers API OK");

    return {
      success: true,
      message: "Backend API tests passed!",
      authSession: sessionResult.user,
      tableAccess: !!data,
    };
  } catch (error) {
    console.error("❌ Connection test failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const testVolunteerRegistration = async (testData: {
  email: string;
  password: string;
  companyName: string;
  description?: string;
  location?: string;
  skills?: string[];
  sdgs?: string[];
}) => {
  console.log("🧪 Testing volunteer registration (backend)...");

  try {
    const { registerUser } = await import("@/services/registrationService");
    const result = await registerUser("volunteer", testData);
    console.log("✅ Registration test successful:", result);
    return { success: true, user: result };
  } catch (error) {
    console.error("❌ Registration test failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
