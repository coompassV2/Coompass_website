
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ChartsKPIsSectionProps {
  viewMode: "group" | "company";
  dateRange: string;
  selectedCompany: string | null;
}

export function ChartsKPIsSection({ viewMode, dateRange, selectedCompany }: ChartsKPIsSectionProps) {
  // Mock data for charts
  const esgData = [
    { category: "Environment", value: 45, color: "#22c55e" },
    { category: "Social", value: 35, color: "#3b82f6" },
    { category: "Governance", value: 20, color: "#f59e0b" }
  ];

  const sdgData = [
    { goal: "SDG 4", name: "Quality Education", value: 25 },
    { goal: "SDG 8", name: "Decent Work", value: 20 },
    { goal: "SDG 13", name: "Climate Action", value: 18 },
    { goal: "SDG 17", name: "Partnerships", value: 15 },
    { goal: "SDG 3", name: "Good Health", value: 12 },
    { goal: "Others", name: "Other SDGs", value: 10 }
  ];

  const { t } = useTranslation();

  const impactGrowth = [
    { month: "Jan", hours: 850, missions: 8 },
    { month: "Feb", hours: 920, missions: 10 },
    { month: "Mar", hours: 1100, missions: 12 },
    { month: "Apr", hours: 1250, missions: 14 },
    { month: "May", hours: 1380, missions: 16 },
    { month: "Jun", hours: 1450, missions: 18 }
  ];

  return (
    <section className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-1">{t("Impact Analytics")}</h2>
        <p className="text-sm text-gray-600">{t("Data-driven insights into ESG performance and trends")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ESG Category Breakdown */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">{t("ESG Category Distribution")}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={esgData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  label={({ category, value }) => `${category}: ${value}%`}
                >
                  {esgData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* SDG Alignment */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">{t("SDG Alignment")}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={sdgData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="goal" type="category" width={60} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Impact Growth Chart */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base">{t("Impact Growth Trend")}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={impactGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#22c55e" name="Volunteer Hours" />
              <Bar dataKey="missions" fill="#3b82f6" name="Active Missions" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </section>
  );
}
