import React, { useState } from 'react';
import { useCRMStore } from '../store/useCRMStore';
import {
  TrendingUp,
  Users,
  Briefcase,
  DollarSign,
  Plus,
  ArrowRight,
  TrendingDown,
  Activity,
  Phone,
  Mail,
  Calendar,
  FileText
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';

export default function Dashboard() {
  const leads = useCRMStore((state) => state.leads);
  const customers = useCRMStore((state) => state.customers);
  const activities = useCRMStore((state) => state.activities);
  const addLead = useCRMStore((state) => state.addLead);

  const [showAddLead, setShowAddLead] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadCompany, setNewLeadCompany] = useState('');
  const [newLeadVal, setNewLeadVal] = useState('');
  const [newLeadPriority, setNewLeadPriority] = useState('Medium');
  const [newLeadSource, setNewLeadSource] = useState('Website');

  // Math KPI Calculations
  const totalLeadsCount = leads.length;
  const convertedCustomersCount = customers.filter(c => c.status === 'Active').length;
  const activeDealsCount = leads.filter(l => l.status !== 'Won' && l.status !== 'Lost').length;
  const totalRevenueVal = customers.reduce((sum, c) => sum + c.totalValue, 0);

  // Recharts Data Processing
  const pipelineChartData = [
    { name: 'New Leads', value: leads.filter(l => l.status === 'New Lead').length },
    { name: 'Contacted', value: leads.filter(l => l.status === 'Contacted').length },
    { name: 'Proposal', value: leads.filter(l => l.status === 'Proposal Sent').length },
    { name: 'Negotiation', value: leads.filter(l => l.status === 'Negotiation').length },
    { name: 'Won', value: leads.filter(l => l.status === 'Won').length },
  ];

  const sparklineDataLeads = [
    { v: 12 }, { v: 15 }, { v: 13 }, { v: 18 }, { v: 14 }, { v: 22 }, { v: totalLeadsCount }
  ];
  const sparklineDataRevenue = [
    { v: 45000 }, { v: 62000 }, { v: 58000 }, { v: 75000 }, { v: 82000 }, { v: 95000 }, { v: totalRevenueVal }
  ];

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLeadName || !newLeadCompany || !newLeadVal) return;

    addLead({
      name: newLeadName,
      company: newLeadCompany,
      contactName: newLeadName.split(' ')[0] || 'Contact',
      email: `${newLeadName.toLowerCase().replace(/ /g, '')}@${newLeadCompany.toLowerCase().replace(/ /g, '')}.com`,
      phone: '+92 300 0000000',
      value: parseFloat(newLeadVal) || 5000,
      priority: newLeadPriority,
      source: newLeadSource,
      status: 'New Lead'
    });

    setNewLeadName('');
    setNewLeadCompany('');
    setNewLeadVal('');
    setShowAddLead(false);
  };

  const getActIcon = (type) => {
    switch (type) {
      case 'Call': return <Phone className="w-3.5 h-3.5 text-blue-400" />;
      case 'Email': return <Mail className="w-3.5 h-3.5 text-indigo-400" />;
      case 'Meeting': return <Calendar className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Won': return <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Lost': return <TrendingDown className="w-3.5 h-3.5 text-rose-400" />;
      default: return <FileText className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Dashboard Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Dashboard Overview</h2>
          <p className="text-slate-400 text-xs mt-0.5">Real-time analytical summary of your sales and pipeline actions.</p>
        </div>
        <button
          onClick={() => setShowAddLead(true)}
          className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 text-white transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Lead</span>
        </button>
      </div>

      {/* 4 KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* KPI 1: Leads */}
        <div className="glass-card glass-card-hover glow-indigo p-5 flex flex-col relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-slate-400">Total Leads</span>
            <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-white">{totalLeadsCount}</span>
            <span className="text-[10px] font-semibold text-emerald-400 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10">
              +14%
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium mb-3">Target: 30 active deals</span>
          <div className="h-10 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineDataLeads}>
                <Area type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={1.5} fill="rgba(99, 102, 241, 0.05)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPI 2: Converted Clients */}
        <div className="glass-card glass-card-hover glow-emerald p-5 flex flex-col relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-slate-400">Converted Clients</span>
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-white">{convertedCustomersCount}</span>
            <span className="text-[10px] font-semibold text-emerald-400 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10">
              +8%
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium mb-3">Conversion Rate: {Math.round((convertedCustomersCount / (totalLeadsCount || 1)) * 100)}%</span>
          <div className="h-10 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineDataLeads}>
                <Area type="monotone" dataKey="v" stroke="#10b981" strokeWidth={1.5} fill="rgba(16, 185, 129, 0.05)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPI 3: Active Deals */}
        <div className="glass-card glass-card-hover glow-amber p-5 flex flex-col relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-slate-400">Active Deals</span>
            <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-white">{activeDealsCount}</span>
            <span className="text-[10px] font-semibold text-slate-400 flex items-center bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700/50">
              0% change
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium mb-3">Valued at ${leads.filter(l => l.status !== 'Won' && l.status !== 'Lost').reduce((sum, l) => sum + l.value, 0).toLocaleString()}</span>
          <div className="h-10 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineDataLeads}>
                <Area type="monotone" dataKey="v" stroke="#f59e0b" strokeWidth={1.5} fill="rgba(245, 158, 11, 0.05)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPI 4: Total Revenue */}
        <div className="glass-card glass-card-hover glow-rose p-5 flex flex-col relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-slate-400">Total Revenue</span>
            <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20 text-rose-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-white">${totalRevenueVal.toLocaleString()}</span>
            <span className="text-[10px] font-semibold text-emerald-400 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/10">
              +18.5%
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium mb-3">Accumulated SaaS billing</span>
          <div className="h-10 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineDataRevenue}>
                <Area type="monotone" dataKey="v" stroke="#f43f5e" strokeWidth={1.5} fill="rgba(244, 63, 94, 0.05)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Visual Analytics Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Funnel Chart Widget */}
        <div className="glass-card p-5 lg:col-span-2 flex flex-col">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-white">Pipeline Conversion Funnel</h3>
            <p className="text-slate-500 text-[11px] mt-0.5">Summary of leads grouped by their current statuses.</p>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '11px'
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {pipelineChartData.map((entry, index) => {
                    const colors = ['#6366f1', '#3b82f6', '#f59e0b', '#a855f7', '#10b981'];
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} fillOpacity={0.85} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Activity Summary Timeline Panel */}
        <div className="glass-card p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Recent Activities</h3>
              <p className="text-slate-500 text-[11px] mt-0.5">Automated workspace log audits.</p>
            </div>
            <Activity className="w-4 h-4 text-slate-500" />
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto max-h-64 pr-1">
            {activities.slice(0, 4).map((activity) => (
              <div key={activity.id} className="flex gap-3 text-xs leading-relaxed">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700/50 flex items-center justify-center flex-shrink-0">
                    {getActIcon(activity.type)}
                  </div>
                  <div className="w-[1px] flex-1 bg-slate-800 mt-2" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="font-semibold text-slate-200 truncate">{activity.title}</h4>
                    <span className="text-[9px] text-slate-500 whitespace-nowrap ml-2">{activity.date.split(' ')[1]}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed mb-0.5">{activity.description}</p>
                  <span className="text-[9px] font-semibold bg-slate-850 px-1.5 py-0.5 rounded text-slate-500 uppercase tracking-wider">{activity.refName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Add Lead Slide-over / Modal Drawers */}
      {showAddLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md p-6 relative glow-indigo animate-page-fade">
            <h3 className="text-lg font-bold text-white mb-2">Create New Lead</h3>
            <p className="text-xs text-slate-400 mb-5">Fill in the company info to allocate lead space.</p>
            
            <form onSubmit={handleCreateLead} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Client / Contact Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ali Enterprises / Zainab"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ali Enterprises Ltd."
                  value={newLeadCompany}
                  onChange={(e) => setNewLeadCompany(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Deal Value ($)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 15000"
                    value={newLeadVal}
                    onChange={(e) => setNewLeadVal(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Priority</label>
                  <select
                    value={newLeadPriority}
                    onChange={(e) => setNewLeadPriority(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Lead Source</label>
                <select
                  value={newLeadSource}
                  onChange={(e) => setNewLeadSource(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Website">Website</option>
                  <option value="Email">Email</option>
                  <option value="Referral">Referral</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Outreach">Outreach</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3 justify-end text-xs">
                <button
                  type="button"
                  onClick={() => setShowAddLead(false)}
                  className="px-4 py-2 rounded-lg border border-slate-850 bg-transparent hover:bg-slate-900 text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
