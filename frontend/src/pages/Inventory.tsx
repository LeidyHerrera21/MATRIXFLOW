import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { mockInventory } from '../mock/salesMock';
import {
  Boxes,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  RefreshCw,
  Search,
  Filter,
  ArrowUpDown,
  Building2,
  Send,
  X,
  ShieldAlert,
} from 'lucide-react';

export const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [branchFilter, setBranchFilter] = useState<string>('ALL');
  const [inventoryList, setInventoryList] = useState(mockInventory);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  // Formulario Transferencia entre Sucursales
  const [transferData, setTransferData] = useState({
    originBranch: 'Sede Principal',
    destBranch: 'Sede Norte',
    productName: '',
    quantity: 10,
  });

  // Métricas dinámicas calculadas a partir del mock
  const totalItems = inventoryList.reduce((acc, curr) => acc + curr.stock, 0);
  const criticalCount = inventoryList.filter((i) => i.status === 'CRITICAL').length;
  const overstockCount = inventoryList.filter((i) => i.status === 'OVERSTOCK').length;
  const optimalCount = inventoryList.filter((i) => (i.status as any) === 'OK' || !i.status).length;
  // Lista única de sucursales para el filtro
  const uniqueBranches = Array.from(new Set(inventoryList.map((i) => i.branchName)));

  // Filtrado dinámico de la tabla
  const filteredInventory = inventoryList.filter((item) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.branchName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const matchesBranch = branchFilter === 'ALL' || item.branchName === branchFilter;

    return matchesSearch && matchesStatus && matchesBranch;
  });


  const handleRestock = (id: string) => {
    setInventoryList((prev) =>
      prev.map((item) =>
        item.id === id
          ? ({ ...item, stock: item.minStock * 2, status: 'normal' as any })
          : item
      )
    );
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransferModalOpen(false);
  };

  return (
    <MainLayout title="Control e Inteligencia de Inventario">
      
      {/* 1. Tarjetas KPIS de Resumen Metodológico de Existencias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Total Stock */}
        <Card className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#64748B]">Total Existencias</p>
            <h3 className="text-2xl font-black text-[#0F172A] mt-1">{totalItems.toLocaleString()}</h3>
            <p className="text-[11px] text-emerald-600 font-bold mt-0.5 flex items-center gap-1">
              <span>Unidades registradas</span>
            </p>
          </div>
          <div className="p-3 bg-blue-50 text-[#2563EB] rounded-2xl">
            <Boxes className="w-6 h-6" />
          </div>
        </Card>

        {/* Stock Crítico */}
        <Card className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#64748B]">Alertas Críticas</p>
            <h3 className="text-2xl font-black text-red-600 mt-1">{criticalCount}</h3>
            <p className="text-[11px] text-red-500 font-medium mt-0.5">Requieren reabastecimiento</p>
          </div>
          <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </Card>

        {/* Sobrestock */}
        <Card className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#64748B]">Exceso (Overstock)</p>
            <h3 className="text-2xl font-black text-amber-600 mt-1">{overstockCount}</h3>
            <p className="text-[11px] text-amber-600 font-medium mt-0.5">Capital inmovilizado</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <TrendingDown className="w-6 h-6" />
          </div>
        </Card>

        {/* Estado Óptimo */}
        <Card className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#64748B]">Nivel Óptimo</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">{optimalCount}</h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Dentro del rango ideal</p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </Card>

      </div>

      {/* 2. Barra de Herramientas, Filtros y Acciones */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6">
        
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Buscador de Producto / Sucursal */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por producto o sucursal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          {/* Filtro por Sucursal */}
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#64748B]" />
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="bg-[#F8FAFC] border border-slate-200 text-[#0F172A] rounded-xl text-xs py-2 px-3 focus:outline-none focus:border-[#2563EB]"
            >
              <option value="ALL">Todas las Sucursales</option>
              {uniqueBranches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Filtro por Estado */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#64748B]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#F8FAFC] border border-slate-200 text-[#0F172A] rounded-xl text-xs py-2 px-3 focus:outline-none focus:border-[#2563EB]"
            >
              <option value="ALL">Todos los Estados</option>
              <option value="CRITICAL">Solo Críticos</option>
              <option value="OVERSTOCK">Solo Sobrestock</option>
              <option value="OK">Solo Óptimo</option>
            </select>
          </div>

        </div>

        {/* Botón Transferencia de Stock */}
        <button
          onClick={() => setIsTransferModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer shrink-0"
        >
          <ArrowUpDown className="w-4 h-4" />
          <span>Transferir Entre Sedes</span>
        </button>

      </div>

      {/* 3. Tabla Principal de Inventario */}
      <Card className="p-0 overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
        <Table headers={['Sucursal', 'Producto', 'Stock Actual', 'Mínimo Requerido', 'Estado', 'Acción Rápida']}>
          {filteredInventory.map((i) => {
            const isCritical = i.status === 'CRITICAL';
            const isOverstock = i.status === 'OVERSTOCK';

            return (
              <tr key={i.id} className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-0">
                
                {/* Sucursal */}
                <td className="px-5 py-4 font-bold text-xs text-[#0F172A] flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  {i.branchName}
                </td>

                {/* Producto */}
                <td className="px-5 py-4 font-medium text-xs text-[#0F172A]">
                  {i.productName}
                </td>

                {/* Stock Actual con Barra Visual */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-extrabold text-[#0F172A] w-8">
                      {i.stock}
                    </span>
                    <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isCritical ? 'bg-red-500' : isOverstock ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min((i.stock / (i.minStock * 2)) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </td>

                {/* Mínimo */}
                <td className="px-5 py-4 font-mono text-xs text-slate-500">
                  {i.minStock} un.
                </td>

                {/* Badge de Estado */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-extrabold rounded-full ${
                      isCritical
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : isOverstock
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {isCritical ? (
                      <AlertTriangle className="w-3 h-3 text-red-500" />
                    ) : isOverstock ? (
                      <TrendingDown className="w-3 h-3 text-amber-500" />
                    ) : (
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    )}
                    {i.status}
                  </span>
                </td>

                {/* Acción Reabastecer */}
                <td className="px-5 py-4">
                  {isCritical ? (
                    <button
                      onClick={() => handleRestock(i.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-[11px] font-bold rounded-lg border border-red-200 transition-all cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Reabastecer
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-medium">Sin acción requerida</span>
                  )}
                </td>

              </tr>
            );
          })}
        </Table>
      </Card>

      {/* 4. MODAL DE TRANSFERENCIA ENTRE SUCURSALES */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">Transferir Stock entre Sedes</h3>
                <p className="text-xs text-[#64748B]">Mueve productos de una sucursal a otra</p>
              </div>
              <button
                onClick={() => setIsTransferModalOpen(false)}
                className="p-1 text-slate-400 hover:text-[#0F172A] rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTransferSubmit} className="p-6 space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Producto</label>
                <select
                  value={transferData.productName}
                  onChange={(e) => setTransferData({ ...transferData, productName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  required
                >
                  <option value="">Selecciona un producto...</option>
                  {inventoryList.map((item) => (
                    <option key={item.id} value={item.productName}>
                      {item.productName} ({item.branchName})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Origen</label>
                  <select
                    value={transferData.originBranch}
                    onChange={(e) => setTransferData({ ...transferData, originBranch: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  >
                    {uniqueBranches.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Destino</label>
                  <select
                    value={transferData.destBranch}
                    onChange={(e) => setTransferData({ ...transferData, destBranch: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  >
                    {uniqueBranches.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Cantidad a Transferir</label>
                <input
                  type="number"
                  min="1"
                  value={transferData.quantity}
                  onChange={(e) => setTransferData({ ...transferData, quantity: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  required
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsTransferModalOpen(false)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#64748B] text-xs font-bold rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Ejecutar Orden
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </MainLayout>
  );
};