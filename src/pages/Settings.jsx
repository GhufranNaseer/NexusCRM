import React, { useState, useEffect } from 'react';
import { useCRMStore } from '../store/useCRMStore';
import { Settings as SettingsIcon, Sun, Moon, Bell, Shield, User, Save, RefreshCw } from 'lucide-react';

export default function Settings() {
  const settings = useCRMStore((state) => state.settings);
  const updateSettings = useCRMStore((state) => state.updateSettings);

  const [userName, setUserName] = useState(settings.userName);
  const [userEmail, setUserEmail] = useState(settings.userEmail);
  const [notifsEnabled, setNotifsEnabled] = useState(settings.notificationsEnabled);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state if it changed from topbar role switcher
  useEffect(() => {
    setUserName(settings.userName);
    setUserEmail(settings.userEmail);
    setNotifsEnabled(settings.notificationsEnabled);
  }, [settings]);

  // Sync theme
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings({
      userName,
      userEmail,
      notificationsEnabled: notifsEnabled
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleThemeChange = (theme) => {
    updateSettings({ theme });
  };

  const handleRoleChange = (role) => {
    updateSettings({ activeRole: role });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">System Settings</h2>
        <p className="text-slate-400 text-xs mt-0.5">Customize workspace visual themes, profile defaults, notifications preferences, and security authorization levels.</p>
      </div>

      {/* Grid: Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start text-xs">
        
        {/* Left Side: General Profile Form */}
        <div className="glass-card p-5 lg:col-span-2 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Administrator Profile</h3>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Notification Checkbox */}
            <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-lg flex items-center justify-between">
              <div className="space-y-0.5 pr-2">
                <span className="font-semibold text-slate-200 block">Workspace Push Alerts</span>
                <span className="text-[10px] text-slate-500">Enable real-time notification bells upon lead updates and inbox replies.</span>
              </div>
              <input
                type="checkbox"
                checked={notifsEnabled}
                onChange={(e) => setNotifsEnabled(e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-slate-800 rounded focus:ring-indigo-500 bg-slate-950"
              />
            </div>

            {/* Save trigger */}
            <div className="flex items-center justify-between pt-3">
              {saveSuccess ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Save className="w-4 h-4 animate-bounce" />
                  Saved Changes successfully!
                </span>
              ) : (
                <span className="text-slate-500">Unsaved configuration changes</span>
              )}
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-650 hover:bg-indigo-600 text-white transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Visual & Role Swappers */}
        <div className="space-y-6">
          
          {/* Card 1: Theme Switch */}
          <div className="glass-card p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Workspace Theme</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-3 text-center">
              <button
                onClick={() => handleThemeChange('dark')}
                className={`p-3.5 rounded-lg border font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                  settings.theme === 'dark'
                    ? 'bg-slate-900 border-indigo-500/50 text-indigo-400 shadow shadow-indigo-600/5'
                    : 'bg-transparent border-slate-850 text-slate-500 hover:text-slate-200 hover:border-slate-800'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>Default Dark</span>
              </button>
              <button
                onClick={() => handleThemeChange('light')}
                className={`p-3.5 rounded-lg border font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                  settings.theme === 'light'
                    ? 'bg-slate-900 border-indigo-500/50 text-indigo-400 shadow shadow-indigo-600/5'
                    : 'bg-transparent border-slate-850 text-slate-500 hover:text-slate-200 hover:border-slate-800'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>Classic Light</span>
              </button>
            </div>
          </div>

          {/* Card 2: Role configuration switcher */}
          <div className="glass-card p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-rose-400" />
              <span>Role Permissions Switcher</span>
            </h3>
            <p className="text-slate-550 leading-relaxed text-[10px]">
              Swap authorization ranks below. Modifies visual metrics and modules available.
            </p>

            <div className="space-y-2">
              {['Admin / Owner', 'Sales Manager', 'Support Team', 'Marketing Team'].map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleChange(role)}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs font-semibold transition-all ${
                    settings.activeRole === role
                      ? 'bg-indigo-600/10 border-indigo-500/35 text-indigo-400'
                      : 'bg-transparent border-slate-850 text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
