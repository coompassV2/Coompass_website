
import { ImpactTrip } from "@/data/impactTrips";
import { useTranslation } from "react-i18next";
import { ImpactTripCard } from "./ImpactTripCard";

interface ImpactTripsContentProps {
  filteredTrips: ImpactTrip[];
  viewType: 'grid' | 'list';
}

export function ImpactTripsContent({ filteredTrips, viewType }: ImpactTripsContentProps) {
  const { t } = useTranslation();

  if (filteredTrips.length === 0) {
    return (
      <div className="w-full p-8 text-center bg-muted/30 rounded-lg mt-6">
        <h3 className="text-xl font-medium mb-2">{t("No Impact Trips Found")}</h3>
        <p className="text-muted-foreground">
          {t("Try adjusting your filters or search criteria.")}
        </p>
      </div>
    );
  }

  return (
    <div className={viewType === 'grid' 
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6" 
      : "space-y-4 mt-6"
    }>
      {filteredTrips.map((trip) => (
        <ImpactTripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}
