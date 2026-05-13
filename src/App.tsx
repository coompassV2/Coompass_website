import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CompanyLayout } from "@/layouts/CompanyLayout";
import { VolunteerLayout } from "@/layouts/VolunteerLayout";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Footer } from "@/components/home/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { RequireRole } from "@/components/auth/RequireRole";
import Dashboard from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Partnerships from "@/pages/Partnerships";
import Organizations from "@/pages/Organizations";
import OrganizationProfile from "@/pages/OrganizationProfile";
import Missions from "@/pages/Missions";
import MissionDetails from "@/pages/MissionDetails";
import AskAI from "@/pages/AskAI";
import LoginBrisa from "@/pages/LoginBrisa";
import Register from "@/pages/Register";
import Employees from "@/pages/Employees";
import EmployeeProfile from "@/pages/EmployeeProfile";
import Homepage from "@/pages/Homepage";
import TermsConditions from "@/pages/TermsConditions";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Newsroom from "@/pages/Newsroom";
import ForCompanies from "@/pages/ForCompanies";
import ForNonprofits from "@/pages/ForNonprofits";
import ForVolunteers from "@/pages/ForVolunteers";
import AboutUs from "@/pages/AboutUs";
import AuthCallback from "@/pages/AuthCallback";
import AuthPasswordSetup from "@/pages/AuthPasswordSetup";
import AuthPasswordRecover from "@/pages/AuthPasswordRecover";
import Leaderboard from "@/pages/Leaderboard";
import Calendar from "@/pages/Calendar";
import Wallet from "@/pages/Wallet";
import Pricing from "@/pages/Pricing";
import Services from "@/pages/Services";
import CompaniesPersona from "@/pages/personas/CompaniesPersona";
import NonprofitsPersona from "@/pages/personas/NonprofitsPersona";
import MunicipalitiesPersona from "@/pages/personas/MunicipalitiesPersona";
import UniversitiesSchoolsPersona from "@/pages/personas/UniversitiesSchoolsPersona";
import InvestorsStakeholdersPersona from "@/pages/personas/InvestorsStakeholdersPersona";
import CompanyWallet from "./pages/CompanyWallet";
import NonprofitWallet from "./pages/NonprofitWallet";
import VolunteerWallet from "./pages/VolunteerWallet";
import HelpCenter from "@/pages/HelpCenter";
import GuideDetails from "@/pages/GuideDetails";

// Import company specific pages
import CompanyDashboard from "@/pages/CompanyDashboard";
import CompanyEmployees from "@/pages/CompanyEmployees";
import CompanyAnalytics from "@/pages/CompanyAnalytics";
import CompanyProfile from "@/pages/CompanyProfile";
import CompanySettings from "@/pages/CompanySettings";
import CompanyProjects from "@/pages/CompanyProjects";
import CompanyPartnerships from "@/pages/CompanyPartnerships";
import CompanyMissionsPage from "@/pages/CompanyMissionsPage";
import CompanyProjectDetailsPage from "@/pages/CompanyProjectDetailsPage";
import CompanyCreateProjectPage from "@/pages/CompanyCreateProjectPage";
import SharedProjectsPage from "@/pages/SharedProjectsPage";
import SharedProjectDetailsPage from "@/pages/SharedProjectDetailsPage";

// Import nonprofit specific pages
import NonprofitDashboard from "@/pages/NonprofitDashboard";
import NonprofitVolunteers from "@/pages/NonprofitVolunteers";
import NonprofitPartnerships from "@/pages/NonprofitPartnerships";
import NonprofitResources from "@/pages/NonprofitResources";
import NonprofitCalendar from "@/pages/NonprofitCalendar";
import NonprofitImpact from "@/pages/NonprofitImpact";
import NonprofitProfile from "@/pages/NonprofitProfile";
import NonprofitSettings from "@/pages/NonprofitSettings";
import MissionCreatePage from "@/pages/MissionCreatePage";
import NonprofitPublicDashboard from "@/pages/NonprofitPublicDashboard";
import NonprofitPendingMissionsPage from "@/pages/NonprofitPendingMissionsPage";
import NonprofitMissionEditPage from "@/pages/NonprofitMissionEditPage";

// Import volunteer specific pages
import VolunteerDashboard from "@/pages/VolunteerDashboard";
import VolunteerMissions from "@/pages/VolunteerMissions";
import VolunteerSettings from "@/pages/VolunteerSettings";
import VolunteerSkills from "@/pages/VolunteerSkills";
import UserProfileSettings from "@/pages/UserProfileSettings";

import ImpactTrips from "./pages/ImpactTrips";
import ComingSoon from "./pages/ComingSoon";
import StakeholderDashboard from "@/pages/StakeholderDashboard";
import SystemTest from "@/pages/SystemTest";
import Demo from "@/pages/Demo";

