interface ScoreStatsProps {
  passEarned: number;
  level: string;
}

export function ScoreStats({ passEarned, level }: ScoreStatsProps) {
  return (
    <div>
      <div className="text-sm text-gray-600 dark:text-gray-400">$PASS Earned</div>
      <div className="text-3xl font-bold mt-1">${passEarned.toLocaleString()}</div>
      <div className="text-sm text-coompass-success mt-1">{level}</div>
    </div>
  );
}