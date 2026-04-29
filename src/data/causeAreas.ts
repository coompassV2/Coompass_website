/**
 * Transversal cause areas used across the entire app.
 * Single source of truth for filters, analytics, preferences, missions, and projects.
 */
export const CAUSE_AREAS = [
  { id: "education", name: "Education" },
  { id: "health-wellbeing", name: "Health & Wellbeing" },
  { id: "poverty-basic-needs", name: "Poverty & Basic Needs" },
  { id: "environment", name: "Environment" },
  { id: "social-inclusion", name: "Social Inclusion" },
  { id: "community", name: "Community" },
  { id: "children-youth", name: "Children & Youth" },
  { id: "elderly-support", name: "Elderly Support" },
  { id: "disability-inclusion", name: "Disability Inclusion" },
  { id: "humanitarian-aid", name: "Humanitarian Aid" },
  { id: "animal-welfare", name: "Animal Welfare" },
  { id: "culture", name: "Culture" },
  { id: "employability", name: "Employability" },
  { id: "human-rights", name: "Human Rights" },
  { id: "civic-engagement", name: "Civic Engagement" },
  { id: "mobility-transport", name: "Mobility & Transport" },
] as const;

/** Cause area names for filters, missions, and dropdowns that use strings */
export const CAUSE_AREA_NAMES = CAUSE_AREAS.map((c) => c.name);

/** Mock hours per cause for analytics (company & nonprofit). Single source for consistent display. */
export const CAUSE_HOURS_SEED: Record<string, number> = {
  "Education": 185,
  "Health & Wellbeing": 242,
  "Poverty & Basic Needs": 168,
  "Environment": 310,
  "Social Inclusion": 125,
  "Community": 395,
  "Children & Youth": 278,
  "Elderly Support": 156,
  "Disability Inclusion": 98,
  "Humanitarian Aid": 220,
  "Animal Welfare": 134,
  "Culture": 89,
  "Employability": 267,
  "Human Rights": 112,
  "Civic Engagement": 198,
  "Mobility & Transport": 145,
};
