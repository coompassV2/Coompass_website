import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestPasswordRecovery } from "@/services/authApi";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";

export default function AuthPasswordRecover() {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    const result = await requestPasswordRecovery(email.trim(), i18n.language);
    setLoading(false);

    if (result.error) {
      toast({
        variant: "destructive",
        title: t("Could not start recovery"),
        description: result.error,
      });
      return;
    }

    toast({
      title: t("Recovery processed"),
      description: result.message ?? t("If eligible, a recovery email has been sent."),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm space-y-4">
        <h1 className="text-xl font-semibold">{t("Recover Password")}</h1>
        <p className="text-sm text-muted-foreground">
          {t("Enter your account email to receive password recovery instructions.")}
        </p>

        {user?.auth_provider === "okta" ? (
          <div className="rounded-md border p-3 text-sm text-muted-foreground">
            {t("This account is managed by Okta. Password recovery is unavailable here.")}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("Recover password email placeholder")}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t("Sending...") : t("Send recovery email")}
            </Button>
          </form>
        )}

        <div className="text-sm">
          <Link to="/login" className="underline underline-offset-2">
            {t("Back to login")}
          </Link>
        </div>
      </div>
    </div>
  );
}
