import { Header } from "@/components/home/Header";
import { HomeCtaSection } from "@/components/home/HomeCtaSection";
import { SEOManager } from "@/components/shared/SEOManager";
import { StructuredData } from "@/components/shared/StructuredData";

export default function AboutUs() {
  const aboutHeroImageSrc = "/about-hero.png";
  const aboutFoundersImageSrc = "/about-founders.png";
  const aboutVisionImageSrc = "/about-vision-road.png";

  const pageData = {
    name: "About Coompass",
    description: "Learn why Coompass was built and how we are building the infrastructure layer for corporate impact operations.",
    url: "https://coompass.org/about-us",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://coompass.org/about-us"
    },
    datePublished: "2026-04-30",
    dateModified: "2026-04-30"
  };

  const breadcrumbData = {
    itemListElement: [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://coompass.org/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://coompass.org/about-us"
      }
    ]
  };

  return (
    <>
      <SEOManager 
        title="About Us - Building the infrastructure for corporate impact"
        description="Coompass helps companies move from intention to execution with the infrastructure to run impact operations at scale."
        canonicalUrl="/about-us"
        keywords="about Coompass, corporate impact infrastructure, impact operations platform, impact execution software, company impact management"
      />
      
      <StructuredData type="WebPage" data={pageData} />
      <StructuredData type="BreadcrumbList" data={breadcrumbData} />

      <div className="min-h-screen relative bg-white">
        <Header />

        <main className="relative z-10">
          <section className="bg-[linear-gradient(115deg,#0b1a3a_0%,#123268_48%,#9bd9b3_100%)]">
            <div className="mx-auto w-full max-w-7xl px-8 pb-20 pt-40 lg:px-12 lg:pb-24 lg:pt-48">
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
                <div>
                  <p className="mb-5 text-sm font-light tracking-[0.14em] text-white/75">About Coompass</p>
                  <h1 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.02em] text-white md:text-6xl lg:text-[72px]">
                    Building the infrastructure for corporate impact
                  </h1>
                  <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-white/85 md:text-xl">
                    Coompass was created to help teams move from intention to execution, with the tools, structure and visibility needed to run impact operations at scale.
                  </p>
                  <a
                    href="/contact"
                    className="mt-8 inline-flex items-center justify-center rounded-full border border-white/65 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    Get a free consultation
                  </a>
                </div>
                <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-3xl border border-white/25 shadow-[0_28px_50px_-30px_rgba(0,0,0,0.7)] sm:max-w-[420px] lg:mx-0 lg:max-w-[420px]">
                  <img
                    src={aboutHeroImageSrc}
                    alt="Professional working at laptop"
                    className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#e8f6ea]">
            <div className="mx-auto w-full max-w-7xl px-8 py-20 lg:px-12 lg:py-24">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-light tracking-[0.08em] text-[#185b45]">Our Vision</p>
                <h2 className="mt-4 text-4xl font-light leading-[1.05] tracking-[-0.02em] text-[#0f5a46] md:text-5xl lg:text-6xl">
                  A future where social impact is easier to manage for every organization.
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-[#0f5a46]/85 md:text-lg">
                  We help teams turn removing complexity, simplifying daily operations, and giving organizations the tools they need to create, manage, and grow long-term impact
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-100 bg-white">
            <div className="mx-auto w-full max-w-7xl px-8 py-20 lg:px-12 lg:py-24">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-center">
                <div>
                  <h2 className="text-3xl font-light tracking-[-0.02em] text-[#111827] md:text-[40px]">Why we built Coompass</h2>
                  <div className="mt-8 space-y-6 text-base font-light leading-relaxed text-gray-700 md:text-lg">
                    <p>
                      We believe real change starts with people.
                    </p>
                    <p>
                      It starts with someone who wants to help, a team that wants to do more, a company that wants to use its resources in a better way. But good intentions are not always enough. To create lasting impact, people need structure, direction and the right tools to act together.
                    </p>
                    <p>
                      Companies play a powerful role in society. They can bring people together, support communities, open doors for nonprofits and turn everyday work into something with a deeper purpose.
                    </p>
                    <p>
                      People and communities come first. We designed this tool to make social impact accessible, transparent, and empowering.
                    </p>
                    <p>
                      That is why we built Coompass.
                    </p>
                  </div>
                </div>
                <div className="mx-auto w-full max-w-[430px] overflow-hidden rounded-2xl border border-gray-200 shadow-[0_22px_45px_-28px_rgba(15,23,42,0.45)] lg:mx-0">
                  <img
                    src={aboutFoundersImageSrc}
                    alt="Coompass founders"
                    className="h-[300px] w-full object-cover sm:h-[360px] lg:h-[420px]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-100 bg-[#f5f5f5]">
            <div className="mx-auto w-full max-w-7xl px-8 py-20 lg:px-12 lg:py-24">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[420px_minmax(0,1fr)] lg:items-center">
                <div className="order-2 mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl border border-gray-200 shadow-[0_22px_45px_-28px_rgba(15,23,42,0.45)] lg:order-1 lg:mx-0">
                  <img
                    src={aboutVisionImageSrc}
                    alt="Road through forest"
                    className="h-[280px] w-full object-cover sm:h-[320px] lg:h-[360px]"
                    loading="lazy"
                  />
                </div>
                <div className="order-1 lg:order-2 lg:text-right">
                  <h2 className="text-3xl font-light tracking-[-0.02em] text-[#111827] md:text-[40px]">Where we are going</h2>
                  <div className="mt-8 space-y-6 text-base font-light leading-relaxed text-gray-700 md:text-lg">
                    <p>
                      We believe impact will become a core operational layer inside every company. Our mission is to offer a simple tool and reliable support that help teams understand their impact, set meaningful goals, and report outcomes with confidence. We focus on creating a smoother, clearer path to sustainability one that works for everyday operations.
                    </p>
                    <p>
                      Coompass aims to become the standard infrastructure that organisations use to manage and scale their impact globally.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <HomeCtaSection
            title="Let’s build your impact infrastructure"
            description="Speak with our team about structuring and scaling your company’s impact operations."
            buttonText="Talk to the team"
            buttonHref="/contact"
          />
        </main>
      </div>
    </>
  );
}
