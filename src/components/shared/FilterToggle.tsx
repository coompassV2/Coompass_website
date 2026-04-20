
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface FilterToggleProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  labelClassName?: string;
}

export function FilterToggle({
  id,
  label,
  checked,
  onCheckedChange,
  labelClassName
}: FilterToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="data-[state=checked]:bg-green-500"
      />
      <Label htmlFor={id} className={labelClassName ?? "text-sm font-medium"}>
        {label}
      </Label>
    </div>
  );
}
