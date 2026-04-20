import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { AlertCircle, Mail, Phone, Globe, Building2, MapPin, FileImage } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { TagSelector } from "@/components/registration/TagSelector";
import { useTaxonomyLists } from "@/hooks/useTaxonomyLists";
import { apiGet, apiPut, getStoredToken, uploadBannerImage, uploadProfileImage } from "@/services/authApi";
import { useSessionMode } from "@/hooks/useSessionMode";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PROFILE_IMAGE_ACCEPT, validateProfileImage } from "@/utils/profileImages";
import { translateSdgName } from "@/utils/sdgI18n";
import { translateCauseName } from "@/utils/taxonomyI18n";

const countries = [
  { code: "at", name: "Austria", flag: "🇦🇹" },
  { code: "be", name: "Belgium", flag: "🇧🇪" },
  { code: "pt", name: "Portugal", flag: "🇵🇹" },
  { code: "es", name: "Spain", flag: "🇪🇸" },
  { code: "fr", name: "France", flag: "🇫🇷" },
  { code: "de", name: "Germany", flag: "🇩🇪" },
  { code: "it", name: "Italy", flag: "🇮🇹" },
  { code: "nl", name: "Netherlands", flag: "🇳🇱" },
  { code: "uk", name: "United Kingdom", flag: "🇬🇧" },
  { code: "us", name: "United States", flag: "🇺🇸" },
  { code: "br", name: "Brazil", flag: "🇧🇷" },
  { code: "bg", name: "Bulgaria", flag: "🇧🇬" },
  { code: "hr", name: "Croatia", flag: "🇭🇷" },
  { code: "cy", name: "Cyprus", flag: "🇨🇾" },
  { code: "cz", name: "Czech Republic", flag: "🇨🇿" },
  { code: "dk", name: "Denmark", flag: "🇩🇰" },
  { code: "ee", name: "Estonia", flag: "🇪🇪" },
  { code: "fi", name: "Finland", flag: "🇫🇮" },
  { code: "gr", name: "Greece", flag: "🇬🇷" },
  { code: "hu", name: "Hungary", flag: "🇭🇺" },
  { code: "ie", name: "Ireland", flag: "🇮🇪" },
  { code: "lv", name: "Latvia", flag: "🇱🇻" },
  { code: "lt", name: "Lithuania", flag: "🇱🇹" },
  { code: "lu", name: "Luxembourg", flag: "🇱🇺" },
  { code: "mt", name: "Malta", flag: "🇲🇹" },
  { code: "pl", name: "Poland", flag: "🇵🇱" },
  { code: "ro", name: "Romania", flag: "🇷🇴" },
  { code: "sk", name: "Slovakia", flag: "🇸🇰" },
  { code: "si", name: "Slovenia", flag: "🇸🇮" },
  { code: "se", name: "Sweden", flag: "🇸🇪" },
];

const organizationTypeOptions = [
  "Nonprofit",
  "NGO",
  "Foundation",
  "Charity",
  "Social Enterprise",
  "Community Organization",
  "Religious Organization",
  "Educational Institution",
  "Research Institute",
];

