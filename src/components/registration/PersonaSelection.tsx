
import { PersonaCard } from "@/components/registration/PersonaCard";
import { Dispatch, SetStateAction } from "react";
import { PersonaType } from "@/utils/personaLabels";

interface PersonaSelectionProps {
  selectedPersona: PersonaType | null;
  setSelectedPersona: Dispatch<SetStateAction<PersonaType | null>>;
}

export const PersonaSelection = ({ selectedPersona, setSelectedPersona }: PersonaSelectionProps) => {
  // Only show the main personas for registration, not stakeholder
  const registrationPersonas: PersonaType[] = ["company", "organization", "volunteer"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 
      grid-rows-3 sm:grid-rows-2 md:grid-rows-1 lg:grid-rows-1
      md:max-w-4xl lg:max-w-5xl mx-auto">
      {registrationPersonas.map((persona) => (
        <PersonaCard
          key={persona}
          type={persona}
          isSelected={selectedPersona === persona}
          onClick={setSelectedPersona}
        />
      ))}
    </div>
  );
};
