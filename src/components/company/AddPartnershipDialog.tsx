
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";
import { Organization } from "@/types/organization";
import { SearchInput } from "@/components/shared/SearchInput";
import { Badge } from "@/components/ui/badge";
import { Check, ExternalLink, X } from "lucide-react";
import { useOrganizations } from "@/hooks/useOrganizations";

interface AddPartnershipDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPartner: (orgIds: number[]) => void;
}

export function AddPartnershipDialog({ isOpen, onClose, onAddPartner }: AddPartnershipDialogProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [partnershipType, setPartnershipType] = useState("");
  const { getNonPartnerOrganizations } = useOrganizations();
  const [selectedOrgs, setSelectedOrgs] = useState<number[]>([]);
  
  const availableOrgs = getNonPartnerOrganizations(searchQuery);

  const partnershipTypes = [
    { value: "strategic", label: t('Strategic') },
    { value: "project-based", label: t('Project-based') },
    { value: "regular", label: t('Regular') },
    { value: "occasional", label: t('Occasional') }
  ];

  const handleToggleOrg = (orgId: number) => {
    setSelectedOrgs(prev => 
      prev.includes(orgId) 
        ? prev.filter(id => id !== orgId)
        : [...prev, orgId]
    );
  };

  const handleRemoveOrg = (orgId: number) => {
    setSelectedOrgs(prev => prev.filter(id => id !== orgId));
  };

  const handleAddPartnerships = () => {
    if (selectedOrgs.length > 0 && partnershipType) {
      onAddPartner(selectedOrgs);
      onClose();
      setSelectedOrgs([]);
      setSearchQuery("");
      setPartnershipType("");
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedOrgs([]);
    setSearchQuery("");
    setPartnershipType("");
  };

  const getSelectedOrgNames = () => {
    return selectedOrgs.map(orgId => {
      const org = availableOrgs.find(o => o.id === orgId);
      return org ? org.name : '';
    }).filter(Boolean);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t('Add New Partnerships')}</DialogTitle>
          <DialogDescription>
            {t('Search for and connect with new partner organizations. You can select multiple organizations.')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="partnershipType">{t('Partnership Type')}</Label>
            <Select value={partnershipType} onValueChange={setPartnershipType}>
              <SelectTrigger id="partnershipType">
                <SelectValue placeholder={t('Select partnership type...')} />
              </SelectTrigger>
              <SelectContent>
                {partnershipTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Organizations Display */}
          {selectedOrgs.length > 0 && (
            <div className="space-y-2">
              <Label>{t('Selected Organizations')} ({selectedOrgs.length})</Label>
              <div className="flex flex-wrap gap-2">
                {getSelectedOrgNames().map((orgName, index) => (
                  <Badge key={selectedOrgs[index]} variant="secondary" className="px-2 py-1 flex items-center gap-1">
                    {orgName}
                    <button
                      type="button"
                      onClick={() => handleRemoveOrg(selectedOrgs[index])}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <SearchInput
            placeholder={t("Search organizations...")}
            value={searchQuery}
            onChange={setSearchQuery}
          />
          
          <div className="max-h-[400px] overflow-y-auto space-y-3">
            {availableOrgs.length === 0 ? (
              <div className="text-center p-8 text-muted-foreground">
                {searchQuery ? t('No organizations found matching your search') : t('No more organizations available for partnership')}
              </div>
            ) : (
              availableOrgs.map((org) => (
                <div 
                  key={org.id} 
                  className={`p-4 border flex gap-4 rounded-lg cursor-pointer transition-colors ${
                    selectedOrgs.includes(org.id) 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:bg-accent/5'
                  }`}
                  onClick={() => handleToggleOrg(org.id)}
                >
                  <div className="flex items-center">
                    <Checkbox
                      checked={selectedOrgs.includes(org.id)}
                      onCheckedChange={() => handleToggleOrg(org.id)}
                      className="mr-3"
                    />
                  </div>
                  
                  <div className="w-12 h-12 rounded-lg bg-foreground/5 flex items-center justify-center p-2">
                    <img 
                      src={`https://api.dicebear.com/7.x/shapes/svg?seed=${org.id}`}
                      alt={org.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{org.name}</h3>
                      {selectedOrgs.includes(org.id) && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">{org.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">
                        {t('Active Missions')}: {org.activeMissions || 0}
                      </Badge>
                      {org.tags?.slice(0, 2).map((tag, idx) => (
                        <Badge key={idx} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>{t('Cancel')}</Button>
          <Button 
            onClick={handleAddPartnerships}
            disabled={selectedOrgs.length === 0 || !partnershipType}
          >
            {t('Send Partnership Requests')} ({selectedOrgs.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
