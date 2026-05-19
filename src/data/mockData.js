export const initialLeads = [
  {
    id: "lead-1",
    name: "Ali Enterprises",
    contactName: "Ali Raza",
    email: "ali@alienterprises.com",
    phone: "+92 300 1234567",
    company: "Ali Enterprises Ltd.",
    value: 12000,
    status: "New Lead",
    source: "Website",
    priority: "High",
    dateCreated: "2026-05-18",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AE&backgroundColor=4f46e5"
  },
  {
    id: "lead-2",
    name: "Awan Logistics",
    contactName: "Kamran Awan",
    email: "kamran@awanlogistics.com",
    phone: "+92 312 9876543",
    company: "Awan & Co.",
    value: 8500,
    status: "Contacted",
    source: "Referral",
    priority: "Medium",
    dateCreated: "2026-05-15",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AL&backgroundColor=0ea5e9"
  },
  {
    id: "lead-3",
    name: "Quantum Tech",
    contactName: "Zainab Malik",
    email: "zainab@quantumtech.io",
    phone: "+92 333 4567890",
    company: "Quantum Tech Solutions",
    value: 24500,
    status: "Proposal Sent",
    source: "Email",
    priority: "High",
    dateCreated: "2026-05-12",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=QT&backgroundColor=10b981"
  },
  {
    id: "lead-4",
    name: "Buraq Agency",
    contactName: "Saad Khan",
    email: "saad@buraq.agency",
    phone: "+92 321 5556789",
    company: "Buraq Creative Agency",
    value: 5000,
    status: "Negotiation",
    source: "Social Media",
    priority: "Low",
    dateCreated: "2026-05-10",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=BA&backgroundColor=f59e0b"
  },
  {
    id: "lead-5",
    name: "Indus Foods",
    contactName: "Ayesha Bibi",
    email: "ayesha@indusfoods.pk",
    phone: "+92 301 4443322",
    company: "Indus Food Products Ltd.",
    value: 15500,
    status: "Won",
    source: "Website",
    priority: "High",
    dateCreated: "2026-05-05",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=IF&backgroundColor=ef4444"
  },
  {
    id: "lead-6",
    name: "Apex Global",
    contactName: "Tariq Mahmood",
    email: "tariq@apexglobal.org",
    phone: "+92 345 8887766",
    company: "Apex Global Group",
    value: 4000,
    status: "Lost",
    source: "Outreach",
    priority: "Low",
    dateCreated: "2026-04-28",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AG&backgroundColor=6b7280"
  }
];

export const initialCustomers = [
  {
    id: "cust-1",
    name: "Sara Khan",
    email: "sara@example.com",
    phone: "+92 300 9876543",
    company: "Tech Solutions",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara&backgroundColor=3b82f6",
    status: "Active",
    totalValue: 35000,
    dealsCount: 3,
    notes: [
      { id: "n-1", content: "Highly satisfied client. Interested in scale-up package in Q3.", date: "2026-05-10 14:30" },
      { id: "n-2", content: "Preferred communication channel: WhatsApp.", date: "2026-05-02 11:15" }
    ]
  },
  {
    id: "cust-2",
    name: "Zeeshan Ahmed",
    email: "zeeshan@ahmedcorp.com",
    phone: "+92 315 1112223",
    company: "Ahmed Corp",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zeeshan&backgroundColor=10b981",
    status: "Active",
    totalValue: 18000,
    dealsCount: 1,
    notes: [
      { id: "n-3", content: "Demanded extra features for report export. Sent request to support.", date: "2026-05-14 09:00" }
    ]
  },
  {
    id: "cust-3",
    name: "Dr. Fatima Jamil",
    email: "fatima@jamilclinics.com",
    phone: "+92 334 7778889",
    company: "Jamil Medical Complex",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima&backgroundColor=f59e0b",
    status: "Active",
    totalValue: 50000,
    dealsCount: 4,
    notes: [
      { id: "n-4", content: "Renewal of contract due on June 15th.", date: "2026-05-18 16:45" }
    ]
  },
  {
    id: "cust-4",
    name: "Mubeen Shah",
    email: "mubeen@shahconsulting.pk",
    phone: "+92 320 6667778",
    company: "Shah Consulting",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mubeen&backgroundColor=ec4899",
    status: "Inactive",
    totalValue: 7500,
    dealsCount: 1,
    notes: [
      { id: "n-5", content: "Paused operations temporarily. Keep in contact.", date: "2026-04-10 12:00" }
    ]
  }
];

