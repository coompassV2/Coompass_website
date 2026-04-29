import React from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { brisaCompanies } from "@/data/brisa-companies";
import { HeaderActions } from "@/components/shared/HeaderActions";
import { useTheme } from "@/hooks/useTheme";

interface StakeholderHeaderProps {
  viewMode: "group" | "company";
  setViewMode: (mode: "group" | "company") => void;
  dateRange: "30days" | "90days" | "1year" | "all";
  setDateRange: (range: "30days" | "90days" | "1year" | "all") => void;
  selectedCompany?: string | null;
  setSelectedCompany?: (companyId: string | null) => void;
}

export function StakeholderHeader({ 
  viewMode, 
  setViewMode, 
  dateRange, 
  setDateRange,
  selectedCompany,
  setSelectedCompany 
}: StakeholderHeaderProps) {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="/lovable-uploads/e65dbbd2-a111-4985-817d-18f8a1117e8b.png"
              alt="Grupo BRISA + Coompass"
              className="h-16"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t("ESG Dashboard")}</h1>
              <p className="text-sm text-gray-600">{t("Impact & Performance Overview")}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "group" | "company")}>
              <TabsList className="grid w-fit grid-cols-2">
                <TabsTrigger value="group">{t("Group View")}</TabsTrigger>
                <TabsTrigger value="company">{t("Company View")}</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Company Selector - Only show when in Company View mode */}
            {viewMode === "company" && setSelectedCompany && (
              <Select 
                value={selectedCompany || ""} 
                onValueChange={(value) => setSelectedCompany(value || null)}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder={t("Select a company")} />
                </SelectTrigger>
                <SelectContent>
                  {brisaCompanies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      <div className="flex items-center space-x-2">
                        {company.logoImage ? (
                          <img 
                            src={company.logoImage} 
                            alt={company.name}
                            className="w-5 h-5 object-contain"
                          />
                        ) : (
                          <span className="text-sm">{company.logo}</span>
                        )}
                        <span>{company.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* Date Range Selector */}
            <Select value={dateRange} onValueChange={(value) => setDateRange(value as "30days" | "90days" | "1year" | "all")}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">{t("Last 30 days")}</SelectItem>
                <SelectItem value="90days">{t("Last 90 days")}</SelectItem>
                <SelectItem value="1year">{t("Last year")}</SelectItem>
                <SelectItem value="all">{t("All time")}</SelectItem>
              </SelectContent>
            </Select>

            <HeaderActions theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>
    </header>
  );
}
