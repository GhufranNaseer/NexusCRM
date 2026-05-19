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
          <span>New Lead</span>
        </button>
      </div>

      {/* Kanban Board Container */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
        {STAGES.map((stage) => {
          const stageLeads = leads.filter((l) => l.status === stage);
          const stageValue = stageLeads.reduce((sum, l) => sum + l.value, 0);
          const styles = STAGE_STYLES[stage];

          return (
            <div
              key={stage}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
              className={`flex-shrink-0 w-80 rounded-xl bg-slate-900/40 border border-slate-800/80 p-4 flex flex-col max-h-[70vh] border-t-2 ${styles.border}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">{stage}</h3>
                  <span className="text-[10px] text-slate-500 font-semibold">{stageLeads.length} leads â€¢ ${stageValue.toLocaleString()}</span>
                </div>
                <div className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${styles.badge}`}>
                  {stageLeads.length}
                </div>
              </div>

              {/* Cards Wrapper */}
              <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 min-h-[300px]">
                {stageLeads.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 border border-dashed border-slate-800 rounded-lg text-slate-600 text-center">
                    <HelpCircle className="w-8 h-8 opacity-40 mb-1" />
                    <span className="text-[10px] font-medium uppercase">Empty Stage</span>
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                      onDragEnd={handleDragEnd}
                      className={`glass-card p-4 space-y-3 cursor-grab active:cursor-grabbing hover:border-slate-700/80 hover:bg-slate-900 transition-all ${
                        draggedId === lead.id ? 'dragging' : ''
                      }`}
                    >
                      {/* Company Name & Actions */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={lead.avatar}
                            alt="Lead Logo"
                            className="w-7 h-7 rounded-md border border-slate-800 bg-slate-950"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-200 truncate leading-snug">{lead.name}</h4>
                            <p className="text-[10px] text-slate-500 truncate">{lead.company}</p>
                          </div>
                        </div>
