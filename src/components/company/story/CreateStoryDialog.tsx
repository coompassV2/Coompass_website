
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarIcon, MapPin, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TestimonialSection } from "./TestimonialSection";
import { useStoryForm } from "@/hooks/useStoryForm";

interface CreateStoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateStory: (story: any) => void;
}

export function CreateStoryDialog({ isOpen, onClose, onCreateStory }: CreateStoryDialogProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { formData, handleChange, resetForm } = useStoryForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, you would send this to an API
    setTimeout(() => {
      const newStory = {
        ...formData,
        id: Date.now(), // Generate temporary ID
        image: formData.image || "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?q=80&w=1974&auto=format&fit=crop", // Default image if none provided
      };
      
      onCreateStory(newStory);
      setIsSubmitting(false);
      
      toast({
        title: "Success",
        description: "Your impact story has been created",
      });
      
      // Reset form
      resetForm();
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('Create Impact Story')}</DialogTitle>
          <DialogDescription>
            {t('Share your company\'s social impact achievements')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">{t('Story Title')}</Label>
              <Input 
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder={t('Enter a compelling title')}
                required
                maxLength={100}
              />
            </div>

            <div>
              <Label htmlFor="description">{t('Description')}</Label>
              <Textarea 
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={t('Describe the impact of this initiative')}
                required
                rows={4}
                maxCount={500}
                showCount={true}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {t('Date')}
                  </div>
                </Label>
                <Input 
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {t('Location')}
                  </div>
                </Label>
                <Input 
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder={t('Where did this take place?')}
                  required
                  maxLength={100}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image">{t('Image URL')}</Label>
              <div className="flex gap-2">
                <Input 
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder={t('Enter image URL or upload one')}
                  className="flex-1"
                />
                <Button type="button" variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  {t('Upload')}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {t('Leave blank to use a default image')}
              </p>
            </div>

            <TestimonialSection 
              testimonial={formData.testimonial}
              onChange={handleChange}
            />
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              {t('Cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t('Creating...') : t('Create Story')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
