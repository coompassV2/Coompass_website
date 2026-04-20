
import React, { useState } from "react";
import { PersonaType, personaLabels } from "@/utils/personaLabels";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FAQSectionProps {
  persona: PersonaType;
  searchQuery: string;
}

export function FAQSection({ persona, searchQuery }: FAQSectionProps) {
  const [localSearch, setLocalSearch] = useState("");
  
  // All FAQs organized by persona
  const faqs = {
    general: [
      {
        question: "What is Coompass?",
        answer: "Coompass is a platform that connects companies, nonprofits, volunteers, and service providers to collaborate on impactful projects and initiatives that address social and environmental challenges."
      },
      {
        question: "How do I create an account?",
        answer: "You can create an account by clicking on the 'Register' button in the top navigation. You'll need to provide your email address or use social login options, and then select your user type (company, nonprofit, volunteer, or service provider)."
      },
      {
        question: "Is Coompass free to use?",
        answer: "Coompass offers both free and premium plans. The free plan provides access to core features, while premium plans offer additional capabilities tailored to each user type. Visit our Pricing page for more details."
      },
      {
        question: "How does Coompass verify organizations?",
        answer: "Coompass verifies organizations through a thorough process that includes checking legal registration, reviewing documentation, and validating contact information to ensure authenticity and trustworthiness."
      },
      {
        question: "How can I reset my password?",
        answer: "You can reset your password by clicking on the 'Login' button, then selecting 'Forgot Password'. Follow the instructions sent to your email to create a new password."
      }
    ],
    company: [
      {
        question: "How can my company participate in volunteering activities?",
        answer: "Your company can create partnerships with nonprofits, browse available missions, and encourage employee participation through the platform. You can also create custom volunteering programs tailored to your company's CSR goals."
      },
      {
        question: "How do I invite employees to join Coompass?",
        answer: "Navigate to the Company Employees section from your dashboard, and use the 'Invite Employees' feature to send email invitations to your team members."
      },
      {
        question: "How does Coompass help with ESG reporting?",
        answer: "Coompass provides comprehensive analytics and impact reports that track volunteer hours, causes supported, SDGs addressed, and other key metrics that can be used for ESG reporting and stakeholder communications."
      },
      {
        question: "Can we customize volunteering opportunities for our employees?",
        answer: "Yes, you can work with partner nonprofits to create custom volunteering opportunities aligned with your company values and employee interests. You can also create private missions specifically for your employees."
      },
      {
        question: "How do we measure the impact of our volunteering efforts?",
        answer: "Coompass provides detailed analytics in your company dashboard, tracking volunteer hours, participation rates, skills contributed, and the social and environmental impact of your initiatives."
      }
    ],
    organization: [
      {
        question: "How can my nonprofit find corporate partners?",
        answer: "Your nonprofit can create a compelling profile highlighting your mission and needs, browse potential corporate partners, and use the platform to initiate partnership conversations. You can also post missions that attract corporate volunteers."
      },
      {
        question: "How do I create volunteer opportunities?",
        answer: "Navigate to the Projects section of your nonprofit dashboard and use the 'Create Mission' button to set up new volunteer opportunities. You can specify skills needed, time commitment, and other relevant details."
      },
      {
        question: "How does Coompass help with volunteer management?",
        answer: "Coompass provides tools for tracking volunteer hours, managing applications, assigning tasks, recognizing contributions, and generating reports on volunteer impact and engagement."
      },
      {
        question: "Can we receive corporate donations through Coompass?",
        answer: "Yes, companies can make donations to your organization through the platform. You can also create funding campaigns for specific projects or needs."
      },
      {
        question: "How do we verify volunteer hours?",
        answer: "The platform includes a verification system where administrators can confirm volunteer participation and hours contributed. Volunteers can also upload evidence of their participation."
      }
    ],
    volunteer: [
      {
        question: "How do I find volunteering opportunities?",
        answer: "You can browse available missions on the Missions page, filtering by cause area, skills required, location, time commitment, and other factors to find opportunities that match your interests and availability."
      },
      {
        question: "How are my volunteer hours tracked?",
        answer: "Your volunteer hours are tracked when organizations confirm your participation in missions. You can view your total hours and breakdown by cause area in your volunteer dashboard."
      },
      {
        question: "Can I add volunteering experience from outside Coompass?",
        answer: "Yes, you can add external volunteering experiences to your profile. These will be marked as self-reported until verified by the relevant organization if they join Coompass."
      },
      {
        question: "How do I get a certificate for my volunteering?",
        answer: "After completing a mission, you can request a certificate from the organization. Once approved, the certificate will be available in your volunteer profile and can be downloaded or shared digitally."
      },
      {
        question: "Can I volunteer remotely or only in person?",
        answer: "Coompass features both in-person and remote volunteering opportunities. You can filter missions by type to find opportunities that match your preferences and constraints."
      }
    ]
  };

  // Combine general FAQs with persona-specific FAQs
  const combinedFaqs = [...faqs.general, ...faqs[persona]];
  
  // Filter FAQs based on search query
  const effectiveSearchTerm = searchQuery || localSearch;
  const filteredFaqs = effectiveSearchTerm 
    ? combinedFaqs.filter(faq => 
        faq.question.toLowerCase().includes(effectiveSearchTerm.toLowerCase()) || 
        faq.answer.toLowerCase().includes(effectiveSearchTerm.toLowerCase())
      )
    : combinedFaqs;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Frequently Asked Questions</h1>
      
      {/* Local search input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search FAQs..."
          className="pl-10"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>
      
      {filteredFaqs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No FAQs found matching your search.</p>
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {filteredFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
      
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Still have questions? <a href="https://tally.so/r/3xYk7o" target="_blank" rel="noopener noreferrer" className="text-coompass-success hover:underline">Contact our support team</a>
        </p>
      </div>
    </div>
  );
}
