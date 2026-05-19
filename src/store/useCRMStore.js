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
            {
              id: `note-${Date.now()}`,
              content,
              date: new Date().toISOString().replace('T', ' ').substring(0, 16)
            },
            ...c.notes
          ]
        };
      }
      return c;
    });

    const newActivity = {
      id: `act-note-${Date.now()}`,
      type: 'Note',
      title: 'Note Added to Customer',
      description: `Logged note: "${content.substring(0, 45)}${content.length > 45 ? '...' : ''}"`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      refName: customerName
    };

    return {
      customers: updatedCustomers,
      activities: [newActivity, ...state.activities]
    };
  }),

  // Tasks Actions
  addTask: (task) => set((state) => {
    const newTask = {
      id: `task-custom-${Date.now()}`,
      status: 'Pending',
      ...task
    };
    return {
      tasks: [newTask, ...state.tasks]
    };
  }),

  toggleTask: (taskId) => set((state) => {
    let completedTask = null;
    const updatedTasks = state.tasks.map((t) => {
      if (t.id === taskId) {
        completedTask = { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' };
        return completedTask;
      }
      return t;
    });

    let newActivities = [...state.activities];
    if (completedTask && completedTask.status === 'Completed') {
      newActivities = [
        {
          id: `act-task-${Date.now()}`,
          type: 'Meeting',
          title: 'Task Completed',
          description: `Representative marked task "${completedTask.title}" as done.`,
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          refName: completedTask.assigneeName
        },
        ...state.activities
      ];
    }

    return {
      tasks: updatedTasks,
      activities: newActivities
    };
  }),

  deleteTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter((t) => t.id !== taskId)
  })),

  // Messaging Actions
  sendMessage: (conversationId, text, sender = 'user') => {
    set((state) => {
      const updatedConversations = state.conversations.map((c) => {
        if (c.id === conversationId) {
          const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return {
            ...c,
            lastMessage: text,
            unread: sender === 'customer',
            chatHistory: [
              ...c.chatHistory,
              { sender, text, time: timestamp }
            ]
          };
        }
        return c;
      });

      return { conversations: updatedConversations };
    });

    // Simulated Response
    if (sender === 'user') {
      setTimeout(() => {
        const store = get();
        const convo = store.conversations.find((c) => c.id === conversationId);
        if (!convo) return;

        const replies = [
          "Aap ka response received ho gaya ha. I am sharing this with my technical director.",
          "Awesome! Let me verify the timeline with our board and check-in tomorrow.",
          "Jee perfect. Please send over the SLA drafts so we can finalise.",
          "Shukriya! Could you also loop in Kamran on this thread for context?",
          "Sure, that sounds fair. Let's arrange a quick 10-minute catch-up on this."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        set((state) => {
          const innerConversations = state.conversations.map((c) => {
            if (c.id === conversationId) {
              const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              return {
                ...c,
                lastMessage: randomReply,
                unread: true,
                chatHistory: [
                  ...c.chatHistory,
                  { sender: 'customer', text: randomReply, time: timestamp }
                ]
              };
            }
            return c;
          });

          // Log in timeline too
          const newActivity = {
            id: `act-msg-${Date.now()}`,
            type: 'Email',
            title: 'Customer Message Inbound',
            description: `Received message from ${convo.name}: "${randomReply.substring(0, 40)}..."`,
            date: new Date().toISOString().replace('T', ' ').substring(0, 16),
            refName: convo.name
          };

          return {
            conversations: innerConversations,
            activities: [newActivity, ...state.activities]
          };
        });
      }, 1500);
    }
  },

  // Settings / Theme Switcher
  updateSettings: (newSettings) => set((state) => ({
    settings: { ...state.settings, ...newSettings }
  }))
}));
