
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, Image, Video, Download } from "lucide-react";

export function NonprofitMediaGallery() {
  const { t } = useTranslation();
  
  // Mock data for media items
  const mediaItems = [
    {
      id: 1,
      title: "Community Garden Opening",
      type: "image",
      thumbnail: "https://images.unsplash.com/photo-1531598953343-283f4a1cbf86?w=500&q=80",
      category: "Events",
      date: "Mar 15, 2025"
    },
    {
      id: 2,
      title: "Volunteer Training Session",
      type: "image",
      thumbnail: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&q=80",
      category: "Training",
      date: "Feb 28, 2025"
    },
    {
      id: 3,
      title: "Environmental Impact Report",
      type: "document",
      thumbnail: "https://api.dicebear.com/7.x/shapes/svg?seed=doc1",
      category: "Reports",
      date: "Mar 31, 2025"
    },
    {
      id: 4,
      title: "Mission Statement Video",
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=500&q=80",
      category: "Marketing",
      date: "Jan 10, 2025"
    },
    {
      id: 5,
      title: "Partner Recognition Event",
      type: "image",
      thumbnail: "https://images.unsplash.com/photo-1603202662747-00e33e7d1468?w=500&q=80",
      category: "Events",
      date: "Mar 20, 2025"
    },
    {
      id: 6,
      title: "Annual Statistics Report",
      type: "document",
      thumbnail: "https://api.dicebear.com/7.x/shapes/svg?seed=doc2",
      category: "Reports",
      date: "Apr 1, 2025"
    }
  ];
  
  // Categories for filter buttons
  const categories = [
    "All",
    "Events",
    "Reports",
    "Marketing",
    "Training"
  ];
  
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{t('Media Gallery')}</h2>
        <Button size="sm">
          <Upload className="h-4 w-4 mr-2" />
          {t('Upload Media')}
        </Button>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {categories.map((category, index) => (
          <Button 
            key={category} 
            variant={index === 0 ? "default" : "outline"} 
            size="sm"
          >
            {category === "All" ? t('All Media') : t(category)}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediaItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:ring-1 hover:ring-primary/20 transition-all">
            <div className="relative h-40 bg-muted">
              <img 
                src={item.thumbnail} 
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge className={
                  item.type === 'image' ? "bg-blue-500/20 text-blue-700" :
                  item.type === 'video' ? "bg-red-500/20 text-red-700" :
                  "bg-amber-500/20 text-amber-700"
                }>
                  {item.type === 'image' ? 
                    <><Image className="h-3 w-3 mr-1" /> {t('Image')}</> :
                  item.type === 'video' ? 
                    <><Video className="h-3 w-3 mr-1" /> {t('Video')}</> :
                    <><Download className="h-3 w-3 mr-1" /> {t('Document')}</>
                  }
                </Badge>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm truncate">{item.title}</h3>
              <div className="flex justify-between mt-1">
                <Badge variant="outline" className="text-xs">
                  {t(item.category)}
                </Badge>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Button variant="outline">
          {t('View All Media')}
        </Button>
      </div>
    </div>
  );
}
