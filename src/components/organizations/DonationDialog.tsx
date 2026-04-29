import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { playConfettiAnimation } from "@/utils/confettiUtils";

interface DonationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type DonationType = "one-time" | "weekly" | "monthly";

const DONATION_AMOUNTS = [10, 20, 50, 100];
const CURRENCY_SYMBOL = "€";

export function DonationDialog({ open, onOpenChange }: DonationDialogProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donationType, setDonationType] = useState<DonationType>("one-time");
  const [showThankYou, setShowThankYou] = useState(false);

  const handleConfirm = () => {
    const animationEnd = playConfettiAnimation(3000);
    setShowThankYou(true);
    onOpenChange(false); // Close the dialog immediately
    
    // Schedule cleanup of thank you message
    setTimeout(() => {
      setShowThankYou(false);
    }, 3000);
  };

  return (
    <>
      {showThankYou && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none">
          <div className="text-7xl font-bold text-coompass-success animate-bounce">
            Thank you for helping us!
          </div>
        </div>
      )}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <h2 className="text-lg font-semibold">Make a Donation</h2>
          <div className="mt-4">
            <h3 className="text-md">Select Amount</h3>
            <div className="flex flex-wrap gap-4 mt-2">
              {DONATION_AMOUNTS.map(amount => (
                <button
                  key={amount}
                  className={`px-4 py-2 rounded-lg ${
                    selectedAmount === amount 
                      ? 'bg-coompass-success text-white' 
                      : 'bg-gray-200 dark:text-black'
                  }`}
                  onClick={() => setSelectedAmount(amount)}
                >
                  {CURRENCY_SYMBOL}{amount}
                </button>
              ))}
              <input
                type="number"
                placeholder="Custom Amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-32 dark:text-black"
              />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-md">Donation Type</h3>
            <div className="flex gap-4 mt-2">
              {(["one-time", "weekly", "monthly"] as const).map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 rounded-lg ${
                    donationType === type 
                      ? 'bg-coompass-success text-white' 
                      : 'bg-gray-200 dark:text-black'
                  }`}
                  onClick={() => setDonationType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-coompass-success text-white rounded-lg"
            >
              Confirm Donation
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}