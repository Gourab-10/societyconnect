import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSocietyStore } from '@/hooks/useSocietyStore';
import { UserRole } from '@/types/society';
import {
  LayoutDashboard,
  Receipt,
  Users,
  Wrench,
  ShieldCheck,
  CalendarCheck,
  Vote,
  FileText,
  Building2,
  Bell,
  AlertTriangle,
  ChevronDown,
  Building,
  UserCheck,
  Sparkles,
  ArrowLeft,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole, activeFlat, flats, setActiveFlatId } = useSocietyStore();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [emergencyReason, setEmergencyReason] = useState('Elevator Emergency / Fire Alarm');

  const navItems = [
    { label: 'Dashboard', path: '/app', icon: LayoutDashboard },
    { label: 'Billing & Payments', path: '/app/billing', icon: Receipt },
    { label: 'Water & Fuel Audit', path: '/app/utilities', icon: Building },
    { label: 'Tenant & NOC Hub', path: '/app/tenants', icon: Users },
    { label: 'SLA Complaints', path: '/app/complaints', icon: Wrench },
    { label: 'Gatekeeper & Security', path: '/app/visitors', icon: ShieldCheck },
    { label: 'Amenity Booking', path: '/app/amenities', icon: CalendarCheck },
    { label: 'E-AGM & Voting', path: '/app/voting', icon: Vote },
    { label: 'Domestic Helpers', path: '/app/helpers', icon: UserCheck },
    { label: 'Move-Out Clearance', path: '/app/clearance', icon: Sparkles },
    { label: 'Society Vault', path: '/app/documents', icon: FileText },
    { label: 'Admin Governance', path: '/app/admin', icon: Building2 },
  ];

  const roleLabels: Record<UserRole, { label: string; badge: string; bg: string }> = {
    owner: { label: 'Flat Owner', badge: 'Owner Mode', bg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
    tenant: { label: 'Tenant', badge: 'Tenant Mode', bg: 'bg-sky-500/10 text-sky-600 border-sky-500/20' },
    admin: { label: 'Committee Admin', badge: 'Admin Console', bg: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
    guard: { label: 'Gate Security', badge: 'Security Kiosk', bg: 'bg-amber-500/10 text-amber-600 border-amber-500/20' }
  };

  const handleTriggerEmergency = () => {
    setShowEmergencyModal(false);
    toast.error(`🚨 SOS EMERGENCY BROADCAST SENT!`, {
      description: `Alert sent to Gate Guard, Committee Leads & ${activeFlat?.tower} residents: "${emergencyReason}"`,
      duration: 8000,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 h-16 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 grid place-items-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Building className="h-5 w-5" />
            </div>
            <span>SocietyConnect <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">OS 2.0</span></span>
          </Link>

          <Link to="/" className="hidden md:flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Landing Page
          </Link>
        </div>

        {/* Center/Right Controls */}
        <div className="flex items-center gap-3">
          {/* Active Flat Switcher */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 px-3 py-1.5 rounded-xl text-xs">
            <Building2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-slate-500 dark:text-slate-400">Unit:</span>
            <select
              value={activeFlat?.id || ''}
              onChange={(e) => setActiveFlatId(e.target.value)}
              className="bg-transparent font-semibold text-slate-900 dark:text-slate-100 focus:outline-hidden cursor-pointer"
            >
              {flats.map((f) => (
                <option key={f.id} value={f.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  {f.tower} - {f.unitNumber} ({f.ownerName})
                </option>
              ))}
            </select>
          </div>

          {/* Emergency Panic Button */}
          <button
            onClick={() => setShowEmergencyModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-xs shadow-xs hover:shadow-red-500/20 transition-all active:scale-95 animate-pulse"
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>SOS Alert</span>
          </button>

          {/* Role Switcher Menu */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-2xs transition-all ${roleLabels[role].bg}`}
            >
              <UserCheck className="h-4 w-4" />
              <span>{roleLabels[role].label}</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
                  Switch System View
                </div>
                {(['owner', 'tenant', 'admin', 'guard'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setShowRoleMenu(false);
                      toast.success(`Switched to ${roleLabels[r].label} view`);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 ${
                      role === r ? 'text-emerald-600 font-bold bg-emerald-50/50 dark:bg-emerald-950/30' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{roleLabels[r].label}</span>
                    {role === r && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 hidden md:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 space-y-1.5 shrink-0">
          <div className="px-3 py-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Society Workspace</p>
            <p className="text-xs font-semibold text-slate-900 dark:text-slate-200 mt-0.5 truncate">{activeFlat?.tower} &bull; Flat {activeFlat?.unitNumber}</p>
          </div>

          <nav className="flex-1 space-y-1 mt-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/app' && location.pathname.startsWith(item.path));
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-600/20'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Info Box */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-900/10 via-teal-900/5 to-slate-900/10 border border-emerald-500/20 dark:border-emerald-500/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Sparkles className="h-4 w-4" />
              <span>SocietyConnect Intelligent SLA</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              24/7 automated bill breakdown, tenant NOC verification & ticket dispatch.
            </p>
          </div>
        </aside>

        {/* Mobile Navigation bar at top */}
        <div className="md:hidden flex overflow-x-auto bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-2 gap-1 scrollbar-none">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs whitespace-nowrap font-medium ${
                  isActive ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>

      {/* Emergency Trigger Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600">
              <div className="h-10 w-10 rounded-2xl bg-red-100 dark:bg-red-950/60 grid place-items-center">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Trigger Society SOS Alert</h3>
                <p className="text-xs text-slate-500">Broadcasting to Gate, Committee & {activeFlat?.tower}</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Select Emergency Reason:</label>
              <select
                value={emergencyReason}
                onChange={(e) => setEmergencyReason(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden"
              >
                <option value="Elevator Stuck / Failure">Elevator Stuck / Trap Failure</option>
                <option value="Fire / Smoke Leak">Fire / Smoke Leak Alert</option>
                <option value="Medical Emergency - Ambulance Needed">Medical Emergency - Ambulance Needed</option>
                <option value="Security Intrusion / Suspicious Activity">Security Intrusion / Suspicious Activity</option>
                <option value="Water Pipe Burst / Flooding">Water Pipe Burst / Flooding</option>
              </select>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleTriggerEmergency}
                className="px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md shadow-red-600/30 transition-all"
              >
                BROADCAST NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
