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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Mail, MapPin, FileImage, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { apiGet, apiPut, changePassword, getStoredToken, uploadProfileImage } from "@/services/authApi";
import { useSessionMode } from "@/hooks/useSessionMode";
import { useAuth } from "@/contexts/AuthContext";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PROFILE_IMAGE_ACCEPT, validateProfileImage } from "@/utils/profileImages";

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
const countryCodes = countries.map((country) => country.code);

const profileSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email(),
  description: z
    .string()
    .min(1, "Bio is required")
    .max(500, "Bio must be 500 characters or less"),
  location: z
    .string()
    .min(1, "Country is required")
    .refine((value) => countryCodes.includes(value), {
      message: "Please select a valid country",
    }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface UserProfileResponse {
  full_name: string | null;
  email: string | null;
  is_okta_user?: boolean;
  auth_provider?: "password" | "okta";
  description: string | null;
  location: string | null;
  avatar_url: string | null;
}

const STORAGE_KEY = "user-profile-settings";

function loadStoredSettings(): {
  values: Partial<ProfileFormValues>;
  avatarUrl: string | null;
} {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const { avatar_url, ...rest } = parsed;
      return {
        values: rest as Partial<ProfileFormValues>,
        avatarUrl: typeof avatar_url === "string" ? avatar_url : null,
      };
    }
  } catch {
    // ignore
  }
  return { values: {}, avatarUrl: null };
}

export default function UserProfileSettings() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const [isOktaUser, setIsOktaUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isDemo } = useSessionMode();
  const { refreshSession, user, loading: authLoading } = useAuth();
  const sessionChecked = !authLoading;
  const { values: storedValues, avatarUrl: storedAvatar } = loadStoredSettings();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(() => storedAvatar ?? null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const [authProvider, setAuthProvider] = useState<"password" | "okta">("password");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);
  const isIdentityManaged = authProvider === "okta" || isOktaUser;
  const showOnboardingNotice = sessionChecked && !isLoading && user?.onboarding === false;
  const displayName = user?.user_metadata?.full_name ?? user?.email ?? t("onboarding.genericName");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      description: "",
      location: "",
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

    apiGet<UserProfileResponse>("/api/users/profile", token)
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
          description: data.description ?? "",
          location: data.location ?? "",
        });
        setIsOktaUser(Boolean(data.is_okta_user));
        setAuthProvider(data.auth_provider === "okta" ? "okta" : "password");
        setAvatarUrl(data.avatar_url ?? null);
      })
      .finally(() => setIsLoading(false));
  }, [sessionChecked, isDemo, form, t]);

  useEffect(() => {
    if (sessionChecked && isDemo) {
      setIsLoading(false);
    }
  }, [sessionChecked, isDemo]);

  const onSubmit = async (data: ProfileFormValues) => {
    const toStore: Record<string, unknown> = {
      description: data.description,
      location: data.location,
      avatar_url: avatarUrl,
    };

    if (!isIdentityManaged) {
      toStore.fullName = data.fullName;
      toStore.email = data.email;
    }

    if (isDemo) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
      toast({
        title: t("Settings saved"),
        description: t("Your profile has been updated."),
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

    const { error } = await apiPut<UserProfileResponse>("/api/users/profile", toStore, token);

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
      description: t("Your profile has been updated."),
    });
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

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
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isIdentityManaged) return;
    if (newPassword.length < 8) {
      toast({
        title: t("Unable to change password"),
        description: t("Password must be at least 8 characters."),
        variant: "destructive",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({
        title: t("Unable to change password"),
        description: t("Passwords do not match."),
        variant: "destructive",
      });
      return;
    }
    const token = getStoredToken();
    if (!token) {
      toast({
        title: t("Unable to change password"),
        description: t("Session expired. Please sign in again."),
        variant: "destructive",
      });
      return;
    }
    setIsPasswordSubmitting(true);
    const { error } = await changePassword(currentPassword, newPassword, token);
    setIsPasswordSubmitting(false);
    if (error) {
      toast({
        title: t("Unable to change password"),
        description: error,
        variant: "destructive",
      });
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toast({
      title: t("Password changed"),
      description: t("Your password has been updated."),
    });
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
          title={t("Profile")}
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

                  <FormItem>
                    <FormLabel>{t("Profile Picture")}</FormLabel>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isAvatarUploading}
                        onClick={() => document.getElementById("user-profile-avatar-upload")?.click()}
                      >
                        <FileImage className="h-4 w-4 mr-2" />
                        {t("Choose File")}
                      </Button>
                      <Input
                        id="user-profile-avatar-upload"
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
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-coompass-success hover:bg-coompass-success/90">
                    {t("Save changes")}
                  </Button>
                </div>
              </form>
            </Form>
            <div className="glass-card p-6 space-y-4 mt-6">
              <h2 className="text-base font-semibold">{t("Change password")}</h2>
              {isIdentityManaged ? (
                <p className="text-sm text-muted-foreground">
                  {t("This account is managed by your identity provider (Okta). Password changes are unavailable here.")}
                </p>
              ) : (
                <form onSubmit={handlePasswordSubmit} className="space-y-3">
                  <Input
                    type="password"
                    autoComplete="current-password"
                    placeholder={t("Current password")}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    autoComplete="new-password"
                    placeholder={t("New password")}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    autoComplete="new-password"
                    placeholder={t("Confirm new password")}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isPasswordSubmitting}>
                      {isPasswordSubmitting ? t("Saving...") : t("Update password")}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
