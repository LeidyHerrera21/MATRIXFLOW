export interface Company {
  id: string;
  name: string;
  taxId: string;
  currency: string;
  activeBranchesCount: number;
}

export interface Branch {
  id: string;
  companyId: string;
  name: string;
  code: string;
  city: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  unitPrice: number;
  cost: number;
}

export interface SaleRecord {
  id: string;
  branchName: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  date: string;
}

export interface InventoryItem {
  id: string;
  branchName: string;
  productName: string;
  stock: number;
  minStock: number;
  status: 'NORMAL' | 'CRITICAL' | 'OVERSTOCK';
}

export interface VectorData {
  id: string;
  name: string;
  type: 'row' | 'column';
  dimension: number;
  label: string;
  values: number[];
}

export interface MatrixData {
  id: string;
  name: string;
  rows: number;
  cols: number;
  rowLabels: string[];
  colLabels: string[];
  values: number[][];
}

export interface OperationHistory {
  id: string;
  operationType: string;
  inputs: string[];
  user: string;
  timestamp: string;
  status: 'COMPLETED' | 'FAILED';
}