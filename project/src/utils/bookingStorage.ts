import { Booking } from '../types';
import { INITIAL_BOOKINGS } from '../data/servicesData';

const STORAGE_KEY = 'coolclean_repair_bookings';

export function getStoredBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_BOOKINGS;
  } catch {
    return INITIAL_BOOKINGS;
  }
}

export function saveBooking(booking: Booking): Booking[] {
  try {
    const existing = getStoredBookings();
    const updated = [booking, ...existing.filter(b => b.id !== booking.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [booking];
  }
}

export function updateBookingStatus(bookingId: string, status: Booking['status']): Booking[] {
  try {
    const existing = getStoredBookings();
    const updated = existing.map(b => b.id === bookingId ? { ...b, status } : b);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function generateBookingId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `CW-${num}`;
}
