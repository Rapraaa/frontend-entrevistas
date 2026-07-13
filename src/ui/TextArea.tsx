import type { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export function TextArea({ label, error, className = "", ...props }: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="font-mono font-bold text-sm text-fg">{label}</label>}
      <textarea
        className={`w-full bg-base border-2 border-ink px-3 py-2.5 font-mono text-sm text-fg placeholder:text-muted focus:outline-none min-h-[100px] resize-y ${error ? 'border-rojo' : ''} ${className}`}
        {...props}
      />
      {error && <span className="font-mono text-xs text-rojo">{error}</span>}
    </div>
  );
}
