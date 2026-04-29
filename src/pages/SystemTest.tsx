import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { testSupabaseConnection, testVolunteerRegistration } from "@/utils/testConnection";
import { getCurrentUser, signOut } from "@/lib/supabase";
import { getStoredToken, apiGet } from "@/services/authApi";
import { getCurrentPersona } from "@/utils/demoUtils";
import { UserDebugInfo } from "@/components/shared/UserDebugInfo";

export default function SystemTest() {
  const [connectionTest, setConnectionTest] = useState<any>(null);
  const [registrationTest, setRegistrationTest] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [testResults, setTestResults] = useState<any>({});

  const handleConnectionTest = async () => {
    setLoading(true);
    try {
      const result = await testSupabaseConnection();
      setConnectionTest(result);
    } catch (error) {
      setConnectionTest({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationTest = async () => {
    setLoading(true);
    try {
      const testData = {
        // IMPORTANT: Replace 'yourname' with your actual Gmail or real email username before running the test
        email: `yourname+test${Date.now()}@gmail.com`,
        password: "TestPass123!",
        companyName: "Test Volunteer",
        description: "This is a test volunteer account",
        location: "Test City, USA",
        skills: ["Teaching", "Event Planning", "Social Media"],
        sdgs: ["Quality Education", "Climate Action"]
      };
      
      const result = await testVolunteerRegistration(testData);
      setRegistrationTest(result);
    } catch (error) {
      setRegistrationTest({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  const handleGetCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error("Error getting current user:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setCurrentUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getSessionMode = async () => {
    const token = getStoredToken();
    if (!token) return "No session";
    const result = await (await import("@/services/authApi")).getSessionFromApi(token);
    return "error" in result || !result.user ? "No session" : "Authenticated";
  };

  const getCurrentPersonaLocal = async () => {
    const user = await getCurrentUser();
    if (!user) return "No user";
    const persona = await getCurrentPersona();
    return persona ?? "No persona detected";
  };

  const testUserIDDetection = async () => {
    setTestResults(prev => ({ ...prev, userIDDetection: 'running' }));
    
    try {
      console.log('=== Testing User ID Detection ===');
      
      // Test 1: Get current user
      const currentUser = await getCurrentUser();
      console.log('Current user:', currentUser);
      
      // Test 2: Get session mode
      const sessionMode = await getSessionMode();
      console.log('Session mode:', sessionMode);
      
      // Test 3: Get current persona
      const currentPersona = await getCurrentPersonaLocal();
      console.log('Current persona:', currentPersona);
      
      // Test 4: Check volunteer data via backend API
      if (currentUser) {
        const token = getStoredToken();
        const { data, error } = await apiGet<{ full_name?: string; email?: string }>("/api/volunteers/me", token);
        console.log("Volunteer data:", { data, error });

        if (data) {
          setTestResults((prev) => ({
            ...prev,
            userIDDetection: "passed",
            userIDDetails: {
              userId: currentUser.id,
              userName: data.full_name,
              userEmail: data.email,
              sessionMode,
              currentPersona,
            },
          }));
        } else {
          setTestResults((prev) => ({
            ...prev,
            userIDDetection: "failed",
            userIDDetails: {
              userId: currentUser.id,
              error: error ?? "No volunteer data found",
            },
          }));
        }
      } else {
        setTestResults(prev => ({ 
          ...prev, 
          userIDDetection: 'failed',
          userIDDetails: { error: 'No authenticated user found' }
        }));
      }
    } catch (error) {
      console.error('User ID detection test error:', error);
      setTestResults(prev => ({ 
        ...prev, 
        userIDDetection: 'failed',
        userIDDetails: { error: error instanceof Error ? error.message : 'Unknown error' }
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">System Health Check</h1>
          <p className="text-muted-foreground">
            Test the volunteer registration and authentication system
          </p>
        </div>

        {/* Current User Status */}
        <Card>
          <CardHeader>
            <CardTitle>Current User Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button onClick={handleGetCurrentUser} variant="outline">
                Get Current User
              </Button>
              <Button onClick={handleSignOut} variant="destructive">
                Sign Out
              </Button>
            </div>
            {currentUser && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Logged in as:</h4>
                <p><strong>ID:</strong> {currentUser.id}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
                {currentUser.role && <p><strong>Role:</strong> {currentUser.role}</p>}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Connection Test */}
        <Card>
          <CardHeader>
            <CardTitle>Backend API Connection Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleConnectionTest} 
              disabled={loading}
              className="w-full"
            >
              {loading ? "Testing..." : "Test Connection"}
            </Button>
            
            {connectionTest && (
              <div className={`p-4 rounded-lg ${
                connectionTest.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={connectionTest.success ? "default" : "destructive"}>
                    {connectionTest.success ? "PASS" : "FAIL"}
                  </Badge>
                  <span className="font-semibold">
                    {connectionTest.success ? "Connection Successful" : "Connection Failed"}
                  </span>
                </div>
                {connectionTest.message && (
                  <p className="text-sm">{connectionTest.message}</p>
                )}
                {connectionTest.error && (
                  <p className="text-sm text-red-600">{connectionTest.error}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Registration Test */}
        <Card>
          <CardHeader>
            <CardTitle>Volunteer Registration Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleRegistrationTest} 
              disabled={loading}
              className="w-full"
            >
              {loading ? "Testing..." : "Test Registration"}
            </Button>
            
            {registrationTest && (
              <div className={`p-4 rounded-lg ${
                registrationTest.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={registrationTest.success ? "default" : "destructive"}>
                    {registrationTest.success ? "PASS" : "FAIL"}
                  </Badge>
                  <span className="font-semibold">
                    {registrationTest.success ? "Registration Successful" : "Registration Failed"}
                  </span>
                </div>
                {registrationTest.user && (
                  <div className="text-sm space-y-1">
                    <p><strong>User ID:</strong> {registrationTest.user.id}</p>
                    <p><strong>Email:</strong> {registrationTest.user.email}</p>
                  </div>
                )}
                {registrationTest.error && (
                  <p className="text-sm text-red-600">{registrationTest.error}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* User ID Detection Test */}
        <Card>
          <CardHeader>
            <CardTitle>User ID Detection Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={testUserIDDetection} 
              disabled={loading}
              className="w-full"
            >
              {loading ? "Testing..." : "Run User ID Detection Test"}
            </Button>
            
            {testResults.userIDDetection && (
              <div className={`p-4 rounded-lg ${
                testResults.userIDDetection === 'passed' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={testResults.userIDDetection === 'passed' ? "default" : "destructive"}>
                    {testResults.userIDDetection === 'passed' ? "PASS" : "FAIL"}
                  </Badge>
                  <span className="font-semibold">
                    {testResults.userIDDetection === 'passed' ? "User ID Detection Successful" : "User ID Detection Failed"}
                  </span>
                </div>
                {testResults.userIDDetails && (
                  <div className="text-sm space-y-1">
                    <p><strong>User ID:</strong> {testResults.userIDDetails.userId}</p>
                    <p><strong>Session Mode:</strong> {testResults.userIDDetails.sessionMode}</p>
                    <p><strong>Current Persona:</strong> {testResults.userIDDetails.currentPersona}</p>
                    {testResults.userIDDetails.error && (
                      <p className="text-sm text-red-600">{testResults.userIDDetails.error}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
                 </Card>

         {/* User Debug Info */}
         <UserDebugInfo />
 
         {/* Test Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Testing Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">1. Connection Test</h4>
              <p className="text-sm text-muted-foreground">
                Tests if the app can connect to Supabase and access the volunteers table.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">2. Registration Test</h4>
              <p className="text-sm text-muted-foreground">
                Creates a test volunteer account to verify the registration process works.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">3. Next Steps</h4>
              <p className="text-sm text-muted-foreground">
                If both tests pass, you can proceed to create a real volunteer account and test the full flow.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 