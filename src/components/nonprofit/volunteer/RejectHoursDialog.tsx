
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

interface RejectHoursDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  volunteerName: string;
  hours: number;
  activity: string;
  onConfirm: (reason: string) => void;
}

export function RejectHoursDialog({
  open,
  onOpenChange,
  volunteerName,
  hours,
  activity,
  onConfirm,
}: RejectHoursDialogProps) {
  const { t } = useTranslation();
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const predefinedReasons = [
    { value: "no_show", label: t("Did not show up") },
    { value: "wrong_hours", label: t("Wrong hours reported") },
    { value: "wrong_mission", label: t("Wrong mission/activity") },
    { value: "other", label: t("Other") },
  ];

  const handleConfirm = () => {
    const reason = selectedReason === "other" ? customReason : 
                  predefinedReasons.find(r => r.value === selectedReason)?.label || "";
    
    if (reason.trim()) {
      onConfirm(reason);
      // Reset form
      setSelectedReason("");
      setCustomReason("");
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Reset form
    setSelectedReason("");
    setCustomReason("");
  };

  const isFormValid = selectedReason && (selectedReason !== "other" || customReason.trim());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("Reject Hours Entry")}</DialogTitle>
          <DialogDescription>
            {t("You are about to reject hours logged by {{volunteerName}} for {{activity}} ({{hours}} hours).", {
              volunteerName,
              activity,
              hours,
            })}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-3">
            <Label>{t("Reason for rejection:")}</Label>
            <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
              {predefinedReasons.map((reason) => (
                <div key={reason.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={reason.value} id={reason.value} />
                  <Label htmlFor={reason.value} className="font-normal">
                    {reason.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {selectedReason === "other" && (
            <div className="space-y-2">
              <Label htmlFor="custom-reason">{t("Please specify:")}</Label>
              <Textarea
                id="custom-reason"
                placeholder={t("Enter the reason for rejection...")}
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                maxCount={200}
                showCount
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            {t("Cancel")}
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleConfirm}
            disabled={!isFormValid}
          >
            {t("Reject Hours")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
