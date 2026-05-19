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
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-semibold">Leads Managed</span>
                <span className="text-slate-250 font-bold">{member.leadsManaged} leads</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-semibold">Tasks Completed</span>
                <span className="text-slate-250 font-bold">{member.tasksCompleted} tasks</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-semibold">Revenue Closed</span>
                <span className="text-indigo-400 font-bold">${member.revenueGenerated.toLocaleString()}</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1.5 pt-1.5">
              <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                <span>Efficiency Rate</span>
                <span className="text-indigo-400">{member.performanceRate}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-950 border border-slate-850 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-650 rounded-full"
                  style={{ width: `${member.performanceRate}%` }}
                />
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Role permissions table widgets */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <h3 className="text-sm font-bold text-white">Workspace Role Permissions (Read Only)</h3>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="pb-3">Module Permissions</th>
                <th className="pb-3">Admin / Owner</th>
                <th className="pb-3">Sales Manager</th>
                <th className="pb-3">Support Desk</th>
                <th className="pb-3">Marketing Desk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-slate-400">
              <tr className="hover:bg-slate-900/10">
                <td className="py-2.5 font-semibold text-slate-300">Total Dashboard Analytics</td>
                <td><span className="text-emerald-400 font-semibold">Full Access</span></td>
                <td><span className="text-emerald-450 font-semibold">Full Access</span></td>
                <td><span className="text-slate-500">Read Only</span></td>
                <td><span className="text-slate-500">Read Only</span></td>
              </tr>
              <tr className="hover:bg-slate-900/10">
                <td className="py-2.5 font-semibold text-slate-300">Pipeline Drag & Drop Actions</td>
                <td><span className="text-emerald-400 font-semibold">Full Access</span></td>
                <td><span className="text-emerald-400 font-semibold">Full Access</span></td>
                <td><span className="text-rose-500">Restricted</span></td>
                <td><span className="text-rose-500">Restricted</span></td>
              </tr>
              <tr className="hover:bg-slate-900/10">
                <td className="py-2.5 font-semibold text-slate-300">Customer profiles modifications</td>
                <td><span className="text-emerald-400 font-semibold">Full Access</span></td>
                <td><span className="text-indigo-400">Modify Notes</span></td>
                <td><span className="text-indigo-400">Modify Notes</span></td>
                <td><span className="text-rose-500">Restricted</span></td>
              </tr>
              <tr className="hover:bg-slate-900/10">
                <td className="py-2.5 font-semibold text-slate-300">Internal Billing & Revenue logs</td>
                <td><span className="text-emerald-400 font-semibold">Full Access</span></td>
                <td><span className="text-rose-500">Restricted</span></td>
                <td><span className="text-rose-500">Restricted</span></td>
                <td><span className="text-rose-500">Restricted</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-2 flex items-center gap-2 text-[10px] text-slate-500">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Permissions are currently UI-only. Role changes can be simulated inside the Top navbar or the Settings module.</span>
        </div>
      </div>

    </div>
  );
}
