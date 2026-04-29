
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  newsItems, 
  esgNewsItems, 
  partnersNewsItems, 
  missionsNewsItems, 
  eventsNewsItems 
} from "./newsData";
import ViewToggle from "./ViewToggle";
import NewsGrid from "./NewsGrid";

interface LatestNewsSectionProps {
  viewType: 'grid' | 'list';
  setViewType: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
}

const LatestNewsSection = ({ viewType, setViewType }: LatestNewsSectionProps) => {
  // Create a combined array of all news items from different categories
  const allNewsItems = [
    ...esgNewsItems,
    ...partnersNewsItems, 
    ...missionsNewsItems, 
    ...eventsNewsItems
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Latest News</h2>
        <ViewToggle viewType={viewType} setViewType={setViewType} />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="esg">ESG</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="missions">Missions</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <NewsGrid newsItems={allNewsItems} viewType={viewType} />
        </TabsContent>
        
        <TabsContent value="esg" className="space-y-6">
          <NewsGrid newsItems={esgNewsItems} viewType={viewType} />
        </TabsContent>
        
        <TabsContent value="partners" className="space-y-6">
          <NewsGrid newsItems={partnersNewsItems} viewType={viewType} />
        </TabsContent>
        
        <TabsContent value="missions" className="space-y-6">
          <NewsGrid newsItems={missionsNewsItems} viewType={viewType} />
        </TabsContent>
        
        <TabsContent value="events" className="space-y-6">
          <NewsGrid newsItems={eventsNewsItems} viewType={viewType} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default LatestNewsSection;
