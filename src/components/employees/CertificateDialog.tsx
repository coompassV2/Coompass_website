
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { SDGs } from "@/data/sdgs";
import { goalColors } from "@/components/organizations/GoalBadge";
import { translateSdgName } from "@/utils/sdgI18n";

interface CertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CertificateDialog({ open, onOpenChange }: CertificateDialogProps) {
  const { t } = useTranslation();

  const stats = [
    { label: "Collaborators on missions", value: "0" },
    { label: "Volunteer hours provided", value: "0" },
    { label: "Company-Wide Participation Rate", value: "0%" },
    { label: "Initiatives supported", value: "0" },
  ];

  const supportedCauses = ["Arts & Culture", "Computers & Technology", "Media & Broadcasting"];
  const skillsRequired = ["Family Support", "Youth Mentoring", "Recycling", "Advocacy", "Web Design"];
  const organizations = ["Acreditar", "Associação Salvador", "Espaço T", "Vila Com Vida", "CASA"];
  const locations = ["Aveiro", "Lisbon", "Porto", "Faro", "Vila Real", "Guarda", "Santarém"];
  const selectedSDGs = [1, 3, 4, 10, 17]; // Example SDGs

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] bg-black text-white">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl">{t("Your Social Impact Certificate")}</DialogTitle>
          <div className="text-sm text-gray-400">
            From 14/05/2024 To 14/05/2025
          </div>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {/* Company Logo */}
          <div className="text-center">
            <img 
              src="/lovable-uploads/31ccca6c-a56a-44f7-b999-e96f2fda4c18.png" 
              alt="Venture Partners"
              className="h-12 mx-auto"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* SDGs */}
          <div className="space-y-2">
            <h4 className="text-sm text-gray-400">Social Development Goals Addressed <span className="text-white">({selectedSDGs.length})</span></h4>
            <div className="flex flex-wrap gap-2">
              {selectedSDGs.map((sdgId) => (
                <Badge 
                  key={sdgId} 
                  className="px-3 py-1 font-medium text-white"
                  style={{ backgroundColor: goalColors[sdgId] }}
                >
                  {sdgId}. {translateSdgName(SDGs.find((sdg) => sdg.id === sdgId) ?? { id: sdgId, name: `SDG ${sdgId}` }, t)}
                </Badge>
              ))}
            </div>
          </div>

          {/* Supported Causes */}
          <div className="space-y-2">
            <h4 className="text-sm text-gray-400">Supported Causes <span className="text-white">({supportedCauses.length})</span></h4>
            <div className="flex flex-wrap gap-2">
              {supportedCauses.map((cause) => (
                <Badge key={cause} variant="outline" className="bg-muted/50">
                  {cause}
                </Badge>
              ))}
            </div>
          </div>

          {/* Skills Required */}
          <div className="space-y-2">
            <h4 className="text-sm text-gray-400">Skills Leveraged from Employees <span className="text-white">({skillsRequired.length})</span></h4>
            <div className="flex flex-wrap gap-2">
              {skillsRequired.map((skill) => (
                <Badge key={skill} variant="outline" className="bg-muted/50">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Social Organizations */}
          <div className="space-y-2">
            <h4 className="text-sm text-gray-400">Social Organizations Partnered With <span className="text-white">({organizations.length})</span></h4>
            <div className="flex flex-wrap gap-2">
              {organizations.map((org) => (
                <Badge key={org} variant="outline" className="bg-muted/50">
                  {org}
                </Badge>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-2">
            <h4 className="text-sm text-gray-400">Countries & Regions Covered <span className="text-white">({locations.length})</span></h4>
            <div className="flex flex-wrap gap-2">
              {locations.map((location) => (
                <Badge key={location} variant="outline" className="bg-muted/50">
                  {location}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-gray-800 text-white hover:bg-gray-700"
          >
            {t("Go back")}
          </Button>
          <Button
            onClick={() => {
              console.log("Download PNG");
              onOpenChange(false);
            }}
            className="bg-[#F2FCE2] text-black hover:bg-[#F2FCE2]/90"
          >
            {t("Download .png")}
          </Button>
          <Button
            onClick={() => {
              console.log("Download CSV");
              onOpenChange(false);
            }}
            className="bg-[#F2FCE2] text-black hover:bg-[#F2FCE2]/90"
          >
            {t("Download .csv")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
