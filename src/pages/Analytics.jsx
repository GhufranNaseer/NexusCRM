import React from 'react';
import { useCRMStore } from '../store/useCRMStore';
import { BarChart3, TrendingUp, PieChart, Target, Sparkles, Award } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

export default function Analytics() {
  const leads = useCRMStore((state) => state.leads);
  const customers = useCRMStore((state) => state.customers);
  const team = useCRMStore((state) => state.team);

  // Revenue analytics
  const revenueHistory = [
    { month: 'Jan', revenue: 24000 },
    { month: 'Feb', revenue: 35000 },
    { month: 'Mar', revenue: 32000 },
    { month: 'Apr', revenue: 48000 },
    { month: 'May', revenue: 64000 },
    { month: 'Jun', revenue: customers.reduce((sum, c) => sum + c.totalValue, 0) },
  ];

  // Lead source pie analytics
  const sourcesMap = leads.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {});

  const sourceChartData = Object.keys(sourcesMap).map((key) => ({
    name: key,
    value: sourcesMap[key]
  }));

  const PIE_COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899'];

  // Representative comparison analytics
  const teamChartData = team.map((member) => ({
    name: member.name.split(' ')[0],
    revenue: member.revenueGenerated,
    deals: member.leadsManaged
  }));

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Business Analytics</h2>
        <p className="text-slate-400 text-xs mt-0.5">High-end mathematical statistics illustrating customer acquisition, representative efficiency, and monthly recurring billing.</p>
      </div>

      {/* Grid: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Revenue trend Area */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex justify-between items-center text-xs">
            <div>
              <h3 className="text-sm font-bold text-white">Monthly Recurring Billing</h3>
              <p className="text-slate-500 text-[11px] mt-0.5">Running SaaS customer invoice metrics.</p>
            </div>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueHistory} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '11px'
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Representative comparison bars */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex justify-between items-center text-xs">
            <div>
              <h3 className="text-sm font-bold text-white">Representative Deal Valuations</h3>
              <p className="text-slate-500 text-[11px] mt-0.5">Comparison of revenue closed by staff.</p>
            </div>
            <Award className="w-4 h-4 text-indigo-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamChartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
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
                <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} fillOpacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Lead sources Pie */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex justify-between items-center text-xs">
            <div>
              <h3 className="text-sm font-bold text-white">Acquisition Channels</h3>
              <p className="text-slate-500 text-[11px] mt-0.5">Distribution of lead sources.</p>
            </div>
            <PieChart className="w-4 h-4 text-sky-400" />
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={sourceChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '11px'
                  }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', color: '#64748b' }} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Funnel insights card */}
        <div className="glass-card p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-rose-400" />
              <span>Workspace Insights & Goals</span>
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Your overall conversion rate is doing excellent at <span className="text-emerald-400 font-bold">57%</span>. Lead flow has increased by <span className="text-indigo-400 font-bold">14%</span> compared to last month's averages.
            </p>
          </div>

          <div className="space-y-4 text-xs divide-y divide-slate-850">
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-500 font-semibold">Suggested Goal</span>
              <span className="text-slate-350">Scale Outreach outbound budget by 10%</span>
            </div>
            <div className="flex justify-between items-center pt-3 py-2">
              <span className="text-slate-500 font-semibold">Acquisition Star</span>
              <span className="text-emerald-400 font-bold">Organic Website (Website Source)</span>
            </div>
            <div className="flex justify-between items-center pt-3 py-2">
              <span className="text-slate-500 font-semibold">Billing status</span>
              <span className="text-indigo-400 font-bold">All client invoices accounted</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-lg flex items-center gap-2.5 text-[11px] text-slate-400 leading-normal">
            <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 animate-pulse" />
            <span>AI recommendation: Contacted leads Zainab Malik (Quantum Tech) is warm, proposal pitch done. Draft contract renewal checklist.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
