type StatCard = {
  value: string;
  title: string;
  description: string;
};

const STATS: StatCard[] = [
  {
    value: "70+",
    title: "Causes & Missions Supported",
    description:
      "Helping companies connect their impact programs with real initiatives ready to be activated.",
  },
  {
    value: "100+",
    title: "Nonprofits in the Network",
    description:
      "A growing ecosystem of verified social organisations available for corporate impact programs.",
  },
  {
    value: "10k+",
    title: "Corporate Volunteers Reached",
    description:
      "Supporting companies with the infrastructure to engage, manage and measure participation at scale.",
  },
];

export function ImpactStatsSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-8 py-20 lg:px-12 lg:py-24">
        <div className="mb-10 max-w-3xl text-center md:mb-12 md:mx-auto">
          <p className="mb-3 text-sm font-light text-black/60">Our Impact</p>
          <h2 className="text-4xl font-light leading-tight text-black md:text-5xl">
            Impact infrastructure already in motion
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STATS.map((stat, index) => (
            <article
              key={stat.title}
              className={`min-h-[260px] rounded-2xl p-6 md:p-7 ${
                index === 0 ? "relative overflow-hidden bg-[#1a1a1a]" : "bg-[#efefef]"
              }`}
            >
              {index === 0 && (
                <>
                  <img
                    src="/covers/impact-hands-sky.png"
                    alt="Hands reaching connection"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/45" />
                </>
              )}

              <div className={`relative z-10 ${index === 0 ? "text-white" : "text-black"}`}>
                <p className={`mb-3 text-5xl font-semibold leading-none md:text-6xl ${index === 0 ? "text-white" : "text-black"}`}>
                  {stat.value}
                </p>
                <h3 className={`mb-3 text-xl font-light leading-tight ${index === 0 ? "text-white/95" : "text-black/90"}`}>
                  {stat.title}
                </h3>
                <p className={`text-base font-light leading-relaxed ${index === 0 ? "text-white/90" : "text-black/70"}`}>
                  {stat.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
