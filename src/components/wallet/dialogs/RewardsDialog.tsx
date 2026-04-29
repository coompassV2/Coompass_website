
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Award, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

interface RewardsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const rewardOptions = [
  { 
    id: "amazon", 
    title: "Amazon Gift Card", 
    amount: "$25", 
    tokenCost: "250 tokens",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=amazon"
  },
  { 
    id: "starbucks", 
    title: "Starbucks Gift Card", 
    amount: "$15", 
    tokenCost: "150 tokens",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=starbucks"
  },
  { 
    id: "target", 
    title: "Target Gift Card", 
    amount: "$50", 
    tokenCost: "500 tokens",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=target"
  },
];

export function RewardsDialog({ isOpen, onClose }: RewardsDialogProps) {
  const [selectedReward, setSelectedReward] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reward = rewardOptions.find(r => r.id === selectedReward);
    
    if (reward) {
      toast({
        title: "Reward claimed!",
        description: `You've claimed a ${reward.amount} ${reward.title}. Check your email for details.`,
      });
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="text-amber-500" size={20} />
            Claim Your Rewards
          </DialogTitle>
          <DialogDescription>
            Exchange your earned tokens for gift cards and rewards
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="text-sm text-muted-foreground mb-2">
            Available Balance: <span className="font-medium text-foreground">750 tokens</span>
          </div>
          
          <RadioGroup value={selectedReward} onValueChange={setSelectedReward} className="space-y-3">
            {rewardOptions.map((reward) => (
              <Label
                key={reward.id}
                htmlFor={reward.id}
                className={`flex items-center space-x-3 rounded-lg border p-3 cursor-pointer ${
                  selectedReward === reward.id ? "border-primary bg-primary/5" : "border-muted"
                }`}
              >
                <RadioGroupItem value={reward.id} id={reward.id} />
                <div className="flex flex-1 items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded bg-muted flex items-center justify-center overflow-hidden">
                      <img src={reward.image} alt={reward.title} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <div className="font-medium">{reward.title}</div>
                      <div className="text-sm text-muted-foreground">{reward.amount}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{reward.tokenCost}</div>
                </div>
              </Label>
            ))}
          </RadioGroup>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button 
              type="submit" 
              disabled={!selectedReward}
              className="gap-2"
            >
              <Check size={16} />
              Confirm Selection
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
