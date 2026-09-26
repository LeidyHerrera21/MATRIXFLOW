import React from 'react';
import { Bell, User } from 'lucide-react';

export const Header: React.FC<{ title: string }> = ({ title }) => (
  <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
    <h1 className="text-xl font-bold text-[#0F172A]">{title}</h1>
    <div className="flex items-center gap-4">
      <span className="text-xs px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 font-medium">
        Fase 1 - Mock UI
      </span>
      <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
        <Bell className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
        <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold">
          <User className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium text-slate-700">Admin Empresa</span>
      </div>
    </div>
  </header>
);