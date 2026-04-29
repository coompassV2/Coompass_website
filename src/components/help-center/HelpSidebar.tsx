
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  HelpCircle, 
  PackageOpen, 
  AlertCircle, 
  GraduationCap,
  Bookmark
} from "lucide-react";
import { PersonaType } from "@/utils/personaLabels";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface HelpSidebarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activePersona: PersonaType | null;
  setActivePersona: (persona: PersonaType) => void;
}

export function HelpSidebar({ 
  activeCategory, 
  setActiveCategory,
  activePersona,
  setActivePersona
}: HelpSidebarProps) {
  // Categories with their icons
  const categories = [
    { id: "getting-started", name: "Getting Started", icon: <BookOpen className="h-4 w-4" /> },
    { id: "guides", name: "User Guides", icon: <GraduationCap className="h-4 w-4" /> },
    { id: "faqs", name: "FAQs", icon: <HelpCircle className="h-4 w-4" /> },
    { id: "features", name: "Features", icon: <PackageOpen className="h-4 w-4" /> },
    { id: "troubleshooting", name: "Troubleshooting", icon: <AlertCircle className="h-4 w-4" /> },
    { id: "bookmarks", name: "My Bookmarks", icon: <Bookmark className="h-4 w-4" /> },
  ];
  
  // Available personas - map nonprofit to organization since they're the same
  const personas = [
    { id: "company", name: "Company" },
    { id: "organization", name: "Nonprofit" },
    { id: "volunteer", name: "Volunteer" },
  ];

  // Handle persona selection, mapping "nonprofit" to "organization"
  const handlePersonaChange = (value: string) => {
    // Map "nonprofit" to "organization" internally
    const personaValue = value === "nonprofit" ? "organization" : value as PersonaType;
    setActivePersona(personaValue);
  };
  
  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* Persona Selector */}
        <div>
          <h3 className="text-sm font-medium mb-3">View As</h3>
          <RadioGroup 
            defaultValue={activePersona || "company"}
            onValueChange={handlePersonaChange}
            className="flex flex-wrap gap-2"
          >
            {personas.map((persona) => (
              <div key={persona.id} className="flex items-center space-x-1">
                <RadioGroupItem value={persona.id} id={`persona-${persona.id}`} className="sr-only" />
                <Label 
                  htmlFor={`persona-${persona.id}`}
                  className={cn(
                    "text-xs rounded-full px-2 py-1 cursor-pointer border",
                    (activePersona === persona.id || 
                     (activePersona === "organization" && persona.id === "nonprofit"))
                      ? "bg-primary text-primary-foreground border-primary" 
                      : "hover:bg-accent"
                  )}
                >
                  {persona.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        {/* Category Navigation */}
        <div>
          <h3 className="text-sm font-medium mb-3">Categories</h3>
          <nav className="space-y-1">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  activeCategory === category.id ? "font-medium" : "font-normal"
                )}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </Card>
  );
}
