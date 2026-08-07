import {
  Flat,
  Bill,
  TenantNOC,
  Complaint,
  Visitor,
  StaffEntry,
  Amenity,
  AmenityBooking,
  Resolution,
  SocietyDocument,
  VendorContract,
  WaterTankerLog,
  DGLog,
  EVChargingSession,
  MoveOutClearance,
  UserRole
} from '@/types/society';

const STORAGE_KEYS = {
  FLATS: 'societyconnect_flats',
  BILLS: 'societyconnect_bills',
  NOCS: 'societyconnect_nocs',
  COMPLAINTS: 'societyconnect_complaints',
  VISITORS: 'societyconnect_visitors',
  STAFF: 'societyconnect_staff',
  AMENITIES: 'societyconnect_amenities',
  BOOKINGS: 'societyconnect_bookings',
  RESOLUTIONS: 'societyconnect_resolutions',
  DOCUMENTS: 'societyconnect_documents',
  VENDORS: 'societyconnect_vendors',
  TANKERS: 'societyconnect_tankers',
  DGLOGS: 'societyconnect_dglogs',
  EVSESSIONS: 'societyconnect_evsessions',
  CLEARANCES: 'societyconnect_clearances',
  ACTIVE_ROLE: 'societyconnect_active_role',
  ACTIVE_FLAT: 'societyconnect_active_flat',
};

// Initial Seed Data
const INITIAL_FLATS: Flat[] = [
  { id: 'f-A101', tower: 'Tower A', unitNumber: 'A-101', floor: 1, areaSqFt: 1450, ownerName: 'Rajesh Sharma', ownerPhone: '+91 98765 43210', ownerEmail: 'rajesh.sharma@example.com', isRented: false, parkingSlot: 'P-A101', occupancyStatus: 'owner_occupied' },
  { id: 'f-A102', tower: 'Tower A', unitNumber: 'A-102', floor: 1, areaSqFt: 1680, ownerName: 'Priya Nair', ownerPhone: '+91 98220 11223', ownerEmail: 'priya.nair@example.com', isRented: true, tenantName: 'Vikram Mehta', tenantPhone: '+91 97111 88990', parkingSlot: 'P-A102', occupancyStatus: 'tenant_occupied' },
  { id: 'f-A201', tower: 'Tower A', unitNumber: 'A-201', floor: 2, areaSqFt: 1450, ownerName: 'Amitav Ghosh', ownerPhone: '+91 98333 44556', ownerEmail: 'amitav.ghosh@example.com', isRented: false, parkingSlot: 'P-A201', occupancyStatus: 'owner_occupied' },
  { id: 'f-B101', tower: 'Tower B', unitNumber: 'B-101', floor: 1, areaSqFt: 1850, ownerName: 'Siddharth Rao', ownerPhone: '+91 98444 55667', ownerEmail: 'siddharth.rao@example.com', isRented: false, parkingSlot: 'P-B101', occupancyStatus: 'owner_occupied' },
  { id: 'f-B102', tower: 'Tower B', unitNumber: 'B-102', floor: 1, areaSqFt: 1850, ownerName: 'Kavita Reddy', ownerPhone: '+91 98555 66778', ownerEmail: 'kavita.reddy@example.com', isRented: true, tenantName: 'Ananya Gupta', tenantPhone: '+91 96222 33445', parkingSlot: 'P-B102', occupancyStatus: 'tenant_occupied' },
  { id: 'f-C301', tower: 'Tower C', unitNumber: 'C-301', floor: 3, areaSqFt: 2100, ownerName: 'Dr. Alok Verma', ownerPhone: '+91 98666 77889', ownerEmail: 'alok.verma@example.com', isRented: false, parkingSlot: 'P-C301', occupancyStatus: 'owner_occupied' },
  { id: 'f-D402', tower: 'Tower D', unitNumber: 'D-402', floor: 4, areaSqFt: 1250, ownerName: 'Sunita Deshmukh', ownerPhone: '+91 98777 88990', ownerEmail: 'sunita.d@example.com', isRented: false, parkingSlot: 'P-D402', occupancyStatus: 'owner_occupied' },
];

