import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Clock, Calendar, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface Template {
  id: number;
  name: string;
  lastGenerated: string;
  type: string;
}

interface ScheduleReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  templates: Template[];
}

export function ScheduleReportDialog({ 
  isOpen, 
  onClose, 
  templates 
}: ScheduleReportDialogProps) {
  const { t } = useTranslation();
  const [isCreating, setIsCreating] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    templateId: '',
    frequency: 'monthly',
    dayOfMonth: '1',
    time: '09:00',
    recipients: ''
  });

  // Mock scheduled reports
  const [scheduledReports, setScheduledReports] = useState([
    {
      id: 1,
      templateName: 'Quarterly Donor Update',
      frequency: 'Quarterly',
      nextRun: 'July 1, 2025',
      recipients: 'doadores@exemplo.com, admin@exemplo.com'
    },
    {
      id: 2,
      templateName: 'Volunteer Hours Summary',
      frequency: 'Monthly',
      nextRun: 'June 1, 2025',
      recipients: 'voluntarios@exemplo.com'
    }
  ]);

  const handleCreateSchedule = () => {
    if (!newSchedule.templateId || !newSchedule.recipients.trim()) {
      toast.error(t("Please fill in all required fields"));
      return;
    }

    const selectedTemplate = templates.find(t => t.id.toString() === newSchedule.templateId);
    if (!selectedTemplate) return;

    // Mock schedule creation
    const newScheduledReport = {
      id: scheduledReports.length + 1,
      templateName: selectedTemplate.name,
      frequency: newSchedule.frequency.charAt(0).toUpperCase() + newSchedule.frequency.slice(1),
      nextRun: 'June 15, 2025', // Mock next run date
      recipients: newSchedule.recipients
    };

    setScheduledReports(prev => [...prev, newScheduledReport]);
    toast.success(t("Report scheduled successfully"));
    setNewSchedule({
      templateId: '',
      frequency: 'monthly',
      dayOfMonth: '1',
      time: '09:00',
      recipients: ''
    });
    setIsCreating(false);
  };

  const handleDeleteSchedule = (scheduleId: number, templateName: string) => {
    setScheduledReports(prev => prev.filter(schedule => schedule.id !== scheduleId));
    toast.success(t("Scheduled report '{{name}}' deleted successfully", { name: templateName }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {t('Schedule Reports')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Create New Schedule Section */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{t('Schedule New Report')}</h3>
              <Button 
                onClick={() => setIsCreating(!isCreating)}
                variant={isCreating ? "outline" : "default"}
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                {isCreating ? t('Cancel') : t('New Schedule')}
              </Button>
            </div>

            {isCreating && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="template-select">{t('Report Template')}</Label>
                    <Select 
                      value={newSchedule.templateId} 
                      onValueChange={(value) => setNewSchedule(prev => ({ ...prev, templateId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('Select template')} />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id.toString()}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="frequency-select">{t('Frequency')}</Label>
                    <Select 
                      value={newSchedule.frequency} 
                      onValueChange={(value) => setNewSchedule(prev => ({ ...prev, frequency: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">{t('Weekly')}</SelectItem>
                        <SelectItem value="monthly">{t('Monthly')}</SelectItem>
                        <SelectItem value="quarterly">{t('Quarterly')}</SelectItem>
                        <SelectItem value="yearly">{t('Yearly')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {newSchedule.frequency === 'monthly' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="day-of-month">{t('Day of Month')}</Label>
                      <Select 
                        value={newSchedule.dayOfMonth} 
                        onValueChange={(value) => setNewSchedule(prev => ({ ...prev, dayOfMonth: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                            <SelectItem key={day} value={day.toString()}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="time">{t('Time')}</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newSchedule.time}
                        onChange={(e) => setNewSchedule(prev => ({ ...prev, time: e.target.value }))}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="recipients">{t('Email Recipients')}</Label>
                  <Input
                    id="recipients"
                    value={newSchedule.recipients}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, recipients: e.target.value }))}
                    placeholder={t('Enter email addresses separated by commas')}
                  />
                </div>

                <Button onClick={handleCreateSchedule} className="w-full">
                  {t('Schedule Report')}
                </Button>
              </div>
            )}
          </div>

          {/* Existing Scheduled Reports */}
          <div>
            <h3 className="text-lg font-medium mb-4">{t('Scheduled Reports')}</h3>
            {scheduledReports.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t('No scheduled reports yet')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {scheduledReports.map((schedule) => (
                  <Card key={schedule.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <h4 className="font-medium">{schedule.templateName}</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <p>{t('Frequency')}: {schedule.frequency}</p>
                          <p>{t('Next run')}: {schedule.nextRun}</p>
                          <p className="md:col-span-2">{t('Recipients')}: {schedule.recipients}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteSchedule(schedule.id, schedule.templateName)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
