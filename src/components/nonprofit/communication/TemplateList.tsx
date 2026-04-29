
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { MessageSquare, Send } from "lucide-react";

interface Template {
  id: number;
  name: string;
  type: string;
}

interface TemplateListProps {
  templates: Template[];
  onUseTemplate: (templateId: number) => void;
}

export function TemplateList({ templates, onUseTemplate }: TemplateListProps) {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{t('Communication Templates')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {templates.map((template) => (
          <Card key={template.id} className="p-4 hover:bg-accent/5 transition-colors">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{template.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onUseTemplate(template.id)}>
                <Send className="h-4 w-4 mr-2" />
                {t('Use')}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