const INITIAL_BILLS: Bill[] = [
  {
    id: 'BILL-2026-08-A101',
    flatId: 'f-A101',
    flatNumber: 'A-101',
    tower: 'Tower A',
    residentName: 'Rajesh Sharma',
    month: 'August',
    year: 2026,
    dueDate: '2026-08-15',
    subtotal: 4350,
    lateFee: 0,
    totalAmount: 4350,
    status: 'unpaid',
    items: [
      { description: 'Sq.Ft Maintenance (1,450 sqft @ ₹2.5/sqft)', amount: 3625, category: 'maintenance' },
      { description: 'Clubhouse & Amenities Levy', amount: 450, category: 'utility' },
      { description: 'Sinking & Corpus Fund', amount: 275, category: 'corpus' },
    ]
  },
  {
    id: 'BILL-2026-08-A102',
    flatId: 'f-A102',
    flatNumber: 'A-102',
    tower: 'Tower A',
    residentName: 'Vikram Mehta (Tenant)',
    month: 'August',
    year: 2026,
    dueDate: '2026-08-15',
    subtotal: 5040,
    lateFee: 0,
    totalAmount: 5040,
    status: 'paid',
    paidDate: '2026-08-02',
    paymentMethod: 'UPI (GPay)',
    transactionRef: 'UPI/6281902819/SUCCESS',
    items: [
      { description: 'Sq.Ft Maintenance (1,680 sqft @ ₹2.5/sqft)', amount: 4200, category: 'maintenance' },
      { description: 'Clubhouse & Gym Levy', amount: 500, category: 'utility' },
      { description: 'Diesel Generator Backup Charges', amount: 340, category: 'utility' },
    ]
  },
  {
    id: 'BILL-2026-07-B101',
    flatId: 'f-B101',
    flatNumber: 'B-101',
    tower: 'Tower B',
    residentName: 'Siddharth Rao',
    month: 'July',
    year: 2026,
    dueDate: '2026-07-15',
    subtotal: 5550,
    lateFee: 300,
    totalAmount: 5850,
    status: 'overdue',
    items: [
      { description: 'Sq.Ft Maintenance (1,850 sqft @ ₹2.5/sqft)', amount: 4625, category: 'maintenance' },
      { description: 'Water Tanker Surcharge', amount: 600, category: 'utility' },
      { description: 'Corpus Reserve', amount: 325, category: 'corpus' },
      { description: 'Overdue Penalty (15+ days late)', amount: 300, category: 'penalty' },
    ]
  }
];

const INITIAL_NOCS: TenantNOC[] = [
  {
    id: 'NOC-1029',
    flatId: 'f-A102',
    flatNumber: 'A-102',
    tower: 'Tower A',
    ownerId: 'f-A101',
    tenantName: 'Vikram Mehta',
    tenantPhone: '+91 97111 88990',
    tenantEmail: 'vikram.mehta@example.com',
    leaseStartDate: '2025-11-01',
    leaseEndDate: '2026-10-31',
    monthlyRent: 42000,
    policeVerificationStatus: 'verified',
    nocStatus: 'approved',
    createdAt: '2025-10-25',
  }
];

const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'TKT-801',
    flatNumber: 'A-101',
    tower: 'Tower A',
    residentName: 'Rajesh Sharma',
    category: 'Elevator',
    title: 'Tower A Lift 2 jerking between 3rd & 4th floor',
    description: 'Lift 2 exhibits strong vibration and unnatural grinding sound when ascending.',
    priority: 'urgent',
    status: 'in_progress',
    createdAt: '2026-08-05 09:30',
    slaDeadline: '2026-08-05 17:30',
    assignedTechnician: 'Otis Elevator Engineer - Mahesh',
  }
];

const INITIAL_VISITORS: Visitor[] = [
  {
    id: 'VIS-901',
    name: 'Amazon Delivery (Rohan)',
    phone: '+91 99887 76655',
    type: 'delivery',
    flatNumber: 'A-101',
    tower: 'Tower A',
    passCode: '8492',
    entryTime: '2026-08-05 10:15',
    status: 'inside',
    vehicleNumber: 'MH-12-AB-4021',
  }
];

