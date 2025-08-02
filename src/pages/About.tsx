import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, ArrowRight, BookOpen, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
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
            <Button variant="ghost">חזרה לדף הבית</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-right">
          <h1 className="text-4xl font-bold mb-8 text-center">
            על המחקר ועוגני הקריירה
          </h1>

          {/* Research Background */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-end">
                <BookOpen className="h-6 w-6 text-primary" />
                <span>המחקר המקורי</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed">
                המחקר המקורי של אדגר שיין משנות ה־70 זיהה חמישה מבנים עיקריים שעליהם מבוססים עוגני קריירה. 
                בעקבות מחקרים נוספים בשנות ה־80, המודל הורחב לשמונה עוגנים.
              </p>
              <p className="leading-relaxed">
                שיין זיהה שעוגני קריירה הם כמו מצפן פנימי – תבניות מוטיבציוניות עמוקות שמניעות אותנו לבחור 
                סביבת עבודה אחת על פני אחרת. ההנחה היא שלכל אחד מאיתנו יש עוגן מרכזי (או שניים דומיננטיים) 
                שמכתיבים את הדרך שבה נרגיש מסופקים, משמעותיים ומחוברים בעבודה.
              </p>
            </CardContent>
          </Card>

          {/* Who is it for */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-right">למי זה מתאים?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center gap-3 justify-end">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>אם את/ה בתחילת הדרך המקצועית שלך</span>
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>אם את/ה מתלבט/ת לגבי שינוי קריירה</span>
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>אם את/ה מרגיש/ה חוסר סיפוק מהעבודה הנוכחית</span>
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>או אם את/ה פשוט סקרן/ית לגלות מה באמת מניע אותך</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How it works */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-right">איך זה עובד?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4 justify-end">
                  <div className="text-right">
                    <h4 className="font-semibold mb-1">תמלא/י שאלון קצר ואנונימי</h4>
                    <p className="text-muted-foreground">40 שאלות בלבד</p>
                  </div>
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                    1
                  </div>
                </div>

                <div className="flex items-start gap-4 justify-end">
                  <div className="text-right">
                    <h4 className="font-semibold mb-1">תראה/י תוצאות בגרף עכביש אינטראקטיבי</h4>
                    <p className="text-muted-foreground">ויזואליזציה ברורה של העוגנים שלך</p>
                  </div>
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                    2
                  </div>
                </div>

                <div className="flex items-start gap-4 justify-end">
                  <div className="text-right">
                    <h4 className="font-semibold mb-1">תקבל/י הסבר אישי</h4>
                    <p className="text-muted-foreground">על העוגנים הדומיננטיים שלך</p>
                  </div>
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                    3
                  </div>
                </div>

                <div className="flex items-start gap-4 justify-end">
                  <div className="text-right">
                    <h4 className="font-semibold mb-1">תוכל/י לקרוא סיכום ברור</h4>
                    <p className="text-muted-foreground">עם תובנות פרקטיות לקריירה שלך</p>
                  </div>
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                    4
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Link to="/questionnaire">
              <Button variant="hero" size="lg" className="text-lg px-12 py-6 h-auto">
                <span>התחל את השאלון</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;