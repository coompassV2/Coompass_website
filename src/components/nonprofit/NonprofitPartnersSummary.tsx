import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddPartnerDialog } from "./AddPartnerDialog";
import { useToast } from "@/hooks/use-toast";

export function NonprofitPartnersSummary() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [corporatePartners, setCorporatePartners] = useState([
    {
      id: 1,
      name: "Tech Solutions Inc.",
      type: "Technology",
      status: "active"
    },
    {
      id: 2,
      name: "Green Energy Co.",
      type: "Energy",
      status: "active"
    },
    {
      id: 3,
      name: "Community Bank",
      type: "Financial",
      status: "active"
    },
    {
      id: 4,
      name: "Global Retail",
      type: "Retail",
      status: "pending"
    }
  ]);
  
  // Handle adding a new partner
  const handleAddPartner = (newPartner: any) => {
    setCorporatePartners(prev => [
      ...prev, 
      { 
        id: newPartner.id,
        name: newPartner.name,
        type: newPartner.industry || "Business",
        status: "pending"
      }
    ]);
    
    toast({
      title: t("Partner Added"),
      description: t("New partnership has been added successfully."),
    });
  };
  
  // Handle view all partners
  const handleViewAll = () => {
    navigate("/nonprofit/partnerships", {
      state: { defaultTab: "directory" }
    });
  };
  
  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold mb-4">{t('Corporate Partners')}</h2>
      
      <div>
        <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground mb-2 px-3">
          <div>{t('Partner')}</div>
          <div>{t('Industry')}</div>
          <div className="text-right">{t('Status')}</div>
        </div>
        
        <div className="space-y-2">
          {corporatePartners.map((partner) => (
            <div 
              key={partner.id} 
              className="grid grid-cols-3 items-center p-3 border border-border rounded-md hover:bg-accent/5 transition-colors"
            >
              <div className="font-medium">{partner.name}</div>
              <div className="text-sm text-muted-foreground">{partner.type}</div>
              <div className="text-right">
                <Badge className={partner.status === "active" ? "bg-green-500/20 text-green-700" : "bg-amber-500/20 text-amber-700"}>
                  {partner.status === "active" ? t('Active') : t('Pending')}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2"
        >
          {t('Add Partner')}
        </Button>
        <Button 
          variant="link" 
          size="sm"
          onClick={handleViewAll}
        >
          {t('View All')}
        </Button>
      </div>
      
      {/* Add Partner Dialog */}
      <AddPartnerDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddPartner={handleAddPartner}
      />
    </div>
  );
}
