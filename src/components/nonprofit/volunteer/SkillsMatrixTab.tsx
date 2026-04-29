
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface Volunteer {
  id: number;
  name: string;
  joinDate: string;
  lastSession: string;
  hours: number;
  skills: string[];
  status: string;
}

interface SkillsMatrixTabProps {
  volunteers: Volunteer[];
}

export function SkillsMatrixTab({ volunteers }: SkillsMatrixTabProps) {
  const { t } = useTranslation();
  const [searchSkill, setSearchSkill] = useState("");
  
  // Extract all unique skills from volunteers
  const allSkills = Array.from(
    new Set(
      volunteers.flatMap(volunteer => volunteer.skills)
    )
  ).sort();
  
  // Filter skills based on search
  const filteredSkills = allSkills.filter(skill => 
    skill.toLowerCase().includes(searchSkill.toLowerCase())
  );
  
  // Get volunteers by skill
  const getVolunteersBySkill = (skill: string) => {
    return volunteers.filter(v => v.skills.includes(skill));
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <CardTitle>{t('Volunteer Skills Matrix')}</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('Search skills...')}
                  className="pl-8 w-[200px]"
                  value={searchSkill}
                  onChange={(e) => setSearchSkill(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                {t('Filter')}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredSkills.length > 0 ? (
              filteredSkills.map(skill => (
                <div key={skill} className="border-b pb-4 last:border-b-0">
                  <h3 className="text-lg font-medium mb-2">{skill}</h3>
                  <div className="flex flex-wrap gap-2">
                    {getVolunteersBySkill(skill).map(volunteer => (
                      <Badge key={volunteer.id} variant="outline" className="py-1.5">
                        {volunteer.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {searchSkill ? t('No skills match your search') : t('No skills found')}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('Skills Gap Analysis')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">{t('Based on your projects and volunteer skills, here are the areas where you might need more volunteer capacity:')}</p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="text-sm font-medium">{t('Grant Writing')}</div>
                  <div className="text-xs text-muted-foreground">{t('1 of 5 needed volunteers')}</div>
                </div>
                <div className="w-1/2 h-2 bg-muted overflow-hidden rounded-full">
                  <div className="h-full bg-red-500" style={{ width: '20%' }}></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="text-sm font-medium">{t('Legal Advice')}</div>
                  <div className="text-xs text-muted-foreground">{t('2 of 3 needed volunteers')}</div>
                </div>
                <div className="w-1/2 h-2 bg-muted overflow-hidden rounded-full">
                  <div className="h-full bg-amber-500" style={{ width: '66%' }}></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="text-sm font-medium">{t('Web Development')}</div>
                  <div className="text-xs text-muted-foreground">{t('3 of 3 needed volunteers')}</div>
                </div>
                <div className="w-1/2 h-2 bg-muted overflow-hidden rounded-full">
                  <div className="h-full bg-green-500" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
