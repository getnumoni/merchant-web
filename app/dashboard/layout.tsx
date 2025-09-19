'use client';

import AddBranch from '@/components/branch-level/add-branch';
import Navbar from '@/components/common/navbar';
import Sidebar from '@/components/common/sidebar';
import { Suspense, useState } from 'react';

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
      <Suspense fallback={<div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 lg:left-64 h-14 sm:h-16" />}>
        <Navbar onMenuClick={toggleSidebar} />
      </Suspense>

      {/* Main content area */}
      <main className="pt-16 lg:ml-64">
        <div className="p-6">
          {children}
        </div>
      </main>

      {/* Global Add Branch Dialog */}
      <AddBranch />
    </div>
  );
}