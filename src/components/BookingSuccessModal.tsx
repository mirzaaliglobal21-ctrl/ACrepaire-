import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle, 
  X, 
  Phone, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Printer, 
  Search, 
  Snowflake, 
  RotateCw,
  Clock
} from 'lucide-react';
import { Booking } from '../types';

interface BookingSuccessModalProps {
  booking: Booking | null;
  onClose: () => void;
  onOpenTrackerForBooking: (bookingId: string) => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  booking,
  onClose,
  onOpenTrackerForBooking
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {booking && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200 my-auto"
          >
            {/* Header with celebration banner */}
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6 text-center relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1, damping: 15 }}
                className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md text-teal-600"
              >
                <CheckCircle className="w-8 h-8 text-teal-600" />
              </motion.div>

          <h3 className="text-xl font-extrabold tracking-tight">Booking Confirmed!</h3>
          <p className="text-xs text-teal-100 mt-1">
            Your technician appointment has been successfully scheduled.
          </p>

          <div className="mt-3 inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider">
            Booking ID: {booking.id}
          </div>
        </div>

        {/* Booking Details Card */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Assigned Technician Banner */}
          {booking.technician && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center font-bold text-teal-800 text-sm">
                  {booking.technician.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{booking.technician.name}</div>
                  <div className="text-[11px] text-slate-500">
                    ⭐ {booking.technician.rating} • {booking.technician.experience}
                  </div>
                </div>
              </div>
              <a
                href={`tel:${booking.technician.phone}`}
                className="p-2 bg-white text-teal-700 hover:bg-teal-50 border border-teal-200 rounded-lg text-xs font-semibold flex items-center space-x-1"
                title="Call Technician"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Call</span>
              </a>
            </div>
          )}

          {/* Service & Schedule Grid */}
          <div className="space-y-2 text-xs border-y border-slate-100 py-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center">
                {booking.appliance === 'ac' ? (
                  <Snowflake className="w-3.5 h-3.5 mr-1.5 text-teal-600" />
                ) : (
                  <RotateCw className="w-3.5 h-3.5 mr-1.5 text-cyan-600" />
                )}
                Appliance:
              </span>
              <span className="font-semibold text-slate-900">
                {booking.brand} ({booking.applianceCategory})
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Service:</span>
              <span className="font-semibold text-slate-900 text-right max-w-xs">{booking.serviceName}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                Scheduled Slot:
              </span>
              <span className="font-semibold text-teal-700">
                {booking.date} • {booking.timeSlot}
              </span>
            </div>

            <div className="flex items-start justify-between">
              <span className="text-slate-500 flex items-center mt-0.5">
                <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400 shrink-0" />
                Address:
              </span>
              <span className="font-medium text-slate-800 text-right max-w-[240px] truncate">
                {booking.address}, {booking.pincode}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 font-bold text-sm">
              <span className="text-slate-700">Payable Amount:</span>
              <span className="text-teal-700">₹{booking.estimatedPrice}</span>
            </div>

            <div className="text-[11px] text-slate-500 text-right">
              {booking.paymentMethod === 'pay_after_service' ? 'Cash/UPI after job completion' : 'Paid Online'}
            </div>
          </div>

          {/* Warranty Note */}
          <div className="flex items-center space-x-2 text-xs bg-teal-50 border border-teal-100 text-teal-900 p-3 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span>90-Day Free Replacement Warranty active on all repaired components.</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
            <span>Print Job Card</span>
          </button>

          <div className="w-full sm:w-auto flex items-center space-x-2">
            <button
              onClick={() => {
                onClose();
                onOpenTrackerForBooking(booking.id);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 mr-1.5" />
              <span>Track Live Status</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
