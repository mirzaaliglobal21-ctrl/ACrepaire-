import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Clock, 
  MapPin, 
  CheckCircle, 
  ShieldCheck, 
  Phone, 
  AlertCircle, 
  Snowflake, 
  RotateCw, 
  Calendar,
  X,
  RefreshCw,
  XCircle,
  Wrench,
  Check
} from 'lucide-react';
import { Booking, BookingStatus } from '../types';
import { updateBookingStatus } from '../utils/bookingStorage';

interface BookingTrackerProps {
  bookings: Booking[];
  onBookingsChange: (updatedBookings: Booking[]) => void;
  initialSearchId?: string;
  onClose?: () => void;
}

export const BookingTracker: React.FC<BookingTrackerProps> = ({
  bookings,
  onBookingsChange,
  initialSearchId,
  onClose
}) => {
  const [searchInput, setSearchInput] = useState<string>(initialSearchId || '');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(
    bookings.find(b => b.id === initialSearchId) || bookings[0] || null
  );
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');

  useEffect(() => {
    if (initialSearchId) {
      setSearchInput(initialSearchId);
      const found = bookings.find(b => b.id.toLowerCase() === initialSearchId.toLowerCase());
      if (found) {
        setSelectedBooking(found);
      }
    }
  }, [initialSearchId, bookings]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toLowerCase();
    if (!query) return;

    const match = bookings.find(
      b => b.id.toLowerCase() === query || b.phone.replace(/\D/g, '').includes(query.replace(/\D/g, ''))
    );

    if (match) {
      setSelectedBooking(match);
      setFeedbackMsg('');
    } else {
      setFeedbackMsg(`No booking found matching "${searchInput}". Please check ID or phone.`);
    }
  };

  const handleStatusChange = (newStatus: BookingStatus) => {
    if (!selectedBooking) return;
    const updated = updateBookingStatus(selectedBooking.id, newStatus);
    onBookingsChange(updated);
    const refreshed = updated.find(b => b.id === selectedBooking.id);
    if (refreshed) {
      setSelectedBooking(refreshed);
    }
  };

  const getStatusStepNumber = (status: BookingStatus): number => {
    switch (status) {
      case 'confirmed': return 1;
      case 'technician_assigned': return 2;
      case 'in_transit': return 3;
      case 'in_progress': return 4;
      case 'completed': return 5;
      case 'cancelled': return 0;
      default: return 1;
    }
  };

  const steps = [
    { step: 1, title: 'Appointment Booked', desc: 'Received & confirmed in system' },
    { step: 2, title: 'Specialist Assigned', desc: 'Verified engineer allocated' },
    { step: 3, title: 'Technician In Transit', desc: 'En route with spare parts kit' },
    { step: 4, title: 'Service In Progress', desc: 'Diagnostics & repair work' },
    { step: 5, title: 'Quality Tested & Done', desc: '90-day warranty activated' }
  ];

  const currentStepNum = selectedBooking ? getStatusStepNumber(selectedBooking.status) : 1;

  return (
    <section id="tracker" className="py-16 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-teal-500/20 text-teal-400 text-xs font-semibold px-3 py-1 rounded-full mb-2">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Real-Time Dispatch Tracker</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Track Your Service Status
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Check live engineer ETA, diagnosis updates, and warranty details by Booking ID or phone.
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="self-start md:self-auto p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search Bar & Quick Switcher */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 sm:p-5 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Booking ID (e.g. CW-8924) or 10-digit mobile number..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-600 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-400"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 font-bold text-xs sm:text-sm text-white rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Track Appointment
            </button>
          </form>

          {/* Quick Select Recent Bookings */}
          {bookings.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-700/80 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-400">Available Bookings:</span>
              {bookings.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedBooking(b);
                    setSearchInput(b.id);
                    setFeedbackMsg('');
                  }}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    selectedBooking?.id === b.id
                      ? 'bg-teal-500 text-white font-bold'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {b.id} ({b.brand})
                </button>
              ))}
            </div>
          )}

          {feedbackMsg && (
            <div className="mt-3 text-xs text-amber-400 flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{feedbackMsg}</span>
            </div>
          )}
        </div>

        {/* Selected Booking Details Card */}
        <AnimatePresence mode="wait">
          {selectedBooking ? (
            <motion.div 
              key={selectedBooking.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl"
            >
              {/* Top Status Header */}
              <div className="p-6 bg-slate-800/90 border-b border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <motion.div 
                    whileHover={{ rotate: 15 }}
                    className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0"
                  >
                    {selectedBooking.appliance === 'ac' ? (
                      <Snowflake className="w-6 h-6" />
                    ) : (
                      <RotateCw className="w-6 h-6" />
                    )}
                  </motion.div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm text-teal-400 font-bold">
                      {selectedBooking.id}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      selectedBooking.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : selectedBooking.status === 'cancelled'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : 'bg-teal-500/20 text-teal-300 border border-teal-500/40 animate-pulse'
                    }`}>
                      {selectedBooking.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {selectedBooking.serviceName}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {selectedBooking.brand} • {selectedBooking.applianceCategory}
                  </p>
                </div>
              </div>

              {/* Quick Actions (Simulate lifecycle / Reschedule / Cancel) */}
              <div className="flex flex-wrap items-center gap-2">
                {selectedBooking.status !== 'completed' && selectedBooking.status !== 'cancelled' && (
                  <>
                    <button
                      onClick={() => handleStatusChange('in_progress')}
                      className="text-xs px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-200 transition-colors"
                    >
                      Simulate Service Start
                    </button>
                    <button
                      onClick={() => handleStatusChange('completed')}
                      className="text-xs px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-lg text-white transition-colors"
                    >
                      Mark Completed
                    </button>
                    <button
                      onClick={() => handleStatusChange('cancelled')}
                      className="text-xs px-2.5 py-1.5 text-red-400 hover:text-red-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                )}
                {selectedBooking.status === 'cancelled' && (
                  <button
                    onClick={() => handleStatusChange('confirmed')}
                    className="text-xs px-3 py-1.5 bg-teal-600 hover:bg-teal-500 font-bold rounded-lg text-white"
                  >
                    Reactivate Appointment
                  </button>
                )}
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="p-6 border-b border-slate-700 bg-slate-900/50">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                {steps.map((st) => {
                  const isDone = currentStepNum >= st.step && selectedBooking.status !== 'cancelled';
                  const isCurrent = currentStepNum === st.step && selectedBooking.status !== 'cancelled';

                  return (
                    <div key={st.step} className="flex sm:flex-col items-center sm:items-start space-x-3 sm:space-x-0 relative">
                      <div className="flex items-center space-x-2 sm:mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isDone 
                            ? 'bg-teal-500 text-slate-900' 
                            : 'bg-slate-700 text-slate-400'
                        } ${isCurrent ? 'ring-4 ring-teal-500/30' : ''}`}>
                          {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : st.step}
                        </div>
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${
                          isDone ? 'text-teal-300' : 'text-slate-400'
                        }`}>
                          {st.title}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {st.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              
              {/* Col 1: Customer & Address */}
              <div className="space-y-3 bg-slate-900/40 p-4 rounded-xl border border-slate-700/60">
                <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                  Customer & Location
                </h4>
                <div className="space-y-1.5">
                  <div className="text-white font-semibold">{selectedBooking.customerName}</div>
                  <div className="text-slate-400">{selectedBooking.phone}</div>
                  {selectedBooking.email && <div className="text-slate-400">{selectedBooking.email}</div>}
                  <div className="text-slate-300 flex items-start space-x-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                    <span>{selectedBooking.address}, {selectedBooking.pincode}</span>
                  </div>
                </div>
              </div>

              {/* Col 2: Technician Info */}
              <div className="space-y-3 bg-slate-900/40 p-4 rounded-xl border border-slate-700/60">
                <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                  Assigned Engineer
                </h4>
                {selectedBooking.technician ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-xs">
                        {selectedBooking.technician.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white">{selectedBooking.technician.name}</div>
                        <div className="text-slate-400 text-[11px]">
                          ⭐ {selectedBooking.technician.rating} • {selectedBooking.technician.experience}
                        </div>
                      </div>
                    </div>

                    <div className="text-teal-400 text-[11px] font-medium bg-teal-950/40 p-2 rounded-lg border border-teal-800/40">
                      ETA: {selectedBooking.technician.arrivalEstimate}
                    </div>

                    <a
                      href={`tel:${selectedBooking.technician.phone}`}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg text-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Technician Directly</span>
                    </a>
                  </div>
                ) : (
                  <div className="text-slate-400 text-xs">
                    Allocating senior technician in your area...
                  </div>
                )}
              </div>

              {/* Col 3: Invoice & Warranty */}
              <div className="space-y-3 bg-slate-900/40 p-4 rounded-xl border border-slate-700/60">
                <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                  Billing & Warranty
                </h4>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-400">
                    <span>Scheduled Slot:</span>
                    <span className="text-slate-200 font-medium">{selectedBooking.date}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Time:</span>
                    <span className="text-slate-200 font-medium">{selectedBooking.timeSlot}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Payment Mode:</span>
                    <span className="text-teal-400 font-medium capitalize">
                      {selectedBooking.paymentMethod.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-sm pt-1 border-t border-slate-700">
                    <span>Total Bill:</span>
                    <span className="text-teal-400">₹{selectedBooking.estimatedPrice}</span>
                  </div>

                  <div className="pt-2 flex items-center space-x-1.5 text-emerald-400 text-[11px]">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>90-Day Repair Guarantee Valid</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="empty-tracker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center text-slate-400 text-sm"
          >
            Select or search for a booking above to view detailed live tracking.
          </motion.div>
        )}
        </AnimatePresence>

      </div>
    </section>
  );
};
