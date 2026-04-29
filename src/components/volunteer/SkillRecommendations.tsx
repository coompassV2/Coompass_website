
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Award, BookOpen, Clock, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export function SkillRecommendations() {
  const { t } = useTranslation();
  
  // Mock data - would come from API in a real implementation
  const recommendedSkills = [
    {
      id: 1,
      name: "Project Management",
      relevance: 95,
      reason: "Based on your leadership skills and experience",
      courses: 3,
      missions: 2,
    },
    {
      id: 2,
      name: "Public Speaking",
      relevance: 85,
      reason: "Complement to your communication skills",
      courses: 5,
      missions: 1,
    },
    {
      id: 3,
      name: "Grant Writing",
      relevance: 78,
      reason: "Useful for environmental causes you support",
      courses: 2,
      missions: 3,
    }
  ];
  
  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{t('Skill Development')}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {t('Recommended skills to develop based on your interests and current abilities.')}
        </p>
      </div>
      
      <div className="space-y-6">
        {recommendedSkills.map((skill) => (
          <div key={skill.id} className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{skill.name}</h4>
              <Badge>
                {skill.relevance}% {t('Match')}
              </Badge>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {skill.reason}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-card/50 rounded-md p-3 flex items-center gap-2 min-w-[110px]">
                <BookOpen className="h-4 w-4 text-blue-500" />
                <div className="text-sm">
                  <div className="text-muted-foreground">{t('Courses')}</div>
                  <div>{skill.courses} {t('available')}</div>
                </div>
              </div>
              <div className="bg-card/50 rounded-md p-3 flex items-center gap-2 min-w-[110px]">
                <Trophy className="h-4 w-4 text-amber-500" />
                <div className="text-sm">
                  <div className="text-muted-foreground">{t('Missions')}</div>
                  <div>{skill.missions} {t('available')}</div>
                </div>
              </div>
              <Button className="ml-auto" variant="outline" size="sm">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                {t('Explore')}
              </Button>
            </div>
            
            <div className="pt-2 border-t border-border mt-2">
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4 text-green-500" />
                <span className="text-sm">{t('Earn a certificate by completing related courses')}</span>
              </div>
            </div>
          </div>
        ))}
        
        <Button className="w-full mt-4">
          {t('View All Development Opportunities')}
        </Button>
      </div>
    </div>
  );
}