const INITIAL_STAFF: StaffEntry[] = [
  { id: 'STF-01', name: 'Lata Bai', role: 'Maid', phone: '+91 98900 11223', flatsAssigned: ['A-101', 'A-102', 'A-201'], entryTime: '07:45 AM', status: 'present', rating: 4.8, reviewsCount: 14, experienceYears: 6, policeVerified: true },
  { id: 'STF-02', name: 'Sanjay Kumar', role: 'Driver', phone: '+91 98900 44556', flatsAssigned: ['C-301'], entryTime: '08:30 AM', status: 'present', rating: 4.9, reviewsCount: 9, experienceYears: 8, policeVerified: true },
  { id: 'STF-03', name: 'Sunita Tai', role: 'Cook', phone: '+91 98900 77889', flatsAssigned: ['B-101', 'B-102'], entryTime: '11:00 AM', status: 'absent', rating: 4.7, reviewsCount: 18, experienceYears: 5, policeVerified: true },
  { id: 'STF-04', name: 'Ramesh P.', role: 'Car Cleaner', phone: '+91 98900 99112', flatsAssigned: ['A-101', 'B-101', 'C-301'], entryTime: '06:30 AM', status: 'present', rating: 4.6, reviewsCount: 22, experienceYears: 4, policeVerified: true }
];

const INITIAL_AMENITIES: Amenity[] = [
  {
    id: 'AMN-CLUB',
    name: 'Grand Banquet & Clubhouse',
    description: 'Air-conditioned hall with audio system, projector, and capacity for 120 guests.',
    capacity: 120,
    hourlyRate: 1500,
    securityDeposit: 5000,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    openingHours: '08:00 AM - 11:00 PM',
  },
  {
    id: 'AMN-POOL',
    name: 'Olympic Swimming Pool & Deck',
    description: 'Temperature-controlled lap pool with dedicated kids splash area.',
    capacity: 35,
    hourlyRate: 200,
    securityDeposit: 0,
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
    openingHours: '06:00 AM - 09:30 PM',
  }
];

const INITIAL_BOOKINGS: AmenityBooking[] = [
  {
    id: 'BK-501',
    amenityId: 'AMN-CLUB',
    amenityName: 'Grand Banquet & Clubhouse',
    residentName: 'Rajesh Sharma',
    flatNumber: 'A-101',
    tower: 'Tower A',
    date: '2026-08-15',
    timeSlot: '06:00 PM - 10:00 PM',
    amountPaid: 6000,
    depositPaid: 5000,
    status: 'confirmed',
    createdAt: '2026-08-01',
  }
];

const INITIAL_RESOLUTIONS: Resolution[] = [
  {
    id: 'RES-2026-04',
    title: 'Installation of Solar Roof Panels & Net Metering',
    description: 'Proposal to invest ₹18 Lakhs from Sinking Fund to install 50kW Solar PV grid on Towers A-D roofs, projected to reduce common area electricity bills by 65%.',
    category: 'Infrastructure',
    startDate: '2026-08-01',
    endDate: '2026-08-10',
    status: 'active',
    totalVotes: 142,
    quorumPercentage: 57,
    options: [
      { id: 'opt-1', label: 'APPROVE — Implement Solar System', votes: 118 },
      { id: 'opt-2', label: 'REJECT — Defer to next financial year', votes: 19 },
      { id: 'opt-3', label: 'ABSTAIN', votes: 5 }
    ]
  }
];

const INITIAL_DOCUMENTS: SocietyDocument[] = [
  { id: 'DOC-101', title: 'Model Bye-Laws & Society Registration Certificate', category: 'Bye-Laws', uploadDate: '2024-01-15', fileSize: '4.2 MB', accessLevel: 'all', downloadUrl: '#' },
  { id: 'DOC-102', title: 'Annual General Body Meeting (AGM) Minutes 2025', category: 'AGM Minutes', uploadDate: '2025-09-30', fileSize: '1.8 MB', accessLevel: 'owners_only', downloadUrl: '#' }
];

const INITIAL_VENDORS: VendorContract[] = [
  { id: 'VND-01', serviceName: 'Elevator Maintenance AMC', vendorName: 'Otis Elevator Company India', contactPerson: 'Mahesh Patil', phone: '+91 98200 44332', monthlyCost: 45000, contractStartDate: '2025-10-01', contractEndDate: '2026-09-30', status: 'expiring_soon' }
];

