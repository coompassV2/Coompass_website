
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HandHeart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DonateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  personaType?: 'company' | 'volunteer';
}

export function DonateDialog({ isOpen, onClose, personaType = 'volunteer' }: DonateDialogProps) {
  const [amount, setAmount] = useState("");
  const [organization, setOrganization] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would connect to payment processing
    toast({
      title: "Donation initiated",
      description: `$${amount} ${isRecurring ? 'recurring ' : ''}donation to ${organization}`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HandHeart className={personaType === 'company' ? "text-purple-500" : "text-pink-500"} size={20} />
            {personaType === 'company' ? "Corporate Giving" : "Make a Donation"}
          </DialogTitle>
          <DialogDescription>
            {personaType === 'company' 
              ? "Support nonprofits aligned with your ESG goals" 
              : "Support causes you care about"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="organization">Select Organization</Label>
            <Select value={organization} onValueChange={setOrganization} required>
              <SelectTrigger id="organization">
                <SelectValue placeholder="Select an organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Greenpeace">Greenpeace</SelectItem>
                <SelectItem value="Red Cross">Red Cross</SelectItem>
                <SelectItem value="UNICEF">UNICEF</SelectItem>
                <SelectItem value="WWF">World Wildlife Fund</SelectItem>
                <SelectItem value="Doctors Without Borders">Doctors Without Borders</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Donation Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5">$</span>
              <Input 
                id="amount"
                type="number" 
                placeholder="0.00"
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7"
                required
                min="1"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="recurring"
              checked={isRecurring}
              onChange={() => setIsRecurring(!isRecurring)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="recurring" className="text-sm">Make this a monthly donation</Label>
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Complete Donation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
