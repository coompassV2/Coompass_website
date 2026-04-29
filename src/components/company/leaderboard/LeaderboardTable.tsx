
import { useTranslation } from "react-i18next";
import { Award, Clock, Target, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { LeaderboardTableProps } from "./types";

export function LeaderboardTable({ data, onRowClick }: LeaderboardTableProps) {
  const { t } = useTranslation();

  return (
    <div className="glass-card p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left pb-4 pl-4">{t('Rank')}</th>
              <th className="text-left pb-4">{t('Employee')}</th>
              <th className="text-left pb-4">{t('Department')}</th>
              <th className="text-center pb-4">
                <div className="flex items-center justify-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {t('Hours')}
                </div>
              </th>
              <th className="text-center pb-4">
                <div className="flex items-center justify-center">
                  <Target className="h-4 w-4 mr-1" />
                  {t('Missions')}
                </div>
              </th>
              <th className="text-center pb-4">
                <div className="flex items-center justify-center">
                  <Award className="h-4 w-4 mr-1" />
                  {t('Impact')}
                </div>
              </th>
              <th className="text-left pb-4">{t('Recognition')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => (
              <tr 
                key={employee.id}
                onClick={() => onRowClick(employee)}
                className={cn(
                  "hover:bg-foreground/5 cursor-pointer",
                  index === 0 ? "bg-amber-50/10" : "",
                  index === 1 ? "bg-gray-200/10" : "",
                  index === 2 ? "bg-amber-600/10" : ""
                )}
              >
                <td className="py-4 pl-4">
                  {index === 0 ? (
                    <Trophy className="h-6 w-6 text-amber-500" />
                  ) : index === 1 ? (
                    <Trophy className="h-6 w-6 text-gray-400" />
                  ) : index === 2 ? (
                    <Trophy className="h-6 w-6 text-amber-700" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center">
                      {index + 1}
                    </div>
                  )}
                </td>
                <td className="py-4">
                  <div className="flex items-center">
                    <img 
                      src={employee.avatar} 
                      alt={employee.name}
                      className="h-8 w-8 rounded-full mr-3 object-cover"
                    />
                    <span>{employee.name}</span>
                  </div>
                </td>
                <td className="py-4">{employee.department}</td>
                <td className="py-4 text-center">{employee.hours}</td>
                <td className="py-4 text-center">{employee.missions}</td>
                <td className="py-4 text-center">
                  <div className="inline-block px-3 py-1 rounded-full bg-coompass-success/20 text-coompass-success">
                    {employee.impact}
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex flex-wrap gap-1">
                    {employee.recognition.map((badge, i) => (
                      <span 
                        key={i} 
                        className="inline-block px-2 py-1 text-xs rounded-full bg-foreground/5 text-muted-foreground"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
