import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PhoneCall, 
  Clock, 
  ShieldCheck, 
  Menu, 
  X, 
  CalendarCheck, 
  Search, 
  Snowflake, 
  RotateCw, 
  MessageSquare,
  Wrench
} from 'lucide-react';
import { useContactNumber } from '../hooks/useContactNumber';
import { buildTelUrl, buildWhatsAppUrl, formatDisplayNumber } from '../utils/contactSettings';

interface NavbarProps {
  onOpenBooking: () => void;
  onNavigateToSection: (sectionId: string) => void;
  activeSection?: string;
  myBookingsCount: number;
  onOpenTracker: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onNavigateToSection,
  activeSection,
  myBookingsCount,
  onOpenTracker
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const contactNumber = useContactNumber();

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Diagnostic Guide', id: 'symptoms' },
    { label: 'Why Us', id: 'why-us' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'Contact', id: 'contact' },
    { label: 'FAQs', id: 'faqs' }
  ];

  const handleNavClick = (id: string) => {
    onNavigateToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xs">
      {/* Top emergency & trust bar */}
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-teal-400 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
              Rapid 45-Min Doorstep Service
            </span>
            <span className="hidden sm:inline-flex items-center text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-teal-400" />
              90-Day Repair Warranty
            </span>
            <span className="hidden md:inline-flex items-center text-slate-300">
              <Clock className="w-3.5 h-3.5 mr-1 text-teal-400" />
              8:00 AM - 9:00 PM (All 7 Days)
            </span>
          </div>

          <div className="flex items-center space-x-3 ml-auto text-xs">
            <a 
              href={buildTelUrl(contactNumber)} 
              className="flex items-center font-semibold text-white hover:text-teal-300 transition-colors"
              title="Call Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5 mr-1 text-teal-400" />
              <span>Helpline: {formatDisplayNumber(contactNumber)}</span>
            </a>
            <span className="text-slate-400">|</span>
            <a 
              href={buildWhatsAppUrl(contactNumber, 'Hello CoolClean, I need repair service for my appliance')} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1" />
              <span className="hidden xs:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center space-x-3 text-left group cursor-pointer focus:outline-hidden"
            id="nav-brand-logo"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <div className="relative">
                <Snowflake className="w-5 h-5 text-white" />
                <RotateCw className="w-3.5 h-3.5 text-teal-100 absolute -bottom-1 -right-1" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-lg text-white tracking-tight">COOL&CLEAN</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded-sm bg-teal-900/40 text-teal-300 border border-teal-800">
                  REPAIR HUB
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">AC & Washing Machine Experts</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-colors cursor-pointer py-1 border-b-2 ${
                  activeSection === link.id
                    ? 'text-teal-400 border-teal-600 font-semibold'
                    : 'text-slate-400 border-transparent hover:text-teal-400 hover:border-teal-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenTracker}
              id="nav-track-btn"
              className="inline-flex items-center px-3.5 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
              <span>Track Booking</span>
              {myBookingsCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 bg-teal-600 text-white rounded-full text-[10px]">
                  {myBookingsCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenBooking}
              id="nav-book-now-btn"
              className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm shadow-teal-600/30 transition-all hover:shadow-md cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 mr-1.5" />
              <span>Book Service</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="sm:hidden px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 rounded-lg"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-6 space-y-3 shadow-lg overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 pb-2">
              <button
                onClick={() => {
                  onOpenBooking();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Service</span>
              </button>
              <button
                onClick={() => {
                  onOpenTracker();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span>Track ({myBookingsCount})</span>
              </button>
            </div>

            <div className="space-y-1 border-t border-slate-800 pt-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="block w-full text-left py-2.5 px-3 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800/60 hover:text-teal-400 transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center space-x-2 font-medium">
                <PhoneCall className="w-4 h-4 text-teal-400" />
                <span>Direct Hotline: {formatDisplayNumber(contactNumber)}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-500">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Open 8:00 AM - 9:00 PM (Monday - Sunday)</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
