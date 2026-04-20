
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { RegistrationSummary } from "./RegistrationSummary";
import { registerUser } from "@/services/registrationService";
import { PersonaType } from "@/utils/personaLabels";

interface ReviewStepProps {
  selectedImage: string | null;
  formValues: any;
  onSubmit: (formData: any) => void;
  personaType: PersonaType;
}

export function ReviewStep({ selectedImage, formValues, onSubmit, personaType }: ReviewStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Prepare form data with avatar URL
      const registrationData = {
        ...formValues,
        avatar_url: selectedImage
      };
      
      console.log("Submitting registration data:", registrationData);
      
      // Call the registration service and wait for response
      const user = await registerUser(personaType, registrationData);
      
      console.log("Registration successful:", user);
      
      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account.",
      });

      // Redirect to login
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-xl">
      <RegistrationSummary 
        selectedImage={selectedImage}
        formValues={formValues}
        personaType={personaType}
      />
      
      <Button 
        type="button" 
        className="w-full mt-8 bg-coompass-success hover:bg-coompass-success/90 text-white"
        onClick={handleRegister}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : `Register as ${personaType}`}
      </Button>
    </div>
  );
}
