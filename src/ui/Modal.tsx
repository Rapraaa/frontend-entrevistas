import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

const FOCUSABLES =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({ isOpen, onClose, title, children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const disparadorRef = useRef<HTMLElement | null>(null);
  const tituloId = useId();

  useEffect(() => {
    if (!isOpen) return;

    disparadorRef.current = document.activeElement as HTMLElement | null;

    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const primero = panel?.querySelector<HTMLElement>(FOCUSABLES);
    (primero ?? panel)?.focus();

    const alPresionar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;

      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLES));
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const inicio = focusables[0];
      const fin = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === inicio) {
        e.preventDefault();
        fin.focus();
      } else if (!e.shiftKey && document.activeElement === fin) {
        e.preventDefault();
        inicio.focus();
      }
    };

    document.addEventListener("keydown", alPresionar);
    return () => {
      document.removeEventListener("keydown", alPresionar);
      document.body.style.overflow = anterior;
      disparadorRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? tituloId : undefined}
        aria-label={title ? undefined : "Diálogo"}
        tabIndex={-1}
        className="bg-surface border-[3px] border-trazo shadow-brutal p-6 w-full max-w-lg relative aparece"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 grid h-11 w-11 place-items-center border-2 border-trazo bg-surface2 font-mono font-bold text-fg hover:bg-rojo hover:text-ink transition-colors"
          aria-label="Cerrar"
        >
          <X size={18} strokeWidth={3} />
        </button>
        {title && (
          <h2 id={tituloId} className="font-mono font-bold text-xl text-fg mb-4 pr-14 uppercase">
            {title}
          </h2>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}
