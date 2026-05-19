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
  const addLead = useCRMStore((state) => state.addLead);

  const [draggedId, setDraggedId] = useState(null);
  const [showAddLead, setShowAddLead] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadCompany, setNewLeadCompany] = useState('');
  const [newLeadVal, setNewLeadVal] = useState('');
  const [newLeadPriority, setNewLeadPriority] = useState('Medium');
  const [newLeadSource, setNewLeadSource] = useState('Website');
  const [activeSelectCard, setActiveSelectCard] = useState(null);

  // Drag and Drop handlers
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggedId(id);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || draggedId;
    if (id) {
      moveLead(id, targetStatus);
    }
    setDraggedId(null);
  };

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

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Leads Pipeline</h2>
          <p className="text-slate-400 text-xs mt-0.5">Drag-and-drop lead cards between stages to update status, track revenue conversions, and trigger logs.</p>
        </div>
        <button
          onClick={() => setShowAddLead(true)}
          className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 text-white transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
