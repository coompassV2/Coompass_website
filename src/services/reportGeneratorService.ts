
import { ReportTemplate, ReportSection } from './reportTemplateService';
import { ReportData } from './reportDataService';

export interface GeneratedReport {
  id: string;
  templateId: string;
  title: string;
  generatedAt: string;
  organizationName: string;
  reportPeriod: string;
  sections: GeneratedSection[];
  metadata: {
    totalPages: number;
    wordCount: number;
    dataPoints: number;
  };
}

export interface GeneratedSection {
  id: string;
  title: string;
  type: string;
  content: any;
  order: number;
}

export class ReportGeneratorService {
  static async generateReport(
    template: ReportTemplate, 
    data: ReportData, 
    customizations?: any
  ): Promise<GeneratedReport> {
    const reportId = `report-${Date.now()}`;
    const generatedSections: GeneratedSection[] = [];

    for (const section of template.sections.sort((a, b) => a.order - b.order)) {
      const generatedSection = await this.generateSection(section, data);
      generatedSections.push(generatedSection);
    }

    return {
      id: reportId,
      templateId: template.id,
      title: template.name,
      generatedAt: new Date().toISOString(),
      organizationName: data.organizationInfo.name,
      reportPeriod: this.getReportPeriod(template),
      sections: generatedSections,
      metadata: {
        totalPages: Math.ceil(generatedSections.length * 1.5),
        wordCount: this.calculateWordCount(generatedSections),
        dataPoints: this.calculateDataPoints(generatedSections)
      }
    };
  }

  private static async generateSection(section: ReportSection, data: ReportData): Promise<GeneratedSection> {
    switch (section.type) {
      case 'overview':
        return this.generateOverviewSection(section, data);
      case 'metrics':
        return this.generateMetricsSection(section, data);
      case 'chart':
        return this.generateChartSection(section, data);
      case 'table':
        return this.generateTableSection(section, data);
      case 'narrative':
        return this.generateNarrativeSection(section, data);
      case 'financial':
        return this.generateFinancialSection(section, data);
      case 'sdg':
        return this.generateSDGSection(section, data);
      default:
        return {
          id: section.id,
          title: section.title,
          type: section.type,
          content: { error: 'Unknown section type' },
          order: section.order
        };
    }
  }

  private static generateOverviewSection(section: ReportSection, data: ReportData): GeneratedSection {
    const template = section.content.template;
    const content = template
      .replace('[year]', new Date().getFullYear().toString())
      .replace('[organizationName]', data.organizationInfo.name)
      .replace('[mission]', data.organizationInfo.mission)
      .replace('[projectsCompleted]', data.impactMetrics.projectsCompleted.toString())
      .replace('[peopleBenefitted]', data.impactMetrics.peopleBenefitted.toLocaleString())
      .replace('[volunteersEngaged]', data.impactMetrics.volunteersEngaged.toString())
      .replace('[fundingSecured]', data.impactMetrics.fundingSecured.toLocaleString());

    return {
      id: section.id,
      title: section.title,
      type: section.type,
      content: {
        text: content,
        highlights: [
          `${data.impactMetrics.peopleBenefitted.toLocaleString()} people benefitted`,
          `${data.impactMetrics.projectsCompleted} projects completed`,
          `$${data.impactMetrics.fundingSecured.toLocaleString()} funding secured`
        ]
      },
      order: section.order
    };
  }

