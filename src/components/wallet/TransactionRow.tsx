
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, BadgeDollarSign, Building2, Coins, ExternalLink, Gift, HandCoins, HandHeart, Heart, Megaphone, PiggyBank, Users } from "lucide-react";
import { TransactionItem } from "@/utils/transactions/types";
import { getTypeDescription } from "@/utils/transactions/descriptionUtils";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface TransactionRowProps {
  transaction: TransactionItem;
  isLightMode: boolean;
  personaType: 'company' | 'nonprofit' | 'volunteer';
  activeTab: string;
}

export function TransactionRow({ transaction: tx, isLightMode, personaType, activeTab }: TransactionRowProps) {
  // Render the appropriate icon based on the transaction type and persona
  const renderIcon = () => {
    // Basic transaction type icons
    if (tx.type === "digitalcoins") {
      if (personaType === 'company') {
        return <BadgeDollarSign className="h-6 w-6 text-green-500" />;
      } else if (personaType === 'nonprofit') {
        return <PiggyBank className="h-6 w-6 text-blue-500" />;
      } else {
        // volunteer
        return <Coins className="h-6 w-6 text-amber-500" />;
      }
    } else if (tx.type === "donations") {
      if (personaType === 'company') {
        return <HandHeart className="h-6 w-6 text-purple-500" />;
      } else if (personaType === 'nonprofit') {
        return <HandCoins className="h-6 w-6 text-emerald-500" />;
      } else {
        // volunteer
        return <Heart className="h-6 w-6 text-pink-500" />;
      }
    } else if (activeTab === "grants") {
      return <Building2 className="h-6 w-6 text-indigo-500" />;
    } else if (activeTab === "campaigns") {
      return <Megaphone className="h-6 w-6 text-cyan-500" />;
    } else if (activeTab === "rewards") {
      return <Gift className="h-6 w-6 text-rose-500" />;
    } else if (activeTab === "impact") {
      return <Award className="h-6 w-6 text-teal-500" />;
    }
    
    // Default icon based on what's in the transaction
    return tx.icon === "building" ? (
      <Building2 className="h-6 w-6 text-purple-500" />
    ) : (
      <Users className="h-6 w-6 text-indigo-500" />
    );
  };
  
  const typeDescription = getTypeDescription(tx);

  // Get the appropriate link URL based on transaction type and persona
  const getLinkUrl = () => {
    if (personaType === 'company') {
      if (tx.type === "donations") {
        return `/organizations/${tx.id}`;
      } else if (activeTab === "grants") {
        return `/nonprofit/projects/${tx.id}`;
      } else {
        return `/company/analytics`;
      }
    } else if (personaType === 'nonprofit') {
      if (tx.type === "donations") {
        return `/company/profile/${tx.id}`;
      } else if (activeTab === "grants") {
        return `/nonprofit/impact`;
      } else if (activeTab === "campaigns") {
        return `/nonprofit/projects/${tx.id}`;
      } else {
        return `/nonprofit/impact`;
      }
    } else {
      // Volunteer
      if (tx.type === "digitalcoins") {
        return `/missions/${tx.id}`;
      } else if (activeTab === "rewards") {
        return `/volunteer/dashboard`;
      } else {
        return `/organizations/${tx.id}`;
      }
    }
  };

  // Check if amount starts with '+' for styling
  const isPositiveAmount = typeof tx.amount === 'string' && tx.amount.startsWith("+");

  return (
    <tr className={cn(
      "border-b border-border/50",
      isLightMode 
        ? "hover:bg-gray-50 text-gray-700" 
        : "hover:bg-muted/50"
    )}>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10 bg-muted">
            <AvatarImage src={`https://api.dicebear.com/7.x/shapes/svg?seed=${tx.description}`} />
            <AvatarFallback>{renderIcon()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Link 
              to={getLinkUrl()} 
              className={cn(
                "text-sm font-medium hover:text-primary flex items-center gap-1 group",
                isLightMode ? "text-gray-900" : ""
              )}
            >
              {tx.description}
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <span className="text-xs text-muted-foreground">{typeDescription}</span>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className={`text-sm ${tx.status === "Received" ? "text-green-500" : "text-red-500"}`}>
          {tx.status}
        </span>
      </td>
      <td className={cn(
        "py-3 px-4",
        isLightMode ? "text-gray-900" : ""
      )}>
        <span className="text-sm text-muted-foreground">{tx.date}</span>
      </td>
      <td className="py-3 px-4">
        <span className={`text-sm font-medium ${isPositiveAmount ? "text-green-500" : "text-red-500"}`}>
          {tx.amount}
        </span>
      </td>
      <td className={cn(
        "py-3 px-4",
        isLightMode ? "text-gray-900" : ""
      )}>
        <span className="text-sm">{tx.balance}</span>
      </td>
    </tr>
  );
}
