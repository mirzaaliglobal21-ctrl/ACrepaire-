import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Snowflake, 
  RotateCw, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Zap, 
  Tag, 
  Wrench,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { ApplianceType, Booking, ServiceItem } from '../types';
import { BRANDS, APPLIANCE_SUBTYPES, TIME_SLOTS } from '../data/servicesData';
import { generateBookingId, saveBooking } from '../utils/bookingStorage';
import { useCurrency } from '../hooks/useCurrency';
import { useServices } from '../hooks/useServices';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (booking: Booking) => void;
  preselectedAppliance?: ApplianceType;
  preselectedServiceId?: string;
  preselectedBrand?: string;
  preselectedSymptom?: string;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  isOpen,
  onClose,
  onBookingSuccess,
  preselectedAppliance = 'ac',
  preselectedServiceId,
  preselectedBrand,
  preselectedSymptom
}) => {
  const { formatPrice } = useCurrency();
  const SERVICES = useServices();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  
  // Step 1: Appliance & Service State
  const [appliance, setAppliance] = useState<ApplianceType>(preselectedAppliance);
  const [applianceCategory, setApplianceCategory] = useState<string>(APPLIANCE_SUBTYPES.ac[0]);
  const [brand, setBrand] = useState<string>(preselectedBrand || BRANDS.ac[0]);
  const [serviceId, setServiceId] = useState<string>(preselectedServiceId || 'ac-foam-jet-service');
  const [issueDescription, setIssueDescription] = useState<string>(preselectedSymptom || '');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(
    preselectedSymptom ? [preselectedSymptom] : []
  );

  // Step 2: Date & Contact Details State
  const todayStr = new Date().toISOString().split('T')[0];
  const [serviceDate, setServiceDate] = useState<string>(todayStr);
  const [timeSlot, setTimeSlot] = useState<string>(TIME_SLOTS[1]);
  const [isEmergency, setIsEmergency] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [landmark, setLandmark] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');

  // Step 3: Payment & Coupon State
  const [paymentMethod, setPaymentMethod] = useState<'pay_after_service' | 'online'>('pay_after_service');
  const [couponCode, setCouponCode] = useState<string>('COOL100');
  const [couponApplied, setCouponApplied] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Sync props when wizard opens with pre-selections
  useEffect(() => {
    if (isOpen) {
      if (preselectedAppliance) {
        setAppliance(preselectedAppliance);
        setApplianceCategory(APPLIANCE_SUBTYPES[preselectedAppliance][0]);
        setBrand(preselectedBrand || BRANDS[preselectedAppliance][0]);
      }
      if (preselectedServiceId) {
        setServiceId(preselectedServiceId);
      }
      if (preselectedSymptom) {
        setIssueDescription(preselectedSymptom);
        setSelectedSymptoms([preselectedSymptom]);
      }
      setErrorMessage('');
    }
  }, [isOpen, preselectedAppliance, preselectedServiceId, preselectedBrand, preselectedSymptom]);

  // Update subtypes & default service when appliance changes
  const handleApplianceChange = (newAppliance: ApplianceType) => {
    setAppliance(newAppliance);
    setApplianceCategory(APPLIANCE_SUBTYPES[newAppliance][0]);
    setBrand(BRANDS[newAppliance][0]);
    const firstService = SERVICES.find(s => s.appliance === newAppliance);
    if (firstService) {
      setServiceId(firstService.id);
    }
    setSelectedSymptoms([]);
  };

  const selectedService = SERVICES.find(s => s.id === serviceId) || SERVICES[0];

  // Pricing calculations
  const basePrice = selectedService.startingPrice;
  const emergencySurcharge = isEmergency ? 150 : 0;
  const discountAmount = couponApplied ? 100 : 0;
  const finalPrice = Math.max(0, basePrice + emergencySurcharge - discountAmount);

  const symptomPills = appliance === 'ac' ? [
    'Not cooling properly',
    'Water leakage from indoor unit',
    'Bad smell from blower',
    'Ice on copper pipe',
    'Making loud buzzing noise',
    'Tripping power circuit / MCB',
    'Remote not responding'
  ] : [
    'Water not draining (OE/5E)',
    'Not spinning at all',
    'Loud grinding / jet engine noise',
    'Water not filling (IE/4E)',
    'Violent shaking during spin',
    'Machine completely dead',
    'Door latch locked / stuck'
  ];

  const toggleSymptom = (sym: string) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  // Step 1 Validation
  const handleProceedToStep2 = () => {
    if (!serviceId) {
      setErrorMessage('Please select a service to proceed.');
      return;
    }
    setErrorMessage('');
    setCurrentStep(2);
  };

  // Step 2 Validation
  const handleProceedToStep3 = () => {
    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      setErrorMessage('Please enter a valid phone number (at least 8-10 digits).');
      return;
    }
    if (!address.trim()) {
      setErrorMessage('Please enter your complete service address.');
      return;
    }
    if (!pincode.trim()) {
      setErrorMessage('Please enter your area pincode / postal code.');
      return;
    }
    setErrorMessage('');
    setCurrentStep(3);
  };

  // Final Submission
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingId = generateBookingId();
    
    // Assign specialist based on appliance
    const techName = appliance === 'ac' ? 'Vikram Singh (HVAC Specialist)' : 'Mohit Kumar (Senior Appliance Tech)';
    const techPhone = appliance === 'ac' ? '+91 98111 22334' : '+91 97222 33445';

    const newBooking: Booking = {
      id: bookingId,
      createdAt: new Date().toLocaleString(),
      appliance,
      applianceCategory,
      brand,
      serviceId,
      serviceName: selectedService.name,
      issueDescription: issueDescription || (selectedSymptoms.length > 0 ? selectedSymptoms.join(', ') : 'Standard Service Request'),
      symptoms: selectedSymptoms,
      date: serviceDate,
      timeSlot: isEmergency ? 'Express 45-Min Arrival' : timeSlot,
      isEmergency,
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      address: address.trim(),
      landmark: landmark.trim() || undefined,
      pincode: pincode.trim(),
      estimatedPrice: finalPrice,
      paymentMethod,
      status: 'confirmed',
      technician: {
        name: techName,
        phone: techPhone,
        rating: 4.9,
        experience: '7+ Years Exp',
        arrivalEstimate: isEmergency ? 'Dispatching now (~35 mins)' : `Scheduled for ${serviceDate}`
      }
    };

    setTimeout(() => {
      saveBooking(newBooking);
      setIsSubmitting(false);
      onBookingSuccess(newBooking);
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 my-auto"
          >
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                Online Service Booking
              </h3>
              <p className="text-[11px] text-slate-400">Doorstep Technician Dispatch</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps Navigation Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {/* Step 1 */}
            <div className="flex items-center space-x-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep >= 1 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                1
              </span>
              <span className={`text-xs font-semibold ${
                currentStep >= 1 ? 'text-slate-900' : 'text-slate-400'
              }`}>
                Appliance & Issue
              </span>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-300" />

            {/* Step 2 */}
            <div className="flex items-center space-x-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep >= 2 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                2
              </span>
              <span className={`text-xs font-semibold ${
                currentStep >= 2 ? 'text-slate-900' : 'text-slate-400'
              }`}>
                Date & Address
              </span>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-300" />

            {/* Step 3 */}
            <div className="flex items-center space-x-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep === 3 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                3
              </span>
              <span className={`text-xs font-semibold ${
                currentStep === 3 ? 'text-slate-900' : 'text-slate-400'
              }`}>
                Confirm & Pay
              </span>
            </div>
          </div>
        </div>

        {/* Error message alert */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-700 flex items-center space-x-2">
            <X className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: APPLIANCE & SERVICE SELECTION */}
        {currentStep === 1 && (
          <motion.div 
            key="wizard-step-1"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="p-6 space-y-5 max-h-[75vh] overflow-y-auto"
          >
            {/* Appliance Selector Tabs */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Select Appliance Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleApplianceChange('ac')}
                  className={`p-3.5 rounded-xl border flex items-center space-x-3 transition-all cursor-pointer ${
                    appliance === 'ac'
                      ? 'border-teal-500 bg-teal-50/60 ring-2 ring-teal-500/20 text-teal-900 font-bold'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    appliance === 'ac' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Snowflake className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm">Air Conditioner</div>
                    <div className="text-[11px] text-slate-500 font-normal">Split, Window, Inverter</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleApplianceChange('washing_machine')}
                  className={`p-3.5 rounded-xl border flex items-center space-x-3 transition-all cursor-pointer ${
                    appliance === 'washing_machine'
                      ? 'border-cyan-500 bg-cyan-50/60 ring-2 ring-cyan-500/20 text-cyan-900 font-bold'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    appliance === 'washing_machine' ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <RotateCw className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm">Washing Machine</div>
                    <div className="text-[11px] text-slate-500 font-normal">Front, Top, Semi-Auto</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Sub-type and Brand */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Appliance Model / Sub-Type
                </label>
                <select
                  value={applianceCategory}
                  onChange={(e) => setApplianceCategory(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                >
                  {APPLIANCE_SUBTYPES[appliance].map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brand Name
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                >
                  {BRANDS[appliance].map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Select Required Service */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. Select Required Service Package
              </label>
              <div className="space-y-2">
                {SERVICES.filter(s => s.appliance === appliance).map((srv) => (
                  <label
                    key={srv.id}
                    className={`flex items-start justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      serviceId === srv.id
                        ? 'border-teal-500 bg-teal-50/50 ring-1 ring-teal-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        name="service"
                        checked={serviceId === srv.id}
                        onChange={() => setServiceId(srv.id)}
                        className="mt-1 text-teal-600 focus:ring-teal-500 cursor-pointer"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{srv.name}</div>
                        <div className="text-[11px] text-slate-500">{srv.duration} • {srv.warranty}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-teal-700">{formatPrice(srv.startingPrice)}</span>
                      <span className="text-[10px] text-slate-400 block font-normal">base price</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Observed Symptom Tags */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Common Symptoms (Optional - Click all that apply):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {symptomPills.map((sym) => {
                  const isChecked = selectedSymptoms.includes(sym);
                  return (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => toggleSymptom(sym)}
                      className={`text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-teal-600 text-white font-medium shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {sym}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional note */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Additional Comments / Issue Notes:
              </label>
              <textarea
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder="Describe any special issue, strange sound, error codes on display, or floor level..."
                rows={2}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </motion.div>
        )}

        {/* STEP 2: DATE, TIME & ADDRESS DETAILS */}
        {currentStep === 2 && (
          <motion.div 
            key="wizard-step-2"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="p-6 space-y-5 max-h-[75vh] overflow-y-auto"
          >
            {/* Express Emergency Option */}
            <div className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
              isEmergency 
                ? 'bg-amber-50 border-amber-300' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isEmergency ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Express 45-Minute Emergency Dispatch
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Immediate nearest technician assignment (+{formatPrice(150)} priority fee)
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isEmergency}
                  onChange={(e) => setIsEmergency(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            {/* Schedule Slot */}
            {!isEmergency && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Service Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      min={todayStr}
                      value={serviceDate}
                      onChange={(e) => setServiceDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Details */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Contact & Address Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address (Optional for Digital Receipt)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Service Address (House/Flat No., Building, Street) *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    placeholder="Flat 301, Tower B, Green Heights, Main Road..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nearby Landmark
                  </label>
                  <input
                    type="text"
                    placeholder="Near Metro Pillar 45 / City Park"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pincode / Postal Code *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 110001"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: SUMMARY, COUPON & PAYMENT METHOD */}
        {currentStep === 3 && (
          <motion.div 
            key="wizard-step-3"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="p-6 space-y-5 max-h-[75vh] overflow-y-auto"
          >
            {/* Booking Summary Box */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
                Order & Appointment Summary
              </h4>

              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Appliance:</span>
                <span className="font-semibold text-slate-800">
                  {brand} {applianceCategory}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Selected Service:</span>
                <span className="font-semibold text-slate-800">{selectedService.name}</span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Appointment Slot:</span>
                <span className="font-semibold text-teal-700">
                  {isEmergency ? 'Express 45-Min Dispatch' : `${serviceDate} (${timeSlot})`}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Service Location:</span>
                <span className="font-semibold text-slate-800 text-right max-w-xs truncate">
                  {address}, {pincode}
                </span>
              </div>
            </div>

            {/* Transparent Bill Breakdown */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Service Charge:</span>
                <span>{formatPrice(basePrice)}</span>
              </div>

              {isEmergency && (
                <div className="flex justify-between text-amber-700">
                  <span>Priority Emergency Dispatch Fee:</span>
                  <span>+{formatPrice(emergencySurcharge)}</span>
                </div>
              )}

              {couponApplied && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span className="flex items-center">
                    <Tag className="w-3 h-3 mr-1" />
                    Coupon Discount (COOL100):
                  </span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-500 text-[11px] pt-1">
                <span>Diagnostic Visiting Fee:</span>
                <span className="text-emerald-600 font-semibold">FREE (100% Waived)</span>
              </div>

              <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-sm font-bold text-slate-900">
                <span>Total Estimated Cost:</span>
                <span className="text-lg text-teal-700">{formatPrice(finalPrice)}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Choose Payment Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={`p-3.5 rounded-xl border flex items-center space-x-3 cursor-pointer transition-all ${
                  paymentMethod === 'pay_after_service'
                    ? 'border-teal-500 bg-teal-50/50 ring-1 ring-teal-500 font-semibold text-teal-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}>
                  <input
                    type="radio"
                    name="payMethod"
                    checked={paymentMethod === 'pay_after_service'}
                    onChange={() => setPaymentMethod('pay_after_service')}
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <div>
                    <div className="text-xs font-bold">Pay After Service</div>
                    <div className="text-[11px] text-slate-500 font-normal">Cash, UPI, or Card after inspection</div>
                  </div>
                </label>

                <label className={`p-3.5 rounded-xl border flex items-center space-x-3 cursor-pointer transition-all ${
                  paymentMethod === 'online'
                    ? 'border-teal-500 bg-teal-50/50 ring-1 ring-teal-500 font-semibold text-teal-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}>
                  <input
                    type="radio"
                    name="payMethod"
                    checked={paymentMethod === 'online'}
                    onChange={() => setPaymentMethod('online')}
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <div>
                    <div className="text-xs font-bold">Pay Online (Card/UPI)</div>
                    <div className="text-[11px] text-slate-500 font-normal">Instant digital confirmation receipt</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Trust badge */}
            <div className="flex items-center space-x-2 text-xs text-slate-600 bg-teal-50/70 border border-teal-100 p-3 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Includes 90-Day Free Replacement Guarantee on all installed parts & service workmanship.</span>
            </div>
          </motion.div>
        )}

        {/* Wizard Footer Controls */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => {
                setErrorMessage('');
                setCurrentStep((prev) => (prev - 1) as 1 | 2);
              }}
              className="inline-flex items-center px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}

          {currentStep === 1 && (
            <button
              type="button"
              onClick={handleProceedToStep2}
              className="inline-flex items-center px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>Next: Date & Location</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          )}

          {currentStep === 2 && (
            <button
              type="button"
              onClick={handleProceedToStep3}
              className="inline-flex items-center px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>Next: Review & Confirm</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          )}

          {currentStep === 3 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleSubmitBooking}
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white text-xs font-bold rounded-lg shadow-md hover:shadow-lg transition-colors cursor-pointer"
            >
              {isSubmitting ? (
                <span>Generating Booking...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  <span>Confirm & Book Appointment</span>
                </>
              )}
            </motion.button>
          )}
        </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
