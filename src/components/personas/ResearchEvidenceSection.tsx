import { BookOpen, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type ResearchArticle = {
  title: string;
  description: string;
  source: string;
  tag: string;
  url: string;
};

const ARTICLES: ResearchArticle[] = [
  {
    title: "The Effects of Community-Based and Civic Engagement in Higher Education",
    source: "AAC&U",
    tag: "Civic Engagement",
    url: "https://www.aacu.org/research/the-effects-of-community-based-engagement-in-higher-education",
    description:
      "Evidence on how civic and community engagement in higher education benefits students, institutions and communities.",
  },
  {
    title: "The Effects of Community-Based and Civic Engagement in Higher Education — Report",
    source: "Campus Compact",
    tag: "Service Learning",
    url: "https://compact.org/sites/default/files/2022-09/Effects-of-Community-based-and-Civic-Engagement.pdf",
    description:
      "A detailed report on student outcomes, civic learning and the value of community-based engagement.",
  },
  {
    title:
      "Critical Service-Learning Supports Social Justice and Civic Engagement Orientations in College Students",
    source: "ERIC",
    tag: "Social Justice",
    url: "https://files.eric.ed.gov/fulltext/EJ1418688.pdf",
    description:
      "Academic research showing how service-learning can strengthen civic engagement and social justice orientations.",
  },
  {
    title: "Measuring Higher Education Civic and Community Engagement",
    source: "Irish Universities Association",
    tag: "Impact Measurement",
    url: "https://www.iua.ie/wp-content/uploads/2019/09/MEASURING-HIGHER-EDUCATION-CIVIC-AND-COMMUNITY-ENGAGEMENT.pdf",
    description:
      "A practical framework for mapping, measuring and reporting civic and community engagement in higher education.",
  },
  {
    title:
      "The Role of Higher Education Institutions in Educating Future Leaders with Social Impact Contributing to the SDGs",
    source: "Emerald",
    tag: "SDG Impact",
    url: "https://www.emerald.com/sej/article/19/4/329/350259/The-role-of-higher-education-institutions-HEIs-in",
    description:
      "Research on how universities can prepare future leaders to create social impact aligned with the SDGs.",
  },
  {
    title: "The Role of Universities in Accelerating the Sustainable Development Goals in Europe",
    source: "Universidade Fernando Pessoa",
    tag: "SDG Europe",
    url: "https://bdigital.ufp.pt/bitstreams/1706e0aa-13fc-4f81-8086-6081f5808d80/download",
    description:
      "Research on how universities contribute to the SDGs through education, research, operations and external engagement.",
  },
  {
    title: "Civic Engagement in Future European Universities Campuses",
    source: "EU-CONEXUS",
    tag: "EU Universities",
    url: "https://www.eu-conexus.eu/wp-content/uploads/2023/09/IO2_WP-Civic-Engagement_FINAL-1rev.pdf",
    description:
      "A European report on civic engagement, student development, institutional priorities and community collaboration.",
  },
  {
    title:
      "University-Community Collaboration: Strengthening Local Engagement and Global Connections",
    source: "YUFE",
    tag: "Campus Partners",
    url: "https://www.yufe.eu/wp-content/uploads/2025/09/YUFE_Report_University_Community_Collaboration_2025.pdf",
    description:
      "A report on how universities can build stronger local and global partnerships through civic engagement.",
  },
];

function ArticleCard({
  article,
  tabIndex,
  className,
}: {
  article: ResearchArticle;
  tabIndex?: number;
  className?: string;
}) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={tabIndex}
      className={cn(
        "group/card flex min-h-0 h-[23rem] w-[min(17.25rem,calc(100vw-2.75rem))] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.06] p-5 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.65)] backdrop-blur-sm transition duration-300 ease-out sm:h-[23rem] sm:w-[17.25rem]",
        "hover:-translate-y-1 hover:border-sky-400/45 hover:shadow-[0_20px_48px_-16px_rgba(14,165,233,0.22)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400",
        className,
      )}
    >
      <span className="inline-flex max-w-full shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-sky-200/90">
        <BookOpen className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
        <span className="truncate">{article.tag}</span>
      </span>
      <span className="mt-3 line-clamp-4 block min-h-[5.25rem] text-base font-medium leading-snug tracking-tight text-white sm:text-lg">
        {article.title}
      </span>
      <span className="mt-2 min-h-0 flex-1 text-sm font-light leading-relaxed text-slate-300 line-clamp-3">
        {article.description}
      </span>
      <span className="mt-3 block shrink-0 truncate text-xs font-medium uppercase tracking-wider text-slate-400">
        {article.source}
      </span>
      <span className="mt-auto flex shrink-0 items-center gap-1.5 pt-3 text-sm font-medium text-sky-400/90 transition group-hover/card:text-sky-300">
        Read article
        <span aria-hidden>→</span>
        <ExternalLink className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
        <span className="sr-only"> (opens in new tab)</span>
      </span>
    </a>
  );
}

export function ResearchEvidenceSection() {
  const loop = [...ARTICLES, ...ARTICLES];

  return (
    <section
      className="relative overflow-hidden border-y border-white/[0.06] bg-[linear-gradient(165deg,#0b3555_0%,#07263f_42%,#051a2c_100%)] py-16 lg:py-24"
      aria-labelledby="research-evidence-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(56,189,248,0.12),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="research-evidence-heading"
            className="text-3xl font-light leading-tight tracking-[-0.02em] text-white md:text-4xl"
          >
            Research & Evidence
          </h2>
          <p className="mt-4 text-base font-light leading-relaxed text-slate-300 md:text-lg">
            Explore academic and institutional research on how universities can strengthen civic engagement, student
            development and measurable community impact.
          </p>
        </div>

        <div className="mt-12 hidden gap-6 motion-reduce:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ARTICLES.map((article) => (
            <ArticleCard key={article.url} article={article} />
          ))}
        </div>

        <div className="relative mt-12 motion-reduce:hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#07263f] to-transparent sm:w-14"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#051a2c] to-transparent sm:w-14"
            aria-hidden
          />
          <div className="group/marquee overflow-hidden pb-1">
            <div className="flex w-max gap-6 pb-2 animate-research-evidence-marquee group-hover/marquee:[animation-play-state:paused]">
              {loop.map((article, index) => (
                <ArticleCard
                  key={`${article.url}-${index}`}
                  article={article}
                  tabIndex={index < ARTICLES.length ? undefined : -1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
