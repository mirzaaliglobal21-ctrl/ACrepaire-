import { ServiceItem, SymptomGuide, FAQItem, CustomerReview, Booking } from '../types';
import acFoamJetImg from '../assets/images/ac_foam_jet_service_1790082020099.jpg';
import washingMachineRepairImg from '../assets/images/washing_machine_repair_1790082038711.jpg';
import genuinePartsImg from '../assets/images/genuine_appliance_parts_1790082058274.jpg';

export const BRANDS = {
  ac: ['LG', 'Samsung', 'Daikin', 'Voltas', 'Hitachi', 'Carrier', 'Panasonic', 'Blue Star', 'Godrej', 'Whirlpool', 'O General', 'Lloyd', 'Other Brand'],
  washing_machine: ['LG', 'Samsung', 'Bosch', 'IFB', 'Whirlpool', 'Haier', 'Panasonic', 'Godrej', 'Siemens', 'Videocon', 'Kelvinator', 'Other Brand']
};

export const APPLIANCE_SUBTYPES = {
  ac: ['Split AC (1 - 2 Ton)', 'Window AC', 'Inverter Split AC', 'Cassette / Commercial AC'],
  washing_machine: ['Front Load Automatic', 'Top Load Automatic', 'Semi-Automatic Twin Tub', 'Washer Dryer Combo']
};

export const TIME_SLOTS = [
  '08:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
  '06:00 PM - 08:00 PM'
];

