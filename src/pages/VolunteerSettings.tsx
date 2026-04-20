import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
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
import { AlertCircle, Mail, MapPin, FileImage, User, Briefcase } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { TagSelector } from "@/components/registration/TagSelector";
import { useTaxonomyLists } from "@/hooks/useTaxonomyLists";
import {
  loadVolunteerPreferences,
  saveVolunteerPreferences,
  type VolunteerPreferences,
} from "@/utils/volunteerPreferences";
import { useSessionMode } from "@/hooks/useSessionMode";
import { apiGet, apiPut, getStoredOktaIdToken, getStoredToken, uploadProfileImage } from "@/services/authApi";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PROFILE_IMAGE_ACCEPT, validateProfileImage } from "@/utils/profileImages";
import { translateSdgName } from "@/utils/sdgI18n";
import { translateCauseName, translateSkillName } from "@/utils/taxonomyI18n";

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

const volunteerSettingsSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email(),
  department: z.string().trim().min(1, "Department is required"),
  description: z.string().max(500).optional(),
  location: z.string().optional(),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  causeAreas: z.array(z.string()).optional(),
  sdgs: z.array(z.string()).optional(),
});

type VolunteerSettingsFormValues = z.infer<typeof volunteerSettingsSchema>;
interface VolunteerProfileResponse {
  full_name: string | null;
  email: string | null;
  department: string | null;
  is_okta_user?: boolean;
  description: string | null;
  location: string | null;
  avatar_url: string | null;
  skills: string[] | null;
  cause_areas: string[] | null;
  sdgs: string[] | null;
}

const STORAGE_KEY = "volunteer-settings";
const PREFERENCES_KEY = "brisa-volunteer-preferences";

function loadStoredSettings(): {
  values: Partial<VolunteerSettingsFormValues>;
  avatarUrl: string | null;
} {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const { avatar_url, ...rest } = parsed;
      return {
        values: rest as Partial<VolunteerSettingsFormValues>,
        avatarUrl: typeof avatar_url === "string" ? avatar_url : null,
      };
    }
  } catch {
    // ignore
  }
  return { values: {}, avatarUrl: null };
}

