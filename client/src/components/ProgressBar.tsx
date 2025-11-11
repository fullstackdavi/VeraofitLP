import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  completedDays: number;
  totalDays: number;
}

export default function ProgressBar({ completedDays, totalDays }: ProgressBarProps) {
  const percentage = (completedDays / totalDays) * 100;
  
  return (
    <div className="sticky top-0 z-50 py-4 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-foreground">
            Seu Progresso
          </h3>
          <span className="text-base font-bold text-primary" data-testid="text-progress">
            {completedDays}/{totalDays} dias completos
          </span>
        </div>
        <Progress value={percentage} className="h-4" data-testid="progress-bar" />
        <p className="text-sm font-semibold text-foreground mt-3 text-center">
          {percentage.toFixed(0)}% concluído
        </p>
      </div>
    </div>
  );
}
