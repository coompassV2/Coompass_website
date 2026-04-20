
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface DescriptionInputProps {
  form: UseFormReturn<any>;
  label: string;
  placeholder: string;
}

export function DescriptionInput({ form, label, placeholder }: DescriptionInputProps) {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className="bg-black/30 border-white/10 text-white"
              maxCount={500}
              showCount={true}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
