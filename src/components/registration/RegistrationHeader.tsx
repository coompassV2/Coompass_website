
import { Link } from "react-router-dom";
import { PersonaType } from "@/utils/personaLabels";

interface RegistrationHeaderProps {
  logoImage: string;
  selectedPersona: PersonaType | null;
  onBackClick?: () => void;
}

export const RegistrationHeader = ({ logoImage, selectedPersona, onBackClick }: RegistrationHeaderProps) => {
  return (
    <div className={`flex flex-col items-center ${selectedPersona ? 'mb-6' : 'mb-8'}`}>
      <img src={logoImage} alt="Coompass Logo" className={selectedPersona ? "h-12 mb-4" : "h-[62px] mb-8"} />
      {!selectedPersona ? (
        <>
          <h1 className="text-2xl font-semibold text-white mb-2">Choose your persona</h1>
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-coompass-success hover:underline">
              Sign in
            </Link>
          </p>
        </>
      ) : (
        <>
          <h1 className="text-xl font-semibold text-white mb-2">Complete your registration</h1>
          {onBackClick && (
            <button 
              onClick={onBackClick}
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              ← Back to persona selection
            </button>
          )}
        </>
      )}
    </div>
  );
};
