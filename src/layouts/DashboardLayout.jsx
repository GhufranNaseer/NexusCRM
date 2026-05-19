import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Navigation Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Right Content Section */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Header */}
        <Navbar onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-950/40 p-6 relative">
          <div className="max-w-7xl mx-auto w-full space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
