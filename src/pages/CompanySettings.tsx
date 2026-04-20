import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
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
];

const industryOptions = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
  "Energy",
  "Transportation",
  "Real Estate",
  "Agriculture",
  "Entertainment",
  "Consulting",
  "Infrastructure & Mobility",
];

const esgPriorityOptions = [
  "Environmental Impact",
  "Social Responsibility",
  "Corporate Governance",
  "Diversity & Inclusion",
  "Data Privacy",
  "Supply Chain Ethics",
  "Stakeholder Engagement",
  "Risk Management",
];

const companySettingsSchema = z.object({
  email: z.string().email(),
  companyName: z.string().min(2, "Name is required"),
  tagline: z.string().max(200).optional(),
  description: z.string().max(500).optional(),
  location: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  contactPhone: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  industry: z.string().optional(),
  employeesCount: z.number().optional(),
  yearFounded: z.number().optional(),
  sustainabilityGoals: z.array(z.string()).optional(),
  esgPriorities: z.array(z.string()).optional(),
  sdgs: z.array(z.string()).optional(),
});

type CompanySettingsFormValues = z.infer<typeof companySettingsSchema>;
interface CompanyProfileResponse {
  is_okta_user?: boolean;
  email: string | null;
  company_name: string | null;
  tagline: string | null;
  description: string | null;
  location: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  website: string | null;
  industry: string | null;
  employees_count: number | null;
  founded_year: number | null;
  esg_priorities: string[] | null;
  avatar_url: string | null;
  dashboard_banner_url?: string | null;
  cover_image_url?: string | null;
  sdgs: Array<{ id: number; name: string }>;
}

const STORAGE_KEY = "company-settings";

function loadStoredSettings(): {
  values: Partial<CompanySettingsFormValues>;
  logoUrl: string | null;
  bannerUrl: string | null;
} {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const yearFounded = parsed.yearFounded;
      const employeesCount = parsed.employeesCount;
      if (yearFounded != null) parsed.yearFounded = Number(yearFounded);
      if (employeesCount != null) parsed.employeesCount = Number(employeesCount);
      const { avatar_url, dashboard_banner_url, ...rest } = parsed;
      return {
        values: rest as Partial<CompanySettingsFormValues>,
        logoUrl: typeof avatar_url === "string" ? avatar_url : null,
        bannerUrl: typeof dashboard_banner_url === "string" ? dashboard_banner_url : null,
      };
    }
  } catch {
    // ignore
  }
  return { values: {}, logoUrl: null, bannerUrl: null };
}

