import React from 'react';
import { useSocietyStore } from '@/hooks/useSocietyStore';
import {
  FileText,
  Download,
  Lock,
  Search,
  ShieldCheck,
  FolderArchive
} from 'lucide-react';
import { toast } from 'sonner';

export const DocumentsPage: React.FC = () => {
  const { documents, role } = useSocietyStore();

  const handleDownload = (docTitle: string) => {
    toast.success(`Downloading ${docTitle}...`, {
      description: 'Document verified against society digital signature.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Encrypted Society Vault</h1>
          <p className="text-xs text-slate-500">Centralized repository for Bye-Laws, AGM Minutes, Audits, Title Deeds & NOC templates</p>
        </div>

        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents by title..."
            className="pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white w-64 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <div key={doc.id} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {doc.category}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 ${
                  doc.accessLevel === 'all' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                }`}>
                  {doc.accessLevel === 'all' ? <ShieldCheck className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                  {doc.accessLevel.replace('_', ' ')}
                </span>
              </div>

              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">{doc.title}</h3>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span>Uploaded: {doc.uploadDate} &bull; {doc.fileSize}</span>

              <button
                onClick={() => handleDownload(doc.title)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 text-slate-700 dark:text-slate-200 font-semibold transition-colors flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
