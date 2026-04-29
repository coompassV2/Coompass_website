
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ArrowRight } from "lucide-react";

export function CryptoConverter() {
  const [fromAmount, setFromAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toAmount, setToAmount] = useState("0.3505123");
  const [toCurrency, setToCurrency] = useState("ETH");

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Convert</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Input 
            type="text" 
            value={fromAmount} 
            onChange={(e) => setFromAmount(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" className="min-w-[80px] flex items-center justify-between">
            {fromCurrency}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
        
        <div className="flex items-center">
          <div className="text-sm font-medium">To</div>
        </div>
        
        <div className="flex items-center gap-2">
          <Input 
            type="text" 
            value={toAmount} 
            onChange={(e) => setToAmount(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" className="min-w-[80px] flex items-center justify-between">
            {toCurrency}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
        
        <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500">
          Convert
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
