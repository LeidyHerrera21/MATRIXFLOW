import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-[#2563EB] hover:bg-blue-700 text-white",
    secondary: "bg-[#06B6D4] hover:bg-cyan-600 text-white",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};