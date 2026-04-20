
import React from "react";
import { Newspaper } from "lucide-react";

const NewsroomDescription = () => {
  return (
    <div className="px-6 pt-4 pb-0 flex items-center">
      <Newspaper className="h-6 w-6 text-coompass-success mr-2" />
      <p className="text-gray-500 dark:text-gray-400">
        Discover the latest updates on ESG initiatives, sustainability projects, 
        and how organizations are making a difference in communities around the world.
      </p>
    </div>
  );
};

export default NewsroomDescription;
