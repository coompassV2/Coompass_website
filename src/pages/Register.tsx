import { useTranslation } from "react-i18next";
import { CompactRegistrationForm } from "@/components/registration/CompactRegistrationForm";
import { PersonaSelection } from "@/components/registration/PersonaSelection";
import { RegistrationHeader } from "@/components/registration/RegistrationHeader";
import { RegistrationLayout } from "@/components/registration/RegistrationLayout";
import { RegistrationFooter } from "@/components/registration/RegistrationFooter";
import { useRegistrationTheme } from "@/hooks/useRegistrationTheme";
import { useRegistration } from "@/hooks/useRegistration";
import { SEOManager } from "@/components/shared/SEOManager";

export default function Register() {
  const { t } = useTranslation();
  const { backgroundImage, logoImage } = useRegistrationTheme();
  const { selectedPersona, setSelectedPersona, handleSubmit } = useRegistration();

  return (
    <>
      <SEOManager 
        title={t("Register for Coompass")}
        noIndex={true}
      />
      <RegistrationLayout backgroundImage={backgroundImage} isCompact={!!selectedPersona}>
      <RegistrationHeader 
        logoImage={logoImage} 
        selectedPersona={selectedPersona} 
        onBackClick={selectedPersona ? () => setSelectedPersona(null) : undefined}
      />

      {!selectedPersona ? (
        <PersonaSelection 
          selectedPersona={selectedPersona}
          setSelectedPersona={setSelectedPersona}
        />
      ) : (
        <CompactRegistrationForm 
          onSubmit={handleSubmit} 
          personaType={selectedPersona}
        />
      )}

      <RegistrationFooter />
    </RegistrationLayout>
    </>
  );
}
