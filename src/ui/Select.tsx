import type { SelectHTMLAttributes, ReactNode } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  children: ReactNode;
};

export function Select({ label, error, children, className = "", ...props }: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="font-mono font-bold text-sm text-fg">{label}</label>}
      <select 
        className={`w-full bg-base border-2 border-ink px-3 py-2.5 font-mono text-sm text-fg focus:outline-none cursor-pointer ${error ? 'border-rojo' : ''} ${className}`} 
        {...props} 
      >
        {children}
      </select>
      {error && <span className="font-mono text-xs text-rojo">{error}</span>}
    </div>
  );
}
