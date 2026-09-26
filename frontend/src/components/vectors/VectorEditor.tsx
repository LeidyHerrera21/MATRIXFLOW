import React from 'react';
import type { VectorData } from '../../types';

export const VectorEditor: React.FC<{ vector: VectorData }> = ({ vector }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-center mb-3">
      <h3 className="font-bold text-[#0F172A]">{vector.name}</h3>
      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-mono">
        Dim: {vector.dimension} ({vector.type})
      </span>
    </div>
    <div className="flex gap-2 overflow-x-auto py-2">
      {vector.values.map((val, idx) => (
        <div key={idx} className="flex flex-col items-center bg-slate-50 border border-slate-200 p-2 rounded min-w-[60px]">
          <span className="text-[10px] text-slate-400 font-mono">[{idx}]</span>
          <span className="font-mono text-sm font-semibold text-[#2563EB]">{val}</span>
        </div>
      ))}
    </div>
  </div>
);