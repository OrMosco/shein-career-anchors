// @ts-nocheck
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages, resultsContext } = await req.json();

    const systemPrompt = `אתה מאמן קריירה אישי, חם, אמפתי ומקצועי, שמדבר עברית.
המשתמש זה עתה סיים שאלון עוגני קריירה (Schein) וקיבל את התוצאות הבאות:

${resultsContext}

המטרה שלך:
- לעזור למשתמש להבין מה התוצאות אומרות עליו.
- לעזור לו לחשוב על הצעד הבא בקריירה: כיוונים, התלבטויות, אפשרויות מעשיות.
- לשאול שאלות מעמיקות אחת בכל פעם, ולא להציף.
- לתת תשובות קצרות, ממוקדות וברורות (2-5 משפטים בדרך כלל).
- להתבסס על העוגנים הדומיננטיים שלו ועל החולשות.
- אם המשתמש שואל משהו לא קשור - תחזיר אותו בעדינות לשיחה על הקריירה שלו.`;

    const fullMessages = [
      { role: "system", content: systemPrompt },
      ...messages,
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: fullMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "חרגנו ממכסת הבקשות, נסה שוב בעוד רגע." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "נגמרו הקרדיטים, נא להוסיף קרדיטים לסביבת העבודה." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: errText }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
