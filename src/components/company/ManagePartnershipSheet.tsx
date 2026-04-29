
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, FileText, Mail, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RemovePartnershipDialog } from "./RemovePartnershipDialog";

interface ManagePartnershipSheetProps {
  partnership: {
    id: number;
    organization: {
      name: string;
    };
    partnershipStatus: string;
    partnershipType: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (partnershipId: number, data: any) => void;
}

export function ManagePartnershipSheet({ partnership, isOpen, onClose, onUpdate }: ManagePartnershipSheetProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  const handleSave = () => {
    toast({
      title: t("Partnership Updated"),
      description: t("Your changes have been saved successfully."),
    });
    
    if (onUpdate && partnership) {
      onUpdate(partnership.id, {
        // In a real application, we would collect form data here
        updated: true,
      });
    }
    
    onClose();
  };

  const handleRemovePartnership = () => {
    if (partnership) {
      toast({
        title: t("Partnership Removed"),
        description: t("The partnership with {{organizationName}} has been ended.", {
          organizationName: partnership.organization.name
        }),
        variant: "destructive",
      });
      
      // In a real application, we would call an API to remove the partnership
      console.log("Removing partnership with ID:", partnership.id);
      
      onClose();
    }
  };

  if (!partnership) return null;

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>{t("Manage Partnership")}: {partnership.organization.name}</SheetTitle>
            <SheetDescription>
              {t("Update partnership details, manage missions, and set partnership goals.")}
            </SheetDescription>
          </SheetHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-4 gap-2">
              <TabsTrigger value="details">
                <FileText className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{t("Details")}</span>
              </TabsTrigger>
              <TabsTrigger value="missions">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{t("Missions")}</span>
              </TabsTrigger>
              <TabsTrigger value="contacts">
                <Mail className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{t("Contacts")}</span>
              </TabsTrigger>
              <TabsTrigger value="team">
                <UserPlus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{t("Team")}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("Partnership Type")}</Label>
                  <Select defaultValue={partnership.partnershipType}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("Select partnership type")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Strategic">{t("Strategic")}</SelectItem>
                      <SelectItem value="Project-based">{t("Project-based")}</SelectItem>
                      <SelectItem value="Financial">{t("Financial")}</SelectItem>
                      <SelectItem value="Resource-sharing">{t("Resource-sharing")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t("Partnership Status")}</Label>
                  <Select defaultValue={partnership.partnershipStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("Select partnership status")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">{t("Active")}</SelectItem>
                      <SelectItem value="Pending">{t("Pending")}</SelectItem>
                      <SelectItem value="On Hold">{t("On Hold")}</SelectItem>
                      <SelectItem value="Completed">{t("Completed")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>{t("Partnership Goals")}</Label>
                  <Textarea 
                    placeholder={t("Define the main goals of this partnership...")} 
                    rows={3} 
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t("Next Review Date")}</Label>
                  <Input type="date" />
                </div>

                <div className="space-y-2">
                  <Label>{t("Renewal Date")}</Label>
                  <Input type="date" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="missions" className="space-y-4">
              <div className="border border-border rounded-md p-4 text-center">
                <p className="text-muted-foreground mb-4">{t("No active missions with this partner yet.")}</p>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  {t("Create New Mission")}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="contacts" className="space-y-4">
              <div className="space-y-4">
                <div className="border border-border rounded-md p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">Sarah Johnson</h4>
                      <p className="text-sm text-muted-foreground">{t("Partnership Manager")}</p>
                      <p className="text-sm">sarah@example.org</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      {t("Email")}
                    </Button>
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  {t("Add Contact")}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-4">
              <div className="border border-border rounded-md p-4 text-center">
                <p className="text-muted-foreground mb-4">{t("No team members assigned to this partnership.")}</p>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  {t("Assign Team Members")}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between gap-3 mt-8 border-t pt-4">
            <Button 
              variant="destructive" 
              onClick={() => setIsRemoveDialogOpen(true)}
            >
              {t("Remove Partnership")}
            </Button>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                {t("Cancel")}
              </Button>
              <Button onClick={handleSave}>
                {t("Save Changes")}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <RemovePartnershipDialog
        partnership={partnership}
        isOpen={isRemoveDialogOpen}
        onClose={() => setIsRemoveDialogOpen(false)}
        onConfirm={handleRemovePartnership}
      />
    </>
  );
}
