import React, { useState, useEffect } from 'react';
import { useCRMStore } from '../store/useCRMStore';
import { Menu, Sun, Moon, Bell, Shield, User } from 'lucide-react';

export default function Navbar({ onOpenSidebar }) {
  const settings = useCRMStore((state) => state.settings);
  const updateSettings = useCRMStore((state) => state.updateSettings);
  const activities = useCRMStore((state) => state.activities);
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoles, setShowRoles] = useState(false);

  // Sync theme with HTML tag
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
  };

  const handleRoleChange = (role) => {
    updateSettings({ activeRole: role });
    setShowRoles(false);
  };

  const recentNotifications = activities.slice(0, 5);

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-slate-900 border-b border-slate-800/80 sticky top-0 z-30">
      {/* Mobile Toggle & Brand */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenSidebar}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Global Quick Search */}
        <div className="hidden md:flex items-center bg-slate-950/50 border border-slate-800 rounded-lg px-3 py-1.5 w-64 text-xs text-slate-500">
          <span>Search customers, deals...</span>
          <span className="ml-auto bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-400">Ctrl K</span>
        </div>
      </div>

      {/* Action Widgets */}
      <div className="flex items-center gap-3">
        
        {/* Role Selector Badge */}
        <div className="relative">
          <button
            onClick={() => setShowRoles(!showRoles)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 border border-slate-700/30"
          >
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>{settings.activeRole}</span>
          </button>
          
          {showRoles && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowRoles(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-1 z-20">
                {['Admin / Owner', 'Sales Manager', 'Support Team', 'Marketing Team'].map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleChange(role)}
                    className={`w-full text-left px-4 py-2 text-xs font-medium ${
                      settings.activeRole === role
                        ? 'bg-indigo-600/10 text-indigo-400'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Theme Toggler */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
          title="Toggle Light/Dark Theme"
        >
