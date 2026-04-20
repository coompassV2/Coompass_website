
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { newsItems, esgNewsItems, partnersNewsItems } from "./newsData";

const HeroSection = () => {
  const getRandomItem = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };

  // Get random news items for the three cards
  const mainNewsItem = getRandomItem(newsItems);
  const secondaryNewsItem1 = getRandomItem(esgNewsItems);
  const secondaryNewsItem2 = getRandomItem(partnersNewsItems);

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main featured news - 2/3 width on desktop */}
        <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 lg:col-span-2 group">
          <div className="relative h-[400px] bg-gradient-to-r from-coompass-success to-coompass-success/70">
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
              <div className="bg-black/40 p-6 rounded-lg backdrop-blur-md">
                <Badge className="mb-3 bg-coompass-primary hover:bg-coompass-primary/90 text-white font-medium px-3 py-1 text-sm">
                  {mainNewsItem.category}
                </Badge>
                <h1 className="text-3xl font-bold text-white mb-4">
                  {mainNewsItem.title}
                </h1>
                <p className="text-white/90 mb-6 line-clamp-2">
                  {mainNewsItem.summary}
                </p>
                <Button variant="secondary" className="font-medium hover:bg-white hover:text-coompass-primary transition-colors">
                  Read More
                </Button>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-[1]"></div>
            <img 
              src={mainNewsItem.image} 
              alt="Main News Feature"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </Card>

        {/* Secondary news column - right side with two stacked cards */}
        <div className="flex flex-col gap-6">
          {/* First secondary news item */}
          <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1 group">
            <div className="relative h-[190px] bg-gradient-to-r from-blue-700 to-blue-500">
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                <div className="bg-black/40 p-4 rounded-lg backdrop-blur-md">
                  <Badge className="mb-2 bg-amber-500 hover:bg-amber-600 text-white font-medium px-2.5 py-0.5 text-xs">
                    {secondaryNewsItem1.category}
                  </Badge>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {secondaryNewsItem1.title}
                  </h2>
                  <p className="text-white/90 text-sm line-clamp-2">
                    {secondaryNewsItem1.summary}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-[1]"></div>
              <img 
                src={secondaryNewsItem1.image} 
                alt={secondaryNewsItem1.title}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </Card>
          
          {/* Second secondary news item */}
          <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1 group">
            <div className="relative h-[190px] bg-gradient-to-r from-purple-800 to-purple-600">
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                <div className="bg-black/40 p-4 rounded-lg backdrop-blur-md">
                  <Badge className="mb-2 bg-rose-500 hover:bg-rose-600 text-white font-medium px-2.5 py-0.5 text-xs">
                    {secondaryNewsItem2.category}
                  </Badge>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {secondaryNewsItem2.title}
                  </h2>
                  <p className="text-white/90 text-sm line-clamp-2">
                    {secondaryNewsItem2.summary}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-[1]"></div>
              <img 
                src={secondaryNewsItem2.image} 
                alt={secondaryNewsItem2.title}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
