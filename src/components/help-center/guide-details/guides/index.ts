
// Export all guide components
export * from './CompanyProfileGuide'; 
export * from './EmployeeOnboardingGuide';
export * from './DashboardCustomizationGuide';
export * from './NonprofitProfileGuide';
export * from './VerificationGuide';

// Guide paths mapping
export const guideComponentMap: Record<string, string> = {
  'company-profile': 'CompanyProfileGuide',
  'employee-onboarding': 'EmployeeOnboardingGuide',
  'dashboard-customization': 'DashboardCustomizationGuide',
  'nonprofit-profile': 'NonprofitProfileGuide',
  'verification': 'VerificationGuide',
  // Map additional guide ids to component names
};
