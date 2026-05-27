import { supabase } from '@/integrations/supabase/client';

const VISITOR_STORAGE_KEY = 'external-referral-visitor-id';
const TRACKED_STORAGE_KEY = 'external-referral-tracked';

const generateVisitorId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const getVisitorId = (): string => {
  const existing = localStorage.getItem(VISITOR_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const id = generateVisitorId();
  localStorage.setItem(VISITOR_STORAGE_KEY, id);
  return id;
};

const isExternalReferrer = (referrer: string): boolean => {
  if (!referrer) return false;

  try {
    const referrerHost = new URL(referrer).hostname;
    return referrerHost !== window.location.hostname;
  } catch {
    return false;
  }
};

export const trackExternalReferralEntry = async (): Promise<void> => {
  if (localStorage.getItem(TRACKED_STORAGE_KEY) === 'true') {
    return;
  }

  const referrer = document.referrer;
  if (!isExternalReferrer(referrer)) {
    return;
  }

  const visitorId = getVisitorId();
  const referrerHost = new URL(referrer).hostname;

  const { error } = await supabase.from('external_referral_entries').insert({
    visitor_id: visitorId,
    referrer_url: referrer,
    referrer_host: referrerHost,
    landing_path: window.location.pathname + window.location.hash,
  });

  if (!error) {
    localStorage.setItem(TRACKED_STORAGE_KEY, 'true');
  }
};
