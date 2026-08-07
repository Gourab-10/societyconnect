import React, { useState } from 'react';
import { useSocietyStore } from '@/hooks/useSocietyStore';
import {
  ShieldCheck,
  QrCode,
  UserCheck,
  PlusCircle,
  Truck,
  Car,
  Clock,
  AlertTriangle,
  UserPlus,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

export const VisitorsPage: React.FC = () => {
  const { visitors, staff, addVisitorPass, activeFlat, role } = useSocietyStore();
  const [showPassModal, setShowPassModal] = useState(false);

  // Form State
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [type, setType] = useState<'guest' | 'delivery' | 'cab' | 'service'>('guest');
  const [vehicleNumber, setVehicleNumber] = useState('');

  const handleCreatePass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !visitorPhone) {
      toast.error('Please enter visitor name and phone number');
      return;
    }

    const pass = await addVisitorPass({
      name: visitorName,
      phone: visitorPhone,
      type,
      flatNumber: activeFlat.unitNumber,
      tower: activeFlat.tower,
      vehicleNumber: vehicleNumber || undefined
    });

    setShowPassModal(false);
    setVisitorName('');
    setVisitorPhone('');
    setVehicleNumber('');
    toast.success(`Pre-approved Digital Gate Pass Created!`, {
      description: `Gate Pass Code: #${pass.passCode}. Valid for entry at ${activeFlat.tower}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Gatekeeper & Security Management</h1>
          <p className="text-xs text-slate-500">Real-time visitor pre-approval, delivery QR passes & daily helper attendance</p>
        </div>

        <button
          onClick={() => setShowPassModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-semibold text-xs text-white shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 self-start active:scale-95"
        >
          <QrCode className="h-4 w-4" />
          <span>Pre-Approve Guest / Delivery</span>
        </button>
      </div>

      {/* Daily Helper Staff Attendance */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-emerald-600" />
            Daily Staff & Helpers Attendance (Maids, Drivers)
          </h3>
          <span className="text-xs text-slate-400">Synced with Gate Security</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {staff.map((s) => (
            <div key={s.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{s.name}</h4>
                <p className="text-[11px] text-slate-500">{s.role} &bull; Entry: {s.entryTime}</p>
                <p className="text-[10px] text-emerald-600 mt-1 font-semibold">Assigned: {s.flatsAssigned.join(', ')}</p>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                s.status === 'present' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-200 text-slate-600'
              }`}>
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Visitor Gate Log */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Active Gate Entry Logs</h3>
          <span className="text-xs text-slate-400">Live feed from Guard Kiosk</span>
        </div>

        <div className="space-y-3">
          {visitors.map((v) => (
            <div key={v.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 grid place-items-center shrink-0">
                  {v.type === 'delivery' ? <Truck className="h-5 w-5" /> : <Car className="h-5 w-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{v.name}</h4>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {v.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{v.tower} - Flat {v.flatNumber} &bull; {v.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-600 text-sm block">Pass #{v.passCode}</span>
                  <span className="text-[11px] text-slate-400">Entry: {v.entryTime}</span>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  v.status === 'inside' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 animate-pulse' :
                  v.status === 'expected' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-slate-200 text-slate-600'
                }`}>
                  {v.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-Approve Pass Modal */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreatePass} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Pre-Approve Visitor / Delivery Entry</h3>
              <p className="text-xs text-slate-500">Generates instant 4-digit PIN for Gate Security Kiosk</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Visitor Category</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="guest">Guest / Relative</option>
                    <option value="delivery">Amazon / Zomato Delivery</option>
                    <option value="cab">Cab (Uber / Ola)</option>
                    <option value="service">Home Repair / Service</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Vehicle Number (Optional)</label>
                  <input
                    type="text"
                    placeholder="MH-12-AB-1234"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Visitor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Visitor Phone Number *</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={visitorPhone}
                  onChange={(e) => setVisitorPhone(e.target.value)}
                  className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPassModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/30"
              >
                Generate Pass PIN
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
