
import { useState } from "react";

export type StoryFormData = {
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  testimonial: {
    quote: string;
    author: string;
  };
};

export const initialStoryFormState: StoryFormData = {
  title: "",
  description: "",
  date: "",
  location: "",
  image: "",
  testimonial: {
    quote: "",
    author: ""
  }
};

export function useStoryForm() {
  const [formData, setFormData] = useState<StoryFormData>(initialStoryFormState);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as Record<string, unknown>,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const resetForm = () => {
    setFormData(initialStoryFormState);
  };

  return {
    formData,
    handleChange,
    resetForm
  };
}
