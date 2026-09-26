import type { Company, Branch } from '../types';

export const mockCompanies: Company[] = [
  {
    id: 'comp-1',
    name: 'TechMatrix Corp S.A.C.',
    taxId: '20601234567',
    currency: 'PEN (S/)',
    activeBranchesCount: 5
  }
];

export const mockBranches: Branch[] = [
  { id: 'b-1', companyId: 'comp-1', name: 'Sucursal Lima Norte', code: 'LIM-01', city: 'Lima', status: 'ACTIVE' },
  { id: 'b-2', companyId: 'comp-1', name: 'Sucursal Arequipa', code: 'AQP-01', city: 'Arequipa', status: 'ACTIVE' },
  { id: 'b-3', companyId: 'comp-1', name: 'Sucursal Trujillo', code: 'TRJ-01', city: 'Trujillo', status: 'ACTIVE' },
  { id: 'b-4', companyId: 'comp-1', name: 'Sucursal Cusco', code: 'CUZ-01', city: 'Cusco', status: 'ACTIVE' },
  { id: 'b-5', companyId: 'comp-1', name: 'Sucursal Piura', code: 'PIU-01', city: 'Piura', status: 'ACTIVE' }
];