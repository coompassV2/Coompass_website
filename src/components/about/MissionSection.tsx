
import { AuroraText } from "@/components/ui/aurora-text";
import { Users, Globe, HeartHandshake, Leaf } from "lucide-react";

export function MissionSection() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Our <AuroraText colors={["#22c55e", "#10b981", "#34d399", "#059669"]}>Mission</AuroraText>
      </h2>
      
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <p className="text-lg text-gray-700 mb-6 text-center">
          At <span className="font-semibold">Coompass</span>, we are dedicated to 
          <span className="font-semibold"> connecting companies, nonprofits, volunteers, and service providers</span> in 
          a collaborative ecosystem that maximizes social impact.
        </p>
        
        <p className="text-gray-700 mb-6">
          We believe in the power of collective action. By bringing together corporate resources, 
          nonprofit expertise, individual talent, and specialized services, we create a powerful 
          network where each participant contributes their unique strengths toward solving 
          social and environmental challenges.
        </p>
        
        <p className="text-gray-700">
          Our platform makes it easy for each stakeholder to find their role in this ecosystem:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold text-blue-700 flex items-center gap-2 mb-2">
              <Users className="h-5 w-5" /> For Companies
            </h3>
            <p className="text-gray-700 text-sm">
              We help businesses enhance their ESG initiatives through meaningful employee 
              engagement and impactful corporate social responsibility programs.
            </p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-bold text-green-700 flex items-center gap-2 mb-2">
              <Globe className="h-5 w-5" /> For Nonprofits
            </h3>
            <p className="text-gray-700 text-sm">
              We connect charitable organizations with the resources, skills, and support 
              they need to expand their reach and amplify their impact.
            </p>
          </div>
          
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h3 className="font-bold text-indigo-700 flex items-center gap-2 mb-2">
              <HeartHandshake className="h-5 w-5" /> For Volunteers
            </h3>
            <p className="text-gray-700 text-sm">
              We empower professionals to contribute their skills and time to causes they care about, 
              while gaining valuable experience and making a difference.
            </p>
          </div>
          
          <div className="bg-teal-50 p-6 rounded-lg">
            <h3 className="font-bold text-teal-700 flex items-center gap-2 mb-2">
              <Leaf className="h-5 w-5" /> For Service Providers
            </h3>
            <p className="text-gray-700 text-sm">
              We help specialized service providers grow their impact-focused businesses by connecting them 
              with organizations seeking their expertise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
