
import { AuroraText } from "@/components/ui/aurora-text";
import { Card } from "@/components/ui/card";
import { Leaf, HeartHandshake, Zap, Shield } from "lucide-react";
import { useState } from "react";

interface CoreValue {
  title: string;
  description: string;
  icon: JSX.Element;
  longDescription?: string;
  color: string;
}

export function CoreValuesSection() {
  const coreValues: CoreValue[] = [
    {
      title: "Sustainability",
      description: "We integrate sustainable practices into every part of our operation.",
      longDescription: "Sustainability is at the heart of everything we do. We believe in creating solutions that meet the needs of the present without compromising the ability of future generations to meet their own needs. This principle guides our platform development, partnerships, and operational decisions.",
      icon: <Leaf className="h-8 w-8 text-green-400" />,
      color: "bg-green-400"
    },
    {
      title: "Social Impact",
      description: "We focus on what truly matters: creating results that make a difference in society.",
      longDescription: "Our mission is to drive meaningful social impact through connecting resources with needs. We measure our success not by traditional metrics, but by the positive change we help create in communities around the world.",
      icon: <HeartHandshake className="h-8 w-8 text-blue-400" />,
      color: "bg-blue-400"
    },
    {
      title: "Innovation & Agility",
      description: "We are constantly evolving, staying ahead of future needs overall.",
      longDescription: "The challenges facing our world are constantly changing, and so must our solutions. We embrace technological innovation and maintain the agility to adapt quickly to emerging needs and opportunities in the social impact space.",
      icon: <Zap className="h-8 w-8 text-purple-400" />,
      color: "bg-purple-400"
    },
    {
      title: "Transparency & Ethics",
      description: "We believe in clear communication and doing what's right.",
      longDescription: "Trust is fundamental to our ecosystem. We leverage blockchain technology to ensure verifiable transparency in all our operations, and we hold ourselves to the highest ethical standards in every decision we make.",
      icon: <Shield className="h-8 w-8 text-orange-400" />,
      color: "bg-orange-400"
    }
  ];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Our <AuroraText colors={["#22c55e", "#10b981", "#34d399", "#059669"]}>Core Values</AuroraText>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coreValues.map((value, index) => (
          <ValueCard key={index} value={value} />
        ))}
      </div>
    </section>
  );
}

function ValueCard({ value }: { value: CoreValue }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="bg-gray-900 text-white p-6 rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center text-center p-4 h-full">
        <div 
          className={`bg-black/30 p-3 rounded-full mb-4 transition-all duration-300 ${
            isHovered ? "scale-110 animate-pulse" : ""
          }`}
        >
          {value.icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
        
        <p className="text-gray-300 transition-opacity duration-300" style={{ opacity: isHovered && value.longDescription ? "0" : "1" }}>
          {value.description}
        </p>
        
        {value.longDescription && (
          <div 
            className="absolute inset-0 flex items-center justify-center p-6 bg-gray-900 transition-opacity duration-300 opacity-0 hover:opacity-100" 
            style={{ opacity: isHovered ? "1" : "0" }}
          >
            <p className="text-gray-300 text-sm">
              {value.longDescription}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
