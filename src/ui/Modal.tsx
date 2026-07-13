import type { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export function Modal({ isOpen, onClose, title, children }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm p-4">
      <div className="bg-surface border-[3px] border-ink shadow-brutal p-6 w-full max-w-lg relative animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 font-mono font-bold text-ink hover:text-rojo transition-colors"
          aria-label="Cerrar modal"
        >
          [X]
        </button>
        {title && <h2 className="font-mono font-bold text-xl text-fg mb-4 uppercase">{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  );
}
