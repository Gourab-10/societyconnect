import React, { useState } from 'react';
import { useSocietyStore } from '@/hooks/useSocietyStore';
import {
  Droplets,
  Zap,
  PlusCircle,
  ShieldCheck,
  Clock,
  CheckCircle2,
  TrendingUp,
  Fuel,
  BatteryCharging
} from 'lucide-react';
import { toast } from 'sonner';

export const UtilitiesPage: React.FC = () => {
  const { tankers, dgLogs, evSessions, addTanker, addDGLog } = useSocietyStore();
  const [showTankerModal, setShowTankerModal] = useState(false);
  const [showDGModal, setShowDGModal] = useState(false);

  // Tanker Form
  const [vendorName, setVendorName] = useState('AquaPure Logistics');
  const [capacity, setCapacity] = useState(12000);
  const [cost, setCost] = useState(1800);
  const [slipNumber, setSlipNumber] = useState('SLIP-9905');

  // DG Form
  const [litres, setLitres] = useState(150);
  const [dgCost, setDgCost] = useState(13800);
  const [runtime, setRuntime] = useState(3.0);
  const [powerCut, setPowerCut] = useState('2 hrs 30 mins');

  const handleAddTanker = (e: React.FormEvent) => {
    e.preventDefault();
    addTanker({
      date: new Date().toISOString().split('T')[0],
      vendorName,
      capacityLiters: Number(capacity),
      costPerTanker: Number(cost),
      verifiedByGuard: 'Guard Security Kiosk',
      slipNumber
    });
    setShowTankerModal(false);
    toast.success('Water Tanker Entry Verified & Audited!', {
      description: `Slip #${slipNumber} logged into society utility ledger.`,
    });
  };

  const handleAddDGLog = (e: React.FormEvent) => {
    e.preventDefault();
    addDGLog({
      date: new Date().toISOString().split('T')[0],
      dieselLitresAdded: Number(litres),
      cost: Number(dgCost),
      runtimeHours: Number(runtime),
      powerCutDuration: powerCut
    });
    setShowDGModal(false);
    toast.success('Diesel Generator (DG) Fuel Logged!', {
      description: `${litres}L diesel added. Hour meter updated.`,
    });
  };

  const totalWaterCost = tankers.reduce((acc, t) => acc + t.costPerTanker, 0);
  const totalDGCost = dgLogs.reduce((acc, d) => acc + d.cost, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Water & Fuel Expense Audit Hub</h1>
          <p className="text-xs text-slate-500">Prevent vendor inflation with verified tanker slips & DG generator fuel logs</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTankerModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 font-semibold text-xs text-white shadow-md transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Droplets className="h-4 w-4" />
            <span>Log Water Tanker</span>
          </button>

          <button
            onClick={() => setShowDGModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 font-semibold text-xs text-white shadow-md transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Fuel className="h-4 w-4" />
            <span>Log DG Diesel Fuel</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Water Tanker Expenditure</span>
            <Droplets className="h-4 w-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            ₹{totalWaterCost.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">{tankers.length} tankers delivered this month</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">DG Diesel Fuel Cost</span>
            <Fuel className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            ₹{totalDGCost.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">Total DG Runtime: {dgLogs.reduce((a, d) => a + d.runtimeHours, 0)} hrs</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">EV Power Stations</span>
            <BatteryCharging className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            {evSessions.length} Active Sessions
          </div>
          <p className="text-[11px] text-slate-500">Auto-billed to flat maintenance</p>
        </div>
      </div>

      {/* Water Tanker Verification Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Droplets className="h-5 w-5 text-cyan-600" /> Verified Water Tanker Gate Deliveries
        </h3>

        <div className="space-y-3">
          {tankers.map((t) => (
            <div key={t.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-600">{t.slipNumber}</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{t.vendorName}</span>
                </div>
                <p className="text-[11px] text-slate-500">{t.capacityLiters.toLocaleString()} Litres &bull; Delivered on {t.date}</p>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Guard Verified
                </span>
                <span className="font-bold text-slate-900 dark:text-white">₹{t.costPerTanker.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tanker Modal */}
      {showTankerModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleAddTanker} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Log Water Tanker Delivery</h3>
              <p className="text-xs text-slate-500">Requires physical slip number & gate guard verification</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Vendor Name</label>
                <input
                  type="text"
                  required
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Capacity (Litres)</label>
                  <input
                    type="number"
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Cost (₹)</label>
                  <input
                    type="number"
                    required
                    value={cost}
                    onChange={(e) => setCost(Number(e.target.value))}
                    className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Physical Slip Number</label>
                <input
                  type="text"
                  required
                  value={slipNumber}
                  onChange={(e) => setSlipNumber(e.target.value)}
                  className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowTankerModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl shadow-md shadow-cyan-600/30"
              >
                Save Delivery Slip
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DG Fuel Modal */}
      {showDGModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleAddDGLog} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Log DG Generator Diesel Refill</h3>
              <p className="text-xs text-slate-500">Tracks generator fuel efficiency and runtime audit</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Diesel Litres</label>
                  <input
                    type="number"
                    required
                    value={litres}
                    onChange={(e) => setLitres(Number(e.target.value))}
                    className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Total Cost (₹)</label>
                  <input
                    type="number"
                    required
                    value={dgCost}
                    onChange={(e) => setDgCost(Number(e.target.value))}
                    className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Runtime Hours</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={runtime}
                  onChange={(e) => setRuntime(Number(e.target.value))}
                  className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDGModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-md shadow-amber-600/30"
              >
                Log DG Refill
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
