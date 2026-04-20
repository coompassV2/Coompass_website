
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, X, UserPlus } from "lucide-react";
import { toast } from "sonner";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
}

import type { CompanyProject } from "./types";

interface ManageTeamMembersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: CompanyProject | null;
  onTeamUpdate: (projectId: string, members: TeamMember[]) => void;
}

export function ManageTeamMembersDialog({
  open,
  onOpenChange,
  project,
  onTeamUpdate
}: ManageTeamMembersDialogProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@company.com",
      role: "Project Manager",
      department: "Operations"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "Developer",
      department: "Technology"
    }
  ]);

  // Mock available employees
  const availableEmployees: TeamMember[] = [
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike.wilson@company.com",
      role: "Designer",
      department: "Design"
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@company.com",
      role: "Marketing Specialist",
      department: "Marketing"
    },
    {
      id: "5",
      name: "Alex Chen",
      email: "alex.chen@company.com",
      role: "Data Analyst",
      department: "Analytics"
    }
  ];

  const filteredEmployees = availableEmployees.filter(
    (employee) =>
      !selectedMembers.find((member) => member.id === employee.id) &&
      (employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addMember = (member: TeamMember) => {
    setSelectedMembers([...selectedMembers, member]);
    toast.success(t("{{name}} added to the project", { name: member.name }));
  };

  const removeMember = (memberId: string) => {
    const member = selectedMembers.find(m => m.id === memberId);
    setSelectedMembers(selectedMembers.filter((m) => m.id !== memberId));
    if (member) {
      toast.success(t("{{name}} removed from the project", { name: member.name }));
    }
  };

  const handleSave = () => {
    if (!project) return;
    onTeamUpdate(project.id, selectedMembers);
    toast.success(t("Team members updated successfully"));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("Manage Team Members")}</DialogTitle>
          <DialogDescription>
            {t("Add or remove team members for")} "{project?.title}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Team Members */}
          <div>
            <h4 className="font-medium mb-3">{t("Current Team Members")} ({selectedMembers.length})</h4>
            <div className="space-y-2">
              {selectedMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role} • {member.department}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMember(member.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Members */}
          <div>
            <h4 className="font-medium mb-3">{t("Add Team Members")}</h4>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("Search employees...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {filteredEmployees.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-muted-foreground">{employee.role} • {employee.department}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addMember(employee)}
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    {t("Add")}
                  </Button>
                </div>
              ))}
              {filteredEmployees.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  {searchQuery ? t("No employees found") : t("All available employees are already on the team")}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("Cancel")}
          </Button>
          <Button onClick={handleSave}>
            {t("Save Changes")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
