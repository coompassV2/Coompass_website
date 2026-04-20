
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPin, Share2, Plus } from "lucide-react";
import { useState } from "react";
import { CreateStoryDialog } from "./story/CreateStoryDialog";
import { useToast } from "@/hooks/use-toast";

export function CompanyImpactStories() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [visibleStories, setVisibleStories] = useState(3);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  // Mock impact stories data
  const [impactStories, setImpactStories] = useState([
    {
      id: 1,
      title: "Tech Education for Underserved Youth",
      image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?q=80&w=1974&auto=format&fit=crop",
      description: "Our employees volunteered to teach coding skills to high school students in underserved communities, reaching over 200 students.",
      date: "March 15, 2025",
      location: "Multiple Locations",
      testimonial: {
        quote: "The coding workshops opened my eyes to career possibilities I never knew existed.",
        author: "Maria, Student Participant"
      }
    },
    {
      id: 2,
      title: "Coastal Cleanup Initiative",
      image: "https://images.unsplash.com/photo-1618477462146-050d2757350d?q=80&w=1974&auto=format&fit=crop",
      description: "Our environmental team led a series of beach cleanups, removing over 1,000 pounds of plastic waste from local coastlines.",
      date: "April 22, 2025",
      location: "Pacific Coast",
      testimonial: {
        quote: "The difference made by the corporate volunteers was immediately visible on our beaches.",
        author: "John, Environmental Partner"
      }
    },
    {
      id: 3,
      title: "Food Bank Volunteering Drive",
      image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=2070&auto=format&fit=crop",
      description: "During our annual giving month, employees packed over 5,000 meal kits for families experiencing food insecurity.",
      date: "February 8, 2025",
      location: "City Food Bank",
      testimonial: {
        quote: "The corporate team's effort helped us serve twice as many families that month.",
        author: "Sarah, Food Bank Director"
      }
    },
    {
      id: 4,
      title: "Habitat Restoration Project",
      image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=2070&auto=format&fit=crop",
      description: "Our sustainability team partnered with local conservation groups to restore native habitats in urban parks.",
      date: "May 10, 2025",
      location: "City Parks",
      testimonial: {
        quote: "The reintroduction of native plants has already attracted more pollinators to the area.",
        author: "David, Park Ranger"
      }
    },
    {
      id: 5,
      title: "Mentorship Program Launch",
      image: "https://images.unsplash.com/photo-1541943181603-d8296eff91f9?q=80&w=1974&auto=format&fit=crop",
      description: "Fifty employees volunteered as mentors to first-generation college students pursuing STEM degrees.",
      date: "January 20, 2025",
      location: "Virtual Program",
      testimonial: {
        quote: "Having a mentor who works in my dream field has been invaluable for my academic journey.",
        author: "Alex, Student Mentee"
      }
    }
  ]);
  
  const displayedStories = impactStories.slice(0, visibleStories);
  
  const handleLoadMore = () => {
    setVisibleStories(prev => Math.min(prev + 3, impactStories.length));
  };

  const handleCreateStory = (newStory: any) => {
    setImpactStories(prev => [newStory, ...prev]);
    // Ensure the new story is visible
    if (visibleStories < 3) {
      setVisibleStories(3);
    }
  };

  const handleShare = (storyId: number) => {
    // In a real app, implement sharing functionality
    toast({
      title: "Share Link Generated",
      description: "Story link copied to clipboard"
    });
  };

  const handleViewFullStory = (storyId: number) => {
    // In a real app, navigate to full story page or open a modal
    toast({
      title: "View Story",
      description: "Full story view would open here"
    });
  };

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">{t('Impact Stories')}</h2>
          <p className="text-sm text-muted-foreground">{t('Showcasing our community impact')}</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleShare(0)}>
            <Share2 className="h-4 w-4 mr-2" />
            {t('Share')}
          </Button>
          
          <Button size="sm" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            {t('Create Story')}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedStories.map((story) => (
          <Card key={story.id}>
            <div 
              className="h-48 w-full bg-cover bg-center rounded-t-lg" 
              style={{ backgroundImage: `url(${story.image})` }}
            />
            
            <CardHeader>
              <CardTitle>{story.title}</CardTitle>
              <CardDescription className="flex flex-wrap gap-3">
                <span className="flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  {story.date}
                </span>
                <span className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {story.location}
                </span>
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm">{story.description}</p>
              
              {story.testimonial && (
                <div className="mt-4 bg-foreground/5 p-3 rounded-lg">
                  <p className="text-sm italic">{`"${story.testimonial.quote}"`}</p>
                  <p className="text-xs text-muted-foreground mt-2 text-right">
                    — {story.testimonial.author}
                  </p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="flex-1" onClick={() => handleViewFullStory(story.id)}>
                {t('Read Full Story')}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleShare(story.id)}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {visibleStories < impactStories.length && (
        <div className="text-center mt-6">
          <Button variant="outline" onClick={handleLoadMore}>
            {t('Load More Stories')}
          </Button>
        </div>
      )}

      <CreateStoryDialog 
        isOpen={isCreateDialogOpen} 
        onClose={() => setIsCreateDialogOpen(false)}
        onCreateStory={handleCreateStory}
      />
    </div>
  );
}
