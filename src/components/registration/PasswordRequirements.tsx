
import { cn } from "@/lib/utils";

interface PasswordRequirementProps {
  password: string;
  confirmPassword: string;
}

interface Requirement {
  id: string;
  label: string;
  validator: (value: string, confirmValue?: string) => boolean;
}

const passwordRequirements: Requirement[] = [
  {
    id: "match",
    label: "Passwords must match",
    validator: (value: string, confirmValue?: string) => value === confirmValue && value !== "",
  },
  {
    id: "length",
    label: "Have at least 8 characters",
    validator: (value: string) => value.length >= 8,
  },
  {
    id: "lowercase",
    label: "One lowercase letter",
    validator: (value: string) => /[a-z]/.test(value),
  },
  {
    id: "uppercase",
    label: "One uppercase letter",
    validator: (value: string) => /[A-Z]/.test(value),
  },
  {
    id: "number",
    label: "One number",
    validator: (value: string) => /[0-9]/.test(value),
  },
  {
    id: "special",
    label: "One special character",
    validator: (value: string) => /[^A-Za-z0-9]/.test(value),
  },
];

export function PasswordRequirements({ password, confirmPassword }: PasswordRequirementProps) {
  const checkRequirement = (requirement: Requirement) => {
    return requirement.validator(password, confirmPassword);
  };

  return (
    <div className="space-y-2 mt-4">
      {passwordRequirements.map((requirement) => (
        <div 
          key={requirement.id}
          className={cn(
            "flex items-center space-x-2 text-sm",
            checkRequirement(requirement) ? "text-coompass-success" : "text-white/60"
          )}
        >
          <div className={cn(
            "w-4 h-4 flex items-center justify-center rounded border",
            checkRequirement(requirement) 
              ? "bg-coompass-success border-coompass-success text-white" 
              : "border-white/60"
          )}>
            {checkRequirement(requirement) && (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                className="w-3 h-3"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </div>
          <span>{requirement.label}</span>
        </div>
      ))}
    </div>
  );
}
