
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ImpactTrip } from "@/data/impactTrips";
import { 
  Calendar, 
  Map, 
  Clock, 
  Euro, 
  Users, 
  Heart,
  Globe,
  Camera,
  Share2
} from "lucide-react";
import { format } from "date-fns";

interface ImpactTripDetailsDialogProps {
  trip: ImpactTrip | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImpactTripDetailsDialog({ 
  trip, 
  open, 
  onOpenChange 
}: ImpactTripDetailsDialogProps) {
  const { t } = useTranslation();
  const [isApplying, setIsApplying] = useState(false);

  if (!trip) return null;

  const handleApply = async () => {
    setIsApplying(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsApplying(false);
    onOpenChange(false);
    // Here you would typically show a success toast
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{trip.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hero Image */}
          <div className="relative h-64 overflow-hidden rounded-lg">
            <img 
              src={trip.image} 
              alt={trip.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground font-medium">
                {trip.country}
              </Badge>
            </div>
          </div>

          {/* Organization Info */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-primary">{trip.organization}</h3>
              <p className="text-muted-foreground">{t("Impact Trip Provider")}</p>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              {t("Share")}
            </Button>
          </div>

          <Separator />

          {/* Key Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Map className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{t("Location")}</p>
                <p className="text-sm text-muted-foreground">{trip.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{t("Duration")}</p>
                <p className="text-sm text-muted-foreground">{trip.duration} {t("days")}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{t("Start Date")}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(trip.startDate), "MMM dd, yyyy")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Euro className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{t("Price")}</p>
                <p className="text-sm text-muted-foreground">€{trip.price}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-lg font-semibold mb-3">{t("About This Trip")}</h4>
            <p className="text-muted-foreground leading-relaxed">{trip.description}</p>
          </div>

          {/* Categories and Focus Areas */}
          <div className="space-y-4">
            <div>
              <h5 className="font-medium mb-2">{t("Categories")}</h5>
              <div className="flex flex-wrap gap-2">
                {trip.categories.map(category => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-2">{t("Focus Areas")}</h5>
              <div className="flex flex-wrap gap-2">
                {trip.focus.map(focus => (
                  <Badge key={focus} variant="outline" className="bg-primary/10">
                    {focus}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div>
            <h4 className="text-lg font-semibold mb-3">{t("What's Included")}</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{t("Accommodation")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{t("Meals")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{t("Local Transportation")}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{t("Project Materials")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{t("24/7 Support")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{t("Certificate of Participation")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trip Highlights */}
          <div>
            <h4 className="text-lg font-semibold mb-3">{t("Trip Highlights")}</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">{t("Cultural Immersion")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("Experience local culture and traditions")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">{t("Community Impact")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("Make a lasting difference in local communities")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Camera className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">{t("Documentation")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("Professional photos and videos of your experience")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">{t("Personal Growth")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("Develop new skills and perspectives")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("Close")}
          </Button>
          <Button 
            onClick={handleApply} 
            disabled={isApplying}
            className="bg-primary hover:bg-primary/90"
          >
            {isApplying ? t("Applying...") : t("Apply Now")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
