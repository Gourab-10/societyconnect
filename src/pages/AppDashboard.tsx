import React from 'react';
import { useSocietyStore } from '@/hooks/useSocietyStore';
import { Link } from 'react-router-dom';
import {
  Receipt,
  Wrench,
  ShieldCheck,
  CalendarCheck,
  Vote,
  Users,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export const AppDashboard: React.FC = () => {
  const { role, activeFlat, bills, complaints, visitors, staff, resolutions } = useSocietyStore();

  const flatBills = bills.filter(b => b.flatNumber === activeFlat?.unitNumber || role === 'admin');
  const unpaidBill = flatBills.find(b => b.status === 'unpaid' || b.status === 'overdue');
  const openComplaints = complaints.filter(c => c.status !== 'closed' && c.status !== 'resolved');
  const activeResolution = resolutions.find(r => r.status === 'active');
  const activeVisitors = visitors.filter(v => v.status === 'inside');

  // Chart data for financial collection summary
  const collectionData = [
    { month: 'May', collected: 142000, target: 150000 },
    { month: 'Jun', collected: 148000, target: 150000 },
    { month: 'Jul', collected: 139000, target: 150000 },
    { month: 'Aug', collected: 112000, target: 150000 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>SocietyConnect Flat & Society Operating Hub</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, {activeFlat?.ownerName || 'Resident'}!
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Unit <span className="font-semibold text-emerald-300">{activeFlat?.tower} &bull; {activeFlat?.unitNumber}</span> ({activeFlat?.occupancyStatus.replace('_', ' ')}). All systems operating smoothly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/app/billing"
              className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-semibold text-xs text-white shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 active:scale-95"
            >
              <Receipt className="h-4 w-4" />
              <span>Pay Dues (₹{unpaidBill ? unpaidBill.totalAmount.toLocaleString() : '0'})</span>
            </Link>
            <Link
              to="/app/complaints"
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 font-medium text-xs text-white backdrop-blur-xs transition-all flex items-center gap-2"
            >
              <Wrench className="h-4 w-4" />
              <span>Raise SLA Ticket</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Maintenance Status */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Maintenance Dues</span>
            <div className={`p-2 rounded-xl ${unpaidBill ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'}`}>
              <Receipt className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              {unpaidBill ? `₹${unpaidBill.totalAmount.toLocaleString()}` : '₹0 Due'}
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              {unpaidBill ? (
                <span className="text-amber-600 font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Due by {unpaidBill.dueDate}
                </span>
              ) : (
                <span className="text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Paid for August 2026
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Metric 2: Open SLA Complaints */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Active SLA Tickets</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600">
              <Wrench className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              {openComplaints.length} Open
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <Clock className="h-3 w-3 text-purple-600" />
              <span>Avg SLA resolution: 4.2 hours</span>
            </p>
          </div>
        </div>

        {/* Metric 3: Gate Visitors Inside */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Gate & Visitors</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              {activeVisitors.length} Inside
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <UserCheck className="h-3 w-3 text-blue-600" />
              <span>{staff.filter(s => s.status === 'present').length} daily helpers logged in</span>
            </p>
          </div>
        </div>

        {/* Metric 4: Active E-AGM Voting */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Active AGM Ballot</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
              <Vote className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              {activeResolution ? `${activeResolution.quorumPercentage}% Quorum` : 'No Active Vote'}
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-amber-600" />
              <span>{activeResolution ? `${activeResolution.totalVotes} flat votes cast` : 'Check archives'}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left 2 Cols (Action Center + Tickets) & Right 1 Col (Visitors & Analytics) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Action Shortcuts */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Quick Actions</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link
                to="/app/billing"
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:border-emerald-500/40 transition-all text-left space-y-2 group"
              >
                <Receipt className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Instant Pay</div>
                  <div className="text-[11px] text-slate-500">UPI / Receipts</div>
                </div>
              </Link>

              <Link
                to="/app/visitors"
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-500/40 transition-all text-left space-y-2 group"
              >
                <ShieldCheck className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Pre-Approve</div>
                  <div className="text-[11px] text-slate-500">Cab / Delivery QR</div>
                </div>
              </Link>

              <Link
                to="/app/amenities"
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:border-purple-500/40 transition-all text-left space-y-2 group"
              >
                <CalendarCheck className="h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Book Amenity</div>
                  <div className="text-[11px] text-slate-500">Clubhouse / Pool</div>
                </div>
              </Link>

              <Link
                to="/app/tenants"
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:bg-sky-50 dark:hover:bg-sky-950/30 hover:border-sky-500/40 transition-all text-left space-y-2 group"
              >
                <Users className="h-5 w-5 text-sky-600 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Tenant NOC</div>
                  <div className="text-[11px] text-slate-500">Move-in Pass</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Active SLA Complaints Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Live Complaint Tracker</h3>
                <p className="text-xs text-slate-500">SLA-backed technician dispatches</p>
              </div>
              <Link to="/app/complaints" className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1">
                View All Tickets <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {complaints.slice(0, 3).map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-600">{c.id}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {c.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                        c.priority === 'urgent' ? 'bg-red-500/10 text-red-600' : 'bg-amber-500/10 text-amber-600'
                      }`}>
                        {c.priority}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white">{c.title}</h4>
                    <p className="text-[11px] text-slate-500 truncate max-w-md">{c.description}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1 sm:justify-end">
                      <Clock className="h-3.5 w-3.5 text-purple-600" />
                      <span>SLA: {c.slaDeadline}</span>
                    </div>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {c.assignedTechnician || 'Dispatching Tech'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col) */}
        <div className="space-y-6">
          {/* Active Gate & Visitors Widget */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Active Gate Entry</h3>
              <Link to="/app/visitors" className="text-xs text-emerald-600 hover:underline font-semibold">View Gate Log</Link>
            </div>

            <div className="space-y-3">
              {visitors.slice(0, 3).map((v) => (
                <div key={v.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">{v.name}</p>
                    <p className="text-[11px] text-slate-500">{v.tower} {v.flatNumber} &bull; Code #{v.passCode}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                    v.status === 'inside' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {v.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Society Collection Analytics */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Monthly Dues Collection</h3>
              <p className="text-xs text-slate-500">Collection progress vs Target</p>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={collectionData}>
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']} />
                  <Bar dataKey="collected" radius={[6, 6, 0, 0]}>
                    {collectionData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index === 3 ? '#10b981' : '#6366f1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
