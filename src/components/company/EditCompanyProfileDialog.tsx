
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Pencil, Upload } from "lucide-react";

interface EditCompanyProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  companyData: {
    name: string;
    tagline: string;
    industry: string;
    location: string;
    website: string;
    logo: string;
    coverImage: string;
  };
  onSave: (updatedData: any) => void;
}

export function EditCompanyProfileDialog({ 
  isOpen, 
  onClose, 
  companyData, 
  onSave 
}: EditCompanyProfileDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(companyData);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSave(formData);
      toast.success(t("Profile updated successfully"));
      onClose();
    } catch (error) {
      toast.error(t("Failed to update profile"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (field: 'logo' | 'coverImage') => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // In a real app, you would upload the file to a server
        // For now, we'll create a URL for the file
        const imageUrl = URL.createObjectURL(file);
        handleInputChange(field, imageUrl);
        toast.success(t("Image uploaded successfully"));
      }
    };
    
    input.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('Edit Company Profile')}</DialogTitle>
          <DialogDescription>
            {t('Update your company information and branding')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Cover Image Section */}
          <div className="space-y-2">
            <Label>{t('Cover Image')}</Label>
            <div className="relative">
              <div 
                className="h-32 bg-center bg-cover rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer"
                style={{ backgroundImage: `url(${formData.coverImage})` }}
                onClick={() => handleImageUpload('coverImage')}
              >
                <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">{t('Click to change cover image')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logo Section */}
          <div className="space-y-2">
            <Label>{t('Company Logo')}</Label>
            <div className="flex items-center gap-4">
              <div 
                className="w-20 h-20 bg-background rounded-xl border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer flex items-center justify-center"
                onClick={() => handleImageUpload('logo')}
              >
                {formData.logo ? (
                  <img 
                    src={formData.logo}
                    alt="Company Logo"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <Upload className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                <p>{t('Click to upload a new logo')}</p>
                <p>{t('Recommended: 200x200px, PNG or JPG')}</p>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">{t('Company Name')}</Label>
              <Input
                id="companyName"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="industry">{t('Industry')}</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">{t('Tagline')}</Label>
            <Textarea
              id="tagline"
              value={formData.tagline}
              onChange={(e) => handleInputChange('tagline', e.target.value)}
              placeholder={t('A brief description of your company...')}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">{t('Location')}</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">{t('Website')}</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://exemplo.com"
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {t('Cancel')}
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? t('Saving...') : t('Save Changes')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
