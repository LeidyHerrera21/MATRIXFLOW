import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import {
  FileSpreadsheet,
  FileText,
  /*Download,*/
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar,
  Building2,
  CheckCircle2,
  Share2,
  Sparkles,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';

interface ReportCardProps {
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  badgeText?: string;
  onDownloadPdf: () => void;
  onDownloadExcel: () => void;
}

// Componente para tarjetas de reportes con botones animados
const ReportItem: React.FC<ReportCardProps> = ({
  title,
  category,
  description,
  icon,
  badgeText,
  onDownloadPdf,
  onDownloadExcel
}) => {
  return (
    <Card className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group relative overflow-hidden">
      {/* Fondo con brillo sutil en Hover */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-50/50 rounded-full blur-2xl group-hover:bg-blue-100/60 transition-all duration-500 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-blue-50 text-[#2563EB] rounded-2xl group-hover:scale-110 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 shadow-sm">
            {icon}
          </div>
          {badgeText && (
            <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-[#2563EB] border border-blue-100 rounded-full">
              {badgeText}
            </span>
          )}
        </div>

        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{category}</span>
        <h3 className="text-base font-bold text-[#0F172A] mt-0.5 group-hover:text-[#2563EB] transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Botones de Descarga con Animaciones y Efectos */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
        <button
          onClick={onDownloadPdf}
          className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white text-xs font-bold rounded-xl border border-rose-200/60 hover:border-rose-600 shadow-sm hover:shadow-rose-500/25 active:scale-95 transition-all duration-200 cursor-pointer group/btn"
        >
          <FileText className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5" />
          <span>PDF</span>
        </button>

        <button
          onClick={onDownloadExcel}
          className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white text-xs font-bold rounded-xl border border-emerald-200/60 hover:border-emerald-600 shadow-sm hover:shadow-emerald-500/25 active:scale-95 transition-all duration-200 cursor-pointer group/btn"
        >
          <FileSpreadsheet className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5" />
          <span>Excel</span>
        </button>
      </div>
    </Card>
  );
};

export const Reports: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [dateRange, setDateRange] = useState('THIS_MONTH');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <MainLayout title="Reportes Empresariales e Inteligencia de Negocios">
      
      {/* Toast de Notificación con Animación */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Barra Superior de Filtros y Rango de Fechas */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-8">
        
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Selector de Fecha */}
          <div className="flex items-center gap-2 bg-[#F8FAFC] border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-[#0F172A]">
            <Calendar className="w-4 h-4 text-[#2563EB]" />
            <span>Período:</span>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer"
            >
              <option value="TODAY">Hoy</option>
              <option value="THIS_WEEK">Esta Semana</option>
              <option value="THIS_MONTH">Este Mes (Septiembre 2026)</option>
              <option value="LAST_QUARTER">Último Trimestre</option>
              <option value="YEAR_TO_DATE">Año Fiscal 2026</option>
            </select>
          </div>

          {/* Selector de Sucursal */}
          <div className="flex items-center gap-2 bg-[#F8FAFC] border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-[#0F172A]">
            <Building2 className="w-4 h-4 text-[#2563EB]" />
            <span>Sucursal:</span>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer"
            >
              <option value="ALL">Todas las Sedes</option>
              <option value="PRINCIPAL">Sede Principal - San Isidro</option>
              <option value="NORTE">Sede Norte - Los Olivos</option>
              <option value="SUR">Sede Sur - Miraflores</option>
            </select>
          </div>
        </div>

        {/* Botón de Generación Masiva con Animación Avanzada */}
        <button
          onClick={() => triggerToast('Generando paquete consolidado de reportes...')}
          className="relative group overflow-hidden flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#2563EB] to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/25 active:scale-95 transition-all duration-300 cursor-pointer shrink-0"
        >
          <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <Sparkles className="w-4 h-4" />
          <span>Consolidado Completo (ZIP)</span>
        </button>

      </div>

      {/* 2. Resumen KPI Previo a Reportes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <Card className="p-5 bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-2xl shadow-md border border-slate-800 flex justify-between items-center">
          <div>
            <p className="text-[11px] font-bold text-blue-300 uppercase">Ventas Proyectadas vs Reales</p>
            <h4 className="text-2xl font-black mt-1">94.8%</h4>
            <p className="text-[10px] text-emerald-400 font-bold mt-0.5 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +2.4% sobre la meta
            </p>
          </div>
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
            <TrendingUp className="w-6 h-6 text-blue-400" />
          </div>
        </Card>

        <Card className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase">Rotación de Inventario</p>
            <h4 className="text-2xl font-black text-[#0F172A] mt-1">18.2 Días</h4>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Eficiencia operativa óptima</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <BarChart3 className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase">Margen Operativo Promedio</p>
            <h4 className="text-2xl font-black text-emerald-600 mt-1">32.4%</h4>
            <p className="text-[10px] text-emerald-600 font-bold mt-0.5">+1.8% vs mes anterior</p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <PieChart className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* 3. Catálogo de Reportes Disponibles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Reporte 1 */}
        <ReportItem
          title="Desviación de Metas Comerciales"
          category="Ventas & Performance"
          description="Análisis matricial comparativo de ingresos reales frente a metas proyectadas por sede y ejecutivo."
          icon={<TrendingUp className="w-5 h-5" />}
          badgeText="Prioritario"
          onDownloadPdf={() => triggerToast('Descargando Reporte de Desviación de Metas (PDF)...')}
          onDownloadExcel={() => triggerToast('Exportando Excel de Desviación de Metas...')}
        />

        {/* Reporte 2 */}
        <ReportItem
          title="Ingresos Totales por Producto"
          category="Finanzas & Catálogo"
          description="Resultado del producto escalar entre el vector de unidades vendidas y el vector de precios unitarios."
          icon={<BarChart3 className="w-5 h-5" />}
          onDownloadPdf={() => triggerToast('Descargando Reporte de Ingresos por Producto (PDF)...')}
          onDownloadExcel={() => triggerToast('Exportando Excel de Ingresos por Producto...')}
        />

        {/* Reporte 3 */}
        <ReportItem
          title="Valoración de Inventario KÁRDEX"
          category="Logística & Stock"
          description="Estado del inventario actual, costo promedio ponderado y alertas de productos en stock crítico."
          icon={<PieChart className="w-5 h-5" />}
          badgeText="Kárdex SUNAT"
          onDownloadPdf={() => triggerToast('Descargando Registro de Kárdex Valorado (PDF)...')}
          onDownloadExcel={() => triggerToast('Exportando Kárdex Valorado en Excel...')}
        />

        {/* Reporte 4 */}
        <ReportItem
          title="Consolidado Tributario & IGV"
          category="Contabilidad & SUNAT"
          description="Resumen de comprobantes de pago emitidos (Boletas/Facturas), crédito fiscal y cálculo de IGV."
          icon={<FileText className="w-5 h-5" />}
          onDownloadPdf={() => triggerToast('Descargando Reporte Tributario SUNAT (PDF)...')}
          onDownloadExcel={() => triggerToast('Exportando Registro de Ventas para Contador (Excel)...')}
        />

        {/* Reporte 5 */}
        <ReportItem
          title="Rendimiento y Arqueos de Caja POS"
          category="Caja & Operaciones"
          description="Balance de cierres de caja chica, cobros por pasarelas (Yape/Plin, Tarjetas) y diferencias de efectivo."
          icon={<RefreshCw className="w-5 h-5" />}
          onDownloadPdf={() => triggerToast('Descargando Arqueos de Caja (PDF)...')}
          onDownloadExcel={() => triggerToast('Exportando Libro de Caja en Excel...')}
        />

        {/* Reporte 6 */}
        <ReportItem
          title="Cartera y Retención de Clientes"
          category="CRM & Clientes"
          description="Análisis RFM (Recencia, Frecuencia, Monto) con el ranking de los clientes con mayor volumen de compra."
          icon={<Share2 className="w-5 h-5" />}
          onDownloadPdf={() => triggerToast('Descargando Reporte RFM Clientes (PDF)...')}
          onDownloadExcel={() => triggerToast('Exportando Base de Datos CRM en Excel...')}
        />

      </div>

    </MainLayout>
  );
};