  private static generateMetricsSection(section: ReportSection, data: ReportData): GeneratedSection {
    const metrics = section.content.metrics;
    const metricsData: any = {};

    metrics.forEach((metric: string) => {
      switch (metric) {
        case 'peopleBenefitted':
          metricsData[metric] = {
            value: data.impactMetrics.peopleBenefitted,
            label: 'People Benefitted',
            change: '+15%',
            icon: 'users'
          };
          break;
        case 'volunteersEngaged':
          metricsData[metric] = {
            value: data.impactMetrics.volunteersEngaged,
            label: 'Volunteers Engaged',
            change: '+8%',
            icon: 'heart'
          };
          break;
        case 'projectsCompleted':
          metricsData[metric] = {
            value: data.impactMetrics.projectsCompleted,
            label: 'Projects Completed',
            change: '+12%',
            icon: 'check-circle'
          };
          break;
        case 'fundingSecured':
          metricsData[metric] = {
            value: `$${data.impactMetrics.fundingSecured.toLocaleString()}`,
            label: 'Funding Secured',
            change: '+22%',
            icon: 'dollar-sign'
          };
          break;
        case 'totalHours':
          metricsData[metric] = {
            value: data.volunteerMetrics.totalHours.toLocaleString(),
            label: 'Total Volunteer Hours',
            change: '+18%',
            icon: 'clock'
          };
          break;
        case 'activeVolunteers':
          metricsData[metric] = {
            value: data.volunteerMetrics.activeVolunteers,
            label: 'Active Volunteers',
            change: '+5%',
            icon: 'users'
          };
          break;
        case 'averageHoursPerVolunteer':
          metricsData[metric] = {
            value: data.volunteerMetrics.averageHoursPerVolunteer.toFixed(1),
            label: 'Avg Hours per Volunteer',
            change: '+3%',
            icon: 'trending-up'
          };
          break;
        case 'retentionRate':
          metricsData[metric] = {
            value: `${data.volunteerMetrics.retentionRate}%`,
            label: 'Volunteer Retention Rate',
            change: '+7%',
            icon: 'repeat'
          };
          break;
      }
    });

    return {
      id: section.id,
      title: section.title,
      type: section.type,
      content: { metrics: metricsData },
      order: section.order
    };
  }

  private static generateChartSection(section: ReportSection, data: ReportData): GeneratedSection {
    const { chartType, dataSource, showTopVolunteers } = section.content;
    let chartData: any = {};

    if (dataSource === 'volunteerMetrics.monthlyHours') {
      chartData = {
        type: chartType,
        data: data.volunteerMetrics.monthlyHours,
        title: 'Monthly Volunteer Hours Trend',
        xAxis: 'month',
        yAxis: 'hours'
      };

      if (showTopVolunteers) {
        chartData.additionalData = {
          topVolunteers: data.volunteerMetrics.topVolunteers
        };
      }
    }

    return {
      id: section.id,
      title: section.title,
      type: section.type,
      content: chartData,
      order: section.order
    };
  }

  private static generateTableSection(section: ReportSection, data: ReportData): GeneratedSection {
    const { dataSource, showPartnerTypes, includeContributions, maxRows } = section.content;
    let tableData: any = {};

    if (dataSource === 'volunteerMetrics.topVolunteers') {
      tableData = {
        headers: ['Volunteer Name', 'Hours Contributed', 'Projects Involved'],
        rows: data.volunteerMetrics.topVolunteers.slice(0, maxRows || 10).map(volunteer => [
          volunteer.name,
          volunteer.hours.toString(),
          volunteer.projects.toString()
        ])
      };
    } else if (dataSource === 'projectData.projectsByCategory') {
      tableData = {
        headers: ['Category', 'Projects Count', 'Impact Achieved'],
        rows: data.projectData.projectsByCategory.map(category => [
          category.category,
          category.count.toString(),
          category.impact
        ])
      };
    } else if (showPartnerTypes && includeContributions) {
      tableData = {
        headers: ['Partner Name', 'Type', 'Duration', 'Contribution'],
        rows: data.partnerships.map(partner => [
          partner.name,
          partner.type.charAt(0).toUpperCase() + partner.type.slice(1),
          partner.duration,
          partner.contribution
        ])
      };
    }

    return {
      id: section.id,
      title: section.title,
      type: section.type,
      content: tableData,
      order: section.order
    };
  }

