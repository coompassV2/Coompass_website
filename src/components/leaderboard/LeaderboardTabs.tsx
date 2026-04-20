
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchInput } from "@/components/shared/SearchInput";
import { useTranslation } from "react-i18next";

interface LeaderboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function LeaderboardTabs({ 
  activeTab, 
  onTabChange,
  searchQuery,
  setSearchQuery 
}: LeaderboardTabsProps) {
  const { t } = useTranslation();
  
  return (
    <div className="flex justify-between items-center mb-6 flex-col md:flex-row gap-4">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="bg-background/10 backdrop-blur-sm border border-border">
          <TabsTrigger 
            value="global" 
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            {t("Global")}
          </TabsTrigger>
          <TabsTrigger 
            value="company" 
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            {t("Company")}
          </TabsTrigger>
          <TabsTrigger 
            value="organization" 
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            {t("Organization")}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <SearchInput
        placeholder={t("Search volunteers...")}
        value={searchQuery}
        onChange={setSearchQuery}
      />
    </div>
  );
}
