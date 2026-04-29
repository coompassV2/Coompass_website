
import { PageHeader } from "@/components/PageHeader";

interface WalletHeaderProps {
  title: string;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export function WalletHeader({ title, theme, toggleTheme }: WalletHeaderProps) {
  return (
    <PageHeader title={title} theme={theme} toggleTheme={toggleTheme} />
  );
}
