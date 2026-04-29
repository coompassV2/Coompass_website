
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Megaphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addDays } from "date-fns";

interface CampaignDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CampaignDialog({ isOpen, onClose }: CampaignDialogProps) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), 30));
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Fundraising campaign created",
      description: `${name} campaign with a goal of $${goal} has been created.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Megaphone className="text-blue-500" size={20} />
            Create Fundraising Campaign
          </DialogTitle>
          <DialogDescription>
            Launch a new fundraising campaign for your nonprofit
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Programa de Verão para Jovens"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="goal">Fundraising Goal</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5">$</span>
              <Input 
                id="goal"
                type="number" 
                placeholder="0.00"
                value={goal} 
                onChange={(e) => setGoal(e.target.value)}
                className="pl-7"
                required
                min="100"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Campaign Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="health">Health & Medical</SelectItem>
                <SelectItem value="animals">Animals & Wildlife</SelectItem>
                <SelectItem value="community">Community Development</SelectItem>
                <SelectItem value="disaster">Disaster Relief</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <DatePicker 
                date={startDate} 
                onSelect={setStartDate} 
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <DatePicker 
                date={endDate} 
                onSelect={setEndDate} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Campaign Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your campaign and how the funds will be used..."
              rows={4}
              required
            />
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Launch Campaign</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
