import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Snowflake, 
  RotateCw, 
  Check, 
  Clock, 
  ShieldCheck, 
  Wrench, 
  Info, 
  X, 
  Droplets, 
  Wind, 
  Gauge, 
  Cpu, 
  Sparkles, 
  Volume2, 
  Droplet, 
  CheckCircle 
} from 'lucide-react';
import { ServiceItem, ApplianceType } from '../types';
import { SERVICES } from '../data/servicesData';
import { useCurrency } from '../hooks/useCurrency';

interface ServiceCatalogProps {
  onSelectServiceToBook: (service: ServiceItem) => void;
  initialApplianceFilter?: ApplianceType | 'all';
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  onSelectServiceToBook,
  initialApplianceFilter = 'all'
}) => {
  const { formatPrice } = useCurrency();
  const [applianceFilter, setApplianceFilter] = useState<ApplianceType | 'all'>(initialApplianceFilter);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [detailModalService, setDetailModalService] = useState<ServiceItem | null>(null);

  // Icon mapping
  const renderIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-teal-400" };
    switch (iconName) {
      case 'Wind': return <Wind {...props} />;
      case 'Gauge': return <Gauge {...props} />;
      case 'Snowflake': return <Snowflake {...props} />;
      case 'Droplets': return <Droplets {...props} />;
      case 'Wrench': return <Wrench {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'RotateCw': return <RotateCw {...props} />;
      case 'Volume2': return <Volume2 {...props} />;
      case 'Droplet': return <Droplet {...props} />;
      default: return <CheckCircle {...props} />;
    }
  };

  const filteredServices = SERVICES.filter((service) => {
    if (applianceFilter !== 'all' && service.appliance !== applianceFilter) {
      return false;
    }
    if (selectedCategory !== 'all' && service.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const categories = [
    'all',
    ...Array.from(
      new Set(
        SERVICES
          .filter(s => applianceFilter === 'all' || s.appliance === applianceFilter)
          .map(s => s.category)
      )
    )
  ];

  return (
    <section id="services" className="py-16 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 bg-teal-900/40 border border-teal-800 text-teal-300 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <Wrench className="w-3.5 h-3.5 text-teal-400" />
            <span>Certified Diagnostic & Repair Catalog</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Complete AC & Washing Machine Services
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            All services include doorstep inspection, genuine replacement parts, dedicated testing, and 90-day warranty.
          </p>
        </div>

        {/* Appliance Filter Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="inline-flex p-1 bg-slate-800 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => {
                setApplianceFilter('all');
                setSelectedCategory('all');
              }}
              className={`flex-1 sm:flex-initial px-5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                applianceFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Services ({SERVICES.length})
            </button>
            <button
              onClick={() => {
                setApplianceFilter('ac');
                setSelectedCategory('all');
              }}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                applianceFilter === 'ac'
                  ? 'bg-slate-900 text-teal-300 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Snowflake className="w-3.5 h-3.5 text-teal-400" />
              <span>Air Conditioner</span>
            </button>
            <button
              onClick={() => {
                setApplianceFilter('washing_machine');
                setSelectedCategory('all');
              }}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                applianceFilter === 'washing_machine'
                  ? 'bg-slate-900 text-cyan-300 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Washing Machine</span>
            </button>
          </div>

          {/* Subcategory Pills */}
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto justify-start sm:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors capitalize cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-teal-300 transition-colors p-5 flex flex-col justify-between hover:shadow-lg relative group"
              >
                {service.popular && (
                  <span className="absolute top-4 right-4 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs z-10">
                    Most Booked
                  </span>
                )}

                <div>
                  {service.imageUrl && (
                    <div className="mb-3.5 rounded-xl overflow-hidden h-36 bg-slate-800 relative border border-slate-800">
                      <img 
                        src={service.imageUrl} 
                        alt={service.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Header Icon + Category */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-900/40 border border-teal-100 flex items-center justify-center shrink-0">
                      {renderIcon(service.iconName)}
                    </div>
                    <div>
                      <span className="inline-block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        {service.category}
                      </span>
                      <span className="mx-1 text-slate-300">•</span>
                      <span className="text-[11px] font-medium text-teal-300">
                        {service.appliance === 'ac' ? 'Air Conditioner' : 'Washing Machine'}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-white text-base mb-2 group-hover:text-teal-300 transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features checklist */}
                  <div className="space-y-1.5 mb-5 border-t border-slate-800 pt-3">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-start text-xs text-slate-300 space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="border-t border-slate-800 pt-4 mt-auto">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <div className="flex items-center text-slate-500">
                      <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center text-teal-300 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                      <span>{service.warranty}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Starting from</span>
                      <span className="text-xl font-extrabold text-white">{formatPrice(service.startingPrice)}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setDetailModalService(service)}
                        className="p-2 text-slate-500 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="View Scope Details"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => onSelectServiceToBook(service)}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg shadow-2xs hover:shadow-xs transition-colors cursor-pointer"
                      >
                        Book Service
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Detailed Service Scope Modal */}
        <AnimatePresence>
          {detailModalService && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
              >
                <button
                  onClick={() => setDetailModalService(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-300 hover:bg-slate-800 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {detailModalService.imageUrl && (
                  <div className="mb-4 rounded-xl overflow-hidden h-44 bg-slate-800 relative border border-slate-800">
                    <img 
                      src={detailModalService.imageUrl} 
                      alt={detailModalService.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-900/40 border border-teal-100 flex items-center justify-center">
                    {renderIcon(detailModalService.iconName)}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
                      {detailModalService.appliance === 'ac' ? 'Air Conditioner' : 'Washing Machine'}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {detailModalService.name}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  {detailModalService.description}
                </p>

                <div className="bg-slate-800/60 rounded-xl p-4 mb-4 border border-slate-800">
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-2">
                    What is included in this service:
                  </h4>
                  <div className="space-y-2">
                    {detailModalService.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start text-xs text-slate-300 space-x-2">
                        <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
                  <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block mb-0.5">Estimated Duration</span>
                    <span className="font-bold text-slate-100">{detailModalService.duration}</span>
                  </div>
                  <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block mb-0.5">Service Warranty</span>
                    <span className="font-bold text-teal-300">{detailModalService.warranty}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Standard Price</span>
                    <span className="text-2xl font-black text-white">{formatPrice(detailModalService.startingPrice)}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      const svc = detailModalService;
                      setDetailModalService(null);
                      onSelectServiceToBook(svc);
                    }}
                    className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    Proceed to Book
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
