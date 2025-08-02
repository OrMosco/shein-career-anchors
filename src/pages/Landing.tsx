import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Target, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold">עוגני קריירה</h1>
          </div>
          <Link to="/about">
            <Button variant="ghost">עוד מידע</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            עוגני הקריירה של שיין
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            אבחון הגורמים שמניעים אותנו בבחירת קריירה
          </p>
          
          <div className="mb-12">
            <Link to="/questionnaire">
              <Button variant="hero" size="lg" className="text-lg px-12 py-6 h-auto">
                התחל את השאלון
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-card/50 border-border hover:bg-card/80 smooth-transition">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">זיהוי מדויק</h3>
                <p className="text-muted-foreground">
                  40 שאלות מדויקות לזיהוי העוגנים הדומיננטיים שלך
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border hover:bg-card/80 smooth-transition">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">תובנות מעמיקות</h3>
                <p className="text-muted-foreground">
                  קבל הסבר מפורט על המניעים שלך והכיוון המתאים
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border hover:bg-card/80 smooth-transition">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">מבוסס מחקר</h3>
                <p className="text-muted-foreground">
                  המודל של אדגר שיין - מחקר מוכח של עשרות שנים
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Who is it for */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8">למי זה מתאים?</h2>
            <div className="grid md:grid-cols-2 gap-8 text-right">
              <div className="space-y-4">
                <div className="flex items-center gap-3 justify-end">
                  <span>אם את/ה בתחילת הדרך המקצועית שלך</span>
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <span>אם את/ה מתלבט/ת לגבי שינוי קריירה</span>
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 justify-end">
                  <span>אם את/ה מרגיש/ה חוסר סיפוק מהעבודה הנוכחית</span>
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <span>או אם את/ה פשוט סקרן/ית לגלות מה באמת מניע אותך</span>
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <Link to="/questionnaire">
              <Button variant="outline" size="lg">
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