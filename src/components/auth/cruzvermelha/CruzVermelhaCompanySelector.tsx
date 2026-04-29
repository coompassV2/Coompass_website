import React from "react";
import { Button } from "@/components/ui/button";
import { CruzVermelhaCompanyGrid } from "./CruzVermelhaCompanyGrid";

interface Company {
  id: string;
  name: string;
  logo: string;
  logoImage?: string;
  color: string;
}

interface CruzVermelhaCompanySelectorProps {
  companies: Company[];
  selectedCompany: string | null;
  selectedAccessType: string | null;
  isLoading: boolean;
  onCompanySelect: (companyId: string) => void;
  onAccessTypeSelect: (accessType: string) => void;
  onContinue: () => void;
}

export function CruzVermelhaCompanySelector({ 
  companies, 
  selectedCompany, 
  selectedAccessType,
  isLoading, 
  onCompanySelect, 
  onAccessTypeSelect,
  onContinue 
}: CruzVermelhaCompanySelectorProps) {
  return (
    <div className="w-full lg:w-1/2 bg-gray-900 flex flex-col items-center justify-center p-8 relative">
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
          <h2 className="text-2xl font-bold text-white mb-2">Selecione a empresa e a função</h2>
          <p className="text-gray-400">Escolha a empresa para a qual trabalha</p>
        </div>

        {/* Company Grid */}
        <CruzVermelhaCompanyGrid 
          companies={companies}
          selectedCompany={selectedCompany}
          onCompanySelect={onCompanySelect}
        />

        {/* Access Type Selection */}
        <div className="mb-6">
          <h3 className="text-white text-sm font-medium mb-3">Escolha a sua função</h3>
          <div className="grid grid-cols-2 gap-3" role="group" aria-label="Select access type">
            <Button
              onClick={() => onAccessTypeSelect("volunteer")}
              variant={selectedAccessType === "volunteer" ? "default" : "outline"}
              className={`
                py-3 rounded-lg transition-colors font-medium text-sm
                ${selectedAccessType === "volunteer" 
                  ? "bg-red-500 hover:bg-red-600 text-white border-red-500" 
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600"
                }
              `}
              aria-pressed={selectedAccessType === "volunteer"}
              aria-label="Select volunteer access type"
            >
              Voluntário
            </Button>
            <Button
              onClick={() => onAccessTypeSelect("admin")}
              variant={selectedAccessType === "admin" ? "default" : "outline"}
              className={`
                py-3 rounded-lg transition-colors font-medium text-sm
                ${selectedAccessType === "admin" 
                  ? "bg-red-500 hover:bg-red-600 text-white border-red-500" 
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600"
                }
              `}
              aria-pressed={selectedAccessType === "admin"}
              aria-label="Select admin access type"
            >
              Administrador
            </Button>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={onContinue}
          disabled={isLoading || !selectedCompany || !selectedAccessType}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing in..." : "Continuar"}
        </Button>
      </div>

      <div className="absolute bottom-4 text-center">
        <p className="text-xs text-gray-500">
          © 2025 Cruz Vermelha Portuguesa & Coompass. Todos os Direitos Reservados.
        </p>
      </div>
    </div>
  );
} 