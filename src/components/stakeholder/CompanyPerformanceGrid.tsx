
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Building2, Target, BarChart3 } from "lucide-react";
import { brisaCompanies } from "@/data/brisa-companies";

interface CompanyPerformanceGridProps {
  viewMode: "group" | "company";
  onCompanySelect: (companyId: string) => void;
}

export function CompanyPerformanceGrid({ viewMode, onCompanySelect }: CompanyPerformanceGridProps) {
  // Placeholder performance data until this section is wired to API.
  const companyMetrics = {
    "via-verde": { engagement: 0, missions: 0, esgScore: 0 },
    "brisa": { engagement: 0, missions: 0, esgScore: 0 },
    "controlauto": { engagement: 0, missions: 0, esgScore: 0 },
    "colibri": { engagement: 0, missions: 0, esgScore: 0 },
    "a-to-be": { engagement: 0, missions: 0, esgScore: 0 }
  };

  const { t } = useTranslation();

  const allMetrics = Object.values(companyMetrics);
  const overall = {
    engagement: Math.round(allMetrics.reduce((s, m) => s + m.engagement, 0) / allMetrics.length),
    missions: allMetrics.reduce((s, m) => s + m.missions, 0),
    esgScore: (allMetrics.reduce((s, m) => s + m.esgScore, 0) / allMetrics.length).toFixed(1),
    companyCount: brisaCompanies.length
  };

  if (viewMode === "company") {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-1">{t("Company Performance")}</h2>
        <p className="text-sm text-gray-600">{t("Individual ESG contribution across all group companies")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brisaCompanies.map((company) => {
          const metrics = companyMetrics[company.id as keyof typeof companyMetrics];
          return (
            <Card key={company.id} className="bg-white shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-gray-100">
                      {company.logoImage ? (
                        <img src={company.logoImage} alt={company.name} className="w-8 h-8 object-contain" />
                      ) : (
                        <span className="font-bold text-sm">{company.logo}</span>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-base">{company.name}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-0.5">ESG Score: {metrics.esgScore}/5</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600 text-xs">{t("Engagement Rate")}</p>
                    <p className="font-semibold">{metrics.engagement}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs">{t("Active Missions")}</p>
                    <p className="font-semibold">{metrics.missions}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-600">
                  <p className="mb-0.5">{t("ESG Focus Areas")}:</p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">{t("Environment")}</Badge>
                    <Badge variant="secondary" className="text-xs">{t("Social")}</Badge>
                    <Badge variant="secondary" className="text-xs">{t("Governance")}</Badge>
                  </div>
                </div>
                <Button size="sm" className="w-full text-xs" onClick={() => onCompanySelect(company.id)}>
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  {t("View Details")}
                </Button>
              </CardContent>
            </Card>
          );
        })}

        <Card className="overflow-hidden border-0 bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-50 shadow-sm">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/80 border border-zinc-200/80">
                  <BarChart3 className="w-5 h-5 text-zinc-600" />
                </div>
                <div>
                  <CardTitle className="text-base text-zinc-900">{t("Overall Performance")}</CardTitle>
                  <span className="text-xs text-zinc-500 mt-0.5 block">{overall.companyCount} {t("companies")}</span>
                </div>
              </div>
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground border-border text-xs">
                ESG: {overall.esgScore}/5
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <h4 className="text-[11px] font-medium text-zinc-500 mb-2">{t("Group totals")}</h4>
            <div className="flex items-center justify-between border-t border-zinc-300/50 pt-3">
              <div className="flex items-center gap-1.5 text-zinc-800">
                <Building2 className="h-3.5 w-3.5 text-zinc-500" />
                <span className="text-sm font-medium">{overall.engagement}% {t("Avg engagement")}</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-800">
                <Target className="h-3.5 w-3.5 text-zinc-500" />
                <span className="text-sm font-medium">{overall.missions} {t("Missions")}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
