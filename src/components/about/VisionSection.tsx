
import { useState } from "react";
import { AuroraText } from "@/components/ui/aurora-text";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function VisionSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const visionPoints = [
    {
      title: "Global Network",
      content: "Building a worldwide community of changemakers connecting skills, resources, and needs across borders."
    },
    {
      title: "Technological Innovation",
      content: "Leveraging blockchain and Web3 technologies to ensure transparency, trust, and verification of impact."
    },
    {
      title: "Sustainable Growth",
      content: "Creating a system that incentivizes and rewards meaningful contributions to social and environmental challenges."
    }
  ];
  
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Our <AuroraText colors={["#3b82f6", "#0ea5e9", "#38bdf8", "#0284c7"]}>Vision</AuroraText> for the Future
      </h2>
      
      <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
        <CardContent className="p-8">
          <p className="text-lg text-gray-700 text-center mb-8">
            The future of <span className="font-semibold">Coompass</span> is about building a <span className="font-semibold">global network of social impact</span>, 
            supported by our <span className="font-semibold">technological innovations</span>, to enable companies, nonprofits, 
            and individuals to collaborate for a more just and sustainable world.
          </p>
          
          <Accordion type="single" collapsible className="w-full">
            {visionPoints.map((point, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border-b border-gray-100 last:border-b-0"
              >
                <AccordionTrigger className="hover:no-underline">
                  <h3 className="text-lg font-medium">{point.title}</h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 py-2">{point.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <p className="text-gray-700 mt-6 text-center italic">
            We are in a constant state of learning and growth, and we invite everyone to join us on this journey.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
