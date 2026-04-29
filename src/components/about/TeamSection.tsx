
import { useState } from "react";
import { AuroraText } from "@/components/ui/aurora-text";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Linkedin } from "lucide-react";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  initials: string;
  linkedIn?: string;
  expandedBio?: string;
}

export function TeamSection() {
  const teamMembers: TeamMember[] = [
    {
      name: "Pedro Lisbon",
      role: "Co-Founder",
      bio: "Extensive experience in managing international projects for social impact. Focus on leveraging Web3's unique capabilities to drive impactful solutions and merging technology with social good.",
      photoUrl: "/lovable-uploads/9819eea3-6a8b-489f-a1a4-a60b91bf6be4.png", // Changed to Rodrigo's photo
      initials: "PL",
      linkedIn: "https://www.linkedin.com/in/pedro-lisbon-2aab321b/",
      expandedBio: "Pedro has over 15 years of experience in the nonprofit sector, with a particular focus on technology-driven social impact initiatives. Before founding Coompass, he led several international development projects that connected corporate resources with community needs. His vision is to create a platform that makes social responsibility seamless and measurable for all stakeholders."
    },
    {
      name: "Francisco Lourenço",
      role: "Co-Founder",
      bio: "With more than 10 years of experience in disrupting corporate go-to-market strategies, specializing in digital and social campaigns. For the past 3 years, dedicated to advancing web3 and blockchain adoption.",
      photoUrl: "/lovable-uploads/5f55e899-aa93-441a-9a87-3c2148b1737f.png", // Changed to João's photo
      initials: "FL",
      linkedIn: "https://www.linkedin.com/in/franlouco/",
      expandedBio: "Francisco brings his extensive marketing and blockchain expertise to Coompass, ensuring the platform delivers value to all users while advancing adoption of transparent impact tracking. His background in corporate strategy helps bridge the gap between companies and nonprofits, creating meaningful partnerships that drive real change."
    },
    {
      name: "Rodrigo Sousa",
      role: "Designer",
      bio: "An experienced design professional with a diverse portfolio of experiences. He specializes in branding and creating seamless and engaging user interfaces and experiences across various platforms.",
      photoUrl: "/lovable-uploads/1a2e7850-e66f-4fb2-aa2e-417002239f59.png", // Changed to Pedro's photo
      initials: "RS",
      linkedIn: "https://www.linkedin.com/in/rodrigosous-a/",
      expandedBio: "Rodrigo leads the design vision for Coompass, ensuring that the platform is not only beautiful but also accessible and intuitive for all users. His human-centered design approach puts users first, creating experiences that delight while solving real problems for our community."
    },
    {
      name: "João Gonçalves",
      role: "Developer",
      bio: "Specialized in blockchain development, his expertise includes enterprise product development, agile methodologies, and product strategy, ensuring seamless integration of Web3 technologies.",
      photoUrl: "/lovable-uploads/3a847120-150f-4685-93fc-7c082f57d183.png", // Changed to Francisco's photo
      initials: "JG",
      linkedIn: "https://www.linkedin.com/in/moshmage/",
      expandedBio: "João is the technical backbone of Coompass, architecting our blockchain integration and ensuring the platform is secure, scalable, and future-proof. His passion for using technology as a force for good drives our commitment to transparent impact tracking and verification."
    }
  ];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-6 text-center">
        The <AuroraText colors={["#9b87f5", "#7E69AB", "#6E59A5", "#8B5CF6"]}>Team</AuroraText>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </section>
  );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Card className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col items-center md:items-start md:flex-row gap-4">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Avatar className="h-24 w-24 rounded-md border-2 border-primary/20 cursor-pointer transition-transform hover:scale-105">
              <AvatarImage src={member.photoUrl} alt={member.name} />
              <AvatarFallback className="bg-primary/10 text-primary">{member.initials}</AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent className="w-72">
            <div className="flex justify-between space-x-4">
              <div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-green-500">{member.role}</p>
                <p className="text-xs text-gray-500 mt-1">Hover for more information about our team</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{member.name}</h3>
          <p className="text-green-500 font-medium">{member.role}</p>
          <p className="text-gray-600 mt-2 text-sm">{member.bio}</p>
          
          {member.expandedBio && (
            <Collapsible 
              open={isExpanded} 
              onOpenChange={setIsExpanded}
              className="mt-2"
            >
              <CollapsibleContent className="text-sm text-gray-600 mt-2 pt-2 border-t border-gray-100">
                {member.expandedBio}
              </CollapsibleContent>
              
              <div className="flex items-center gap-3 mt-3">
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-primary border-primary/30 hover:bg-primary/5 flex items-center gap-1"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        <span>Show Less</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        <span>Read More</span>
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
                
                {member.linkedIn && (
                  <a 
                    href={member.linkedIn} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`Visit ${member.name}'s LinkedIn profile`}
                  >
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-blue-600 border-blue-300 hover:bg-blue-50"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn Profile</span>
                    </Button>
                  </a>
                )}
              </div>
            </Collapsible>
          )}
        </div>
      </div>
    </Card>
  );
}
