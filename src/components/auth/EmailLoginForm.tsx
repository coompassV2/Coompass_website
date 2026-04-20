import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface EmailLoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
}

export function EmailLoginForm({ onSubmit, setIsLoading, isLoading }: EmailLoginFormProps) {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    if (!email || !password) return;
    setIsLoading(true);
    try {
      await onSubmit(email, password);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: t("Authentication Error"),
          description: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
      <div className="space-y-2">
        <Input
          id="login-email"
          name="email"
          type="email"
          placeholder={t("Work email address")}
          className="bg-white/90 border-white/20 text-black placeholder:text-gray-500 py-3"
          autoComplete="email"
          required
        />
        <Input
          id="login-password"
          name="password"
          type="password"
          placeholder={t("Password")}
          className="bg-white/90 border-white/20 text-black placeholder:text-gray-500 py-3"
          autoComplete="current-password"
          required
        />
        <p className="text-sm text-white/70">
          {t("Use an organization email to easily collaborate with teammates")}
        </p>
        <div className="text-right">
          <Link
            to="/auth/password/recover"
            className="text-xs text-white/80 hover:text-white underline underline-offset-2"
          >
            {t("Forgot password?")}
          </Link>
        </div>
      </div>
      <Button
        type="submit"
        size="sm"
        className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-base"
        disabled={isLoading}
      >
        {isLoading ? <Mail className="mr-2 h-4 w-4 animate-spin" /> : t("Continue")}
      </Button>
    </form>
  );
}
