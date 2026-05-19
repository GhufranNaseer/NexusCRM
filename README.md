# 🌐 NexusCRM — Premium Client Relationship & SaaS Management Platform

[![Platform Live](https://img.shields.io/badge/Demo-Active-emerald.svg?style=for-the-badge&logo=github)](https://GhufranNaseer.github.io/NexusCRM/)
[![Vite Engine](https://img.shields.io/badge/Vite-v8.0-blueviolet.svg?style=for-the-badge&logo=vite)](https://vite.dev/)
[![React Version](https://img.shields.io/badge/React-v19.0-61dafb.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![Zustand State](https://img.shields.io/badge/Zustand-v5.0-blue.svg?style=for-the-badge&logo=react)](https://github.com/pmndrs/zustand)
[![Tailwind Engine](https://img.shields.io/badge/Tailwind_CSS-v3.4-38bdf8.svg?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

NexusCRM is a premium, high-fidelity Client Relationship Management (CRM) & SaaS administration system built for modern enterprise corporations. Equipped with native drag-and-drop pipelines, highly interactive double-pane chat messaging (with simulated AI automated client replies), real-time team workloads metrics, and a beautiful fully reactive Zustand relational state engine.

Designed with custom dark theme glassmorphic visual guidelines (`.glass-card`), high-performance Recharts visual suites, and pixel-perfect smooth transition animations.

---

## ✨ Outstanding Core Features

### 📊 1. High-Performance Executive Dashboard
- **Glowing KPI Metrics Cards:** 4 interactive metric indices presenting running Pipeline values, closed accounts, billing counts, and active duties.
- **Embedded Area Sparklines:** Every card includes a custom glowing Recharts Area graph charting individual trajectory vectors on hover.
- **Acquisition & Funnels:** Interactive bar graphs tracking stage conversion percentages across the whole pipeline.

### 📋 2. Native Kanban Pipeline Board
- **HTML5 Drag-and-Drop:** Lightweight, super-fast native drag handles. Moving cards between columns instantly recalculates cumulative stage contract values.
- **Auto Converted Won Clients:** Dragging a Lead into the `Won` column triggers the Zustand store to convert the lead into an active Customer, automatically calculating lifetime value (LTV) and adding closed deals count!
- **Fallback Empty States:** Columns with zero active leads display customized modern dashboard illustrations.

### 👥 3. Customer Registry & Custom Profiles
- **Searchable registries:** Complete list of active customers with status badges, phone/email metadata, and closed values.
- **Multi-Tab Profiles viewport (`/customers/:id`):** Details cover headers followed by fully responsive tabbed panels:
  - **Overview:** General contact metrics.
  - **Deals:** Active and historical contracts ledger.
  - **Notes:** Live note-taking area that saves to the customer locally and appends a CRM audit note to the global activity log in real-time.
  - **Activity:** Detailed chronological audit log filtered specifically for this customer.

### 🕒 4. Activities Timeline & Tasks Dashboard
- **Chronological Activity Log:** Vertical scrolling history mapping all calls, emails, meetings, notes, won/lost deals, and stage updates with custom SVG icons.
- **Task Management Board:** Segregated Pending vs Archived panels. Includes task checklist toggles (triggers timeline logs when finished), priority labels, and assignee avatars.

### 💬 5. WhatsApp-Style Messaging Desk
- **Dual-Pane Chat Viewport:** Left conversation roster showing threads and unread notification indicators; right thread scroll active view.
- **Simulated Client Auto-Replies:** Typing and sending a message to a customer triggers a realistic, delayed (1.5s) business response from that client! The reply also generates an entry in the global activities log and flashes the top header notification dot!

### 📊 6. Analytics, Team, & Visual Settings
- **Deep Recharts Analytics:** Visual Area Charts, Pie Charts, and Bar Charts depicting revenue growth, acquisition sources, and representative workloads.
- **Team Roster & Roles Perms:** Workspace representative cards mapping individual closed billing metrics and role-level permission charts.
- **Visual Switchers:** Live class-based theme switcher toggles (Light/Dark themes) and role-switcher simulators.

---

## 🛠️ Technology & Architecture Stack

- **Core Framework:** React 19 (Hooks, Functional components, custom UI rendering)
- **Bundler & Server:** Vite 8 (Ultra-fast Hot Module Replacement - HMR)
- **State Architecture:** Zustand 5 (High-fidelity reactive relational store managing leads, customers, timeline logs, chats, and notifications)
- **Styles & Layout:** Tailwind CSS v3 & PostCSS (Custom glassmorphism classes, neon glows, scrollbars, and transition keyframes)
- **Icons Packages:** Lucide React (Clean, scalable vector representations)
- **Data Visualizations:** Recharts (High-performance vector charts with smooth gradients)
- **Routing Engine:** React Router Dom 7 (Nested structural layout outlets)

---

## 🚀 Setting Up Locally

To set up NexusCRM locally on your machine, follow these instructions:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) (v16 or above) installed.

### 1. Clone the repository
```bash
git clone https://github.com/GhufranNaseer/NexusCRM.git
cd NexusCRM
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for production
To compile static production chunks, run:
```bash
npm run build
```

---

## 📦 Deploying to GitHub Pages

NexusCRM is fully configured for static deployment onto GitHub Pages.

### 1. Add Base Path in `vite.config.js`
Ensure your repository base path is configured:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/NexusCRM/' // <--- Match repository name
})
```

### 2. Configure Scripts in `package.json`
Add deployment scripts:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### 3. Deploy in one command
Run:
```bash
npm install -D gh-pages
npm run deploy
```

Your premium CRM dashboard is now live and fully interactive! Enjoy building and closing deals!
