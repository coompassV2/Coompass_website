
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter } from "lucide-react";
import { FilterDropdown } from "@/components/shared/FilterDropdown";
import { SelectedFilters } from "@/components/shared/SelectedFilters";
import { useTaxonomyLists } from "@/hooks/useTaxonomyLists";

interface User {
  id: string;
  name: string;
  email: string;
  skills: string[];
  causes: string[];
  availability: string;
  participationStatus?: "pending" | "accepted" | "none";
}

interface RecruitVolunteerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRecruitVolunteer: (userId: string) => void;
}

export function RecruitVolunteerDialog({
  open,
  onOpenChange,
  onRecruitVolunteer
}: RecruitVolunteerDialogProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);
  const { skills, causes } = useTaxonomyLists();
  
  // All available skills and causes
  const allSkills = skills.map((skill) => skill.name);
  const allCauses = causes.map((cause) => cause.name);
  
  // Mock data - in a real app, this would come from an API call
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: "1",
        name: "Jane Cooper",
        email: "jane.cooper@exemplo.com",
        skills: ["Web Development", "Graphic Design"],
        causes: ["Education", "Environment"],
        availability: "Weekends",
        participationStatus: "pending"
      },
      {
        id: "2",
        name: "Robert Fox",
        email: "robert.fox@exemplo.com",
        skills: ["Marketing", "Social Media", "Content Writing"],
        causes: ["Animal Welfare", "Healthcare"],
        availability: "Evenings",
        participationStatus: "accepted"
      },
      {
        id: "3",
        name: "Esther Howard",
        email: "esther.howard@exemplo.com",
        skills: ["Legal Advice", "Grant Writing"],
        causes: ["Human Rights", "Poverty Alleviation"],
        availability: "Flexible",
        participationStatus: "none"
      },
      {
        id: "4",
        name: "Leslie Alexander",
        email: "leslie.alexander@exemplo.com",
        skills: ["Event Planning", "Fundraising", "Project Management"],
        causes: ["Arts & Culture", "Community Development"],
        availability: "Weekdays",
        participationStatus: "none"
      },
      {
        id: "5",
        name: "Darlene Robertson",
        email: "darlene.robertson@exemplo.com",
        skills: ["Teaching", "Photography"],
        causes: ["Children & Youth", "Education"],
        availability: "Weekends",
        participationStatus: "none"
      }
    ];
    
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);
  
  // Handle filtering users based on search query and selected filters
  useEffect(() => {
    let result = [...users];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(query) || 
        user.email.toLowerCase().includes(query) ||
        user.skills.some(skill => skill.toLowerCase().includes(query)) ||
        user.causes.some(cause => cause.toLowerCase().includes(query))
      );
    }
    
    // Filter by selected skills
    if (selectedSkills.length > 0) {
      result = result.filter(user => 
        selectedSkills.some(skill => user.skills.includes(skill))
      );
    }
    
    // Filter by selected causes
    if (selectedCauses.length > 0) {
      result = result.filter(user => 
        selectedCauses.some(cause => user.causes.includes(cause))
      );
    }
    
    setFilteredUsers(result);
  }, [searchQuery, selectedSkills, selectedCauses, users]);
  
  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
  };
  
  const toggleCause = (cause: string) => {
    setSelectedCauses(prev => 
      prev.includes(cause) 
        ? prev.filter(c => c !== cause) 
        : [...prev, cause]
    );
  };
  
  const handleRemoveFilter = (filter: string) => {
    setSelectedSkills(prev => prev.filter(skill => skill !== filter));
    setSelectedCauses(prev => prev.filter(cause => cause !== filter));
  };
  
  const isInviteDisabled = (user: User) => {
    return user.participationStatus === "pending" || user.participationStatus === "accepted";
  };
  
  const getInviteButtonText = (user: User) => {
    if (user.participationStatus === "pending") return t('Pending');
    if (user.participationStatus === "accepted") return t('Already Participating');
    return t('Invite');
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{t('Recruit Volunteers')}</DialogTitle>
          <DialogDescription>
            {t('Find and invite volunteers to join your organization based on their skills and causes they care about.')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          {/* Search and filter bar */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('Search volunteers...')}
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <FilterDropdown 
                label={t('Skills')}
                options={allSkills}
                selectedOptions={selectedSkills}
                onOptionToggle={toggleSkill}
              />
              
              <FilterDropdown 
                label={t('Causes')}
                options={allCauses}
                selectedOptions={selectedCauses}
                onOptionToggle={toggleCause}
              />
            </div>
          </div>
          
          {/* Selected filters */}
          <SelectedFilters
            filters={[...selectedSkills, ...selectedCauses]}
            onRemove={handleRemoveFilter}
          />
          
          {/* Volunteers list */}
          <div className="border rounded-md divide-y">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div key={user.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="pt-1.5">
                      <div className="text-xs text-muted-foreground mb-1">
                        {t('Availability')}: {user.availability}
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {user.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {user.causes.map((cause) => (
                          <Badge key={cause} variant="secondary" className="text-xs">
                            {cause}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="shrink-0"
                    disabled={isInviteDisabled(user)}
                    variant={isInviteDisabled(user) ? "outline" : "default"}
                    onClick={() => !isInviteDisabled(user) && onRecruitVolunteer(user.id)}
                  >
                    {getInviteButtonText(user)}
                  </Button>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                {t('No volunteers match your search criteria')}
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('Cancel')}
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            {t('Done')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
