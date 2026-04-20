
import React from "react";
import { Building2, Users, Target, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const NewsCategoriesSection = () => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">News Categories</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <Building2 className="h-6 w-6 text-coompass-success" />
              </div>
              <h3 className="text-lg font-medium">ESG Initiatives</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Environmental, Social, and Governance updates from leading companies.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-medium">Partner Stories</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Success stories and updates from our ecosystem partners.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-medium">Mission Updates</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Latest completed missions and their impact reports.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-medium">Upcoming Events</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Calendar of sustainability events, webinars, and conferences.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsCategoriesSection;
