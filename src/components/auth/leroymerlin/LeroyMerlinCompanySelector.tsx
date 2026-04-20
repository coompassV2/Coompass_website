import React from "react";
import { Button } from "@/components/ui/button";
import { LeroyMerlinCompanyGrid } from "./LeroyMerlinCompanyGrid";

interface Company {
  id: string;
  name: string;
  logo: string;
  logoImage?: string;
  color: string;
}

interface LeroyMerlinCompanySelectorProps {
  companies: Company[];
  selectedCompany: string | null;
  selectedAccessType: string | null;
  isLoading: boolean;
  onCompanySelect: (companyId: string) => void;
  onAccessTypeSelect: (accessType: string) => void;
  onContinue: () => void;
}

export function LeroyMerlinCompanySelector({ 
  companies, 
  selectedCompany, 
  selectedAccessType,
  isLoading, 
  onCompanySelect, 
  onAccessTypeSelect,
  onContinue 
}: LeroyMerlinCompanySelectorProps) {
  return (
    <div className="w-full lg:w-1/2 bg-gray-900 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Company Selection Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <img 
              src="/lovable-uploads/94d0ff31-fd1c-40fd-b531-d2dab9c315f2.png"
              alt="Coompass Logo"
              className="w-16 h-16"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Select Company</h2>
          <p className="text-gray-400">Choose the Company you work for</p>
        </div>

        {/* Company Grid */}
        <LeroyMerlinCompanyGrid 
          companies={companies}
          selectedCompany={selectedCompany}
          onCompanySelect={onCompanySelect}
        />

        {/* Access Type Selection */}
        <div className="mb-6">
          <h3 className="text-white text-sm font-medium mb-3">Access Type</h3>
          <div className="grid grid-cols-3 gap-3">
            <Button
              onClick={() => onAccessTypeSelect("volunteer")}
              variant={selectedAccessType === "volunteer" ? "default" : "outline"}
              className={`
                py-3 rounded-lg transition-colors font-medium text-sm
                ${selectedAccessType === "volunteer" 
                  ? "bg-teal-500 hover:bg-teal-600 text-white border-teal-500" 
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600"
                }
              `}
            >
              Volunteer
            </Button>
            <Button
              onClick={() => onAccessTypeSelect("employee")}
              variant={selectedAccessType === "employee" ? "default" : "outline"}
              className={`
                py-3 rounded-lg transition-colors font-medium text-sm
                ${selectedAccessType === "employee" 
                  ? "bg-teal-500 hover:bg-teal-600 text-white border-teal-500" 
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600"
                }
              `}
            >
              Employee
            </Button>
            <Button
              onClick={() => onAccessTypeSelect("admin")}
              variant={selectedAccessType === "admin" ? "default" : "outline"}
              className={`
                py-3 rounded-lg transition-colors font-medium text-sm
                ${selectedAccessType === "admin" 
                  ? "bg-teal-500 hover:bg-teal-600 text-white border-teal-500" 
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600"
                }
              `}
            >
              Admin
            </Button>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={onContinue}
          disabled={isLoading}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-lg transition-colors mb-4"
        >
          {isLoading ? "Signing in..." : "Continue"}
        </Button>

        {/* Copyright Message */}
        <div className="text-center">
          <p className="text-gray-500 text-xs">
            © 2026 Leroy Merlin & Coompass. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
