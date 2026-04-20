
import { Button } from "@/components/ui/button";
import { Facebook, Github } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface SocialLoginProps {
  onGithubSignIn?: () => Promise<void>;
  onGoogleSignIn?: () => Promise<void>;
  onFacebookSignIn?: () => Promise<void>;
}

export function SocialLogin({ 
  onGithubSignIn, 
  onGoogleSignIn, 
  onFacebookSignIn 
}: SocialLoginProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const socialButtonBaseClass =
    "w-full border transition-colors";
  
  const handleSocialLogin = async (provider: 'github' | 'google' | 'facebook') => {
    try {
      setIsLoading(true);
      
      if (provider === 'github' && onGithubSignIn) {
        await onGithubSignIn();
        return;
      } 
      
      // AI_NOTE: Google sign-in logic is intentionally preserved for future rollout.
      // The Google button is hidden in UI to avoid exposing placeholder auth.
      if (provider === 'google' && onGoogleSignIn) {
        await onGoogleSignIn();
        return;
      } 
      
      if (provider === 'facebook' && onFacebookSignIn) {
        await onFacebookSignIn();
        return;
      }
      
      // OAuth not available – backend-only auth
      toast({ description: `${provider} sign-in coming soon` });
    } catch (error) {
      console.error(`Error during ${provider} sign in:`, error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: `Failed to sign in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button 
        variant="outline" 
        className={`${socialButtonBaseClass} bg-[#222222] border-white/10 hover:bg-[#333333] text-white hover:text-white dark:bg-[#1a1a1a] dark:hover:bg-[#2b2b2b]`}
        onClick={() => handleSocialLogin('github')}
        disabled={isLoading}
      >
        <Github className="mr-2 h-4 w-4" />
        Sign in with GitHub
      </Button>
      
      <Button 
        variant="outline" 
        className={`${socialButtonBaseClass} bg-[#1877F2] border-white/10 hover:bg-[#1877F2]/90 text-white hover:text-white dark:bg-[#166fe5] dark:hover:bg-[#166fe5]/90`}
        onClick={() => handleSocialLogin('facebook')}
        disabled={isLoading}
      >
        <Facebook className="mr-2 h-4 w-4" />
        Sign in with Facebook
      </Button>
      
      {/* AI_NOTE: Google UI entry-point intentionally hidden; keep callback support in handler above. */}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black/30 text-white px-2">
            Or continue with
          </span>
        </div>
      </div>
    </div>
  );
}
