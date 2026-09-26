import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { mockBranches } from '../mock/companiesMock';
import { 
  Store, 
  Users, 
  MapPin, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpRight, 
  TrendingUp, 
  LogOut, 
  User, 
  Bell, 
  MoreVertical,
  CheckCircle2,
  Clock,
  DollarSign,
  AlertTriangle,
  X,
  PieChart as PieChartIcon,
  Download
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';

// Datos de tendencia y gráficos
const sparklineData = [
  { day: 'Lun', val: 4200 },
  { day: 'Mar', val: 5100 },
  { day: 'Mié', val: 4800 },
  { day: 'Jue', val: 6200 },
  { day: 'Vie', val: 7900 },
  { day: 'Sáb', val: 8400 },
];

const regionDistribution = [
  { name: 'Lima Metro', value: 45, color: '#2563EB' },
  { name: 'Arequipa / Sur', value: 25, color: '#06B6D4' },
  { name: 'Norte (Trujillo/Piura)', value: 20, color: '#3B82F6' },
  { name: 'Centro / Cusco', value: 10, color: '#64748B' },
];

const branchPerformance = [
  { name: 'Central Lima', ventas: 42000, meta: 45000 },
  { name: 'Sucursal Sur', ventas: 28000, meta: 25000 },
  { name: 'Sucursal Norte', ventas: 19000, meta: 20000 },
  { name: 'Cusco Imperial', ventas: 15000, meta: 15000 },
];

export const Branches: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Formulario de nueva sucursal
  const [newBranch, setNewBranch] = useState({
    code: '',
    name: '',
    city: '',
    manager: '',
    status: 'Activo'
  });

  const handleLogout = () => {
    navigate('/login');
  };

  // Filtrado compuesto (Búsqueda + Estado)
  const filteredBranches = mockBranches.filter((b) => {
    const matchesSearch = 
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'ALL' || 
      (statusFilter === 'ACTIVE' && (b.status?.toLowerCase() === 'activo' || b.status?.toLowerCase() === 'abierto')) ||
      (statusFilter === 'MAINTENANCE' && (b.status?.toLowerCase() === 'mantenimiento' || b.status?.toLowerCase() === 'inactivo'));

    return matchesSearch && matchesStatus;
  });

  const handleCreateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para registrar en backend/mock
    setIsModalOpen(false);
    setNewBranch({ code: '', name: '', city: '', manager: '', status: 'Activo' });
  };

  return (
    <MainLayout title="Gestión de Sucursales">
      
      {/* 1. Header Superior con Perfil de Usuario y Botón de Cerrar Sesión */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-2xl border border-slate-200 mb-8 shadow-sm gap-4">
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
          
          {/* BOTÓN CERRAR SESIÓN */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-red-50 text-[#64748B] hover:text-red-600 rounded-xl text-xs font-semibold transition-all border border-slate-200 hover:border-red-200 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* 2. Banner de KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* KPI 1: Ingresos Totales */}
        <Card className="card-analytics p-5 bg-white relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Ingresos Totales por Sedes</p>
              <h3 className="text-2xl font-extrabold text-[#0F172A] mt-1">S/ 842,050</h3>
            </div>
            <div className="p-2.5 bg-blue-50 text-[#2563EB] rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="h-10 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <Area type="monotone" dataKey="val" stroke="#2563EB" fill="#2563EB" fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +12.3% vs mes anterior
          </p>
        </Card>

        {/* KPI 2: Ticket Promedio */}
        <Card className="card-analytics p-5 bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Ticket Promedio / Sede</p>
              <h3 className="text-2xl font-extrabold text-[#0F172A] mt-1">S/ 1,480</h3>
            </div>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full w-fit mt-4 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> 94% Meta Lograda
          </span>
        </Card>

        {/* KPI 3: Sedes Operativas */}
        <Card className="card-analytics p-5 bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Sedes Operativas</p>
              <h3 className="text-2xl font-extrabold text-[#0F172A] mt-1">14 Activas</h3>
            </div>
            <div className="p-2.5 bg-cyan-50 text-[#06B6D4] rounded-xl">
              <Store className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-amber-600 font-semibold mt-4 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> 1 sede en mantenimiento
          </p>
        </Card>

        {/* KPI 4: Cobertura de Personal */}
        <Card className="card-analytics p-5 bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Personal Total</p>
              <h3 className="text-2xl font-extrabold text-[#0F172A] mt-1">340 Empleados</h3>
            </div>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-[#64748B] mt-4">
            Promedio: <span className="font-bold text-[#0F172A]">24 colaboradores/sede</span>
          </p>
        </Card>
      </div>

      {/* 3. Módulo de Análisis Gráfico */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Gráfico de Barras: Rendimiento por Sede */}
        <Card className="lg:col-span-2 card-analytics p-6 bg-white">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">Rendimiento de Ventas por Sede (S/)</h3>
              <p className="text-xs text-[#64748B]">Comparativo de ingresos ejecutados vs presupuesto asignado</p>
            </div>
            <button className="flex items-center gap-1.5 text-xs text-[#2563EB] font-semibold hover:underline">
              <Download className="w-3.5 h-3.5" /> Exportar
            </button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchPerformance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} />
                <YAxis tickLine={false} />
                <Tooltip />
                <Bar dataKey="ventas" name="Ventas Reals" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="meta" name="Meta Asignada" fill="#94A3B8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Gráfico de Distribución Regional (Pie Chart) */}
        <Card className="card-analytics p-6 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <PieChartIcon className="w-5 h-5 text-[#06B6D4]" />
              <h3 className="text-base font-bold text-[#0F172A]">Cuota Mercado por Región</h3>
            </div>
            <p className="text-xs text-[#64748B] mb-4">Distribución porcentual de facturación nacional</p>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={regionDistribution} dataKey="value" innerRadius={45} outerRadius={65} paddingAngle={4}>
                    {regionDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Leyenda del Pie Chart */}
          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100">
            {regionDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-[11px] text-[#64748B]">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="truncate">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </Card>

      </div>

      {/* 4. Tabla Principal + Acciones y Buscador */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna de Tabla (2/3 de ancho) */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Controles de Filtro y Buscador */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            
            {/* Buscador */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por código, sede o ciudad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] transition-colors"
              />
            </div>

            {/* Select Filtro de Estado */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#64748B]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#F8FAFC] border border-slate-200 text-[#0F172A] rounded-xl text-xs py-2 px-3 focus:outline-none focus:border-[#2563EB]"
              >
                <option value="ALL">Todos los Estados</option>
                <option value="ACTIVE">Activos / Abiertos</option>
                <option value="MAINTENANCE">En Mantenimiento</option>
              </select>
            </div>
          </div>

          {/* Tabla de Datos */}
          <Card className="card-analytics p-0 overflow-hidden bg-white">
            <Table headers={['Código / Sede', 'Ubicación', 'Estado', 'Acción']}>
              {filteredBranches.map((b) => {
                const isActive = b.status?.toLowerCase() === 'activo' || b.status?.toLowerCase() === 'abierto';
                return (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-0">
                    
                    {/* Código y Nombre */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold text-xs">
                          {b.code ? b.code.substring(0, 3) : 'SUC'}
                        </div>
                        <div>
                          <p className="font-bold text-xs text-[#0F172A]">{b.name}</p>
                          <p className="text-[11px] font-mono text-[#64748B]">{b.code}</p>
                        </div>
                      </div>
                    </td>

                    {/* Ubicación */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                        <MapPin className="w-3.5 h-3.5 text-[#06B6D4]" />
                        <span>{b.city}, Perú</span>
                      </div>
                    </td>

                    {/* Estado */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded-full font-semibold ${
                        isActive 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {isActive ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        ) : (
                          <Clock className="w-3 h-3 text-amber-500" />
                        )}
                        {b.status || 'Abierto'}
                      </span>
                    </td>

                    {/* Menú de Opciones */}
                    <td className="px-5 py-4">
                      <button className="p-1.5 text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </Table>
          </Card>
        </div>

        {/* Banner Lateral Call-To-Action */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white p-6 rounded-2xl shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[340px]">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#2563EB]/20 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-[#06B6D4]/20 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#06B6D4] uppercase bg-[#06B6D4]/10 px-3 py-1 rounded-full border border-[#06B6D4]/20">
                Plan de Expansión
              </span>
             <h3 className="text-xl text-blue-600 font-extrabold mt-4 leading-snug">
                ¿Deseas registrar una nueva sucursal?
              </h3>
              <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                Asigna presupuesto, personal a cargo y métricas operativas centralizadas para tu nueva sede en tiempo real.
              </p>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-6 w-full py-3.5 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer group"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              <span>+ Nueva Sucursal</span>
            </button>
          </div>
        </div>

      </div>

      {/* 5. MODAL PARA REGISTRAR NUEVA SUCURSAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in-up">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">Registrar Nueva Sucursal</h3>
                <p className="text-xs text-[#64748B]">Ingresa los datos clave de la sede</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-[#0F172A] rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBranch} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Código de Sede</label>
                <input
                  type="text"
                  placeholder="Ej. SUC-005"
                  value={newBranch.code}
                  onChange={(e) => setNewBranch({ ...newBranch, code: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Nombre de la Sucursal</label>
                <input
                  type="text"
                  placeholder="Ej. Sucursal Este Chiclayo"
                  value={newBranch.name}
                  onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Ciudad / Región</label>
                <input
                  type="text"
                  placeholder="Ej. Chiclayo, Perú"
                  value={newBranch.city}
                  onChange={(e) => setNewBranch({ ...newBranch, city: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Estado Operativo</label>
                <select
                  value={newBranch.status}
                  onChange={(e) => setNewBranch({ ...newBranch, status: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="Activo">Activo / Operativo</option>
                  <option value="Mantenimiento">En Mantenimiento</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#64748B] text-xs font-bold rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl shadow-md transition-all"
                >
                  Guardar Sede
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </MainLayout>
  );
};