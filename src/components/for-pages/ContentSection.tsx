import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface ContentSectionProps {
  children: ReactNode;
}

export function ContentSection({ children }: ContentSectionProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-16 pt-0">
      <Card className="bg-white/70 backdrop-blur-sm">
        <CardContent className="p-8 prose prose-gray max-w-none">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
