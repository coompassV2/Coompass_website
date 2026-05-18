import { Card, CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion";

interface ContentSectionProps {
  children: ReactNode;
}

export function ContentSection({ children }: ContentSectionProps) {
  return (
    <Reveal className="mx-auto max-w-4xl px-6 pb-16 pt-0" variant="fadeIn">
      <Card className="bg-white/70 backdrop-blur-sm">
        <CardContent className="prose prose-gray max-w-none p-8">{children}</CardContent>
      </Card>
    </Reveal>
  );
}
