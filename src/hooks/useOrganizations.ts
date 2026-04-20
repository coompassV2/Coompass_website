
import { useState } from "react";
import { Organization } from "@/types/organization";
import { organizationsData } from "@/data/organizations";
import { useToast } from "@/hooks/use-toast";

export function useOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[]>(organizationsData);
  const { toast } = useToast();

  const handlePartnershipToggle = (orgId: number) => {
    setOrganizations(orgs => orgs.map(org => {
      if (org.id === orgId) {
        const newStatus = !org.isPartner;
        toast({
          title: newStatus ? "Partnership Added" : "Partnership Removed",
          description: `${org.name} has been ${newStatus ? 'added to' : 'removed from'} partnerships.`,
        });
        return { ...org, isPartner: newStatus };
      }
      return org;
    }));
  };

  const addPartnership = (orgId: number) => {
    setOrganizations(orgs => orgs.map(org => {
      if (org.id === orgId) {
        toast({
          title: "Partnership Added",
          description: `${org.name} has been added to your partnerships.`,
        });
        return { ...org, isPartner: true };
      }
      return org;
    }));
  };

  const getFilteredOrganizations = (searchValue: string, isPartnersList: boolean) => {
    return organizations.filter(org => {
      if (org.isPartner !== isPartnersList) return false;
      
      const searchLower = searchValue.toLowerCase();
      return (
        org.name.toLowerCase().includes(searchLower) ||
        (org.description && org.description.toLowerCase().includes(searchLower))
      );
    });
  };

  const getPartnerOrganizations = (searchValue: string = "") => {
    return getFilteredOrganizations(searchValue, true);
  };

  const getNonPartnerOrganizations = (searchValue: string = "") => {
    return getFilteredOrganizations(searchValue, false);
  };

  return {
    organizations,
    handlePartnershipToggle,
    addPartnership,
    getFilteredOrganizations,
    getPartnerOrganizations,
    getNonPartnerOrganizations
  };
}
