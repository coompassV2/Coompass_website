
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ApiKeyInputProps {
  onSubmit: (apiKey: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onSubmit }) => {
  const [apiKey, setApiKey] = React.useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey.trim());
      onSubmit(apiKey.trim());
      toast({
        title: "API Key saved",
        description: "Your API key has been saved for this session.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-card rounded-lg border border-border">
      <h3 className="text-lg font-semibold">Enter your OpenAI API Key</h3>
      <p className="text-sm text-muted-foreground">
        To use the AI chat feature, please enter your OpenAI API key. 
        You can get one from the{' '}
        <a 
          href="https://platform.openai.com/api-keys" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          OpenAI website
        </a>
        .
      </p>
      <Input
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="sk-..."
        className="w-full"
      />
      <Button type="submit" disabled={!apiKey.trim()}>
        Save API Key
      </Button>
    </form>
  );
};
