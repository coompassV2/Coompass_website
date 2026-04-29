
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Building2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface ProfileNameInputProps {
  form: UseFormReturn<any>;
  label: string;
}

export function ProfileNameInput({ form, label }: ProfileNameInputProps) {
  return (
    <FormField
      control={form.control}
      name="companyName"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
              <Input className="bg-black/30 border-white/10 pl-10 text-white" {...field} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
