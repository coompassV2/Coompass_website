
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Team, TeamMember, TeamManagementState } from "../types";
import { initialTeams, availableEmployees } from "../data/mockData";

export function useTeamManagement() {
  const { t } = useTranslation();
  
  const [state, setState] = useState<TeamManagementState>({
    teams: initialTeams,
    currentTeam: null,
    selectedTeam: null,
    newTeamName: "",
    newTeamDescription: "",
    isCreateDialogOpen: false,
    isEditDialogOpen: false,
    isViewTeamOpen: false,
    isManageMembersOpen: false,
    isDeleteDialogOpen: false,
  });

  const updateState = (updates: Partial<TeamManagementState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Get available employees for a specific team (excluding current members)
  const getAvailableEmployeesForTeam = (teamId: number) => {
    const team = state.teams.find(t => t.id === teamId);
    if (!team) return availableEmployees;
    
    const memberIds = team.members.map(member => member.id);
    return availableEmployees.filter(employee => !memberIds.includes(employee.id));
  };

  // Create a new team
  const handleCreateTeam = () => {
    if (state.newTeamName.trim() === "") {
      toast.error(t("Team name is required"));
      return;
    }
    
    const newTeam: Team = {
      id: state.teams.length + 1,
      name: state.newTeamName,
      description: state.newTeamDescription,
      members: [],
      activeMissions: 0
    };
    
    updateState({
      teams: [...state.teams, newTeam],
      newTeamName: "",
      newTeamDescription: "",
      isCreateDialogOpen: false
    });
    toast.success(t("Team created successfully"));
  };
  
  // Edit an existing team
  const handleEditTeam = () => {
    if (!state.currentTeam || state.newTeamName.trim() === "") {
      toast.error(t("Invalid team data"));
      return;
    }
    
    const updatedTeams = state.teams.map(team => 
      team.id === state.currentTeam!.id 
        ? { ...team, name: state.newTeamName, description: state.newTeamDescription } 
        : team
    );
    
    updateState({
      teams: updatedTeams,
      currentTeam: null,
      newTeamName: "",
      newTeamDescription: "",
      isEditDialogOpen: false
    });
    toast.success(t("Team updated successfully"));
  };

  // Delete a team
  const handleDeleteTeam = () => {
    if (!state.currentTeam) return;
    
    const updatedTeams = state.teams.filter(team => team.id !== state.currentTeam!.id);
    updateState({
      teams: updatedTeams,
      currentTeam: null,
      isDeleteDialogOpen: false
    });
    toast.success(t("Team deleted successfully"));
  };
  
  // Open edit dialog
  const openEditDialog = (team: Team) => {
    updateState({
      currentTeam: team,
      newTeamName: team.name,
      newTeamDescription: team.description,
      isEditDialogOpen: true
    });
  };

  // Open delete dialog
  const openDeleteDialog = (team: Team) => {
    updateState({
      currentTeam: team,
      isDeleteDialogOpen: true
    });
  };
  
  // View team details
  const viewTeam = (team: Team) => {
    updateState({
      selectedTeam: team,
      isViewTeamOpen: true
    });
  };
  
  // Open manage members dialog
  const openManageMembersDialog = (team: Team) => {
    updateState({
      currentTeam: team,
      isManageMembersOpen: true
    });
  };
  
  // Add member to team
  const addMemberToTeam = (teamId: number, member: TeamMember) => {
    const updatedTeams = state.teams.map(team => {
      if (team.id === teamId) {
        // Check if member is already in the team
        if (team.members.some(m => m.id === member.id)) {
          toast.error(t("Member already in the team"));
          return team;
        }
        return {
          ...team,
          members: [...team.members, member]
        };
      }
      return team;
    });
    
    const updatedCurrentTeam = updatedTeams.find(t => t.id === teamId);
    updateState({
      teams: updatedTeams,
      currentTeam: state.currentTeam && state.currentTeam.id === teamId ? updatedCurrentTeam || null : state.currentTeam
    });
    toast.success(`${member.name} ${t("added to team")}`);
  };
  
  // Remove member from team
  const removeMemberFromTeam = (teamId: number, memberId: number) => {
    const updatedTeams = state.teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          members: team.members.filter(m => m.id !== memberId)
        };
      }
      return team;
    });
    
    const updatedCurrentTeam = updatedTeams.find(t => t.id === teamId);
    updateState({
      teams: updatedTeams,
      currentTeam: state.currentTeam && state.currentTeam.id === teamId ? updatedCurrentTeam || null : state.currentTeam
    });
    toast.success(t("Member removed from team"));
  };

  return {
    state,
    updateState,
    getAvailableEmployeesForTeam,
    handleCreateTeam,
    handleEditTeam,
    handleDeleteTeam,
    openEditDialog,
    openDeleteDialog,
    viewTeam,
    openManageMembersDialog,
    addMemberToTeam,
    removeMemberFromTeam,
    availableEmployees
  };
}
