
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function ClaimRewards() {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950/50 dark:to-teal-950/50 border-teal-200 dark:border-teal-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-teal-900 dark:text-teal-200">Turn Digital Coins into Real Rewards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-teal-700 dark:text-teal-300">Exchange your digital coins for gift cards in just a few clicks.</p>
          
          <Button 
            variant="outline" 
            className="w-full border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/50"
          >
            Claim your Gift Card
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
