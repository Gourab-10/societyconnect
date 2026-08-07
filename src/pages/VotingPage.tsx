import React, { useState } from 'react';
import { useSocietyStore } from '@/hooks/useSocietyStore';
import {
  Vote,
  TrendingUp,
  CheckCircle2,
  Lock,
  Users,
  ShieldCheck,
  Award
} from 'lucide-react';
import { toast } from 'sonner';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export const VotingPage: React.FC = () => {
  const { resolutions, castVote, activeFlat } = useSocietyStore();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleVoteSubmit = (resolutionId: string) => {
    const selected = selectedOptions[resolutionId];
    if (!selected) {
      toast.error('Please select an option before casting vote');
      return;
    }

    castVote(resolutionId, selected);
    toast.success('Your Secret Ballot Vote Has Been Cast & Encrypted!', {
      description: `Vote recorded for Unit ${activeFlat.tower} ${activeFlat.unitNumber}. Quorum updated in real-time.`,
    });
  };

  const COLORS = ['#10b981', '#f43f5e', '#64748b'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Verifiable E-AGM & Digital Voting</h1>
          <p className="text-xs text-slate-500">Secure secret balloting for resident & non-resident owners with live quorum telemetry</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-950 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5">
            <Lock className="h-4 w-4" /> Cryptographic Secret Ballot Engine
          </span>
        </div>
      </div>

      {/* Resolutions List */}
      <div className="space-y-6">
        {resolutions.map((r) => (
          <div key={r.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-600">{r.id}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {r.category}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    r.status === 'active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-blue-500/10 text-blue-600'
                  }`}>
                    {r.status}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">{r.title}</h3>
              </div>

              {/* Quorum Metric */}
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{r.quorumPercentage}% Quorum Reached</div>
                  <p className="text-[11px] text-slate-500">{r.totalVotes} total flat votes registered</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">{r.description}</p>

            {/* Voting Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Radio Options Form */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Cast Your Flat Vote:</label>
                {r.options.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedOptions[r.id] === opt.id
                        ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`res-${r.id}`}
                        value={opt.id}
                        checked={selectedOptions[r.id] === opt.id}
                        onChange={() => setSelectedOptions({ ...selectedOptions, [r.id]: opt.id })}
                        className="h-4 w-4 text-emerald-600"
                      />
                      <span className="text-xs font-medium">{opt.label}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">{opt.votes} votes</span>
                  </label>
                ))}

                {r.status === 'active' && (
                  <button
                    onClick={() => handleVoteSubmit(r.id)}
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-semibold text-xs text-white shadow-md shadow-emerald-600/20 active:scale-98 transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <Vote className="h-4 w-4" />
                    <span>Cast Encrypted Vote</span>
                  </button>
                )}
              </div>

              {/* Right Column: Telemetry Pie Chart */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center space-y-2">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Live Vote Telemetry</h4>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={r.options}
                        dataKey="votes"
                        nameKey="label"
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={4}
                      >
                        {r.options.map((_, idx) => (
                          <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: number) => [`${v} votes`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
