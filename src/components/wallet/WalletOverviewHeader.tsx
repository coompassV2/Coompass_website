
interface WalletOverviewHeaderProps {
  title: string;
  value: string;
}

export function WalletOverviewHeader({ title, value }: WalletOverviewHeaderProps) {
  return (
    <>
      <div className="text-xl font-semibold">{title} Overview</div>
      <div className="text-xl md:text-2xl font-bold mb-6">{value}</div>
    </>
  );
}
