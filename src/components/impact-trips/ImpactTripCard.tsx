
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ImpactTrip } from "@/data/impactTrips";
import { Calendar, Map, Clock, Euro } from "lucide-react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { ImpactTripDetailsDialog } from "./ImpactTripDetailsDialog";

interface ImpactTripCardProps {
  trip: ImpactTrip;
}

export function ImpactTripCard({ trip }: ImpactTripCardProps) {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  return (
    <>
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={trip.image} 
            alt={trip.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105" 
            loading="lazy" 
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground font-medium">
              {trip.country}
            </Badge>
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg line-clamp-2">{trip.title}</h3>
            <p className="text-sm text-muted-foreground">{trip.organization}</p>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 flex-grow">
          <p className="text-sm line-clamp-3 mb-4">{trip.description}</p>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-sm">
              <Map className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{trip.location}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{trip.duration} {t("days")}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{format(new Date(trip.startDate), "MMM dd")}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Euro className="h-4 w-4 text-muted-foreground" />
              <span>€{trip.price}</span>
            </div>
          </div>
          
          <div className="mt-4 flex gap-1 flex-wrap">
            {trip.categories.slice(0, 2).map(category => (
              <Badge key={category} variant="outline" className="bg-muted/50">
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="border-t pt-4">
          <Button 
            className="w-full" 
            onClick={() => setDialogOpen(true)}
          >
            {t("View Details")}
          </Button>
        </CardFooter>
      </Card>

      <ImpactTripDetailsDialog 
        trip={trip}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
