import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MissionDetailsStep } from "./MissionDetailsStep";
import { ReviewStep } from "./ReviewStep";

interface CreateMissionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateMissionDialog({ isOpen, onClose }: CreateMissionDialogProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    contacts: [""],
    hoursRequired: 0,
    volunteersRequired: 0,
    beneficiariesCount: 0,
    requiresInterview: false,
    startDate: "",
    endDate: "",
    isVirtual: false,
    address: "",
    causes: [],
    skills: [],
    requirements: ""
  });

  const handleContinue = (data: any) => {
    setFormData(data);
    setCurrentStep(2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/30 backdrop-blur-lg border-white/10 max-w-4xl">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">{t("Create a New Mission")}</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer ${
                currentStep === 1 ? "bg-coompass-success" : "bg-coompass-success/60"
              }`}>
                1
              </div>
              <span className={`ml-2 text-sm whitespace-nowrap ${
                currentStep === 1 ? "text-white" : "text-gray-400"
              }`}>
                {t("Mission Details")}
              </span>
              <div className="h-[2px] w-12 bg-gray-600 mx-4" />
            </div>
            
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer ${
                currentStep === 2 ? "bg-coompass-success" : "bg-gray-600"
              }`}>
                2
              </div>
              <span className={`ml-2 text-sm whitespace-nowrap ${
                currentStep === 2 ? "text-white" : "text-gray-400"
              }`}>
                Review and Publish
              </span>
            </div>
          </div>

          {currentStep === 1 ? (
            <MissionDetailsStep 
              initialData={formData}
              onContinue={handleContinue}
            />
          ) : (
            <ReviewStep 
              formData={formData}
              onBack={() => setCurrentStep(1)}
              onSubmit={() => {
                // Handle mission creation here
                onClose();
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}