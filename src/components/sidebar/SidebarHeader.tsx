import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

interface SidebarHeaderProps {
  isCollapsed: boolean;
}

export function SidebarHeader({ isCollapsed }: SidebarHeaderProps) {
  const { theme } = useTheme();
  const logoSrc =
    theme === "dark"
      ? "/logos/brisa_voluntariado_rgb_branco.png"
      : "/logos/brisa_voluntariado_rgb_preto.png";
  const impactLogoSrc =
    theme === "dark" ? "/logos/Impact+dark.png" : "/logos/Impact+light.png";

  return (
    <div className={cn("p-6", isCollapsed && "px-4")}>
      <img
        src={logoSrc}
        alt="Grupo Brisa"
        className={
          isCollapsed
            ? "h-14 w-14 object-contain"
            : "h-40 w-full object-contain object-center"
        }
      />
      {!isCollapsed && (
        <img
          src={impactLogoSrc}
          alt="Impact Hub"
          className="mt-2 h-10 w-full object-contain object-center"
        />
      )}
    </div>
  );
}
