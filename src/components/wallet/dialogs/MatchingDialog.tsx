
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MatchingDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MatchingDialog({ isOpen, onClose }: MatchingDialogProps) {
  const [matchingCap, setMatchingCap] = useState("500");
  const [matchingRate, setMatchingRate] = useState("100");
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Matching program updated",
      description: `Employee donation matching set to ${matchingRate}% (up to $${matchingCap} per donation)`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="text-amber-500" size={20} />
            Employee Donation Matching
          </DialogTitle>
          <DialogDescription>
            Configure your company's donation matching program for employees
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="matchingRate">Matching Rate (%)</Label>
            <div className="relative">
              <Input 
                id="matchingRate"
                type="number" 
                value={matchingRate} 
                onChange={(e) => setMatchingRate(e.target.value)}
                className="pr-8"
                required
                min="1"
                max="500"
              />
              <span className="absolute right-3 top-2.5">%</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Percentage of employee donations that your company will match
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="matchingCap">Maximum Match Per Donation</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5">$</span>
              <Input 
                id="matchingCap"
                type="number" 
                value={matchingCap} 
                onChange={(e) => setMatchingCap(e.target.value)}
                className="pl-7"
                required
                min="100"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Maximum amount your company will match per individual donation
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="active">Activate matching program</Label>
            <Switch 
              id="active" 
              checked={isActive} 
              onCheckedChange={setIsActive}
            />
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Configuration</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
