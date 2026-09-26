import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { 
  DollarSign, Store, Package, Activity, ArrowUpRight, ArrowDownRight, 
  RefreshCw, LogOut, User, Bell 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, 
  LineChart, Line, AreaChart, Area, Legend 
} from 'recharts';

// Dades simulades per als gràfics
const salesByBranch = [
  { branch: 'Lima', real: 42000, target: 45000 },
  { branch: 'Arequipa', real: 28000, target: 25000 },
  { branch: 'Trujillo', real: 19000, target: 20000 },
  { branch: 'Cusco', real: 15000, target: 15000 },
  { branch: 'Piura', real: 12000, target: 10000 },
];

const linearCombinationTrend = [
  { mes: 'Mai', indicador: 82.4 },
  { mes: 'Jun', indicador: 85.1 },
  { mes: 'Jul', indicador: 88.9 },
  { mes: 'Ago', indicador: 86.3 },
  { mes: 'Set', indicador: 92.7 },
];

const inventoryStatus = [
  { producto: 'Laptop Pro', stock: 45, min: 10 },
  { producto: 'PC Desktop', stock: 120, min: 30 },
  { producto: 'Monitor 27"', stock: 4, min: 8 },
  { producto: 'Teclat Mecànic', stock: 85, min: 20 },
  { producto: 'Mouse Ergonomic', stock: 110, min: 25 },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí es pot netejar el token d'autenticació si n'hi ha
    navigate('/login');
  };

  return (
    <MainLayout title="Dashboard">
      
      {/* Header Superior del Dashboard amb Botó de Cerrar Sesión */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl border border-slate-200 mb-8 shadow-sm gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#0F172A]">Sesión Activa: Administrador</h2>
            <p className="text-xs text-[#64748B]">admin@matrixflow.pe</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          {/* BOTÓ CERRAR SESIÓN */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-red-50 text-[#64748B] hover:text-red-600 rounded-lg text-xs font-semibold transition-all border border-slate-200 hover:border-red-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Targetes de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="card-analytics">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Ventas Totales</p>
              <h3 className="text-2xl font-bold text-[#0F172A] mt-1">S/ 116,000</h3>
            </div>
            <div className="p-3 bg-blue-50 text-[#2563EB] rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-xs text-emerald-600 font-semibold">
            <ArrowUpRight className="w-4 h-4" />
            <span>+8.4% respecto al período anterior</span>
          </div>
        </Card>

        <Card className="card-analytics">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Sucursales Activas</p>
              <h3 className="text-2xl font-bold text-[#0F172A] mt-1">5 Sedes</h3>
            </div>
            <div className="p-3 bg-cyan-50 text-[#06B6D4] rounded-lg">
              <Store className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-xs text-[#64748B]">
            <span>Operatividad al 100% a nivel nacional</span>
          </div>
        </Card>

        <Card className="card-analytics">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Rotación de Inventario</p>
              <h3 className="text-2xl font-bold text-[#0F172A] mt-1">3.2x</h3>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-xs text-red-500 font-semibold">
            <ArrowDownRight className="w-4 h-4" />
            <span>1 producto en nivel crítico</span>
          </div>
        </Card>

        <Card className="card-analytics">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider">Índex Matricial</p>
              <h3 className="text-2xl font-bold text-[#2563EB] mt-1">92.7 pts</h3>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-xs text-emerald-600 font-semibold">
            <ArrowUpRight className="w-4 h-4" />
            <span>Combinación lineal de eficiencia</span>
          </div>
        </Card>
      </div>

      {/* Secció de Gràfics Principals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="card-analytics">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">Ventas Reales vs Metas (Resta Matricial)</h3>
              <p className="text-xs text-[#64748B]">Comparativa directa para cada sede operativa</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByBranch}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="branch" tickLine={false} />
                <YAxis tickLine={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="real" name="Ventas Reales (S/)" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" name="Meta (S/)" fill="#94A3B8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="card-analytics">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">Indicador Ponderado de Eficiencia</h3>
              <p className="text-xs text-[#64748B]">Resultado de combinación lineal (Ventas + Rotación - Costos)</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={linearCombinationTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mes" tickLine={false} />
                <YAxis domain={[60, 100]} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="indicador" stroke="#06B6D4" fill="#E0F2FE" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Taula Resum d'Inventari i Operacions Recents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 card-analytics">
          <h3 className="text-base font-bold text-[#0F172A] mb-4">Estado de Stock por Categoría de Producto</h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={inventoryStatus}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="producto" tickLine={false} />
                <YAxis tickLine={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="stock" name="Stock Actual" stroke="#2563EB" strokeWidth={2} />
                <Line type="monotone" dataKey="min" name="Stock Mínimo" stroke="#EF4444" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="card-analytics">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[#0F172A]">Último Álgebra Ejecutada</h3>
            <RefreshCw className="w-4 h-4 text-slate-400" />
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[10px] font-bold text-[#2563EB] bg-blue-100 px-2 py-0.5 rounded uppercase">Resta Matricial</span>
              <p className="text-xs font-semibold text-[#0F172A] mt-1">Matriz Ventas - Matriz Metas</p>
              <p className="text-[11px] text-[#64748B] mt-0.5">Executado hace 12 minuts por Admin</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[10px] font-bold text-[#06B6D4] bg-cyan-100 px-2 py-0.5 rounded uppercase">Producto Escalar</span>
              <p className="text-xs font-semibold text-[#0F172A] mt-1">Vector Unidades · Vector Precios</p>
              <p className="text-[11px] text-[#64748B] mt-0.5">Executado hace 1 hora por Analista</p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};