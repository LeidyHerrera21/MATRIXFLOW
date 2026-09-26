import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Building2, Store, Package, ShoppingCart, 
  Boxes, ArrowRightLeft, Grid, Calculator, History, BarChart3, Settings 
} from 'lucide-react';

const menu = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Empresa', path: '/empresa', icon: Building2 },
  { label: 'Sucursales', path: '/sucursales', icon: Store },
  { label: 'Productos', path: '/productos', icon: Package },
  { label: 'Ventas', path: '/ventas', icon: ShoppingCart },
  { label: 'Inventario', path: '/inventario', icon: Boxes },
  { header: 'ANÁLISIS MATEMÁTICO' },
  { label: 'Vectores', path: '/vectores', icon: ArrowRightLeft },
  { label: 'Matrices', path: '/matrices', icon: Grid },
  { label: 'Operaciones', path: '/operaciones', icon: Calculator },
  { label: 'Historial', path: '/historial', icon: History },
  { label: 'Reportes', path: '/reportes', icon: BarChart3 },
  { header: 'CONFIGURACIÓN' },
  { label: 'Ajustes', path: '/configuracion', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#0F172A] text-white flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-wider text-[#06B6D4]">MATRIXFLOW</h1>
        <p className="text-xs text-slate-400">Enterprise Analytics</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menu.map((item, idx) => {
          if (item.header) {
            return (
              <p key={idx} className="px-3 pt-4 pb-1 text-[10px] font-bold text-slate-400 tracking-wider">
                {item.header}
              </p>
            );
          }
          const Icon = item.icon!;
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path || '#'}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                active ? 'bg-[#2563EB] text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 text-[#06B6D4]" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};