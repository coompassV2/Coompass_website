
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import { StoryFormData } from "@/hooks/useStoryForm";

interface TestimonialSectionProps {
  testimonial: StoryFormData["testimonial"];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function TestimonialSection({ testimonial, onChange }: TestimonialSectionProps) {
  const { t } = useTranslation();
  
  return (
    <div className="border border-border p-4 rounded-md">
      <h4 className="font-medium mb-2">{t('Testimonial (Optional)')}</h4>
      <div className="space-y-3">
        <div>
          <Label htmlFor="quote">{t('Quote')}</Label>
          <Textarea 
            id="quote"
            name="testimonial.quote"
            value={testimonial.quote}
            onChange={onChange}
            placeholder={t('Add a testimonial quote')}
            rows={2}
            maxCount={150}
            showCount={true}
          />
        </div>
        <div>
          <Label htmlFor="author">{t('Author')}</Label>
          <Input 
            id="author"
            name="testimonial.author"
            value={testimonial.author}
            onChange={onChange}
            placeholder={t('Who said this?')}
            maxLength={50}
          />
        </div>
      </div>
    </div>
  );
}