export const initialActivities = [
  {
    id: "act-1",
    type: "Call",
    title: "Introductory Phone Call",
    description: "Successfully introduced NexusCRM capabilities to Zainab Malik from Quantum Tech.",
    date: "2026-05-20 10:15",
    refName: "Quantum Tech"
  },
  {
    id: "act-2",
    type: "Email",
    title: "Proposal Pitch Sent",
    description: "Sent commercial proposal PDF containing standard Tier-2 licensing pricing.",
    date: "2026-05-19 14:45",
    refName: "Quantum Tech"
  },
  {
    id: "act-3",
    type: "Meeting",
    title: "Onboarding Session",
    description: "Conducted virtual zoom workshop for Sara Khan's Tech Solutions crew.",
    date: "2026-05-18 11:00",
    refName: "Sara Khan"
  },
  {
    id: "act-4",
    type: "Note",
    title: "Profile Note Addition",
    description: "Logged priority notification regarding upcoming June 15 renewal details.",
    date: "2026-05-18 16:45",
    refName: "Dr. Fatima Jamil"
  },
  {
    id: "act-5",
    type: "Call",
    title: "Cold Call Outreach",
    description: "Connected with Kamran Awan regarding Referral setup. Lead moved to Contacted.",
    date: "2026-05-15 15:30",
    refName: "Awan Logistics"
  }
];

export const initialTasks = [
  {
    id: "task-1",
    title: "Draft Proposal for Ali Enterprises",
    description: "Draft technical specs and pricing sheets matching Ali Enterprises requested details.",
    priority: "High",
    dueDate: "2026-05-22",
    assigneeName: "Kamran Shah",
    assigneeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kamran&backgroundColor=6366f1",
    status: "Pending"
  },
  {
    id: "task-2",
    title: "Onboarding Call with Quantum Tech",
    description: "Schedule zoom demo with Zainab and engineering team to map API workflows.",
    priority: "High",
    dueDate: "2026-05-25",
    assigneeName: "Amna Malik",
    assigneeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amna&backgroundColor=10b981",
    status: "Pending"
  },
  {
    id: "task-3",
    title: "Review Awan Logistics Requirements",
    description: "Analyze cold call feedback notes to finalize custom feature list estimations.",
    priority: "Medium",
    dueDate: "2026-05-26",
    assigneeName: "Bilal Lodhi",
    assigneeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bilal&backgroundColor=f59e0b",
    status: "Pending"
  },
  {
    id: "task-4",
    title: "Check-in on paused Shah Consulting account",
    description: "Re-engage Mubeen regarding resumption timelines or alternative lighter packages.",
    priority: "Low",
    dueDate: "2026-06-01",
    assigneeName: "Kamran Shah",
    assigneeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kamran&backgroundColor=6366f1",
    status: "Completed"
  }
];

export const initialTeam = [
  {
    id: "t-1",
    name: "Kamran Shah",
    role: "Sales Manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kamran&backgroundColor=6366f1",
    leadsManaged: 8,
    tasksCompleted: 14,
    revenueGenerated: 45000,
    performanceRate: 92
  },
  {
    id: "t-2",
    name: "Amna Malik",
    role: "Admin / Owner",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amna&backgroundColor=10b981",
    leadsManaged: 12,
    tasksCompleted: 24,
    revenueGenerated: 85000,
    performanceRate: 97
