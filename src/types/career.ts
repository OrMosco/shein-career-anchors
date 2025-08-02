export type CareerAnchor = 'TF' | 'GM' | 'AU' | 'SE' | 'EC' | 'SV' | 'CH' | 'LS';

export interface Question {
  number: number;
  text: string;
  anchor: CareerAnchor;
}

export interface Answer {
  questionNumber: number;
  rating: number;
}

export interface CareerAnchorResult {
  anchor: CareerAnchor;
  name: string;
  score: number;
  description: string;
  careers: string[];
  color: string;
}

export interface QuestionnaireState {
  currentQuestion: number;
  answers: Answer[];
  isComplete: boolean;
}

export const CAREER_ANCHORS_INFO: Record<CareerAnchor, Omit<CareerAnchorResult, 'score'>> = {
  TF: {
    anchor: 'TF',
    name: 'יכולת מקצועית',
    description: 'אתה שואף להיות מומחה בתחומך ולפתח מומחיות עמוקה',
    careers: ['מהנדס בכיר', 'חוקר', 'מומחה טכני', 'יועץ מקצועי'],
    color: 'hsl(var(--tf-color))'
  },
  GM: {
    anchor: 'GM',
    name: 'ניהול כללי',
    description: 'אתה רוצה לנהל ארגונים ולהוביל צוותים גדולים',
    careers: ['מנכ"ל', 'מנהל בכיר', 'מנהל פרויקטים', 'מנהל אזור'],
    color: 'hsl(var(--gm-color))'
  },
  AU: {
    anchor: 'AU',
    name: 'עצמאות',
    description: 'אתה זקוק לחופש פעולה ועצמאות בעבודה',
    careers: ['עצמאי', 'יועץ', 'עבודה מרחוק', 'פרילנסר'],
    color: 'hsl(var(--au-color))'
  },
  SE: {
    anchor: 'SE',
    name: 'ביטחון',
    description: 'אתה מחפש יציבות ובטחון תעסוקתי לאורך זמן',
    careers: ['עובד מדינה', 'בנקאי', 'מורה', 'עובד בחברה גדולה'],
    color: 'hsl(var(--se-color))'
  },
  EC: {
    anchor: 'EC',
    name: 'יזמות',
    description: 'אתה רוצה ליצור ולבנות משהו חדש משלך',
    careers: ['יזם', 'בעל עסק', 'סטארט-אפ', 'מנהל מוצר'],
    color: 'hsl(var(--ec-color))'
  },
  SV: {
    anchor: 'SV',
    name: 'שליחות',
    description: 'אתה רוצה לתרום לחברה ולעזור לאנשים',
    careers: ['עובד סוציאלי', 'מורה', 'רופא', 'עובד במלכ"ר'],
    color: 'hsl(var(--sv-color))'
  },
  CH: {
    anchor: 'CH',
    name: 'אתגר אישי',
    description: 'אתה מחפש אתגרים קשים ובעיות מורכבות לפתור',
    careers: ['יועץ אסטרטגי', 'מנתח פיננסי', 'פותר בעיות', 'חוקר'],
    color: 'hsl(var(--ch-color))'
  },
  LS: {
    anchor: 'LS',
    name: 'אורח חיים',
    description: 'אתה רוצה לשלב בהרמוניה בין עבודה לחיים האישיים',
    careers: ['עבודה חלקית', 'עבודה גמישה', 'עבודה מרחוק', 'משרה מותאמת'],
    color: 'hsl(var(--ls-color))'
  }
};