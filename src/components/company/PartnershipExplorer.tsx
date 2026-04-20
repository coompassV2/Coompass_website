
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/shared/SearchInput";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { PartnershipDetailsDialog } from "./PartnershipDetailsDialog";
import { useNavigate } from "react-router-dom";

interface PartnershipExplorerProps {
  onAddPartnership?: (orgId: number) => void;
}

export function PartnershipExplorer({ onAddPartnership }: PartnershipExplorerProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<any>(null);
  const navigate = useNavigate();
  
  // Mock recommended organizations data
  const recommendedOrgs = [
    {
      id: 1001,
      name: "Ocean Preservation Society",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Ocean Preservation Society",
      description: "Dedicated to protecting and preserving marine ecosystems",
      causes: ["Environmental", "Conservation", "Education"],
      matchScore: 95
    },
    {
      id: 1002,
      name: "Digital Education Access",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Digital Education Access",
      description: "Bridging the digital divide in underserved communities",
      causes: ["Education", "Technology", "Community"],
      matchScore: 88
    },
    {
      id: 1003,
      name: "Global Health Initiative",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Global Health Initiative",
      description: "Improving healthcare access in developing regions",
      causes: ["Healthcare", "International", "Research"],
      matchScore: 82
    }
  ];
  
  // Filter based on search query
  const filteredOrgs = searchQuery.trim() === "" 
    ? recommendedOrgs 
    : recommendedOrgs.filter(org => 
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.causes.some(cause => cause.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const handleLearnMore = (org: any) => {
    // Convert to partnership format for the dialog
    const partnershipData = {
      id: org.id,
      organization: {
        name: org.name,
        logo: org.logo,
        description: org.description,
        type: org.causes[0]
      },
      partnershipStatus: "Potential",
      partnershipType: "Not established",
      activeMissions: 0,
      totalHours: 0,
      impactScore: org.matchScore
    };
    
    setSelectedOrg(partnershipData);
    setIsDetailsDialogOpen(true);
  };

  const handleConnect = (orgId: number, orgName: string) => {
    // Add the partnership with pending status
    if (onAddPartnership) {
      onAddPartnership(orgId);
    }
    
    toast({
      title: "Partnership Request Sent",
      description: `Connection request sent to ${orgName}. They will appear in your partnerships list with pending status.`
    });
  };

  const handleViewAllPartners = () => {
    navigate("/organizations");
  };

  return (
    <div className="glass-card w-full">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold break-words">{t('Discover Partners')}</h2>
              <p className="text-sm text-muted-foreground break-words">{t('Recommended organizations for partnership')}</p>
            </div>
          </div>
          
          <div className="w-full">
            <SearchInput
              placeholder={t("Search organizations...")}
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {filteredOrgs.map((org) => (
            <div key={org.id} className="flex flex-col md:flex-row gap-6 items-start p-4 rounded-lg border border-border hover:bg-foreground/5 transition-colors">
              <div className="w-16 h-16 rounded-lg bg-foreground/5 flex items-center justify-center p-2">
                <img 
                  src={org.logo}
                  alt={org.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h3 className="font-semibold text-base">{org.name}</h3>
                </div>
                
                <p className="text-sm text-muted-foreground my-2">{org.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {org.causes.map((cause, idx) => (
                    <Badge key={idx} variant="outline" className="bg-foreground/5">
                      {cause}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 self-end mt-4 md:mt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleLearnMore(org)}
                >
                  {t('Learn More')}
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => handleConnect(org.id, org.name)}
                >
                  {t('Connect')}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={handleViewAllPartners}>
            {t('View All Potential Partners')}
          </Button>
        </div>
      </div>

      {/* Organization details dialog */}
      <PartnershipDetailsDialog 
        partnership={selectedOrg}
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
      />
    </div>
  );
}