const INITIAL_TANKERS: WaterTankerLog[] = [
  { id: 'TNK-101', date: '2026-08-05', vendorName: 'AquaPure Logistics', capacityLiters: 12000, costPerTanker: 1800, verifiedByGuard: 'Guard Bahadur', slipNumber: 'SLIP-9901' },
  { id: 'TNK-100', date: '2026-08-04', vendorName: 'AquaPure Logistics', capacityLiters: 12000, costPerTanker: 1800, verifiedByGuard: 'Guard Bahadur', slipNumber: 'SLIP-9892' }
];

const INITIAL_DGLOGS: DGLog[] = [
  { id: 'DG-201', date: '2026-08-04', dieselLitresAdded: 200, cost: 18400, runtimeHours: 4.5, powerCutDuration: '3 hrs 45 mins' }
];

const INITIAL_EVSESSIONS: EVChargingSession[] = [
  { id: 'EV-301', flatNumber: 'A-101', tower: 'Tower A', chargerSlot: 'EV-Slot-1', kWhConsumed: 18.5, totalCost: 222, date: '2026-08-05', status: 'completed' },
  { id: 'EV-302', flatNumber: 'C-301', tower: 'Tower C', chargerSlot: 'EV-Slot-3', kWhConsumed: 12.0, totalCost: 144, date: '2026-08-05', status: 'active' }
];

const INITIAL_CLEARANCES: MoveOutClearance[] = [
  { id: 'CLR-501', flatNumber: 'B-102', tower: 'Tower B', residentName: 'Ananya Gupta', moveOutDate: '2026-08-31', duesCleared: true, parkingBadgeReturned: true, liftPaddingRequested: true, status: 'approved' }
];

