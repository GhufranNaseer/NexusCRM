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
