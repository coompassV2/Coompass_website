import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CallToActionSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  bgColor?: string;
  buttonColor?: string;
}

export function CallToActionSection({ 
  title, 
  description, 
  buttonText, 
  buttonHref,
  bgColor = "blue-50",
  buttonColor = "blue-600"
}: CallToActionSectionProps) {
  // Map color props to actual Tailwind classes
  const bgColorClasses = {
    "blue-50": "bg-blue-50",
    "green-50": "bg-green-50",
    "teal-50": "bg-teal-50",
    "purple-50": "bg-purple-50",
    "indigo-50": "bg-indigo-50",
    "pink-50": "bg-pink-50",
    "amber-50": "bg-amber-50",
    "emerald-50": "bg-emerald-50"
  };

  const buttonColorClasses = {
    "blue-600": "bg-blue-600 hover:bg-blue-700",
    "green-600": "bg-green-600 hover:bg-green-700",
    "teal-600": "bg-teal-600 hover:bg-teal-700",
    "purple-600": "bg-purple-600 hover:bg-purple-700",
    "indigo-600": "bg-indigo-600 hover:bg-indigo-700",
    "pink-600": "bg-pink-600 hover:bg-pink-700",
    "amber-600": "bg-amber-600 hover:bg-amber-700",
    "emerald-600": "bg-emerald-600 hover:bg-emerald-700"
  };

  const bgClass = bgColorClasses[bgColor as keyof typeof bgColorClasses] || "bg-blue-50";
  const buttonClass = buttonColorClasses[buttonColor as keyof typeof buttonColorClasses] || "bg-blue-600 hover:bg-blue-700";

  return (
    <div className={cn("p-6 rounded-xl", bgClass)}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button className={cn("text-white", buttonClass)}>
        <a 
          href={buttonHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          {buttonText} <ArrowRight className="h-4 w-4" />
        </a>
      </Button>
    </div>
  );
}
