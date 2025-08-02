import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RatingButtonProps {
  value: number;
  selected: boolean;
  onClick: (value: number) => void;
}

const RatingButton = ({ value, selected, onClick }: RatingButtonProps) => {
  return (
    <Button
      variant={selected ? "rating-active" : "rating"}
      size="lg"
      className={cn(
        "w-12 h-12 text-base font-semibold rounded-lg",
        selected && "scale-110 shadow-lg"
      )}
      onClick={() => onClick(value)}
    >
      {value}
    </Button>
  );
};

export default RatingButton;