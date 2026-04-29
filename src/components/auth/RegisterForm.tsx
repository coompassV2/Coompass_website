
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { registerUser } from "@/services/registrationService";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading) return;
    setIsLoading(true);
    
    try {
      console.log("Simple registration form - submitting data");
      
      // Use the consolidated registration service with volunteer persona type
      await registerUser('volunteer', {
        email,
        password,
        companyName: name,
      });
      
      console.log("Simple registration successful");
      
      toast({
        title: "Account created successfully",
        description: "Please check your email to verify your account.",
      });
      
      navigate('/login');
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registration Error",
        description: error instanceof Error ? error.message : "Failed to create account. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-white/10 text-white placeholder:text-gray-400"
        />
      </div>
      
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/10 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-white/10 text-white placeholder:text-gray-400"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
};
