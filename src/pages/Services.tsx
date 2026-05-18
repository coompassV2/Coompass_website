import { type ComponentType } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  FileText,
  Factory,
  Handshake,
  Landmark,
  Leaf,
  Link2,
  Users2,
  UserCheck,
  Users,
  Workflow,
} from "lucide-react";
import { Header } from "@/components/home/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion";
import { SEOManager } from "@/components/shared/SEOManager";

type OrgItem = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  image: string;
  imageAlt: string;
  href: string;
};

const talkToUsUrl = "https://calendly.com/hello-coompass/sessao-coompass";

const organizationItems: OrgItem[] = [
  {
    title: "Companies",
    description:
      "Manage volunteering, nonprofit partnerships, employee engagement, social impact data and sustainability reporting from one place.",
    icon: Building2,
    image: "/covers/services-org-companies.png",
    imageAlt: "Corporate social impact coordination session",
    href: "/personas/companies",
  },
  {
    title: "Nonprofits and Social Organizations",
    description:
      "Coordinate volunteers, donations, beneficiaries, missions and community programs with less manual work and more visibility.",
    icon: Users,
    image: "/covers/services-org-nonprofits.png",
    imageAlt: "Nonprofit community volunteering operations",
    href: "/personas/nonprofits",
  },
  {
    title: "Municipalities and Institutions",
    description:
      "Map community needs, activate partnerships and monitor local initiatives across territories.",
    icon: Landmark,
    image: "/covers/services-org-municipalities.png",
    imageAlt: "Institution-led local community program support",
    href: "/personas/municipalities",
  },
  {
    title: "Investors and Stakeholders",
    description:
      "Access a clearer view of social sustainability performance, ESG-related social indicators and impact evolution.",
    icon: Factory,
    image: "/covers/services-org-stakeholders.png",
    imageAlt: "Impact monitoring and sustainability outcomes",
    href: "/personas/investors-stakeholders",
  },
];

const valuePills = [
  "More structure",
  "Less friction",
  "Better data",
  "Stronger reporting",
  "Clearer stakeholder visibility",
];

const heroCarouselImages = [
  "/covers/services-carousel-1.png",
  "/covers/services-carousel-2.png",
  "/covers/services-carousel-3.png",
  "/covers/services-carousel-4.png",
  "/covers/services-carousel-5.png",
];

const recentImpactActivity = [
  "New volunteering mission created",
  "Donation recorded",
  "Nonprofit partnership updated",
  "Impact report generated",
];

