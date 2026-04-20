
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, Target, Building2 } from "lucide-react";

interface StakeholderOverviewProps {
  viewMode: "group" | "company";
  dateRange: string;
  selectedCompany: string | null;
}

export function StakeholderOverview({ viewMode, dateRange, selectedCompany }: StakeholderOverviewProps) {
  // Placeholder values until this section is wired to API.
  const metrics = {
    volunteerHours: 0,
    activeMissions: 0,
    employeeParticipation: 0,
    ngoPartnerships: 0
  };

  const metricCards = [
    {
      title: "Total Volunteer Hours",
      value: metrics.volunteerHours.toLocaleString(),
      icon: Clock,
      change: "0%",
      color: "text-blue-600"
    },
    {
      title: "Active Missions",
      value: metrics.activeMissions.toString(),
      icon: Target,
      change: "0",
      color: "text-green-600"
    },
    {
      title: "Employee Participation",
      value: `${metrics.employeeParticipation}%`,
      icon: Users,
      change: "0%",
      color: "text-purple-600"
    },
    {
      title: "NGO Partnerships",
      value: metrics.ngoPartnerships.toString(),
      icon: Building2,
      change: "0",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          {viewMode === "group" ? "Group-wide" : "Company"} ESG Impact
        </h2>
        <p className="text-sm text-gray-600">
          Real-time metrics across all sustainability initiatives
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((metric) => (
          <Card key={metric.title} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-1">
              <CardTitle className="text-xs font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-xl font-bold text-gray-900">{metric.value}</div>
              <p className="text-xs text-green-600 mt-0.5">
                {metric.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
