import { formatPrice as formatPriceRaw, convertPriceText as convertPriceTextRaw } from '../utils/currencySettings';

/**
 * Returns two helpers, both fixed to Saudi Riyal (SAR):
 * - formatPrice(baseAmount): format a plain base number as SAR
 * - convertPriceText("₹349 - ₹1,850"): convert an already-formatted string
 */
export function useCurrency() {
  return {
    currency: 'SAR' as const,
    formatPrice: (baseAmount: number) => formatPriceRaw(baseAmount),
    convertPriceText: (text: string) => convertPriceTextRaw(text)
  };
}
