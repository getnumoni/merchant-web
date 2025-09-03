'use client';

import Navbar from '@/components/common/navbar';
import Sidebar from '@/components/common/sidebar';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Navbar */}
      <Navbar onMenuClick={toggleSidebar} />

      {/* Main content area */}
      <main className="pt-16 lg:ml-64">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}