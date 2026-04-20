import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { useState, useEffect } from "react";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useTheme } from "@/hooks/useTheme";
import { PageHeader } from "@/components/PageHeader";
import { ApiKeyInput } from "@/components/chat/ApiKeyInput";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { getCurrentPersona } from "@/components/app-sidebar/SidebarMenuConfig";
import { Card, CardContent } from "@/components/ui/card";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AskAI() {
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [apiKey, setApiKey] = useState<string>('');
  const [assistantMode, setAssistantMode] = useState<'sustainability' | 'mission'>('sustainability');
  const { toast } = useToast();
  const currentPersona = getCurrentPersona();
  const isOrganization = currentPersona === "organization";

  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    
    // Set default assistant mode based on persona
    if (isOrganization) {
      setAssistantMode('mission');
    }
  }, [isOrganization]);

  const questions = {
    sustainability: [
      "How can we engage employees on ESG initiatives?",
      "Help us set industry specific ESG goals.",
      "What are the best practices for sustainability reporting?",
      "How do we benchmark ESG progress against industry standards?"
    ],
    mission: isOrganization ? [
      "Design a community cleanup volunteering project",
      "Create a skills-based mentoring program",
      "How do we measure volunteer program impact?",
      "Develop a corporate partnership for our next initiative"
    ] : [
      "Create a volunteer program focused on environmental impact",
      "Design a skills-based volunteering initiative",
      "Help us measure volunteer program impact",
      "Suggest team-building volunteer activities"
    ]
  };

  const handleSubmit = async () => {
    if (!message.trim()) return;
    
    const userMessage: Message = {
      role: 'user',
      content: message
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage("");

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [...chatHistory, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        if (response.status === 429) {
          throw new Error('API quota exceeded. Please check your OpenAI account billing and limits.');
        } else if (response.status === 401) {
          throw new Error('Invalid API key. Please check your API key and try again.');
        } else {
          throw new Error(errorData.error?.message || 'Failed to get AI response');
        }
      }

      const data = await response.json();
      const aiResponse: Message = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      setChatHistory(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error:', error);
      
      let errorMessage = error.message;
      if (error.message.includes('quota exceeded')) {
        localStorage.removeItem('openai_api_key');
        setApiKey('');
        errorMessage = 'Your OpenAI API key has exceeded its quota. Please check your billing details or use a different API key.';
      }
      
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
      
      const errorResponse: Message = {
        role: 'assistant',
        content: errorMessage
      };
      setChatHistory(prev => [...prev, errorResponse]);
    }
  };

  const handleQuestionClick = (question: string) => {
    setMessage(question);
  };

  const pageTitle = isOrganization ? "AI Mission Builder" : "Ask AI";

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <AppSidebar />
        
        <main className={cn(
          "transition-all duration-300 ease-in-out p-4 md:p-8",
          !isMobile && "responsive-layout"
        )}>
          <PageHeader 
            title={pageTitle}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          <div className="mt-6">
          <Card>
            <CardContent className="py-8">
              <p className="text-sm text-muted-foreground">
                {t("Under construction")}
              </p>
            </CardContent>
          </Card>
        </div>

          {/* {!apiKey && (
            <div className="mb-8">
              <ApiKeyInput onSubmit={setApiKey} />
            </div>
          )}

          {apiKey && (
            <ChatContainer
              chatHistory={chatHistory}
              message={message}
              setMessage={setMessage}
              handleSubmit={handleSubmit}
              questions={questions[assistantMode]}
              handleQuestionClick={handleQuestionClick}
              assistantMode={assistantMode}
              setAssistantMode={setAssistantMode}
              isOrganization={isOrganization}
            />
          )} */}
        </main>
      </div>
    </TooltipProvider>
  );
}
