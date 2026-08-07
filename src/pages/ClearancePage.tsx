import React, { useState } from 'react';
import { useSocietyStore } from '@/hooks/useSocietyStore';
import {
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Truck,
  PlusCircle,
  ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';

export const ClearancePage: React.FC = () => {
  const { clearances, addClearance, activeFlat } = useSocietyStore();
  const [showModal, setShowModal] = useState(false);

  const [moveOutDate, setMoveOutDate] = useState('2026-08-31');
  const [duesCleared, setDuesCleared] = useState(true);
  const [parkingReturned, setParkingReturned] = useState(true);
  const [liftPadding, setLiftPadding] = useState(true);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    addClearance({
      flatNumber: activeFlat.unitNumber,
      tower: activeFlat.tower,
      residentName: activeFlat.ownerName,
      moveOutDate,
      duesCleared,
      parkingBadgeReturned: parkingReturned,
      liftPaddingRequested: liftPadding
    });
    setShowModal(false);
    toast.success('Digital Move-Out Clearance Pass Issued!', {
      description: `Gate pass sent to security for ${moveOutDate}. Freight lift reserved.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Move-Out Clearance & Gate Pass Hub</h1>
          <p className="text-xs text-slate-500">Automated dues settlement, parking tag return & freight lift padding request for smooth move-out</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-semibold text-xs text-white shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 self-start active:scale-95"
        >
          <Truck className="h-4 w-4" />
          <span>Apply for Move-Out Clearance Pass</span>
        </button>
      </div>

      {/* Registry Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Active Move-Out Gate Clearance Passes</h3>

        <div className="space-y-3">
          {clearances.map((c) => (
            <div key={c.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 dark:border-slate-700/60 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{c.residentName} ({c.tower} - {c.flatNumber})</h4>
                  <p className="text-xs text-slate-500">Scheduled Move Date: {c.moveOutDate}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Gate Status: {c.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Dues Settled: ₹0 Pending</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>RFID Parking Tag Returned</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Lift Padding Installed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clearance Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleApply} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Request Move-Out Clearance & Gate Pass</h3>
              <p className="text-xs text-slate-500">For unit {activeFlat?.tower} - {activeFlat?.unitNumber}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Target Move-Out Date *</label>
                <input
                  type="date"
                  required
                  value={moveOutDate}
                  onChange={(e) => setMoveOutDate(e.target.value)}
                  className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={duesCleared}
                    onChange={(e) => setDuesCleared(e.target.checked)}
                    className="h-4 w-4 text-emerald-600 rounded-xs"
                  />
                  <span>All maintenance & utility bills verified paid</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={parkingReturned}
                    onChange={(e) => setParkingReturned(e.target.checked)}
                    className="h-4 w-4 text-emerald-600 rounded-xs"
                  />
                  <span>Handover RFID Parking Vehicle Sticker to Gate</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={liftPadding}
                    onChange={(e) => setLiftPadding(e.target.checked)}
                    className="h-4 w-4 text-emerald-600 rounded-xs"
                  />
                  <span>Request protective foam padding for Freight Lift on move date</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/30"
              >
                Generate Move-Out Gate Pass
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
