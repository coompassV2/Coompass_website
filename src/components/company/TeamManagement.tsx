
import { TeamManagementHeader } from "./team-management/TeamManagementHeader";
import { TeamCard } from "./team-management/TeamCard";
import { CreateTeamDialog } from "./team-management/dialogs/CreateTeamDialog";
import { EditTeamDialog } from "./team-management/dialogs/EditTeamDialog";
import { DeleteTeamDialog } from "./team-management/dialogs/DeleteTeamDialog";
import { ManageMembersDialog } from "./team-management/dialogs/ManageMembersDialog";
import { ViewTeamDialog } from "./team-management/dialogs/ViewTeamDialog";
import { useTeamManagement } from "./team-management/hooks/useTeamManagement";

export function TeamManagement() {
  const {
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
  } = useTeamManagement();

  return (
    <div className="space-y-6">
      <TeamManagementHeader 
        onCreateTeam={() => updateState({ isCreateDialogOpen: true })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            onEdit={openEditDialog}
            onDelete={openDeleteDialog}
            onManageMembers={openManageMembersDialog}
            onViewTeam={viewTeam}
          />
        ))}
      </div>

      <CreateTeamDialog
        isOpen={state.isCreateDialogOpen}
        onClose={() => updateState({ isCreateDialogOpen: false })}
        onConfirm={handleCreateTeam}
        teamName={state.newTeamName}
        teamDescription={state.newTeamDescription}
        onTeamNameChange={(value) => updateState({ newTeamName: value })}
        onTeamDescriptionChange={(value) => updateState({ newTeamDescription: value })}
      />

      <EditTeamDialog
        isOpen={state.isEditDialogOpen}
        onClose={() => updateState({ isEditDialogOpen: false })}
        onConfirm={handleEditTeam}
        teamName={state.newTeamName}
        teamDescription={state.newTeamDescription}
        onTeamNameChange={(value) => updateState({ newTeamName: value })}
        onTeamDescriptionChange={(value) => updateState({ newTeamDescription: value })}
      />

      <DeleteTeamDialog
        isOpen={state.isDeleteDialogOpen}
        onClose={() => updateState({ isDeleteDialogOpen: false })}
        onConfirm={handleDeleteTeam}
      />

      <ManageMembersDialog
        isOpen={state.isManageMembersOpen}
        onClose={() => updateState({ isManageMembersOpen: false })}
        team={state.currentTeam}
        availableEmployees={state.currentTeam ? getAvailableEmployeesForTeam(state.currentTeam.id) : []}
        onAddMember={addMemberToTeam}
        onRemoveMember={removeMemberFromTeam}
      />

      <ViewTeamDialog
        isOpen={state.isViewTeamOpen}
        onClose={() => updateState({ isViewTeamOpen: false })}
        team={state.selectedTeam}
      />
    </div>
  );
}
