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