export const SERVICES: ServiceItem[] = [
  // AIR CONDITIONER SERVICES
  {
    id: 'ac-foam-jet-service',
    appliance: 'ac',
    category: 'Maintenance & Cleaning',
    name: 'Power Jet Chemical Foam Wash',
    description: 'High-pressure 2x power jet cleaning of cooling coil, blower, drain tray, and outdoor condenser unit with eco-friendly antibacterial foam.',
    duration: '45 - 60 mins',
    startingPrice: 599,
    popular: true,
    warranty: '30-Day Service Guarantee',
    imageUrl: '/images/ac-service.jpg',
    features: [
      'Indoor & Outdoor deep pressure jet wash',
      'Anti-fungal & deodorizing foam treatment',
      'Drainage pipe flushing & clog clearance',
      'Pre & Post airflow and temperature check'
    ],
    iconName: 'Wind'
  },
  {
    id: 'ac-gas-charging',
    appliance: 'ac',
    category: 'Gas & Cooling',
    name: 'Gas Leak Detection & Full Gas Charging',
    description: 'Complete nitrogen pressure test to find micro-leaks, brazing repair, vacuuming, and 100% genuine Freon (R32 / R410A / R22) refilling.',
    duration: '60 - 90 mins',
    startingPrice: 1850,
    popular: true,
    warranty: '90-Day Gas & Leakage Warranty',
    imageUrl: '/images/genuine-parts.jpg',
    features: [
      'Electronic & soap bubble leak diagnosis',
      'Copper tube brazing & flare tightening',
      'Deep digital micron vacuumization',
      'Accurate cylinder weighing scale charging'
    ],
    iconName: 'Gauge'
  },
  {
    id: 'ac-not-cooling-repair',
    appliance: 'ac',
    category: 'Repair & Diagnostics',
    name: 'No Cooling / Weak Airflow Diagnosis & Fix',
    description: 'Comprehensive electrical, compressor, capacitor, thermostat, and fan motor troubleshooting to restore freezing-cold airflow.',
    duration: '45 mins',
    startingPrice: 349,
    popular: false,
    warranty: '90-Day Replacement Warranty',
    features: [
      'Compressor running current (Ampere) test',
      'Capacitor & contactor health inspection',
      'Thermostat & temperature sensor calibration',
      'Free inspection fee if repair approved'
    ],
    iconName: 'Snowflake'
  },
  {
    id: 'ac-water-leakage',
    appliance: 'ac',
    category: 'Repair & Diagnostics',
    name: 'Indoor Unit Water Dripping & Leakage Fix',
    description: 'Permanent solution for water spilling on walls or floors due to blocked drainage, misaligned tray, or frozen evaporator coils.',
    duration: '35 - 50 mins',
    startingPrice: 399,
    popular: false,
    warranty: '60-Day Leakage Guarantee',
    features: [
      'High-pressure drain line unclogging',
      'Indoor unit leveling & slope adjustment',
      'Drain pan crack sealing / replacement',
      'Insulation tube re-wrapping'
    ],
    iconName: 'Droplets'
  },
  {
    id: 'ac-installation-uninstallation',
    appliance: 'ac',
    category: 'Installation',
    name: 'AC Installation / Relocation / Dismantling',
    description: 'Professional wall bracket mounting, core drilling, copper pipe flaring, outdoor stand installation, and complete vacuum commissioning.',
    duration: '90 - 120 mins',
    startingPrice: 999,
    popular: false,
    warranty: '180-Day Installation Guarantee',
    features: [
      'Heavy-duty vibration-free wall bracket setup',
      'Precise copper piping & nitrogen leak check',
      'Proper electrical wiring with MCB protection',
      'Full test run with thermal scan'
    ],
    iconName: 'Wrench'
  },
  {
    id: 'ac-pcb-inverter-repair',
    appliance: 'ac',
    category: 'Electronics',
    name: 'Inverter PCB Board & Sensor Board Repair',
    description: 'Micro-soldering, IPM module replacement, microcontroller repair, and error code fixes (e.g. E1, CH05, F3, EC) for all inverter models.',
    duration: '2 - 24 hours',
    startingPrice: 1200,
    popular: false,
    warranty: '90-Day PCB Circuit Warranty',
    features: [
      'Component-level board diagnostics',
      'Replacement with 100% genuine IC chips',
      'Surge damage protection review',
      'Outdoor inverter mother-board testing'
    ],
    iconName: 'Cpu'
  },

  // WASHING MACHINE SERVICES
  {
    id: 'wm-deep-cleaning-descaling',
    appliance: 'washing_machine',
    category: 'Maintenance & Cleaning',
    name: 'Deep Machine Drum Jet Wash & Tub Descaling',
    description: 'Thorough dismantling and chemical descaling of the inner drum, outer tub, door gasket rubber seal, detergent dispenser, and drain filter.',
    duration: '45 - 60 mins',
    startingPrice: 649,
    popular: true,
    warranty: '30-Day Freshness Guarantee',
    imageUrl: '/images/washing-machine-repair.jpg',
    features: [
      'Removes stubborn calcium limescale & sludge',
      'Eliminates foul mildew odors & bacteria',
      'Pressure wash of detergent tray & lint filter',
      'Gasket rubber mold removal treatment'
    ],
    iconName: 'Sparkles'
  },
  {
    id: 'wm-spin-drain-issue',
    appliance: 'washing_machine',
    category: 'Drain & Spin',
    name: 'Not Draining / Not Spinning Repair',
    description: 'Fixes water remaining in drum, OE/5E error codes, clogged drain pumps, broken drive belts, or lid-lock switch faults.',
    duration: '45 - 60 mins',
    startingPrice: 399,
    popular: true,
    warranty: '90-Day Parts & Service Warranty',
    features: [
      'Drain pump motor inspection & debris cleaning',
      'Drive belt tensioning or replacement',
      'Electronic door latch & safety lock repair',
      'Pressure sensor tube clearing'
    ],
    iconName: 'RotateCw'
  },
  {
    id: 'wm-noise-drum-bearing',
    appliance: 'washing_machine',
    category: 'Mechanical',
    name: 'Violent Vibration, Loud Noise & Bearing Fix',
    description: 'Heavy grinding noise during high-speed spin cycle, broken drum spider arm, worn-out drum bearings, or damaged shock absorber suspension springs.',
    duration: '60 - 120 mins',
    startingPrice: 850,
    popular: false,
    warranty: '180-Day Mechanical Warranty',
    imageUrl: '/images/washing-machine-repair.jpg',
    features: [
      'High-grade SKF waterproof sealed bearings',
      'Shock absorbers & suspension strut replacement',
      'Tub counterweight balancing adjustment',
      'Motor carbon brush or rotor inspection'
    ],
    iconName: 'Volume2'
  },
  {
    id: 'wm-water-inlet-leak',
    appliance: 'washing_machine',
    category: 'Plumbing & Valves',
    name: 'Water Not Filling / Continuous Overflow Repair',
    description: 'Solves 4E/IE error codes, slow water intake, faulty dual solenoid inlet valves, or water leaking underneath the washing machine.',
    duration: '40 mins',
    startingPrice: 349,
    popular: false,
    warranty: '90-Day Valve & Seal Warranty',
    features: [
      'Electronic solenoid inlet valve test & fix',
      'Inlet mesh filter sediment descaling',
      'Internal hose connector leak proofing',
      'Water pressure switch (hydrostat) calibration'
    ],
    iconName: 'Droplet'
  },
  {
    id: 'wm-pcb-motor-repair',
    appliance: 'washing_machine',
    category: 'Electronics & Motor',
    name: 'Main PCB Control Board & Inverter Motor Fix',
    description: 'Fixes machine dead/no power, cycling stops midway, display flashing error codes (DE, LE, PE, UE), or direct-drive motor stutter.',
    duration: '1 - 24 hours',
    startingPrice: 1100,
    popular: true,
    warranty: '90-Day PCB & Motor Warranty',
    features: [
      'Direct drive inverter stator & hall sensor testing',
      'Microprocessor relay & capacitor board soldering',
      'Complete diagnostic error code clearance',
      'Voltage surge protector inspection'
    ],
    iconName: 'Cpu'
  },
  {
    id: 'wm-installation-demo',
    appliance: 'washing_machine',
    category: 'Installation',
    name: 'Washing Machine Installation & Demo',
    description: 'Removal of shipping transit bolts, plumbing connection to tap and drain outlet, anti-vibration rubber pad leveling, and cycle demo.',
    duration: '30 - 45 mins',
    startingPrice: 449,
    popular: false,
    warranty: '90-Day Installation Guarantee',
    features: [
      'Safe removal of 4x drum transit security bolts',
      'Leak-proof brass/PVC tap adapter fitting',
      'Spirit-level 4-corner foot balance adjustment',
      'Live test wash & drain cycle demonstration'
    ],
    iconName: 'CheckCircle'
  }
];

