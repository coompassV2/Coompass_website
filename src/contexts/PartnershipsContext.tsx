import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import { organizationsData } from '@/data/organizations';
import { Organization } from '@/types/organization';
import { toast } from '@/hooks/use-toast';

interface PartnershipsContextType {
  organizations: Organization[];
  partnerOrganizations: Organization[];
  nonPartnerOrganizations: Organization[];
  handlePartnershipToggle: (orgId: number | string) => void;
  getFilteredOrganizations: (searchValue: string, isPartner: boolean) => Organization[];
}

const PartnershipsContext = createContext<PartnershipsContextType | undefined>(undefined);

interface PartnershipsProviderProps {
  children: ReactNode;
}

export function PartnershipsProvider({ children }: PartnershipsProviderProps) {
  const [organizations, setOrganizations] = useState<Organization[]>(
    organizationsData.map(org => ({
      ...org,
      isPartner: [1, 3, 5, 8].includes(org.id), // Set some organizations as partners
    }))
  );

  const partnerOrganizations = organizations.filter(org => org.isPartner);
  const nonPartnerOrganizations = organizations.filter(org => !org.isPartner);

  const handlePartnershipToggle = useCallback((orgId: number | string) => {
    setOrganizations(orgs => orgs.map(org => {
      if (org.id === orgId) {
        const newStatus = !org.isPartner;
        
        toast({
          title: newStatus 
            ? `Partnership established with ${org.name}` 
            : `Partnership terminated with ${org.name}`,
          description: newStatus 
            ? "You can now collaborate on missions together." 
            : "All partnership activities have been concluded.",
        });
        
        return {
          ...org,
          isPartner: newStatus
        };
      }
      return org;
    }));
  }, []);

  const getFilteredOrganizations = useCallback((searchValue: string, isPartner: boolean) => {
    return organizations
      .filter(org => org.isPartner === isPartner)
      .filter(org => {
        if (!searchValue) return true;
        const searchLower = searchValue.toLowerCase();
        return (
          org.name.toLowerCase().includes(searchLower) ||
          org.description?.toLowerCase().includes(searchLower) ||
          org.tags?.some(tag => tag.toLowerCase().includes(searchLower))
        );
      });
  }, [organizations]);

  const value = {
    organizations,
    partnerOrganizations,
    nonPartnerOrganizations,
    handlePartnershipToggle,
    getFilteredOrganizations
  };

  return (
    <PartnershipsContext.Provider value={value}>
      {children}
    </PartnershipsContext.Provider>
  );
}

export function usePartnerships() {
  const context = useContext(PartnershipsContext);
  if (!context) {
    throw new Error('usePartnerships must be used within a PartnershipsProvider');
  }
  return context;
}
