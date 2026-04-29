
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function InterestAreas() {
  const { t } = useTranslation();
  const [interests, setInterests] = useState([
    { id: 1, name: "Environmental Conservation", priority: "high" },
    { id: 2, name: "Education", priority: "medium" },
    { id: 3, name: "Animal Welfare", priority: "medium" },
    { id: 4, name: "Community Development", priority: "high" },
    { id: 5, name: "Arts & Culture", priority: "low" },
  ]);
  const [newInterest, setNewInterest] = useState("");
  const [newPriority, setNewPriority] = useState("medium");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const addInterest = () => {
    if (newInterest.trim()) {
      setInterests([
        ...interests, 
        { 
          id: Math.max(0, ...interests.map(i => i.id)) + 1, 
          name: newInterest.trim(), 
          priority: newPriority 
        }
      ]);
      setNewInterest("");
      setNewPriority("medium");
      setDialogOpen(false);
    }
  };
  
  const removeInterest = (id: number) => {
    setInterests(interests.filter(interest => interest.id !== id));
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-700 dark:bg-red-950 dark:text-red-400";
      case "medium":
        return "bg-amber-500/20 text-amber-700 dark:bg-amber-950 dark:text-amber-400";
      case "low":
        return "bg-blue-500/20 text-blue-700 dark:bg-blue-950 dark:text-blue-400";
      default:
        return "";
    }
  };
  
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{t('Interest Areas')}</h3>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {t('Add Interest')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('Add New Interest Area')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('Interest Area')}</label>
                <Input
                  placeholder={t('Enter interest area...')}
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('Priority Level')}</label>
                <Select 
                  value={newPriority} 
                  onValueChange={setNewPriority}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('Select priority')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">{t('High')}</SelectItem>
                    <SelectItem value="medium">{t('Medium')}</SelectItem>
                    <SelectItem value="low">{t('Low')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                {t('Cancel')}
              </Button>
              <Button onClick={addInterest}>
                {t('Add Interest')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          {t('Select your interests to help us find missions that match your passions and motivations.')}
        </p>
        
        <div className="flex flex-wrap gap-3">
          {interests.map((interest) => (
            <div 
              key={interest.id} 
              className={`flex items-center rounded-full px-3 py-1 text-sm ${getPriorityColor(interest.priority)}`}
            >
              <span>{interest.name}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 ml-1" 
                onClick={() => removeInterest(interest.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col mt-6 pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">{t('Priority Levels')}</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-red-500/20 text-red-700 dark:bg-red-950 dark:text-red-400">
                {t('High')}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {t('Your top passions')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-500/20 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                {t('Medium')}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {t('Significant interest')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500/20 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                {t('Low')}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {t('Casual interest')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
