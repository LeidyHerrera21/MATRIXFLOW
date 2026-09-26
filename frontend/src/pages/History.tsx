import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Table } from '../components/ui/Table';
import { Card } from '../components/ui/Card';
import { mockHistory } from '../mock/matricesMock';
import {
  History as HistoryIcon,
  Search,
  CheckCircle2,
  Clock,
  UserCheck,
  Eye,
  X,
  ShieldCheck,
  Download,
  Filter,
  Terminal
} from 'lucide-react';

export const History: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedLog, setSelectedLog] = useState<typeof mockHistory[0] | null>(null);

  // Filtrado de la bitácora
  const filteredHistory = mockHistory.filter((item) => {
    const matchesSearch =
      item.operationType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.inputs.join(' ').toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.id).includes(searchTerm);

    const matchesStatus =
      statusFilter === 'ALL' || item.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Métricas
  const totalLogs = mockHistory.length;
  const successfulLogs = mockHistory.filter((h) => h.status.toLowerCase() === 'exitoso').length;
  const successRate = totalLogs > 0 ? ((successfulLogs / totalLogs) * 100).toFixed(1) : '100';

  return (
    <MainLayout title="Historial y Trazabilidad de Operaciones">
      
      {/* Estilos CSS Inline para Animaciones Escalonadas (Stagger) */}
      <style>{`
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-row {
          animation: fadeInSlide 0.35s ease-out forwards;
        }
      `}</style>

      {/* 1. Tarjetas Superiores KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        
        <Card className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <p className="text-xs font-semibold text-[#64748B]">Total Eventos Registrados</p>
            <h3 className="text-2xl font-black text-[#0F172A] mt-1">{totalLogs}</h3>
            <p className="text-[11px] text-[#64748B] mt-0.5 font-medium">Auditoría en tiempo real</p>
          </div>
          <div className="p-3 bg-blue-50 text-[#2563EB] rounded-2xl">
            <HistoryIcon className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <p className="text-xs font-semibold text-[#64748B]">Tasa de Éxito Operativo</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">{successRate}%</h3>
            <p className="text-[11px] text-emerald-600 font-bold mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Operaciones válidas
            </p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <p className="text-xs font-semibold text-[#64748B]">Último Registro</p>
            <h3 className="text-sm font-black text-[#0F172A] mt-1 font-mono">
              {mockHistory[0]?.timestamp || 'N/A'}
            </h3>
            <p className="text-[11px] text-[#64748B] mt-0.5">Usuario: {mockHistory[0]?.user || 'SISTEMA'}</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
            <UserCheck className="w-6 h-6" />
          </div>
        </Card>

      </div>

      {/* 2. Barra de Búsqueda y Filtro de Estado */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6">
        
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Buscador */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por operación, usuario, entradas o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] transition-all"
            />
          </div>

          {/* Filtro Estado */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#64748B]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#F8FAFC] border border-slate-200 text-[#0F172A] rounded-xl text-xs py-2 px-3 focus:outline-none focus:border-[#2563EB] cursor-pointer"
            >
              <option value="ALL">Todos los Estados</option>
              <option value="exitoso">Exitoso</option>
              <option value="error">Error</option>
              <option value="pendiente">Pendiente</option>
            </select>
          </div>

        </div>

        {/* Exportar Log */}
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-bold rounded-xl active:scale-95 transition-all cursor-pointer">
          <Download className="w-4 h-4" />
          <span>Exportar Log</span>
        </button>

      </div>

      {/* 3. Tabla de Bitácora Animada */}
      <Card className="p-0 overflow-hidden bg-white border border-slate-200/80 rounded-2xl shadow-sm">
        <Table headers={['ID', 'Operación Realizada', 'Parámetros / Entradas', 'Usuario Responsable', 'Fecha y Hora', 'Estado', 'Inspeccionar']}>
          {filteredHistory.map((h, index) => {
            const isSuccess = h.status.toLowerCase() === 'exitoso';
            const isError = h.status.toLowerCase() === 'error';

            return (
              <tr
                key={h.id}
                className="animate-row hover:bg-slate-50/80 transition-all duration-200 border-b border-slate-100 last:border-0 group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                
                {/* ID */}
                <td className="px-5 py-4 font-mono text-xs font-bold text-slate-400 group-hover:text-[#2563EB] transition-colors">
                  #{String(h.id).padStart(4, '0')}
                </td>

                {/* Tipo de Operación */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span className="font-bold text-xs text-[#0F172A] group-hover:translate-x-0.5 transition-transform">
                      {h.operationType}
                    </span>
                  </div>
                </td>

                {/* Entradas / Inputs */}
                <td className="px-5 py-4 max-w-xs">
                  <div className="bg-[#F8FAFC] border border-slate-200/60 rounded-lg px-2.5 py-1 font-mono text-[11px] text-slate-600 truncate">
                    {h.inputs.join(' | ')}
                  </div>
                </td>

                {/* Usuario */}
                <td className="px-5 py-4 text-xs font-semibold text-[#0F172A]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 text-[#2563EB] rounded-full flex items-center justify-center font-bold text-[10px]">
                      {h.user.charAt(0).toUpperCase()}
                    </div>
                    <span>{h.user}</span>
                  </div>
                </td>

                {/* Fecha / Timestamp */}
                <td className="px-5 py-4 font-mono text-xs text-[#64748B]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {h.timestamp}
                  </div>
                </td>

                {/* Badge de Estado con Glowing Dot */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold rounded-full ${
                      isSuccess
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                        : isError
                        ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                        : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSuccess ? 'bg-emerald-500 animate-pulse' : isError ? 'bg-rose-500' : 'bg-amber-500 animate-ping'
                      }`}
                    />
                    {h.status}
                  </span>
                </td>

                {/* Botón Acción Inspeccionar */}
                <td className="px-5 py-4">
                  <button
                    onClick={() => setSelectedLog(h)}
                    className="p-2 text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 rounded-xl transition-all cursor-pointer active:scale-90"
                    title="Ver Trazabilidad Completa"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>

              </tr>
            );
          })}
        </Table>
      </Card>

      {/* 4. Modal de Inspección de Auditoría DETALLADA */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-[#2563EB] rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">Trazabilidad de Evento #{selectedLog.id}</h3>
                  <p className="text-xs text-[#64748B]">Detalle técnico de auditoría</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-1.5 text-slate-400 hover:text-[#0F172A] rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="block font-bold text-[#64748B] mb-0.5">Operación Execute</span>
                  <span className="font-bold text-[#2563EB]">{selectedLog.operationType}</span>
                </div>
                <div>
                  <span className="block font-bold text-[#64748B] mb-0.5">Usuario Ejecutor</span>
                  <span className="font-semibold text-[#0F172A]">{selectedLog.user}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="block font-bold text-[#64748B] mb-0.5">Fecha y Hora UTC</span>
                  <span className="font-mono text-[#0F172A]">{selectedLog.timestamp}</span>
                </div>
                <div>
                  <span className="block font-bold text-[#64748B] mb-0.5">Estado Operacional</span>
                  <span className="font-bold text-emerald-600">{selectedLog.status}</span>
                </div>
              </div>

              <div>
                <span className="block text-xs font-bold text-[#0F172A] mb-1.5">Matriz de Entradas / Parámetros:</span>
                <div className="p-3 bg-slate-900 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto">
                  <pre>{JSON.stringify(selectedLog.inputs, null, 2)}</pre>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedLog(null)}
                  className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Cerrar Inspección
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </MainLayout>
  );
};