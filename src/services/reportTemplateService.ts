
import { ReportData } from './reportDataService';

export interface ReportTemplate {
  id: string;
  name: string;
  type: 'detailed' | 'summarized' | 'statistical' | 'financial';
  description: string;
  sections: ReportSection[];
  isCustomizable: boolean;
  defaultFrequency?: 'monthly' | 'quarterly' | 'annual';
}

export interface ReportSection {
  id: string;
  title: string;
  type: 'overview' | 'metrics' | 'chart' | 'table' | 'narrative' | 'financial' | 'sdg';
  content: any;
  isRequired: boolean;
  order: number;
}

export class ReportTemplateService {
  static getAnnualImpactTemplate(): ReportTemplate {
    return {
      id: 'annual-impact',
      name: 'Annual Impact Report',
      type: 'detailed',
      description: 'Comprehensive yearly overview of organizational impact, achievements, and outcomes',
      isCustomizable: true,
      defaultFrequency: 'annual',
      sections: [
        {
          id: 'exec-summary',
          title: 'Executive Summary',
          type: 'overview',
          content: {
            template: 'In [year], [organizationName] continued its mission to [mission]. Through [projectsCompleted] projects, we reached [peopleBenefitted] beneficiaries and engaged [volunteersEngaged] volunteers, securing $[fundingSecured] in funding.'
          },
          isRequired: true,
          order: 1
        },
        {
          id: 'impact-metrics',
          title: 'Key Impact Metrics',
          type: 'metrics',
          content: {
            metrics: ['peopleBenefitted', 'volunteersEngaged', 'projectsCompleted', 'fundingSecured']
          },
          isRequired: true,
          order: 2
        },
        {
          id: 'financial-overview',
          title: 'Financial Overview',
          type: 'financial',
          content: {
            showRevenue: true,
            showExpenses: true,
            showEfficiency: true,
            includeDonationTrends: true
          },
          isRequired: true,
          order: 3
        },
        {
          id: 'sdg-alignment',
          title: 'UN SDG Alignment',
          type: 'sdg',
          content: {
            showAlignment: true,
            includeProjects: true
          },
          isRequired: false,
          order: 4
        },
        {
          id: 'project-highlights',
          title: 'Project Highlights',
          type: 'narrative',
          content: {
            includeTimeline: true,
            showCategories: true,
            maxProjects: 10
          },
          isRequired: true,
          order: 5
        },
        {
          id: 'volunteer-impact',
          title: 'Volunteer Contributions',
          type: 'chart',
          content: {
            chartType: 'bar',
            dataSource: 'volunteerMetrics.monthlyHours',
            showTopVolunteers: true
          },
          isRequired: true,
          order: 6
        },
        {
          id: 'success-stories',
          title: 'Impact Stories',
          type: 'narrative',
          content: {
            maxStories: 3,
            includeImages: true
          },
          isRequired: false,
          order: 7
        },
        {
          id: 'partnerships',
          title: 'Key Partnerships',
          type: 'table',
          content: {
            showPartnerTypes: true,
            includeContributions: true
          },
          isRequired: false,
          order: 8
        }
      ]
    };
  }

  static getVolunteerHoursTemplate(): ReportTemplate {
    return {
      id: 'volunteer-hours',
      name: 'Volunteer Hours Summary',
      type: 'statistical',
      description: 'Detailed analysis of volunteer engagement, hours contributed, and impact metrics',
      isCustomizable: true,
      defaultFrequency: 'monthly',
      sections: [
        {
          id: 'hours-overview',
          title: 'Hours Summary',
          type: 'metrics',
          content: {
            metrics: ['totalHours', 'activeVolunteers', 'averageHoursPerVolunteer', 'retentionRate']
          },
          isRequired: true,
          order: 1
        },
        {
          id: 'monthly-trends',
          title: 'Monthly Volunteer Trends',
          type: 'chart',
          content: {
            chartType: 'line',
            dataSource: 'volunteerMetrics.monthlyHours'
          },
          isRequired: true,
          order: 2
        },
        {
          id: 'top-volunteers',
          title: 'Top Contributors',
          type: 'table',
          content: {
            dataSource: 'volunteerMetrics.topVolunteers',
            maxRows: 10
          },
          isRequired: true,
          order: 3
        },
        {
          id: 'skills-contributed',
          title: 'Skills & Expertise',
          type: 'narrative',
          content: {
            showSkillsList: true,
            includeImpact: true
          },
          isRequired: false,
          order: 4
        },
        {
          id: 'volunteer-demographics',
          title: 'Volunteer Demographics',
          type: 'chart',
          content: {
            chartType: 'pie',
            showAgeGroups: true,
            showSkillDistribution: true
          },
          isRequired: false,
          order: 5
        }
      ]
    };
  }

  static getProjectCompletionTemplate(): ReportTemplate {
    return {
      id: 'project-completion',
      name: 'Project Completion Report',
      type: 'detailed',
      description: 'Comprehensive overview of completed projects, outcomes, and lessons learned',
      isCustomizable: true,
      defaultFrequency: 'quarterly',
      sections: [
        {
          id: 'project-summary',
          title: 'Project Overview',
          type: 'overview',
          content: {
            template: 'This quarter, we completed [completedProjects] projects, reaching [beneficiaries] beneficiaries across [regions] regions.'
          },
          isRequired: true,
          order: 1
        },
        {
          id: 'completion-metrics',
          title: 'Completion Metrics',
          type: 'metrics',
          content: {
            metrics: ['completedProjects', 'activeProjects', 'upcomingProjects']
          },
          isRequired: true,
          order: 2
        },
        {
          id: 'project-timeline',
          title: 'Project Timeline',
          type: 'chart',
          content: {
            chartType: 'gantt',
            dataSource: 'projectData.projectTimeline'
          },
          isRequired: true,
          order: 3
        },
        {
          id: 'category-breakdown',
          title: 'Projects by Category',
          type: 'table',
          content: {
            dataSource: 'projectData.projectsByCategory',
            showImpact: true
          },
          isRequired: true,
          order: 4
        },
        {
          id: 'geographic-impact',
          title: 'Geographic Distribution',
          type: 'chart',
          content: {
            chartType: 'map',
            dataSource: 'geographicImpact'
          },
          isRequired: false,
          order: 5
        },
        {
          id: 'lessons-learned',
          title: 'Lessons Learned',
          type: 'narrative',
          content: {
            includeChallenges: true,
            includeSuccesses: true,
            showRecommendations: true
          },
          isRequired: false,
          order: 6
        }
      ]
    };
  }

  static getAllTemplates(): ReportTemplate[] {
    return [
      this.getAnnualImpactTemplate(),
      this.getVolunteerHoursTemplate(),
      this.getProjectCompletionTemplate()
    ];
  }

  static getTemplateById(id: string): ReportTemplate | undefined {
    return this.getAllTemplates().find(template => template.id === id);
  }
}
