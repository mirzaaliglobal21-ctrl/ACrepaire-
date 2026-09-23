import React, { useState } from 'react';
import {
  Lock, MapPin, MessageSquare, DollarSign, X, LogOut,
  CheckCircle2, Eye, EyeOff, Shield
} from 'lucide-react';
import { getMapAddress, setMapAddress } from '../utils/mapSettings';
import { getWhatsAppNumber, setWhatsAppNumber, formatDisplayNumber } from '../utils/contactSettings';
import { getCurrency, setCurrency, CurrencyCode } from '../utils/currencySettings';

// Admin password. Only someone who knows this can open the control panel —
// everyone else just sees the site, with no edit controls at all.
const ADMIN_PASSWORD = '444123';

type Tab = 'location' | 'whatsapp' | 'currency';

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
  const [currencyInput, setCurrencyInput] = useState<CurrencyCode>(getCurrency());

  const openPanel = () => {
    setIsOpen(true);
    setError('');
    setSaved('');
    setAddressInput(getMapAddress());
    setNumberInput(formatDisplayNumber(getWhatsAppNumber()));
    setCurrencyInput(getCurrency());
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

  const handleSaveCurrency = (value: CurrencyCode) => {
    setCurrencyInput(value);
    setCurrency(value);
    flashSaved(value === 'AED' ? 'Prices now show in Dirham (AED).' : 'Prices now show in Rupees (₹).');
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'location', label: 'Map', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { id: 'currency', label: 'Currency', icon: <DollarSign className="w-3.5 h-3.5" /> }
  ];

  return (
    <>
      {/* Small, unobtrusive trigger — bottom-left so it never clashes with the
          WhatsApp / Book Repair buttons fixed at bottom-right. */}
      <button
        type="button"
        onClick={openPanel}
        title="Admin"
        className="fixed bottom-5 left-5 z-40 w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-teal-400 shadow-lg backdrop-blur-md transition-colors cursor-pointer"
      >
        <Lock className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={closePanel} />

          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 max-h-[90vh] overflow-y-auto">
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
                  Enter the admin password to control the site's map, WhatsApp number and pricing currency.
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
                      onClick={() => { setActiveTab(tab.id); setError(''); }}
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

                {activeTab === 'currency' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Prices shown to customers
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleSaveCurrency('INR')}
                        className={`py-3 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                          currencyInput === 'INR'
                            ? 'bg-teal-600 text-white border-teal-600 shadow-md'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-teal-300'
                        }`}
                      >
                        ₹ Rupees (INR)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveCurrency('AED')}
                        className={`py-3 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                          currencyInput === 'AED'
                            ? 'bg-teal-600 text-white border-teal-600 shadow-md'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-teal-300'
                        }`}
                      >
                        Dhs Dirham (AED)
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Switches every price shown on the site — services, estimates, bookings and receipts.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
