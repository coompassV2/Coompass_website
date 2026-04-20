import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import { ApplicationsTable } from "@/components/employees/ApplicationsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CompanyMissionApplicationsResponse,
  CompanyMissionApplicationApiRow,
  MissionApplication,
} from "@/components/employees/types";
import { CompanyAdminTab } from "@/components/company/CompanyAdminTab";
import { CompanyNonprofitInvitesTab } from "@/components/company/CompanyNonprofitInvitesTab";
import { useAuth } from "@/contexts/AuthContext";
import { apiGet, getStoredToken } from "@/services/authApi";
import { SearchInput } from "@/components/shared/SearchInput";
import { RefreshCw } from "lucide-react";

function mapApiApplication(row: CompanyMissionApplicationApiRow): MissionApplication {
  return {
    id: row.id,
    missionId: row.mission_id,
    missionTitle: row.mission_title,
    volunteerId: row.volunteer_id,
    volunteerName: row.volunteer_name,
    volunteerDepartment: row.volunteer_department,
    nonprofitId: row.nonprofit_id,
    nonprofitName: row.nonprofit_name,
    nonprofitLogoUrl: row.nonprofit_logo_url,
    appliedAt: row.applied_at,
    status: row.status,
  };
}

function ApplicationsLoadingSkeleton() {
  return (
    <div className="space-y-2 rounded-lg border border-border/60 bg-muted/10 p-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} className="h-11 w-full" />
      ))}
    </div>
  );
}

export default function CompanyEmployees() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();
  const isCompanyAdmin = user?.role === "company_admin";

  const validTabs = useMemo(
    () => ["applications", "leaderboard", ...(isCompanyAdmin ? ["admin", "nonprofits"] : [])],
    [isCompanyAdmin]
  );
  const defaultTab = isCompanyAdmin ? "admin" : "applications";
  const tabParam = searchParams.get("tab");
  const activeTab =
    tabParam && validTabs.includes(tabParam) ? tabParam : defaultTab;

  const [applications, setApplications] = useState<MissionApplication[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [applicationsError, setApplicationsError] = useState<string | null>(null);
  const [applicationsSearch, setApplicationsSearch] = useState("");
  const [applicationsRefreshKey, setApplicationsRefreshKey] = useState(0);
  const [adminRefreshKey, setAdminRefreshKey] = useState(0);
  const [nonprofitsRefreshKey, setNonprofitsRefreshKey] = useState(0);

  useEffect(() => {
    if (!tabParam || !validTabs.includes(tabParam)) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("tab", defaultTab);
          return next;
        },
        { replace: true }
      );
    }
  }, [tabParam, defaultTab, validTabs, setSearchParams]);

  const handleTabChange = useCallback(
    (value: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("tab", value);
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const handleRefreshCurrentTab = useCallback(() => {
    switch (activeTab) {
      case "applications":
        setApplicationsRefreshKey((k) => k + 1);
        break;
      case "admin":
        setAdminRefreshKey((k) => k + 1);
        break;
      case "nonprofits":
        setNonprofitsRefreshKey((k) => k + 1);
        break;
      default:
        break;
    }
  }, [activeTab]);

  useEffect(() => {
    let cancelled = false;
    const token = getStoredToken();
    setApplicationsLoading(true);
    setApplicationsError(null);

    apiGet<CompanyMissionApplicationsResponse>("/api/company/applications", token)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setApplications([]);
          setApplicationsError(error);
          setApplicationsLoading(false);
          return;
        }
        setApplications((data?.applications ?? []).map(mapApiApplication));
        setApplicationsError(null);
        setApplicationsLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setApplications([]);
        setApplicationsError(t("Unable to load applications."));
        setApplicationsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [t, applicationsRefreshKey]);

  const filteredApplications = useMemo(() => {
    const query = applicationsSearch.trim().toLocaleLowerCase();
    if (!query) return applications;
    return applications.filter((application) =>
      application.volunteerName.toLocaleLowerCase().includes(query)
    );
  }, [applications, applicationsSearch]);

  const applicationCountLabel = useMemo(() => {
    if (applicationsLoading) return null;
    return t("applicationsCount", { count: filteredApplications.length });
  }, [applicationsLoading, filteredApplications.length, t]);

  return (
    <div className="min-h-screen bg-background">
      <main
        className={cn(
          "transition-all duration-300 ease-in-out p-4 md:p-8",
          !isMobile && "responsive-layout"
        )}
      >
        <PageHeader title={t("Employees")} theme={theme} toggleTheme={toggleTheme} />

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <TabsList
              className={cn(
                "grid h-9 w-full gap-2 sm:w-auto",
                isCompanyAdmin ? "max-w-3xl grid-cols-2 sm:grid-cols-4" : "max-w-md grid-cols-2"
              )}
            >
              {isCompanyAdmin && <TabsTrigger value="admin">{t("Admin")}</TabsTrigger>}
              <TabsTrigger value="applications">{t("Applications")}</TabsTrigger>
              <TabsTrigger value="leaderboard">{t("Leaderboard")}</TabsTrigger>
              {isCompanyAdmin && (
                <TabsTrigger value="nonprofits">{t("Nonprofit invites tab")}</TabsTrigger>
              )}
            </TabsList>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                    onClick={handleRefreshCurrentTab}
                    aria-label={t("Refresh tab")}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{t("Refresh tab")}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {isCompanyAdmin && (
            <TabsContent value="admin" className="mt-3 space-y-4">
              <CompanyAdminTab refreshKey={adminRefreshKey} />
            </TabsContent>
          )}

          <TabsContent value="applications" className="mt-3 space-y-4">
            <Card className="overflow-hidden border-border/80 shadow-sm">
              <CardHeader className="border-b border-border/60 bg-muted/20">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1.5">
                    <CardTitle className="text-xl font-semibold">{t("Applications")}</CardTitle>
                    <CardDescription>{t("Company employees applications description")}</CardDescription>
                  </div>
                  {applicationCountLabel && (
                    <p className="shrink-0 whitespace-nowrap text-sm tabular-nums text-muted-foreground sm:pt-1">
                      {applicationCountLabel}
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="max-w-[360px]">
                  <SearchInput
                    placeholder={t("Search by name...")}
                    value={applicationsSearch}
                    onChange={setApplicationsSearch}
                  />
                </div>

                {applicationsLoading ? (
                  <ApplicationsLoadingSkeleton />
                ) : applicationsError ? (
                  <div className="rounded-lg border border-dashed border-border/80 bg-muted/15 p-8 text-center text-sm text-muted-foreground">
                    {applicationsError}
                  </div>
                ) : (
                  <ApplicationsTable applications={filteredApplications} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-3 space-y-4">
            <Card className="border-border/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{t("Leaderboard")}</CardTitle>
                <CardDescription>{t("Company employees leaderboard description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-dashed border-border/80 bg-muted/15 py-12 text-center text-sm text-muted-foreground">
                  {t("This feature is under development. Check back later.")}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {isCompanyAdmin && (
            <TabsContent value="nonprofits" className="mt-3 space-y-4">
              <CompanyNonprofitInvitesTab refreshSignal={nonprofitsRefreshKey} />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
}
