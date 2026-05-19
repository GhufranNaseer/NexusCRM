import React from 'react';
import { useCRMStore } from '../store/useCRMStore';
import { ShieldCheck, UserCheck, Briefcase, Award, ArrowUpRight, ShieldAlert } from 'lucide-react';

export default function Team() {
  const team = useCRMStore((state) => state.team);

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin / Owner': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'Sales Manager': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Support Team': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Team Desk</h2>
        <p className="text-slate-400 text-xs mt-0.5">Manage and track performance metrics, assigned pipeline volumes, and roles for internal workspace representatives.</p>
      </div>

      {/* Roster Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {team.map((member) => (
          <div key={member.id} className="glass-card glass-card-hover p-5 flex flex-col text-xs space-y-4 animate-page-fade">
            {/* Header profile */}
            <div className="flex items-center gap-3">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-11 h-11 rounded-full border border-indigo-500/30 bg-slate-900 shadow-md shadow-indigo-500/5"
              />
              <div className="min-w-0">
                <h4 className="font-bold text-slate-200 truncate">{member.name}</h4>
                <span className={`inline-block text-[8px] px-2 py-0.5 rounded font-bold border uppercase tracking-wider mt-1 ${getRoleColor(member.role)}`}>
                  {member.role.split(' ')[0] || member.role}
                </span>
              </div>
            </div>

            {/* Performance Indicators */}
            <div className="space-y-2 pt-2 border-t border-slate-850">
