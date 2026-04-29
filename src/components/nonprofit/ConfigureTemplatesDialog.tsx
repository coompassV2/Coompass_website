
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
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FileText, Trash2, Plus, Settings, Edit } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface Template {
  id: number;
  name: string;
  lastGenerated: string;
  type: string;
  description?: string;
}

interface ConfigureTemplatesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  templates: Template[];
}

export function ConfigureTemplatesDialog({ 
  isOpen, 
  onClose, 
  templates: initialTemplates 
}: ConfigureTemplatesDialogProps) {
  const { t } = useTranslation();
  const [isCreating, setIsCreating] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    type: 'detailed',
    description: ''
  });

  const handleCreateTemplate = () => {
    if (!newTemplate.name.trim()) {
      toast.error(t("Please enter a template name"));
      return;
    }

    // Create new template with unique ID
    const newTemplateData: Template = {
      id: Math.max(...templates.map(t => t.id), 0) + 1,
      name: newTemplate.name,
      type: newTemplate.type,
      lastGenerated: "Never",
      description: newTemplate.description
    };

    setTemplates(prev => [...prev, newTemplateData]);
    toast.success(t("Template '{{name}}' created successfully", { name: newTemplate.name }));
    setNewTemplate({ name: '', type: 'detailed', description: '' });
    setIsCreating(false);
  };

  const handleDeleteTemplate = (templateId: number, templateName: string) => {
    setTemplates(prev => prev.filter(template => template.id !== templateId));
    toast.success(t("Template '{{name}}' deleted successfully", { name: templateName }));
  };

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template);
    setNewTemplate({
      name: template.name,
      type: template.type,
      description: template.description || ''
    });
  };

  const handleUpdateTemplate = () => {
    if (!editingTemplate || !newTemplate.name.trim()) {
      toast.error(t("Please enter a template name"));
      return;
    }

    setTemplates(prev => prev.map(template => 
      template.id === editingTemplate.id 
        ? {
            ...template,
            name: newTemplate.name,
            type: newTemplate.type,
            description: newTemplate.description
          }
        : template
    ));

    toast.success(t("Template '{{name}}' updated successfully", { name: newTemplate.name }));
    setEditingTemplate(null);
    setNewTemplate({ name: '', type: 'detailed', description: '' });
  };

  const handleCancelEdit = () => {
    setEditingTemplate(null);
    setIsCreating(false);
    setNewTemplate({ name: '', type: 'detailed', description: '' });
  };

  const isFormMode = isCreating || editingTemplate;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {t('Configure Report Templates')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Create/Edit Template Section */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {editingTemplate ? t('Edit Template') : t('Create New Template')}
              </h3>
              <Button 
                onClick={() => isFormMode ? handleCancelEdit() : setIsCreating(true)}
                variant={isFormMode ? "outline" : "default"}
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                {isFormMode ? t('Cancel') : t('New Template')}
              </Button>
            </div>

            {isFormMode && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="template-name">{t('Template Name')}</Label>
                    <Input
                      id="template-name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                      placeholder={t('Enter template name')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-type">{t('Template Type')}</Label>
                    <Select 
                      value={newTemplate.type} 
                      onValueChange={(value) => setNewTemplate(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="detailed">{t('Detailed')}</SelectItem>
                        <SelectItem value="summarized">{t('Summary')}</SelectItem>
                        <SelectItem value="statistical">{t('Statistical')}</SelectItem>
                        <SelectItem value="financial">{t('Financial')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="template-description">{t('Description')}</Label>
                  <Textarea
                    id="template-description"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                    placeholder={t('Describe what this template will include')}
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={editingTemplate ? handleUpdateTemplate : handleCreateTemplate} 
                  className="w-full"
                >
                  {editingTemplate ? t('Update Template') : t('Create Template')}
                </Button>
              </div>
            )}
          </div>

          {/* Existing Templates */}
          <div>
            <h3 className="text-lg font-medium mb-4">{t('Existing Templates')} ({templates.length})</h3>
            {templates.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t('No templates created yet')}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {t('Create your first template to get started')}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <Card key={template.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 flex-1">
                        <FileText className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <h4 className="font-medium">{template.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {template.type === "detailed" ? t('Detailed') :
                             template.type === "summarized" ? t('Summary') :
                             template.type === "statistical" ? t('Statistical') :
                             t('Financial')}
                          </p>
                          {template.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {template.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditTemplate(template)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteTemplate(template.id, template.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {template.lastGenerated !== "Never" 
                        ? `${t('Last generated')}: ${template.lastGenerated}`
                        : t('Never generated')}
                    </p>
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
