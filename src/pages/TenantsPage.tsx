import React, { useState } from 'react';
import { useSocietyStore } from '@/hooks/useSocietyStore';
import { TenantNOC } from '@/types/society';
import {
  Users,
  FileCheck,
  ShieldCheck,
  UserPlus,
  Clock,
  CheckCircle2,
  FileText,
  Building,
  Upload,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

export const TenantsPage: React.FC = () => {
  const { nocs, addNOC, activeFlat, role } = useSocietyStore();
  const [showNocModal, setShowNocModal] = useState(false);

  // Form State
  const [tenantName, setTenantName] = useState('');
  const [tenantPhone, setTenantPhone] = useState('');
  const [tenantEmail, setTenantEmail] = useState('');
  const [leaseStart, setLeaseStart] = useState('2026-09-01');
  const [leaseEnd, setLeaseEnd] = useState('2027-08-31');
  const [rentAmount, setRentAmount] = useState(45000);

  const handleCreateNOC = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantName || !tenantPhone) {
      toast.error('Please enter tenant name and contact number');
      return;
    }

    addNOC({
      flatId: activeFlat.id,
      flatNumber: activeFlat.unitNumber,
      tower: activeFlat.tower,
      ownerId: activeFlat.id,
      tenantName,
      tenantPhone,
      tenantEmail,
      leaseStartDate: leaseStart,
      leaseEndDate: leaseEnd,
      monthlyRent: Number(rentAmount),
      policeVerificationStatus: 'pending',
      nocStatus: 'pending'
    });

    setShowNocModal(false);
    setTenantName('');
    setTenantPhone('');
    setTenantEmail('');
    toast.success('Society Tenant NOC Request Submitted!', {
      description: 'Request sent to Managing Committee and Police Verification portal.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Tenant & Digital NOC Hub</h1>
          <p className="text-xs text-slate-500">Eliminate physical paperwork for tenant onboarding, NOC approvals & police verification</p>
        </div>

        <button
          onClick={() => setShowNocModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-semibold text-xs text-white shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 self-start active:scale-95"
        >
          <UserPlus className="h-4 w-4" />
          <span>New Tenant NOC Request</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Active Rented Flats</span>
            <Users className="h-4 w-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            {nocs.filter(n => n.nocStatus === 'approved').length} Units Rented
          </div>
          <p className="text-[11px] text-slate-500">Registered in society database</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Police Verification Rate</span>
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            94% Verified
          </div>
          <p className="text-[11px] text-slate-500">Direct integration with city police portal</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Pending NOC Approvals</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            {nocs.filter(n => n.nocStatus === 'pending').length} Pending
          </div>
          <p className="text-[11px] text-slate-500">Awaiting committee review</p>
        </div>
      </div>

      {/* NOC Registry List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Tenant NOC Registry</h3>
          <span className="text-xs text-slate-400">Total {nocs.length} applications</span>
        </div>

        <div className="space-y-4">
          {nocs.map((n) => (
            <div key={n.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 dark:border-slate-700/60 pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-600 grid place-items-center font-bold text-xs">
                    {n.tower.slice(-1)}{n.flatNumber}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{n.tenantName}</h4>
                    <p className="text-xs text-slate-500">{n.tower} &bull; Flat {n.flatNumber} &bull; {n.tenantPhone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    n.nocStatus === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    Society NOC: {n.nocStatus}
                  </span>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    n.policeVerificationStatus === 'verified' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                  }`}>
                    Police: {n.policeVerificationStatus}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 dark:text-slate-400">
                <div>
                  <span className="text-[11px] text-slate-400 block">Lease Tenure</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{n.leaseStartDate} to {n.leaseEndDate}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Monthly Rent</span>
                  <span className="font-semibold text-slate-900 dark:text-white">₹{n.monthlyRent.toLocaleString()}/mo</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Application Ref</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">{n.id}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Gate Pass</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Move-in Active
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NOC Application Modal */}
      {showNocModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreateNOC} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">New Tenant Onboarding & NOC Request</h3>
              <p className="text-xs text-slate-500">For unit {activeFlat?.tower} - {activeFlat?.unitNumber}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Tenant Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Tenant Phone Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 00000"
                    value={tenantPhone}
                    onChange={(e) => setTenantPhone(e.target.value)}
                    className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                  <input
                    type="email"
                    placeholder="tenant@example.com"
                    value={tenantEmail}
                    onChange={(e) => setTenantEmail(e.target.value)}
                    className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Lease Start Date</label>
                  <input
                    type="date"
                    value={leaseStart}
                    onChange={(e) => setLeaseStart(e.target.value)}
                    className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Lease End Date</label>
                  <input
                    type="date"
                    value={leaseEnd}
                    onChange={(e) => setLeaseEnd(e.target.value)}
                    className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                <Upload className="h-4 w-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] text-emerald-700 dark:text-emerald-300">Attach Lease Agreement PDF & Aadhar Copy for Police Verification</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowNocModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/30"
              >
                Submit NOC Request
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
