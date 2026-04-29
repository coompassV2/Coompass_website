
import { useTranslation } from "react-i18next";

export function ScheduleSection() {
  const { t } = useTranslation();

  return (
    <div className="glass-card p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">{t('Schedule')}</h3>
        <button className="text-sm text-gray-400 hover:text-white">
          {t('See All')}
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-coompass-primary text-white rounded-lg text-sm whitespace-nowrap">
          {t('Events')}
        </button>
        <button className="px-4 py-2 hover:bg-white/5 text-sm rounded-lg whitespace-nowrap">
          {t('Missions')}
        </button>
        <button className="px-4 py-2 hover:bg-white/5 text-sm rounded-lg whitespace-nowrap">
          {t('Meetings')}
        </button>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 hover:bg-white/5 rounded-lg transition-colors">
            <div className="font-medium">Charity Event</div>
            <div className="text-sm text-gray-400 mt-1">
              8:00 - 8:45 AM (UTC)
            </div>
            <div className="text-sm text-gray-400 mt-1">{t('Remote')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
