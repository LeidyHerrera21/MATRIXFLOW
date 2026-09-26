import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { VectorEditor } from '../components/vectors/VectorEditor';
import { Card } from '../components/ui/Card';
import { mockVectors } from '../mock/matricesMock';
import {
  RotateCcw,
  Copy,
  CheckCircle2,
  Activity,
  Calculator,
  ArrowUpRight,
} from 'lucide-react';

export const Vectors: React.FC = () => {
  const [vectors, setVectors] = useState(mockVectors);
  const [selectedVectorId, setSelectedVectorId] = useState<number | 'ALL'>('ALL');
  
  // Selección de vectores para la calculadora de producto punto / suma
  const [vectorAId, setVectorAId] = useState<string>(mockVectors[0]?.id || '1');
  const [vectorBId, setVectorBId] = useState<string>(mockVectors[1]?.id || '2');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Restablecer vectores a mock original
  const handleReset = () => {
    setVectors(mockVectors);
    showToast('Vectores reiniciados a los valores por defecto');
  };

  // Copiar todos los vectores como JSON
  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(vectors, null, 2));
    showToast('Vectores copiados al portapapeles en formato JSON');
  };

  // Obtener vectores seleccionados para operaciones
  const vecA = vectors.find((v) => v.id === vectorAId) || vectors[0];
  const vecB = vectors.find((v) => v.id === vectorBId) || vectors[1];

  // Cálculo de Producto Punto entre Vec A y Vec B (si tienen la misma dimensión)
  const dotProduct =
    vecA && vecB && vecA.values.length === vecB.values.length
      ? vecA.values.reduce((sum, val, idx) => sum + val * (vecB.values[idx] || 0), 0)
      : null;

  // Suma Vectorial resultante
  const vectorSum =
    vecA && vecB && vecA.values.length === vecB.values.length
      ? vecA.values.map((val, idx) => val + (vecB.values[idx] || 0))
      : null;

  const displayedVectors =
    selectedVectorId === 'ALL'
      ? vectors
      : vectors.filter((v) => Number(v.id) === selectedVectorId);

  return (
    <MainLayout title="Gestión Visual y Operaciones Vectoriales">
      
      {/* Toast de Notificación */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Panel Superior de Calculadora Vectorial */}
      <Card className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="p-3 bg-blue-50 text-[#2563EB] rounded-2xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0F172A]">Calculadora de Operaciones Vectoriales</h3>
            <p className="text-xs text-[#64748B]">
              Calcula producto punto, suma escalar y norma de los vectores activos
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          
          {/* Seleccionar Vector A */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5 flex items-center gap-1.5">
              <ArrowUpRight className="w-3.5 h-3.5 text-[#2563EB]" />
              Vector Principal (u)
            </label>
            <select
              value={vectorAId}
              onChange={(e) => setVectorAId(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#2563EB] cursor-pointer"
            >
              {vectors.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.values.length}D)
                </option>
              ))}
            </select>
          </div>

          {/* Seleccionar Vector B */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5 flex items-center gap-1.5">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
              Vector Secundario (v)
            </label>
            <select
              value={vectorBId}
              onChange={(e) => setVectorBId(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#2563EB] cursor-pointer"
            >
              {vectors.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.values.length}D)
                </option>
              ))}
            </select>
          </div>

          {/* Resumen del Producto Punto */}
          <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-200/80 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Producto Punto (u · v)
            </span>
            <div className="text-xl font-black text-[#0F172A] mt-0.5">
              {dotProduct !== null ? dotProduct : 'Dimensiones incompatibles'}
            </div>
          </div>

        </div>

        {/* Suma Vectorial Resultante */}
        {vectorSum && (
          <div className="p-4 bg-blue-50/50 border border-blue-200/60 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#2563EB]" />
              <span className="text-xs font-bold text-[#0F172A]">Vector Resultante (u + v):</span>
            </div>
            <div className="font-mono text-xs font-bold text-[#2563EB]">
              [{vectorSum.join(', ')}]
            </div>
          </div>
        )}
      </Card>

      {/* 2. Barra de Filtro y Acciones para la Lista */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6">
        
        {/* Filtros por pestaña */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedVectorId('ALL')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedVectorId === 'ALL'
                ? 'bg-[#2563EB] text-white shadow-md'
                : 'bg-[#F8FAFC] text-[#64748B] hover:bg-slate-100'
            }`}
          >
            Todos ({vectors.length})
          </button>

          {vectors.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVectorId(Number(v.id))}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedVectorId === v.id
                  ? 'bg-[#2563EB] text-white shadow-md'
                  : 'bg-[#F8FAFC] text-[#64748B] hover:bg-slate-100'
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>

        {/* Botones de Acción */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyJSON}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copiar JSON</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        </div>

      </div>

      {/* 3. Renderizado de Editores Vectoriales */}
      <div className="space-y-6">
        {displayedVectors.map((v) => {
          // Cálculo de Magnitud / Norma ||v|| = sqrt(x1^2 + x2^2 + ...)
          const magnitude = Math.sqrt(
            v.values.reduce((sum, val) => sum + Math.pow(val, 2), 0)
          ).toFixed(2);

          return (
            <Card
              key={v.id}
              className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Encabezado con Norma del Vector */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-blue-50 text-[#2563EB] rounded-xl font-bold text-xs">
                    #{v.id}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">{v.name}</h4>
                    <p className="text-[11px] text-[#64748B]">
                      Dimensión: {v.values.length} Componentes
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Norma ||v||:
                  </span>
                  <span className="text-xs font-mono font-black text-[#2563EB]">
                    {magnitude}
                  </span>
                </div>
              </div>

              {/* Componente Editor del Vector */}
              <VectorEditor vector={v} />
            </Card>
          );
        })}
      </div>

    </MainLayout>
  );
};