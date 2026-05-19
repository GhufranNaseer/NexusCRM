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
