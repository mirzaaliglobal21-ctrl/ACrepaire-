import React, { useState } from 'react';
import {
  Lock, MapPin, MessageSquare, X, LogOut,
  CheckCircle2, Eye, EyeOff, Shield, Wrench, Plus, Pencil, Trash2,
  ArrowLeft, RotateCcw
} from 'lucide-react';
import { getMapAddress, setMapAddress } from '../utils/mapSettings';
import { getWhatsAppNumber, setWhatsAppNumber, formatDisplayNumber } from '../utils/contactSettings';
import {
  getServices, addService, updateService, deleteService,
  isBuiltInService, resetServices
} from '../utils/servicesOverrides';
import { ApplianceType, ServiceItem } from '../types';

// Admin password. Only someone who knows this can open the control panel —
// everyone else just sees the site, with no edit controls at all.
const ADMIN_PASSWORD = '444123';

type Tab = 'location' | 'whatsapp' | 'services';

// Blank template for the "add new service" form.
const emptyServiceForm = {
  name: '',
  appliance: 'ac' as ApplianceType,
  category: '',
  startingPrice: '',
  duration: '',
  warranty: '',
  description: '',
  features: ''
};

type ServiceForm = typeof emptyServiceForm;

export const AdminControlPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('location');

  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState('');

  const [addressInput, setAddressInput] = useState(getMapAddress());
  const [numberInput, setNumberInput] = useState(formatDisplayNumber(getWhatsAppNumber()));

  // Services tab state
  const [services, setServices] = useState<ServiceItem[]>(getServices());
  const [serviceView, setServiceView] = useState<'list' | 'form'>('list');
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<ServiceForm>(emptyServiceForm);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const refreshServices = () => setServices(getServices());

  const openPanel = () => {
    setIsOpen(true);
    setError('');
    setSaved('');
    setAddressInput(getMapAddress());
    setNumberInput(formatDisplayNumber(getWhatsAppNumber()));
    refreshServices();
    setServiceView('list');
  };

  const closePanel = () => {
    setIsOpen(false);
    setPasswordInput('');
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthed(true);
      setError('');
      setPasswordInput('');
    } else {
      setError('Wrong password. Try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthed(false);
    closePanel();
  };

  const flashSaved = (label: string) => {
    setSaved(label);
    setTimeout(() => setSaved(''), 2200);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressInput.trim()) {
      setError('Address cannot be empty.');
      return;
    }
    setMapAddress(addressInput);
    setError('');
    flashSaved('Map location updated everywhere on the site.');
  };

  const handleSaveNumber = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = numberInput.replace(/[^\d]/g, '');
    if (digits.length < 8) {
      setError('Enter a valid number with country code, e.g. 971501234567.');
      return;
    }
    setWhatsAppNumber(digits);
    setNumberInput(formatDisplayNumber(digits));
    setError('');
    flashSaved('WhatsApp / call number updated everywhere on the site.');
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'location', label: 'Map', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { id: 'services', label: 'Services', icon: <Wrench className="w-3.5 h-3.5" /> }
  ];

  // ---- Services: add / edit / delete ----

  const openAddServiceForm = () => {
    setEditingServiceId(null);
    setServiceForm(emptyServiceForm);
    setError('');
    setServiceView('form');
  };

  const openEditServiceForm = (service: ServiceItem) => {
    setEditingServiceId(service.id);
    setServiceForm({
      name: service.name,
      appliance: service.appliance,
      category: service.category,
      startingPrice: String(service.startingPrice),
      duration: service.duration,
      warranty: service.warranty,
      description: service.description,
      features: service.features.join(', ')
    });
    setError('');
    setServiceView('form');
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseInt(serviceForm.startingPrice.replace(/[^\d]/g, ''), 10);

    if (!serviceForm.name.trim() || !serviceForm.category.trim()) {
      setError('Service name and category are required.');
      return;
    }
    if (Number.isNaN(price) || price <= 0) {
      setError('Enter a valid starting price.');
      return;
    }

    const payload = {
      name: serviceForm.name.trim(),
      appliance: serviceForm.appliance,
      category: serviceForm.category.trim(),
      startingPrice: price,
      duration: serviceForm.duration.trim() || '45 - 60 mins',
      warranty: serviceForm.warranty.trim() || '30-Day Service Guarantee',
      description: serviceForm.description.trim(),
      features: serviceForm.features
        .split(',')
        .map(f => f.trim())
        .filter(Boolean),
      iconName: 'Wrench'
    };

    if (editingServiceId) {
      updateService(editingServiceId, payload);
      flashSaved('Service updated.');
    } else {
      addService(payload);
      flashSaved('New service added.');
    }

    refreshServices();
    setError('');
    setServiceView('list');
  };

  const handleDeleteService = (id: string) => {
    deleteService(id);
    refreshServices();
    setConfirmDeleteId(null);
    flashSaved('Service removed.');
  };

  const handleResetServices = () => {
    resetServices();
    refreshServices();
    setConfirmDeleteId(null);
    flashSaved('Services reset to the original catalog.');
  };

  return (
    <>
      {/* Small, unobtrusive trigger — bottom-left so it never clashes with the
          WhatsApp / Book Repair buttons fixed at bottom-right. */}
      <button
        type="button"
        onClick={openPanel}
        title="Admin"
        className="fixed bottom-5 left-5 z-40 flex items-center space-x-1.5 h-10 px-3.5 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-teal-400 shadow-lg backdrop-blur-md transition-colors cursor-pointer"
      >
        <Lock className="w-4 h-4" />
        <span className="text-xs font-bold tracking-wide">Admin</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={closePanel} />

          <div className={`relative w-full ${isAuthed && activeTab === 'services' ? 'max-w-md' : 'max-w-sm'} bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 max-h-[90vh] overflow-y-auto`}>
            <button
              type="button"
              onClick={closePanel}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isAuthed ? (
              <>
                <div className="flex items-center space-x-2 mb-1">
                  <Shield className="w-5 h-5 text-teal-600" />
                  <h3 className="font-bold text-slate-900 text-lg">Admin Login</h3>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Enter the admin password to control the site's map, WhatsApp number and services.
                </p>

                <form onSubmit={handleLogin} className="space-y-3">
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Admin password"
                      autoFocus
                      className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 pr-10 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Login
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-teal-600" />
                    <h3 className="font-bold text-slate-900 text-lg">Admin Controls</h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    title="Logout"
                    className="text-slate-400 hover:text-red-500 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl mb-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => { setActiveTab(tab.id); setError(''); setServiceView('list'); }}
                      className={`flex items-center justify-center space-x-1.5 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        activeTab === tab.id ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {saved && (
                  <p className="text-xs text-emerald-600 font-medium flex items-center mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" /> {saved}
                  </p>
                )}

                {activeTab === 'location' && (
                  <form onSubmit={handleSaveAddress} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Map address / coordinates
                      </label>
                      <textarea
                        value={addressInput}
                        onChange={(e) => setAddressInput(e.target.value)}
                        rows={3}
                        placeholder="e.g. Al Aziziyah, Riyadh, Saudi Arabia"
                        className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">
                        Updates the map on the home page and contact section together.
                      </p>
                    </div>
                    {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      Save Location
                    </button>
                  </form>
                )}

                {activeTab === 'whatsapp' && (
                  <form onSubmit={handleSaveNumber} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        WhatsApp / call number
                      </label>
                      <input
                        type="text"
                        value={numberInput}
                        onChange={(e) => setNumberInput(e.target.value)}
                        placeholder="+971 50 123 4567"
                        className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">
                        Include the country code. This number receives every "Book / WhatsApp Help" chat and every call button on the site.
                      </p>
                    </div>
                    {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      Save Number
                    </button>
                  </form>
                )}

                {activeTab === 'services' && serviceView === 'list' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] text-slate-400">
                        {services.length} service{services.length !== 1 ? 's' : ''} live on the site right now.
                      </p>
                      <button
                        type="button"
                        onClick={handleResetServices}
                        title="Reset all services to the original catalog"
                        className="flex items-center space-x-1 text-[11px] text-slate-400 hover:text-red-500 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset all</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={openAddServiceForm}
                      className="w-full flex items-center justify-center space-x-1.5 py-2.5 px-4 bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold text-xs rounded-xl border border-dashed border-teal-300 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Service</span>
                    </button>

                    <div className="space-y-2 max-h-[45vh] overflow-y-auto pr-1">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className="flex items-center justify-between gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-800 truncate">{service.name}</p>
                            <p className="text-[11px] text-slate-500">
                              {service.appliance === 'ac' ? 'AC' : 'Washing Machine'} · ₹{service.startingPrice.toLocaleString('en-IN')}
                              {!isBuiltInService(service.id) && (
                                <span className="ml-1 text-teal-600 font-semibold">· Custom</span>
                              )}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => openEditServiceForm(service)}
                              title="Edit"
                              className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 cursor-pointer"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            {confirmDeleteId === service.id ? (
                              <button
                                type="button"
                                onClick={() => handleDeleteService(service.id)}
                                title="Confirm delete"
                                className="text-[10px] font-bold text-white bg-red-600 hover:bg-red-700 px-2 py-1.5 rounded-lg cursor-pointer"
                              >
                                Confirm?
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(service.id)}
                                title="Delete"
                                className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'services' && serviceView === 'form' && (
                  <form onSubmit={handleSaveService} className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => { setServiceView('list'); setError(''); }}
                      className="flex items-center space-x-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 mb-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>Back to list</span>
                    </button>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Service name</label>
                      <input
                        type="text"
                        value={serviceForm.name}
                        onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                        placeholder="e.g. AC Deep Cleaning"
                        className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Appliance</label>
                        <select
                          value={serviceForm.appliance}
                          onChange={(e) => setServiceForm({ ...serviceForm, appliance: e.target.value as ApplianceType })}
                          className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        >
                          <option value="ac">AC</option>
                          <option value="washing_machine">Washing Machine</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Starting price (₹)</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={serviceForm.startingPrice}
                          onChange={(e) => setServiceForm({ ...serviceForm, startingPrice: e.target.value })}
                          placeholder="599"
                          className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                      <input
                        type="text"
                        value={serviceForm.category}
                        onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                        placeholder="e.g. Maintenance & Cleaning"
                        className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Duration</label>
                        <input
                          type="text"
                          value={serviceForm.duration}
                          onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                          placeholder="45 - 60 mins"
                          className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Warranty</label>
                        <input
                          type="text"
                          value={serviceForm.warranty}
                          onChange={(e) => setServiceForm({ ...serviceForm, warranty: e.target.value })}
                          placeholder="30-Day Guarantee"
                          className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                      <textarea
                        value={serviceForm.description}
                        onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                        rows={2}
                        placeholder="Short description shown on the service card"
                        className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Features <span className="font-normal text-slate-400">(comma separated)</span>
                      </label>
                      <textarea
                        value={serviceForm.features}
                        onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                        rows={2}
                        placeholder="Indoor & outdoor cleaning, Filter wash, Airflow check"
                        className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                      />
                    </div>

                    {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      {editingServiceId ? 'Save Changes' : 'Add Service'}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
