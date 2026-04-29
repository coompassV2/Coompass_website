
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "@/components/shared/SearchInput";
import { Button } from "@/components/ui/button";
import { FileText, Download, Plus } from "lucide-react";
import { toast } from "sonner";

interface VolunteerActionsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function VolunteerActions({ searchQuery, onSearchChange }: VolunteerActionsProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleAddVolunteer = () => {
    navigate('/nonprofit/volunteers/add');
  };
  
  const handleGenerateReport = () => {
    toast.success(t("Volunteer report generated. Downloading..."));
  };
  
  const handleExport = () => {
    toast.success(t("Volunteer data exported successfully"));
  };
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="w-[400px]">
        <SearchInput
          placeholder={t("Search volunteers...")}
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleGenerateReport}>
          <FileText className="h-4 w-4 mr-2" />
          {t('Generate Report')}
        </Button>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          {t('Export')}
        </Button>
        <Button onClick={handleAddVolunteer}>
          <Plus className="h-4 w-4 mr-2" />
          {t('Add Volunteer')}
        </Button>
      </div>
    </div>
  );
}
