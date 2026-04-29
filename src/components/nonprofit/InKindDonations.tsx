
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package, Check, Clock, PlusCircle, RefreshCw, 
  PackageCheck, PackageX, ShoppingBag 
} from "lucide-react";

export function InKindDonations() {
  const { t } = useTranslation();
  
  // Mock data for in-kind donations
  const inKindDonations = [
    {
      id: 1,
      item: "Office Furniture (10 desks, 20 chairs)",
      donor: "Modern Office Solutions",
      status: "received",
      date: "Apr 2, 2025",
      value: 5000
    },
    {
      id: 2,
      item: "20 Laptops (Refurbished)",
      donor: "Tech Recyclers Inc.",
      status: "in-transit",
      date: "Apr 10, 2025",
      value: 4000
    },
    {
      id: 3,
      item: "Professional Design Services",
      donor: "Creative Agency Co.",
      status: "scheduled",
      date: "Apr 15, 2025",
      value: 3000
    },
    {
      id: 4,
      item: "Food Supplies (250kg)",
      donor: "Local Grocery Chain",
      status: "needed",
      date: "Ongoing",
      value: null
    }
  ];
  
  // Categories for wishes/needs
  const needsCategories = [
    "Office Supplies", "Technology", "Professional Services", 
    "Food/Catering", "Transportation", "Event Space"
  ];
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{t('In-Kind Donations')}</h2>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              {t('Add Wish List Item')}
            </Button>
            <Button size="sm">
              <PackageCheck className="h-4 w-4 mr-2" />
              {t('Log Donation')}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 border-border bg-green-50/30 dark:bg-green-950/20">
            <div className="flex items-center gap-3 mb-1">
              <Check className="h-5 w-5 text-green-600" />
              <div className="text-sm">{t('Received')}</div>
            </div>
            <div className="text-2xl font-bold">12</div>
          </Card>
          
          <Card className="p-4 border-border bg-blue-50/30 dark:bg-blue-950/20">
            <div className="flex items-center gap-3 mb-1">
              <Clock className="h-5 w-5 text-blue-600" />
              <div className="text-sm">{t('In Transit')}</div>
            </div>
            <div className="text-2xl font-bold">3</div>
          </Card>
          
          <Card className="p-4 border-border bg-amber-50/30 dark:bg-amber-950/20">
            <div className="flex items-center gap-3 mb-1">
              <RefreshCw className="h-5 w-5 text-amber-600" />
              <div className="text-sm">{t('Scheduled')}</div>
            </div>
            <div className="text-2xl font-bold">5</div>
          </Card>
          
          <Card className="p-4 border-border bg-purple-50/30 dark:bg-purple-950/20">
            <div className="flex items-center gap-3 mb-1">
              <ShoppingBag className="h-5 w-5 text-purple-600" />
              <div className="text-sm">{t('Needed')}</div>
            </div>
            <div className="text-2xl font-bold">8</div>
          </Card>
        </div>
        
        <h3 className="font-medium text-lg mb-4">{t('Recent In-Kind Donations & Needs')}</h3>
        <div className="space-y-3">
          {inKindDonations.map((donation) => (
            <Card key={donation.id} className="p-4 hover:bg-accent/5 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={
                    donation.status === 'received' ? "text-green-600" :
                    donation.status === 'in-transit' ? "text-blue-600" :
                    donation.status === 'scheduled' ? "text-amber-600" :
                    "text-purple-600"
                  }>
                    {donation.status === 'received' ? <PackageCheck className="h-5 w-5" /> :
                     donation.status === 'in-transit' ? <Package className="h-5 w-5" /> :
                     donation.status === 'scheduled' ? <Clock className="h-5 w-5" /> :
                     <PackageX className="h-5 w-5" />}
                  </div>
                  <div>
                    <h4 className="font-medium">{donation.item}</h4>
                    <p className="text-sm text-muted-foreground">
                      {donation.status !== 'needed' ? `${t('From')}: ${donation.donor}` : t('Currently needed')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge className={
                    donation.status === 'received' ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400" :
                    donation.status === 'in-transit' ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400" :
                    donation.status === 'scheduled' ? "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400" :
                    "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400"
                  }>
                    {donation.status === 'received' ? t('Received') :
                     donation.status === 'in-transit' ? t('In Transit') :
                     donation.status === 'scheduled' ? t('Scheduled') :
                     t('Needed')}
                  </Badge>
                  
                  {donation.value !== null && (
                    <span className="font-semibold">${donation.value.toLocaleString()}</span>
                  )}
                  
                  <span className="text-sm text-muted-foreground">{donation.date}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <h3 className="font-medium text-lg mt-6 mb-3">{t('Wish List Categories')}</h3>
        <div className="flex flex-wrap gap-2">
          {needsCategories.map((category, idx) => (
            <Badge key={idx} variant="outline" className="px-3 py-1">
              {t(category)}
            </Badge>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline">{t('Manage Wish List')}</Button>
        </div>
      </div>
    </div>
  );
}
