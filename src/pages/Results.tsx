import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, RotateCcw, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Answer, CareerAnchorResult } from '@/types/career';
import { calculateResults, getTopAnchors, validateAnswers } from '@/utils/resultsCalculator';
import SpiderChart from '@/components/results/SpiderChart';
import ResultsTable from '@/components/results/ResultsTable';

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<CareerAnchorResult[]>([]);
  const [topAnchors, setTopAnchors] = useState<CareerAnchorResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load questionnaire state from localStorage
    const savedState = localStorage.getItem('questionnaire-state');
    
    if (!savedState) {
      navigate('/');
      return;
    }

    const state = JSON.parse(savedState);
    const answers: Answer[] = state.answers;

    if (!validateAnswers(answers)) {
      navigate('/questionnaire');
      return;
    }

    // Calculate results
    const calculatedResults = calculateResults(answers);
    const top = getTopAnchors(calculatedResults, 2);

    setResults(calculatedResults);
    setTopAnchors(top);
    setIsLoading(false);
  }, [navigate]);

  const handleRestart = () => {
    localStorage.removeItem('questionnaire-state');
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p>מחשב את התוצאות...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold">עוגני קריירה</h1>
          </Link>
          <Button variant="outline" onClick={handleRestart}>
            <RotateCcw className="h-4 w-4 ml-2" />
            התחל מחדש
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Results Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">התוצאות שלך</h1>
            <p className="text-lg text-muted-foreground">
              עוגני הקריירה הדומיננטיים שלך מבוססים על התשובות שלך ל-40 השאלות
            </p>
          </div>

          {/* Top Anchors Summary */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-center text-2xl">העוגנים הדומיננטיים שלך</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {topAnchors.map((anchor, index) => (
                  <div key={anchor.anchor} className="text-center p-6 bg-background rounded-lg border border-border">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <h3 className="text-xl font-bold">{anchor.name}</h3>
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: anchor.color }}
                      />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {anchor.score.toFixed(1)}
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {anchor.description}
                    </p>
                    <div className="text-sm">
                      <p className="font-semibold mb-2">קריירות מתאימות:</p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {anchor.careers.map((career, i) => (
                          <span key={i} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                            {career}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Spider Chart */}
          <Card>
            <CardContent>
              <SpiderChart results={results} />
            </CardContent>
          </Card>


          {/* Insights and Recommendations */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-center">תובנות והמלצות</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-right">
                <h4 className="font-semibold mb-2">מה זה אומר עליך?</h4>
                <p className="text-muted-foreground leading-relaxed">
                  העוגנים הדומיננטיים שלך מצביעים על הערכים והמאפיינים הכי חשובים לך בעבודה. 
                  זה המצפן הפנימי שלך שמנחה אותך בבחירות קריירה. השתמש בתובנות האלה כדי להעריך 
                  הזדמנויות עבודה חדשות ולוודא שהן מתאימות למה שבאמת מניע אותך.
                </p>
              </div>
              
              <div className="text-right">
                <h4 className="font-semibold mb-2">השלבים הבאים:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• חקור את הקריירות המוצעות לעוגנים הדומיננטיים שלך</li>
                  <li>• השתמש בתובנות האלה בריאיונות עבודה ובשיחות קריירה</li>
                  <li>• הערך את העבודה הנוכחית שלך לאור העוגנים שלך</li>
                  <li>• שקול הכשרה או פיתוח בתחומים המתאימים לעוגנים שלך</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" onClick={handleRestart}>
              עשה את השאלון שוב
            </Button>
            <Button onClick={() => navigate('/chat')}>
              <MessageCircle className="h-4 w-4 ml-2" />
              דבר איתנו על הצעד הבא
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;