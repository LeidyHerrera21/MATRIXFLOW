import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, Loader2 } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@matrixflow.pe');
  const [password, setPassword] = useState('123456');
  const [remember, setRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simula una verificación/transición de 1.5 segundos antes de redirigir
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8FAFC]">
      {/* Columna Izquierda: Banner Promocional (Gris Oscuro #0F172A) */}
      <div className="hidden lg:flex lg:w-1/2 login-hero-bg relative overflow-hidden p-12 flex-col justify-between text-white">
        {/* Formas decorativas diagonales */}
        <div className="hero-shape hero-shape-1"></div>
        <div className="hero-shape hero-shape-2"></div>
        <div className="hero-shape hero-shape-3"></div>

        {/* Header Branding con Animación */}
        <div className="relative z-10 flex items-center gap-3 animate-fade-in-up">
          <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center font-bold text-lg text-white shadow-lg">
            M
          </div>
          <span className="font-bold tracking-wider text-xl text-white">MATRIXFLOW</span>
        </div>

        {/* Mensaje Principal con Entrada Escalonada */}
        <div className="relative z-10 max-w-lg mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight opacity-0 animate-fade-in-up animate-delay-1">
            Bienvenido a MatrixFlow
          </h1>
          <p className="text-[#64748B] text-base leading-relaxed opacity-0 animate-fade-in-up animate-delay-2">
            Plataforma integral de analítica matricial y gestión de inventario empresarial en tiempo real.
          </p>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-[#64748B] opacity-0 animate-fade-in-up animate-delay-3">
          © {new Date().getFullYear()} MatrixFlow Inc. Todos los derechos reservados.
        </div>
      </div>

      {/* Columna Derecha: Formulario de Login (Fondo #F8FAFC) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8 opacity-0 animate-fade-in-up animate-delay-1">
          
          {/* Encabezado del Formulario */}
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] uppercase">
              USER LOGIN
            </h2>
            <p className="text-xs font-semibold text-[#06B6D4] uppercase tracking-widest mt-1">
              Enterprise Data Analytics
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="space-y-4">
              
              {/* Campo Usuario / Correo */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#64748B]">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  disabled={isLoading}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electrónico"
                  className="w-full pl-11 pr-4 py-3 bg-[#F1F5F9] border border-transparent rounded-full text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all disabled:opacity-50"
                  required
                />
              </div>

              {/* Campo Contraseña */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#64748B]">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  disabled={isLoading}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="w-full pl-11 pr-4 py-3 bg-[#F1F5F9] border border-transparent rounded-full text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all disabled:opacity-50"
                  required
                />
              </div>
            </div>

            {/* Opciones adicionales */}
            <div className="flex items-center justify-between text-xs px-2">
              <label className="flex items-center cursor-pointer text-[#64748B]">
                <input
                  type="checkbox"
                  checked={remember}
                  disabled={isLoading}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="ml-2 font-medium">Recordarme</span>
              </label>
              
              <a href="#" className="font-medium text-[#06B6D4] hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón de Login con Animación de Carga */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3.5 px-6 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group ${
                  isLoading ? 'btn-submitting opacity-90 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Iniciando sesión...</span>
                  </>
                ) : (
                  <>
                    <span>LOGIN</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};