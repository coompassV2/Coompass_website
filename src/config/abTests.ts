import { ABTestConfig } from '@/utils/abTesting';

export const homepageHeroTest: ABTestConfig = {
  testName: 'homepageHero',
  variants: ['A', 'B', 'C', 'D', 'E', 'F'],
};

export const valuePropositionTest: ABTestConfig = {
  testName: 'valueProposition',
  variants: ['A', 'B', 'C', 'D', 'E', 'F'],
};

export const heroVideoTest: ABTestConfig = {
  testName: 'heroVideo',
  variants: ['A', 'B', 'C', 'E'],
};

// This map allows easy lookup of a test config by its name.
export const abTestConfigs: Record<string, ABTestConfig> = {
  [homepageHeroTest.testName]: homepageHeroTest,
  [valuePropositionTest.testName]: valuePropositionTest,
  [heroVideoTest.testName]: heroVideoTest,
  // Future A/B tests can be added here
}; 