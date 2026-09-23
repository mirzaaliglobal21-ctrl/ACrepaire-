/**
 * Admin-editable services layer.
 *
 * SERVICES in `servicesData.ts` is the original, built-in catalog (code).
 * This file stores the admin's changes on top of it — edits, new services,
 * and deletions — in localStorage, and exposes a single `getServices()`
 * that merges the two. Nothing here touches the original file, so the
 * built-in catalog is always safe to fall back to.
 *
 * Only the admin can change this — see AdminControlPanel.tsx.
 */

import { ServiceItem } from '../types';
import { SERVICES as BASE_SERVICES } from '../data/servicesData';

const EDITED_KEY = 'coolclean_services_edited';   // Record<id, Partial<ServiceItem>>
const ADDED_KEY = 'coolclean_services_added';     // ServiceItem[]
const DELETED_KEY = 'coolclean_services_deleted'; // string[] of ids

export const SERVICES_EVENT = 'coolclean:services-changed';

type EditedMap = Record<string, Partial<ServiceItem>>;

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore — event still fires for this session
  }
  window.dispatchEvent(new CustomEvent(SERVICES_EVENT));
}

function getEdited(): EditedMap {
  return readJson<EditedMap>(EDITED_KEY, {});
}

function getAdded(): ServiceItem[] {
  return readJson<ServiceItem[]>(ADDED_KEY, []);
}

function getDeleted(): string[] {
  return readJson<string[]>(DELETED_KEY, []);
}

/** The full, merged catalog: base services (with admin edits applied and
 *  deletions removed) plus any brand-new services the admin has added. */
export function getServices(): ServiceItem[] {
  const edited = getEdited();
  const deleted = new Set(getDeleted());
  const added = getAdded();

  const merged = BASE_SERVICES
    .filter(s => !deleted.has(s.id))
    .map(s => (edited[s.id] ? { ...s, ...edited[s.id], id: s.id } : s));

  return [...merged, ...added];
}

/** True if this id belongs to the original built-in catalog (vs admin-added). */
export function isBuiltInService(id: string): boolean {
  return BASE_SERVICES.some(s => s.id === id);
}

/** Create a brand-new service. Generates a unique id from the name. */
export function addService(service: Omit<ServiceItem, 'id'>): ServiceItem {
  const slug = service.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'service';
  const existingIds = new Set([...BASE_SERVICES, ...getAdded()].map(s => s.id));
  let id = `custom-${slug}`;
  let n = 2;
  while (existingIds.has(id)) {
    id = `custom-${slug}-${n}`;
    n += 1;
  }
  const newService: ServiceItem = { ...service, id };
  const added = getAdded();
  writeJson(ADDED_KEY, [...added, newService]);
  return newService;
}

/** Update any service — built-in (stored as an edit/override) or
 *  admin-added (stored directly in the added list). */
export function updateService(id: string, changes: Partial<ServiceItem>): void {
  if (isBuiltInService(id)) {
    const edited = getEdited();
    writeJson(EDITED_KEY, { ...edited, [id]: { ...edited[id], ...changes } });
  } else {
    const added = getAdded().map(s => (s.id === id ? { ...s, ...changes, id } : s));
    writeJson(ADDED_KEY, added);
  }
}

/** Delete a service — built-in ones are hidden via the deleted-id list
 *  (so the original data file stays intact), admin-added ones are removed
 *  outright. */
export function deleteService(id: string): void {
  if (isBuiltInService(id)) {
    const deleted = getDeleted();
    if (!deleted.includes(id)) {
      writeJson(DELETED_KEY, [...deleted, id]);
    }
  } else {
    writeJson(ADDED_KEY, getAdded().filter(s => s.id !== id));
  }
}

/** Restore a deleted built-in service. */
export function restoreService(id: string): void {
  writeJson(DELETED_KEY, getDeleted().filter(existingId => existingId !== id));
}

/** Reset ALL admin changes to services back to the original catalog. */
export function resetServices(): void {
  try {
    localStorage.removeItem(EDITED_KEY);
    localStorage.removeItem(ADDED_KEY);
    localStorage.removeItem(DELETED_KEY);
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent(SERVICES_EVENT));
}
