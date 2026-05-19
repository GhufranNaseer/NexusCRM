import { create } from 'zustand';
import {
  initialLeads,
  initialCustomers,
  initialActivities,
  initialTasks,
  initialTeam,
  initialConversations
} from '../data/mockData';

export const useCRMStore = create((set, get) => ({
  leads: initialLeads,
  customers: initialCustomers,
  activities: initialActivities,
  tasks: initialTasks,
  team: initialTeam,
  conversations: initialConversations,
  settings: {
    theme: 'dark',
    activeRole: 'Admin / Owner',
    userName: 'Amna Malik',
    userEmail: 'amna@nexus.crm',
    notificationsEnabled: true
  },

  // Leads Actions
  moveLead: (leadId, newStatus) => {
    let updatedLead = null;
    
    set((state) => {
      const updatedLeads = state.leads.map((l) => {
