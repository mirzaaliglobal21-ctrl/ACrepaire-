import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Clock, 
  Award, 
  Sparkles, 
  Star, 
  CheckCircle, 
  ThumbsUp, 
  Snowflake, 
  RotateCw,
  Users,
  Check,
  PackageCheck
} from 'lucide-react';
import { REVIEWS } from '../data/servicesData';
import { ApplianceType } from '../types';
import { useCurrency } from '../hooks/useCurrency';
import genuinePartsImg from '../assets/images/genuine_appliance_parts_1790082058274.jpg';

export const ReviewsAndTrust: React.FC = () => {
  const { convertPriceText } = useCurrency();
  const [filterAppliance, setFilterAppliance] = useState<ApplianceType | 'all'>('all');

  const filteredReviews = REVIEWS.filter(
    r => filterAppliance === 'all' || r.appliance === filterAppliance
  );

  return (
    <section id="why-us" className="py-16 bg-slate-800/60 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Why Choose Us Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-teal-900/40 border border-teal-800 text-teal-300 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <Award className="w-3.5 h-3.5 text-teal-400" />
            <span>The Gold Standard in Home Appliance Repair</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Why Thousands of Families Trust Our Specialists
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            We deliver the cleanest, fastest, and most reliable AC and washing machine repairs with complete transparency.
          </p>
        </div>

        {/* 6 Key Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-teal-900/40 border border-teal-100 flex items-center justify-center text-teal-400 mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1.5">
              Rapid 45-Min Doorstep Dispatch
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Equipped mobile response units ready across your city. Scheduled appointments arrive exactly on time without waiting all day.
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-teal-900/40 border border-teal-100 flex items-center justify-center text-teal-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1.5">
              90-Day Free Replacement Warranty
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every part installed and every repair performed is protected by our written 90-day guarantee. If an issue recurs, we fix it free.
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-teal-900/40 border border-teal-100 flex items-center justify-center text-teal-400 mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1.5">
              100% Original Genuine OEM Spares
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No cheap duplicate components. We source brand-authorized compressors, capacitors, PCB boards, drain pumps, and bearings.
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-teal-900/40 border border-teal-100 flex items-center justify-center text-teal-400 mb-4">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1.5">
              Pay After Full Satisfaction
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero advance payment or deposit. Inspect the cooling or wash cycle with the technician, confirm the fix, and pay via Cash or UPI.
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-teal-900/40 border border-teal-100 flex items-center justify-center text-teal-400 mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1.5">
              Background-Verified Senior Engineers
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Police background-checked, trained, and certified HVAC & appliance technicians with at least 5+ years of hands-on experience.
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-teal-900/40 border border-teal-100 flex items-center justify-center text-teal-400 mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1.5">
              No-Mess Cleanliness Guarantee
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Technicians carry protective water catcher jackets, floor mats, and cleaning towels. We leave your walls and floors spotless.
            </p>
          </div>
        </div>

        {/* AI Generated Genuine Parts & Equipment Spotlight Banner */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-6 sm:p-8">
              <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-teal-300 bg-teal-900/40 border border-teal-800 px-3 py-1 rounded-full mb-3">
                <PackageCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Zero Duplicate Policy</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white tracking-tight mb-3">
                100% Genuine Brand OEM Spare Parts &amp; Diagnostic Bench
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                Cheap replica components are the #1 cause of recurring breakdowns and compressor burnouts. We strictly install factory-sealed genuine spares sourced directly from brand authorized distributors with manufacturer serial seals.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Heavy-gauge 100% pure copper tubing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Original Inverter PCB micro-controllers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>High-speed SKF waterproof drum bearings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero-residue pure Freon R32 &amp; R410A gas</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-64 sm:h-72 lg:h-full min-h-[260px] overflow-hidden bg-slate-800">
              <img 
                src="/images/genuine-parts.jpg" 
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = genuinePartsImg;
                }}
                alt="Genuine OEM Air Conditioner and Washing Machine Spare Parts on technician work bench"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full border border-slate-700">
                90-Day Parts Replacement Guarantee
              </div>
            </div>
          </div>
        </div>

        {/* Live Metrics Counter Bar */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-16 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-400">15,400+</div>
              <div className="text-xs text-slate-400 mt-1">Appliances Repaired</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-400">4.9 / 5.0</div>
              <div className="text-xs text-slate-400 mt-1">Google & Customer Rating</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-400">98.4%</div>
              <div className="text-xs text-slate-400 mt-1">First-Visit Resolution</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-400">45 Mins</div>
              <div className="text-xs text-slate-400 mt-1">Average Response Time</div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div id="reviews">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white">
                Verified Customer Experiences
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Authentic feedback from real homeowners and office managers.
              </p>
            </div>

            <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold shadow-2xs">
              <button
                onClick={() => setFilterAppliance('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  filterAppliance === 'all'
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Reviews
              </button>
              <button
                onClick={() => setFilterAppliance('ac')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center space-x-1 ${
                  filterAppliance === 'ac'
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Snowflake className="w-3.5 h-3.5" />
                <span>AC Reviews</span>
              </button>
              <button
                onClick={() => setFilterAppliance('washing_machine')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center space-x-1 ${
                  filterAppliance === 'washing_machine'
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Washing Machine</span>
              </button>
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((rev) => (
                <motion.div
                  key={rev.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ y: -3, transition: { duration: 0.15 } }}
                  className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      &ldquo;{convertPriceText(rev.comment)}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{rev.name}</div>
                      <div className="text-slate-400 text-[11px]">{rev.location}</div>
                    </div>

                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-800 text-slate-300">
                      {rev.service}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