function App() {
  return (
    <TooltipProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <GoogleAnalytics />
        <AuthProvider>
          <Routes>
            {/* ── Public routes (no auth required) ── */}
            <Route path="/" element={<Homepage />} />
            <Route path="/landing-brisa" element={<Navigate to="/" replace />} />
            <Route path="/landing" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/login-brisa" element={<LoginBrisa />} />
            <Route path="/register" element={<Register />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/for-companies" element={<ForCompanies />} />
            <Route path="/for-nonprofits" element={<ForNonprofits />} />
            <Route path="/for-volunteers" element={<ForVolunteers />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/services" element={<Services />} />
            <Route path="/personas" element={<Navigate to="/personas/companies" replace />} />
            <Route path="/personas/companies" element={<CompaniesPersona />} />
            <Route path="/personas/nonprofits" element={<NonprofitsPersona />} />
            <Route path="/personas/universities-schools" element={<UniversitiesSchoolsPersona />} />
            <Route path="/personas/municipalities" element={<MunicipalitiesPersona />} />
            <Route path="/personas/investors-stakeholders" element={<InvestorsStakeholdersPersona />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/help-center/guide/:guideId" element={<GuideDetails />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/auth/password/setup" element={<AuthPasswordSetup />} />
            <Route path="/auth/password/recover" element={<AuthPasswordRecover />} />
            <Route path="/impact-trips" element={<ImpactTrips />} />
            <Route path="/coming-soon" element={<ComingSoon />} />

            {/* ── Authenticated routes (any role) ── */}
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/employees" element={<RequireAuth><Employees /></RequireAuth>} />
            <Route path="/employees/:id" element={<RequireAuth><EmployeeProfile /></RequireAuth>} />
            <Route path="/partnerships" element={<RequireAuth><Partnerships /></RequireAuth>} />
            <Route path="/organizations" element={<RequireAuth><Organizations /></RequireAuth>} />
            <Route path="/organizations/:id" element={<RequireAuth><OrganizationProfile /></RequireAuth>} />
            <Route path="/missions" element={<RequireAuth><Missions /></RequireAuth>} />
            <Route path="/missions/:id" element={<RequireAuth><MissionDetails /></RequireAuth>} />
            <Route path="/projects" element={<RequireAuth><SharedProjectsPage /></RequireAuth>} />
            <Route path="/projects/:id" element={<RequireAuth><SharedProjectDetailsPage /></RequireAuth>} />
            <Route path="/missions/create" element={<RequireAuth><MissionCreatePage /></RequireAuth>} />
            <Route path="/calendar" element={<RequireAuth><Calendar /></RequireAuth>} />
            <Route path="/leaderboard" element={<RequireAuth><Leaderboard /></RequireAuth>} />
            <Route path="/wallet" element={<RequireAuth><Wallet /></RequireAuth>} />
            <Route path="/ask-ai" element={<RequireAuth><AskAI /></RequireAuth>} />
            <Route path="/profile" element={<RequireAuth><UserProfileSettings /></RequireAuth>} />
            <Route path="/newsroom" element={<RequireAuth><Newsroom /></RequireAuth>} />
            <Route path="/executive/dashboard" element={<RequireAuth><StakeholderDashboard /></RequireAuth>} />
            <Route path="/system-test" element={<RequireAuth><SystemTest /></RequireAuth>} />
            <Route
              path="/dev"
              element={
                import.meta.env.DEV
                  ? <Navigate to="/volunteer/dashboard" replace />
                  : <NotFound />
              }
            />

            {/* ── Company routes (company_admin only) ── */}
            <Route
              path="/company"
              element={
                <RequireAuth>
                  <RequireRole allowed={["company_admin"]}>
                    <CompanyLayout />
                  </RequireRole>
                </RequireAuth>
              }
            >
              <Route index element={<Navigate to="/company/dashboard" replace />} />
              <Route path="dashboard" element={<CompanyDashboard />} />
              <Route path="employees" element={<CompanyEmployees />} />
              <Route path="analytics" element={<CompanyAnalytics />} />
              <Route path="profile" element={<CompanyProfile />} />
              <Route path="settings" element={<CompanySettings />} />
              <Route path="projects" element={<CompanyProjects />} />
              <Route path="projects/new" element={<CompanyCreateProjectPage />} />
              <Route path="projects/:id" element={<CompanyProjectDetailsPage />} />
              <Route path="wallet" element={<CompanyWallet />} />
              <Route path="partnerships" element={<CompanyPartnerships />} />
              <Route path="missions" element={<Missions />} />
              <Route path="our-missions" element={<CompanyMissionsPage />} />
              <Route path="missions/create" element={<MissionCreatePage />} />
              <Route path="missions/:id" element={<MissionDetails />} />
              <Route path="organizations" element={<Organizations />} />
              <Route path="organizations/:id" element={<OrganizationProfile />} />
              <Route path="apadrinhamento" element={<ComingSoon embedded title="Apadrinhar" />} />
              <Route path="newsroom" element={<ComingSoon embedded title="Newsroom" />} />
            </Route>

            {/* ── Nonprofit routes (nonprofit only) ── */}
            <Route
              path="/nonprofit/dashboard"
              element={<RequireAuth><RequireRole allowed={["nonprofit"]}><NonprofitDashboard /></RequireRole></RequireAuth>}
            />
            <Route
              path="/nonprofit/dashboard/:id"
              element={<RequireAuth><NonprofitPublicDashboard /></RequireAuth>}
            />
            <Route
              path="/missions/:id/edit"
              element={<RequireAuth><RequireRole allowed={["nonprofit", "organization", "company_admin"]}><NonprofitMissionEditPage /></RequireRole></RequireAuth>}
            />
            <Route
              path="/nonprofit/missions/pending"
              element={<RequireAuth><RequireRole allowed={["nonprofit"]}><NonprofitPendingMissionsPage /></RequireRole></RequireAuth>}
            />
            <Route
              path="/nonprofit/volunteers"
              element={<RequireAuth><RequireRole allowed={["nonprofit"]}><NonprofitVolunteers /></RequireRole></RequireAuth>}
            />
            <Route
              path="/nonprofit/projects"
              element={<RequireAuth><RequireRole allowed={["nonprofit"]}><SharedProjectsPage /></RequireRole></RequireAuth>}
            />
            <Route
              path="/nonprofit/partnerships"
              element={<RequireAuth><RequireRole allowed={["nonprofit"]}><NonprofitPartnerships /></RequireRole></RequireAuth>}
            />
            <Route
              path="/nonprofit/resources"
              element={<RequireAuth><RequireRole allowed={["nonprofit"]}><NonprofitResources /></RequireRole></RequireAuth>}
            />
            <Route
              path="/nonprofit/calendar"
              element={<RequireAuth><RequireRole allowed={["nonprofit"]}><NonprofitCalendar /></RequireRole></RequireAuth>}
            />
            <Route
              path="/nonprofit/impact"
              element={<RequireAuth><RequireRole allowed={["nonprofit"]}><NonprofitImpact /></RequireRole></RequireAuth>}
            />
            <Route
              path="/nonprofit/profile"
              element={<RequireAuth><RequireRole allowed={["nonprofit"]}><NonprofitProfile /></RequireRole></RequireAuth>}
            />
            <Route
              path="/nonprofit/settings"
              element={<RequireAuth><RequireRole allowed={["nonprofit"]}><NonprofitSettings /></RequireRole></RequireAuth>}
            />
            <Route
              path="/nonprofit/wallet"
              element={<RequireAuth><RequireRole allowed={["nonprofit"]}><ComingSoon title="Wallet" /></RequireRole></RequireAuth>}
            />
            <Route
              path="/nonprofit/ask-ai"
              element={<RequireAuth><RequireRole allowed={["nonprofit"]}><ComingSoon title="Ask AI" /></RequireRole></RequireAuth>}
            />

            {/* ── Volunteer routes (volunteer only) ── */}
            <Route
              path="/volunteer"
              element={
                <RequireAuth>
                  <RequireRole allowed={["volunteer"]}>
                    <VolunteerLayout />
                  </RequireRole>
                </RequireAuth>
              }
            >
              <Route index element={<Navigate to="/volunteer/dashboard" replace />} />
              <Route path="dashboard" element={<VolunteerDashboard />} />
              <Route path="missions" element={<VolunteerMissions />} />
              <Route path="settings" element={<VolunteerSettings />} />
              <Route path="skills" element={<VolunteerSkills />} />
              <Route path="wallet" element={<VolunteerWallet />} />
              <Route path="newsroom" element={<ComingSoon embedded title="Newsroom" />} />
              <Route path="calendar" element={<ComingSoon embedded title="Calendar" />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <div
            aria-hidden="true"
            className="pointer-events-none relative z-0 overflow-hidden bg-white pb-2 pt-4 select-none md:pb-4 md:pt-6"
          >
            <p className="bg-gradient-to-b from-black/[0.09] via-black/[0.055] to-black/[0.01] bg-clip-text text-center text-[22vw] font-semibold uppercase leading-[0.8] tracking-[-0.04em] text-transparent [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_55%,rgba(0,0,0,0)_100%)] md:text-[18vw]">
              COOMPASS
            </p>
          </div>
          <Toaster />
        </AuthProvider>
      </Router>
    </TooltipProvider>
  );
}

export default App;


