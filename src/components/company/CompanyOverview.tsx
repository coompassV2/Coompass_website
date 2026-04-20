
import { useTranslation } from "react-i18next";
import { ArrowUp, Clock, Target, Users } from "lucide-react";

export function CompanyOverview() {
  const { t } = useTranslation();

  // Placeholder data until this section is wired to API.
  const activeVolunteers = 0;
  const inactiveVolunteers = 0;
  const participationPercent = Math.round((activeVolunteers / (activeVolunteers + inactiveVolunteers)) * 100);

  const stats = [
    {
      title: t('Total Volunteer Hours'),
      value: '0',
      icon: Clock,
      description: t('Hours contributed by employees'),
      isEmployeeParticipation: false,
    },
    {
      title: t('Active Missions'),
      value: '0',
      icon: Target,
      description: t('Ongoing volunteer missions'),
      isEmployeeParticipation: false,
    },
    {
      title: t('Employee Participation'),
      value: `${participationPercent}%`,
      icon: Users,
      description: t('Employees participating in missions'),
      isEmployeeParticipation: true,
    },
    {
      title: t('Impact Score'),
      value: '0',
      icon: ArrowUp,
      description: t('Overall CSR impact rating'),
      isEmployeeParticipation: false,
    }
  ];

  return (
    <div className="glass-card p-4">
      <h2 className="text-base font-semibold mb-3">{t('Impact Overview')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="bg-foreground/5 rounded-lg p-3 hover:bg-foreground/10 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-medium text-muted-foreground">{stat.title}</h3>
              <stat.icon className="h-4 w-4 text-coompass-success opacity-70" />
            </div>
            {stat.isEmployeeParticipation ? (
              <>
                <div className="mt-1.5">
                  <p className="text-lg font-semibold">{stat.value}</p>
                </div>
                <div className="grid grid-cols-2 gap-1.5 mt-2">
                  <div className="rounded bg-background/80 border border-border/50 p-1.5 text-center">
                    <p className="text-sm font-semibold text-foreground">{activeVolunteers}</p>
                    <p className="text-[9px] text-muted-foreground truncate">{t('Active')}</p>
                  </div>
                  <div className="rounded bg-background/80 border border-border/50 p-1.5 text-center">
                    <p className="text-sm font-semibold text-foreground">{inactiveVolunteers}</p>
                    <p className="text-[9px] text-muted-foreground truncate">{t('Inactive')}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mt-1.5">
                  <p className="text-lg font-semibold">{stat.value}</p>
                </div>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{stat.description}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
