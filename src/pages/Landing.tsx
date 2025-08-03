import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Target, Users, TrendingUp, Anchor } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Landing = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(true);
  };

  return (
    <div className="min-h-screen bg-transparent font-alef">
      {/* Header */}
      <header className="bg-transparent border-b border-border/30">
        <div className="container mx-auto px-6 py-6 flex justify-end items-center">
          <Link to="/about">
            <Anchor className="h-8 w-8 text-primary" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-32 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-foreground leading-tight">
            עוגני הקריירה של שיין
          </h1>
          <p className="text-2xl text-muted-foreground mb-16 leading-relaxed font-light">
            אבחון הגורמים שמניעים אותנו בבחירת קריירה
          </p>
          
          <div className="mb-32">
            <Link to="/questionnaire">
              <Button 
                variant="outline" 
                size="default" 
                className="text-base px-8 py-3 h-12 w-48 rounded-xl bg-white text-primary border-primary hover:bg-primary hover:text-white transition-all duration-500 group flex items-center justify-center"
                onClick={handleButtonClick}
              >
                <span className="group-hover:hidden">התחל את השאלון</span>
                <Anchor className="h-6 w-6 hidden group-hover:block" />
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-24">
            <Card className="bg-card/80 border-border/30 hover:bg-card smooth-transition shadow-md">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <Target className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">זיהוי מדויק</h3>
                <p className="text-muted-foreground leading-relaxed">
                  40 שאלות מדויקות לזיהוי העוגנים הדומיננטיים שלך
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 border-border/30 hover:bg-card smooth-transition shadow-md">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <TrendingUp className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">תובנות מעמיקות</h3>
                <p className="text-muted-foreground leading-relaxed">
                  קבל הסבר מפורט על המניעים שלך והכיוון המתאים
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 border-border/30 hover:bg-card smooth-transition shadow-md">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">מבוסס מחקר</h3>
                <p className="text-muted-foreground leading-relaxed">
                  המודל של אדגר שיין - מחקר מוכח של עשרות שנים
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Who is it for - Hidden initially, shown on scroll */}
          <div className="mt-32 opacity-0 transform translate-y-8 animate-fade-in" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
            <h2 className="text-4xl font-bold mb-12 text-center text-foreground">למי זה מתאים?</h2>
            <div className="max-w-2xl mx-auto space-y-8 text-center">
              <div className="text-lg text-muted-foreground leading-relaxed">
                אם את/ה בתחילת הדרך המקצועית שלך
              </div>
              <div className="text-lg text-muted-foreground leading-relaxed">
                אם את/ה מתלבט/ת לגבי שינוי קריירה
              </div>
              <div className="text-lg text-muted-foreground leading-relaxed">
                אם את/ה מרגיש/ה חוסר סיפוק מהעבודה הנוכחית
              </div>
              <div className="text-lg text-muted-foreground leading-relaxed">
                או אם את/ה פשוט סקרן/ית לגלות מה באמת מניע אותך
              </div>
            </div>
          </div>

          <div className="mt-20 opacity-0 transform translate-y-8 animate-fade-in" style={{animationDelay: '1s', animationFillMode: 'forwards'}}>
            <Link to="/questionnaire">
              <Button variant="outline" size="lg" className="px-12 py-4 text-lg border-primary text-primary hover:bg-primary hover:text-white">
                בואו נתחיל
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;