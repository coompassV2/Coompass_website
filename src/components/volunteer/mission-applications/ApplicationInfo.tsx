
import { useTranslation } from "react-i18next";
import { StatusBadge } from "./StatusBadge";
import { RejectionMessage } from "./RejectionMessage";
import { MissionApplication } from "./types";
import { formatDatePt } from "@/lib/dateFormat";

interface ApplicationInfoProps {
  application: MissionApplication;
}

export function ApplicationInfo({ application }: ApplicationInfoProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4 py-2">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">{t('Status')}</h4>
        <StatusBadge status={application.status} />
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium">{t('Applied Date')}</h4>
        <p>{application.appliedDate}</p>
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium">{t('Location')}</h4>
        <p>{application.location}</p>
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium">{t('Start Date')}</h4>
        <p>{formatDatePt(application.startDate)}</p>
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium">{t('Description')}</h4>
        <p className="text-sm">{application.description}</p>
      </div>
      
      {application.status === "Rejected" && <RejectionMessage />}
    </div>
  );
}
