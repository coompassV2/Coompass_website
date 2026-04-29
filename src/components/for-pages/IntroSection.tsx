
interface IntroSectionProps {
  title: string;
  description: string;
}

export function IntroSection({ title, description }: IntroSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4 leading-relaxed text-sm">
        {description}
      </p>
    </section>
  );
}
