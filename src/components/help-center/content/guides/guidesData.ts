
import { PersonaGuides } from "./types";

// User guides organized by persona and category
export const guides: PersonaGuides = {
  company: {
    "Account & Setup": [
      {
        title: "Setting up your company profile",
        description: "Learn how to create and optimize your company profile to showcase your impact goals.",
        path: "#company-profile"
      },
      {
        title: "Employee onboarding",
        description: "Step-by-step guide to invite and onboard employees to your Coompass account.",
        path: "#employee-onboarding"
      },
      {
        title: "Dashboard customization",
        description: "Personalize your company dashboard to focus on the metrics that matter most.",
        path: "#dashboard-customization"
      }
    ],
    "Partnerships & Missions": [
      {
        title: "Finding and establishing partnerships",
        description: "Discover how to find and connect with nonprofit partners aligned with your impact goals.",
        path: "#partnerships"
      },
      {
        title: "Creating volunteer opportunities",
        description: "Learn how to create engaging volunteer missions for your employees.",
        path: "#create-missions"
      },
      {
        title: "Managing team volunteering",
        description: "Strategies for organizing and managing team-based volunteering activities.",
        path: "#team-volunteering"
      }
    ],
    "Analytics & Reporting": [
      {
        title: "Understanding your impact metrics",
        description: "Guide to interpreting and utilizing the analytics in your company dashboard.",
        path: "#impact-metrics"
      },
      {
        title: "Generating ESG reports",
        description: "How to create comprehensive ESG reports using your Coompass data.",
        path: "#esg-reports"
      },
      {
        title: "Tracking employee engagement",
        description: "Methods to monitor and improve employee participation in volunteering initiatives.",
        path: "#employee-engagement"
      }
    ]
  },
  organization: {
    "Account & Setup": [
      {
        title: "Setting up your nonprofit profile",
        description: "Create a compelling profile that attracts volunteers and corporate partners.",
        path: "#nonprofit-profile"
      },
      {
        title: "Verifying your organization",
        description: "Steps to complete the verification process and build trust on the platform.",
        path: "#verification"
      },
      {
        title: "Team member management",
        description: "How to add team members and manage their permissions in your account.",
        path: "#team-management"
      }
    ],
    "Volunteer Management": [
      {
        title: "Creating volunteer opportunities",
        description: "Design effective missions that attract the right volunteers for your needs.",
        path: "#create-opportunities"
      },
      {
        title: "Volunteer screening and selection",
        description: "Best practices for reviewing applications and selecting volunteers.",
        path: "#volunteer-selection"
      },
      {
        title: "Tracking volunteer hours and impact",
        description: "Systems for monitoring volunteer contributions and measuring outcomes.",
        path: "#tracking-hours"
      }
    ],
    "Partnerships & Resources": [
      {
        title: "Attracting corporate partners",
        description: "Strategies for connecting with companies that align with your mission.",
        path: "#corporate-partners"
      },
      {
        title: "Resource requests and management",
        description: "How to effectively request and manage resources from partner companies.",
        path: "#resource-management"
      },
      {
        title: "Finding pro bono services",
        description: "Guide to connecting with external partners for specialized assistance.",
        path: "#pro-bono"
      }
    ]
  },
  volunteer: {
    "Account & Profile": [
      {
        title: "Setting your volunteering preferences",
        description: "How to set preferences that help you find the right opportunities.",
        path: "#preferences"
      },
      {
        title: "Building your skills inventory",
        description: "Guide to documenting and developing your volunteering skills.",
        path: "#skills-inventory"
      }
    ],
    "Finding Opportunities": [
      {
        title: "Searching for missions",
        description: "How to use filters and search tools to find the perfect volunteering opportunity.",
        path: "#search-missions"
      },
      {
        title: "Applying for volunteering positions",
        description: "Best practices for applying and increasing your chances of selection.",
        path: "#applications"
      },
      {
        title: "Virtual volunteering options",
        description: "Guide to finding and participating in remote volunteering opportunities.",
        path: "#virtual-volunteering"
      }
    ],
    "Impact & Growth": [
      {
        title: "Tracking your volunteering impact",
        description: "How to monitor and showcase your contributions and achievements.",
        path: "#track-impact"
      },
      {
        title: "Getting certificates and recognition",
        description: "Steps to request and share verification of your volunteering work.",
        path: "#certificates"
      },
      {
        title: "Building a volunteering portfolio",
        description: "Creating a compelling record of your volunteering journey and impact.",
        path: "#volunteering-portfolio"
      }
    ]
  }
};
