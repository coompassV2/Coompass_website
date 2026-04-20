import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Building2, Filter } from "lucide-react";
import { PartnerDetailDialog } from "./PartnerDetailDialog";
import { AddPartnerDialog } from "./AddPartnerDialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface NonprofitPartnersDirectoryProps {
  searchQuery: string;
}

export function NonprofitPartnersDirectory({ searchQuery }: NonprofitPartnersDirectoryProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [industryFilters, setIndustryFilters] = useState<string[]>([]);
  const [partners, setPartners] = useState([
    {
      id: 1,
      name: "Tech Solutions Inc.",
      industry: "Technology",
      partnershipType: "Corporate Volunteer Program",
      status: "Active",
      collaborations: 12,
      location: "San Francisco, CA",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=TechSolutions",
      contactPerson: "John Smith",
      since: "January 2023"
    },
    {
      id: 2,
      name: "Green Energy Co.",
      industry: "Energy",
      partnershipType: "Impact Investment",
      status: "Active",
      collaborations: 8,
      location: "Portland, OR",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=GreenEnergy",
      contactPerson: "Emma Davis",
      since: "March 2023"
    },
    {
      id: 3,
      name: "Global Finance Group",
      industry: "Finance",
      partnershipType: "Grant Provider",
      status: "Active",
      collaborations: 5,
      location: "New York, NY",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=GlobalFinance",
      contactPerson: "Michael Wong",
      since: "June 2023"
    },
    {
      id: 4,
      name: "Community Bank",
      industry: "Finance",
      partnershipType: "Sponsor",
      status: "Active",
      collaborations: 3,
      location: "Chicago, IL",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=CommunityBank",
      contactPerson: "Sarah Johnson",
      since: "October 2023"
    }
  ]);
  
  // Get all unique industries for the filter
  const industries = Array.from(new Set(partners.map(p => p.industry)));
  
  // Handle toggling industry filters
  const toggleIndustryFilter = (industry: string) => {
    setIndustryFilters(current => 
      current.includes(industry)
        ? current.filter(i => i !== industry)
        : [...current, industry]
    );
  };
  
  // Filter partners based on search query and industry filters
  const filteredPartners = partners.filter(partner => {
    const matchesSearch = !searchQuery || 
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.partnershipType.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = industryFilters.length === 0 || 
      industryFilters.includes(partner.industry);
    
    return matchesSearch && matchesIndustry;
  });
  
  // Handle viewing partner details
  const handleViewDetails = (partner: any) => {
    setSelectedPartner(partner);
    setIsDetailDialogOpen(true);
  };
  
  // Handle adding a new partner
  const handleAddPartner = (newPartner: any) => {
    setPartners(prev => [...prev, newPartner]);
    
    toast({
      title: t("Partner Added"),
      description: t("New partnership has been added successfully."),
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="glass-card p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-semibold">{t('Corporate Partners')}</h2>
          <div className="flex gap-1.5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs">
                  <Filter className="h-3.5 w-3.5 mr-1.5" />
                  {t('Filter')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {industries.map((industry) => (
                  <DropdownMenuCheckboxItem
                    key={industry}
                    checked={industryFilters.includes(industry)}
                    onCheckedChange={() => toggleIndustryFilter(industry)}
                  >
                    {industry}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="text-xs" onClick={() => setIsAddDialogOpen(true)}>
              <Building2 className="h-3.5 w-3.5 mr-1.5" />
              {t('Add Partner')}
            </Button>
          </div>
        </div>
        
        {filteredPartners.length === 0 ? (
          <div className="text-center py-5 text-muted-foreground text-sm">
            {t('No partners found matching your search criteria.')}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPartners.map((partner) => (
              <Card key={partner.id} className="p-3 hover:bg-accent/5 transition-colors">
                <div className="flex flex-col md:flex-row gap-3 items-center">
                  <div className="h-12 w-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                    <img src={partner.logo} alt={partner.name} className="h-full w-full object-cover" />
                  </div>
                  
                  <div className="flex-1 min-w-0 w-full md:w-auto">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1.5">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm truncate">{partner.name}</h3>
                        <p className="text-xs text-muted-foreground">{partner.industry} • {partner.location}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        <Badge className="bg-green-500/20 text-green-700 dark:bg-green-950 dark:text-green-400 text-[10px]">
                          {partner.status}
                        </Badge>
                        <Badge variant="outline" className="text-[10px]">{partner.partnershipType}</Badge>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-muted-foreground">
                        {t('Collaborations')}: {partner.collaborations}
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => handleViewDetails(partner)}
                      >
                        {t('View Details')}
                        <ArrowUpRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Partner Detail Dialog */}
      <PartnerDetailDialog 
        partner={selectedPartner}
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
      />
      
      {/* Add Partner Dialog */}
      <AddPartnerDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddPartner={handleAddPartner}
      />
    </div>
  );
}
