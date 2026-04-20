
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, BarChart3 } from "lucide-react";

interface ReportsDownloadsSectionProps {
  viewMode: "group" | "company";
  selectedCompany: string | null;
}

export function ReportsDownloadsSection({ viewMode, selectedCompany }: ReportsDownloadsSectionProps) {
  const handleDownload = (type: string, format: string) => {
    // Mock download functionality
    console.log(`Downloading ${type} report in ${format} format`);
  };

  const reports = [
    {
      title: "ESG Summary Report",
      description: "Comprehensive overview of all ESG activities and impact metrics",
      icon: FileText,
      formats: ["PDF", "CSV"]
    },
    {
      title: "Impact Analytics",
      description: "Detailed analytics with charts and KPI breakdowns",
      icon: BarChart3,
      formats: ["PDF", "Excel"]
    },
    {
      title: "Company Performance",
      description: "Individual company performance data and comparisons",
      icon: Download,
      formats: ["PDF", "CSV", "Excel"]
    }
  ];

  return (
    <section className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Reports & Downloads</h2>
        <p className="text-sm text-gray-600">Download detailed ESG reports and data exports</p>
      </div>

      <Card className="bg-white shadow-sm">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base">Export Options</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-4">
          {/* Filter Controls */}
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-40">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Report Period
              </label>
              <Select defaultValue="quarter">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {viewMode === "group" && (
              <div className="flex-1 min-w-40">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Company Filter
                </label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    <SelectItem value="via-verde">Via Verde</SelectItem>
                    <SelectItem value="brisa">Brisa</SelectItem>
                    <SelectItem value="controlauto">Controlauto</SelectItem>
                    <SelectItem value="colibri">Colibri</SelectItem>
                    <SelectItem value="a-to-be">A-To-Be</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Available Reports */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {reports.map((report, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-start gap-2">
                  <report.icon className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <h4 className="font-medium text-sm text-gray-900">{report.title}</h4>
                    <p className="text-xs text-gray-600 mt-0.5">{report.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {report.formats.map((format) => (
                    <Button
                      key={format}
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(report.title, format)}
                      className="text-xs"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      {format}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
