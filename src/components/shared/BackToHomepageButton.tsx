
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BackToHomepageButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/landing-brisa");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className="text-white/80 hover:text-white hover:bg-white/10 transition-colors"
      aria-label="Back to Homepage"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back to Homepage
    </Button>
  );
};
