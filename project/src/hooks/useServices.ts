import { useEffect, useState } from 'react';
import { ServiceItem } from '../types';
import { getServices, SERVICES_EVENT } from '../utils/servicesOverrides';

/** Live, admin-editable services list. Re-renders automatically whenever
 *  the admin adds, edits, or deletes a service. */
export function useServices(): ServiceItem[] {
  const [services, setServices] = useState<ServiceItem[]>(getServices());

  useEffect(() => {
    const sync = () => setServices(getServices());
    window.addEventListener(SERVICES_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(SERVICES_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return services;
}
