import { useId } from "react";
import type { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export function TextArea({ label, error, className = "", id, ...props }: Props) {
  const generado = useId();
  const areaId = id ?? generado;
  const errorId = `${areaId}-error`;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={areaId} className="font-mono font-bold text-sm text-fg">
          {label}
        </label>
      )}
      <textarea
        id={areaId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full bg-base border-2 border-trazo px-3 py-2.5 font-mono text-sm text-fg placeholder:text-muted min-h-[100px] resize-y ${error ? 'border-rojo' : ''} ${className}`}
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
