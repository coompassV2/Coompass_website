
import { Progress } from "@/components/ui/progress";

interface ScoreProgressProps {
  percentage: number;
}

export function ScoreProgress({ percentage }: ScoreProgressProps) {
  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#0EA5E9"
          strokeWidth="3"
          strokeDasharray={`${percentage}, 100`}
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{percentage}%</span>
      </div>
    </div>
  );
}
