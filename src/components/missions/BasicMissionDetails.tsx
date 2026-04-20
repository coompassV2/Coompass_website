import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";

export function BasicMissionDetails({ form }: { form: any }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        rules={{
          required: t("Mission title is required"),
          validate: (value) =>
            typeof value === "string" && value.trim().length > 2
              ? true
              : t("Mission title must be at least 3 characters"),
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground dark:text-white">{t("Mission Title")}</FormLabel>
            <FormControl>
              <Input 
                placeholder={t("Enter mission title")}
                className="bg-background dark:bg-black/30 border-input dark:border-white/10 text-foreground dark:text-white placeholder:text-muted-foreground"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        rules={{
          required: t("Mission description is required"),
          validate: (value) =>
            typeof value === "string" && value.trim().length > 10
              ? true
              : t("Mission description must be at least 10 characters"),
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground dark:text-white">{t("Mission Description")}</FormLabel>
            <FormControl>
              <Textarea 
                placeholder={t("Describe the mission...")}
                className="bg-background dark:bg-black/30 border-input dark:border-white/10 text-foreground dark:text-white placeholder:text-muted-foreground min-h-[300px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="hoursRequired"
        rules={{
          required: t("Required hours is mandatory"),
          validate: (value) =>
            Number(value) > 0 ? true : t("Required hours must be greater than 0"),
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground dark:text-white">
              {t("Hours Required")} <i className="font-normal">({t("per volunteer")})</i>
            </FormLabel>
            <FormControl>
              <Input 
                type="number"
                placeholder={t("Enter required hours")}
                className="bg-background dark:bg-black/30 border-input dark:border-white/10 text-foreground dark:text-white placeholder:text-muted-foreground"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="volunteersRequired"
        rules={{
          required: t("Volunteers required is mandatory"),
          validate: (value) =>
            Number(value) > 0 ? true : t("Volunteers required must be greater than 0"),
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground dark:text-white">{t("Volunteers Required")}</FormLabel>
            <FormControl>
              <Input 
                type="number"
                placeholder={t("Enter number of volunteers needed")}
                className="bg-background dark:bg-black/30 border-input dark:border-white/10 text-foreground dark:text-white placeholder:text-muted-foreground"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="beneficiariesCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground dark:text-white">{t("Initiative reach")}</FormLabel>
            <p className="text-sm text-muted-foreground">{t("Indicate approximate number of beneficiaries reached")}</p>
            <FormControl>
              <Input
                type="number"
                min={0}
                placeholder="0"
                className="bg-background dark:bg-black/30 border-input dark:border-white/10 text-foreground dark:text-white placeholder:text-muted-foreground"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}