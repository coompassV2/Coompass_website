
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { NewsItem } from "./types";

interface NewsCardProps {
  item: NewsItem;
  viewType: 'grid' | 'list';
}

const NewsCard: React.FC<NewsCardProps> = ({ item, viewType }) => {
  if (viewType === 'grid') {
    return (
      <Card key={item.id} className="overflow-hidden border-none shadow-md">
        <div className="flex flex-col">
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-800">
            <img 
              src={item.image} 
              alt={`News: ${item.title}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                {item.category}
              </Badge>
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.date}</span>
            </div>
            <h3 className="text-xl font-bold mb-3">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {item.summary}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={item.authorAvatar} />
                  <AvatarFallback>{item.authorName.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="text-sm">By {item.authorName}</span>
              </div>
              <Button variant="link" className="text-coompass-success">
                Read More
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card key={item.id} className="overflow-hidden border-none shadow-md">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-gray-200 dark:bg-gray-800">
          <img 
            src={item.image} 
            alt={`News: ${item.title}`}
            className="w-full h-60 md:h-full object-cover"
          />
        </div>
        <div className="md:w-2/3 p-6">
          <div className="flex items-center space-x-2 mb-3">
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              {item.category}
            </Badge>
            <span className="text-sm text-gray-500 dark:text-gray-400">{item.date}</span>
          </div>
          <h3 className="text-xl font-bold mb-3">
            {item.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {item.summary}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={item.authorAvatar} />
                <AvatarFallback>{item.authorName.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">By {item.authorName}</span>
            </div>
            <Button variant="link" className="text-coompass-success">
              Read More
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;
