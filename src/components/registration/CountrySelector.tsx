
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectLabel, SelectGroup } from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

const countries = [
  { code: "at", name: "Austria", flag: "🇦🇹" },
  { code: "be", name: "Belgium", flag: "🇧🇪" },
  { code: "bg", name: "Bulgaria", flag: "🇧🇬" },
  { code: "hr", name: "Croatia", flag: "🇭🇷" },
  { code: "cy", name: "Cyprus", flag: "🇨🇾" },
  { code: "cz", name: "Czech Republic", flag: "🇨🇿" },
  { code: "dk", name: "Denmark", flag: "🇩🇰" },
  { code: "ee", name: "Estonia", flag: "🇪🇪" },
  { code: "fi", name: "Finland", flag: "🇫🇮" },
  { code: "fr", name: "France", flag: "🇫🇷" },
  { code: "de", name: "Germany", flag: "🇩🇪" },
  { code: "gr", name: "Greece", flag: "🇬🇷" },
  { code: "hu", name: "Hungary", flag: "🇭🇺" },
  { code: "ie", name: "Ireland", flag: "🇮🇪" },
  { code: "it", name: "Italy", flag: "🇮🇹" },
  { code: "lv", name: "Latvia", flag: "🇱🇻" },
  { code: "lt", name: "Lithuania", flag: "🇱🇹" },
  { code: "lu", name: "Luxembourg", flag: "🇱🇺" },
  { code: "mt", name: "Malta", flag: "🇲🇹" },
  { code: "nl", name: "Netherlands", flag: "🇳🇱" },
  { code: "pl", name: "Poland", flag: "🇵🇱" },
  { code: "pt", name: "Portugal", flag: "🇵🇹" },
  { code: "ro", name: "Romania", flag: "🇷🇴" },
  { code: "sk", name: "Slovakia", flag: "🇸🇰" },
  { code: "si", name: "Slovenia", flag: "🇸🇮" },
  { code: "es", name: "Spain", flag: "🇪🇸" },
  { code: "se", name: "Sweden", flag: "🇸🇪" },
  { code: "ag", name: "Antigua and Barbuda", flag: "🇦🇬" },
  { code: "bs", name: "Bahamas", flag: "🇧🇸" },
  { code: "bb", name: "Barbados", flag: "🇧🇧" },
  { code: "cu", name: "Cuba", flag: "🇨🇺" },
  { code: "dm", name: "Dominica", flag: "🇩🇲" },
  { code: "do", name: "Dominican Republic", flag: "🇩🇴" },
  { code: "gd", name: "Grenada", flag: "🇬🇩" },
  { code: "ht", name: "Haiti", flag: "🇭🇹" },
  { code: "jm", name: "Jamaica", flag: "🇯🇲" },
  { code: "kn", name: "Saint Kitts and Nevis", flag: "🇰🇳" },
  { code: "lc", name: "Saint Lucia", flag: "🇱🇨" },
  { code: "vc", name: "Saint Vincent and the Grenadines", flag: "🇻🇨" },
  { code: "tt", name: "Trinidad and Tobago", flag: "🇹🇹" }
];

interface CountrySelectorProps {
  form: UseFormReturn<any>;
}

export function CountrySelector({ form }: CountrySelectorProps) {
  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Location</FormLabel>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4 z-10" />
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-black/30 border-white/10 text-white pl-10">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[280px]">
                <SelectGroup>
                  <SelectLabel className="text-sm font-semibold text-gray-500">European Union</SelectLabel>
                  {countries.slice(0, 27).map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <span className="flex items-center gap-2">
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel className="text-sm font-semibold text-gray-500 mt-2">Caribbean Islands</SelectLabel>
                  {countries.slice(27).map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <span className="flex items-center gap-2">
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
