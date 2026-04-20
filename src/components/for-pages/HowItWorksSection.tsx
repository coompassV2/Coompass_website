
interface StepItem {
  text: string;
}

interface HowItWorksSectionProps {
  title: string;
  description: string;
  steps: StepItem[];
}

export function HowItWorksSection({ title, description, steps }: HowItWorksSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4 leading-relaxed text-sm">
        {description}
      </p>
      <ol className="list-decimal pl-6 space-y-3">
        {steps.map((step, index) => (
          <li key={index} className="text-gray-600 text-sm pb-1">
            {step.text}
          </li>
        ))}
      </ol>
    </section>
  );
}
