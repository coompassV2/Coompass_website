import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PersonaCard } from "@/components/registration/PersonaCard";
import { RegistrationLayout } from "@/components/registration/RegistrationLayout";
import { RegistrationFooter } from "@/components/registration/RegistrationFooter";
import { PersonaType } from "@/utils/personaLabels";
import { homeForUser, useAuth } from "@/contexts/AuthContext";

const themes = {
  default: {
    background: "/demo-hero.jpg",
    logo: "/lovable-uploads/4be2e00f-693c-4dd3-be7d-8a3ddce5c065.png",
  },
  caribbean: {
    background: "/lovable-uploads/2d5d215e-2b1c-40ee-b17f-bea9199f7d84.png",
    logo: "/lovable-uploads/70245805-0d4d-40c4-a0fd-3bb7a89fe469.png",
  },
};

const personaDashboardMap: Record<PersonaType, string> = {
  company: "/company/dashboard",
  organization: "/nonprofit/dashboard",
  volunteer: "/volunteer/dashboard",
  stakeholder: "/volunteer/dashboard",
};

export default function Demo() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = "default";
  const backgroundImage = themes[theme].background;
  const logoImage = themes[theme].logo;

  useEffect(() => {
    if (user) {
      navigate(homeForUser(user), { replace: true });
    }
  }, [user, navigate]);

  const registrationPersonas: PersonaType[] = ["company", "organization", "volunteer"];

  const handleDemoPersonaClick = (persona: PersonaType) => {
    localStorage.setItem("demo-persona", persona);
    navigate(personaDashboardMap[persona]);
  };

  return (
    <RegistrationLayout backgroundImage={backgroundImage}>
      <div className="flex flex-col items-center mb-8">
        <img src={logoImage} alt="Coompass Logo" className="h-[62px] mb-8" />
      </div>
      <div className="mb-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-white mb-2">Quick Demo Access</h2>
        <p className="mb-6 text-center text-gray-400 text-sm">
          Sign in instantly with a demo account to explore the platform features.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 grid-rows-3 sm:grid-rows-2 md:grid-rows-1 lg:grid-rows-1 md:max-w-4xl lg:max-w-5xl mx-auto">
        {registrationPersonas.map((persona) => (
          <PersonaCard
            key={persona}
            type={persona}
            isSelected={false}
            onClick={handleDemoPersonaClick}
          />
        ))}
      </div>
      <RegistrationFooter />
    </RegistrationLayout>
  );
}
