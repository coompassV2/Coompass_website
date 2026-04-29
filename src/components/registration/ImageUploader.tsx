
import { FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileImage } from "lucide-react";
import { PROFILE_IMAGE_ACCEPT } from "@/utils/profileImages";

interface ImageUploaderProps {
  label: string;
  selectedImage: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ImageUploader({ label, selectedImage, onImageChange }: ImageUploaderProps) {
  return (
    <FormItem>
      <FormLabel className="text-white">{label}</FormLabel>
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <FileImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('logo-upload')?.click()}
            className="w-full bg-white hover:bg-white/90 text-black border-white/10"
          >
            Choose File
          </Button>
          <Input
            id="logo-upload"
            type="file"
            accept={PROFILE_IMAGE_ACCEPT}
            onChange={onImageChange}
            className="hidden"
          />
        </div>
        {selectedImage && (
          <img
            src={selectedImage}
            alt={label}
            className="w-16 h-16 rounded-lg object-cover"
          />
        )}
      </div>
    </FormItem>
  );
}
