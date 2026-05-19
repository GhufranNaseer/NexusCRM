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
        if (l.id === leadId) {
          updatedLead = { ...l, status: newStatus };
          return updatedLead;
        }
        return l;
      });

      // Log activity
      const activityId = `act-auto-${Date.now()}`;
      const newActivity = {
        id: activityId,
        type: newStatus === 'Won' ? 'Won' : newStatus === 'Lost' ? 'Lost' : 'StageChange',
        title: `Pipeline Stage Updated`,
        description: `Lead "${updatedLead?.name}" moved to stage "${newStatus}".`,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        refName: updatedLead?.name || 'Lead'
      };

      let updatedCustomers = [...state.customers];

      // If Won, auto-convert or update customer account
      if (newStatus === 'Won' && updatedLead) {
        const customerExists = state.customers.find(
          (c) => c.company.toLowerCase() === updatedLead.company.toLowerCase() || c.name.toLowerCase() === updatedLead.contactName.toLowerCase()
        );

        if (!customerExists) {
          const newCustId = `cust-auto-${Date.now()}`;
          const newCustomer = {
            id: newCustId,
            name: updatedLead.contactName,
            email: updatedLead.email,
            phone: updatedLead.phone,
            company: updatedLead.company,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${updatedLead.contactName}&backgroundColor=3b82f6`,
            status: 'Active',
            totalValue: updatedLead.value,
            dealsCount: 1,
            notes: [
              {
                id: `note-auto-${Date.now()}`,
                content: `Automatically converted from Lead "${updatedLead.name}" upon pipeline success.`,
                date: new Date().toISOString().replace('T', ' ').substring(0, 16)
              }
            ]
          };
          updatedCustomers.push(newCustomer);
        } else {
          updatedCustomers = state.customers.map((c) => {
            if (c.id === customerExists.id) {
              return {
                ...c,
                totalValue: c.totalValue + updatedLead.value,
                dealsCount: c.dealsCount + 1,
                status: 'Active'
              };
            }
            return c;
          });
        }
      }

      return {
        leads: updatedLeads,
        activities: [newActivity, ...state.activities],
        customers: updatedCustomers
      };
    });
  },

  addLead: (lead) => set((state) => {
    const newLead = {
      id: `lead-custom-${Date.now()}`,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${lead.name}&backgroundColor=4f46e5`,
      dateCreated: new Date().toISOString().substring(0, 10),
      ...lead
    };
    const newActivity = {
      id: `act-auto-${Date.now()}`,
      type: 'Note',
      title: 'New Lead Created',
      description: `Lead "${lead.name}" valued at $${lead.value} added via dashboard interface.`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      refName: lead.name
    };
    return {
      leads: [newLead, ...state.leads],
      activities: [newActivity, ...state.activities]
    };
  }),

  // Customers Actions
  addNote: (customerId, content) => set((state) => {
    let customerName = 'Customer';
    const updatedCustomers = state.customers.map((c) => {
      if (c.id === customerId) {
        customerName = c.name;
        return {
          ...c,
          notes: [
