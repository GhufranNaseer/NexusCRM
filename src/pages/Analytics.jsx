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
