
import React from "react";
import { FileText } from "lucide-react";
import { getGuideTitleFromId } from "./guideUtils";
import { 
  CompanyProfileGuide, 
  EmployeeOnboardingGuide,
  DashboardCustomizationGuide,
  NonprofitProfileGuide,
  VerificationGuide
} from "./guides";

interface GuideContentLoaderProps {
  guideId: string;
}

export function GuideContentLoader({ guideId }: GuideContentLoaderProps) {
  // Load guide content based on guideId
  switch (guideId) {
    case "company-profile":
      return <CompanyProfileGuide />;
    case "employee-onboarding":
      return <EmployeeOnboardingGuide />;
    case "dashboard-customization":
      return <DashboardCustomizationGuide />;
    case "nonprofit-profile":
      return <NonprofitProfileGuide />;
    case "verification":
      return <VerificationGuide />;
    default:
      return (
        <div className="text-center py-8">
          <div className="mb-6">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{getGuideTitleFromId(guideId)}</h2>
          <p className="text-gray-500">
            We're currently working on this guide. Check back soon for detailed instructions.
          </p>
        </div>
      );
  }
}
