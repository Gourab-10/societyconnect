export type UserRole = 'owner' | 'tenant' | 'admin' | 'guard';

export interface Resident {
  id: string;
  name: string;
  email: string;
  phone: string;
  flatId: string;
  flatNumber: string;
  tower: string;
  role: UserRole;
  isOwner: boolean;
  avatar?: string;
  vehiclesCount: number;
}

export interface Flat {
  id: string;
  tower: string;
  unitNumber: string;
  floor: number;
  areaSqFt: number;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  isRented: boolean;
  tenantName?: string;
  tenantPhone?: string;
  parkingSlot: string;
  occupancyStatus: 'owner_occupied' | 'tenant_occupied' | 'vacant';
}

export interface BillItem {
  description: string;
  amount: number;
  category: 'maintenance' | 'utility' | 'penalty' | 'amenity' | 'corpus';
}

export interface Bill {
  id: string;
  flatId: string;
  flatNumber: string;
  tower: string;
  residentName: string;
  month: string;
  year: number;
  dueDate: string;
  items: BillItem[];
  subtotal: number;
  lateFee: number;
  totalAmount: number;
  status: 'paid' | 'unpaid' | 'overdue';
  paidDate?: string;
  paymentMethod?: string;
  transactionRef?: string;
}

export interface TenantNOC {
  id: string;
  flatId: string;
  flatNumber: string;
  tower: string;
  ownerId: string;
  tenantName: string;
  tenantPhone: string;
  tenantEmail: string;
  leaseStartDate: string;
  leaseEndDate: string;
  monthlyRent: number;
  policeVerificationStatus: 'verified' | 'pending' | 'rejected';
  nocStatus: 'approved' | 'pending' | 'rejected';
  moveInDate?: string;
  moveOutDate?: string;
  documentUrl?: string;
  createdAt: string;
}

export type ComplaintCategory = 'Plumbing' | 'Electrical' | 'Elevator' | 'Security' | 'Carpentry' | 'General';
export type ComplaintPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ComplaintStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface Complaint {
  id: string;
  flatNumber: string;
  tower: string;
  residentName: string;
  category: ComplaintCategory;
  title: string;
  description: string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  createdAt: string;
  slaDeadline: string;
  assignedTechnician?: string;
  resolutionNotes?: string;
  rating?: number;
}

export interface Visitor {
  id: string;
  name: string;
  phone: string;
  type: 'guest' | 'delivery' | 'cab' | 'service';
  flatNumber: string;
  tower: string;
  passCode: string;
  entryTime: string;
  exitTime?: string;
  status: 'expected' | 'inside' | 'checked_out' | 'overstayed';
  vehicleNumber?: string;
}

export interface StaffEntry {
  id: string;
  name: string;
  role: 'Maid' | 'Driver' | 'Cook' | 'Gardener' | 'Guard' | 'Nanny' | 'Car Cleaner';
  phone: string;
  flatsAssigned: string[];
  entryTime: string;
  exitTime?: string;
  status: 'present' | 'absent';
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  policeVerified: boolean;
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  capacity: number;
  hourlyRate: number;
  securityDeposit: number;
  image: string;
  openingHours: string;
}

export interface AmenityBooking {
  id: string;
  amenityId: string;
  amenityName: string;
  residentName: string;
  flatNumber: string;
  tower: string;
  date: string;
  timeSlot: string;
  amountPaid: number;
  depositPaid: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface Resolution {
  id: string;
  title: string;
  description: string;
  category: 'Infrastructure' | 'Financial' | 'Rules' | 'Election';
  startDate: string;
  endDate: string;
  status: 'active' | 'passed' | 'rejected';
  totalVotes: number;
  quorumPercentage: number;
  options: {
    id: string;
    label: string;
    votes: number;
  }[];
}

export interface SocietyDocument {
  id: string;
  title: string;
  category: 'Bye-Laws' | 'AGM Minutes' | 'Financial Audit' | 'NOC' | 'Notice';
  uploadDate: string;
  fileSize: string;
  accessLevel: 'all' | 'owners_only' | 'admin_only';
  downloadUrl: string;
}

export interface VendorContract {
  id: string;
  serviceName: string;
  vendorName: string;
  contactPerson: string;
  phone: string;
  monthlyCost: number;
  contractStartDate: string;
  contractEndDate: string;
  status: 'active' | 'expiring_soon' | 'expired';
}

// REAL LIFE UTILITIES & CLEARANCE ADDITIONS
export interface WaterTankerLog {
  id: string;
  date: string;
  vendorName: string;
  capacityLiters: number;
  costPerTanker: number;
  verifiedByGuard: string;
  slipNumber: string;
}

export interface DGLog {
  id: string;
  date: string;
  dieselLitresAdded: number;
  cost: number;
  runtimeHours: number;
  powerCutDuration: string;
}

export interface EVChargingSession {
  id: string;
  flatNumber: string;
  tower: string;
  chargerSlot: string;
  kWhConsumed: number;
  totalCost: number;
  date: string;
  status: 'active' | 'completed';
}

export interface MoveOutClearance {
  id: string;
  flatNumber: string;
  tower: string;
  residentName: string;
  moveOutDate: string;
  duesCleared: boolean;
  parkingBadgeReturned: boolean;
  liftPaddingRequested: boolean;
  status: 'approved' | 'pending';
}
