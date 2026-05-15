import { BarChart3, ClipboardList, HandHeart, Users } from "lucide-react";
import PersonaLandingTemplate from "@/pages/personas/PersonaLandingTemplate";

export default function NonprofitsPersona() {
  return (
    <PersonaLandingTemplate
      seoTitle="Coompass for Nonprofits"
      seoDescription="Coordinate volunteers, partners and programs with better operational visibility and less friction."
      canonicalUrl="/personas/nonprofits"
      heroTitle="Coordinate your programs and impact from one single place."
      heroDescription="Coompass helps nonprofits organize field activity, partner collaboration and volunteer operations with traceable and reliable data."
      whyTitle="Why nonprofits use Coompass"
      whyPoints={[
        "Manage volunteers, missions and partnerships in one operational flow.",
        "Reduce spreadsheet dependency with structured process tracking.",
        "Share outcomes and progress clearly with sponsors and stakeholders.",
      ]}
      featureTitle="The Solution for Nonprofit Program Management."
      featureSubtitle="Built for nonprofits, our tools and management resources help organizations streamline their work, embrace digital transformation, and increase their impact with flexible, scalable solutions that adapt to their needs."
      centerFeatureHeading
      features={[
        {
          title: "Volunteer coordination",
          icon: HandHeart,
          description: "Track assignments, hours and progress with a clear, shared workflow for your team.",
        },
        {
          title: "Program management",
          icon: ClipboardList,
          description: "Organize activities, beneficiaries and milestones with better consistency across initiatives.",
        },
        {
          title: "Reporting clarity",
          icon: BarChart3,
          description: "Provide reliable program updates backed by activity and participation evidence.",
        },
      ]}
      resultsSectionTitle="Get Powerful Results."
      resultsImageSrc="/covers/nonprofit-powerful-results.png"
      resultsImageAlt="Coompass nonprofit results overview"
      processSectionTitle="How It Works"
      processSectionDescription="See exactly how your nonprofit can use Coompass today. From volunteer management tools, to reporting and AI assistance. Everything your organization needs to scale."
      processSteps={[
        { number: 1, title: "Sign up and create your organization's public profile." },
        { number: 2, title: "Post new projects or missions with your current needs." },
        { number: 3, title: "Respond to companies or volunteers who apply to help." },
        { number: 4, title: "Track volunteer involvement and manage partners." },
        { number: 5, title: "Downlod reports anytime to share your impact." },
        { number: 6, title: "Use our AI assistant to better create your missions and programs." },
      ]}
      ctaTitle="See how Coompass supports your nonprofit"
      ctaDescription="Book a walkthrough of the nonprofit workflow and reporting model aligned to your mission delivery."
      icon={Users}
      hideWhyCard
      heroBackgroundImageSrc="/covers/nonprofit-hero-handshake.png"
    />
  );
}
