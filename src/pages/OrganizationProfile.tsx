import { useParams, useLocation, Link } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { organizationsData } from "@/data/organizations";
import { OrganizationProfileHeader } from "@/components/organizations/OrganizationProfileHeader";
import { OrganizationAbout } from "@/components/organizations/OrganizationAbout";
import { OrganizationMissions } from "@/components/organizations/OrganizationMissions";
import { ChevronRight } from "lucide-react";

export default function OrganizationProfile() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const isUnderCompanyLayout = location.pathname.startsWith("/company");
  const organizationsListPath = isUnderCompanyLayout ? "/company/organizations" : "/organizations";

  const organization = organizationsData.find(org => org.id === Number(id));

  if (!organization) {
    return (
      <div className="min-h-screen bg-background">
        {!isUnderCompanyLayout && <AppSidebar />}
        <main className={cn(
          "transition-all duration-300 ease-in-out p-4 md:p-8",
          !isMobile && "responsive-layout"
        )}>
          <PageHeader 
            title={t('Organization Not Found')}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          <div className="glass-card p-6">
            <p>{t('The organization you are looking for does not exist.')}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {!isUnderCompanyLayout && <AppSidebar />}
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={organization.name}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        {/* Breadcrumb navigation */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link 
                  to={organizationsListPath} 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('Organizations')}
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="ml-2 text-sm font-medium">{organization.name}</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-4">
            <OrganizationProfileHeader organization={organization} />
          </div>
          <div className="lg:col-span-8">
            <OrganizationAbout organization={organization} />
          </div>
        </div>
        
        <div className="space-y-6">
          <OrganizationMissions organization={organization} />
        </div>
      </main>
    </div>
  );
}
