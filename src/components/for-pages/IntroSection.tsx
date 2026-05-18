import { Reveal } from "@/components/motion";

interface IntroSectionProps {
  title: string;
  description: string;
}

export function IntroSection({ title, description }: IntroSectionProps) {
  return (
    <Reveal as="section" className="mb-8">
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <p className="mb-4 text-sm leading-relaxed text-gray-600">{description}</p>
    </Reveal>
  );
}
