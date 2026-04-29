
import { ReactNode } from "react";
import { BackToHomepageButton } from "@/components/shared/BackToHomepageButton";

interface AuthLayoutProps {
  children: ReactNode;
  backgroundImage: string;
  logoImage: string;
}

export const AuthLayout = ({ children, backgroundImage, logoImage }: AuthLayoutProps) => {
  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{ 
        backgroundColor: "#006537",
        backgroundImage: `linear-gradient(rgba(0, 101, 55, 0.72), rgba(0, 101, 55, 0.72)), url("${backgroundImage}")`,
        backgroundBlendMode: "darken",
      }}
    >
      {/* Back to Homepage button in top right */}
      <div className="absolute top-4 right-4 z-10">
        <BackToHomepageButton />
      </div>

      <div className="w-full max-w-md px-8 relative z-10">
        <div className="mb-8 flex flex-col items-center">
          <img 
            src={logoImage}
            alt="Logo" 
            className="h-[160px] mb-8"
          />
          {children}
        </div>
      </div>
    </div>
  );
};
