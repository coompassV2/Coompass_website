
export interface ReportData {
  organizationInfo: {
    name: string;
    mission: string;
    founded: string;
    location: string;
    website: string;
    taxId: string;
  };
  impactMetrics: {
    peopleBenefitted: number;
    volunteersEngaged: number;
    projectsCompleted: number;
    fundingSecured: number;
    donorsCount: number;
    partnerOrganizations: number;
  };
  financialData: {
    totalRevenue: number;
    programExpenses: number;
    adminExpenses: number;
    fundraisingExpenses: number;
    programEfficiencyRatio: number;
    donations: Array<{
      month: string;
      amount: number;
      donorCount: number;
    }>;
  };
  volunteerMetrics: {
    totalHours: number;
    activeVolunteers: number;
    averageHoursPerVolunteer: number;
    retentionRate: number;
    skillsContributed: string[];
    monthlyHours: Array<{
      month: string;
      hours: number;
      volunteers: number;
    }>;
    topVolunteers: Array<{
      name: string;
      hours: number;
      projects: number;
    }>;
  };
  projectData: {
    activeProjects: number;
    completedProjects: number;
    upcomingProjects: number;
    projectsByCategory: Array<{
      category: string;
      count: number;
      impact: string;
    }>;
    projectTimeline: Array<{
      name: string;
      startDate: string;
      endDate: string;
      status: 'completed' | 'active' | 'planned';
      beneficiaries: number;
    }>;
  };
  sdgAlignment: Array<{
    sdg: number;
    title: string;
    percentage: number;
    projects: string[];
  }>;
  geographicImpact: Array<{
    region: string;
    beneficiaries: number;
    projects: number;
  }>;
  partnerships: Array<{
    name: string;
    type: 'corporate' | 'nonprofit' | 'government';
    duration: string;
    contribution: string;
  }>;
  stories: Array<{
    title: string;
    description: string;
    beneficiary: string;
    impact: string;
    date: string;
  }>;
}

export class ReportDataService {
  static getMockReportData(): ReportData {
    return {
      organizationInfo: {
        name: "Green Future Foundation",
        mission: "Empowering communities through environmental education and sustainable development initiatives",
        founded: "2018",
        location: "San Francisco, CA",
        website: "www.greenfuture.org",
        taxId: "12-3456789"
      },
      impactMetrics: {
        peopleBenefitted: 15420,
        volunteersEngaged: 847,
        projectsCompleted: 23,
        fundingSecured: 2850000,
        donorsCount: 1250,
        partnerOrganizations: 18
      },
      financialData: {
        totalRevenue: 2850000,
        programExpenses: 2280000,
        adminExpenses: 285000,
        fundraisingExpenses: 285000,
        programEfficiencyRatio: 80,
        donations: [
          { month: "Jan", amount: 180000, donorCount: 95 },
          { month: "Feb", amount: 220000, donorCount: 112 },
          { month: "Mar", amount: 195000, donorCount: 88 },
          { month: "Apr", amount: 275000, donorCount: 135 },
          { month: "May", amount: 310000, donorCount: 156 },
          { month: "Jun", amount: 285000, donorCount: 142 }
        ]
      },
      volunteerMetrics: {
        totalHours: 12580,
        activeVolunteers: 847,
        averageHoursPerVolunteer: 14.9,
        retentionRate: 78,
        skillsContributed: ["Environmental Science", "Education", "Project Management", "Marketing", "Data Analysis"],
        monthlyHours: [
          { month: "Jan", hours: 1850, volunteers: 145 },
          { month: "Feb", hours: 2100, volunteers: 162 },
          { month: "Mar", hours: 1950, volunteers: 138 },
          { month: "Apr", hours: 2300, volunteers: 178 },
          { month: "May", hours: 2280, volunteers: 184 },
          { month: "Jun", hours: 2100, volunteers: 175 }
        ],
        topVolunteers: [
          { name: "Sarah Chen", hours: 180, projects: 5 },
          { name: "Marcus Rodriguez", hours: 165, projects: 4 },
          { name: "Emily Johnson", hours: 142, projects: 6 }
        ]
      },
      projectData: {
        activeProjects: 8,
        completedProjects: 23,
        upcomingProjects: 5,
        projectsByCategory: [
          { category: "Environmental Education", count: 12, impact: "3,500 students educated" },
          { category: "Community Gardens", count: 8, impact: "15 gardens established" },
          { category: "Renewable Energy", count: 6, impact: "2.5MW clean energy generated" },
          { category: "Waste Reduction", count: 10, impact: "50 tons waste diverted" }
        ],
        projectTimeline: [
          { name: "Urban Garden Initiative", startDate: "2024-01-15", endDate: "2024-12-31", status: 'active', beneficiaries: 2500 },
          { name: "Solar Panel Training Program", startDate: "2024-03-01", endDate: "2024-08-30", status: 'completed', beneficiaries: 450 },
          { name: "Youth Climate Leadership", startDate: "2024-06-01", endDate: "2024-11-30", status: 'active', beneficiaries: 180 }
        ]
      },
      sdgAlignment: [
        { sdg: 3, title: "Good Health and Well-being", percentage: 85, projects: ["Community Health Gardens", "Clean Air Initiative"] },
        { sdg: 4, title: "Quality Education", percentage: 92, projects: ["Environmental Education Program", "Youth Leadership"] },
        { sdg: 7, title: "Affordable and Clean Energy", percentage: 78, projects: ["Solar Training Program", "Renewable Energy Access"] },
        { sdg: 11, title: "Sustainable Cities and Communities", percentage: 88, projects: ["Urban Gardens", "Green Infrastructure"] },
        { sdg: 13, title: "Climate Action", percentage: 95, projects: ["Carbon Reduction Initiative", "Climate Education"] }
      ],
      geographicImpact: [
        { region: "San Francisco Bay Area", beneficiaries: 8500, projects: 15 },
        { region: "Central Valley", beneficiaries: 4200, projects: 8 },
        { region: "Los Angeles County", beneficiaries: 2720, projects: 5 }
      ],
      partnerships: [
        { name: "TechForGood Corp", type: 'corporate', duration: "3 years", contribution: "$500K funding + volunteer hours" },
        { name: "City of San Francisco", type: 'government', duration: "Ongoing", contribution: "Permits + land access" },
        { name: "Earth Action Network", type: 'nonprofit', duration: "2 years", contribution: "Joint programming + resources" }
      ],
      stories: [
        {
          title: "Maria's Garden Transformation",
          description: "Local resident Maria transformed her neighborhood with a community garden that now feeds 50 families.",
          beneficiary: "Maria Santos, Community Leader",
          impact: "50 families with fresh produce access",
          date: "March 2025"
        },
        {
          title: "Solar Skills Success",
          description: "Former participant Juan now runs his own solar installation business after completing our training program.",
          beneficiary: "Juan Morales, Solar Entrepreneur",
          impact: "15 jobs created, 200 homes with solar",
          date: "April 2025"
        }
      ]
    };
  }
}
