
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, BookmarkPlus, Share2, Printer } from "lucide-react";

interface GuideHeaderProps {
  title: string;
  description: string;
  guideId: string;
  handleBookmark: () => void;
  handleShare: () => void;
  handleBackClick: () => void;
}

export function GuideHeader({ 
  title, 
  description, 
  handleBookmark,
  handleShare,
  handleBackClick
}: GuideHeaderProps) {
  return (
    <div className="mb-6">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="mb-4 pl-1 hover:bg-transparent hover:text-primary"
        onClick={handleBackClick}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Help Center
      </Button>
      
      {/* Title and Description */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button variant="outline" size="sm" onClick={handleBookmark}>
          <BookmarkPlus className="mr-1 h-4 w-4" />
          Bookmark
        </Button>
        <Button variant="outline" size="sm" onClick={handleShare}>
          <Share2 className="mr-1 h-4 w-4" />
          Share
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => window.print()}
        >
          <Printer className="mr-1 h-4 w-4" />
          Print
        </Button>
      </div>
      
      <Separator className="my-6" />
    </div>
  );
}
