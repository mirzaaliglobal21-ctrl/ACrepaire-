import { useEffect, useState } from 'react';
import { getWhatsAppNumber, CONTACT_EVENT } from '../utils/contactSettings';

/** Returns the current contact number (digits only), live-updated when the admin changes it. */
export function useContactNumber(): string {
  const [number, setNumber] = useState<string>(getWhatsAppNumber());

  useEffect(() => {
    const sync = () => setNumber(getWhatsAppNumber());
    window.addEventListener(CONTACT_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CONTACT_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return number;
}
