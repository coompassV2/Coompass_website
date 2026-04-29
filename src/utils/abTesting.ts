// Generic A/B Testing utilities

import { abTestConfigs } from '@/config/abTests';

export type TestVariant = string;

export interface ABTestConfig {
  testName: string;
  variants: TestVariant[];
}

export interface ABTestEvent {
  testName: string;
  variant: TestVariant;
  event: 'view' | 'click' | 'conversion';
  timestamp: number;
  sessionId: string;
}

// Get or create session ID
export function getSessionId(): string {
  let sessionId = localStorage.getItem('ab_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('ab_session_id', sessionId);
  }
  return sessionId;
}

// Determine which variant to show for a given test
export function getABTestVariant(config: ABTestConfig): TestVariant {
  const { testName, variants } = config;
  const storageKey = `ab_variant_${testName}`;
  const sessionId = getSessionId();
  
  // Check if variant is already stored for this session
  const storedVariant = localStorage.getItem(storageKey);
  if (storedVariant && variants.includes(storedVariant)) {
    return storedVariant;
  }
  
  // Assign variant based on session hash for consistent experience
  const hash = sessionId.split('_')[2] || 'default';
  const variantIndex = parseInt(hash, 36) % variants.length;
  const selectedVariant = variants[variantIndex];
  
  localStorage.setItem(storageKey, selectedVariant);
  return selectedVariant;
}

// Track A/B test events
export function trackABTestEvent(testName: string, variant: TestVariant, event: 'view' | 'click' | 'conversion'): void {
  const sessionId = getSessionId();
  const abTestEvent: ABTestEvent = {
    testName,
    variant,
    event,
    timestamp: Date.now(),
    sessionId
  };
  
  // Store in localStorage for now
  const existingEvents = JSON.parse(localStorage.getItem('ab_test_events_generic') || '[]');
  existingEvents.push(abTestEvent);
  localStorage.setItem('ab_test_events_generic', JSON.stringify(existingEvents));
  
  console.log('A/B Test Event:', abTestEvent);
}

// Get analytics data for a specific test or all tests
export function getABTestAnalytics(testName?: string) {
  let events = JSON.parse(localStorage.getItem('ab_test_events_generic') || '[]') as ABTestEvent[];
  
  const analytics: Record<string, Record<string, Record<string, number>>> = {};

  const testsToProcess = testName 
    ? (abTestConfigs[testName] ? [abTestConfigs[testName]] : []) 
    : Object.values(abTestConfigs);

  // Initialize analytics object with all variants for the requested test(s)
  testsToProcess.forEach(config => {
    analytics[config.testName] = {};
    config.variants.forEach(variant => {
      analytics[config.testName][variant] = { views: 0, clicks: 0, conversions: 0 };
    });
  });

  // Filter events if a specific test is requested
  if (testName) {
    events = events.filter(event => event.testName === testName);
  }

  // Populate analytics with data from events
  events.forEach(event => {
    // We only process events for tests we know about and their known variants.
    if (analytics[event.testName] && analytics[event.testName][event.variant]) {
        if (event.event === 'view') analytics[event.testName][event.variant].views++;
        if (event.event === 'click') analytics[event.testName][event.variant].clicks++;
        if (event.event === 'conversion') analytics[event.testName][event.variant].conversions++;
    }
  });
  
  return analytics;
}
