import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  price: number;
  period: string;
  description?: string;
  features: string[];
  buttonText: string;
  buttonVariant: "default" | "outline" | "accent";
  buttonAction: () => void;
  popular?: boolean;
}

export function PricingCard({
  title,
  subtitle,
  icon,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant,
  buttonAction,
  popular = false,
}: PricingCardProps) {
  return (
    <Card className={cn(
      "relative flex flex-col p-4 bg-[#1B2235] border-none hover:bg-[#1F283D] transition-all duration-300 rounded-xl h-full",
      popular && "ring-2 ring-purple-600"
    )}>
      {popular && (
        <div className="absolute top-0 right-6 -translate-y-3 bg-purple-600 text-white px-3 py-0.5 text-xs font-semibold rounded-full">
          MOST POPULAR
        </div>
      )}

      <div className="flex items-center gap-2 mb-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-white">€{price}</span>
          <span className="text-xs text-gray-400 ml-2">{period}</span>
        </div>
        {description && (
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        )}
      </div>

      <div className="flex flex-col gap-3 mb-6 grow">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2 text-white">
            <div className={cn(
              "rounded-full p-1 mt-0.5",
              title === "Free" ? "text-green-500" : 
              title === "Member" ? "text-purple-500" : 
              title === "Pro" ? "text-blue-500" :
              title === "Enterprise" ? "text-purple-500" :
              title === "Starter" ? "text-green-500" :
              title === "Professional" ? "text-orange-500" :
              title === "Business" ? "text-purple-500" :
              "text-orange-500"
            )}>
              <Check className="h-3 w-3" />
            </div>
            <span className="text-xs text-gray-300">{feature}</span>
          </div>
        ))}
      </div>

      <Button 
        className={cn(
          "w-full mt-auto rounded-full text-white text-sm py-1.5 px-3 h-auto",
          buttonVariant === "default" && title === "Free" && "bg-green-500 hover:bg-green-600",
          buttonVariant === "default" && title === "Pro" && "bg-blue-600 hover:bg-blue-700",
          buttonVariant === "default" && title === "Enterprise" && "bg-purple-600 hover:bg-purple-700",
          buttonVariant === "default" && title === "Starter" && "bg-green-500 hover:bg-green-600",
          buttonVariant === "default" && title === "Professional" && "bg-orange-600 hover:bg-orange-700",
          buttonVariant === "default" && title === "Business" && "bg-purple-600 hover:bg-purple-700",
          buttonVariant === "accent" && "bg-purple-600 hover:bg-purple-700"
        )}
        onClick={buttonAction}
      >
        {buttonText}
      </Button>
    </Card>
  );
}
