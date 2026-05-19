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
