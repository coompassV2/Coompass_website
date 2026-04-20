
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { 
  Mail, CalendarDays, Users, Check, 
  Clock, AlertCircle 
} from "lucide-react";

interface Communication {
  id: number;
  partner: string;
  type: string;
  subject: string;
  date: string;
  status: string;
  priority: string;
}

interface CommunicationListProps {
  communications: Communication[];
}

export function CommunicationList({ communications }: CommunicationListProps) {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{t('Recent & Upcoming Communications')}</h3>
      <div className="space-y-3">
        {communications.map((comm) => (
          <Card key={comm.id} className="p-4 hover:bg-accent/5 transition-colors">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {comm.type === 'email' && <Mail className="h-5 w-5 text-blue-500" />}
                  {comm.type === 'meeting' && <Users className="h-5 w-5 text-purple-500" />}
                  {comm.type === 'call' && <Mail className="h-5 w-5 text-green-500" />}
                </div>
                <div>
                  <h4 className="font-medium">{comm.subject}</h4>
                  <p className="text-sm text-muted-foreground">{t('With')}: {comm.partner}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant={comm.priority === 'high' ? 'default' : 'outline'}>
                  {comm.priority === 'high' ? t('High Priority') : t('Medium Priority')}
                </Badge>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{comm.date}</span>
                </div>
                
                <Badge className={
                  comm.status === 'sent' ? "bg-green-500/20 text-green-700" :
                  comm.status === 'scheduled' ? "bg-blue-500/20 text-blue-700" :
                  "bg-amber-500/20 text-amber-700"
                }>
                  {comm.status === 'sent' ? 
                    <><Check className="h-3 w-3 mr-1" /> {t('Sent')}</> :
                  comm.status === 'scheduled' ? 
                    <><CalendarDays className="h-3 w-3 mr-1" /> {t('Scheduled')}</> :
                    <><AlertCircle className="h-3 w-3 mr-1" /> {t('Awaiting Reply')}</>
                  }
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
