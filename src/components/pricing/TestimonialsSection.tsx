
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
  rating?: number;
  persona: "volunteer" | "company" | "nonprofit" | "service_provider";
}

export function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      quote: "As a volunteer, Coompass has completely transformed my giving experience. The platform made it simple to find opportunities that match my skills and passion. I can track my impact over time and connect with causes that truly matter to me.",
      name: "David Chen",
      title: "Software Engineer & Volunteer",
      avatar: "/lovable-uploads/7c3b40ae-21de-42f7-a399-eaec5c015399.png",
      rating: 5,
      persona: "volunteer"
    },
    {
      quote: "Our company has seen a 45% increase in employee engagement since implementing Coompass. The platform's ability to match skills with community needs created meaningful volunteer experiences that aligned perfectly with our corporate social responsibility goals.",
      name: "Sandra Williams",
      title: "CSR Director at TechGrowth Inc.",
      avatar: "/lovable-uploads/64bf3f4b-fc78-489a-8ff5-4ec2e9fe9032.png",
      rating: 5,
      persona: "company"
    },
    {
      quote: "As a nonprofit director, volunteer management was always our biggest challenge until we found Coompass. The platform has streamlined our volunteer coordination, improved retention rates, and provided invaluable impact metrics that help us secure more funding.",
      name: "Michael Johnson",
      title: "Executive Director at GreenEarth Foundation",
      avatar: "/lovable-uploads/819dade2-f0a4-42b3-acf3-3f4c9f613307.png",
      rating: 5,
      persona: "nonprofit"
    },
    {
      quote: "Partnering with Coompass as a service provider has expanded our reach dramatically. We now connect with mission-aligned organizations who value our expertise, and the platform's transparent impact tracking helps showcase the real value we bring to the social impact ecosystem.",
      name: "Emily Rodriguez",
      title: "Founder, Community Impact Consultants",
      avatar: "/lovable-uploads/ec917126-d060-45e5-bd90-cb0b702e4cfb.png",
      rating: 5,
      persona: "service_provider"
    },
  ];

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What our customers say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of individuals and organizations that are already making an impact with Coompass
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={cn(
                "bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100",
                (index === 2 || index === 3) && "md:mt-8"
              )}
            >
              <div className="mb-4 flex items-center">
                <Quote className="h-8 w-8 text-purple-400/30" />
                <span className="ml-2 text-xs uppercase font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  {testimonial.persona === "volunteer" && "Volunteer"}
                  {testimonial.persona === "company" && "Company"}
                  {testimonial.persona === "nonprofit" && "Nonprofit"}
                  {testimonial.persona === "service_provider" && "Service Provider"}
                </span>
              </div>
              
              <div className="mb-6">
                <p className="text-sm md:text-base text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
              
              {testimonial.rating && (
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating! ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}
              
              <div className="flex items-center mt-4">
                <Avatar className="h-14 w-14 mr-4 border-2 border-primary rounded-full">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-primary/80">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