export const db = {
  getFlats: (): Flat[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.FLATS) || JSON.stringify(INITIAL_FLATS)),
  getBills: (): Bill[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.BILLS) || JSON.stringify(INITIAL_BILLS)),
  
  payBill: (billId: string, method: string): Bill => {
    const bills = db.getBills();
    const index = bills.findIndex(b => b.id === billId);
    if (index !== -1) {
      bills[index] = {
        ...bills[index],
        status: 'paid',
        paidDate: new Date().toISOString().split('T')[0],
        paymentMethod: method,
        transactionRef: `PAY/${Math.floor(100000 + Math.random() * 900000)}/SUCCESS`
      };
      localStorage.setItem(STORAGE_KEYS.BILLS, JSON.stringify(bills));
      return bills[index];
    }
    throw new Error('Bill not found');
  },

  getNOCs: (): TenantNOC[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.NOCS) || JSON.stringify(INITIAL_NOCS)),
  addNOC: (nocData: Omit<TenantNOC, 'id' | 'createdAt'>): TenantNOC => {
    const nocs = db.getNOCs();
    const newNoc = { ...nocData, id: `NOC-${Math.floor(1000 + Math.random() * 9000)}`, createdAt: new Date().toISOString().split('T')[0] };
    nocs.unshift(newNoc);
    localStorage.setItem(STORAGE_KEYS.NOCS, JSON.stringify(nocs));
    return newNoc;
  },

  getComplaints: (): Complaint[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLAINTS) || JSON.stringify(INITIAL_COMPLAINTS)),
  addComplaint: (data: Omit<Complaint, 'id' | 'createdAt' | 'status' | 'slaDeadline'>): Complaint => {
    const complaints = db.getComplaints();
    const now = new Date();
    const deadline = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const newTicket = {
      ...data,
      id: `TKT-${Math.floor(800 + Math.random() * 200)}`,
      status: 'open' as const,
      createdAt: now.toISOString().replace('T', ' ').slice(0, 16),
      slaDeadline: deadline.toISOString().replace('T', ' ').slice(0, 16),
    };
    complaints.unshift(newTicket);
    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(complaints));
    return newTicket;
  },

  getVisitors: (): Visitor[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.VISITORS) || JSON.stringify(INITIAL_VISITORS)),
  addVisitorPass: (data: Omit<Visitor, 'id' | 'passCode' | 'entryTime' | 'status'>): Visitor => {
    const visitors = db.getVisitors();
    const newPass = {
      ...data,
      id: `VIS-${Math.floor(900 + Math.random() * 100)}`,
      passCode: Math.floor(1000 + Math.random() * 9000).toString(),
      entryTime: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'expected' as const
    };
    visitors.unshift(newPass);
    localStorage.setItem(STORAGE_KEYS.VISITORS, JSON.stringify(visitors));
    return newPass;
  },

  getStaff: (): StaffEntry[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.STAFF) || JSON.stringify(INITIAL_STAFF)),
  getAmenities: (): Amenity[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.AMENITIES) || JSON.stringify(INITIAL_AMENITIES)),
  getBookings: (): AmenityBooking[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || JSON.stringify(INITIAL_BOOKINGS)),
  addBooking: (data: Omit<AmenityBooking, 'id' | 'createdAt' | 'status'>): AmenityBooking => {
    const bookings = db.getBookings();
    const newBooking = { ...data, id: `BK-${Math.floor(500 + Math.random() * 500)}`, status: 'confirmed' as const, createdAt: new Date().toISOString().split('T')[0] };
    bookings.unshift(newBooking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    return newBooking;
  },

  getResolutions: (): Resolution[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.RESOLUTIONS) || JSON.stringify(INITIAL_RESOLUTIONS)),
  castVote: (resolutionId: string, optionId: string): Resolution => {
    const resolutions = db.getResolutions();
    const res = resolutions.find(r => r.id === resolutionId);
    if (res) {
      res.totalVotes += 1;
      const opt = res.options.find(o => o.id === optionId);
      if (opt) opt.votes += 1;
      localStorage.setItem(STORAGE_KEYS.RESOLUTIONS, JSON.stringify(resolutions));
      return res;
    }
    throw new Error('Resolution not found');
  },

  getDocuments: (): SocietyDocument[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCUMENTS) || JSON.stringify(INITIAL_DOCUMENTS)),
  getVendors: (): VendorContract[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.VENDORS) || JSON.stringify(INITIAL_VENDORS)),

  // New Utility Real-Life Features
  getTankers: (): WaterTankerLog[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.TANKERS) || JSON.stringify(INITIAL_TANKERS)),
  addTanker: (data: Omit<WaterTankerLog, 'id'>): WaterTankerLog => {
    const tankers = db.getTankers();
    const newTanker = { ...data, id: `TNK-${Math.floor(100 + Math.random() * 900)}` };
    tankers.unshift(newTanker);
    localStorage.setItem(STORAGE_KEYS.TANKERS, JSON.stringify(tankers));
    return newTanker;
  },

  getDGLogs: (): DGLog[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.DGLOGS) || JSON.stringify(INITIAL_DGLOGS)),
  addDGLog: (data: Omit<DGLog, 'id'>): DGLog => {
    const logs = db.getDGLogs();
    const newLog = { ...data, id: `DG-${Math.floor(200 + Math.random() * 800)}` };
    logs.unshift(newLog);
    localStorage.setItem(STORAGE_KEYS.DGLOGS, JSON.stringify(logs));
    return newLog;
  },

  getEVSessions: (): EVChargingSession[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.EVSESSIONS) || JSON.stringify(INITIAL_EVSESSIONS)),
  getClearances: (): MoveOutClearance[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.CLEARANCES) || JSON.stringify(INITIAL_CLEARANCES)),
  addClearance: (data: Omit<MoveOutClearance, 'id' | 'status'>): MoveOutClearance => {
    const list = db.getClearances();
    const newItem = { ...data, id: `CLR-${Math.floor(500 + Math.random() * 500)}`, status: 'approved' as const };
    list.unshift(newItem);
    localStorage.setItem(STORAGE_KEYS.CLEARANCES, JSON.stringify(list));
    return newItem;
  },

  getActiveRole: (): UserRole => (localStorage.getItem(STORAGE_KEYS.ACTIVE_ROLE) as UserRole) || 'owner',
  setActiveRole: (role: UserRole) => localStorage.setItem(STORAGE_KEYS.ACTIVE_ROLE, role),
  getActiveFlatId: (): string => localStorage.getItem(STORAGE_KEYS.ACTIVE_FLAT) || 'f-A101',
  setActiveFlatId: (flatId: string) => localStorage.setItem(STORAGE_KEYS.ACTIVE_FLAT, flatId)
};
