import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertCircle, 
  Snowflake, 
  RotateCw, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle, 
  ShieldAlert, 
  Sparkles,
  Search
} from 'lucide-react';
import { ApplianceType, SymptomGuide } from '../types';
import { SYMPTOM_GUIDES, SERVICES } from '../data/servicesData';
import { useCurrency } from '../hooks/useCurrency';

interface SymptomEstimatorProps {
  onBookRecommended: (appliance: ApplianceType, serviceId: string, symptomTitle: string) => void;
}

export const SymptomEstimator: React.FC<SymptomEstimatorProps> = ({ onBookRecommended }) => {
  const { convertPriceText } = useCurrency();
  const [activeAppliance, setActiveAppliance] = useState<ApplianceType>('ac');
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>(
    SYMPTOM_GUIDES.find(s => s.appliance === 'ac')?.id || ''
  );
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = SYMPTOM_GUIDES.filter((guide) => {
    if (guide.appliance !== activeAppliance) return false;
    if (searchQuery.trim() === '') return true;
    const query = searchQuery.toLowerCase();
    return (
      guide.symptom.toLowerCase().includes(query) ||
      guide.possibleCauses.some(c => c.toLowerCase().includes(query)) ||
      guide.recommendedServiceName.toLowerCase().includes(query)
    );
  });

  const selectedGuide = SYMPTOM_GUIDES.find(s => s.id === selectedSymptomId) || filteredGuides[0];

  const handleApplianceChange = (appliance: ApplianceType) => {
    setActiveAppliance(appliance);
    const firstOfAppliance = SYMPTOM_GUIDES.find(s => s.appliance === appliance);
    if (firstOfAppliance) {
      setSelectedSymptomId(firstOfAppliance.id);
    }
  };

  const getUrgencyBadge = (urgency: SymptomGuide['urgency']) => {
    switch (urgency) {
      case 'Emergency':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-900/50 text-red-300 border border-red-800">Critical / Emergency</span>;
      case 'High':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-900/50 text-amber-300 border border-amber-800">High Priority</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-900/50 text-blue-300 border border-blue-800">Moderate</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-800">Standard</span>;
    }
  };

  return (
    <section id="symptoms" className="py-16 bg-slate-800/60 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-cyan-900/50/70 border border-cyan-800 text-cyan-900 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-300" />
            <span>Smart Issue Troubleshooter & Cost Estimator</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Not Sure What&apos;s Wrong With Your Appliance?
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Select what you are noticing with your AC or washing machine to see probable causes, estimated repair charges, and recommended solution.
          </p>
        </div>

        {/* Appliance Switcher & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl w-full sm:w-auto shadow-2xs">
            <button
              onClick={() => handleApplianceChange('ac')}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-5 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeAppliance === 'ac'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Snowflake className="w-4 h-4" />
              <span>Air Conditioner Symptoms</span>
            </button>
            <button
              onClick={() => handleApplianceChange('washing_machine')}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-5 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeAppliance === 'washing_machine'
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <RotateCw className="w-4 h-4" />
              <span>Washing Machine Symptoms</span>
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search symptom (e.g. noise, leak, gas)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Two-Column Diagnostic Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Symptom Selector List */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Select Observed Issue:
            </span>
            {filteredGuides.map((guide) => {
              const isSelected = selectedGuide?.id === guide.id;
              return (
                <button
                  key={guide.id}
                  onClick={() => setSelectedSymptomId(guide.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-900 border-teal-500 shadow-md ring-2 ring-teal-500/20'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      {guide.appliance === 'ac' ? (
                        <Snowflake className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      ) : (
                        <RotateCw className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      )}
                      <span className="text-xs font-bold text-white leading-snug">
                        {guide.symptom}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {guide.possibleCauses.join(', ')}
                    </p>
                  </div>
                  <div className="shrink-0 pt-0.5">
                    {getUrgencyBadge(guide.urgency)}
                  </div>
                </button>
              );
            })}

            {filteredGuides.length === 0 && (
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-center text-xs text-slate-500">
                No matching symptoms found. Try another query or call our technician directly.
              </div>
            )}
          </div>

          {/* Right Column: Detailed Diagnostic & Estimation Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {selectedGuide ? (
                <motion.div 
                  key={selectedGuide.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-sm"
                >
                  
                  <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-5 mb-5">
                    <div>
                      <div className="flex items-center space-x-2 mb-1.5">
                        <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
                          {selectedGuide.appliance === 'ac' ? 'Air Conditioner Diagnosis' : 'Washing Machine Diagnosis'}
                        </span>
                        {getUrgencyBadge(selectedGuide.urgency)}
                      </div>
                      <h3 className="text-xl font-extrabold text-white">
                        {selectedGuide.symptom}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-400 block font-medium">Estimated Cost</span>
                      <span className="text-lg font-bold text-teal-300">{convertPriceText(selectedGuide.estimatedCostRange)}</span>
                    </div>
                  </div>

                  {/* Probable Root Causes */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-2 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 mr-1.5" />
                      Probable Root Causes:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedGuide.possibleCauses.map((cause, i) => (
                        <div key={i} className="flex items-center space-x-2 p-2.5 bg-slate-800/60 rounded-lg text-xs text-slate-300 border border-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                          <span>{cause}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Service Recommendation */}
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50/70 border border-teal-800 rounded-xl p-5 mb-6">
                    <div className="flex items-center space-x-2 text-xs font-bold text-teal-900 mb-1">
                      <Sparkles className="w-4 h-4 text-teal-400" />
                      <span>Recommended Professional Fix:</span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">
                      {selectedGuide.recommendedServiceName}
                    </h4>
                    <p className="text-xs text-slate-400 mb-4">
                      Our certified specialist will inspect the component, run electrical tests, and replace any defective parts using genuine manufacturer spares with a 90-day warranty.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-teal-800/60">
                      <div className="text-xs text-teal-300 flex items-center space-x-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Free visiting fee upon taking repair</span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onBookRecommended(
                          selectedGuide.appliance,
                          selectedGuide.recommendedServiceId,
                          selectedGuide.symptom
                        )}
                        className="inline-flex items-center space-x-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg shadow-sm hover:shadow-md transition-colors cursor-pointer"
                      >
                        <span>Book This Fix</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Safety advice */}
                  <div className="flex items-start space-x-2.5 text-xs text-slate-500 bg-slate-800/60 rounded-lg p-3">
                    <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Technician Tip:</strong> Avoid operating an appliance when you observe severe electrical sparks, persistent burning odors, or heavy water leakage on electrical sockets. Disconnect the main plug immediately.
                    </span>
                  </div>

                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
