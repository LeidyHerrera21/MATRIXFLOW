import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { mockProducts } from '../mock/salesMock';
import { 
  Package, 
  Search, 
  Plus, 
  Filter, 
  Truck, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  User, 
  Bell, 
  LogOut, 
  TrendingUp, 
  DollarSign, 
  X, 
  Layers, 
  ArrowUpRight 
} from 'lucide-react';

// Extensión mock con estado de inventario para la tabla y envíos
const extendedProducts = mockProducts.map((p, idx) => ({
  ...p,
  stock: [45, 12, 85, 0, 28, 64][idx % 6],
  status: ['En Tránsito', 'En Stock', 'En Stock', 'Agotado', 'En Stock', 'En Tránsito'][idx % 6],
  sku: p.sku || `SKU-${1000 + idx}`,
  weight: `${(1.2 + idx * 0.3).toFixed(1)} kg`,
}));

export const Products: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedSku, setSelectedSku] = useState('KG3200L3122324GF');
  const [skuInput, setSkuInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Formulario nuevo producto
  const [newProduct, setNewProduct] = useState({
    sku: '',
    name: '',
    category: 'Electrónica',
    unitPrice: 0,
    cost: 0,
    stock: 10
  });

  const handleLogout = () => {
    navigate('/login');
  };

  // Filtrado de la tabla de productos
  const filteredProducts = extendedProducts.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'ALL' || p.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleAddSku = (e: React.FormEvent) => {
    e.preventDefault();
    if (skuInput) {
      setSelectedSku(skuInput);
      setSkuInput('');
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <MainLayout title="Catálogo e Inventario de Productos">
      
      {/* 1. Header Superior con Perfil de Usuario y Cerrar Sesión */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-2xl border border-slate-200 mb-8 shadow-sm gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#0F172A]">Sesión Activa: Administrador</h2>
            <p className="text-xs text-[#64748B]">admin@matrixflow.pe</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-red-50 text-[#64748B] hover:text-red-600 rounded-xl text-xs font-semibold transition-all border border-slate-200 hover:border-red-200 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* 2. Sección Superior Inspirada en la Interfaz (Búsqueda + En Tránsito + Mapa) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Panel Izquierdo: Formulario Rápido + Ficha de Tracking (5 Columnas) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card: Agregar Nuevo Producto por SKU / Lote */}
          <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <h3 className="text-base font-bold text-[#0F172A]">Agregar nuevo producto</h3>
            <p className="text-xs text-[#64748B] mt-0.5 mb-4">Ingresa el código SKU o código de barras para registrar el producto</p>
            
            <form onSubmit={handleAddSku} className="relative flex items-center">
              <input
                type="text"
                placeholder="Ingresar Código SKU / Lote"
                value={skuInput}
                onChange={(e) => setSkuInput(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] transition-all font-mono"
              />
              <button
                type="submit"
                className="absolute right-1.5 p-2 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </Card>

          {/* Card: Detalle del Producto seleccionado en Tránsito */}
          <Card className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">SKU PRODUCTO</p>
                <h4 className="text-sm font-extrabold text-[#0F172A] font-mono mt-0.5">{selectedSku}</h4>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                <Clock className="w-3 h-3 text-amber-500" /> • En Tránsito
              </span>
            </div>

            {/* Timeline del Despacho */}
            <div className="py-2">
              <div className="flex justify-between text-[11px] text-[#64748B] mb-2 font-medium">
                <div>
                  <p className="text-[10px] text-slate-400">Despacho</p>
                  <p className="font-bold text-[#0F172A]">22.08.26 16:40 PM</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400">Llegada Est.</p>
                  <p className="font-bold text-[#0F172A]">24.08.26 12:30 PM</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between my-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100 z-10"></div>
                <div className="h-0.5 w-full bg-slate-200 relative -mx-1">
                  <div className="h-0.5 bg-[#2563EB] w-2/3"></div>
                </div>
                <div className="w-3 h-3 rounded-full bg-[#2563EB] ring-4 ring-blue-100 z-10"></div>
              </div>
            </div>

            {/* Datos Clave del Envío */}
            <div className="grid grid-cols-4 gap-2 text-center bg-[#F8FAFC] p-3 rounded-xl border border-slate-100">
              <div>
                <p className="text-[10px] text-[#64748B]">Cliente</p>
                <p className="text-xs font-bold text-[#0F172A] truncate">Ella Doer</p>
              </div>
              <div>
                <p className="text-[10px] text-[#64748B]">Precio</p>
                <p className="text-xs font-bold text-[#2563EB]">S/ 1,334</p>
              </div>
              <div>
                <p className="text-[10px] text-[#64748B]">Categoría</p>
                <p className="text-xs font-bold text-[#0F172A]">Ropa</p>
              </div>
              <div>
                <p className="text-[10px] text-[#64748B]">Peso</p>
                <p className="text-xs font-bold text-[#0F172A]">1.2 kg</p>
              </div>
            </div>

            {/* Contacto Responsable de Despacho */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                  JG
                </div>
                <div>
                  <p className="text-[10px] text-[#64748B]">Responsable</p>
                  <p className="text-xs font-bold text-[#0F172A]">John Green</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 bg-[#F8FAFC] hover:bg-slate-100 text-[#0F172A] rounded-xl border border-slate-200 transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xl transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>

          {/* Lista Secundaria de Envíos Rápidos */}
          <div className="space-y-2">
            {[
              { sku: 'PRS0574L1901200CH', orig: 'Paris — Barcelona', st: 'En Tránsito' },
              { sku: 'VNE8365L1465901YT', orig: 'Vancouver — New York', st: 'En Tránsito' },
            ].map((item) => (
              <div 
                key={item.sku} 
                onClick={() => setSelectedSku(item.sku)}
                className="flex items-center justify-between p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0F172A] font-mono">{item.sku}</p>
                    <p className="text-[11px] text-[#64748B]">{item.orig}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  • {item.st}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Panel Derecho: Mapa de Trazabilidad Geográfica (7 Columnas) */}
        <div className="lg:col-span-7">
          <Card className="h-full min-h-[420px] bg-white border border-slate-200 rounded-2xl shadow-sm p-6 relative flex flex-col justify-between overflow-hidden">
            
            {/* Fondo simulado con patrón de mapa de dispersión */}
            <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none"></div>

            {/* Tag flotante superior */}
            <div className="relative z-10 flex justify-center">
              <div className="bg-white shadow-md border border-slate-200 rounded-xl px-4 py-2 text-center animate-bounce">
                <p className="text-xs font-extrabold text-[#0F172A] font-mono">{selectedSku}</p>
                <p className="text-[10px] font-bold text-amber-600">• En Tránsito</p>
              </div>
            </div>

            {/* Ilustración de Ruta Vectorial */}
            <div className="relative z-10 my-auto flex items-center justify-around py-12">
              
              {/* Punto A: Almacén Central */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#0F172A] text-white flex items-center justify-center shadow-xl ring-8 ring-slate-100">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#0F172A] mt-3 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
                  Almacén Central
                </span>
              </div>

              {/* Línea Curva Trazo */}
              <div className="flex-1 max-w-[220px] relative flex items-center justify-center">
                <div className="w-full border-b-2 border-dashed border-slate-400"></div>
                <div className="absolute w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-lg -translate-y-1">
                  <Truck className="w-5 h-5 animate-pulse" />
                </div>
              </div>

              {/* Punto B: Punto de Entrega */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xl ring-8 ring-purple-50">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#0F172A] mt-3 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
                  Punto de Entrega
                </span>
              </div>

            </div>

            {/* Pie del Mapa */}
            <div className="relative z-10 bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs text-[#64748B]">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Monitoreo GPS satelital activo
              </span>
              <span className="font-bold text-[#0F172A]">Velocidad Promedio: 64 km/h</span>
            </div>

          </Card>
        </div>

      </div>

      {/* 3. Tabla Principal de Catálogo de Productos y Métricas */}
      <div className="space-y-4">
        
        {/* Filtros de Tabla y Botón Agregar Producto */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          
          <div className="flex flex-1 items-center gap-3">
            {/* Buscador de Tabla */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por SKU, producto o categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            {/* Filtro por Categoría */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#64748B]" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-[#F8FAFC] border border-slate-200 text-[#0F172A] rounded-xl text-xs py-2 px-3 focus:outline-none focus:border-[#2563EB]"
              >
                <option value="ALL">Todas las Categorías</option>
                <option value="Electrónica">Electrónica</option>
                <option value="Oficina">Oficina</option>
                <option value="Ropa">Ropa</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ Crear Producto</span>
          </button>
        </div>

        {/* Tabla de Productos Integrada */}
        <Card className="card-analytics p-0 overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
          <Table headers={['SKU', 'Producto', 'Categoría', 'Stock Sede', 'Precio Venta', 'Costo', 'Margen %', 'Estado']}>
            {filteredProducts.map((p) => {
              const margin = p.unitPrice > 0 ? (((p.unitPrice - p.cost) / p.unitPrice) * 100).toFixed(1) : '0';
              
              return (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-0">
                  
                  {/* SKU */}
                  <td className="px-5 py-4 font-mono text-xs font-bold text-[#0F172A]">
                    {p.sku}
                  </td>

                  {/* Nombre del Producto */}
                  <td className="px-5 py-4">
                    <p className="font-bold text-xs text-[#0F172A]">{p.name}</p>
                    <p className="text-[10px] text-[#64748B]">Cod: PROD-{p.id}</p>
                  </td>

                  {/* Categoría */}
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-slate-100 text-[#0F172A] rounded-lg">
                      <Layers className="w-3 h-3 text-[#2563EB]" />
                      {p.category}
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="px-5 py-4 font-bold text-xs">
                    <span className={p.stock < 15 ? 'text-amber-600' : 'text-[#0F172A]'}>
                      {p.stock} unidades
                    </span>
                  </td>

                  {/* Precio Venta */}
                  <td className="px-5 py-4 font-extrabold text-xs text-[#2563EB]">
                    S/ {p.unitPrice.toFixed(2)}
                  </td>

                  {/* Costo */}
                  <td className="px-5 py-4 text-xs font-medium text-slate-500">
                    S/ {p.cost.toFixed(2)}
                  </td>

                  {/* Margen */}
                  <td className="px-5 py-4 text-xs font-bold text-emerald-600">
                    +{margin}%
                  </td>

                  {/* Estado Stock / En Tránsito */}
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-full ${
                      p.status === 'En Tránsito'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : p.stock > 0 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {p.status === 'En Tránsito' ? (
                        <Clock className="w-3 h-3 text-amber-500" />
                      ) : p.stock > 0 ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-red-500" />
                      )}
                      {p.status}
                    </span>
                  </td>

                </tr>
              );
            })}
          </Table>
        </Card>

      </div>

      {/* 4. MODAL PARA CREAR NUEVO PRODUCTO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in-up">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">Registrar Nuevo Producto</h3>
                <p className="text-xs text-[#64748B]">Ingresa los detalles para añadirlo al inventario</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-[#0F172A] rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Código SKU</label>
                <input
                  type="text"
                  placeholder="Ej. SKU-99201"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs font-mono text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Nombre del Producto</label>
                <input
                  type="text"
                  placeholder="Ej. Laptop Pro M2"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Categoría</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  >
                    <option value="Electrónica">Electrónica</option>
                    <option value="Oficina">Oficina</option>
                    <option value="Ropa">Ropa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Stock Inicial</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Costo Unitario (S/)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newProduct.cost || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, cost: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Precio Venta (S/)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newProduct.unitPrice || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, unitPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#64748B] text-xs font-bold rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl shadow-md transition-all"
                >
                  Guardar Producto
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </MainLayout>
  );
};