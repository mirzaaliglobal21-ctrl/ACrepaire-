/**
 * Shared currency settings — lets the admin switch every price on the site
 * between Indian Rupees (₹) and UAE Dirham (AED / Dhs).
 * Only the admin can change this — see AdminControlPanel.tsx.
 */

export type CurrencyCode = 'INR' | 'AED';

const STORAGE_KEY = 'coolclean_currency';
const DEFAULT_CURRENCY: CurrencyCode = 'INR';

// Approximate INR -> AED rate. All prices in the data files are authored in
// INR; when the admin switches to Dirham we convert on the fly using this.
const INR_TO_AED_RATE = 0.044;

export const CURRENCY_EVENT = 'coolclean:currency-changed';

export function getCurrency(): CurrencyCode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'AED' ? 'AED' : DEFAULT_CURRENCY;
  } catch {
    return DEFAULT_CURRENCY;
  }
}

export function setCurrency(currency: CurrencyCode): void {
  try {
    localStorage.setItem(STORAGE_KEY, currency);
  } catch {
    // ignore — event still fires for this session
  }
  window.dispatchEvent(new CustomEvent(CURRENCY_EVENT, { detail: currency }));
}

/** Format a single INR amount in whichever currency is currently active. */
export function formatPrice(amountInInr: number, currency: CurrencyCode = getCurrency()): string {
  if (currency === 'AED') {
    const aed = amountInInr * INR_TO_AED_RATE;
    const rounded = aed < 100 ? Math.round(aed * 100) / 100 : Math.round(aed);
    return `Dhs ${rounded.toLocaleString('en-AE', { maximumFractionDigits: 2 })}`;
  }
  return `₹${amountInInr.toLocaleString('en-IN')}`;
}

/**
 * Converts any already-formatted "₹349 - ₹1,850" / "₹299-₹349" style string
 * (as authored in the data files) into the active currency, without having
 * to touch the data files themselves.
 */
export function convertPriceText(text: string, currency: CurrencyCode = getCurrency()): string {
  if (currency !== 'AED') return text;
  return text.replace(/₹\s?([\d,]+)/g, (_match, digits) => {
    const amount = parseInt(digits.replace(/,/g, ''), 10);
    if (Number.isNaN(amount)) return _match;
    return formatPrice(amount, 'AED');
  });
}
