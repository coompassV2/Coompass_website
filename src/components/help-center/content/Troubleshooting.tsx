
import React from "react";
import { PersonaType } from "@/utils/personaLabels";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TroubleshootingProps {
  persona: PersonaType;
  searchQuery: string;
}

export function Troubleshooting({ persona, searchQuery }: TroubleshootingProps) {
  // Common issues and solutions
  const commonIssues = [
    {
      issue: "I can't log in to my account",
      solution: "Try resetting your password. Make sure you're using the correct email address and check your spam folder for reset instructions. If you still can't access your account, contact support.",
      steps: [
        "Click 'Forgot Password' on the login page",
        "Enter the email address associated with your account",
        "Check your email for reset instructions",
        "Create a new password"
      ]
    },
    {
      issue: "My profile changes are not saving",
      solution: "This might be due to browser caching issues or temporary connectivity problems. Try refreshing the page, clearing your browser cache, or using a different browser.",
      steps: [
        "Save your changes and refresh the page",
        "Try clearing your browser cache",
        "Check your internet connection",
        "Try using a different browser"
      ]
    },
    {
      issue: "I'm not receiving email notifications",
      solution: "Check your email spam or junk folder. You can also verify your notification settings in your account preferences.",
      steps: [
        "Check your spam/junk folder",
        "Add noreply@coompass.org to your contacts",
        "Check your notification settings in your account",
        "Make sure your email address is correct in your profile"
      ]
    }
  ];

  // Persona-specific issues
  const personaIssues = {
    company: [
      {
        issue: "I can't add employees to my company",
        solution: "Make sure you have administrative privileges and that you're entering valid email addresses. There might also be a limit based on your subscription plan.",
        steps: [
          "Verify you have admin permissions",
          "Check that email addresses are correctly formatted",
          "Ensure you haven't reached your plan's employee limit",
          "Try sending invitations one at a time"
        ]
      },
      {
        issue: "Our volunteer hours aren't being counted correctly",
        solution: "Hours need to be verified by nonprofit partners. Check if the hours are pending verification or if there's a data synchronization issue.",
        steps: [
          "Check if hours are pending verification",
          "Contact the nonprofit partner",
          "Verify that missions were properly completed",
          "Contact support if the issue persists"
        ]
      }
    ],
    organization: [
      {
        issue: "Volunteers aren't applying to our missions",
        solution: "Your mission might need more visibility or clearer descriptions. Try updating the title, description, and requirements to make it more appealing.",
        steps: [
          "Add compelling photos to your mission",
          "Clearly define the impact volunteers will make",
          "Be specific about time commitment and skills needed",
          "Share the mission on your social media channels"
        ]
      },
      {
        issue: "We can't verify our organization status",
        solution: "Organization verification requires specific documentation. Make sure you've submitted all required documents and allow time for the verification process.",
        steps: [
          "Check that you've submitted all required documents",
          "Ensure documents are clear and legible",
          "Verify your organization's legal status is current",
          "Contact support for specific requirements"
        ]
      }
    ],
    volunteer: [
      {
        issue: "My volunteering hours aren't showing up",
        solution: "Hours need to be verified by the organization you volunteered with. Contact them if your hours are still pending after a week.",
        steps: [
          "Check if hours are pending verification",
          "Contact the organization directly",
          "Provide any requested evidence of participation",
          "Allow 7-10 days for processing"
        ]
      },
      {
        issue: "I applied for a mission but never heard back",
        solution: "Organizations may take time to review applications. You can check your application status or contact the organization directly.",
        steps: [
          "Check your application status in 'My Missions'",
          "Send a polite follow-up message",
          "Consider applying to other similar opportunities",
          "Make sure your profile is complete to improve future applications"
        ]
      }
    ]
  };

  // Combine common and persona-specific issues
  const allIssues = [...commonIssues, ...(personaIssues[persona] || [])];
  
  // Filter issues based on search query
  const filteredIssues = searchQuery 
    ? allIssues.filter(issue => 
        issue.issue.toLowerCase().includes(searchQuery.toLowerCase()) || 
        issue.solution.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allIssues;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Troubleshooting</h1>
      
      <Alert className="mb-6">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Need immediate help?</AlertTitle>
        <AlertDescription>
          If you're experiencing urgent issues, please contact our support team through our <a href="https://tally.so/r/3xYk7o" target="_blank" rel="noopener noreferrer" className="text-coompass-success hover:underline">help form</a>.
        </AlertDescription>
      </Alert>
      
      <div className="space-y-6">
        {filteredIssues.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No troubleshooting guides found matching your search.</p>
          </div>
        ) : (
          filteredIssues.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{item.issue}</CardTitle>
                <CardDescription>{item.solution}</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-2">Steps to resolve:</h4>
                <ol className="list-decimal pl-5 space-y-1">
                  {item.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      <div className="mt-8 text-center border-t pt-6">
        <h3 className="font-semibold mb-3">Still having issues?</h3>
        <p className="text-gray-600 mb-4">
          If you couldn't find a solution to your problem, our support team is ready to help.
        </p>
        <Button asChild>
          <a 
            href="https://tally.so/r/3xYk7o" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Contact Support
          </a>
        </Button>
      </div>
    </div>
  );
}
