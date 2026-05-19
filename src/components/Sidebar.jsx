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
              <h1 className="text-lg font-bold text-white tracking-wide">NexusCRM</h1>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">SaaS Enterprise</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`
              }
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80">
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/40">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Amna&backgroundColor=10b981"
              alt="User Avatar"
              className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700/50"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-white truncate">Amna Malik</h4>
              <p className="text-[10px] text-slate-500 truncate">amna@nexus.crm</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
