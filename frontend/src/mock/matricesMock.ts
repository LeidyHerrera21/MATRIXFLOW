import type { MatrixData, VectorData, OperationHistory } from '../types';

export const mockVectors: VectorData[] = [
  {
    id: 'v-1',
    name: 'Vector de Precios Unitarios (PEN)',
    type: 'column',
    dimension: 5,
    label: 'Precios',
    values: [3500, 2800, 950, 220, 150]
  },
  {
    id: 'v-2',
    name: 'Vector Metas Globales por Producto',
    type: 'column',
    dimension: 5,
    label: 'Metas',
    values: [50, 40, 80, 150, 200]
  }
];

export const mockMatrices: MatrixData[] = [
  {
    id: 'm-sales-q3',
    name: 'Matriz de Ventas Reales Q3 (Sucursales × Productos)',
    rows: 5,
    cols: 5,
    rowLabels: ['Lima', 'Arequipa', 'Trujillo', 'Cusco', 'Piura'],
    colLabels: ['Laptop', 'PC', 'Monitor', 'Teclado', 'Mouse'],
    values: [
      [45, 30, 85, 120, 150],
      [20, 15, 40, 60, 90],
      [18, 22, 35, 50, 70],
      [12, 10, 25, 45, 60],
      [15, 12, 30, 40, 50]
    ]
  },
  {
    id: 'm-targets-q3',
    name: 'Matriz de Metas Comerciales Q3',
    rows: 5,
    cols: 5,
    rowLabels: ['Lima', 'Arequipa', 'Trujillo', 'Cusco', 'Piura'],
    colLabels: ['Laptop', 'PC', 'Monitor', 'Teclado', 'Mouse'],
    values: [
      [50, 35, 90, 130, 160],
      [25, 20, 45, 70, 100],
      [20, 25, 40, 55, 75],
      [15, 15, 30, 50, 65],
      [20, 15, 35, 45, 55]
    ]
  }
];

export const mockHistory: OperationHistory[] = [
  {
    id: 'op-001',
    operationType: 'RESTA MATRICIAL (Ventas - Metas)',
    inputs: ['Matriz de Ventas Reales Q3', 'Matriz de Metas Comerciales Q3'],
    user: 'admin@matrixflow.pe',
    timestamp: '2026-09-24 14:32:10',
    status: 'COMPLETED'
  },
  {
    id: 'op-002',
    operationType: 'PRODUCTO ESCALAR (Cantidades × Precios)',
    inputs: ['Vector Cantidades Lima', 'Vector Precios Unitarios'],
    user: 'analista@matrixflow.pe',
    timestamp: '2026-09-24 16:05:44',
    status: 'COMPLETED'
  }
];