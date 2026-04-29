
import { useState } from "react";
import { SearchInput } from "@/components/shared/SearchInput";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import { BadgesListDialog } from "./BadgesListDialog";

interface LeaderboardHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function LeaderboardHeader({
  searchQuery,
  setSearchQuery
}: LeaderboardHeaderProps) {
  const { t } = useTranslation();
  const [badgesDialogOpen, setBadgesDialogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="w-full h-48 bg-gradient-to-r from-green-900 to-emerald-700 rounded-lg overflow-hidden relative">
        <img
          src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=3000"
          alt="Team of volunteers working together"
          className="w-full h-full object-cover opacity-50"
        />
        <Button 
          className="absolute top-4 right-4 bg-emerald-700/80 hover:bg-emerald-700 text-white"
          size="sm"
          onClick={() => setBadgesDialogOpen(true)}
        >
          <Award className="mr-2 h-4 w-4" />
          {t("Badges list")}
        </Button>
      </div>

      <BadgesListDialog 
        open={badgesDialogOpen} 
        onOpenChange={setBadgesDialogOpen} 
      />
    </div>
  );
}
