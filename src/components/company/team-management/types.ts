
export interface TeamMember {
  id: number;
  name: string;
  avatar: string;
}

export interface Team {
  id: number;
  name: string;
  description: string;
  members: TeamMember[];
  activeMissions: number;
}

export interface TeamManagementState {
  teams: Team[];
  currentTeam: Team | null;
  selectedTeam: Team | null;
  newTeamName: string;
  newTeamDescription: string;
  isCreateDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isViewTeamOpen: boolean;
  isManageMembersOpen: boolean;
  isDeleteDialogOpen: boolean;
}
