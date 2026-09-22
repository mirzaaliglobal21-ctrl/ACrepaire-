import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Snowflake, 
  RotateCw, 
  ShieldCheck, 
  Clock, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Wrench,
  Sparkles,
  Zap,
  BadgeCheck
} from 'lucide-react';
import { ApplianceType } from '../types';
import { BRANDS } from '../data/servicesData';
import heroTechnicianImg from '../assets/images/ac_technician_hero_1790081996299.jpg';
import topBannerBgImg from '../assets/images/top_banner_bg_visible_1790082616249.jpg';

interface HeroProps {
  onQuickBook: (appliance: ApplianceType, serviceId?: string, brand?: string) => void;
  onExploreServices: (appliance: ApplianceType) => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuickBook, onExploreServices }) => {
  const [selectedAppliance, setSelectedAppliance] = useState<ApplianceType>('ac');
  const [selectedBrand, setSelectedBrand] = useState('LG');
  const [selectedIssue, setSelectedIssue] = useState('ac-foam-jet-service');

  const acIssues = [
    { id: 'ac-foam-jet-service', label: 'Deep Foam Jet Wash (₹599)' },
    { id: 'ac-gas-charging', label: 'Gas Leak & Refill (₹1,850)' },
    { id: 'ac-not-cooling-repair', label: 'Not Cooling / Warm Air (₹349)' },
    { id: 'ac-water-leakage', label: 'Water Leaking on Wall (₹399)' }
  ];

  const wmIssues = [
    { id: 'wm-deep-cleaning-descaling', label: 'Tub Descaling & Wash (₹649)' },
    { id: 'wm-spin-drain-issue', label: 'Not Draining / OE Error (₹399)' },
    { id: 'wm-noise-drum-bearing', label: 'Violent Vibration / Noise (₹850)' },
    { id: 'wm-water-inlet-leak', label: 'Water Not Filling / 4E (₹349)' }
  ];

  const currentIssues = selectedAppliance === 'ac' ? acIssues : wmIssues;

  const handleApplianceToggle = (appliance: ApplianceType) => {
    setSelectedAppliance(appliance);
    setSelectedBrand(BRANDS[appliance][0]);
    setSelectedIssue(appliance === 'ac' ? 'ac-foam-jet-service' : 'wm-deep-cleaning-descaling');
  };

  const handleQuickBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickBook(selectedAppliance, selectedIssue, selectedBrand);
  };

  return (
    <section id="hero" className="relative pt-8 pb-16 overflow-hidden min-h-[640px] flex items-center">
      {/* AI Generated Top Banner Background - Fully Visible & Vibrant */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src="/images/hero-bg.jpg" 
          onError={(e) => {
            // Fallback to imported module asset if direct path fails
            (e.currentTarget as HTMLImageElement).src = topBannerBgImg;
          }}
          alt="Modern split AC and washing machine repair service banner background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-100"
        />
        {/* Soft directional gradient: dark on left for text legibility, transparent on right for full photo visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 bg-slate-950/20" />
      </div>

      {/* Subtle background glow with slow breathing animation */}
      <motion.div 
        initial={{ opacity: 0.5, scale: 0.95 }}
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-cyan-400/20 via-teal-400/20 to-transparent blur-3xl pointer-events-none z-1" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center space-x-2 bg-teal-900/60 border border-teal-500/40 text-teal-300 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              <span>Doorstep Appliance Doctor • 45-Min Arrival</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm"
            >
              Expert <span className="text-teal-400">Air Conditioner</span> &amp; <br className="hidden sm:block" />
              <span className="text-cyan-300">Washing Machine</span> Repair Services
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed"
            >
              Certified HVAC specialists &amp; home appliance engineers for all brands. Transparent upfront pricing, 100% original OEM parts, and guaranteed 90-day peace of mind.
            </motion.p>

            {/* Trust Badges Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
            >
              <motion.div 
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2 p-2.5 bg-slate-900/80 backdrop-blur-md rounded-lg border border-slate-700/80 shadow-md cursor-default text-white"
              >
                <Clock className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">45 Mins</div>
                  <div className="text-[11px] text-slate-300">Fast Arrival</div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2 p-2.5 bg-slate-900/80 backdrop-blur-md rounded-lg border border-slate-700/80 shadow-md cursor-default text-white"
              >
                <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">90 Days</div>
                  <div className="text-[11px] text-slate-300">Free Warranty</div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2 p-2.5 bg-slate-900/80 backdrop-blur-md rounded-lg border border-slate-700/80 shadow-md cursor-default text-white"
              >
                <Star className="w-5 h-5 text-amber-400 shrink-0 fill-amber-400" />
                <div>
                  <div className="text-xs font-bold text-white">4.9 / 5</div>
                  <div className="text-[11px] text-slate-300">15k+ Reviews</div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2 p-2.5 bg-slate-900/80 backdrop-blur-md rounded-lg border border-slate-700/80 shadow-md cursor-default text-white"
              >
                <Zap className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">₹0 Fee</div>
                  <div className="text-[11px] text-slate-300">If Repaired</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Category Quick Explore Tabs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onExploreServices('ac')}
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold rounded-lg shadow-md transition-colors cursor-pointer"
              >
                <Snowflake className="w-4 h-4 text-white" />
                <span>Explore AC Services</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-200" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onExploreServices('washing_machine')}
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-cyan-700 hover:bg-cyan-600 text-white text-sm font-semibold rounded-lg shadow-md transition-colors cursor-pointer"
              >
                <RotateCw className="w-4 h-4 text-white" />
                <span>Explore Washing Machine</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-200" />
              </motion.button>
            </motion.div>

            {/* AI Generated Certified Technician Live Showcase Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md group mt-3"
            >
              <img 
                src="/images/hero-technician.jpg" 
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = heroTechnicianImg;
                }}
                alt="Certified HVAC technician servicing an air conditioner"
                referrerPolicy="no-referrer"
                className="w-full h-44 sm:h-52 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex items-end p-4">
                <div className="text-white w-full">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center space-x-1.5 text-xs font-semibold text-teal-300">
                      <BadgeCheck className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Verified Doorstep Master Technician</span>
                    </div>
                    <span className="text-[11px] bg-teal-500/30 border border-teal-400/40 text-teal-200 px-2 py-0.5 rounded-full backdrop-blur-xs font-medium">
                      In-Uniform &amp; Tool-Equipped
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 line-clamp-1">
                    Carries digital leak detectors, pressure jet cleaners &amp; 100% genuine replacement parts.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Instant Booking Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-5 sm:p-7 relative">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Instant Service Booking</h3>
                  <p className="text-xs text-slate-500">Pick issue &amp; reserve technician in 60 seconds</p>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Slots Today
                </span>
              </div>

              {/* Appliance selector tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-4">
                <button
                  type="button"
                  onClick={() => handleApplianceToggle('ac')}
                  className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedAppliance === 'ac'
                      ? 'bg-white text-teal-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <motion.span
                    animate={selectedAppliance === 'ac' ? { rotate: [0, -15, 15, 0] } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <Snowflake className="w-4 h-4 text-teal-600" />
                  </motion.span>
                  <span>Air Conditioner</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleApplianceToggle('washing_machine')}
                  className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedAppliance === 'washing_machine'
                      ? 'bg-white text-cyan-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <motion.span
                    animate={selectedAppliance === 'washing_machine' ? { rotate: 360 } : {}}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <RotateCw className="w-4 h-4 text-cyan-600" />
                  </motion.span>
                  <span>Washing Machine</span>
                </button>
              </div>

              <form onSubmit={handleQuickBookSubmit} className="space-y-4">
                {/* Brand selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Appliance Brand
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    {BRANDS[selectedAppliance].map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Common Service / Issue */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Service Required / Problem
                  </label>
                  <select
                    value={selectedIssue}
                    onChange={(e) => setSelectedIssue(e.target.value)}
                    className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    {currentIssues.map((issue) => (
                      <option key={issue.id} value={issue.id}>{issue.label}</option>
                    ))}
                  </select>
                </div>

                {/* Special assurance note */}
                <div className="bg-teal-50/70 border border-teal-100 rounded-lg p-3 text-xs text-teal-800 space-y-1">
                  <div className="flex items-center font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-teal-600 shrink-0" />
                    <span>Pay After Service Guarantee</span>
                  </div>
                  <p className="text-teal-700/90 text-[11px]">
                    No advance payment required. Inspect work first, pay via Cash, Card or UPI after satisfaction.
                  </p>
                </div>

                {/* CTA Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  id="hero-quick-book-btn"
                  className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-md shadow-teal-600/20 hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Book Appointment Online</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </motion.button>
              </form>

              <div className="mt-3 text-center">
                <span className="text-[11px] text-slate-500">
                  ⚡ Urgent breakdown? Call emergency line:{' '}
                  <a href="tel:+919876500123" className="font-semibold text-teal-700 hover:underline">
                    +91 98765 00123
                  </a>
                </span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Brand logos bar */}
        <div className="mt-14 pt-8 border-t border-slate-200/80">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold text-center mb-4">
            Authorized Multi-Brand Repair & Genuine OEM Spares For
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-400 font-bold text-sm">
            <span>LG</span>
            <span>•</span>
            <span>SAMSUNG</span>
            <span>•</span>
            <span>DAIKIN</span>
            <span>•</span>
            <span>BOSCH</span>
            <span>•</span>
            <span>VOLTAS</span>
            <span>•</span>
            <span>IFB</span>
            <span>•</span>
            <span>PANASONIC</span>
            <span>•</span>
            <span>WHIRLPOOL</span>
            <span>•</span>
            <span>CARRIER</span>
          </div>
        </div>
      </div>
    </section>
  );
};
