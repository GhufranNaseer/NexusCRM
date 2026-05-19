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
