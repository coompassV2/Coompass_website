
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SkillsInventory() {
  const { t } = useTranslation();
  const [skills, setSkills] = useState([
    { id: 1, name: "Communication", level: 80 },
    { id: 2, name: "Leadership", level: 65 },
    { id: 3, name: "Problem Solving", level: 90 },
    { id: 4, name: "Teamwork", level: 85 },
    { id: 5, name: "Technical Writing", level: 70 },
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState([50]);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleSliderChange = (id: number, newValue: number[]) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, level: newValue[0] } : skill
    ));
  };
  
  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([
        ...skills, 
        { 
          id: Math.max(0, ...skills.map(s => s.id)) + 1, 
          name: newSkill.trim(), 
          level: newSkillLevel[0] 
        }
      ]);
      setNewSkill("");
      setNewSkillLevel([50]);
      setDialogOpen(false);
    }
  };
  
  const removeSkill = (id: number) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };
  
  const getLevelLabel = (level: number) => {
    if (level < 30) return t('Beginner');
    if (level < 60) return t('Intermediate');
    if (level < 85) return t('Advanced');
    return t('Expert');
  };
  
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{t('Skills Inventory')}</h3>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {t('Add Skill')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('Add New Skill')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('Skill Name')}</label>
                <Input
                  placeholder={t('Enter skill name...')}
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">{t('Proficiency Level')}</label>
                  <span className="text-sm text-muted-foreground">
                    {getLevelLabel(newSkillLevel[0])}
                  </span>
                </div>
                <Slider
                  value={newSkillLevel}
                  onValueChange={setNewSkillLevel}
                  max={100}
                  step={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                {t('Cancel')}
              </Button>
              <Button onClick={addSkill}>
                {t('Add Skill')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.id} className="space-y-2">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">{skill.name}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={() => removeSkill(skill.id)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                {getLevelLabel(skill.level)}
              </span>
            </div>
            <Slider
              value={[skill.level]}
              onValueChange={(newValue) => handleSliderChange(skill.id, newValue)}
              max={100}
              step={5}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