export default function VolunteerSettings() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const [isOktaUser, setIsOktaUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isDemo } = useSessionMode();
  const { refreshSession, user, loading: authLoading } = useAuth();
  const sessionChecked = !authLoading;
  const { skills, causes, sdgs } = useTaxonomyLists();
  const skillOptions = skills.map((skill) => skill.name);
  const causeAreaOptions = causes.map((cause) => cause.name);
  const sdgOptions = sdgs.map((sdg) => sdg.name);
  const skillOptionLabels = Object.fromEntries(skills.map((skill) => [skill.name, translateSkillName(skill, t)]));
  const causeAreaOptionLabels = Object.fromEntries(
    causes.map((cause) => [cause.name, translateCauseName(cause, t)])
  );
  const sdgOptionLabels = Object.fromEntries(sdgs.map((sdg) => [sdg.name, translateSdgName(sdg, t)]));
  const { values: storedValues, avatarUrl: storedAvatar } = loadStoredSettings();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(() => storedAvatar ?? null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const isIdentityManaged = isOktaUser || Boolean(getStoredOktaIdToken());
  const showOnboardingNotice = sessionChecked && !isLoading && user?.onboarding === false;
  const displayName = user?.user_metadata?.full_name ?? user?.email ?? t("onboarding.genericName");

  const form = useForm<VolunteerSettingsFormValues>({
    resolver: zodResolver(volunteerSettingsSchema),
    defaultValues: {
      fullName: "",
      email: "",
      department: "",
      description: "",
      location: "",
      skills: [],
      causeAreas: [],
      sdgs: [],
      ...storedValues,
    },
  });

  useEffect(() => {
    if (!sessionChecked || !isDemo) return;
    const prefsRaw = localStorage.getItem(PREFERENCES_KEY);
    if (prefsRaw) {
      try {
        const prefs = JSON.parse(prefsRaw) as Partial<VolunteerPreferences>;
        form.reset({
          ...form.getValues(),
          skills: prefs.skills ?? [],
          causeAreas: prefs.causeAreas ?? [],
          sdgs: prefs.sdgs ?? [],
        });
      } catch {
        // ignore
      }
    }
  }, [isDemo, sessionChecked, form]);

  useEffect(() => {
    if (!sessionChecked || isDemo) return;
    const token = getStoredToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    apiGet<VolunteerProfileResponse>("/api/volunteers/me", token)
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
          fullName: data.full_name ?? "",
          email: data.email ?? "",
          department: data.department ?? "",
          description: data.description ?? "",
          location: data.location ?? "",
          skills: data.skills ?? [],
          causeAreas: data.cause_areas ?? [],
          sdgs: data.sdgs ?? [],
        });
        setIsOktaUser(Boolean(data.is_okta_user));
        setAvatarUrl(data.avatar_url ?? null);
      })
      .finally(() => setIsLoading(false));
  }, [sessionChecked, isDemo, form, t]);

  useEffect(() => {
    if (sessionChecked && isDemo) {
      setIsLoading(false);
    }
  }, [sessionChecked, isDemo]);

  const onSubmit = async (data: VolunteerSettingsFormValues) => {
    const toStore: Record<string, unknown> = {
      department: data.department,
      description: data.description,
      location: data.location,
      skills: data.skills,
      causeAreas: data.causeAreas,
      sdgs: data.sdgs,
      avatar_url: avatarUrl,
    };
    if (!isIdentityManaged) {
      toStore.fullName = data.fullName;
      toStore.email = data.email;
    }

    if (isDemo) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
      saveVolunteerPreferences(isDemo, {
        skills: data.skills ?? [],
        causeAreas: data.causeAreas ?? [],
        sdgs: data.sdgs ?? [],
      });
      toast({
        title: t("Settings saved"),
        description: t("Your volunteer profile has been updated."),
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

    const { error } = await apiPut<VolunteerProfileResponse>(
      "/api/volunteers/me",
      toStore,
      token
    );

    if (error) {
      toast({
        title: t("Unable to save settings"),
        description: error,
        variant: "destructive",
      });
      return;
    }

    await refreshSession();
    toast({
      title: t("Settings saved"),
      description: t("Your volunteer profile has been updated."),
    });
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) {
      const validationError = validateProfileImage(file);
      if (validationError) {
        setAvatarError(validationError);
        return;
      }
      setAvatarError(null);
      if (isDemo) {
        const reader = new FileReader();
        reader.onloadend = () => setAvatarUrl(reader.result as string);
        reader.readAsDataURL(file);
        return;
      }
      const token = getStoredToken();
      if (!token) {
        setAvatarError(t("Session expired. Please sign in again."));
        return;
      }
      setIsAvatarUploading(true);
      const { url, error } = await uploadProfileImage("user_avatar", file, token);
      setIsAvatarUploading(false);
      if (error || !url) {
        setAvatarError(error ?? t("Unable to upload image."));
        return;
      }
      setAvatarUrl(url);
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
                <Skeleton className="h-4 w-36" />
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
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Full Name")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder={t("Your name")}
                          className="pl-10"
                          disabled={isIdentityManaged}
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Email")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder={t("Email placeholder")}
                          className="pl-10"
                          disabled={isIdentityManaged}
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
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Department")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder={t("Enter your department")}
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>{t("Profile Picture")}</FormLabel>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isAvatarUploading}
                    onClick={() => document.getElementById("volunteer-settings-avatar-upload")?.click()}
                  >
                    <FileImage className="h-4 w-4 mr-2" />
                    {t("Choose File")}
                  </Button>
                  <Input
                    id="volunteer-settings-avatar-upload"
                    type="file"
                    accept={PROFILE_IMAGE_ACCEPT}
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  {avatarUrl && (
                    <img
                      src={avatarUrl}
                      alt={t("Profile Picture")}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                </div>
                {avatarError && (
                  <p className="text-sm font-medium text-destructive">{avatarError}</p>
                )}
              </FormItem>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Bio")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("Describe your interests and experience...")}
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

              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Skills & Interests")}</FormLabel>
                    <FormControl>
                      <TagSelector
                        options={skillOptions}
                        optionLabels={skillOptionLabels}
                        selectedTags={field.value ?? []}
                        onTagsChange={field.onChange}
                        placeholder={t("Select your skills...")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="causeAreas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Cause Areas")}</FormLabel>
                    <FormControl>
                      <TagSelector
                        options={causeAreaOptions}
                        optionLabels={causeAreaOptionLabels}
                        selectedTags={field.value ?? []}
                        onTagsChange={field.onChange}
                        placeholder={t("Select cause areas you care about...")}
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
                        placeholder={t("Select SDGs you care about...")}
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
