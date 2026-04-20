
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function useBrisaLogin() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedAccessType, setSelectedAccessType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    setIsLoading(true);
    
    // Set demo persona based on access type
    if (selectedAccessType === "executive") {
      localStorage.setItem("demo-persona", "executive");
      navigate('/executive/dashboard');
    } else if (selectedAccessType === "volunteer") {
      localStorage.setItem("demo-persona", "volunteer");
      navigate('/volunteer/dashboard');
    } else {
      // Default to company for admin or other access types
      localStorage.setItem("demo-persona", "company");
      navigate('/company/dashboard');
    }
    
    if (selectedCompany) {
      localStorage.setItem("selected-brisa-company", selectedCompany);
    }
    if (selectedAccessType) {
      localStorage.setItem("selected-access-type", selectedAccessType);
    }
    
    toast({
      title: "Welcome to Coompass!",
      description: `Signed in as ${selectedAccessType || "Company"} user`
    });
  };

  return {
    selectedCompany,
    setSelectedCompany,
    selectedAccessType,
    setSelectedAccessType,
    isLoading,
    handleContinue
  };
}
