
import React from "react";
import { BrisaNavbar } from "@/components/auth/brisa/BrisaNavbar";
import { BrisaHeroImage } from "@/components/auth/brisa/BrisaHeroImage";
import { BrisaCompanySelector } from "@/components/auth/brisa/BrisaCompanySelector";
import { brisaCompanies } from "@/data/brisa-companies";
import { useBrisaLogin } from "@/hooks/useBrisaLogin";

export default function LoginBrisa() {
  const {
    selectedCompany,
    setSelectedCompany,
    selectedAccessType,
    setSelectedAccessType,
    isLoading,
    handleContinue
  } = useBrisaLogin();

  return (
    <div className="min-h-screen flex flex-col">
      {/* White Navbar */}
      <BrisaNavbar />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left side - Image */}
        <BrisaHeroImage />

        {/* Right side - Company Selection */}
        <BrisaCompanySelector
          companies={brisaCompanies}
          selectedCompany={selectedCompany}
          selectedAccessType={selectedAccessType}
          isLoading={isLoading}
          onCompanySelect={setSelectedCompany}
          onAccessTypeSelect={setSelectedAccessType}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
}
