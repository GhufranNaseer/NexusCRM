import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Pipeline from './pages/Pipeline';
import Customers from './pages/Customers';
import CustomerProfile from './pages/CustomerProfile';
import Activities from './pages/Activities';
import Tasks from './pages/Tasks';
import Messaging from './pages/Messaging';
import Analytics from './pages/Analytics';
import Team from './pages/Team';
import Settings from './pages/Settings';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pipeline" element={<Pipeline />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<CustomerProfile />} />
          <Route path="activities" element={<Activities />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="messaging" element={<Messaging />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="team" element={<Team />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
