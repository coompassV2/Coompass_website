
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { brisaCompanies } from "@/data/brisa-companies";

interface AddPartnerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPartner: (partner: any) => void;
}

export function AddPartnerDialog({ open, onOpenChange, onAddPartner }: AddPartnerDialogProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  // Mock additional registered companies beyond Brisa companies
  const registeredCompanies = [
    ...brisaCompanies.map(company => ({
      id: company.id,
      name: company.name,
      industry: "Infrastructure & Technology"
    })),
    {
      id: "tech-solutions",
      name: "Tech Solutions Inc.",
      industry: "Technology"
    },
    {
      id: "green-energy",
      name: "Green Energy Co.",
      industry: "Energy"
    },
    {
      id: "community-bank",
      name: "Community Bank",
      industry: "Financial Services"
    },
    {
      id: "global-retail",
      name: "Global Retail Corp.",
      industry: "Retail"
    },
    {
      id: "healthcare-plus",
      name: "HealthCare Plus",
      industry: "Healthcare"
    },
    {
      id: "eco-manufacturing",
      name: "Eco Manufacturing Ltd.",
      industry: "Manufacturing"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCompany) {
      toast({
        title: t("Selection Required"),
        description: t("Please select a company to add as partner."),
        variant: "destructive"
      });
      return;
    }

    const company = registeredCompanies.find(c => c.id === selectedCompany);
    
    if (company) {
      // Add partner with selected company data
      onAddPartner({
        id: Date.now(),
        name: company.name,
        industry: company.industry,
        status: "Pending"
      });
      
      // Show success message
      toast({
        title: t("Partner Added"),
        description: t("Partnership request sent to {{companyName}} successfully.", { companyName: company.name }),
      });
      
      // Reset and close
      setSelectedCompany("");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setSelectedCompany("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("Add Corporate Partner")}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">{t("Select Company")}</Label>
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger id="company">
                <SelectValue placeholder={t("Choose a registered company...")} />
              </SelectTrigger>
              <SelectContent>
                {registeredCompanies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{company.name}</span>
                      <span className="text-xs text-muted-foreground">{company.industry}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
            {t("Selected companies are verified organizations registered on the Coompass platform. Partnership requests will be sent directly to their administrators.")}
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
            >
              {t("Cancel")}
            </Button>
            <Button type="submit" disabled={!selectedCompany}>
              {t("Send Partnership Request")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
