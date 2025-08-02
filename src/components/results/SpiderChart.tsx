import { CareerAnchorResult } from '@/types/career';

interface SpiderChartProps {
  results: CareerAnchorResult[];
}

const SpiderChart = ({ results }: SpiderChartProps) => {
  return (
    <div className="w-full h-96 flex items-center justify-center bg-card/50 rounded-lg border border-border">
      <div className="text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8">
          {results.map((result, index) => (
            <div 
              key={result.anchor} 
              className="flex flex-col items-center p-4 bg-background rounded-lg border border-border hover:shadow-lg smooth-transition"
            >
              <div 
                className="w-6 h-6 rounded-full mb-2" 
                style={{ backgroundColor: result.color }}
              />
              <div className="text-sm font-semibold mb-1">{result.anchor}</div>
              <div className="text-xs text-muted-foreground mb-2 text-center">{result.name}</div>
              <div className="text-lg font-bold text-primary">{result.score.toFixed(1)}</div>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          גרף עכביש אינטראקטיבי - תצוגה פשוטה
        </p>
      </div>
    </div>
  );
};

export default SpiderChart;