export const SYMPTOM_GUIDES: SymptomGuide[] = [
  {
    id: 'sym-ac-warm-air',
    appliance: 'ac',
    symptom: 'AC running but blowing room-temperature or warm air',
    possibleCauses: ['Low Freon gas / gas leakage', 'Dirty clogged cooling coils', 'Defective compressor capacitor', 'Outdoor fan motor not spinning'],
    recommendedServiceId: 'ac-gas-charging',
    recommendedServiceName: 'Gas Leak Detection & Full Gas Charging',
    urgency: 'High',
    estimatedCostRange: '₹349 - ₹1,850'
  },
  {
    id: 'sym-ac-ice-formation',
    appliance: 'ac',
    symptom: 'Ice or frost forming on indoor coils or copper pipes',
    possibleCauses: ['Severe dirt buildup blocking airflow', 'Low refrigerant gas pressure', 'Faulty blower motor'],
    recommendedServiceId: 'ac-foam-jet-service',
    recommendedServiceName: 'Power Jet Chemical Foam Wash',
    urgency: 'Medium',
    estimatedCostRange: '₹599 - ₹1,200'
  },
  {
    id: 'sym-ac-water-indoor',
    appliance: 'ac',
    symptom: 'Water dripping or leaking down the indoor room wall',
    possibleCauses: ['Algae or dirt blocking the drain hose', 'Cracked drain pan', 'Improper indoor unit leveling slope'],
    recommendedServiceId: 'ac-water-leakage',
    recommendedServiceName: 'Indoor Unit Water Dripping & Leakage Fix',
    urgency: 'Medium',
    estimatedCostRange: '₹399 - ₹499'
  },
  {
    id: 'sym-ac-smell',
    appliance: 'ac',
    symptom: 'Musty, foul, or burning odor when AC turns on',
    possibleCauses: ['Bacterial/mold colonies inside blower drum', 'Dead insects in drain tray', 'Overheating electrical wires'],
    recommendedServiceId: 'ac-foam-jet-service',
    recommendedServiceName: 'Power Jet Chemical Foam Wash',
    urgency: 'Medium',
    estimatedCostRange: '₹599 - ₹799'
  },
  {
    id: 'sym-wm-water-not-draining',
    appliance: 'washing_machine',
    symptom: 'Water stuck in tub, machine does not drain or spin (OE/5E)',
    possibleCauses: ['Coins/hairpins trapped in drain filter', 'Burnt out drain pump motor', 'Kinked or choked drain pipe'],
    recommendedServiceId: 'wm-spin-drain-issue',
    recommendedServiceName: 'Not Draining / Not Spinning Repair',
    urgency: 'High',
    estimatedCostRange: '₹399 - ₹899'
  },
  {
    id: 'sym-wm-airplane-noise',
    appliance: 'washing_machine',
    symptom: 'Loud jet engine grinding or violent shaking during spin cycle',
    possibleCauses: ['Worn out tub ball-bearings & oil seal', 'Corroded drum spider support', 'Broken shock absorbers'],
    recommendedServiceId: 'wm-noise-drum-bearing',
    recommendedServiceName: 'Violent Vibration, Loud Noise & Bearing Fix',
    urgency: 'High',
    estimatedCostRange: '₹850 - ₹1,800'
  },
  {
    id: 'sym-wm-not-filling',
    appliance: 'washing_machine',
    symptom: 'Water not entering machine or taking hours to fill (IE/4E)',
    possibleCauses: ['Clogged inlet filter screen', 'Burnt dual solenoid water valve', 'Low household water pressure'],
    recommendedServiceId: 'wm-water-inlet-leak',
    recommendedServiceName: 'Water Not Filling / Continuous Overflow Repair',
    urgency: 'Medium',
    estimatedCostRange: '₹349 - ₹650'
  },
  {
    id: 'sym-wm-no-power',
    appliance: 'washing_machine',
    symptom: 'Machine completely dead, no display lights or tripping MCB',
    possibleCauses: ['Main PCB motherboard power circuit failure', 'Blown fuse or damaged surge filter', 'Rats chewed internal wiring'],
    recommendedServiceId: 'wm-pcb-motor-repair',
    recommendedServiceName: 'Main PCB Control Board & Inverter Motor Fix',
    urgency: 'Emergency',
    estimatedCostRange: '₹600 - ₹1,400'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'CW-8924',
    createdAt: '2026-09-22 09:15 AM',
    appliance: 'ac',
    applianceCategory: 'Split AC (1 - 2 Ton)',
    brand: 'Daikin',
    serviceId: 'ac-foam-jet-service',
    serviceName: 'Power Jet Chemical Foam Wash',
    issueDescription: 'Cooling is slow and slight musty smell from blower',
    date: '2026-09-22',
    timeSlot: '02:00 PM - 04:00 PM',
    isEmergency: false,
    customerName: 'Rahul Verma',
    phone: '+91 98765 43210',
    email: 'rahul.verma@example.com',
    address: 'Flat 402, Green Meadows Residency, Sector 45',
    landmark: 'Near City Mall',
    pincode: '110045',
    estimatedPrice: 599,
    paymentMethod: 'pay_after_service',
    status: 'in_transit',
    technician: {
      name: 'Vikram Singh (Senior HVAC Specialist)',
      phone: '+91 98111 22334',
      rating: 4.9,
      experience: '8+ Years Exp',
      arrivalEstimate: '25 mins away'
    }
  },
  {
    id: 'CW-7402',
    createdAt: '2026-09-21 04:30 PM',
    appliance: 'washing_machine',
    applianceCategory: 'Front Load Automatic',
    brand: 'Bosch',
    serviceId: 'wm-spin-drain-issue',
    serviceName: 'Not Draining / Not Spinning Repair',
    issueDescription: 'Display showing E18 error and water remains in drum',
    date: '2026-09-22',
    timeSlot: '10:00 AM - 12:00 PM',
    isEmergency: true,
    customerName: 'Priya Sharma',
    phone: '+91 91234 56789',
    email: 'priya.s@example.com',
    address: 'B-12, Palm Grove Enclave, Park Road',
    pincode: '110078',
    estimatedPrice: 399,
    paymentMethod: 'pay_after_service',
    status: 'technician_assigned',
    technician: {
      name: 'Mohit Kumar (Certified Appliance Tech)',
      phone: '+91 97222 33445',
      rating: 4.8,
      experience: '6 Years Exp',
      arrivalEstimate: 'Scheduled for 11:15 AM'
    }
  }
];

