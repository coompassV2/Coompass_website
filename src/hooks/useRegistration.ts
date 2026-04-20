import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PersonaType } from "@/utils/personaLabels";

export const useRegistration = () => {
  const [selectedPersona, setSelectedPersona] = useState<PersonaType | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (_data: unknown) => {
    console.log("Registration data received in useRegistration", _data);
  };

  return {
    selectedPersona,
    setSelectedPersona,
    handleSubmit,
  };
};
