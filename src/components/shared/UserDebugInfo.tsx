import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from "@/lib/supabase";
import { getStoredToken, apiGet } from "@/services/authApi";
import { getSessionMode, getCurrentPersona } from "@/utils/demoUtils";

export function UserDebugInfo() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runDebug = async () => {
    setLoading(true);
    try {
      console.log('=== User Debug Info ===');
      
      // Get current user
      const currentUser = await getCurrentUser();
      console.log('Current user:', currentUser);
      
      // Get session mode
      const sessionMode = await getSessionMode();
      console.log('Session mode:', sessionMode);
      
      // Get current persona
      const currentPersona = await getCurrentPersona();
      console.log('Current persona:', currentPersona);
      
      // Get volunteer data from backend if user exists
      let volunteerData: { data?: unknown; error?: string } | null = null;
      if (currentUser) {
        const token = getStoredToken();
        const result = await apiGet<unknown>("/api/volunteers/me", token);
        console.log("Volunteer data:", result);
        volunteerData = { data: result.data, error: result.error };
      }
      
      setDebugInfo({
        currentUser,
        sessionMode,
        currentPersona,
        volunteerData,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Debug error:', error);
      setDebugInfo({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          User Debug Info
          <Badge variant="outline">Debug</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={runDebug} disabled={loading} className="w-full">
          {loading ? "Running Debug..." : "Run Debug"}
        </Button>
        
        {debugInfo && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Current User</h4>
                <div className="text-sm bg-muted p-2 rounded">
                  {debugInfo.currentUser ? (
                    <div>
                      <p><strong>ID:</strong> {debugInfo.currentUser.id}</p>
                      <p><strong>Email:</strong> {debugInfo.currentUser.email}</p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No user found</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Session Mode</h4>
                <div className="text-sm bg-muted p-2 rounded">
                  <p><strong>Mode:</strong> {debugInfo.sessionMode?.isDemo ? 'Demo' : 'Real'}</p>
                  <p><strong>User ID:</strong> {debugInfo.sessionMode?.userId || 'None'}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Current Persona</h4>
                <div className="text-sm bg-muted p-2 rounded">
                  <p><strong>Persona:</strong> {debugInfo.currentPersona || 'None'}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Volunteer Data</h4>
                <div className="text-sm bg-muted p-2 rounded">
                  {debugInfo.volunteerData?.data ? (
                    <div>
                      <p><strong>Name:</strong> {debugInfo.volunteerData.data.full_name}</p>
                      <p><strong>Email:</strong> {debugInfo.volunteerData.data.email}</p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      {debugInfo.volunteerData?.error || 'No volunteer data'}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Last updated: {debugInfo.timestamp}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 