export const FAQS: FAQItem[] = [
  {
    category: 'ac',
    question: 'How often should I service my Air Conditioner?',
    answer: 'For optimal cooling and energy efficiency, we recommend deep chemical foam jet servicing twice a year: once before summer starts and once at the end of the season. Clean dust filters every 3-4 weeks.'
  },
  {
    category: 'ac',
    question: 'How do I know if my AC needs gas refilling?',
    answer: 'Common signs of low refrigerant include: AC blowing warm air, ice/frost visible on the indoor cooling coil or outdoor brass valve nuts, hissing noises near copper pipes, and compressor running continuously without cooling the room.'
  },
  {
    category: 'washing_machine',
    question: 'Why is my washing machine making a loud grinding noise during the spin cycle?',
    answer: 'A loud roaring or jet-engine noise during high-speed spinning is almost always caused by worn-out drum ball-bearings or broken spider arms. Continuing to run the machine in this condition can severely damage the outer tub.'
  },
  {
    category: 'washing_machine',
    question: 'What should I do if my washing machine won’t drain water?',
    answer: 'First check the small coin trap filter at the bottom front corner for stuck lint, coins, or bobby pins. If the filter is clean, the drain pump motor or internal check valve might be malfunctioning, which our technician can test and repair.'
  },
  {
    category: 'warranty',
    question: 'What is covered under your 90-Day Service & Parts Warranty?',
    answer: 'All replacement spare parts installed by our technicians carry a 90-day free replacement guarantee. If the same issue recurs within 30-90 days (depending on service type), our technician will re-inspect and fix it at zero extra labor cost.'
  },
  {
    category: 'pricing',
    question: 'Are there any hidden inspection or travel charges?',
    answer: 'No hidden charges! Our visiting diagnostic fee (₹299-₹349) is 100% WAIVED OFF if you proceed with any recommended repair or servicing with us.'
  }
];

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Amitabh Sen',
    location: 'South Extension',
    rating: 5,
    date: '3 days ago',
    appliance: 'ac',
    service: 'Power Jet Chemical Foam Wash & Gas Refill',
    comment: 'Technician Vikram came on time with complete high-pressure jet equipment and plastic wrap to protect my walls. AC cooling is now like a brand new showroom machine. Very courteous and clean work!'
  },
  {
    id: 'rev-2',
    name: 'Sneha Patel',
    location: 'Cyber City / Sector 28',
    rating: 5,
    date: '1 week ago',
    appliance: 'washing_machine',
    service: 'Bosch Front Load Drain Pump Replacement',
    comment: 'My washing machine was stuck with soaking wet clothes on Sunday evening. Booked through the online emergency slot, technician arrived in 40 minutes, replaced the faulty drain pump with original parts, and gave 90 days warranty!'
  },
  {
    id: 'rev-3',
    name: 'Gurpreet Singh',
    location: 'Civil Lines',
    rating: 5,
    date: '2 weeks ago',
    appliance: 'ac',
    service: 'Daikin Inverter AC PCB Repair',
    comment: 'The authorized brand service center asked me to replace the entire outdoor PCB for ₹9,000. These guys repaired the IPM circuit for just ₹1,800 with a 3-month warranty! Huge savings and honest diagnostics.'
  },
  {
    id: 'rev-4',
    name: 'Meenakshi Iyer',
    location: 'Vasant Kunj',
    rating: 5,
    date: '3 weeks ago',
    appliance: 'washing_machine',
    service: 'Top Load Deep Drum Descaling & Noise Fix',
    comment: 'Unbelievable amount of dirt and limescale was removed during the tub jet wash. The machine used to vibrate and jump during spin, now it runs super smooth and quiet. Excellent online booking experience.'
  }
];
