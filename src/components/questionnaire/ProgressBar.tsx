import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">
          {current} מתוך {total}
        </span>
        <span className="text-sm font-medium">
          {Math.round(percentage)}%
        </span>
      </div>
      <Progress value={percentage} className="h-3 rounded-full" />
    </div>
  );
};

export default ProgressBar;