const impactNotifications = [
  "New nonprofit application received",
  "Volunteer hours submitted",
  "Partnership milestone reached",
  "ESG report data updated",
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      <SEOManager
        title="Services"
        description="Coompass helps organizations structure, automate and report social impact operations with greater efficiency and visibility."
        canonicalUrl="/services"
      />
      <Header />

      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(115deg,#0b1a3a_0%,#123268_48%,#9bd9b3_100%)] pb-20 pt-32 lg:pt-36">
          <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_10%_80%,rgba(255,255,255,0.2),transparent_35%)]" />
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
            <RevealStagger className="mx-auto max-w-3xl text-center" immediate>
              <RevealItem>
                <p className="mb-4 text-sm font-light tracking-[0.12em] text-white/80">Services</p>
              </RevealItem>
              <RevealItem>
                <h1 className="text-3xl font-light leading-[1.02] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  Everything You Need to Manage Social Good Confidently
                </h1>
              </RevealItem>
              <RevealItem>
                <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-slate-100 md:text-lg">
                  Built to help you manage your CSR programs confidently, with clarity, security, and real-time control.
                </p>
              </RevealItem>
            </RevealStagger>
            <div className="relative mx-auto mt-14 w-full max-w-6xl md:mt-16">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#0d2148] to-transparent md:w-16" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#3f7f97] to-transparent md:w-16" />

              <div className="overflow-hidden">
                <motion.div
                  className="flex w-max gap-4 p-2 md:p-3"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
                >
                  {[...heroCarouselImages, ...heroCarouselImages].map((imageSrc, index) => (
                    <div
                      key={`${imageSrc}-${index}`}
                      className="h-[170px] w-[280px] shrink-0 overflow-hidden rounded-xl md:h-[230px] md:w-[390px] lg:h-[270px] lg:w-[460px]"
                    >
                      <img
                        src={imageSrc}
                        alt="Coompass impact operations preview"
                        className="h-full w-full object-cover"
                        loading={index < heroCarouselImages.length ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

          </div>
        </section>

        <Reveal as="section" className="bg-white py-20 lg:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
            <Reveal>
            <h2 className="text-center text-3xl font-light leading-tight tracking-[-0.02em] text-[#111827] md:text-4xl">Built for the full impact chain</h2>
            </Reveal>
            <RevealStagger className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {organizationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <RevealItem key={item.title}>
                  <Card
                    key={item.title}
                    className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_22px_45px_-32px_rgba(15,23,42,0.38)]"
                  >
                    <div className="h-36 w-full overflow-hidden border-b border-black/10">
                      <img src={item.image} alt={item.imageAlt} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eaf8ef]">
                        <Icon className="h-5 w-5 text-[#0f5f4d]" />
                      </div>
                      <h3 className="mt-4 text-xl font-medium text-[#174c43]">{item.title}</h3>
                      <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-[#174c43]/85">{item.description}</p>
                      <Link
                        to={item.href}
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#0f5f4d] transition-colors hover:text-[#174c43]"
                      >
                        Read more
                        <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
                      </Link>
                    </div>
                  </Card>
                  </RevealItem>
                );
              })}
            </RevealStagger>
          </div>
        </Reveal>

        <Reveal as="section" className="bg-[#f3f4f6] py-20 lg:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-4xl font-light leading-tight tracking-[-0.02em] text-[#111827] md:text-5xl">
                Your impact, managed with clarity
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm font-light leading-relaxed text-gray-600 md:text-base">
                Built to help organizations centralize initiatives, mobilize people, automate workflows, and report social impact with confidence.
              </p>
            </div>

            <div className="mt-10 space-y-5">
              <Card className="relative overflow-hidden rounded-2xl border border-black/10 bg-white p-5 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.3)] md:p-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.14),transparent_48%),radial-gradient(ellipse_at_bottom_left,rgba(15,95,77,0.11),transparent_52%)]"
                />
                <div className="grid gap-5 lg:grid-cols-[1.35fr_2fr]">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-light leading-[1.04] tracking-[-0.02em] sm:text-3xl lg:text-4xl text-[#1f2937]">Clear impact movements</h3>
                    <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-gray-600">
                      Every initiative is easy to track, categorized clearly, and updated in real time.
                    </p>
                  </div>
                  <div className="relative z-10 overflow-hidden rounded-xl border border-black/10 bg-[#f8fafc] p-4">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.16)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.95)_45%,rgba(0,0,0,0)_100%)]"
                    />
                    <div className="flex items-center justify-between">
                      <h4 className="text-[28px] font-medium tracking-[-0.02em] text-[#1f2937]">Recent Impact Activity</h4>
                      <Activity className="h-5 w-5 text-gray-500" />
                    </div>
                    <ul className="mt-4 space-y-3">
                      {recentImpactActivity.map((item) => (
                        <li key={item} className="relative z-10 flex items-center justify-between rounded-lg border border-black/10 bg-white px-3 py-2">
                          <span className="text-sm text-gray-700">{item}</span>
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>

              <div className="grid gap-5 lg:grid-cols-2">
                <Card className="rounded-2xl border border-black/10 bg-white p-4 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.3)] md:p-5">
                  <div className="grid gap-4 sm:grid-cols-[170px_minmax(0,1fr)] sm:items-start">
                    <div className="overflow-hidden rounded-xl border border-black/10">
                      <img
                        src="/covers/services-support-collab.png"
                        alt="People collaborating and supporting each other"
                        className="h-40 w-full object-cover sm:h-full"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-light leading-[1.04] tracking-[-0.02em] sm:text-3xl lg:text-4xl text-[#1f2937]">Support always within reach</h3>
                      <p className="mt-4 text-sm font-light leading-relaxed text-gray-600">
                        Our team supports each partner throughout the entire process, from setup and implementation to ongoing improvement. We adapt the platform, workflows, and support model to your specific needs, ensuring close guidance, personalized assistance, and continuous follow-up as your impact programs evolve.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="relative overflow-hidden rounded-2xl border border-transparent bg-[linear-gradient(130deg,rgba(141,124,246,1)_0%,rgba(79,70,229,1)_68%,rgba(59,130,246,1)_100%)] p-5 text-white shadow-[0_24px_48px_-28px_rgba(79,70,229,0.75)]">
                  <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 w-[62%] overflow-hidden rounded-xl border border-white/20 bg-white/10 opacity-35 shadow-[0_16px_30px_-22px_rgba(2,6,23,0.85)]">
                    <img
                      src="/covers/services-dashboard-preview.png"
                      alt=""
                      className="h-full w-full object-cover blur-[1.5px]"
                      loading="lazy"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="relative z-10 max-w-sm">
                    <h3 className="text-2xl font-light leading-[1.04] tracking-[-0.02em] sm:text-3xl lg:text-4xl">Automated workflows</h3>
                    <p className="mt-4 text-sm font-light leading-relaxed text-blue-100">
                      Reduce manual steps across registrations, approvals, communications, tracking, and reporting.
                    </p>
                  </div>
                  <div className="relative z-10 mt-5 rounded-xl border border-white/20 bg-white/15 p-3 backdrop-blur-sm">
                    {[
                      { label: "Mission approved", icon: CheckCircle2 },
                      { label: "Volunteer matched", icon: UserCheck },
                      { label: "Report ready", icon: BarChart3 },
                      { label: "Updated document", icon: FileText },
                    ].map(({ label, icon: Icon }) => (
                      <div key={label} className="flex items-center justify-between py-2 text-sm">
                        <span>{label}</span>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
                </Card>
              </div>

              <Card className="relative overflow-hidden rounded-2xl border border-black/10 bg-white p-5 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.3)] md:p-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.14),transparent_48%),radial-gradient(ellipse_at_bottom_left,rgba(15,95,77,0.11),transparent_52%)]"
                />
                <div className="grid gap-5 lg:grid-cols-[1.35fr_2fr]">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-light leading-[1.04] tracking-[-0.02em] sm:text-3xl lg:text-4xl text-[#1f2937]">Stay informed without chasing updates</h3>
                    <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-gray-600">
                      Get real-time visibility into important impact activity, from volunteer engagement to reporting milestones.
                    </p>
                  </div>
                  <div className="relative z-10 overflow-hidden rounded-xl border border-black/10 bg-[#f8fafc] p-4">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.16)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.95)_45%,rgba(0,0,0,0)_100%)]"
                    />
                    <div className="flex items-center justify-between">
                      <h4 className="text-[28px] font-medium tracking-[-0.02em] text-[#1f2937]">Notifications</h4>
                      <Bell className="h-5 w-5 text-gray-500" />
                    </div>
                    <ul className="mt-4 space-y-3">
                      {impactNotifications.map((item) => (
                        <li key={item} className="relative z-10 flex items-center justify-between rounded-lg border border-black/10 bg-white px-3 py-2">
                          <span className="text-sm text-gray-700">{item}</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>

              <div className="grid gap-5 lg:grid-cols-2">
                <Card className="relative overflow-hidden rounded-2xl border border-transparent bg-[linear-gradient(130deg,#5f7cf8_0%,#3b82f6_45%,#0f5f4d_100%)] p-5 text-white shadow-[0_24px_48px_-28px_rgba(37,99,235,0.7)]">
                  <h3 className="relative z-10 max-w-sm text-2xl font-light leading-[1.04] tracking-[-0.02em] sm:text-3xl lg:text-4xl">Reporting built into every action</h3>
                  <p className="relative z-10 mt-4 max-w-md text-sm font-light leading-relaxed text-blue-100">
                    Every mission, donation, partnership, and volunteering hour becomes structured data ready for dashboards, ESG reporting, and leadership updates.
                  </p>
                  <div className="relative z-10 mt-5 grid gap-2 rounded-xl border border-white/20 bg-white/15 p-3 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-sm">
                      <span>ESG social indicators</span>
                      <BarChart3 className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Partnership outcomes</span>
                      <Handshake className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Volunteer engagement</span>
                      <Users2 className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Monthly missions</span>
                      <Workflow className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -bottom-3 right-3 w-[55%] rounded-xl border border-white/20 bg-white/20 p-4 blur-[2px]">
                    <div className="space-y-2">
                      <div className="h-2 w-4/5 rounded bg-white/70" />
                      <div className="h-2 w-3/5 rounded bg-white/60" />
                      <div className="h-2 w-2/3 rounded bg-white/50" />
                    </div>
                  </div>
                </Card>

                <Card className="relative overflow-hidden rounded-2xl border border-black/10 bg-white p-5 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.3)]">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.14),transparent_48%),radial-gradient(ellipse_at_bottom_left,rgba(15,95,77,0.11),transparent_52%)]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.95)_42%,rgba(0,0,0,0)_100%)]"
                  />
                  <h3 className="relative z-10 max-w-sm text-2xl font-light leading-[1.04] tracking-[-0.02em] sm:text-3xl lg:text-4xl text-[#1f2937]">Works with the tools and teams you already use</h3>
                  <p className="relative z-10 mt-4 max-w-md text-sm font-light leading-relaxed text-gray-600">
                    Connect your impact operations with your internal workflows, partners, reporting needs, and stakeholder visibility.
                  </p>
                  <div className="relative z-10 mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                    {[
                      { icon: Workflow, label: "Flows" },
                      { icon: Users2, label: "Teams" },
                      { icon: FileText, label: "Reports" },
                      { icon: Handshake, label: "Partners" },
                      { icon: BarChart3, label: "Data" },
                      { icon: Link2, label: "Links" },
                      { icon: UserCheck, label: "Approvals" },
                      { icon: Building2, label: "Orgs" },
                      { icon: Factory, label: "ESG" },
                      { icon: Leaf, label: "Impact" },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center">
                        <Icon className="mx-auto h-4 w-4 text-[#0f5f4d]" />
                        <p className="mt-1 text-[11px] font-medium text-gray-600">{label}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="bg-[linear-gradient(180deg,#f5fbf7_0%,#ffffff_100%)] py-20 lg:py-24">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center lg:px-12">
            <div>
              <h2 className="text-4xl font-light leading-tight tracking-[-0.02em] text-[#111827] md:text-5xl">Why it matters</h2>
              <div className="mt-6 space-y-6 text-base font-light leading-relaxed text-gray-700 md:text-lg">
                <p>
                  Social impact can no longer be managed as a side process. Organizations are increasingly expected to show what they do, how they do it, who benefits, and what outcomes they create.
                </p>
                <p>
                  Coompass helps bring structure, accountability and intelligence to that responsibility, so impact becomes easier to manage, easier to measure and easier to communicate.
                </p>
              </div>
            </div>
            <Card className="rounded-2xl border border-[#0f5f4d]/20 bg-white p-6 shadow-[0_22px_44px_-28px_rgba(15,95,77,0.4)]">
              <div className="grid grid-cols-1 gap-3">
                {valuePills.map((pill, index) => (
                  <div
                    key={pill}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-sm font-medium",
                      index % 2 === 0
                        ? "border-[#0f5f4d]/20 bg-[#eaf8ef] text-[#174c43]"
                        : "border-slate-200 bg-slate-50 text-slate-700"
                    )}
                  >
                    {pill}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Reveal>

        <Reveal as="section" className="bg-[#0b1a3a] py-20 lg:py-24">
          <div className="mx-auto w-full max-w-5xl px-8 text-center lg:px-12">
            <h2 className="text-4xl font-light leading-tight tracking-[-0.02em] text-white md:text-5xl">
              Ready to manage social impact with more structure and less friction?
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base font-light leading-relaxed text-slate-200 md:text-lg">
              Whether you are a company, nonprofit, municipality, foundation or stakeholder looking for better visibility into social sustainability, Coompass helps you manage, measure and scale your impact.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full bg-sky-500 px-8 text-white hover:bg-sky-600">
                <a href={talkToUsUrl} target="_blank" rel="noopener noreferrer">
                  Schedule a meeting
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </main>
    </div>
  );
}

