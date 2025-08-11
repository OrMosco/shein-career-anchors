import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Target, Users, TrendingUp, Anchor } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Landing = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(true);
  };

  return (
    <div className="min-h-screen bg-background font-assistant">
      {/* Header */}
      <header className="bg-transparent border-b border-border/30">
        <div className="container mx-auto px-6 py-6 flex justify-end items-center">
          <Link to="/about">
            <Anchor className="h-8 w-8 text-primary" />
          </Link>
        </div>
      </header>

      {/* Minimal Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center pt-24">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            עוגני קריירה
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed px-4">
            אבחון הגורמים שמניעים אותנו בבחירת קריירה
          </p>
          
          <div className="pt-8 space-y-8">
            <div className="mx-auto w-full max-w-3xl">
              <AspectRatio ratio={16 / 9}>
                <img
                  src="/lovable-uploads/65f19491-dbfc-4de9-bb7b-d02a141cf177.png"
                  alt="איור עוגני קריירה – אבחון הגורמים שמניעים אותנו בבחירת קריירה"
                  loading="lazy"
                  className="h-full w-full object-cover rounded-2xl shadow-xl ring-1 ring-border/50"
                />
              </AspectRatio>
            </div>

            <Link to="/questionnaire">
              <Button 
                size="lg"
                className="px-12 py-4 text-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-full transition-all duration-300"
                onClick={handleButtonClick}
              >
                להתחיל שאלון
              </Button>
            </Link>
          </div>

          {/* Additional content sections - simplified */}
          <div className="pt-80 space-y-16">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-foreground">למי זה מתאים?</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>אם את/ה בתחילת הדרך המקצועית שלך</p>
                <p>אם את/ה מתלבט/ת לגבי שינוי קריירה</p>
                <p>אם את/ה מרגיש/ה חוסר סיפוק מהעבודה הנוכחית</p>
                <p>או אם את/ה פשוט סקרן/ית לגלות מה באמת מניע אותך</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <Target className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-xl font-semibold text-foreground">זיהוי מדויק</h3>
                <p className="text-muted-foreground">
                  40 שאלות מדויקות לזיהוי העוגנים הדומיננטיים שלך
                </p>
              </div>

              <div className="space-y-4">
                <TrendingUp className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-xl font-semibold text-foreground">תובנות מעמיקות</h3>
                <p className="text-muted-foreground">
                  קבל הסבר מפורט על המניעים שלך והכיוון המתאים
                </p>
              </div>

              <div className="space-y-4">
                <Users className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-xl font-semibold text-foreground">מבוסס מחקר</h3>
                <p className="text-muted-foreground">
                  המודל של אדגר שיין - מחקר מוכח של עשרות שנים
                </p>
              </div>
            </div>

            <div className="pt-8">
              <Link to="/questionnaire">
                <Button variant="outline" size="lg" className="px-12 py-4 text-lg">
                  בואו נתחיל
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;