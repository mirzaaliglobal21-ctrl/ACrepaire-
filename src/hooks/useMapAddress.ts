import { useEffect, useState } from 'react';
import { getMapAddress, MAP_ADDRESS_EVENT } from '../utils/mapSettings';

/**
 * Returns the current shop address used by every map on the site, and
 * re-renders automatically whenever the admin updates it (this tab via a
 * custom event, other tabs via the native "storage" event).
 */
export function useMapAddress(): string {
  const [address, setAddress] = useState<string>(getMapAddress());

  useEffect(() => {
    const syncFromEvent = () => setAddress(getMapAddress());
    window.addEventListener(MAP_ADDRESS_EVENT, syncFromEvent);
    window.addEventListener('storage', syncFromEvent);
    return () => {
      window.removeEventListener(MAP_ADDRESS_EVENT, syncFromEvent);
      window.removeEventListener('storage', syncFromEvent);
    };
  }, []);

  return address;
}
