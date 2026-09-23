import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { ApplianceType } from '../types';
import { FAQS } from '../data/servicesData';
import { useMapAddress } from '../hooks/useMapAddress';
import { buildMapEmbedUrl, buildDirectionsUrl } from '../utils/mapSettings';
import { useContactNumber } from '../hooks/useContactNumber';
import { buildTelUrl, buildWhatsAppUrl, formatDisplayNumber } from '../utils/contactSettings';
import { useCurrency } from '../hooks/useCurrency';

export const ContactSection: React.FC = () => {
  const mapAddress = useMapAddress();
  const contactNumber = useContactNumber();
  const { convertPriceText } = useCurrency();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [appliance, setAppliance] = useState<ApplianceType | 'both'>('ac');
  const [inquiryType, setInquiryType] = useState('Service Request');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      setFormError('Please provide a valid phone number.');
      return;
    }
    if (!message.trim()) {
      setFormError('Please enter a brief message or describe your appliance problem.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 600);
  };

  return (
    <section id="contact" className="py-16 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-teal-900/40 border border-teal-800 text-teal-300 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <Phone className="w-3.5 h-3.5 text-teal-400" />
            <span>24/7 Helpline & Doorstep Assistance</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Contact Our Service Hub
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Have a question, need an urgent breakdown technician, or want an AMC quote? Reach out below or message us on WhatsApp for immediate response.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contact Info & Store Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Urgent Hotline Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-lg border border-slate-700">
              <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Immediate Assistance</span>
              </div>
              <h3 className="text-xl font-bold mb-1">
                Emergency Breakdown Helpline
              </h3>
              <p className="text-slate-400 text-xs mb-4">
                Technicians on standby across all major sectors for rapid 45-minute dispatch.
              </p>

              <div className="space-y-3">
                <a
                  href={buildTelUrl(contactNumber)}
                  className="flex items-center space-x-3 p-3 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl border border-slate-700 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Direct Technician Hotline</div>
                    <div className="text-sm font-bold text-white">{formatDisplayNumber(contactNumber)}</div>
                  </div>
                </a>

                <a
                  href={buildWhatsAppUrl(contactNumber, 'Hello CoolClean, I need urgent service')}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-3 p-3 bg-emerald-950/40 hover:bg-emerald-900/40 rounded-xl border border-emerald-700/40 transition-colors text-emerald-300"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-emerald-400/80">WhatsApp Quick Chat</div>
                    <div className="text-sm font-bold text-emerald-300">Chat with Service Manager</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Shop Details */}
            <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-800 space-y-4 text-xs">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-100 block text-xs">Main Workshop & Service Center</span>
                  <span className="text-slate-400">
                    Shop #14, Central Electronics & Appliance Market, Sector 18 (Near Metro Pillar 421)
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-100 block text-xs">Operating Hours</span>
                  <span className="text-slate-400">
                    Monday - Sunday: 8:00 AM - 9:00 PM (Doorstep Service)
                  </span>
                  <span className="block text-[11px] text-teal-300 font-medium mt-0.5">
                    *24/7 on-call emergency repairs available
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-100 block text-xs">Customer Support Email</span>
                  <a href="mailto:support@coolcleanrepairs.com" className="text-teal-300 hover:underline">
                    support@coolcleanrepairs.com
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map - Shop Location */}
            <div className="bg-slate-800/60 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="p-4 pb-0 flex items-center space-x-2 text-xs">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="font-bold text-slate-100">Find Us on the Map</span>
              </div>
              <div className="px-4 pt-1">
                <span className="text-[11px] text-slate-400">{mapAddress}</span>
              </div>
              <div className="mt-3 h-56 sm:h-64 w-full">
                <iframe
                  title="CoolClean Repair Hub - Service Center Location"
                  src={buildMapEmbedUrl(mapAddress)}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[15%]"
                />
              </div>
              <div className="p-4 pt-3 flex justify-end">
                <a
                  href={buildDirectionsUrl(mapAddress)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-semibold text-teal-300 hover:underline"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            {/* Service Guarantee Banner */}
            <div className="flex items-center space-x-3 p-4 bg-teal-900/40 border border-teal-800 rounded-xl text-teal-900 text-xs">
              <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
              <span>
                <strong>100% Satisfaction Guarantee:</strong> If our repair fails within 90 days, we fix it again free of charge with zero hassle.
              </span>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-white mb-1">
                Send Us a Service Inquiry
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill in the details below. Our technical supervisor will call back within 15 minutes.
              </p>

              <AnimatePresence mode="wait">
                {submittedSuccess ? (
                  <motion.div 
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="bg-emerald-900/40 border border-emerald-800 rounded-xl p-6 text-center space-y-3"
                  >
                    <div className="w-12 h-12 bg-emerald-900/50 text-emerald-300 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-emerald-900">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-xs text-emerald-300 max-w-sm mx-auto">
                      Thank you for reaching out. Our service executive will call your mobile number shortly to answer your inquiry or dispatch an engineer.
                    </p>
                    <button
                      onClick={() => setSubmittedSuccess(false)}
                      className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-4"
                  >
                  {formError && (
                    <div className="p-3 bg-red-900/40 border border-red-800 rounded-lg text-xs text-red-300 flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ankit Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-800/60 border border-slate-700 rounded-lg text-slate-100 focus:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Contact Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-800/60 border border-slate-700 rounded-lg text-slate-100 focus:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-800/60 border border-slate-700 rounded-lg text-slate-100 focus:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Appliance Category
                      </label>
                      <select
                        value={appliance}
                        onChange={(e) => setAppliance(e.target.value as ApplianceType | 'both')}
                        className="w-full text-xs p-2.5 bg-slate-800/60 border border-slate-700 rounded-lg text-slate-100 focus:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="ac">Air Conditioner (AC)</option>
                        <option value="washing_machine">Washing Machine</option>
                        <option value="both">Both AC & Washing Machine</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Inquiry Type
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-800/60 border border-slate-700 rounded-lg text-slate-100 focus:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="Service Request">Book Technician / Service Request</option>
                      <option value="Emergency Breakdown">Urgent Emergency Breakdown (Under 1 Hour)</option>
                      <option value="Cost Estimate Query">Price Quotation & Spare Parts Inquiry</option>
                      <option value="Annual Maintenance Contract (AMC)">Annual Maintenance Contract (AMC)</option>
                      <option value="Warranty Claim">Warranty Claim / Post-Service Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Message / Problem Description *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please specify brand (LG, Samsung, Daikin, etc.), observed problem, error code, or any question..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full text-xs p-3 bg-slate-800/60 border border-slate-700 rounded-lg text-slate-100 focus:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    id="contact-submit-btn"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-1" />
                        <span>Submit Service Request</span>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
              </AnimatePresence>

            </div>
          </div>

        </div>

        {/* FAQs Accordion */}
        <div id="faqs" className="mt-20 pt-12 border-t border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Everything you need to know about AC servicing, gas charging, washing machine repairs, and warranties.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900 shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between space-x-4 hover:bg-slate-800/60 transition-colors cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white">
                      {faq.question}
                    </span>
                    <span className="text-slate-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-3 bg-slate-900/50">
                          {convertPriceText(faq.answer)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
