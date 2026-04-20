
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Filter, Search } from "lucide-react";

interface VolunteerSkillsMatrixProps {
  volunteers: any[];
}

export function VolunteerSkillsMatrix({ volunteers }: VolunteerSkillsMatrixProps) {
  const { t } = useTranslation();
  
  // Extract all unique skills from volunteers
  const allSkills = Array.from(new Set(
    volunteers.flatMap(volunteer => volunteer.skills)
  )).sort();
  
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{t('Volunteer Skills Matrix')}</h2>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            {t('Filter')}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {t('Export')}
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 px-4 text-left font-medium">{t('Volunteer')}</th>
              {allSkills.map((skill) => (
                <th key={skill} className="py-3 px-4 text-center font-medium whitespace-nowrap">
                  {skill}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => (
              <tr key={volunteer.id} className="border-b border-border hover:bg-accent/5">
                <td className="py-4 px-4">
                  <div>
                    <div className="font-medium">{volunteer.name}</div>
                    <div className="text-sm text-muted-foreground">{volunteer.hours} {t('hours')}</div>
                  </div>
                </td>
                
                {allSkills.map((skill) => (
                  <td key={skill} className="py-4 px-4 text-center">
                    {volunteer.skills.includes(skill) ? (
                      <Badge className="bg-green-500/20 text-green-700 dark:bg-green-950 dark:text-green-400">
                        ✓
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 space-y-4">
        <h3 className="font-medium">{t('Skills Overview')}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {allSkills.map((skill) => {
            const volunteersWithSkill = volunteers.filter(v => v.skills.includes(skill)).length;
            const percentage = Math.round((volunteersWithSkill / volunteers.length) * 100);
            
            return (
              <Card key={skill} className="p-3">
                <div className="text-sm font-medium">{skill}</div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-muted-foreground">
                    {volunteersWithSkill} {t('volunteers')}
                  </span>
                  <Badge variant="outline">{percentage}%</Badge>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
