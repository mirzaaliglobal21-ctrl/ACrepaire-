import { useEffect, useState } from 'react';
import {
  getCurrency,
  CurrencyCode,
  CURRENCY_EVENT,
  formatPrice as formatPriceRaw,
  convertPriceText as convertPriceTextRaw
} from '../utils/currencySettings';

/**
 * Returns the active currency plus two helpers bound to it:
 * - formatPrice(amountInInr): format a plain INR number in the active currency
 * - convertPriceText("₹349 - ₹1,850"): convert an already-formatted string
 * Re-renders automatically when the admin switches currency.
 */
export function useCurrency() {
  const [currency, setCurrencyState] = useState<CurrencyCode>(getCurrency());

  useEffect(() => {
    const sync = () => setCurrencyState(getCurrency());
    window.addEventListener(CURRENCY_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CURRENCY_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return {
    currency,
    formatPrice: (amountInInr: number) => formatPriceRaw(amountInInr, currency),
    convertPriceText: (text: string) => convertPriceTextRaw(text, currency)
  };
}
