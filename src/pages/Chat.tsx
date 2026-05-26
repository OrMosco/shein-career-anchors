import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Brain, Send, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Answer, CareerAnchorResult } from '@/types/career';
import { calculateResults, getTopAnchors, validateAnswers } from '@/utils/resultsCalculator';
import { toast } from 'sonner';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const buildResultsContext = (results: CareerAnchorResult[]): string => {
  const sorted = [...results].sort((a, b) => b.score - a.score);
  const lines = sorted.map((r, i) => `${i + 1}. ${r.name} — ציון ${r.score.toFixed(1)} — ${r.description}`);
  return lines.join('\n');
};

const Chat = () => {
  const navigate = useNavigate();
  const [resultsContext, setResultsContext] = useState<string>('');
  const [topAnchors, setTopAnchors] = useState<CareerAnchorResult[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('questionnaire-state');
    if (!saved) {
      navigate('/');
      return;
    }
    const state = JSON.parse(saved);
    const answers: Answer[] = state.answers;
    if (!validateAnswers(answers)) {
      navigate('/questionnaire');
      return;
    }
    const results = calculateResults(answers);
    const top = getTopAnchors(results, 2);
    setTopAnchors(top);
    setResultsContext(buildResultsContext(results));

    setMessages([
      {
        role: 'assistant',
        content: `היי! ראיתי את תוצאות השאלון שלך. העוגנים הדומיננטיים אצלך הם **${top[0]?.name}** ו-**${top[1]?.name}**. אשמח לעזור לך לחשוב על הצעד הבא בקריירה. במה נתחיל — יש לך התלבטות ספציפית, או שנפתח בלהבין מה התוצאות האלה אומרות עליך?`,
      },
    ]);
  }, [navigate]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [isStreaming]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages([...newMessages, { role: 'assistant', content: '' }]);
    setInput('');
    setIsStreaming(true);

    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const url = `https://${projectId}.supabase.co/functions/v1/chat-coach`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, resultsContext }),
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: 'שגיאה לא ידועה' }));
        toast.error(err.error || 'שגיאה בשליחת ההודעה');
        setMessages(newMessages);
        setIsStreaming(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let assistantText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const data = trimmed.slice(5).trim();
          if (data === '[DONE]') continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              assistantText += delta;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: 'assistant', content: assistantText };
                return copy;
              });
            }
          } catch {
            // ignore parse errors on partial chunks
          }
        }
      }
    } catch (e) {
      toast.error('שגיאה בחיבור');
      setMessages(newMessages);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold">עוגני קריירה</h1>
          </Link>
          <Button variant="outline" onClick={() => navigate('/results')}>
            <ArrowRight className="h-4 w-4 ml-2" />
            חזרה לתוצאות
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 max-w-3xl flex flex-col">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">שיחה עם המאמן</h2>
          {topAnchors.length > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              מבוסס על העוגנים שלך: {topAnchors.map((a) => a.name).join(' • ')}
            </p>
          )}
        </div>

        <Card className="flex-1 flex flex-col overflow-hidden mb-4">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[50vh] max-h-[60vh]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 whitespace-pre-wrap leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {msg.content || (isStreaming && i === messages.length - 1 ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null)}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex gap-2 items-end">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="כתוב הודעה..."
            className="flex-1 resize-none min-h-[48px] max-h-32"
            rows={1}
            disabled={isStreaming}
          />
          <Button onClick={handleSend} disabled={isStreaming || !input.trim()} size="icon" className="h-12 w-12 shrink-0">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Chat;
