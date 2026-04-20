
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function SkillsInventory() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for skills inventory
  const skillsData = [
    {
      category: "Technical",
      skills: [
        { name: "Web Development", count: 12, needed: 3 },
        { name: "Data Analysis", count: 8, needed: 5 },
        { name: "UX/UI Design", count: 7, needed: 2 },
        { name: "Project Management", count: 15, needed: 0 }
      ]
    },
    {
      category: "Languages",
      skills: [
        { name: "Spanish", count: 18, needed: 0 },
        { name: "Mandarin", count: 3, needed: 4 },
        { name: "French", count: 9, needed: 0 },
        { name: "Portuguese", count: 5, needed: 2 }
      ]
    },
    {
      category: "Soft Skills",
      skills: [
        { name: "Leadership", count: 22, needed: 0 },
        { name: "Public Speaking", count: 14, needed: 3 },
        { name: "Mentoring", count: 8, needed: 5 },
        { name: "Event Planning", count: 10, needed: 0 }
      ]
    },
    {
      category: "Specialized",
      skills: [
        { name: "Accounting", count: 6, needed: 0 },
        { name: "Legal Knowledge", count: 4, needed: 2 },
        { name: "Marketing", count: 9, needed: 0 },
        { name: "Sustainability", count: 7, needed: 4 }
      ]
    }
  ];
  
  // Filter based on search query
  const filteredSkillsData = skillsData.map(category => ({
    ...category,
    skills: category.skills.filter(skill => 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.skills.length > 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">{t('Skills Inventory')}</h2>
        <p className="text-muted-foreground text-sm">
          {t('Employee skills and mission needs matching')}
        </p>
      </div>
      
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("Search skills...")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSkillsData.map((category, index) => (
          <div key={index} className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">{t(category.category)}</h3>
            
            <div className="space-y-4">
              {category.skills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <span className="font-medium">{skill.name}</span>
                      {skill.needed > 0 && (
                        <Badge variant="outline" className="ml-2 bg-amber-500/20 text-amber-600 border-amber-500">
                          {t('Needed')}: {skill.needed}
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm">{skill.count} {t('employees')}</span>
                  </div>
                  <Progress value={(skill.count / 30) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
