
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SearchInput } from "@/components/shared/SearchInput";
import { useState } from "react";
import { getInitials } from "@/utils/avatarUtils";
import { employeesData } from "@/data/employees";
import { useToast } from "@/hooks/use-toast";

interface AddAdministratorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddAdministratorDialog({
  isOpen,
  onClose
}: AddAdministratorDialogProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  // Filter employees based on search query
  const filteredEmployees = employeesData.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAdministrator = () => {
    if (!selectedEmployee) {
      toast({
        title: "No Employee Selected",
        description: "Please select an employee to add as administrator.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Administrator Added",
      description: `${selectedEmployee.name} has been added as an administrator.`
    });

    // Reset state and close dialog
    setSelectedEmployee(null);
    setSearchQuery("");
    onClose();
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
    setSearchQuery("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t('Add Administrator')}</DialogTitle>
          <DialogDescription>
            {t('Select an employee to add as an administrator')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <SearchInput
            placeholder={t("Search employees...")}
            value={searchQuery}
            onChange={setSearchQuery}
          />
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {filteredEmployees.map((employee) => (
              <div 
                key={employee.id}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedEmployee?.id === employee.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:bg-foreground/5'
                }`}
                onClick={() => setSelectedEmployee(employee)}
              >
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={employee.photoUrl} alt={employee.name} />
                  <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="font-medium">{employee.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {employee.activeMissions} {t('active missions')} • {employee.volunteerHours} {t('volunteer hours')}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredEmployees.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                {searchQuery ? t('No employees found matching your search') : t('No employees available')}
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            {t('Cancel')}
          </Button>
          <Button 
            onClick={handleAddAdministrator}
            disabled={!selectedEmployee}
          >
            {t('Add Administrator')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
