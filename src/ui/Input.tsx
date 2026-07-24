import { useId } from "react";
import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className = "", id, ...props }: Props) {
  const generado = useId();
  const inputId = id ?? generado;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={inputId} className="font-mono font-bold text-sm text-fg">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full bg-base border-2 border-trazo px-3 py-3 font-mono text-sm text-fg placeholder:text-muted ${error ? 'border-rojo' : ''} ${className}`}
        {...props}
      />
      {error && (
        <span id={errorId} className="font-mono text-xs text-rojo">
          {error}
        </span>
      )}
    </div>
  );
}
