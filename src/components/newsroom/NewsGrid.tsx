
import React from "react";
import NewsCard from "./NewsCard";
import { NewsItem } from "./types";

interface NewsGridProps {
  newsItems: NewsItem[];
  viewType: 'grid' | 'list';
}

const NewsGrid: React.FC<NewsGridProps> = ({ newsItems, viewType }) => {
  if (viewType === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <NewsCard key={item.id} item={item} viewType={viewType} />
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {newsItems.slice(0, 3).map((item) => (
        <NewsCard key={item.id} item={item} viewType={viewType} />
      ))}
    </div>
  );
};

export default NewsGrid;
