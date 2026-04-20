import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn, Compass, Heart, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImpactHubOnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When set, the CTA runs this instead of navigating to /login-brisa (e.g. show in-place auth step). */
  onRegisterClick?: () => void;
}

const steps = [
  { key: "step1", icon: LogIn },
  { key: "step2", icon: Compass },
  { key: "step3", icon: Heart },
  { key: "step4", icon: Users },
] as const;

export function ImpactHubOnboardingModal({
  open,
  onOpenChange,
  onRegisterClick,
}: ImpactHubOnboardingModalProps) {
  const { t } = useTranslation();

  const handleCta = () => {
    onOpenChange(false);
    if (onRegisterClick) onRegisterClick();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-[min(90vw,720px)] w-full p-5 sm:p-6 gap-4",
          "sm:rounded-lg"
        )}
        aria-describedby="impact-hub-onboarding-description"
      >
        <DialogHeader className="space-y-1 text-left">
          <DialogTitle className="text-base font-semibold">
            {t("landingBrisa.onboarding.title")}
          </DialogTitle>
          <p
            id="impact-hub-onboarding-description"
            className="text-xs text-muted-foreground"
          >
            {t("landingBrisa.onboarding.subtitle")}
          </p>
        </DialogHeader>

        {/* Horizontal steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {steps.map(({ key, icon: Icon }, i) => (
            <div
              key={key}
              className={cn(
                "flex flex-col items-center text-center gap-1.5 rounded-md p-2.5",
                "bg-muted/50 border border-border/50"
              )}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-[11px] font-medium text-foreground">
                {t(`landingBrisa.onboarding.${key}Title`)}
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight">
                {t(`landingBrisa.onboarding.${key}Desc`)}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1 border-t">
          <p className="text-xs text-muted-foreground">
            {t("landingBrisa.onboarding.ctaCaption")}
          </p>
          {onRegisterClick ? (
            <Button
              size="default"
              className="rounded-md shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white border-0"
              onClick={handleCta}
            >
              {t("Register or sign in")}
            </Button>
          ) : (
            <Button
              asChild
              size="default"
              className="rounded-md shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white border-0"
            >
              <Link to="/login-brisa" onClick={() => onOpenChange(false)}>
                {t("Register or sign in")}
              </Link>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
