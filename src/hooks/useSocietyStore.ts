import { useState, useEffect, useCallback } from 'react';
import { api } from '@/services/api';
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

// A mock login implementation for development
const ensureAuth = async () => {
  const token = localStorage.getItem('societyconnect_token') || localStorage.getItem('sahaaya_token');
  if (!token) {
    try {
      const res = await api.auth.login({ email: 'rajesh.sharma@example.com', password: 'password123' });
      localStorage.setItem('societyconnect_token', res.token);
    } catch (e) {
      console.error('Failed to auto-login', e);
    }
  }
};

export function useSocietyStore() {
  const [role, setRoleState] = useState<UserRole>((localStorage.getItem('societyconnect_active_role') || localStorage.getItem('sahaaya_active_role')) as UserRole || 'owner');
  const [activeFlatId, setActiveFlatIdState] = useState<string>(localStorage.getItem('societyconnect_active_flat') || localStorage.getItem('sahaaya_active_flat') || 'f-A101');
  
  const [flats, setFlats] = useState<Flat[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [nocs, setNocs] = useState<TenantNOC[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [staff, setStaff] = useState<StaffEntry[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [bookings, setBookings] = useState<AmenityBooking[]>([]);
  const [resolutions, setResolutions] = useState<Resolution[]>([]);
  const [documents, setDocuments] = useState<SocietyDocument[]>([]);
  const [vendors, setVendors] = useState<VendorContract[]>([]);

  const [tankers, setTankers] = useState<WaterTankerLog[]>([]);
  const [dgLogs, setDgLogs] = useState<DGLog[]>([]);
  const [evSessions, setEvSessions] = useState<EVChargingSession[]>([]);
  const [clearances, setClearances] = useState<MoveOutClearance[]>([]);
  
  const [loading, setLoading] = useState(true);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    await ensureAuth();
    
    try {
      const [
        flatsData, billsData, nocsData, complaintsData, visitorsData, staffData, 
        amenitiesData, bookingsData, resolutionsData, documentsData, vendorsData, 
        tankersData, dgLogsData, evSessionsData, clearancesData
      ] = await Promise.all([
        api.flats.getAll().catch(() => []),
        api.bills.getAll().catch(() => []),
        api.tenants.getNOCs().catch(() => []),
        api.complaints.getAll().catch(() => []),
        api.visitors.getAll().catch(() => []),
        api.visitors.getStaff().catch(() => []),
        api.amenities.getAll().catch(() => []),
        api.amenities.getBookings().catch(() => []),
        api.voting.getResolutions().catch(() => []),
        api.documents.getAll().catch(() => []),
        api.vendors.getAll().catch(() => []),
        api.utilities.getTankers().catch(() => []),
        api.utilities.getDGLogs().catch(() => []),
        api.utilities.getEVSessions().catch(() => []),
        api.clearances.getAll().catch(() => []),
      ]);

      setFlats(flatsData);
      setBills(billsData);
      setNocs(nocsData);
      setComplaints(complaintsData);
      setVisitors(visitorsData);
      setStaff(staffData);
      setAmenities(amenitiesData);
      setBookings(bookingsData);
      setResolutions(resolutionsData);
      setDocuments(documentsData);
      setVendors(vendorsData);
      setTankers(tankersData);
      setDgLogs(dgLogsData);
      setEvSessions(evSessionsData);
      setClearances(clearancesData);
    } catch (e) {
      console.error('Failed to fetch data', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const setRole = (newRole: UserRole) => {
    localStorage.setItem('societyconnect_active_role', newRole);
    setRoleState(newRole);
  };

  const setActiveFlatId = (flatId: string) => {
    localStorage.setItem('societyconnect_active_flat', flatId);
    setActiveFlatIdState(flatId);
  };

  const activeFlat = flats.find(f => f.id === activeFlatId) || flats[0];

  const payBill = async (billId: string, method: string) => {
    await api.bills.pay(billId, method);
    await refreshAll();
  };

  const addNOC = async (nocData: Omit<TenantNOC, 'id' | 'createdAt'>) => {
    const res = await api.tenants.createNOC(nocData);
    await refreshAll();
    return res;
  };

  const addComplaint = async (data: Omit<Complaint, 'id' | 'createdAt' | 'status' | 'slaDeadline'>) => {
    const res = await api.complaints.create(data);
    await refreshAll();
    return res;
  };

  const addVisitorPass = async (data: Omit<Visitor, 'id' | 'passCode' | 'entryTime' | 'status'>) => {
    const res = await api.visitors.create(data);
    await refreshAll();
    return res;
  };

  const addBooking = async (data: Omit<AmenityBooking, 'id' | 'createdAt' | 'status'>) => {
    const res = await api.amenities.createBooking(data);
    await refreshAll();
    return res;
  };

  const castVote = async (resolutionId: string, optionId: string) => {
    const res = await api.voting.vote(resolutionId, optionId);
    await refreshAll();
    return res;
  };

  const addTanker = async (data: Omit<WaterTankerLog, 'id'>) => {
    const res = await api.utilities.createTanker(data);
    await refreshAll();
    return res;
  };

  const addDGLog = async (data: Omit<DGLog, 'id'>) => {
    const res = await api.utilities.createDGLog(data);
    await refreshAll();
    return res;
  };

  const addClearance = async (data: Omit<MoveOutClearance, 'id' | 'status'>) => {
    const res = await api.clearances.create(data);
    await refreshAll();
    return res;
  };

  return {
    loading,
    role,
    setRole,
    activeFlatId,
    setActiveFlatId,
    activeFlat,
    flats,
    bills,
    nocs,
    complaints,
    visitors,
    staff,
    amenities,
    bookings,
    resolutions,
    documents,
    vendors,
    tankers,
    dgLogs,
    evSessions,
    clearances,
    payBill,
    addNOC,
    addComplaint,
    addVisitorPass,
    addBooking,
    castVote,
    addTanker,
    addDGLog,
    addClearance,
    refreshAll
  };
}