  private static generateNarrativeSection(section: ReportSection, data: ReportData): GeneratedSection {
    const content: any = {};

    if (section.content.maxStories) {
      content.stories = data.stories.slice(0, section.content.maxStories);
    }

    if (section.content.showSkillsList) {
      content.skills = data.volunteerMetrics.skillsContributed;
      content.skillsText = `Our volunteers contributed expertise in ${data.volunteerMetrics.skillsContributed.join(', ')}, enabling us to deliver high-quality programs and achieve significant impact.`;
    }

    if (section.content.includeTimeline) {
      content.timeline = data.projectData.projectTimeline;
    }

    if (section.content.showCategories) {
      content.categories = data.projectData.projectsByCategory;
      content.categoriesText = `Our projects span ${data.projectData.projectsByCategory.length} key categories, each addressing critical community needs and environmental challenges.`;
    }

    return {
      id: section.id,
      title: section.title,
      type: section.type,
      content,
      order: section.order
    };
  }

  private static generateFinancialSection(section: ReportSection, data: ReportData): GeneratedSection {
    const { showRevenue, showExpenses, showEfficiency, includeDonationTrends } = section.content;
    const content: any = {};

    if (showRevenue) {
      content.revenue = {
        total: data.financialData.totalRevenue,
        formatted: `$${data.financialData.totalRevenue.toLocaleString()}`
      };
    }

    if (showExpenses) {
      content.expenses = {
        program: data.financialData.programExpenses,
        admin: data.financialData.adminExpenses,
        fundraising: data.financialData.fundraisingExpenses,
        breakdown: [
          { category: 'Programs', amount: data.financialData.programExpenses, percentage: 80 },
          { category: 'Administration', amount: data.financialData.adminExpenses, percentage: 10 },
          { category: 'Fundraising', amount: data.financialData.fundraisingExpenses, percentage: 10 }
        ]
      };
    }

    if (showEfficiency) {
      content.efficiency = {
        ratio: data.financialData.programEfficiencyRatio,
        text: `${data.financialData.programEfficiencyRatio}% of every dollar goes directly to programs`
      };
    }

    if (includeDonationTrends) {
      content.donationTrends = data.financialData.donations;
    }

    return {
      id: section.id,
      title: section.title,
      type: section.type,
      content,
      order: section.order
    };
  }

  private static generateSDGSection(section: ReportSection, data: ReportData): GeneratedSection {
    const { showAlignment, includeProjects } = section.content;
    const content: any = {};

    if (showAlignment) {
      content.alignment = data.sdgAlignment;
      content.summary = `Our work aligns with ${data.sdgAlignment.length} UN Sustainable Development Goals, with the strongest alignment in SDG ${data.sdgAlignment[0].sdg}: ${data.sdgAlignment[0].title}.`;
    }

    if (includeProjects) {
      content.projectMapping = data.sdgAlignment.map(sdg => ({
        sdg: sdg.sdg,
        title: sdg.title,
        projects: sdg.projects,
        percentage: sdg.percentage
      }));
    }

    return {
      id: section.id,
      title: section.title,
      type: section.type,
      content,
      order: section.order
    };
  }

  private static getReportPeriod(template: ReportTemplate): string {
    const now = new Date();
    const year = now.getFullYear();
    
    switch (template.defaultFrequency) {
      case 'annual':
        return `Annual Report ${year}`;
      case 'quarterly':
        const quarter = Math.ceil((now.getMonth() + 1) / 3);
        return `Q${quarter} ${year}`;
      case 'monthly':
        const month = now.toLocaleString('default', { month: 'long' });
        return `${month} ${year}`;
      default:
        return `Report ${year}`;
    }
  }

  private static calculateWordCount(sections: GeneratedSection[]): number {
    return sections.reduce((count, section) => {
      if (section.content.text) {
        return count + section.content.text.split(' ').length;
      }
      return count + 100; // Estimated for non-text sections
    }, 0);
  }

  private static calculateDataPoints(sections: GeneratedSection[]): number {
    return sections.reduce((count, section) => {
      if (section.content.metrics) {
        return count + Object.keys(section.content.metrics).length;
      }
      if (section.content.data) {
        return count + (Array.isArray(section.content.data) ? section.content.data.length : 1);
      }
      return count + 1;
    }, 0);
  }
}
