/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceCatalog } from './components/ServiceCatalog';
import { SymptomEstimator } from './components/SymptomEstimator';
import { BookingWizard } from './components/BookingWizard';
import { BookingTracker } from './components/BookingTracker';
import { BookingSuccessModal } from './components/BookingSuccessModal';
import { ReviewsAndTrust } from './components/ReviewsAndTrust';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ApplianceType, Booking, ServiceItem } from './types';
import { getStoredBookings } from './utils/bookingStorage';
import { useContactNumber } from './hooks/useContactNumber';
import { buildWhatsAppUrl } from './utils/contactSettings';
import { AdminControlPanel } from './components/AdminControlPanel';
import { Phone, MessageSquare, CalendarCheck, Search } from 'lucide-react';

export default function App() {
  const contactNumber = useContactNumber();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Booking Wizard states
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardAppliance, setWizardAppliance] = useState<ApplianceType>('ac');
  const [wizardServiceId, setWizardServiceId] = useState<string | undefined>(undefined);
  const [wizardBrand, setWizardBrand] = useState<string | undefined>(undefined);
  const [wizardSymptom, setWizardSymptom] = useState<string | undefined>(undefined);

  // Success Confirmation Modal
  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);

  // Tracker target
  const [trackerBookingId, setTrackerBookingId] = useState<string | undefined>(undefined);

  // Initial load of stored bookings
  useEffect(() => {
    const loaded = getStoredBookings();
    setBookings(loaded);
  }, []);

  const handleNavigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open booking wizard with custom configuration
  const handleOpenBooking = (
    appliance: ApplianceType = 'ac',
    serviceId?: string,
    brand?: string,
    symptom?: string
  ) => {
    setWizardAppliance(appliance);
    setWizardServiceId(serviceId);
    setWizardBrand(brand);
    setWizardSymptom(symptom);
    setIsWizardOpen(true);
  };

  const handleSelectServiceToBook = (service: ServiceItem) => {
    handleOpenBooking(service.appliance, service.id);
  };

  const handleBookFromSymptom = (appliance: ApplianceType, serviceId: string, symptomTitle: string) => {
    handleOpenBooking(appliance, serviceId, undefined, symptomTitle);
  };

  const handleBookingCreated = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev.filter(b => b.id !== newBooking.id)]);
    setLatestBooking(newBooking);
  };

  const handleOpenTrackerForBooking = (bookingId: string) => {
    setTrackerBookingId(bookingId);
    handleNavigateToSection('tracker');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-teal-500 selection:text-white flex flex-col">
      {/* Top Sticky Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking('ac')}
        onNavigateToSection={handleNavigateToSection}
        activeSection={activeSection}
        myBookingsCount={bookings.length}
        onOpenTracker={() => {
          if (bookings.length > 0) {
            setTrackerBookingId(bookings[0].id);
          }
          handleNavigateToSection('tracker');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section with Quick Booking Widget */}
        <Hero
          onQuickBook={(appliance, serviceId, brand) => {
            handleOpenBooking(appliance, serviceId, brand);
          }}
          onExploreServices={(appliance) => {
            handleNavigateToSection('services');
          }}
        />

        {/* Services Catalog with Filter Tabs */}
        <ServiceCatalog
          onSelectServiceToBook={handleSelectServiceToBook}
        />

        {/* Diagnostic Symptom & Cost Estimator */}
        <SymptomEstimator
          onBookRecommended={handleBookFromSymptom}
        />

        {/* Real-Time Booking Status Tracker */}
        <BookingTracker
          bookings={bookings}
          onBookingsChange={setBookings}
          initialSearchId={trackerBookingId}
        />

        {/* Trust Badges, Why Us & Verified Customer Reviews */}
        <ReviewsAndTrust />

        {/* Contact Form, Store Info, Emergency Help & FAQs */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onSelectApplianceService={(appliance) => {
          handleOpenBooking(appliance);
        }}
        onOpenBooking={() => handleOpenBooking('ac')}
      />

      {/* Modal: Interactive Online Booking Wizard */}
      <BookingWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onBookingSuccess={handleBookingCreated}
        preselectedAppliance={wizardAppliance}
        preselectedServiceId={wizardServiceId}
        preselectedBrand={wizardBrand}
        preselectedSymptom={wizardSymptom}
      />

      {/* Modal: Instant Booking Confirmation & Digital Job Card */}
      <BookingSuccessModal
        booking={latestBooking}
        onClose={() => setLatestBooking(null)}
        onOpenTrackerForBooking={handleOpenTrackerForBooking}
      />

      {/* Floating Action Quick Access (Mobile & Desktop) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end space-y-2.5">
        <a
          href={buildWhatsAppUrl(contactNumber, 'Hello CoolClean, I need repair service for my AC or Washing Machine')}
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-2 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full shadow-lg transition-transform hover:scale-105"
          title="WhatsApp Support"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp Help</span>
        </a>

        <button
          onClick={() => handleOpenBooking('ac')}
          className="flex items-center space-x-2 px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-full shadow-xl transition-transform hover:scale-105 cursor-pointer ring-4 ring-teal-500/20"
          id="floating-book-service-btn"
        >
          <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Book Repair</span>
        </button>
      </div>

      {/* Admin Control Panel (password gated) */}
      <AdminControlPanel />
    </div>
  );
}
