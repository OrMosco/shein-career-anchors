import { supabase } from '@/integrations/supabase/client';

const VISITOR_STORAGE_KEY = 'external-referral-visitor-id';

const generateVisitorId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const randomNibble = Math.floor(Math.random() * 16);
    const nibble = char === 'x' ? randomNibble : (randomNibble & 0x3) | 0x8;
    return nibble.toString(16);
  });
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

const getExternalReferrerHost = (referrer: string): string | null => {
  if (!referrer) return null;

  try {
    const referrerHost = new URL(referrer).hostname;
    if (referrerHost === window.location.hostname) {
      return null;
    }

    return referrerHost;
  } catch {
    return null;
  }
};

export const trackExternalReferralEntry = async (): Promise<void> => {
  const referrer = document.referrer;
  const referrerHost = getExternalReferrerHost(referrer);
  if (!referrerHost) {
    return;
  }

  const visitorId = getVisitorId();

  const { error } = await supabase.from('external_referral_entries').upsert(
    {
      visitor_id: visitorId,
      referrer_url: referrer,
      referrer_host: referrerHost,
      landing_path: window.location.pathname,
    },
    { onConflict: 'visitor_id', ignoreDuplicates: true },
  );

  if (error) {
    throw error;
  }
};
