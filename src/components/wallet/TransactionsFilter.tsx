
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TransactionsFilterProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export function TransactionsFilter({ activeFilter, setActiveFilter }: TransactionsFilterProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="ghost" 
        size="sm"
        className={cn(
          activeFilter === "all" && "bg-coompass-success/20 text-coompass-success"
        )}
        onClick={() => setActiveFilter("all")}
      >
        All transactions
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        className={cn(
          activeFilter === "received" && "bg-coompass-success/20 text-coompass-success"
        )}
        onClick={() => setActiveFilter("received")}
      >
        Received
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        className={cn(
          activeFilter === "spent" && "bg-coompass-success/20 text-coompass-success"
        )}
        onClick={() => setActiveFilter("spent")}
      >
        Spent
      </Button>
    </div>
  );
}
