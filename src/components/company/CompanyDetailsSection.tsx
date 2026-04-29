
import { useState } from "react";
import { EditAboutDialog } from "./EditAboutDialog";
import { EditMissionDialog } from "./EditMissionDialog";
import { EditVisionDialog } from "./EditVisionDialog";
import { EditCoreValuesDialog } from "./EditCoreValuesDialog";
import { CompanyOverviewCard } from "./CompanyOverviewCard";
import { CompanyMissionVisionCards } from "./CompanyMissionVisionCards";
import { CompanyCoreValuesCard } from "./CompanyCoreValuesCard";

export function CompanyDetailsSection() {
  const [isEditAboutOpen, setIsEditAboutOpen] = useState(false);
  const [isEditMissionOpen, setIsEditMissionOpen] = useState(false);
  const [isEditVisionOpen, setIsEditVisionOpen] = useState(false);
  const [isEditCoreValuesOpen, setIsEditCoreValuesOpen] = useState(false);
  
  // Mock company data - updated to Grupo BRISA
  const [company, setCompany] = useState({
    name: "Grupo BRISA",
    description: "O Grupo BRISA é uma empresa líder em infraestruturas de mobilidade e conectividade em Portugal. Comprometemo-nos com a sustentabilidade e inovação, desenvolvendo soluções que promovem uma mobilidade mais eficiente e ecológica para o futuro.",
    mission: "Promover uma mobilidade sustentável e conectividade inteligente que melhore a qualidade de vida das pessoas e proteja o ambiente para as futuras gerações.",
    vision: "Ser a referência europeia em soluções de mobilidade sustentável e infraestruturas inteligentes.",
    values: [
      "Sustentabilidade",
      "Inovação",
      "Excelência",
      "Responsabilidade Social",
      "Transparência"
    ],
    industry: "Infrastructure & Mobility",
    location: "Lisbon, Portugal",
    employeeCount: 3200,
    founded: 1972,
    headquarters: "Quinta da Torre da Aguilha, São Domingos de Rana",
    ceo: "Vasco de Mello",
    revenue: "€650M (2023)"
  });

  const handleSaveAbout = (newDescription: string) => {
    setCompany(prev => ({ ...prev, description: newDescription }));
  };

  const handleSaveMission = (newMission: string) => {
    setCompany(prev => ({ ...prev, mission: newMission }));
  };

  const handleSaveVision = (newVision: string) => {
    setCompany(prev => ({ ...prev, vision: newVision }));
  };

  const handleSaveCoreValues = (newValues: string[]) => {
    setCompany(prev => ({ ...prev, values: newValues }));
  };

  return (
    <>
      <div className="space-y-6">
        <CompanyOverviewCard 
          company={company}
          onEditAbout={() => setIsEditAboutOpen(true)}
        />

        <CompanyMissionVisionCards 
          mission={company.mission}
          vision={company.vision}
          onEditMission={() => setIsEditMissionOpen(true)}
          onEditVision={() => setIsEditVisionOpen(true)}
        />

        <CompanyCoreValuesCard 
          values={company.values}
          onEditCoreValues={() => setIsEditCoreValuesOpen(true)}
        />
      </div>

      {/* Edit Dialogs */}
      <EditAboutDialog
        isOpen={isEditAboutOpen}
        onClose={() => setIsEditAboutOpen(false)}
        currentDescription={company.description}
        onSave={handleSaveAbout}
      />

      <EditMissionDialog
        isOpen={isEditMissionOpen}
        onClose={() => setIsEditMissionOpen(false)}
        currentMission={company.mission}
        onSave={handleSaveMission}
      />

      <EditVisionDialog
        isOpen={isEditVisionOpen}
        onClose={() => setIsEditVisionOpen(false)}
        currentVision={company.vision}
        onSave={handleSaveVision}
      />

      <EditCoreValuesDialog
        isOpen={isEditCoreValuesOpen}
        onClose={() => setIsEditCoreValuesOpen(false)}
        currentValues={company.values}
        onSave={handleSaveCoreValues}
      />
    </>
  );
}
