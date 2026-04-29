
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PersonaType } from "@/utils/personaLabels";
import { Mail, Phone, Globe } from "lucide-react";

interface ContactInformationFieldsProps {
  form: UseFormReturn<any>;
  personaType: PersonaType;
}

export function ContactInformationFields({ form, personaType }: ContactInformationFieldsProps) {
  // Volunteers don't need separate contact information fields as they use their registration email
  if (personaType === "volunteer") {
    return null;
  }

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-white">Contact Information</h4>
      
      <FormField
        control={form.control}
        name="contactEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Contact Email</FormLabel>
            <FormControl>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
                <Input
                  placeholder="contact@company.com"
                  className="bg-black/30 border-white/10 pl-10 text-white"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="contactPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Contact Phone</FormLabel>
            <FormControl>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
                <Input
                  placeholder="+1 (555) 123-4567"
                  className="bg-black/30 border-white/10 pl-10 text-white"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="website"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Website</FormLabel>
            <FormControl>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
                <Input
                  placeholder="https://www.company.com"
                  className="bg-black/30 border-white/10 pl-10 text-white"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
