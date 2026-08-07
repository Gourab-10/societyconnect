import React from 'react';
import { useSocietyStore } from '@/hooks/useSocietyStore';
import {
  UserCheck,
  Star,
  ShieldCheck,
  PhoneCall,
  UserPlus,
  Building
} from 'lucide-react';
import { toast } from 'sonner';

export const HelpersPage: React.FC = () => {
  const { staff } = useSocietyStore();

  const handleHireRequest = (staffName: string, role: string) => {
    toast.success(`Contact Request Sent to ${staffName}!`, {
      description: `${role} will be notified for work availability in your unit.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Verified Domestic Helper Directory</h1>
          <p className="text-xs text-slate-500">Find rated & police-verified Maids, Drivers, Cooks, Nannies & Car Cleaners working in your society</p>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {staff.map((s) => (
          <div key={s.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">{s.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      {s.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{s.experienceYears} years experience &bull; Working in {s.flatsAssigned.length} flats</p>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-xl">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  <span>{s.rating}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({s.reviewsCount})</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-xs space-y-1">
                <span className="text-slate-400 block text-[11px]">Flats currently serving:</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{s.flatsAssigned.join(', ')}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> Police Verified
              </span>

              <button
                onClick={() => handleHireRequest(s.name, s.role)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
              >
                <PhoneCall className="h-3.5 w-3.5" /> Request Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
