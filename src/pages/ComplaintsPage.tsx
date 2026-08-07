import React, { useState } from 'react';
import { useSocietyStore } from '@/hooks/useSocietyStore';
import { ComplaintCategory, ComplaintPriority } from '@/types/society';
import {
  Wrench,
  Clock,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  Star,
  UserCheck,
  Building,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

export const ComplaintsPage: React.FC = () => {
  const { complaints, addComplaint, activeFlat } = useSocietyStore();
  const [showNewModal, setShowNewModal] = useState(false);

  // Form State
  const [category, setCategory] = useState<ComplaintCategory>('Plumbing');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<ComplaintPriority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error('Please fill title and description');
      return;
    }

    addComplaint({
      flatNumber: activeFlat.unitNumber,
      tower: activeFlat.tower,
      residentName: activeFlat.ownerName,
      category,
      title,
      description,
      priority,
    });

    setShowNewModal(false);
    setTitle('');
    setDescription('');
    toast.success('Complaint Ticket Logged & Dispatched!', {
      description: `SLA timer started. Emergency vendor notified for ${category}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">SLA Service Desk & Maintenance Tracker</h1>
          <p className="text-xs text-slate-500">Every ticket is backed by strict SLAs, technician dispatches & resident sign-off</p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-semibold text-xs text-white shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 self-start active:scale-95"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Log New Maintenance Ticket</span>
        </button>
      </div>

      {/* Ticket Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {complaints.map((c) => (
          <div key={c.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 hover:border-emerald-500/40 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">{c.id}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {c.category}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    c.priority === 'urgent' ? 'bg-red-500/10 text-red-600' : 'bg-amber-500/10 text-amber-600'
                  }`}>
                    {c.priority}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">{c.title}</h3>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase shrink-0 ${
                c.status === 'resolved' || c.status === 'closed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
              }`}>
                {c.status.replace('_', ' ')}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{c.description}</p>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <UserCheck className="h-4 w-4 text-emerald-600" />
                <span className="font-semibold">{c.assignedTechnician || 'Auto-dispatching technician'}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500">
                <Clock className="h-3.5 w-3.5 text-purple-600" />
                <span>SLA: {c.slaDeadline}</span>
              </div>
            </div>

            {c.resolutionNotes && (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Resolution Verified
                </span>
                <p className="text-emerald-950 dark:text-emerald-200">{c.resolutionNotes}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Ticket Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Raise Maintenance SLA Ticket</h3>
              <p className="text-xs text-slate-500">Auto-routes to vendor technician with 24-hr countdown</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Issue Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
                    className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Elevator">Elevator</option>
                    <option value="Security">Security</option>
                    <option value="Carpentry">Carpentry</option>
                    <option value="General">General Common Area</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Urgency Level *</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as ComplaintPriority)}
                    className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="low">Low Priority (48 hr SLA)</option>
                    <option value="medium">Medium Priority (24 hr SLA)</option>
                    <option value="high">High Priority (12 hr SLA)</option>
                    <option value="urgent">URGENT Emergency (2 hr SLA)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Problem Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Water leak in balcony pipe"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Detailed Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe location, symptoms and exact issue..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/30"
              >
                Dispatch Ticket
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
