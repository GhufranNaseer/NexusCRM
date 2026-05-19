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
