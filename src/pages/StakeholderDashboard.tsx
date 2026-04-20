import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StakeholderHeader } from "@/components/stakeholder/StakeholderHeader";
import { StakeholderOverview } from "@/components/stakeholder/StakeholderOverview";
import { CompanyPerformanceGrid } from "@/components/stakeholder/CompanyPerformanceGrid";
import { FeaturedStoriesSection } from "@/components/stakeholder/FeaturedStoriesSection";
import { ChartsKPIsSection } from "@/components/stakeholder/ChartsKPIsSection";
import { ReportsDownloadsSection } from "@/components/stakeholder/ReportsDownloadsSection";
import { FeedbackContactSection } from "@/components/stakeholder/FeedbackContactSection";
import { SEOManager } from "@/components/shared/SEOManager";

type ViewMode = "group" | "company";
type DateRange = "30days" | "90days" | "1year" | "all";

export default function StakeholderDashboard() {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<ViewMode>("group");
  const [dateRange, setDateRange] = useState<DateRange>("90days");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" data-theme="light">
      <SEOManager 
        title={t("Executive Dashboard")}
        noIndex={true}
      />
      <StakeholderHeader 
        viewMode={viewMode}
        setViewMode={setViewMode}
        dateRange={dateRange}
        setDateRange={setDateRange}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />
      
      <main className="container mx-auto px-4 md:px-6 py-5 space-y-5">
        <StakeholderOverview 
          viewMode={viewMode}
          dateRange={dateRange}
          selectedCompany={selectedCompany}
        />
        
        <CompanyPerformanceGrid 
          viewMode={viewMode}
          onCompanySelect={setSelectedCompany}
        />
        
        <FeaturedStoriesSection />
        
        <ChartsKPIsSection 
          viewMode={viewMode}
          dateRange={dateRange}
          selectedCompany={selectedCompany}
        />
        
        <ReportsDownloadsSection 
          viewMode={viewMode}
          selectedCompany={selectedCompany}
        />
        
        <FeedbackContactSection />
      </main>
    </div>
  );
}
