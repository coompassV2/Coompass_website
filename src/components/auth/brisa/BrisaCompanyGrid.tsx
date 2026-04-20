
import React from "react";
import { Plus } from "lucide-react";

interface Company {
  id: string;
  name: string;
  logo: string;
  logoImage?: string;
  color: string;
}

interface BrisaCompanyGridProps {
  companies: Company[];
  selectedCompany: string | null;
  onCompanySelect: (companyId: string) => void;
}

export function BrisaCompanyGrid({ companies, selectedCompany, onCompanySelect }: BrisaCompanyGridProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {companies.map((company) => (
        <button
          key={company.id}
          onClick={() => onCompanySelect(company.id)}
          className={`
            aspect-square rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center p-4
            ${selectedCompany === company.id 
              ? 'border-teal-500 bg-gray-800' 
              : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
            }
          `}
        >
          <div className="w-12 h-12 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
            {company.logoImage ? (
              <img 
                src={company.logoImage} 
                alt={company.name}
                className="w-10 h-10 object-contain rounded-md"
              />
            ) : (
              <span className="text-white font-bold text-lg">{company.logo}</span>
            )}
          </div>
          <span className="text-white text-xs font-medium text-center leading-tight">
            {company.name}
          </span>
        </button>
      ))}
      
      {/* Add Company Card */}
      <button
        className="aspect-square rounded-xl border-2 border-dashed border-gray-600 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/40 transition-all duration-200 flex flex-col items-center justify-center p-4"
      >
        <div className="w-12 h-12 rounded-lg mb-2 flex items-center justify-center">
          <Plus className="w-8 h-8 text-gray-400" />
        </div>
        <span className="text-gray-400 text-xs font-medium text-center leading-tight">
          Add Company
        </span>
      </button>
    </div>
  );
}
