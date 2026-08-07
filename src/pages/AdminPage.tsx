import React from 'react';
import { useSocietyStore } from '@/hooks/useSocietyStore';
import {
  Building2,
  AlertTriangle,
  Clock,
  Megaphone,
  CheckCircle2,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import { toast } from 'sonner';

export const AdminPage: React.FC = () => {
  const { vendors, flats } = useSocietyStore();

  const handleBroadcast = () => {
    toast.success('Emergency Broadcast Sent to All Residents!', {
      description: 'Push notification & SMS sent to all 248 flat owners & tenants.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Management Committee Governance Console</h1>
          <p className="text-xs text-slate-500">Vendor AMC contract alerts, society broadcast center & financial audit tools</p>
        </div>

        <button
          onClick={handleBroadcast}
          className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 font-semibold text-xs text-white shadow-lg shadow-purple-600/25 transition-all flex items-center gap-2 self-start active:scale-95"
        >
          <Megaphone className="h-4 w-4" />
          <span>Send Society Emergency Broadcast</span>
        </button>
      </div>

      {/* Vendor Contracts & AMC Expiry Engine */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-purple-600" />
            Vendor Contracts & AMC Renewal Engine
          </h3>
          <span className="text-xs text-slate-400">{vendors.length} active service agreements</span>
        </div>

        <div className="space-y-3">
          {vendors.map((v) => (
            <div key={v.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{v.serviceName}</h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    v.status === 'expiring_soon' ? 'bg-amber-500/10 text-amber-600 animate-pulse' : 'bg-emerald-500/10 text-emerald-600'
                  }`}>
                    {v.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{v.vendorName} &bull; Contact: {v.contactPerson} ({v.phone})</p>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <span className="font-bold text-slate-900 dark:text-white block">₹{v.monthlyCost.toLocaleString()}/mo</span>
                  <span className="text-[11px] text-slate-400">Expires: {v.contractEndDate}</span>
                </div>

                <button
                  onClick={() => toast.success(`Initiated AMC renewal for ${v.serviceName}`)}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white font-semibold text-xs hover:bg-purple-700 transition-colors"
                >
                  Renew AMC
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flat Master Registry Matrix */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Society Flat Master Registry</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Unit</th>
                <th className="py-3 px-4">Area (Sq.Ft)</th>
                <th className="py-3 px-4">Owner</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Parking Slot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {flats.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{f.tower} - {f.unitNumber}</td>
                  <td className="py-3 px-4">{f.areaSqFt} sq.ft</td>
                  <td className="py-3 px-4">{f.ownerName}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      f.isRented ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {f.occupancyStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold">{f.parkingSlot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
