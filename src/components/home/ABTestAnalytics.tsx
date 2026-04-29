import { useState, useEffect } from 'react';
import { getABTestAnalytics } from '@/utils/abTesting';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ABTestAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState<string>('valueProposition');

  useEffect(() => {
    // Only show analytics in development environments
    const isDevelopment = import.meta.env.DEV || 
                         window.location.hostname === 'localhost' ||
                         window.location.hostname === '127.0.0.1' ||
                         window.location.hostname.includes('.lovableproject.com');
    
    // Check if manually enabled AND in development
    const manuallyEnabled = localStorage.getItem('show_ab_analytics') === 'true';
    
    setIsVisible(isDevelopment && (manuallyEnabled || import.meta.env.DEV));
  }, []);

  const loadAnalytics = () => {
    setAnalytics(getABTestAnalytics(selectedTest));
  };

  const closeAnalytics = () => {
    setAnalytics(null);
  };

  const clearData = () => {
    localStorage.removeItem('ab_test_events');
    localStorage.removeItem('ab_test_events_generic');
    localStorage.removeItem('ab_session_id');
    localStorage.removeItem('hero_variant');
    localStorage.removeItem('ab_variant_homepageHero');
    localStorage.removeItem('ab_variant_valueProposition');
    setAnalytics(null);
    window.location.reload();
  };

  const toggleAnalytics = () => {
    const current = localStorage.getItem('show_ab_analytics') === 'true';
    localStorage.setItem('show_ab_analytics', (!current).toString());
    setIsVisible(!current && (import.meta.env.DEV || 
                              window.location.hostname === 'localhost' ||
                              window.location.hostname.includes('.lovableproject.com')));
  };

  // Don't render anything in production
  const isProduction = window.location.hostname.includes('lovable.dev') || 
                      window.location.hostname.includes('lovable.app') ||
                      (!window.location.hostname.includes('localhost') && 
                       !window.location.hostname.includes('127.0.0.1') && 
                       !window.location.hostname.includes('.lovableproject.com') &&
                       !import.meta.env.DEV);

  if (isProduction) {
    return null;
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={toggleAnalytics} variant="outline" size="sm">
          Show A/B Analytics
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 max-h-96 overflow-y-auto">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm">A/B Test Analytics</CardTitle>
            <div className="flex gap-1">
              <Button 
                onClick={analytics ? closeAnalytics : loadAnalytics} 
                variant="outline" 
                size="sm"
              >
                {analytics ? 'Close' : 'Open'}
              </Button>
              <Button onClick={toggleAnalytics} variant="outline" size="sm">
                Hide
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!analytics ? (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium mb-1 block">Select Test:</label>
                <Select value={selectedTest} onValueChange={setSelectedTest}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="valueProposition">Value Proposition Cards</SelectItem>
                    <SelectItem value="heroVideo">Hero Background Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Click Open to load data</p>
              <Button onClick={clearData} variant="destructive" size="sm">
                Clear All Data
              </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {analytics && analytics[selectedTest] ? (
                Object.entries(analytics[selectedTest]).map(([variant, data]: [string, any]) => (
                  <div key={variant} className="border rounded p-2">
                    <h4 className="font-semibold text-xs">Variant {variant}</h4>
                    <div className="text-xs text-muted-foreground">
                      <div>Views: {data.views || 0}</div>
                      <div>Clicks: {data.clicks || 0}</div>
                      <div>Conversions: {data.conversions || 0}</div>
                      <div>
                        CTR: {data.views > 0 ? 
                          (((data.clicks || 0) / data.views) * 100).toFixed(1) : 0}%
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No data available for {selectedTest} test.</p>
              )}
              <Button onClick={clearData} variant="destructive" size="sm" className="w-full">
                Clear All Data
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
