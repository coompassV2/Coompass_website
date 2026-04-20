
import { useState } from "react";
import { useOrganizations } from "./useOrganizations";
import { Partnership } from "@/types/partnerships";

export function usePartnershipsData() {
  const { getPartnerOrganizations, handlePartnershipToggle, addPartnership } = useOrganizations();
  const [selectedPartnership, setSelectedPartnership] = useState<Partnership | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isManageSheetOpen, setIsManageSheetOpen] = useState(false);
  const [pendingPartnerships, setPendingPartnerships] = useState<Partnership[]>([]);

  // Generate partnerships data from organizations
  const generatePartnerships = (): Partnership[] => {
    // Get partner organizations
    const partnerOrgs = getPartnerOrganizations();
    
    // Convert to partnerships format
    const activePartnerships: Partnership[] = partnerOrgs.map(org => ({
      id: org.id,
      organization: {
        name: org.name,
        logo: `https://api.dicebear.com/7.x/shapes/svg?seed=${org.name}`,
        description: org.description || "",
        type: org.tags?.[0] || "Nonprofit"
      },
      partnershipStatus: "Active",
      partnershipType: org.goals?.length && org.goals.length > 3 ? "Strategic" : "Project-based",
      activeMissions: org.activeMissions || 1,
      totalHours: Math.floor(Math.random() * 100 + 20),
      impactScore: Math.floor(Math.random() * 30 + 70)
    }));

    // Add some default pending partnerships
    const defaultPendingPartnerships: Partnership[] = [
      {
        id: 999,
        organization: {
          name: "Elder Care Association",
          logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Elder Care Association",
          description: "Supporting elderly community members with care and resources",
          type: "Healthcare"
        },
        partnershipStatus: "Pending",
        partnershipType: "Project-based",
        activeMissions: 0,
        totalHours: 0,
        impactScore: 0
      }
    ];

    // Combine active, default pending, and new pending partnerships
    return [...activePartnerships, ...defaultPendingPartnerships, ...pendingPartnerships];
  };

  const allPartnerships = generatePartnerships();

  const handleViewDetails = (partnership: Partnership) => {
    setSelectedPartnership(partnership);
    setIsDetailsDialogOpen(true);
  };

  const handleManagePartnership = (partnership: Partnership) => {
    // Always open the management sheet for consistent behavior
    setSelectedPartnership(partnership);
    setIsManageSheetOpen(true);
  };

  const handleAddMultiplePartnerships = (orgIds: number[]) => {
    // Add partnerships for each selected organization
    orgIds.forEach(orgId => {
      addPartnership(orgId);
    });
  };

  const addPartnershipFromExplorer = (orgId: number) => {
    // Create pending partnership from explorer organizations
    const explorerOrgs = [
      {
        id: 1001,
        name: "Ocean Preservation Society",
        logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Ocean Preservation Society",
        description: "Dedicated to protecting and preserving marine ecosystems",
        causes: ["Environmental", "Conservation", "Education"]
      },
      {
        id: 1002,
        name: "Digital Education Access",
        logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Digital Education Access",
        description: "Bridging the digital divide in underserved communities",
        causes: ["Education", "Technology", "Community"]
      },
      {
        id: 1003,
        name: "Global Health Initiative",
        logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Global Health Initiative",
        description: "Improving healthcare access in developing regions",
        causes: ["Healthcare", "International", "Research"]
      }
    ];

    const org = explorerOrgs.find(o => o.id === orgId);
    if (org) {
      const newPendingPartnership: Partnership = {
        id: orgId,
        organization: {
          name: org.name,
          logo: org.logo,
          description: org.description,
          type: org.causes[0]
        },
        partnershipStatus: "Pending",
        partnershipType: "Project-based",
        activeMissions: 0,
        totalHours: 0,
        impactScore: 0
      };

      setPendingPartnerships(prev => [...prev, newPendingPartnership]);
    }
  };

  return {
    partnerships: allPartnerships,
    selectedPartnership,
    isDetailsDialogOpen,
    isAddDialogOpen,
    isManageSheetOpen,
    setIsDetailsDialogOpen,
    setIsAddDialogOpen,
    setIsManageSheetOpen,
    handleViewDetails,
    handleManagePartnership,
    addPartnership: handleAddMultiplePartnerships,
    addPartnershipFromExplorer
  };
}
