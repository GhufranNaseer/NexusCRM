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