export default function CompanySettings() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const [isOktaUser, setIsOktaUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isDemo } = useSessionMode();
  const { refreshSession, user, loading: authLoading } = useAuth();
  const sessionChecked = !authLoading;
  const { sdgs } = useTaxonomyLists();
  const sdgOptions = sdgs.map((sdg) => sdg.name);
  const sdgOptionLabels = Object.fromEntries(sdgs.map((sdg) => [sdg.name, translateSdgName(sdg, t)]));
  const { values: storedValues, logoUrl: storedLogo, bannerUrl: storedBanner } = loadStoredSettings();
  const [savedLogoUrl, setSavedLogoUrl] = useState<string | null>(() => storedLogo ?? null);
  const [pendingLogoUrl, setPendingLogoUrl] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [savedBannerUrl, setSavedBannerUrl] = useState<string | null>(() => storedBanner ?? null);
  const [pendingBannerUrl, setPendingBannerUrl] = useState<string | null>(null);
  const [bannerError, setBannerError] = useState<string | null>(null);
  const [isBannerUploading, setIsBannerUploading] = useState(false);
  const showOnboardingNotice = sessionChecked && !isLoading && user?.company_onboarding_completed !== true;
  const displayName = user?.user_metadata?.full_name ?? user?.email ?? t("onboarding.genericName");

  const form = useForm<CompanySettingsFormValues>({
    resolver: zodResolver(companySettingsSchema),
    defaultValues: {
      email: "",
      companyName: "",
      tagline: "",
      description: "",
      location: "",
      contactEmail: "",
      contactPhone: "",
      website: "",
      industry: "",
      employeesCount: undefined,
      yearFounded: undefined,
      sustainabilityGoals: [],
      esgPriorities: [],
      sdgs: [],
      ...storedValues,
    },
  });

  useEffect(() => {
    if (!sessionChecked || isDemo) return;
    const token = getStoredToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    apiGet<CompanyProfileResponse>("/api/company/profile", token)
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
          email: data.email ?? "",
          companyName: data.company_name ?? "",
          tagline: data.tagline ?? "",
          description: data.description ?? "",
          location: data.location ?? "",
          contactEmail: data.contact_email ?? "",
          contactPhone: data.contact_phone ?? "",
          website: data.website ?? "",
          industry: data.industry ?? "",
          employeesCount: data.employees_count ?? undefined,
          yearFounded: data.founded_year ?? undefined,
          sustainabilityGoals: [],
          esgPriorities: data.esg_priorities ?? [],
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

  const onSubmit = async (data: CompanySettingsFormValues) => {
    const toStore: Record<string, unknown> = {
      companyName: data.companyName,
      tagline: data.tagline,
      description: data.description,
      location: data.location,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      website: data.website,
      industry: data.industry,
      employeesCount: data.employeesCount,
      yearFounded: data.yearFounded,
      sustainabilityGoals: data.sustainabilityGoals,
      esgPriorities: data.esgPriorities,
      sdgs: data.sdgs,
      avatar_url: logoUrl ? logoUrl.split("?")[0] : null,
      dashboard_banner_url: bannerUrl ? bannerUrl.split("?")[0] : null,
    };
    if (!isOktaUser) {
      toStore.email = data.email;
    }

    if (isDemo) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
      toast({
        title: t("Settings saved"),
        description: t("Your company profile has been updated."),
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

    const { error } = await apiPut<CompanyProfileResponse>("/api/company/profile", toStore, token);
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
      description: t("Your company profile has been updated."),
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
      const { url, error } = await uploadProfileImage("company_logo", file, token);
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
      const { url, error } = await uploadBannerImage("company_banner", file, token);
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
                <Skeleton className="h-4 w-24" />
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Email")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="email@exemplo.com"
                          className="pl-10"
                          disabled={isOktaUser}
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
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Company Name")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder={t("Company name")} className="pl-10" disabled={isOktaUser} {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tagline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Tagline")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("A brief description of your company...")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>{t("Company Logo")}</FormLabel>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isLogoUploading}
                    onClick={() => document.getElementById("company-settings-logo-upload")?.click()}
                  >
                    <FileImage className="h-4 w-4 mr-2" />
                    {t("Choose File")}
                  </Button>
                  <Input
                    id="company-settings-logo-upload"
                    type="file"
                    accept={PROFILE_IMAGE_ACCEPT}
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  {logoUrl && (
                    <img
                      key={logoUrl}
                      src={logoUrl}
                      alt={t("Company Logo")}
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
                    onClick={() => document.getElementById("company-settings-banner-upload")?.click()}
                  >
                    <FileImage className="h-4 w-4 mr-2" />
                    {t("Choose File")}
                  </Button>
                  <Input
                    id="company-settings-banner-upload"
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
                    <FormLabel>{t("Company Description")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("Describe your company...")}
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
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Industry")}</FormLabel>
                    <FormControl>
                      <TagSelector
                        options={industryOptions}
                        selectedTags={field.value ? [field.value] : []}
                        onTagsChange={(tags) => field.onChange(tags[0] ?? "")}
                        placeholder={t("Select your industry...")}
                        maxTags={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="employeesCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Number of Employees")}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="50"
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
                  name="yearFounded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Year Founded")}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="2020"
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
              </div>

              <FormField
                control={form.control}
                name="esgPriorities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("ESG Priorities")}</FormLabel>
                    <FormControl>
                      <TagSelector
                        options={esgPriorityOptions}
                        selectedTags={field.value ?? []}
                        onTagsChange={field.onChange}
                        placeholder={t("Select ESG priorities...")}
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
                        placeholder={t("Select SDGs aligned with your company...")}
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

