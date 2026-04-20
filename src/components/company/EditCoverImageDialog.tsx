
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, Image as ImageIcon } from "lucide-react";

interface EditCoverImageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage: string;
  onSave: (newImageUrl: string) => void;
}

export function EditCoverImageDialog({ 
  isOpen, 
  onClose, 
  currentImage, 
  onSave 
}: EditCoverImageDialogProps) {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
      }
    };
    
    input.click();
  };

  const handleSave = async () => {
    if (!selectedImage) {
      toast.error(t("Please select an image first"));
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(selectedImage);
      toast.success(t("Cover image updated successfully"));
      onClose();
      setSelectedImage(null);
    } catch (error) {
      toast.error(t("Failed to update cover image"));
    } finally {
      setIsLoading(false);
    }
  };

  const imageToShow = selectedImage || currentImage;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t('Edit Cover Image')}</DialogTitle>
          <DialogDescription>
            {t('Upload a new cover image for your company profile')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div 
            className="h-64 bg-center bg-cover rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer relative overflow-hidden"
            style={{ backgroundImage: `url(${imageToShow})` }}
            onClick={handleImageSelect}
          >
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="text-white text-center">
                <Upload className="h-12 w-12 mx-auto mb-2" />
                <p className="text-lg font-medium">{selectedImage ? t('Click to select different image') : t('Click to upload new image')}</p>
                <p className="text-sm opacity-90">{t('Recommended: 1200x400px, JPG or PNG')}</p>
              </div>
            </div>
          </div>

          {selectedImage && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ImageIcon className="h-4 w-4" />
              <span>{t('New image selected')}</span>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {t('Cancel')}
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isLoading || !selectedImage}
          >
            {isLoading ? t('Updating...') : t('Update Cover Image')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
