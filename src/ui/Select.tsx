import { useId } from "react";
import type { SelectHTMLAttributes, ReactNode } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  children: ReactNode;
};

export function Select({ label, error, children, className = "", id, ...props }: Props) {
  const generado = useId();
  const selectId = id ?? generado;
  const errorId = `${selectId}-error`;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={selectId} className="font-mono font-bold text-sm text-fg">
          {label}
        </label>
      )}
      <select
        id={selectId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full bg-base border-2 border-trazo px-3 py-3 font-mono text-sm text-fg cursor-pointer ${error ? 'border-rojo' : ''} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <span id={errorId} className="font-mono text-xs text-rojo">
          {error}
        </span>
      )}
    </div>
  );
}
