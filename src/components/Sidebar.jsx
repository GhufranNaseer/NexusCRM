import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Kanban,
  Users,
  History,
  CheckSquare,
  MessageSquare,
  BarChart3,
  UserCheck,
  Settings,
  X,
  Compass
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/pipeline', label: 'Leads Pipeline', icon: Kanban },
  { path: '/customers', label: 'Customers', icon: Users },
  { path: '/activities', label: 'Activities', icon: History },
  { path: '/tasks', label: 'Tasks', icon: CheckSquare },
  { path: '/messaging', label: 'Messaging', icon: MessageSquare },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/team', label: 'Team', icon: UserCheck },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-slate-900 border-r border-slate-800/80 transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-600 shadow-md shadow-indigo-600/30">
              <Compass className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
