
import { HeaderActions } from "@/components/shared/HeaderActions";
import { Badge } from "@/components/ui/badge";
import { getCurrentPersona } from "@/components/app-sidebar/SidebarMenuConfig";

interface ChatHeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ theme, toggleTheme }) => {
  const currentPersona = getCurrentPersona();
  const isOrganization = currentPersona === "organization";
  
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold">
          {isOrganization ? "AI Mission Builder" : "Ask AI"}
        </h1>
      </div>
      <HeaderActions theme={theme} toggleTheme={toggleTheme} />
    </header>
  );
};
