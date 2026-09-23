export type ApplianceType = 'ac' | 'washing_machine';

export interface ServiceItem {
  id: string;
  appliance: ApplianceType;
  category: string;
  name: string;
  description: string;
  duration: string;
  startingPrice: number;
  popular?: boolean;
  warranty: string;
  features: string[];
  iconName: string;
  imageUrl?: string;
}

export type BookingStatus = 'confirmed' | 'technician_assigned' | 'in_transit' | 'in_progress' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  createdAt: string;
  appliance: ApplianceType;
  applianceCategory: string; // e.g. "Split AC", "Front Load"
  brand: string;
  serviceId: string;
  serviceName: string;
  issueDescription?: string;
  symptoms?: string[];
  date: string;
  timeSlot: string;
  isEmergency?: boolean;
  
  // Customer details
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  landmark?: string;
  pincode: string;
  
  // Financial & status
  estimatedPrice: number;
  paymentMethod: 'pay_after_service' | 'online';
  status: BookingStatus;
  technician?: {
    name: string;
    phone: string;
    rating: number;
    experience: string;
    arrivalEstimate?: string;
  };
}

export interface SymptomGuide {
  id: string;
  appliance: ApplianceType;
  symptom: string;
  possibleCauses: string[];
  recommendedServiceId: string;
  recommendedServiceName: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Emergency';
  estimatedCostRange: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'ac' | 'washing_machine' | 'pricing' | 'warranty';
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  appliance: ApplianceType;
  service: string;
  comment: string;
}
