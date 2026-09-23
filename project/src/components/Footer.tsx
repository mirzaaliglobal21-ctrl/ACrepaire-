import React from 'react';
import { 
  Snowflake, 
  RotateCw, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ArrowUp,
  Clock
} from 'lucide-react';
import { ApplianceType } from '../types';
import { useContactNumber } from '../hooks/useContactNumber';
import { useCurrency } from '../hooks/useCurrency';
import { buildTelUrl, formatDisplayNumber } from '../utils/contactSettings';

interface FooterProps {
  onSelectApplianceService: (appliance: ApplianceType) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectApplianceService, onOpenBooking }) => {
  const contactNumber = useContactNumber();
  const { convertPriceText } = useCurrency();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <div className="relative">
                  <Snowflake className="w-5 h-5 text-white" />
                  <RotateCw className="w-3.5 h-3.5 text-teal-100 absolute -bottom-1 -right-1" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-base text-white tracking-tight">
                  COOL&amp;CLEAN REPAIR
                </span>
                <p className="text-[11px] text-teal-400 font-medium">AC &amp; Washing Machine Specialists</p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Your neighborhood&apos;s trusted appliance repair experts. We provide verified technicians, 100% genuine replacement spare parts, transparent upfront pricing, and a solid 90-day peace-of-mind warranty.
            </p>

            <div className="space-y-2 pt-1 text-slate-300">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={buildTelUrl(contactNumber)} className="hover:text-white transition-colors">
                  Helpline: {formatDisplayNumber(contactNumber)} / 1800-419-COOL
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Mon - Sun: 8:00 AM - 9:00 PM (Emergency 24/7)</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Shop #14, Central Market, Metro Pillar 421</span>
              </div>
            </div>
          </div>

          {/* AC Services Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              AC Services
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onSelectApplianceService('ac')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Deep Foam Jet Wash ({convertPriceText('₹599')})
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectApplianceService('ac')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Gas Leak &amp; Freon Refilling
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectApplianceService('ac')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  AC Not Cooling / Fan Motor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectApplianceService('ac')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Indoor Water Leakage Fix
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectApplianceService('ac')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  AC Installation &amp; Relocation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectApplianceService('ac')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Inverter PCB Board Repair
                </button>
              </li>
            </ul>
          </div>

          {/* Washing Machine Services Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Washing Machine
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onSelectApplianceService('washing_machine')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Drum Descaling &amp; Jet Wash
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectApplianceService('washing_machine')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Not Draining / OE Error Fix
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectApplianceService('washing_machine')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Spin Cycle Noise &amp; Bearings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectApplianceService('washing_machine')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Water Inlet Valve Replacement
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectApplianceService('washing_machine')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Main PCB &amp; Motor Repair
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectApplianceService('washing_machine')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Installation &amp; Tap Fitting
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Booking & Guarantee */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Our Guarantee
            </h4>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-2 text-[11px]">
              <div className="flex items-center space-x-1.5 text-teal-400 font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>90-Day Protection</span>
              </div>
              <p className="text-slate-400">
                Any recurring issue within the warranty window is inspected and resolved at zero extra cost.
              </p>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 px-3 bg-teal-600 hover:bg-teal-500 font-bold text-white rounded-lg text-xs transition-colors cursor-pointer text-center block shadow-sm"
            >
              Book Service Online
            </button>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Cool&amp;Clean AC &amp; Washing Machine Repair Services. All rights reserved.
          </div>

          <div className="flex items-center space-x-4">
            <span>Doorstep Service across all Zones</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1 text-teal-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
