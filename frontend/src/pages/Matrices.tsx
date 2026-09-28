import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { MatrixGridEditor } from '../components/matrices/MatrixGridEditor';
import { Card } from '../components/ui/Card';
import { mockMatrices } from '../mock/matricesMock';
import {
  Grid,
  Plus,
  RotateCcw,
  Sliders,
  Copy,
  CheckCircle2,
  Trash2,
  Table,
  Sparkles,
  BarChart2,
  Download,
  X
} from 'lucide-react';

export const Matrices: React.FC = () => {
  const [matrices, setMatrices] = useState(mockMatrices);
  const [selectedMatrixId, setSelectedMatrixId] = useState<string | 'ALL'>('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Formulario Nueva Matriz
  const [newMatrixName, setNewMatrixName] = useState('');
  const [newRows, setNewRows] = useState(5);
  const [newCols, setNewCols] = useState(5);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Actualizar valores de matriz
  const handleMatrixChange = (index: number, newVals: number[][]) => {
    const updated = [...matrices];
    updated[index].values = newVals;
    updated[index].rows = newVals.length;
    updated[index].cols = newVals[0]?.length || 0;
    setMatrices(updated);
  };

  // Llenar matriz con ceros
  const handleResetZeros = (index: number) => {
    const target = matrices[index];
    const zeroMatrix = Array.from({ length: target.rows }, () =>
      Array.from({ length: target.cols }, () => 0)
    );
    handleMatrixChange(index, zeroMatrix);
    triggerToast(`Matriz "${target.name}" reiniciada a cero`);
  };

  // Copiar valores en formato CSV
  const handleCopyCsv = (matrix: typeof matrices[0]) => {
    const csvContent = matrix.values.map((row) => row.join(',')).join('\n');
    navigator.clipboard.writeText(csvContent);
    triggerToast(`Matriz "${matrix.name}" copiada al portapapeles en formato CSV`);
  };

  // Crear Nueva Matriz
  const handleCreateMatrix = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMatrixName.trim()) return;

    const newValues = Array.from({ length: newRows }, () =>
      Array.from({ length: newCols }, () => Math.floor(Math.random() * 50) + 10)
    );

    const created = {
      id: matrices.length + 1,
      name: newMatrixName,
      rows: newRows,
      cols: newCols,
      values: newValues
    };

    setMatrices([...matrices, created as any]);
    setIsCreateModalOpen(false);
    setNewMatrixName('');
    triggerToast(`Matriz "${created.name}" creada exitosamente`);
  };

  const displayedMatrices =
    selectedMatrixId === 'ALL'
      ? matrices
      : matrices.filter((m) => m.id === selectedMatrixId);

  return (
    <MainLayout title="Cuadrícula Editable de Matrices y Parámetros">
      
      {/* Toast de Notificación */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Barra de Control Superior y Filtro por Matriz */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6">
        
        {/* Pestañas de Selección Rápida */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedMatrixId('ALL')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedMatrixId === 'ALL'
                ? 'bg-[#2563EB] text-white shadow-md'
                : 'bg-[#F8FAFC] text-[#64748B] hover:bg-slate-100'
            }`}
          >
            Todas las Matrices ({matrices.length})
          </button>

          {matrices.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMatrixId(m.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                selectedMatrixId === m.id
                  ? 'bg-[#2563EB] text-white shadow-md'
                  : 'bg-[#F8FAFC] text-[#64748B] hover:bg-slate-100'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>{m.name}</span>
            </button>
          ))}
        </div>

        {/* Acciones: Nueva Matriz */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Matriz Personalizada</span>
        </button>

      </div>

      {/* 2. Lista de Matrices Editables */}
      <div className="space-y-8">
        {displayedMatrices.map((m) => {
          const originalIndex = matrices.findIndex((item) => item.id === m.id);

          // Cálculos estadísticos en tiempo real de la matriz
          const flatValues = m.values.flat();
          const totalSum = flatValues.reduce((acc, curr) => acc + (Number(curr) || 0), 0);
          const avgValue = flatValues.length > 0 ? (totalSum / flatValues.length).toFixed(1) : 0;
          const maxValue = flatValues.length > 0 ? Math.max(...flatValues) : 0;

          return (
            <Card
              key={m.id}
              className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Encabezado de la Matriz con Métricas */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-blue-50 text-[#2563EB] rounded-xl font-bold text-xs">
                      #{m.id}
                    </span>
                    <h3 className="text-base font-bold text-[#0F172A]">{m.name}</h3>
                  </div>
                  <p className="text-xs text-[#64748B] mt-1">
                    Dimensión Activa: <strong className="text-[#0F172A]">{m.rows} Filas × {m.cols} Columnas</strong>
                  </p>
                </div>

                {/* Tarjetas resumen de la Matriz */}
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Suma Total</p>
                    <p className="text-xs font-black text-[#2563EB]">{totalSum}</p>
                  </div>
                  <div className="px-3 py-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Promedio</p>
                    <p className="text-xs font-black text-[#0F172A]">{avgValue}</p>
                  </div>
                  <div className="px-3 py-1.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Máximo</p>
                    <p className="text-xs font-black text-emerald-600">{maxValue}</p>
                  </div>
                </div>
              </div>

              {/* Componente Editor en Cuadrícula */}
              <div className="overflow-x-auto pb-4">
                <MatrixGridEditor
                  matrix={m}
                  onChange={(newVals) => handleMatrixChange(originalIndex, newVals)}
                />
              </div>

              {/* Botones de Operación sobre la Matriz */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap justify-between items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCsv(m)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar CSV</span>
                  </button>

                  <button
                    onClick={() => handleResetZeros(originalIndex)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Limpiar Ceros</span>
                  </button>
                </div>

                <span className="text-[11px] text-slate-400 font-mono">
                  Edición dinámica activada • Los cambios se guardan automáticamente
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 3. Modal para Crear Nueva Matriz */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">Crear Nueva Matriz</h3>
                <p className="text-xs text-[#64748B]">Define el nombre y las dimensiones de la matriz</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-[#0F172A] rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMatrix} className="p-6 space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Nombre de la Matriz</label>
                <input
                  type="text"
                  placeholder="Ej. Matriz de Costos Logísticos"
                  value={newMatrixName}
                  onChange={(e) => setNewMatrixName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Filas (R)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newRows}
                    onChange={(e) => setNewRows(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs font-mono text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Columnas (C)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newCols}
                    onChange={(e) => setNewCols(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs font-mono text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#64748B] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Generar Matriz
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </MainLayout>
  );
};