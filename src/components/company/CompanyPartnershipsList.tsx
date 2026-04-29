
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PartnershipDetailsDialog } from "./PartnershipDetailsDialog";
import { AddPartnershipDialog } from "./AddPartnershipDialog";
import { ManagePartnershipSheet } from "./ManagePartnershipSheet";
import { PartnershipsList } from "./PartnershipsList";
import { usePartnershipsData } from "@/hooks/usePartnershipsData";

export function CompanyPartnershipsList() {
  const { t } = useTranslation();
  const { 
    partnerships,
    selectedPartnership,
    isDetailsDialogOpen,
    isAddDialogOpen,
    isManageSheetOpen,
    setIsDetailsDialogOpen,
    setIsAddDialogOpen,
    setIsManageSheetOpen,
    handleViewDetails,
    handleManagePartnership,
    addPartnership,
    addPartnershipFromExplorer
  } = usePartnershipsData();

  return (
    <div className="glass-card">
      <div className="p-6 flex justify-between items-center border-b border-border">
        <div>
          <h2 className="text-xl font-semibold">{t('Partnerships')}</h2>
          <p className="text-sm text-muted-foreground">{t('Current organization partnerships')}</p>
        </div>
        
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {t('Add Partnership')}
        </Button>
      </div>
      
      <PartnershipsList 
        partnerships={partnerships}
        onViewDetails={handleViewDetails}
        onManagePartnership={handleManagePartnership}
        onAddPartnershipFromExplorer={addPartnershipFromExplorer}
      />

      {/* Partnership details dialog */}
      <PartnershipDetailsDialog 
        partnership={selectedPartnership}
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
      />

      {/* Add partnership dialog */}
      <AddPartnershipDialog 
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddPartner={addPartnership}
      />

      {/* Manage partnership sheet */}
      <ManagePartnershipSheet
        partnership={selectedPartnership}
        isOpen={isManageSheetOpen}
        onClose={() => setIsManageSheetOpen(false)}
      />
    </div>
  );
}
