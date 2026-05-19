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
