import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const MainLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="flex bg-[#F8FAFC] min-h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Header title={title} />
      <main className="p-8 flex-1 overflow-y-auto">{children}</main>
    </div>
  </div>
);