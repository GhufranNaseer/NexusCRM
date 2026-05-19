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

