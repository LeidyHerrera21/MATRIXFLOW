import React from 'react';
import type{ MatrixData } from '../../types';

interface Props {
  matrix: MatrixData;
  onChange?: (newVals: number[][]) => void;
  readOnly?: boolean;
}

export const MatrixGridEditor: React.FC<Props> = ({ matrix, onChange, readOnly = false }) => {
  const handleCellChange = (r: number, c: number, v: string) => {
    if (readOnly || !onChange) return;
    const val = parseFloat(v) || 0;
    const updated = matrix.values.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === r && cIdx === c ? val : cell))
    );
    onChange(updated);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-base font-bold text-[#0F172A]">{matrix.name}</h3>
          <p className="text-xs text-[#64748B]">Dimensión: {matrix.rows} × {matrix.cols}</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="border-collapse min-w-full">
          <thead>
            <tr>
              <th className="p-2 border-b border-slate-200 bg-slate-50"></th>
              {matrix.colLabels.map((c, i) => (
                <th key={i} className="p-2 border-b border-slate-200 bg-slate-50 text-xs font-semibold text-[#0F172A]">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.values.map((row, rIdx) => (
              <tr key={rIdx}>
                <td className="p-2 border-b border-slate-100 bg-slate-50 text-xs font-semibold text-[#0F172A]">
                  {matrix.rowLabels[rIdx]}
                </td>
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="p-1 border border-slate-200 text-center">
                    <input
                      type="number"
                      value={cell}
                      disabled={readOnly}
                      onChange={(e) => handleCellChange(rIdx, cIdx, e.target.value)}
                      className="w-20 text-center text-sm py-1 font-mono rounded focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};