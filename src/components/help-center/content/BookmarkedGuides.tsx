
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBookmarkedGuides, getGuideTitleFromId, removeBookmark } from "../guide-details/guideUtils";
import { BookmarkX, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function BookmarkedGuides() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load bookmarks from localStorage
    const loadedBookmarks = getBookmarkedGuides();
    setBookmarks(loadedBookmarks);
  }, []);

  const handleRemoveBookmark = (guideId: string) => {
    const success = removeBookmark(guideId);
    
    if (success) {
      // Update state to remove the bookmark
      setBookmarks(prev => prev.filter(id => id !== guideId));
      
      toast({
        title: "Bookmark removed",
        description: "The guide has been removed from your bookmarks.",
      });
    }
  };

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
        <h2 className="text-xl font-medium mb-2">No bookmarked guides yet</h2>
        <p className="text-gray-500 mb-4">
          Save guides for quick reference by clicking the bookmark button when viewing a guide.
        </p>
        <Button asChild>
          <Link to="/help-center#guides">Browse guides</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Bookmarked Guides</h1>
      
      <div className="space-y-4">
        {bookmarks.map((guideId) => (
          <Card key={guideId} className="hover:border-primary/50 transition-colors">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex-1">
                <Link to={`/guides/${guideId}`} className="text-lg font-medium hover:text-primary transition-colors">
                  {getGuideTitleFromId(guideId)}
                </Link>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRemoveBookmark(guideId)}
                className="text-gray-500 hover:text-red-600"
              >
                <BookmarkX className="h-4 w-4" />
                <span className="sr-only">Remove bookmark</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
