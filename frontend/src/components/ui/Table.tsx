import React from 'react';

export const Table: React.FC<{ headers: string[]; children: React.ReactNode }> = ({ headers, children }) => (
  <div className="overflow-x-auto w-full border border-slate-200 rounded-lg">
    <table className="w-full text-left text-sm text-slate-700">
      <thead className="bg-slate-50 text-xs text-slate-500 font-semibold uppercase border-b border-slate-200">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="px-4 py-3">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">{children}</tbody>
    </table>
  </div>
);