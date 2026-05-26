import { CareerAnchorResult } from '@/types/career';

interface SpiderChartProps {
  results: CareerAnchorResult[];
}

const SpiderChart = ({ results }: SpiderChartProps) => {
  return (
    <div className="w-full bg-card/50 rounded-lg border border-border overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-6">
        {results.map((result, index) => (
          <div 
            key={result.anchor} 
            className="flex flex-col items-center p-3 bg-background rounded-lg border border-border hover:shadow-lg smooth-transition"
          >
            <div 
              className="w-5 h-5 rounded-full mb-2" 
              style={{ backgroundColor: result.color }}
            />
            <div className="text-xs font-semibold mb-1 text-center">{result.anchor}</div>
            <div className="text-xs text-muted-foreground mb-2 text-center leading-tight">{result.name}</div>
            <div className="text-sm font-bold text-primary">{result.score.toFixed(1)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpiderChart;