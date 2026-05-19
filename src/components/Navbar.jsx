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
