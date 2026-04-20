
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function NonprofitDemoButton() {
  return (
    <div className="my-6 text-center">
      <Button asChild className="bg-green-600 hover:bg-green-700">
        <Link to="/nonprofit/dashboard" className="flex items-center gap-2">
          Try Nonprofit Dashboard Demo <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
