
import { Button } from "@/components/ui/button";
import { PersonaType, personaLabels } from "@/utils/personaLabels";
import { Link, useNavigate } from "react-router-dom";

const personaDashboardMap: Record<PersonaType, string> = {
  company: "/company/dashboard",
  organization: "/nonprofit/dashboard",
  volunteer: "/volunteer/dashboard",
  stakeholder: "/executive/dashboard",
};

interface DemoLoginButtonsProps {
  disabled?: boolean;
}

// Set "demo-persona" in localStorage on quick access click
export function DemoLoginButtons({ disabled }: DemoLoginButtonsProps) {
  const navigate = useNavigate();

  const handleDemoClick = (persona: PersonaType) => {
    localStorage.setItem("demo-persona", persona);
    navigate(personaDashboardMap[persona]);
  };

  // Filter out stakeholder from demo login buttons
  const availablePersonas = (Object.keys(personaLabels) as PersonaType[]).filter(
    persona => persona !== "stakeholder"
  );

  return (
    <div className="grid grid-cols-2 gap-2">
      {availablePersonas.map((persona) => (
        <Button
          key={persona}
          size="sm"
          variant="outline"
          className="py-2 bg-white/90 hover:bg-white"
          disabled={disabled}
          onClick={() => handleDemoClick(persona)}
        >
          {personaLabels[persona].title}
        </Button>
      ))}
    </div>
  );
}
