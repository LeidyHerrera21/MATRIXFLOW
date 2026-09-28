import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/ui/Card';
import {
  Building2,
  Receipt,
  ShieldCheck,
  Bell,
  Save,
  CheckCircle2,
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'billing' | 'security' | 'notifications'>('general');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Estados Formulario General
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'TechMatrix Corp S.A.C.',
    ruc: '20601234567',
    currency: 'Soles (PEN)',
    timezone: 'America/Lima (UTC-5)',
    address: 'Av. Javier Prado Este 450, San Isidro, Lima'
  });

  // Estados Formulario Facturación SUNAT
  const [billingSettings, setBillingSettings] = useState({
    sunatUser: 'MODDATOS',
    sunatPass: '••••••••••••',
    igvRate: 18,
    electronicInvoicing: true,
    autoSendSunat: true
  });

  // Estados Notificaciones
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    lowStockNotice: true,
    weeklyReport: false,
    securityAlerts: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <MainLayout title="Configuración y Parámetros del Sistema">
      
      {/* Toast de Confirmación */}
      {savedSuccess && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-xs font-bold">¡Configuración guardada exitosamente!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Menú Lateral de Navegación por Pestañas (4 Columnas) */}
        <div className="lg:col-span-4 space-y-2">
          <Card className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-1">
            
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'general'
                  ? 'bg-[#2563EB] text-white shadow-md'
                  : 'text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A]'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Parámetros Generales</span>
            </button>

            <button
              onClick={() => setActiveTab('billing')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'billing'
                  ? 'bg-[#2563EB] text-white shadow-md'
                  : 'text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A]'
              }`}
            >
              <Receipt className="w-4 h-4" />
              <span>Facturación Electrónica / SUNAT</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-[#2563EB] text-white shadow-md'
                  : 'text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A]'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Seguridad y Credenciales</span>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'notifications'
                  ? 'bg-[#2563EB] text-white shadow-md'
                  : 'text-[#64748B] hover:bg-slate-100 hover:text-[#0F172A]'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Notificaciones y Alertas</span>
            </button>

          </Card>

          {/* Tarjeta de Estado del Sistema */}
          <Card className="p-4 bg-slate-900 text-white border border-slate-800 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400">ESTADO DEL SISTEMA</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-300">Base de Datos: PostgreSQL Core</p>
            <p className="text-[11px] text-slate-400">Último respaldo: Hoy 03:00 AM</p>
          </Card>
        </div>

        {/* Formulario Principal Dinámico (8 Columnas) */}
        <div className="lg:col-span-8">
          <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <form onSubmit={handleSave} className="space-y-6">
              
              {/* PESTAÑA 1: PARÁMETROS GENERALES */}
              {activeTab === 'general' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-base font-bold text-[#0F172A]">Información de la Empresa</h3>
                    <p className="text-xs text-[#64748B]">Configura los datos fiscales y moneda de operación</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1">Nombre Comercial / Razón Social</label>
                      <input
                        type="text"
                        value={generalSettings.companyName}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, companyName: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1">RUC Empresarial</label>
                      <input
                        type="text"
                        value={generalSettings.ruc}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, ruc: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs font-mono text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1">Moneda Principal</label>
                      <select
                        value={generalSettings.currency}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, currency: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                      >
                        <option value="Soles (PEN)">Soles (PEN) - S/</option>
                        <option value="Dólares (USD)">Dólares (USD) - $</option>
                        <option value="Euros (EUR)">Euros (EUR) - €</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1">Zona Horaria</label>
                      <input
                        type="text"
                        value={generalSettings.timezone}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Dirección Fiscal Principal</label>
                    <input
                      type="text"
                      value={generalSettings.address}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>
              )}

              {/* PESTAÑA 2: FACTURACIÓN ELECTRÓNICA / SUNAT */}
              {activeTab === 'billing' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-base font-bold text-[#0F172A]">Integración SUNAT & Comprobantes</h3>
                    <p className="text-xs text-[#64748B]">Configura tus credenciales SOL y tasas de impuestos</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1">Usuario SOL SUNAT</label>
                      <input
                        type="text"
                        value={billingSettings.sunatUser}
                        onChange={(e) => setBillingSettings({ ...billingSettings, sunatUser: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs font-mono text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1">Clave SOL SUNAT</label>
                      <input
                        type="password"
                        value={billingSettings.sunatPass}
                        onChange={(e) => setBillingSettings({ ...billingSettings, sunatPass: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs font-mono text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Tasa IGV (%)</label>
                    <input
                      type="number"
                      value={billingSettings.igvRate}
                      onChange={(e) => setBillingSettings({ ...billingSettings, igvRate: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={billingSettings.electronicInvoicing}
                        onChange={(e) => setBillingSettings({ ...billingSettings, electronicInvoicing: e.target.checked })}
                        className="w-4 h-4 text-[#2563EB] rounded focus:ring-[#2563EB]"
                      />
                      <span className="text-xs font-semibold text-[#0F172A]">Activar emisión de Boletas y Facturas Electrónicas</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={billingSettings.autoSendSunat}
                        onChange={(e) => setBillingSettings({ ...billingSettings, autoSendSunat: e.target.checked })}
                        className="w-4 h-4 text-[#2563EB] rounded focus:ring-[#2563EB]"
                      />
                      <span className="text-xs font-semibold text-[#0F172A]">Envío automático de comprobantes a SUNAT al cerrar venta</span>
                    </label>
                  </div>
                </div>
              )}

              {/* PESTAÑA 3: SEGURIDAD */}
              {activeTab === 'security' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-base font-bold text-[#0F172A]">Seguridad y Autenticación</h3>
                    <p className="text-xs text-[#64748B]">Gestiona claves de acceso y tokens de API</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1">Contraseña Actual</label>
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] mb-1">Nueva Contraseña</label>
                        <input
                          type="password"
                          placeholder="Nueva contraseña"
                          className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] mb-1">Confirmar Nueva Contraseña</label>
                        <input
                          type="password"
                          placeholder="Repite la contraseña"
                          className="w-full px-3 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PESTAÑA 4: NOTIFICACIONES */}
              {activeTab === 'notifications' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-base font-bold text-[#0F172A]">Preferencias de Notificaciones</h3>
                    <p className="text-xs text-[#64748B]">Configura qué alertas deseas recibir por correo</p>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-xl border border-slate-100 cursor-pointer">
                      <span className="text-xs font-semibold text-[#0F172A]">Notificaciones de Alerta por Correo</span>
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailAlerts}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, emailAlerts: e.target.checked })}
                        className="w-4 h-4 text-[#2563EB] rounded focus:ring-[#2563EB]"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-xl border border-slate-100 cursor-pointer">
                      <span className="text-xs font-semibold text-[#0F172A]">Alertas de Stock Crítico en Inventario</span>
                      <input
                        type="checkbox"
                        checked={notificationSettings.lowStockNotice}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, lowStockNotice: e.target.checked })}
                        className="w-4 h-4 text-[#2563EB] rounded focus:ring-[#2563EB]"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-xl border border-slate-100 cursor-pointer">
                      <span className="text-xs font-semibold text-[#0F172A]">Resumen Semanal de Ventas y Rendimiento</span>
                      <input
                        type="checkbox"
                        checked={notificationSettings.weeklyReport}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, weeklyReport: e.target.checked })}
                        className="w-4 h-4 text-[#2563EB] rounded focus:ring-[#2563EB]"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Botón de Guardar Cambios */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Configuración</span>
                </button>
              </div>

            </form>
          </Card>
        </div>

      </div>

    </MainLayout>
  );
};