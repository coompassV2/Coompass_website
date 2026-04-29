
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { PasswordRequirements } from "./PasswordRequirements";
import { CompanyInformationForm } from "./CompanyInformationForm";
import { ReviewStep } from "./ReviewStep";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PersonaType } from "@/utils/personaLabels";

interface CompanyRegistrationFormProps {
  onSubmit: (data: any) => void;
  personaType: PersonaType;
}

// Enhanced schema to match database requirements
const registrationSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  companyName: z.string().min(2, 'Name is required'),
  description: z.string().optional(),
  location: z.string().optional(),
  
  // Contact information
  contactEmail: z.string().email().optional().or(z.literal("")),
  contactPhone: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  
  // Company-specific fields
  industry: z.string().optional(),
  employeesCount: z.number().optional(),
  foundedYear: z.number().optional(),
  sustainabilityGoals: z.array(z.string()).optional(),
  esgPriorities: z.array(z.string()).optional(),
  
  // Organization-specific fields
  organizationType: z.string().optional(),
  yearFounded: z.number().optional(),
  socialMedia: z.record(z.string()).optional(),
  sdgs: z.array(z.string()).optional(),
  
  // Volunteer-specific fields
  skills: z.array(z.string()).optional(),
  
  // Service provider-specific fields
  services: z.array(z.string()).optional(),
  yearsExperience: z.number().optional(),
  hourlyRate: z.number().optional(),
  certifications: z.array(z.string()).optional(),
  portfolioLinks: z.array(z.string()).optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'] 
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export function CompanyRegistrationForm({ onSubmit, personaType }: CompanyRegistrationFormProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentStep, setCurrentStep] = useState<2 | 3>(2);
  
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      description: "",
      location: "",
      contactEmail: "",
      contactPhone: "",
      website: "",
      industry: "",
      employeesCount: undefined,
      foundedYear: undefined,
      sustainabilityGoals: [],
      esgPriorities: [],
      organizationType: "",
      yearFounded: undefined,
      socialMedia: {},
      sdgs: [],
      skills: [],
      services: [],
      yearsExperience: undefined,
      hourlyRate: undefined,
      certifications: [],
      portfolioLinks: []
    }
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (currentStep === 3) {
    const formValues = form.getValues();
    return (
      <ReviewStep 
        selectedImage={selectedImage}
        formValues={formValues}
        onSubmit={onSubmit}
        personaType={personaType}
      />
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => setCurrentStep(3))} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-6 space-y-4 rounded-xl">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
                      <Input 
                        placeholder="email@exemplo.com" 
                        className="bg-black/30 border-white/10 pl-10 text-white" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
                      <Input 
                        type="password" 
                        className="bg-black/30 border-white/10 pl-10 text-white" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
                      <Input 
                        type="password" 
                        className="bg-black/30 border-white/10 pl-10 text-white" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setConfirmPassword(e.target.value);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <PasswordRequirements password={password} confirmPassword={confirmPassword} />
          </div>

          <CompanyInformationForm 
            form={form}
            selectedImage={selectedImage}
            onImageChange={handleImageChange}
            personaType={personaType}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-coompass-success hover:bg-coompass-success/90 text-white"
        >
          Continue
        </Button>
      </form>
    </Form>
  );
}
