import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import { mockCompanies } from '../mock/companiesMock';
import { 
  Building2, 
  MapPin, 
  CreditCard, 
  Globe, 
  Phone, 
  Mail, 
  CheckCircle2, 
  LogOut, 
  User, 
  Bell, 
  Store,
  Edit3,
  ShieldCheck,
  FileText,
  DollarSign,
  Users,
  Briefcase,
  Landmark,
  X,
  ExternalLink,
  Award
} from 'lucide-react';

export const Companies: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState(mockCompanies[0] || null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Estado editable para la empresa activa
  const [editForm, setEditForm] = useState({
    name: selectedCompany?.name || '',
    taxId: selectedCompany?.taxId || '',
    address: 'Av. Javier Prado Este 450, San Isidro, Lima',
    phone: '+51 (01) 480-0000',
    email: selectedCompany ? `contacto@${selectedCompany.name.toLowerCase().replace(/\s+/g, '')}.pe` : '',
    website: selectedCompany ? `https://www.${selectedCompany.name.toLowerCase().replace(/\s+/g, '')}.pe` : '',
    currency: selectedCompany?.currency || 'PEN (S/)'
  });

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditModalOpen(false);
  };

  return (
    <MainLayout title="Información de la Empresa">
      
      {/* 1. Header Superior con Perfil de Usuario y Botón de Cerrar Sesión */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-2xl border border-slate-200 mb-8 shadow-sm gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#0F172A]">Sesión Activa: Administrador General</h2>
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

      {/* 2. Banner de Resumen Ejecutivo y Métricas Corporativas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="card-analytics p-5 bg-white border border-slate-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Facturación Anual</p>
              <h3 className="text-2xl font-extrabold text-[#0F172A] mt-1">S/ 4,280,000</h3>
            </div>
            <div className="p-2.5 bg-blue-50 text-[#2563EB] rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Ejercicio fiscal 2026 proyectado
          </span>
        </Card>

        <Card className="card-analytics p-5 bg-white border border-slate-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Cumplimiento SUNAT</p>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">100% al día</h3>
            </div>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-[#64748B]">
            Buen Contribuyente habilitado
          </span>
        </Card>

        <Card className="card-analytics p-5 bg-white border border-slate-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Planilla de Empleados</p>
              <h3 className="text-2xl font-extrabold text-[#0F172A] mt-1">128 Activos</h3>
            </div>
            <div className="p-2.5 bg-cyan-50 text-[#06B6D4] rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-[#64748B]">
            Declarados en T-Registro
          </span>
        </Card>

        <Card className="card-analytics p-5 bg-white border border-slate-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Certificado Digital</p>
              <h3 className="text-2xl font-extrabold text-[#0F172A] mt-1">Válido</h3>
            </div>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-amber-600 font-semibold">
            Expira en 210 días
          </span>
        </Card>
      </div>

      {/* 3. Lista e Información Principal de las Empresas */}
      <div className="space-y-8">
        {mockCompanies.map((c) => (
          <Card key={c.id} className="card-analytics p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6">
            
            {/* Header de la Empresa con Acción de Editar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-5 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold">
                  <Building2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-extrabold text-[#0F172A]">{c.name}</h3>
                    <span className="flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> RUC Habido
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-1 font-mono">RUC: {c.taxId} | Razón Social: {c.name} S.A.C.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-3 py-1.5 bg-slate-100 text-[#0F172A] rounded-xl border border-slate-200">
                  Moneda: {c.currency}
                </span>
                
                <button
                  onClick={() => {
                    setSelectedCompany(c);
                    setIsEditModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Editar Empresa</span>
                </button>
              </div>
            </div>

            {/* Grid de Información Detallada */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Tarjeta 1: Sucursales y Operatividad */}
              <div className="p-5 bg-[#F8FAFC] rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-[#2563EB] mb-3">
                  <Store className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Sedes & Red Operativa</span>
                </div>
                <p className="text-3xl font-extrabold text-[#0F172A]">{c.activeBranchesCount}</p>
                <p className="text-xs text-[#64748B] mt-1">Sucursales interconectadas en tiempo real</p>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-[#2563EB] font-semibold cursor-pointer hover:underline">
                  <span>Ver mapa de sedes</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Tarjeta 2: Régimen Tributario / Facturación */}
              <div className="p-5 bg-[#F8FAFC] rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-[#06B6D4] mb-3">
                  <FileText className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Configuración Fiscal</span>
                </div>
                <p className="text-base font-bold text-[#0F172A]">Régimen General (MYPE)</p>
                <p className="text-xs text-[#64748B] mt-1">Emisión electrónica vía OSE SUNAT</p>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-2 text-xs text-emerald-700 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Serie activa: F001 / B001</span>
                </div>
              </div>

              {/* Tarjeta 3: Contacto Directo */}
              <div className="p-5 bg-[#F8FAFC] rounded-xl border border-slate-100 space-y-2.5">
                <div className="flex items-center gap-2 text-[#2563EB] mb-1">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Contacto & Canales</span>
                </div>
                <div className="flex items-center gap-2 text-[#64748B] text-xs">
                  <MapPin className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span className="truncate">San Isidro, Lima, Perú</span>
                </div>
                <div className="flex items-center gap-2 text-[#64748B] text-xs">
                  <Mail className="w-4 h-4 text-[#06B6D4] shrink-0" />
                  <span className="truncate">contacto@{c.name.toLowerCase().replace(/\s+/g, '')}.pe</span>
                </div>
                <div className="flex items-center gap-2 text-[#64748B] text-xs">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>+51 (01) 480-0000</span>
                </div>
              </div>

            </div>

            {/* 4. Bloques Adicionales: Representante Legal y Cuentas Bancarias */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Representantes Legales */}
              <div className="p-5 bg-white rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-4 h-4 text-[#0F172A]" />
                  <h4 className="text-sm font-bold text-[#0F172A]">Representante Legal & Apoderados</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs p-2.5 bg-[#F8FAFC] rounded-lg">
                    <div>
                      <p className="font-bold text-[#0F172A]">Carlos Alberto Mendoza</p>
                      <p className="text-[#64748B] text-[11px]">Gerente General — DNI: 45892310</p>
                    </div>
                    <span className="text-[10px] bg-blue-50 text-[#2563EB] font-bold px-2 py-1 rounded">Principal</span>
                  </div>
                </div>
              </div>

              {/* Cuentas Bancarias Tesorería */}
              <div className="p-5 bg-white rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <Landmark className="w-4 h-4 text-[#0F172A]" />
                  <h4 className="text-sm font-bold text-[#0F172A]">Cuentas Bancarias Oficiales</h4>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center p-2 bg-[#F8FAFC] rounded-lg">
                    <span className="font-semibold text-[#0F172A]">BCP Soles:</span>
                    <span className="font-mono text-[#64748B]">193-48201940-0-12</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-[#F8FAFC] rounded-lg">
                    <span className="font-semibold text-[#0F172A]">BBVA Dólares:</span>
                    <span className="font-mono text-[#64748B]">0011-0182-01000392</span>
                  </div>
                </div>
              </div>

            </div>

          </Card>
        ))}
      </div>

      {/* 5. MODAL PARA EDITAR INFORMACIÓN DE EMPRESA */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in-up">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">Editar Información Corporativa</h3>
                <p className="text-xs text-[#64748B]">Actualiza los datos fiscales y de contacto</p>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 text-slate-400 hover:text-[#0F172A] rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCompany} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Razón Social</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Número de RUC</label>
                  <input
                    type="text"
                    value={editForm.taxId}
                    onChange={(e) => setEditForm({ ...editForm, taxId: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Dirección Fiscal</label>
                <input
                  type="text"
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Teléfono Corporativo</label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Sitio Web Oficial</label>
                <input
                  type="text"
                  value={editForm.website}
                  onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#64748B] text-xs font-bold rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl shadow-md transition-all"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </MainLayout>
  );
};