import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { mockSales } from '../mock/salesMock';
import {
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Receipt,
  Search,
  Download,
  Plus,
  Building2,
  Calendar,
  CreditCard,
  FileText,
  X,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

// Extensión con método de pago y tipo de comprobante para las ventas
const extendedSales = mockSales.map((s, idx) => ({
  ...s,
  paymentMethod: ['Efectivo', 'Tarjeta Débito', 'Yape / Plin', 'Tarjeta Crédito'][idx % 4],
  documentType: idx % 2 === 0 ? 'Boleta' : 'Factura',
  documentNumber: `B001-${1024 + idx}`,
}));

export const Sales: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('ALL');
  const [paymentFilter, setPaymentFilter] = useState('ALL');
  const [salesList, setSalesList] = useState(extendedSales);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Formulario Nueva Venta
  const [newSale, setNewSale] = useState({
    branchName: 'Sede Principal',
    productName: '',
    quantity: 1,
    unitPrice: 0,
    paymentMethod: 'Efectivo',
    documentType: 'Boleta'
  });

  // Métricas dinámicas calculadas a partir del listado de ventas
  const totalRevenue = salesList.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalTransactions = salesList.length;
  const totalUnitsSold = salesList.reduce((acc, curr) => acc + curr.quantity, 0);
  const averageTicket = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

  // Sucursales únicas para filtro
  const uniqueBranches = Array.from(new Set(salesList.map((s) => s.branchName)));

  // Filtrado dinámico de ventas
  const filteredSales = salesList.filter((sale) => {
    const matchesSearch =
      sale.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(sale.id).includes(searchTerm);

    const matchesBranch = branchFilter === 'ALL' || sale.branchName === branchFilter;
    const matchesPayment = paymentFilter === 'ALL' || sale.paymentMethod === paymentFilter;

    return matchesSearch && matchesBranch && matchesPayment;
  });

  const handleRegisterSale = (e: React.FormEvent) => {
    e.preventDefault();
    const createdSale = {
      id: salesList.length + 1,
      branchName: newSale.branchName,
      productName: newSale.productName,
      quantity: Number(newSale.quantity),
      totalAmount: Number(newSale.quantity) * Number(newSale.unitPrice),
      date: new Date().toISOString().split('T')[0],
      paymentMethod: newSale.paymentMethod,
      documentType: newSale.documentType,
      documentNumber: `B001-${1024 + salesList.length}`
    };

    setSalesList([createdSale as any, ...salesList]);
    setIsModalOpen(false);
    setNewSale({
      branchName: 'Sede Principal',
      productName: '',
      quantity: 1,
      unitPrice: 0,
      paymentMethod: 'Efectivo',
      documentType: 'Boleta'
    });
  };

  return (
    <MainLayout title="Registro y Control de Ventas">
      
      {/* 1. Tarjetas KPIs de Métricas Comerciales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Total Ingresos */}
        <Card className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#64748B]">Ingresos Totales</p>
            <h3 className="text-2xl font-black text-[#2563EB] mt-1">S/ {totalRevenue.toFixed(2)}</h3>
            <p className="text-[11px] text-emerald-600 font-bold mt-0.5 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12.4% vs mes anterior
            </p>
          </div>
          <div className="p-3 bg-blue-50 text-[#2563EB] rounded-2xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </Card>

        {/* Total Operaciones */}
        <Card className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#64748B]">N° Transacciones</p>
            <h3 className="text-2xl font-black text-[#0F172A] mt-1">{totalTransactions}</h3>
            <p className="text-[11px] text-[#64748B] font-medium mt-0.5">Ventas completadas</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
            <Receipt className="w-6 h-6" />
          </div>
        </Card>

        {/* Ticket Promedio */}
        <Card className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#64748B]">Ticket Promedio</p>
            <h3 className="text-2xl font-black text-[#0F172A] mt-1">S/ {averageTicket.toFixed(2)}</h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Promedio por cliente</p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <TrendingUp className="w-6 h-6" />
          </div>
        </Card>

        {/* Productos Vendidos */}
        <Card className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#64748B]">Unidades Vendidas</p>
            <h3 className="text-2xl font-black text-[#0F172A] mt-1">{totalUnitsSold}</h3>
            <p className="text-[11px] text-[#64748B] font-medium mt-0.5">Artículos despachados</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </Card>

      </div>

      {/* 2. Barra de Búsqueda, Filtros y Registro de Venta */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6">
        
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Buscador de Ventas */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por producto, comprobante o sucursal..."
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
              <option value="ALL">Todas las Sedes</option>
              {uniqueBranches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Filtro por Medio de Pago */}
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#64748B]" />
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="bg-[#F8FAFC] border border-slate-200 text-[#0F172A] rounded-xl text-xs py-2 px-3 focus:outline-none focus:border-[#2563EB]"
            >
              <option value="ALL">Método de Pago</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta Débito">Tarjeta Débito</option>
              <option value="Tarjeta Crédito">Tarjeta Crédito</option>
              <option value="Yape / Plin">Yape / Plin</option>
            </select>
          </div>

        </div>

        {/* Acciones: Nueva Venta y Exportar */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-bold rounded-xl transition-all cursor-pointer">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar Reporte</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Registrar Venta</span>
          </button>
        </div>

      </div>

      {/* 3. Tabla Principal de Registro de Ventas */}
      <Card className="p-0 overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
        <Table headers={['Comprobante', 'Sucursal', 'Producto', 'Cantidad', 'Medio de Pago', 'Monto Total', 'Fecha', 'Acciones']}>
          {filteredSales.map((s) => (
            <tr key={s.id} className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-0">
              
              {/* Comprobante / N° Transacción */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#2563EB]" />
                  <div>
                    <p className="font-mono text-xs font-bold text-[#0F172A]">{s.documentNumber}</p>
                    <p className="text-[10px] text-slate-400">{s.documentType}</p>
                  </div>
                </div>
              </td>

              {/* Sucursal */}
              <td className="px-5 py-4 font-bold text-xs text-[#0F172A]">
                {s.branchName}
              </td>

              {/* Producto */}
              <td className="px-5 py-4 font-medium text-xs text-[#0F172A]">
                {s.productName}
              </td>

              {/* Cantidad */}
              <td className="px-5 py-4 font-mono text-xs font-bold text-[#0F172A]">
                {s.quantity} un.
              </td>

              {/* Medio de Pago */}
              <td className="px-5 py-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold bg-slate-100 text-[#0F172A] rounded-lg">
                  <CreditCard className="w-3 h-3 text-[#2563EB]" />
                  {s.paymentMethod}
                </span>
              </td>

              {/* Monto Total */}
              <td className="px-5 py-4 font-extrabold text-xs text-emerald-600">
                S/ {s.totalAmount.toFixed(2)}
              </td>

              {/* Fecha */}
              <td className="px-5 py-4 text-xs text-[#64748B] flex items-center gap-1.5 mt-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {s.date}
              </td>

              {/* Acciones */}
              <td className="px-5 py-4">
                <button 
                  onClick={() => alert(`Reimprimiendo comprobante ${s.documentNumber}`)}
                  className="p-1.5 text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors"
                  title="Ver Comprobante"
                >
                  <Receipt className="w-4 h-4" />
                </button>
              </td>

            </tr>
          ))}
        </Table>
      </Card>

      {/* 4. MODAL PARA REGISTRAR NUEVA VENTA POS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">Nueva Venta POS</h3>
                <p className="text-xs text-[#64748B]">Registra los datos de la transacción</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-[#0F172A] rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSale} className="p-6 space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Sucursal de Venta</label>
                <select
                  value={newSale.branchName}
                  onChange={(e) => setNewSale({ ...newSale, branchName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="Sede Principal">Sede Principal</option>
                  <option value="Sede Norte">Sede Norte</option>
                  <option value="Sede Sur">Sede Sur</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Producto / Servicio</label>
                <input
                  type="text"
                  placeholder="Ej. Monitor Gamer 27 Plus"
                  value={newSale.productName}
                  onChange={(e) => setNewSale({ ...newSale, productName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Cantidad</label>
                  <input
                    type="number"
                    min="1"
                    value={newSale.quantity}
                    onChange={(e) => setNewSale({ ...newSale, quantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Precio Unit. (S/)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newSale.unitPrice || ''}
                    onChange={(e) => setNewSale({ ...newSale, unitPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Medio de Pago</label>
                  <select
                    value={newSale.paymentMethod}
                    onChange={(e) => setNewSale({ ...newSale, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  >
                    <option value="Efectivo">Efectivo</option>
                    <option value="Tarjeta Débito">Tarjeta Débito</option>
                    <option value="Tarjeta Crédito">Tarjeta Crédito</option>
                    <option value="Yape / Plin">Yape / Plin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Comprobante</label>
                  <select
                    value={newSale.documentType}
                    onChange={(e) => setNewSale({ ...newSale, documentType: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  >
                    <option value="Boleta">Boleta</option>
                    <option value="Factura">Factura</option>
                  </select>
                </div>
              </div>

              {/* Total Calculado */}
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex justify-between items-center text-xs">
                <span className="font-bold text-[#0F172A]">Monto Total Pagar:</span>
                <span className="font-extrabold text-sm text-[#2563EB]">
                  S/ {(Number(newSale.quantity) * Number(newSale.unitPrice)).toFixed(2)}
                </span>
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
                  className="w-1/2 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Completar Venta
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </MainLayout>
  );
};