const settingsSchema = z.object({
  companyName: z.string().min(2, "Name is required"),
  description: z
    .string()
    .min(1, "Organization description is required")
    .max(500, "Description must be 500 characters or less"),
  location: z.string().min(1, "Country is required"),
  contactEmail: z
    .string()
    .min(1, "Contact email is required")
    .email("Contact email must be a valid email"),
  contactPhone: z.string().optional(),
  website: z
    .string()
    .min(1, "Website is required")
    .url("Website must be a valid URL"),
  organizationType: z.string().min(1, "Organization type is required"),
  yearFounded: z
    .number({ required_error: "Year founded is required", invalid_type_error: "Year founded is required" })
    .int("Year founded must be a whole number")
    .gte(1800, "Year founded must be 1800 or later")
    .lte(new Date().getFullYear(), "Year founded cannot be in the future"),
  causes: z.array(z.string()).min(1, "Select at least one cause"),
  sdgs: z.array(z.string()).min(1, "Select at least one SDG"),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;
interface NonprofitProfileResponse {
  is_okta_user?: boolean;
  organization_name: string | null;
  description: string | null;
  location: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  website: string | null;
  organization_type: string | null;
  year_founded: number | null;
  avatar_url: string | null;
  dashboard_banner_url?: string | null;
  cover_image_url?: string | null;
  sdgs: Array<{ id: number; name: string }>;
  causes: Array<{ id: string; name: string }>;
}

const STORAGE_KEY = "nonprofit-settings";

function loadStoredSettings(): {
  values: Partial<SettingsFormValues>;
  logoUrl: string | null;
  bannerUrl: string | null;
} {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const yearFounded = parsed.yearFounded;
      if (yearFounded != null) parsed.yearFounded = Number(yearFounded);
      const { avatar_url, dashboard_banner_url, ...rest } = parsed;
      return {
        values: rest as Partial<SettingsFormValues>,
        logoUrl: typeof avatar_url === "string" ? avatar_url : null,
        bannerUrl: typeof dashboard_banner_url === "string" ? dashboard_banner_url : null,
      };
    }
  } catch {
    // ignore
  }
  return { values: {}, logoUrl: null, bannerUrl: null };
}

const { values: storedValues, logoUrl: storedLogo, bannerUrl: storedBanner } = loadStoredSettings();
const defaultValues: SettingsFormValues = {
  companyName: "",
  description: "",
  location: "",
  contactEmail: "",
  contactPhone: "",
  website: "",
  organizationType: "",
  yearFounded: undefined,
  causes: [],
  sdgs: [],
  ...storedValues,
};

