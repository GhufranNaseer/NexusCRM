import React, { useState } from 'react';
import { useCRMStore } from '../store/useCRMStore';
import {
  Plus,
  TrendingUp,
  MapPin,
  Clock,
  Compass,
  ChevronsRight,
  MoreVertical,
  CheckCircle,
  XCircle,
  HelpCircle,
  Mail,
  Phone
} from 'lucide-react';

const STAGES = ['New Lead', 'Contacted', 'Proposal Sent', 'Negotiation', 'Won', 'Lost'];

const STAGE_STYLES = {
  'New Lead': { border: 'border-t-indigo-500', bg: 'bg-indigo-500/5', badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
  'Contacted': { border: 'border-t-blue-500', bg: 'bg-blue-500/5', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  'Proposal Sent': { border: 'border-t-amber-500', bg: 'bg-amber-500/5', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  'Negotiation': { border: 'border-t-purple-500', bg: 'bg-purple-500/5', badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  'Won': { border: 'border-t-emerald-500', bg: 'bg-emerald-500/5', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  'Lost': { border: 'border-t-rose-500', bg: 'bg-rose-500/5', badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20' }
};

export default function Pipeline() {
  const leads = useCRMStore((state) => state.leads);
  const moveLead = useCRMStore((state) => state.moveLead);
