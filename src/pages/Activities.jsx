import React, { useState } from 'react';
import { useCRMStore } from '../store/useCRMStore';
import {
  History,
  Phone,
  Mail,
  Calendar,
  FileText,
  TrendingUp,
  TrendingDown,
  Filter
} from 'lucide-react';

export default function Activities() {
  const activities = useCRMStore((state) => state.activities);
  const [filterType, setFilterType] = useState('All');

  // Filter Logic
  const filteredActivities = activities.filter((act) => {
    if (filterType === 'All') return true;
    return act.type === filterType;
  });

  const getActIcon = (type) => {
    switch (type) {
      case 'Call': return <Phone className="w-4 h-4 text-blue-400" />;
      case 'Email': return <Mail className="w-4 h-4 text-indigo-400" />;
      case 'Meeting': return <Calendar className="w-4 h-4 text-emerald-400" />;
      case 'Won': return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case 'Lost': return <TrendingDown className="w-4 h-4 text-rose-400" />;
      default: return <FileText className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Activity Timeline</h2>
          <p className="text-slate-400 text-xs mt-0.5">Chronological audit ledger tracing pipeline updates, staff notes, email threads, and client contact.</p>
        </div>
      </div>

      {/* Timeline Controls */}
      <div className="flex flex-wrap items-center gap-2 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mr-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter:</span>
        </div>
        {['All', 'Call', 'Email', 'Meeting', 'Note'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              filterType === type
                ? 'bg-indigo-600 text-white border-indigo-500 shadow shadow-indigo-600/10'
                : 'bg-transparent border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {type === 'All' ? 'Show All' : `${type}s`}
          </button>
        ))}
      </div>

      {/* Vertical Timeline Card */}
      <div className="glass-card p-6">
        <div className="relative border-l border-slate-850 pl-6 ml-3 space-y-8 py-2">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              No timeline activities match the selected filter.
            </div>
          ) : (
            filteredActivities.map((act) => (
              <div key={act.id} className="relative text-xs leading-relaxed group animate-page-fade">
                
                {/* Node Dot / Icon */}
                <div className="absolute -left-[37px] top-0 w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center shadow-lg group-hover:border-slate-650 transition-colors">
                  {getActIcon(act.type)}
                </div>

                {/* Content Box */}
                <div className="glass-card p-4 glass-card-hover relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-white leading-snug">{act.title}</h3>
                      <span className="text-[9px] bg-slate-950 px-2 py-0.5 rounded font-bold border border-slate-800 text-slate-400 uppercase tracking-wider">
                        {act.type}
                      </span>
                    </div>
                    <p className="text-slate-350 leading-relaxed max-w-2xl">{act.description}</p>
                  </div>

                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-slate-850 pt-2.5 md:pt-0">
                    <span className="text-[10px] text-slate-500 font-semibold">{act.date}</span>
                    <span className="text-[9px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/10 mt-1 uppercase tracking-wide">
                      {act.refName}
                    </span>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
