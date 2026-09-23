/**
 * Site-wide currency — every price shown to customers is in Saudi Riyal
 * (SAR). There is no admin toggle; this is fixed.
 */

export type CurrencyCode = 'SAR';

const RATE = 0.045; // base amount (as authored in the data files) -> SAR

export function getCurrency(): CurrencyCode {
  return 'SAR';
}

/** Format a single base amount as Saudi Riyal. */
export function formatPrice(baseAmount: number): string {
  const sar = baseAmount * RATE;
  const rounded = sar < 100 ? Math.round(sar * 100) / 100 : Math.round(sar);
  return `${rounded.toLocaleString('en-SA', { maximumFractionDigits: 2 })} SAR`;
}

/**
 * Converts any already-formatted "₹349 - ₹1,850" / "₹299-₹349" style string
 * (as authored in the data files) into Saudi Riyal, without having to touch
 * the data files themselves.
 */
export function convertPriceText(text: string): string {
  return text.replace(/₹\s?([\d,]+)/g, (_match, digits) => {
    const amount = parseInt(digits.replace(/,/g, ''), 10);
    if (Number.isNaN(amount)) return _match;
    return formatPrice(amount);
  });
}
