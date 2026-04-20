
import { HeaderActions } from "@/components/shared/HeaderActions";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  theme: "light" | "dark";
  toggleTheme: () => void;
  /** When true, shows a skeleton instead of the title */
  loading?: boolean;
}

function PageHeaderComponent({ title, subtitle, theme, toggleTheme, loading }: PageHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <header className={cn(
      "flex flex-col md:flex-row md:items-center justify-between gap-4",
      isMobile ? "mt-16" : "mb-8"
    )}>
      <div>
        {loading ? (
          <Skeleton className="h-8 w-48" aria-hidden />
        ) : (
          <h1 className="text-2xl font-semibold">{title}</h1>
        )}
        {subtitle != null && !loading && <div className="text-muted-foreground mt-1">{subtitle}</div>}
      </div>
      <HeaderActions theme={theme} toggleTheme={toggleTheme} />
    </header>
  );
}

export const PageHeader = memo(PageHeaderComponent);
