/**
 * Available persona types in the Coompass platform.
 */
export type PersonaType = "company" | "organization" | "volunteer" | "stakeholder";

/**
 * Labels and descriptions for each persona type.
 * Used throughout the application for consistent persona labeling.
 */
export const personaLabels: Record<PersonaType, { title: string; description: string }> = {
  company: {
    title: "Company",
    description: "Corporate partner looking to make an impact through CSR initiatives."
  },
  organization: {
    title: "Nonprofit",
    description: "Organization working on social or environmental causes seeking volunteers and partners."
  },
  volunteer: {
    title: "Volunteer",
    description: "Individual looking to volunteer their time and skills for causes they care about."
  },
  stakeholder: {
    title: "Stakeholder",
    description: "External partner viewing ESG performance and impact progress across the organization."
  }
};
