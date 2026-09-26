import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Companies } from './pages/Companies';
import { Branches } from './pages/Branches';
import { Products } from './pages/Products';
import { Sales } from './pages/Sales';
import { Inventory } from './pages/Inventory';
import { Vectors } from './pages/Vectors';
import { Matrices } from './pages/Matrices';
import { Operations } from './pages/Operations';
import { History } from './pages/History';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/empresa" element={<Companies />} />
        <Route path="/sucursales" element={<Branches />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/ventas" element={<Sales />} />
        <Route path="/inventario" element={<Inventory />} />
        <Route path="/vectores" element={<Vectors />} />
        <Route path="/matrices" element={<Matrices />} />
        <Route path="/operaciones" element={<Operations />} />
        <Route path="/historial" element={<History />} />
        <Route path="/reportes" element={<Reports />} />
        <Route path="/configuracion" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;