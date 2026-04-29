
import { useState } from "react";
import { SocialAuthButtons } from "./SocialAuthButtons";
import { EmailLoginForm } from "./EmailLoginForm";
import { LegalNotice } from "./LegalNotice";
import { PersonaType } from "@/utils/personaLabels";

interface LoginFormProps {
  onSubmit: (email: string, password: string, persona?: PersonaType) => Promise<void>;
  allowPassword?: boolean;
  showSocialAuth?: boolean;
}

export function LoginForm({ onSubmit, allowPassword = true, showSocialAuth = false }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full max-w-md space-y-4">
      {showSocialAuth ? (
        <div className="space-y-2">
          <SocialAuthButtons disabled={isLoading} />
        </div>
      ) : null}

      {allowPassword && (
        <>
          {showSocialAuth ? (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black/30 text-white px-2">Or continue with email</span>
              </div>
            </div>
          ) : null}

          <EmailLoginForm
            onSubmit={onSubmit}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </>
      )}

      {/* Demo login section removed as requested */}

      <LegalNotice />
    </div>
  );
}
