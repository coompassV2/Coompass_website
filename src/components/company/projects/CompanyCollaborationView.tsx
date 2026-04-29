
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { FilterCollaborationsDialog, CollaborationFilters } from "./FilterCollaborationsDialog";
import { ViewCollaborationDetailsDialog } from "./ViewCollaborationDetailsDialog";
import { ViewOrganizationProfileDialog } from "./ViewOrganizationProfileDialog";
import { SendCollaborationInviteDialog } from "./SendCollaborationInviteDialog";
import { CollaborationRequestsSection } from "./CollaborationRequestsSection";
import { PotentialOpportunitiesSection } from "./PotentialOpportunitiesSection";

export function CompanyCollaborationView() {
  const { t } = useTranslation();
  
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [selectedCollaboration, setSelectedCollaboration] = useState<any>(null);
  const [selectedOrganization, setSelectedOrganization] = useState<string | null>(null);
  const [filters, setFilters] = useState<CollaborationFilters>({
    status: [],
    projectType: [],
    sdgs: []
  });
  
  // Mock data for collaboration requests
  const [collaborations, setCollaborations] = useState([
    {
      id: 1,
      organizationName: "Pista Mágica",
      projectTitle: "Digital Literacy Workshop",
      requestDate: "Apr 5, 2025",
      status: "pending",
      description: "Requesting collaboration on digital literacy workshops for underserved communities",
      projectType: "Education",
      sdgs: ["Quality Education", "Reduced Inequalities"]
    },
    {
      id: 2,
      organizationName: "Clean Seas",
      projectTitle: "Ocean Cleanup Campaign",
      requestDate: "Apr 3, 2025",
      status: "accepted",
      description: "Partnership for beach cleanup and plastic reduction initiative",
      projectType: "Environmental",
      sdgs: ["Life Below Water", "Climate Action"]
    },
    {
      id: 3,
      organizationName: "CEPAC",
      projectTitle: "Youth Mentorship Program",
      requestDate: "Mar 28, 2025",
      status: "pending",
      description: "Corporate mentorship program for at-risk youth",
      projectType: "Social",
      sdgs: ["Quality Education", "Reduced Inequalities"]
    },
    {
      id: 4,
      organizationName: "Associacao CAIS",
      projectTitle: "Workforce Development",
      requestDate: "Mar 20, 2025",
      status: "declined",
      description: "Skills training program for homeless individuals",
      projectType: "Social",
      sdgs: ["Decent Work", "No Poverty"]
    },
    {
      id: 5,
      organizationName: "Future Leaders",
      projectTitle: "Leadership Workshop",
      requestDate: "Mar 15, 2025",
      status: "accepted",
      description: "Workshop series on leadership skills for high school students",
      projectType: "Education",
      sdgs: ["Quality Education"]
    }
  ]);

  // Filter collaborations based on current filters
  const filteredCollaborations = collaborations.filter(collab => {
    if (filters.status.length > 0 && !filters.status.includes(collab.status)) {
      return false;
    }
    if (filters.projectType.length > 0 && !filters.projectType.includes(collab.projectType)) {
      return false;
    }
    if (filters.sdgs.length > 0 && !filters.sdgs.some(sdg => collab.sdgs.includes(sdg))) {
      return false;
    }
    return true;
  });

  const potentialOrganizations = ["Digital Age Connect", "Serve The City", "Crescer"];

  const handleAcceptCollaboration = (collaborationId: number) => {
    setCollaborations(prev => prev.map(collab => 
      collab.id === collaborationId 
        ? { ...collab, status: "accepted" }
        : collab
    ));
    toast.success(t('Collaboration request accepted!'));
  };

  const handleDeclineCollaboration = (collaborationId: number) => {
    setCollaborations(prev => prev.map(collab => 
      collab.id === collaborationId 
        ? { ...collab, status: "declined" }
        : collab
    ));
    toast.success(t('Collaboration request declined'));
  };

  const handleViewDetails = (collaboration: any) => {
    setSelectedCollaboration(collaboration);
    setIsDetailsDialogOpen(true);
  };

  const handleViewProfile = (organizationName: string) => {
    setSelectedOrganization(organizationName);
    setIsProfileDialogOpen(true);
  };

  const handleInviteOrganization = (organizationName: string) => {
    setSelectedOrganization(organizationName);
    setIsInviteDialogOpen(true);
  };

  const handleSendInvite = (inviteData: any) => {
    toast.success(t('Collaboration invite sent successfully!'), {
      description: t('{{orgName}} will receive your proposal and respond within 5-7 business days', { 
        orgName: inviteData.organizationName 
      })
    });
    
    // You could add the sent invite to a tracking list here
    console.log('Invite sent:', inviteData);
  };

  const handleApplyFilters = (newFilters: CollaborationFilters) => {
    setFilters(newFilters);
  };

  const hasActiveFilters = filters.status.length > 0 || filters.projectType.length > 0 || filters.sdgs.length > 0;

  return (
    <div className="w-full max-w-full space-y-6">
      <CollaborationRequestsSection
        collaborations={filteredCollaborations}
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        onFilterClick={() => setIsFilterDialogOpen(true)}
        onAcceptCollaboration={handleAcceptCollaboration}
        onDeclineCollaboration={handleDeclineCollaboration}
        onViewDetails={handleViewDetails}
      />
      
      <PotentialOpportunitiesSection
        organizations={potentialOrganizations}
        onViewProfile={handleViewProfile}
        onInviteOrganization={handleInviteOrganization}
      />

      {/* Dialogs */}
      <FilterCollaborationsDialog
        isOpen={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />

      <ViewCollaborationDetailsDialog
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        collaboration={selectedCollaboration}
      />

      <ViewOrganizationProfileDialog
        isOpen={isProfileDialogOpen}
        onClose={() => setIsProfileDialogOpen(false)}
        organization={selectedOrganization}
        onInvite={handleInviteOrganization}
      />

      <SendCollaborationInviteDialog
        isOpen={isInviteDialogOpen}
        onClose={() => setIsInviteDialogOpen(false)}
        organizationName={selectedOrganization}
        onSendInvite={handleSendInvite}
      />
    </div>
  );
}
