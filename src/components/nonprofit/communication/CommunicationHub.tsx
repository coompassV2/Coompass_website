
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Mail, CalendarDays } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CommunicationList } from "./CommunicationList";
import { TemplateList } from "./TemplateList";
import { EmailDialog, emailFormSchema } from "./EmailDialog";
import { MeetingDialog, meetingFormSchema } from "./MeetingDialog";
import { TemplateDialog } from "./TemplateDialog";

export function CommunicationHub() {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  // Dialog states
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isMeetingDialogOpen, setIsMeetingDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  
  // Mock data for communication
  const communications = [
    {
      id: 1,
      partner: "Tech Solutions Inc.",
      type: "email",
      subject: "Quarterly Partnership Review",
      date: "Apr 5, 2025",
      status: "sent",
      priority: "medium"
    },
    {
      id: 2,
      partner: "Green Energy Co.",
      type: "meeting",
      subject: "Project Planning Session",
      date: "Apr 8, 2025",
      status: "scheduled",
      priority: "high"
    },
    {
      id: 3,
      partner: "Community Bank",
      type: "email",
      subject: "Fundraising Event Sponsorship",
      date: "Apr 3, 2025",
      status: "awaiting_reply",
      priority: "high"
    },
    {
      id: 4,
      partner: "Global Finance Group",
      type: "call",
      subject: "Grant Application Discussion",
      date: "Apr 10, 2025",
      status: "scheduled",
      priority: "medium"
    }
  ];
  
  // Mock data for templates
  const templates = [
    { id: 1, name: "Quarterly Update", type: "email" },
    { id: 2, name: "Donation Thank You", type: "email" },
    { id: 3, name: "Event Invitation", type: "email" },
    { id: 4, name: "Volunteer Opportunity", type: "email" }
  ];

  // Mock data for partners
  const partners = [
    { id: 1, name: "Tech Solutions Inc." },
    { id: 2, name: "Green Energy Co." },
    { id: 3, name: "Community Bank" },
    { id: 4, name: "Global Finance Group" }
  ];

  // Form instances
  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      recipient: "",
      subject: "",
      message: "",
    },
  });

  const meetingForm = useForm<z.infer<typeof meetingFormSchema>>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: {
      partner: "",
      subject: "",
      date: "",
      time: "",
      notes: "",
    },
  });

  // Handle opening template dialog and setting the selected template
  const handleUseTemplate = (templateId: number) => {
    setSelectedTemplateId(templateId);
    setIsTemplateDialogOpen(true);
  };

  // Handle email form submission
  const onEmailSubmit = (data: z.infer<typeof emailFormSchema>) => {
    console.log("Email data:", data);
    toast({
      title: t("Email Sent"),
      description: t("Email has been sent successfully."),
    });
    setIsEmailDialogOpen(false);
    emailForm.reset();
  };

  // Handle meeting form submission
  const onMeetingSubmit = (data: z.infer<typeof meetingFormSchema>) => {
    console.log("Meeting data:", data);
    toast({
      title: t("Meeting Scheduled"),
      description: t("Meeting has been scheduled successfully."),
    });
    setIsMeetingDialogOpen(false);
    meetingForm.reset();
  };

  // Handle template use
  const handleTemplateUse = () => {
    const template = templates.find(t => t.id === selectedTemplateId);
    if (template) {
      emailForm.setValue("subject", template.name);
      emailForm.setValue("message", `This is a template message for ${template.name}`);
      setIsTemplateDialogOpen(false);
      setIsEmailDialogOpen(true);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{t('Communication Hub')}</h2>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsEmailDialogOpen(true)}>
              <Mail className="h-4 w-4 mr-2" />
              {t('New Email')}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsMeetingDialogOpen(true)}>
              <CalendarDays className="h-4 w-4 mr-2" />
              {t('Schedule Meeting')}
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          <CommunicationList communications={communications} />
          <TemplateList templates={templates} onUseTemplate={handleUseTemplate} />
        </div>
      </div>

      <EmailDialog
        isOpen={isEmailDialogOpen}
        onClose={() => setIsEmailDialogOpen(false)}
        form={emailForm}
        onSubmit={onEmailSubmit}
        partners={partners}
      />

      <MeetingDialog
        isOpen={isMeetingDialogOpen}
        onClose={() => setIsMeetingDialogOpen(false)}
        form={meetingForm}
        onSubmit={onMeetingSubmit}
        partners={partners}
      />

      <TemplateDialog
        isOpen={isTemplateDialogOpen}
        onClose={() => setIsTemplateDialogOpen(false)}
        onUseTemplate={handleTemplateUse}
      />
    </div>
  );
}
