/**
 * Shared contact number settings (used for the phone/tel links and the
 * WhatsApp "chat to book" links across the whole site).
 * Only the admin can change this — see AdminControlPanel.tsx.
 */

const STORAGE_KEY = 'coolclean_whatsapp_number';
const DEFAULT_NUMBER = '919876500123'; // digits only, country code first, no + or spaces

export const CONTACT_EVENT = 'coolclean:contact-number-changed';

export function getWhatsAppNumber(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored && stored.trim() ? stored.trim() : DEFAULT_NUMBER;
  } catch {
    return DEFAULT_NUMBER;
  }
}

export function setWhatsAppNumber(number: string): void {
  // Keep digits only (allow a leading + while typing, strip it for storage)
  const clean = number.replace(/[^\d]/g, '');
  if (!clean) return;
  try {
    localStorage.setItem(STORAGE_KEY, clean);
  } catch {
    // ignore — event still fires for this session
  }
  window.dispatchEvent(new CustomEvent(CONTACT_EVENT, { detail: clean }));
}

export function formatDisplayNumber(digits: string): string {
  // Best-effort pretty print for an Indian-style number: +91 98765 00123
  if (digits.length === 12 && digits.startsWith('91')) {
    const local = digits.slice(2);
    return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
  }
  return `+${digits}`;
}

export function buildTelUrl(digits: string): string {
  return `tel:+${digits}`;
}

export function buildWhatsAppUrl(digits: string, message: string): string {
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
