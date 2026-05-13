import PersonaLandingTemplate from "@/pages/personas/PersonaLandingTemplate";

export default function UniversitiesSchoolsPersona() {
  return (
    <PersonaLandingTemplate
      seoTitle="Coompass for Universities and Schools"
      seoDescription="Coordinate student and institutional social impact initiatives with clear structure, participation tracking and reporting."
      canonicalUrl="/personas/universities-schools"
      eyebrow="EDUCATION IMPACT PLATFORM"
      heroTitle={"Mobilize students, faculty and community\nimpact programs"}
      heroDescription="Coompass helps universities and schools coordinate volunteering, partnerships and social initiatives with better visibility and execution consistency."
      heroBackgroundImageSrc="/covers/universities-schools-hero.png"
      heroBackgroundSize="80% auto"
      heroBackgroundPosition="right center"
      heroBackgroundFadeLeft
      hideWhyCard
      featureTitle="Built for education-led impact programs"
      features={[
        {
          title: "Program coordination",
          description: "Organize initiatives, timelines and ownership across campus teams and partners.",
        },
        {
          title: "Participation tracking",
          description: "Monitor student and staff engagement with practical participation and hour records.",
        },
        {
          title: "Outcome reporting",
          description: "Create clear impact summaries for stakeholders, accreditation and institutional goals.",
        },
      ]}
      ctaTitle="See Coompass for your institution"
      ctaDescription="Book a walkthrough focused on your school or university social impact priorities."
    />
  );
}
