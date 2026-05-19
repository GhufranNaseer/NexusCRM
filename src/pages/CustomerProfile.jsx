import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCRMStore } from '../store/useCRMStore';
import {
  ArrowLeft,
  Mail,
  Phone,
  Building,
  Calendar,
  Briefcase,
  FileText,
  Plus,
  History,
  TrendingUp,
  Tag
} from 'lucide-react';

export default function CustomerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const customers = useCRMStore((state) => state.customers);
  const addNote = useCRMStore((state) => state.addNote);
  const activities = useCRMStore((state) => state.activities);

  const [activeTab, setActiveTab] = useState('Overview');
  const [newNote, setNewNote] = useState('');

  // Find customer
  const customer = customers.find((c) => c.id === id);

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h3 className="text-lg font-bold text-white mb-2">Customer Profile Not Found</h3>
        <p className="text-slate-400 text-xs mb-6">The requested customer identifier does not exist or was deleted.</p>
        <button
          onClick={() => navigate('/customers')}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Customers</span>
        </button>
      </div>
    );
  }

  // Filter activities related to this customer
  const customerActivities = activities.filter(
    (act) => act.refName.toLowerCase() === customer.name.toLowerCase() || act.refName.toLowerCase() === customer.company.toLowerCase()
  );

  const handleAddNoteSubmit = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    addNote(customer.id, newNote);
    setNewNote('');
  };

  return (
    <div className="space-y-6">
      
      {/* Back Button */}
      <button
        onClick={() => navigate('/customers')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Customers List</span>
      </button>

      {/* Profile Cover Header */}
      <div className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={customer.avatar}
            alt={customer.name}
            className="w-16 h-16 rounded-full bg-slate-800 border-2 border-indigo-500 shadow-xl"
          />
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-white">{customer.name}</h2>
              <span
                className={`text-[8px] px-2 py-0.5 rounded font-bold border uppercase tracking-wider ${
                  customer.status === 'Active'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                }`}
              >
                {customer.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-semibold flex items-center gap-1.5 mt-1">
              <Building className="w-3.5 h-3.5 text-slate-500" />
              <span>{customer.company}</span>
            </p>
          </div>
        </div>

        {/* Dynamic quick metrics */}
        <div className="flex gap-6 border-t md:border-t-0 border-slate-800 pt-4 md:pt-0">
          <div className="text-center md:text-right">
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Total Pipeline Value</span>
            <span className="text-xl font-bold text-white mt-1 block">${customer.totalValue.toLocaleString()}</span>
          </div>
          <div className="text-center md:text-right">
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Closed Deals</span>
            <span className="text-xl font-bold text-indigo-400 mt-1 block">{customer.dealsCount} Closed</span>
          </div>
        </div>
      </div>

      {/* Custom Tabs Navigation */}
      <div className="flex border-b border-slate-800 gap-6">
        {['Overview', 'Deals', 'Notes', 'Activity'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-xs font-bold transition-all relative ${
              activeTab === tab
                ? 'text-indigo-400'
                : 'text-slate-500 hover:text-slate-200'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Vewport */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tab Left Pane (Grid columns dependent) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tab: Overview */}
          {activeTab === 'Overview' && (
            <div className="space-y-6 animate-page-fade">
              {/* Contact Information */}
              <div className="glass-card p-5">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-950/40 border border-slate-800/40 rounded-lg">
                    <span className="text-slate-500 block font-semibold mb-1">Email Address</span>
                    <span className="text-slate-200 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      {customer.email}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-950/40 border border-slate-800/40 rounded-lg">
                    <span className="text-slate-500 block font-semibold mb-1">Phone Number</span>
                    <span className="text-slate-200 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      {customer.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Deal Status Card */}
              <div className="glass-card p-5">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Core Partnership Overview</h3>
                <div className="p-4 bg-slate-950/40 border border-slate-800/40 rounded-lg flex items-center justify-between text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-500 font-semibold uppercase text-[9px] block">Partnership Health</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      Stable & Retained
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 leading-relaxed max-w-sm text-right">
                    Customer logs indicate clean onboarding. Total generated value sits at ${customer.totalValue.toLocaleString()} across {customer.dealsCount} sales channels.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Deals */}
          {activeTab === 'Deals' && (
            <div className="glass-card p-5 space-y-4 animate-page-fade">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Historical Deals Ledger</h3>
              <div className="space-y-3 text-xs">
                {Array.from({ length: customer.dealsCount }).map((_, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950/40 border border-slate-850 rounded-lg flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/10 rounded-lg">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-200">SaaS License Provisioning (Contract #{1000 + idx})</h4>
                        <span className="text-[10px] text-slate-500">Completed deal allocation</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-white">${(customer.totalValue / customer.dealsCount).toLocaleString()}</span>
                      <span className="text-[9px] block text-emerald-400 font-semibold mt-0.5">Success Won</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Notes */}
          {activeTab === 'Notes' && (
            <div className="space-y-6 animate-page-fade">
              {/* Note adding Form */}
              <div className="glass-card p-5">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Add Private CRM Note</h3>
                <form onSubmit={handleAddNoteSubmit} className="space-y-3">
                  <textarea
                    rows="3"
                    required
                    placeholder="Write a custom update about the customer (e.g. demanding zoom sync next Wednesday, preferred packages, support requests)..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-slate-600"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-1 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Save Note</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Note Feed */}
              <div className="space-y-4">
                {customer.notes.length === 0 ? (
                  <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl text-slate-600 text-xs">
                    No notes logged for this customer.
                  </div>
                ) : (
                  customer.notes.map((note) => (
                    <div key={note.id} className="glass-card p-4 space-y-2 text-xs relative overflow-hidden">
                      <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-indigo-400" />
                          <span>CRM Staff Audit Note</span>
                        </span>
                        <span>{note.date}</span>
                      </div>
                      <p className="text-slate-350 leading-relaxed">{note.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Tab: Activity */}
          {activeTab === 'Activity' && (
            <div className="glass-card p-5 animate-page-fade">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-5">Chronological Activity History</h3>
              <div className="space-y-5 text-xs">
                {customerActivities.length === 0 ? (
                  <div className="text-center py-10 border border-dashed border-slate-800 rounded-lg text-slate-600">
                    No historical activity mapped for this customer.
                  </div>
                ) : (
                  customerActivities.map((act) => (
                    <div key={act.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-slate-850 border border-slate-800 flex items-center justify-center flex-shrink-0 text-indigo-400">
                          <History className="w-3 h-3" />
                        </div>
                        <div className="w-[1px] flex-1 bg-slate-850 mt-2" />
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h4 className="font-bold text-slate-200">{act.title}</h4>
                          <span className="text-[9px] text-slate-500">{act.date}</span>
                        </div>
                        <p className="text-slate-400 leading-snug">{act.description}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>

        {/* Tab Right Sidebar (Overview metadata card) */}
        <div className="space-y-6">
          <div className="glass-card p-5 space-y-4 text-xs">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">CRM Metadata</h3>
            
            <div className="space-y-3 divide-y divide-slate-850">
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-500 font-semibold">Customer ID</span>
                <span className="text-slate-300 font-mono text-[10px]">{customer.id}</span>
              </div>
              <div className="flex justify-between items-center pt-3 py-2">
                <span className="text-slate-500 font-semibold">Account Class</span>
                <span className="text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 text-[9px] uppercase tracking-wider">
                  Enterprise
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 py-2">
                <span className="text-slate-500 font-semibold">Total closed LTV</span>
                <span className="text-white font-bold">${customer.totalValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-3 py-2">
                <span className="text-slate-500 font-semibold">Communication Sync</span>
                <span className="text-emerald-400 font-semibold">WhatsApp (Favoured)</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
