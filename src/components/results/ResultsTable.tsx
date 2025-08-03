import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CareerAnchorResult } from '@/types/career';

interface ResultsTableProps {
  results: CareerAnchorResult[];
}

const ResultsTable = ({ results }: ResultsTableProps) => {
  return (
    <div className="w-full overflow-auto">
      <Table className="text-right">
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">עוגן קריירה</TableHead>
            <TableHead className="text-right">ציון ממוצע</TableHead>
            <TableHead className="text-right">הסבר</TableHead>
            <TableHead className="text-right">קריירות מתאימות</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={result.anchor} className={index < 2 ? 'bg-primary/5' : ''}>
              <TableCell>
                <div className="flex items-center gap-2 justify-end">
                  <span className="font-semibold">{result.name}</span>
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: result.color }}
                  />
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={index < 2 ? "default" : "secondary"} className="text-lg px-3 py-1">
                  {result.score.toFixed(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {result.description}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1 justify-end">
                  {result.careers.slice(0, 3).map((career, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {career}
                    </Badge>
                  ))}
                  {result.careers.length > 3 && (
                    <Badge variant="outline" className="text-xs opacity-60">
                      +{result.careers.length - 3}
                    </Badge>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultsTable;