
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NewsletterSection = () => {
  return (
    <section>
      <Card className="border-none shadow-md bg-gradient-to-r from-coompass-success/10 to-coompass-success/5">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-3">Stay Updated with Our Newsletter</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Subscribe to our newsletter to receive the latest news, events, and updates 
                from our sustainability ecosystem delivered directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md flex-grow"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
            <div className="md:w-1/3">
              <img 
                src="/lovable-uploads/d800f558-cfb9-47d6-b690-3d933426834e.png" 
                alt="Newsletter" 
                className="h-48 object-contain"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default NewsletterSection;
