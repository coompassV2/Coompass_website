import universitiesStudentMatching from "@/assets/personas/universities-student-matching.png";
import { IsegCspCoompassBanner } from "@/components/personas/IsegCspCoompassBanner";
import { ResearchEvidenceSection } from "@/components/personas/ResearchEvidenceSection";
import PersonaLandingTemplate from "@/pages/personas/PersonaLandingTemplate";

export default function UniversitiesSchoolsPersona() {
  return (
    <PersonaLandingTemplate
      seoTitle="Coompass for Universities and Schools"
      seoDescription="Coordinate student and institutional social impact initiatives with clear structure, participation tracking and reporting."
      canonicalUrl="/personas/universities-schools"
      heroTitle={"Mobilize students, faculty and community\nimpact programs"}
      heroDescription="Coompass helps universities and schools coordinate volunteering, partnerships and social initiatives with better visibility and execution consistency."
      heroBackgroundImageSrc="/covers/universities-schools-hero.png"
      heroBackgroundSize="80% auto"
      heroBackgroundPosition="right center"
      heroBackgroundFadeLeft
      hideWhyCard
      centerFeatureHeading
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
      afterFeaturesAsideTitle="Tell us your interest. We match it."
      afterFeaturesAsideBanner={<IsegCspCoompassBanner />}
      afterFeaturesAsideBody="Coompass matches students with civic engagement opportunities based on their interests, skills, and availability, helping them track hours, earn points, and build a verified record of community impact."
      afterFeaturesAsideImageSrc={universitiesStudentMatching}
      afterFeaturesAsideImageAlt="Students reviewing civic engagement metrics on a laptop"
      afterFeaturesAsideSection={<ResearchEvidenceSection />}
      ctaTitle="See Coompass for your Institution"
      ctaDescription="Book a walkthrough focused on your school or university social impact priorities."
    />
  );
}
