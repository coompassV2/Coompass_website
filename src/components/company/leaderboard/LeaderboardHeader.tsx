
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LeaderboardHeaderProps, TimeframeType } from "./types";

export function LeaderboardHeader({ timeframe, onTimeframeChange }: LeaderboardHeaderProps) {
  const { t } = useTranslation();

  const getTimeframeLabel = (tf: TimeframeType) => {
    switch (tf) {
      case 'week': return t('This Week');
      case 'month': return t('This Month');
      case 'quarter': return t('This Quarter');
      case 'year': return t('This Year');
      case 'allTime': return t('All Time');
      default: return t('This Month');
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-xl font-semibold">{t('Employee Leaderboard')}</h2>
        <p className="text-muted-foreground text-sm">
          {t('Top 10 employees by volunteer hours')} - {getTimeframeLabel(timeframe)}
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className={timeframe === 'week' ? 'bg-primary/10 text-primary' : ''}
          onClick={() => onTimeframeChange('week')}
        >
          {t('This Week')}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className={timeframe === 'month' ? 'bg-primary/10 text-primary' : ''}
          onClick={() => onTimeframeChange('month')}
        >
          {t('This Month')}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className={timeframe === 'quarter' ? 'bg-primary/10 text-primary' : ''}
          onClick={() => onTimeframeChange('quarter')}
        >
          {t('This Quarter')}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className={timeframe === 'year' ? 'bg-primary/10 text-primary' : ''}
          onClick={() => onTimeframeChange('year')}
        >
          {t('This Year')}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className={timeframe === 'allTime' ? 'bg-primary/10 text-primary' : ''}
          onClick={() => onTimeframeChange('allTime')}
        >
          {t('All Time')}
        </Button>
      </div>
    </div>
  );
}