export default function NonprofitSettings() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const [isOktaUser, setIsOktaUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isDemo } = useSessionMode();
  const { refreshSession, user, loading: authLoading } = useAuth();
  const sessionChecked = !authLoading;
  const [savedLogoUrl, setSavedLogoUrl] = useState<string | null>(() => storedLogo ?? null);
  const [pendingLogoUrl, setPendingLogoUrl] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [savedBannerUrl, setSavedBannerUrl] = useState<string | null>(() => storedBanner ?? null);
  const [pendingBannerUrl, setPendingBannerUrl] = useState<string | null>(null);
  const [bannerError, setBannerError] = useState<string | null>(null);
  const [isBannerUploading, setIsBannerUploading] = useState(false);
  const { causes, sdgs } = useTaxonomyLists();
  const causeOptions = causes.map((cause) => cause.name);
  const causeOptionLabels = Object.fromEntries(
    causes.map((cause) => [cause.name, translateCauseName(cause, t)])
  );
  const sdgOptions = sdgs.map((sdg) => sdg.name);
  const sdgOptionLabels = Object.fromEntries(sdgs.map((sdg) => [sdg.name, translateSdgName(sdg, t)]));
  const showOnboardingNotice = sessionChecked && !isLoading && user?.nonprofit_onboarding_completed !== true;
  const displayName = user?.user_metadata?.full_name ?? user?.email ?? t("onboarding.genericName");

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!sessionChecked || isDemo) return;
    const token = getStoredToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    apiGet<NonprofitProfileResponse>("/api/nonprofit/profile", token)
      .then(({ data, error }) => {
        if (error || !data) {
          toast({
            title: t("Unable to load settings"),
            description: error ?? t("Request failed."),
            variant: "destructive",
          });
          return;
        }
        form.reset({
          companyName: data.organization_name ?? "",
          description: data.description ?? "",
          location: data.location ?? "",
          contactEmail: data.contact_email ?? "",
          contactPhone: data.contact_phone ?? "",
          website: data.website ?? "",
          organizationType: data.organization_type ?? "",
          yearFounded: data.year_founded ?? undefined,
          causes: (data.causes ?? []).map((cause) => cause.name),
          sdgs: (data.sdgs ?? []).map((sdg) => sdg.name),
        });
        setIsOktaUser(Boolean(data.is_okta_user));
        setSavedLogoUrl(data.avatar_url ?? null);
        setPendingLogoUrl(null);
        setSavedBannerUrl(data.dashboard_banner_url ?? data.cover_image_url ?? null);
        setPendingBannerUrl(null);
      })
      .finally(() => setIsLoading(false));
  }, [sessionChecked, isDemo, form, t]);

  useEffect(() => {
    if (sessionChecked && isDemo) {
      setIsLoading(false);
    }
  }, [sessionChecked, isDemo]);

  const logoUrl = pendingLogoUrl ?? savedLogoUrl;
  const bannerUrl = pendingBannerUrl ?? savedBannerUrl;

  const onSubmit = async (data: SettingsFormValues) => {
    const toStore: Record<string, unknown> = {
      companyName: data.companyName,
      description: data.description,
      location: data.location,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      website: data.website,
      organizationType: data.organizationType,
      yearFounded: data.yearFounded,
      causes: data.causes,
      sdgs: data.sdgs,
      avatar_url: logoUrl ? logoUrl.split("?")[0] : null,
      dashboard_banner_url: bannerUrl ? bannerUrl.split("?")[0] : null,
    };

    if (isDemo) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
      toast({
        title: t("Settings saved"),
        description: t("Your organization profile has been updated."),
      });
      return;
    }

    const token = getStoredToken();
    if (!token) {
      toast({
        title: t("Unable to save settings"),
        description: t("Session expired. Please sign in again."),
        variant: "destructive",
      });
      return;
    }

    const { error } = await apiPut<NonprofitProfileResponse>("/api/nonprofit/profile", toStore, token);
    if (error) {
      toast({
        title: t("Unable to save settings"),
        description: error,
        variant: "destructive",
      });
      return;
    }

    setSavedLogoUrl(logoUrl ? logoUrl.split("?")[0] : null);
    setPendingLogoUrl(null);
    setSavedBannerUrl(bannerUrl ? bannerUrl.split("?")[0] : null);
    setPendingBannerUrl(null);
    await refreshSession();
    toast({
      title: t("Settings saved"),
      description: t("Your organization profile has been updated."),
    });
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) {
      const validationError = validateProfileImage(file);
      if (validationError) {
        setLogoError(validationError);
        return;
      }
      setLogoError(null);
      if (isDemo) {
        const reader = new FileReader();
        reader.onloadend = () => setSavedLogoUrl(reader.result as string);
        reader.readAsDataURL(file);
        return;
      }
      const token = getStoredToken();
      if (!token) {
        setLogoError(t("Session expired. Please sign in again."));
        return;
      }
      setIsLogoUploading(true);
      const { url, error } = await uploadProfileImage("nonprofit_logo", file, token);
      setIsLogoUploading(false);
      if (error || !url) {
        setLogoError(error ?? t("Unable to upload image."));
        return;
      }
      setPendingLogoUrl(`${url}?t=${Date.now()}`);
    }
  };

  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) {
      const validationError = validateProfileImage(file);
      if (validationError) {
        setBannerError(validationError);
        return;
      }
      setBannerError(null);
      if (isDemo) {
        const reader = new FileReader();
        reader.onloadend = () => setSavedBannerUrl(reader.result as string);
        reader.readAsDataURL(file);
        return;
      }
      const token = getStoredToken();
      if (!token) {
        setBannerError(t("Session expired. Please sign in again."));
        return;
      }
      setIsBannerUploading(true);
      const { url, error } = await uploadBannerImage("nonprofit_banner", file, token);
      setIsBannerUploading(false);
      if (error || !url) {
        setBannerError(error ?? t("Unable to upload image."));
        return;
      }
      setPendingBannerUrl(`${url}?t=${Date.now()}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main
        className={cn(
          "transition-all duration-300 ease-in-out p-4 md:p-8",
          !isMobile && "responsive-layout"
        )}
      >
        <PageHeader
          title={t("Settings")}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        {showOnboardingNotice && (
          <Alert className="mt-4 border-amber-300 bg-amber-50 text-amber-900 shadow-sm">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <AlertTitle>{t("onboarding.profileNoticeTitle")}</AlertTitle>
            <AlertDescription>
              {t("onboarding.profileNotice", { name: displayName })}
            </AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="space-y-6">
            <div className="glass-card p-6 space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-24 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-10 w-36" />
            </div>
          </div>
        ) : (
          <div className={cn(showOnboardingNotice && "mt-6")}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="glass-card p-6 space-y-6">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Organization Name")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder={t("Organization name")} className="pl-10" disabled={isOktaUser} {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>{t("Organization Logo")}</FormLabel>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isLogoUploading}
                      onClick={() => document.getElementById("settings-logo-upload")?.click()}
                    >
                      <FileImage className="h-4 w-4 mr-2" />
                      {t("Choose File")}
                    </Button>
                    <Input
                      id="settings-logo-upload"
                      type="file"
                      accept={PROFILE_IMAGE_ACCEPT}
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                    {logoUrl && (
                      <img
                        key={logoUrl}
                        src={logoUrl}
                        alt={t("Organization Logo")}
                        className="w-16 h-16 rounded-lg object-contain bg-muted/50"
                      />
                    )}
                  </div>
                  {logoError && (
                    <p className="text-sm font-medium text-destructive">{logoError}</p>
                  )}
                </FormItem>

                <FormItem>
                  <FormLabel>{t("Dashboard Banner")}</FormLabel>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isBannerUploading}
                      onClick={() => document.getElementById("nonprofit-settings-banner-upload")?.click()}
                    >
                      <FileImage className="h-4 w-4 mr-2" />
                      {t("Choose File")}
                    </Button>
                    <Input
                      id="nonprofit-settings-banner-upload"
                      type="file"
                      accept={PROFILE_IMAGE_ACCEPT}
                      onChange={handleBannerChange}
                      className="hidden"
                    />
                  </div>
                  {bannerUrl && (
                    <img
                      key={bannerUrl}
                      src={bannerUrl}
                      alt={t("Dashboard Banner")}
                      className="mt-3 h-20 w-full max-w-md rounded-lg object-cover border"
                    />
                  )}
                  {bannerError && (
                    <p className="text-sm font-medium text-destructive">{bannerError}</p>
                  )}
                </FormItem>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Organization Description")}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t("Describe your organization...")}
                          maxCount={500}
                          showCount
                          className="min-h-[100px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Location")}</FormLabel>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                          <FormControl>
                            <SelectTrigger className="pl-10">
                              <SelectValue placeholder={t("Select a country")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>{t("Countries")}</SelectLabel>
                              {countries.map((c) => (
                                <SelectItem key={c.code} value={c.code}>
                                  <span className="flex items-center gap-2">
                                    <span>{c.flag}</span>
                                    <span>{c.name}</span>
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

                <div className="space-y-4 pt-2">
                  <h4 className="text-sm font-semibold">{t("Contact Information")}</h4>
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("Contact Email")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="contact@company.com"
                              className="pl-10"
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
                        <FormLabel>{t("Contact Phone")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="+1 (555) 123-4567"
                              className="pl-10"
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
                        <FormLabel>{t("Website")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="https://www.company.com"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="organizationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Organization Type")}</FormLabel>
                      <FormControl>
                        <TagSelector
                          options={organizationTypeOptions}
                          selectedTags={field.value ? [field.value] : []}
                          onTagsChange={(tags) => field.onChange(tags[0] ?? "")}
                          placeholder={t("Select organization type...")}
                          maxTags={1}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearFounded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Year Founded")}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="2015"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.value ? parseInt(e.target.value, 10) : undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <FormField
                control={form.control}
                name="causes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Cause Areas")}</FormLabel>
                    <FormControl>
                      <TagSelector
                        options={causeOptions}
                        optionLabels={causeOptionLabels}
                        selectedTags={field.value ?? []}
                        onTagsChange={field.onChange}
                        placeholder={t("Select causes your organization works on...")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sdgs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Sustainable Development Goals")}</FormLabel>
                    <FormControl>
                      <TagSelector
                        options={sdgOptions}
                        optionLabels={sdgOptionLabels}
                        selectedTags={field.value ?? []}
                        onTagsChange={field.onChange}
                        placeholder={t("Select SDGs you work on...")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-coompass-success hover:bg-coompass-success/90">
                  {t("Save changes")}
                </Button>
              </div>
              </form>
            </Form>
          </div>
        )}
      </main>
    </div>
  );
}

