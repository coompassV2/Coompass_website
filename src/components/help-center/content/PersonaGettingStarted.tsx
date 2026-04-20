
import React from "react";
import { PersonaType, personaLabels } from "@/utils/personaLabels";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PersonaGettingStartedProps {
  persona: PersonaType;
}

export function PersonaGettingStarted({ persona }: PersonaGettingStartedProps) {
  // Default content in case of invalid persona
  if (!persona || !personaLabels[persona]) {
    console.error(`Invalid persona type: ${persona}`);
    return (
      <div className="p-4 border rounded-md bg-red-50 text-red-700">
        <p>Error: Invalid persona type provided.</p>
      </div>
    );
  }

  // Content specific to each persona
  const personaContent = {
    "company": {
      intro: "Welcome to Coompass for Companies! Our platform helps your business engage employees in meaningful volunteering and achieve your ESG goals.",
      steps: [
        {
          title: "Set up your company profile",
          description: "Add your company details, logo, and mission statement to establish your presence.",
          link: "/company/profile"
        },
        {
          title: "Invite employees",
          description: "Grow your impact by inviting team members to join your company's volunteering initiatives.",
          link: "/company/employees"
        },
        {
          title: "Track impact metrics",
          description: "Monitor your company's contribution and ESG performance through our analytics dashboard.",
          link: "/company/analytics"
        }
      ]
    },
    "organization": {
      intro: "Welcome to Coompass for Nonprofits! Our platform connects your organization with corporations and volunteers to amplify your impact.",
      steps: [
        {
          title: "Complete your organization profile",
          description: "Showcase your mission, impact areas, and needs to attract potential partners.",
          link: "/nonprofit/profile"
        },
        {
          title: "Create volunteer opportunities",
          description: "Post missions and projects that corporate volunteers can participate in.",
          link: "/nonprofit/projects"
        },
        {
          title: "Connect with companies",
          description: "Explore and establish partnerships with companies aligned with your mission.",
          link: "/nonprofit/partnerships"
        },
        {
          title: "Track volunteer engagement",
          description: "Monitor volunteer hours, impact metrics, and generate reports for stakeholders.",
          link: "/nonprofit/impact"
        }
      ]
    },
    "volunteer": {
      intro: "Welcome to Coompass for Volunteers! Discover meaningful ways to contribute your skills and time to causes you care about.",
      steps: [
        {
          title: "Discover missions",
          description: "Browse and filter through available volunteering opportunities that match your interests.",
          link: "/volunteer/missions"
        },
        {
          title: "Track your impact",
          description: "Monitor your volunteering hours, skills development, and overall contribution.",
          link: "/volunteer/dashboard"
        },
        {
          title: "Connect with organizations",
          description: "Follow nonprofits and build relationships for ongoing volunteering opportunities.",
          link: "/organizations"
        }
      ]
    }
  } as Record<PersonaType, {
    intro: string;
    steps: Array<{
      title: string;
      description: string;
      link: string;
    }>;
  }>;

  // Safely access content
  const content = personaContent[persona] || {
    intro: "Welcome to Coompass!",
    steps: []
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Getting Started as a {personaLabels[persona]?.title || "User"}</h2>
      <p className="text-gray-700 mb-6">{content.intro}</p>
      
      <div className="space-y-6">
        {content.steps.map((step, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="flex items-center justify-center bg-coompass-success text-white rounded-full w-6 h-6 text-sm mr-3">
                  {index + 1}
                </span>
                {step.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{step.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto" asChild>
                <a href={step.link}>
                  Go to {step.title.split(" ").pop()} <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-coompass-success/10 rounded-lg">
        <h3 className="font-semibold mb-2">Need more help?</h3>
        <p className="text-sm text-gray-700">
          Contact our support team or visit our detailed user guides for more information specific to your needs.
        </p>
      </div>
    </div>
  );
}
