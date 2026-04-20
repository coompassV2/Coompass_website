
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function FeedbackContactSection() {
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleSubmitFeedback = () => {
    if (!feedback.trim()) return;
    
    // Mock feedback submission
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! We'll review it and get back to you."
    });
    setFeedback("");
  };

  const handleContactCoompass = () => {
    // Mock contact action
    toast({
      title: "Contact Request",
      description: "Our team will be in touch with you shortly."
    });
  };

  return (
    <section className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Feedback & Contact</h2>
        <p className="text-sm text-gray-600">Share your thoughts or get in touch with our team</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-blue-600" />
              <span>Share Your Feedback</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            <p className="text-xs text-gray-600">
              Help us improve the dashboard and ESG reporting experience.
            </p>
            <Textarea
              placeholder="Your suggestions, questions, or feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
              className="resize-none text-sm"
            />
            <Button onClick={handleSubmitFeedback} disabled={!feedback.trim()} className="w-full text-xs">
              <Send className="w-3.5 h-3.5 mr-1.5" />
              Submit Feedback
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Mail className="w-4 h-4 text-green-600" />
              <span>Contact Coompass</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            <p className="text-xs text-gray-600">
              Need assistance or have questions about ESG initiatives? Our team is here to help.
            </p>
            <div className="space-y-2 text-xs">
              <div>
                <p className="font-medium text-gray-900">ESG Support Team</p>
                <p className="text-gray-600">hello@coompass.org</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Business Hours</p>
                <p className="text-gray-600">Monday - Friday, 9:00 AM - 6:00 PM CET</p>
              </div>
            </div>
            <Button onClick={handleContactCoompass} variant="outline" className="w-full text-xs">
              <Mail className="w-3.5 h-3.5 mr-1.5" />
              Contact Our Team
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
