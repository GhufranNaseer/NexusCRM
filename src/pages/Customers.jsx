import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCRMStore } from '../store/useCRMStore';
import { Search, UserPlus, Mail, Phone, Building, ArrowRight } from 'lucide-react';

export default function Customers() {
  const customers = useCRMStore((state) => state.customers);
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Search & Filter Logic
  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Customers Database</h2>
          <p className="text-slate-400 text-xs mt-0.5">Manage and track relationships with won leads converted into active commercial clients.</p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, company, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-850 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-slate-500"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="Inactive">Inactive Only</option>
          </select>
        </div>

      </div>

      {/* Customers Table List */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/40 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Client Detail</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Lifetime Value</th>
                <th className="px-6 py-4">Deals Closed</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-slate-500 font-medium">
                    No customers found matching the search filters.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    onClick={() => navigate(`/customers/${cust.id}`)}
                    className="hover:bg-slate-900/40 cursor-pointer transition-colors"
                  >
                    {/* Client Detail */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cust.avatar}
                          alt={cust.name}
                          className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700/50"
                        />
                        <div>
                          <h4 className="font-bold text-slate-200">{cust.name}</h4>
                          <span className="text-[10px] text-slate-500">{cust.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-350">{cust.company}</span>
                        <span className="text-[10px] text-slate-500">{cust.phone}</span>
                      </div>
                    </td>
