import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { QUESTIONS } from '@/data/questions';
import { Answer, QuestionnaireState } from '@/types/career';
import RatingButton from '@/components/questionnaire/RatingButton';
import ProgressBar from '@/components/questionnaire/ProgressBar';

const Questionnaire = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<QuestionnaireState>({
    currentQuestion: 0,
    answers: [],
    isComplete: false
  });

  useEffect(() => {
    // Load saved state from localStorage
    const saved = localStorage.getItem('questionnaire-state');
    if (saved) {
      setState(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Save state to localStorage
    localStorage.setItem('questionnaire-state', JSON.stringify(state));
  }, [state]);

  const currentQuestion = QUESTIONS[state.currentQuestion];
  const currentAnswer = state.answers.find(a => a.questionNumber === currentQuestion.number);

  const handleRating = (rating: number) => {
    const newAnswers = state.answers.filter(a => a.questionNumber !== currentQuestion.number);
    newAnswers.push({
      questionNumber: currentQuestion.number,
      rating
    });

    setState(prev => ({
      ...prev,
      answers: newAnswers
    }));
  };

  const handleNext = () => {
    if (state.currentQuestion < QUESTIONS.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    } else {
      // Complete questionnaire and navigate to results
      setState(prev => ({ ...prev, isComplete: true }));
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (state.currentQuestion > 0) {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    }
  };

  const canProceed = currentAnswer && currentAnswer.rating > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold">עוגני קריירה</h1>
          </Link>
          <Link to="/">
            <Button variant="ghost">יציאה</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <ProgressBar 
            current={state.currentQuestion + 1} 
            total={QUESTIONS.length} 
          />

          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-lg">
                שאלה {currentQuestion.number}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center">
                <p className="text-lg leading-relaxed text-right">
                  {currentQuestion.text}
                </p>
              </div>

              {/* Rating Scale */}
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>מסכים מאוד</span>
                  <span>לא מסכים בכלל</span>
                </div>
                
                <div className="flex justify-center gap-3">
                  {[6, 5, 4, 3, 2, 1].map((rating) => (
                    <RatingButton
                      key={rating}
                      value={rating}
                      selected={currentAnswer?.rating === rating}
                      onClick={handleRating}
                    />
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={state.currentQuestion === 0}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  הקודם
                </Button>

                <Button
                  variant="default"
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="flex items-center gap-2"
                >
                  {state.currentQuestion === QUESTIONS.length - 1 ? 'סיום' : 'הבא'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Questionnaire;