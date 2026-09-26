import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { mockMatrices } from '../mock/matricesMock';
import {
  Calculator,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Sliders,
  Layers,
  HelpCircle,
  FileCode2
} from 'lucide-react';

export const Operations: React.FC = () => {
  const [selectedOp, setSelectedOp] = useState('SUBTRACT');
  const [matrixAIndex, setMatrixAIndex] = useState(0);
  const [matrixBIndex, setMatrixBIndex] = useState(1);
  const [scalarFactor, setScalarFactor] = useState(1.18); // Por ejemplo, factor IGV o ajuste

  // Estados de animación para la ejecución del cálculo
  const [isCalculating, setIsCalculating] = useState(false);
  const [executed, setExecuted] = useState(false);

  // Valores simulados del resultado según la operación
  const resultValuesMap: Record<string, number[][]> = {
    SUBTRACT: [
      [-5, -5, -5, -10, -10],
      [-5, -5, -5, -10, -10],
      [-2, -3, -5, -5, -5],
      [-3, -5, -5, -5, -5],
      [-5, -3, -5, -5, -5]
    ],
    ADD: [
      [35, 45, 55, 50, 60],
      [45, 55, 65, 70, 80],
      [22, 33, 45, 55, 65],
      [33, 45, 55, 65, 75],
      [55, 63, 75, 85, 95]
    ],
    SCALAR: [
      [17.7, 23.6, 29.5, 23.6, 29.5],
      [23.6, 29.5, 35.4, 35.4, 41.3],
      [11.8, 17.7, 23.6, 29.5, 35.4],
      [17.7, 23.6, 29.5, 35.4, 41.3],
      [29.5, 35.4, 41.3, 47.2, 53.1]
    ]
  };

  const currentResult = resultValuesMap[selectedOp] || resultValuesMap.SUBTRACT;

  // Handler de Ejecución con Animación Multietapa
  const handleExecute = () => {
    setIsCalculating(true);
    setExecuted(false);

    // Simulación del tiempo de procesamiento matricial
    setTimeout(() => {
      setIsCalculating(false);
      setExecuted(true);
    }, 800);
  };

  return (
    <MainLayout title="Calculadora y Operaciones Matriciales">
      
      {/* 1. Panel Selector de Parámetros Matriciales */}
      <Card className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="p-3 bg-blue-50 text-[#2563EB] rounded-2xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0F172A]">Motor de Cálculo en Álgebra Lineal</h3>
            <p className="text-xs text-[#64748B]">
              Ejecuta transformaciones vectoriales, restas de metas y escalados de precios
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          
          {/* Selector de Operación */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#2563EB]" />
              Operación ÁL
            </label>
            <select
              value={selectedOp}
              onChange={(e) => {
                setSelectedOp(e.target.value);
                setExecuted(false);
              }}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#2563EB] transition-all cursor-pointer"
            >
              <option value="SUBTRACT">Resta Matricial (Real - Metas Proyectadas)</option>
              <option value="ADD">Suma Matricial (Acumulado de Ventas Sedes)</option>
              <option value="SCALAR">Multiplicación por Escalar (Factor de Ajuste / IGV)</option>
            </select>
          </div>

          {/* Selector de Matriz A */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#2563EB]" />
              Matriz Principal (A)
            </label>
            <select
              value={matrixAIndex}
              onChange={(e) => setMatrixAIndex(Number(e.target.value))}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#2563EB] transition-all cursor-pointer"
            >
              {mockMatrices.map((m, idx) => (
                <option key={m.id} value={idx}>{m.name} ({m.rows}x{m.cols})</option>
              ))}
            </select>
          </div>

          {/* Selector de Matriz B o Factor Escalar */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              {selectedOp === 'SCALAR' ? 'Factor Escalar (k)' : 'Matriz Secundaria (B)'}
            </label>
            
            {selectedOp === 'SCALAR' ? (
              <input
                type="number"
                step="0.01"
                value={scalarFactor}
                onChange={(e) => setScalarFactor(Number(e.target.value))}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
              />
            ) : (
              <select
                value={matrixBIndex}
                onChange={(e) => setMatrixBIndex(Number(e.target.value))}
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#2563EB] transition-all cursor-pointer"
              >
                {mockMatrices.map((m, idx) => (
                  <option key={m.id} value={idx}>{m.name} ({m.rows}x{m.cols})</option>
                ))}
              </select>
            )}
          </div>

        </div>

        {/* 2. BOTÓN DE EJECUCIÓN CON ANIMACIÓN INTERACTIVA */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleExecute}
            disabled={isCalculating}
            className={`relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 py-3 text-xs font-extrabold rounded-xl shadow-lg transition-all duration-300 cursor-pointer active:scale-95 ${
              isCalculating
                ? 'bg-blue-400 text-white cursor-wait'
                : executed
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5'
            }`}
          >
            {/* Efecto de destello en movimiento en Hover */}
            <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {isCalculating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Calculando Álgebra...</span>
              </>
            ) : executed ? (
              <>
                <CheckCircle2 className="w-4 h-4 animate-bounce" />
                <span>¡Cálculo Exitoso! Recalcular</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Ejecutar Cálculo Matricial</span>
              </>
            )}
          </button>

          {executed && (
            <button
              onClick={() => setExecuted(false)}
              className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all cursor-pointer"
              title="Limpiar Resultado"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

      </Card>

      {/* 3. Panel de Visualización de Resultados Animado */}
      {executed && (
        <Card className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-xl animate-fade-in relative overflow-hidden">
          
          {/* Encabezado del Resultado */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-extrabold text-[#2563EB] uppercase tracking-wider">
                Resultado de Operación Matricial
              </span>
              <h3 className="text-base font-bold text-[#0F172A] mt-0.5">
                {selectedOp === 'SUBTRACT' && 'Matriz Desviación de Metas (Real - Proyectado)'}
                {selectedOp === 'ADD' && 'Matriz Consolidada de Unidades Vendidas'}
                {selectedOp === 'SCALAR' && `Matriz Escalada con Factor k = ${scalarFactor}`}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-slate-100 text-[#0F172A] text-xs font-mono font-bold rounded-lg border border-slate-200">
                Dimensión: 5 x 5
              </span>
            </div>
          </div>

          {/* Rejilla de la Matriz con Llaves Visuales Estilizadas */}
          <div className="overflow-x-auto p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200/80 flex items-center justify-center">
            
            {/* Llave Izquierda */}
            <div className="text-3xl sm:text-5xl font-light text-slate-300 mr-2 select-none">
              [
            </div>

            <table className="border-collapse font-mono text-xs text-center">
              <tbody>
                {currentResult.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((val, cIdx) => {
                      const isNegative = val < 0;
                      return (
                        <td
                          key={cIdx}
                          className="p-2 sm:p-3"
                        >
                          <div
                            className={`w-12 h-10 sm:w-14 sm:h-11 flex items-center justify-center rounded-xl font-bold border transition-all duration-300 hover:scale-110 shadow-sm ${
                              isNegative
                                ? 'bg-rose-50 text-rose-600 border-rose-200/80 shadow-rose-500/10'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200/80 shadow-emerald-500/10'
                            }`}
                          >
                            {val}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Llave Derecha */}
            <div className="text-3xl sm:text-5xl font-light text-slate-300 ml-2 select-none">
              ]
            </div>

          </div>

          {/* Leyenda y Diagnóstico de Resultados */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap justify-between items-center text-xs gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-rose-100 border border-rose-300" />
                <span className="text-slate-600 font-semibold">Valores Negativos (Déficit de Meta)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-emerald-100 border border-emerald-300" />
                <span className="text-slate-600 font-semibold">Valores Positivos (Superávit)</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 font-mono">
              Algoritmo de Cómputo: O(n³) Gauss-Jordan Standard
            </p>
          </div>

        </Card>
      )}

    </MainLayout>
  );
};