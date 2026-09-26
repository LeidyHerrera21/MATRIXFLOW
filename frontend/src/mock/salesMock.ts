import type { Product, SaleRecord, InventoryItem } from '../types';

export const mockProducts: Product[] = [
  { id: 'p-1', sku: 'LAP-001', name: 'Laptop Pro 15', category: 'Cómputo', unitPrice: 3500, cost: 2800 },
  { id: 'p-2', sku: 'PC-002', name: 'PC Desktop I7', category: 'Cómputo', unitPrice: 2800, cost: 2100 },
  { id: 'p-3', sku: 'MON-003', name: 'Monitor 27 Ultra', category: 'Periféricos', unitPrice: 950, cost: 650 },
  { id: 'p-4', sku: 'TEC-004', name: 'Teclado Mecánico', category: 'Accesorios', unitPrice: 220, cost: 120 },
  { id: 'p-5', sku: 'MOU-005', name: 'Mouse Ergonómico', category: 'Accesorios', unitPrice: 150, cost: 80 }
];

export const mockSales: SaleRecord[] = [
  { id: 's-101', branchName: 'Sucursal Lima Norte', productName: 'Laptop Pro 15', quantity: 12, totalAmount: 42000, date: '2026-09-20' },
  { id: 's-102', branchName: 'Sucursal Arequipa', productName: 'Monitor 27 Ultra', quantity: 8, totalAmount: 7600, date: '2026-09-21' },
  { id: 's-103', branchName: 'Sucursal Trujillo', productName: 'PC Desktop I7', quantity: 5, totalAmount: 14000, date: '2026-09-22' },
  { id: 's-104', branchName: 'Sucursal Cusco', productName: 'Teclado Mecánico', quantity: 20, totalAmount: 4400, date: '2026-09-23' }
];

export const mockInventory: InventoryItem[] = [
  { id: 'i-1', branchName: 'Sucursal Lima Norte', productName: 'Laptop Pro 15', stock: 45, minStock: 10, status: 'NORMAL' },
  { id: 'i-2', branchName: 'Sucursal Arequipa', productName: 'Monitor 27 Ultra', stock: 4, minStock: 8, status: 'CRITICAL' },
  { id: 'i-3', branchName: 'Sucursal Trujillo', productName: 'PC Desktop I7', stock: 120, minStock: 30, status: 'OVERSTOCK' }
];