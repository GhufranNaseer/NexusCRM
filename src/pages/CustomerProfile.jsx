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
