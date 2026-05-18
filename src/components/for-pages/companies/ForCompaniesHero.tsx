import { Reveal, RevealItem, RevealStagger } from "@/components/motion";

export default function ForCompaniesHero() {
  return (
    <Reveal
      immediate
      variant="fadeIn"
      className="relative flex h-[60vh] min-h-[400px] w-full items-center justify-center"
      style={{
        backgroundImage: "url('/for-companies-hero.jpg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <RevealStagger className="relative z-10 px-4 text-center text-white">
        <RevealItem>
          <h1 className="mb-4 text-4xl font-bold drop-shadow-lg md:text-5xl">For Companies</h1>
        </RevealItem>
        <RevealItem>
          <p className="text-lg font-light drop-shadow md:text-2xl">Enhance your ESG strategy and employee engagement</p>
        </RevealItem>
      </RevealStagger>
    </Reveal>
  );
}
