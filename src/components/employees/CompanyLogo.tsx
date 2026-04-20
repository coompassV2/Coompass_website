import React from "react";
import { brisaCompanies } from "@/data/brisa-companies";
import { cn } from "@/lib/utils";

interface CompanyLogoProps {
  companyId: string;
  className?: string;
  showTooltip?: boolean;
}

export function CompanyLogo({ companyId, className, showTooltip = true }: CompanyLogoProps) {
  const company = brisaCompanies.find(c => c.id === companyId);

  if (!company) {
    return null;
  }

  return (
    <div className={cn("relative", className)}>
      {company.logoImage ? (
        <img
          src={company.logoImage}
          alt={company.name}
          className="h-8 w-8 rounded object-contain"
          title={showTooltip ? company.name : undefined}
        />
      ) : (
        <div
          className={cn(
            "h-8 w-8 rounded flex items-center justify-center text-white font-bold text-sm",
            company.color
          )}
          title={showTooltip ? company.name : undefined}
        >
          {company.logo}
        </div>
      )}
    </div>
  );
}

