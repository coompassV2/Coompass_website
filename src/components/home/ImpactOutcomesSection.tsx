import { Users, Globe2, Award, BarChart4 } from "lucide-react";

const outcomes = [
  {
    icon: Users,
    value: "100+",
    title: "Nonprofits Onboarded",
    description: "Over 100 vetted nonprofits onboarded."
  },
  {
    icon: Globe2,
    value: "300+",
    title: "Opportunities & Programs",
    description: "Over 200 volunteer opportunities and impact programs worldwide."
  },
  {
    icon: Award,
    value: "92%",
    title: "Partner Satisfaction",
    description: "Of our social partners rated Coompass platform as 'highly useful'."
  },
  {
    icon: BarChart4,
    value: "57%",
    title: "CSR Efficiency",
    description: "Increased efficiency in CSR program execution of our corporate partners."
  }
];

export function ImpactOutcomesSection() {
  return (
    <section className="relative z-10 bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">Real Impact. Real Outcomes.</h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          Our platform delivers measurable results for nonprofits, companies, and volunteers worldwide.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {outcomes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-left"
              >
                <div className="flex items-center mb-4 gap-3">
                  <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Icon className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold leading-tight">{item.value}</div>
                    <div className="text-base font-semibold leading-tight">{item.title}</div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm mt-2">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 