
import React from 'react';
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { QuestionCard } from "@/components/chat/QuestionCard";
import { FilterToggle } from "@/components/shared/FilterToggle";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatContainerProps {
  chatHistory: Message[];
  message: string;
  setMessage: (message: string) => void;
  handleSubmit: () => void;
  questions: string[];
  handleQuestionClick: (question: string) => void;
  assistantMode: 'sustainability' | 'mission';
  setAssistantMode: (mode: 'sustainability' | 'mission') => void;
  isOrganization?: boolean;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  chatHistory,
  message,
  setMessage,
  handleSubmit,
  questions,
  handleQuestionClick,
  assistantMode,
  setAssistantMode,
  isOrganization = false,
}) => {
  const titles = {
    sustainability: {
      title: "Sustainability Assistant",
      subtitle: "Get real-time insights and guidance on ESG reporting and sustainability initiatives"
    },
    mission: isOrganization ? {
      title: "Mission Builder",
      subtitle: "Create impactful volunteering projects and track their alignment with community goals"
    } : {
      title: "Mission Builder",
      subtitle: "Create impactful volunteering opportunities and track their alignment with ESG goals"
    }
  };

  return (
    <>
      <div className="flex items-start justify-start mb-8">
        <Tabs value={assistantMode} onValueChange={setAssistantMode} className="w-auto">
          <TabsList className="grid grid-cols-2 gap-4">
            <TabsTrigger value="sustainability" className="flex items-center">
              Sustainability Assistant
            </TabsTrigger>
            <TabsTrigger value="mission" className="flex items-center">
              Mission Builder
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <h2 className="text-xl font-semibold mb-2 flex items-center">
        {titles[assistantMode].title}
      </h2>
      <p className="text-muted-foreground mb-8">
        {titles[assistantMode].subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {questions.map((question) => (
          <QuestionCard
            key={question}
            question={question}
            onClick={handleQuestionClick}
          />
        ))}
      </div>

      <div className="glass-card p-6 mb-24">
        <h2 className="text-lg font-semibold mb-4">Chat conversation</h2>
        <div className="space-y-4">
          {chatHistory.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} />
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-64 right-0 p-8 bg-background border-t">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Textarea
                placeholder={`Message ${titles[assistantMode].title}`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[60px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
            </div>
            <Button 
              onClick={handleSubmit}
              className={cn(
                "px-4 py-2 text-white rounded-lg",
                isOrganization && assistantMode === 'mission' 
                  ? "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                  : "bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600"
              )}
            >
              <Send className="w-4 h-4 mr-2" />
              Ask AI
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Important note: Always double-check critical information as AI can make mistakes.
          </p>
        </div>
      </div>
    </>
  );
};
