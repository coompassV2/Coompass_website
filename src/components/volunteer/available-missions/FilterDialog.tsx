
import { useTranslation } from "react-i18next";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locationFilter: string[];
  causesFilter: string[];
  skillsFilter: string[];
  availableLocations: string[];
  availableCauses: string[];
  availableSkills: string[];
  toggleLocationFilter: (location: string) => void;
  toggleCauseFilter: (cause: string) => void;
  toggleSkillFilter: (skill: string) => void;
  clearFilters: () => void;
}

export function FilterDialog({
  open,
  onOpenChange,
  locationFilter,
  causesFilter,
  skillsFilter,
  availableLocations,
  availableCauses,
  availableSkills,
  toggleLocationFilter,
  toggleCauseFilter,
  toggleSkillFilter,
  clearFilters
}: FilterDialogProps) {
  const { t } = useTranslation();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('Filter Missions')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <h4 className="font-medium mb-2">{t('Location')}</h4>
            <div className="space-y-2">
              {availableLocations.map(location => (
                <div className="flex items-center space-x-2" key={location}>
                  <Checkbox 
                    id={`location-${location}`} 
                    checked={locationFilter.includes(location)}
                    onCheckedChange={() => toggleLocationFilter(location)}
                  />
                  <label 
                    htmlFor={`location-${location}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {location}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">{t('Causes')}</h4>
            <div className="space-y-2">
              {availableCauses.map(cause => (
                <div className="flex items-center space-x-2" key={cause}>
                  <Checkbox 
                    id={`cause-${cause}`} 
                    checked={causesFilter.includes(cause)}
                    onCheckedChange={() => toggleCauseFilter(cause)}
                  />
                  <label 
                    htmlFor={`cause-${cause}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {cause}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">{t('Skills')}</h4>
            <div className="space-y-2">
              {availableSkills.map(skill => (
                <div className="flex items-center space-x-2" key={skill}>
                  <Checkbox 
                    id={`skill-${skill}`} 
                    checked={skillsFilter.includes(skill)}
                    onCheckedChange={() => toggleSkillFilter(skill)}
                  />
                  <label 
                    htmlFor={`skill-${skill}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {skill}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={clearFilters}>
            {t('Clear All')}
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            {t('Apply Filters')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
