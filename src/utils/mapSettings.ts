/**
 * Shared "map address" settings.
 * - Persisted in localStorage so it survives reloads (and is shared by every
 *   map on the site: Hero + Contact section).
 * - Only the admin (password gated) can change it — see AdminControlPanel.tsx.
 */

const STORAGE_KEY = 'coolclean_map_address';
const DEFAULT_ADDRESS = '24.5878382,46.7790884'; // Al Aziziyah, Riyadh, Saudi Arabia

// Custom event name used to notify every mounted map instance in this tab
// the moment the admin saves a new address (storage events only fire in
// *other* tabs, not the one that made the change).
export const MAP_ADDRESS_EVENT = 'coolclean:map-address-changed';

export function getMapAddress(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored && stored.trim() ? stored : DEFAULT_ADDRESS;
  } catch {
    return DEFAULT_ADDRESS;
  }
}

export function setMapAddress(address: string): void {
  const clean = address.trim();
  if (!clean) return;
  try {
    localStorage.setItem(STORAGE_KEY, clean);
  } catch {
    // localStorage unavailable — ignore, the in-memory event still fires
    // so the UI updates for the current session.
  }
  window.dispatchEvent(new CustomEvent(MAP_ADDRESS_EVENT, { detail: clean }));
}

export function resetMapAddress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent(MAP_ADDRESS_EVENT, { detail: DEFAULT_ADDRESS }));
}

export function buildMapEmbedUrl(address: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

export function buildDirectionsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
