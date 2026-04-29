
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Building2 } from "lucide-react";

export function FeaturedStoriesSection() {
  const { t } = useTranslation();
  const featuredStories = [
    {
      id: 1,
      title: "Digital Literacy for Seniors",
      ngo: "Serve the City Lisbon",
      location: "Lisbon, Portugal",
      date: "December 2024",
      image: "/lovable-uploads/8c7a6a49-9512-4922-bddc-a347a3b204e8.png",
      impact: "200+ seniors trained",
      category: "Education"
    },
    {
      id: 2,
      title: "Ocean Cleanup Initiative",
      ngo: "Clean Seas Portugal",
      location: "Porto, Portugal",
      date: "November 2024",
      image: "/lovable-uploads/8c7a6a49-9512-4922-bddc-a347a3b204e8.png",
      impact: "2.5 tons of waste removed",
      category: "Environment"
    },
    {
      id: 3,
      title: "Food Bank Support",
      ngo: "Banco Alimentar",
      location: "Multiple locations",
      date: "Ongoing",
      image: "/lovable-uploads/8c7a6a49-9512-4922-bddc-a347a3b204e8.png",
      impact: "15,000 meals distributed",
      category: "Social"
    }
  ];

  return (
    <section className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-1">{t("Featured Impact Stories")}</h2>
        <p className="text-sm text-gray-600">{t("Highlighting recent mission successes and community impact")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredStories.map((story) => (
          <Card key={story.id} className="bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div
              className="h-36 bg-cover bg-center"
              style={{ backgroundImage: `url(${story.image})` }}
            >
              <div className="h-full bg-black/20 flex items-end p-3">
                <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-xs">{t(story.category)}</Badge>
              </div>
            </div>
            <CardContent className="p-3 space-y-2">
              <h3 className="font-semibold text-base text-gray-900">{story.title}</h3>
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{story.ngo}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{story.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>{story.date}</span>
                </div>
              </div>
              <div className="pt-1.5 border-t border-gray-100">
                <p className="text-xs font-medium text-green-600">{story.impact}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
