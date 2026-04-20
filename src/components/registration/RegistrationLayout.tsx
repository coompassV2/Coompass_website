
import { ReactNode } from "react";
import { BackToHomepageButton } from "@/components/shared/BackToHomepageButton";

interface RegistrationLayoutProps {
  backgroundImage: string;
  children: ReactNode;
  isCompact?: boolean; // This prop now has no effect, but is kept for compatibility
}

// The main content is always top-aligned with space from the top and max width, both for persona selection and registration steps.
export const RegistrationLayout = ({ backgroundImage, children }: RegistrationLayoutProps) => {
  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url("${backgroundImage}")`,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Back to Homepage button in top right */}
      <div className="absolute top-4 right-4 z-50">
        <BackToHomepageButton />
      </div>

      {/* Top-aligned, padded, max width, consistently for both steps */}
      <div className="w-full max-w-6xl mx-auto px-4 pt-12 pb-12">
        {children}
      </div>
    </div>
  );
};
