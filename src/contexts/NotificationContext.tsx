import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

type Tipo = 'success' | 'error' | 'info';
type Toast = { id: number; tipo: Tipo; mensaje: string };
type Ctx = { notify: (tipo: Tipo, mensaje: string) => void };

const NotificationContext = createContext<Ctx | null>(null);
let nextId = 1;

const estilos: Record<Tipo, string> = {
  success: 'bg-verde text-ink',
  error: 'bg-rojo text-ink',
  info: 'bg-lila text-ink',
};

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((tipo: Tipo, mensaje: string) => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, tipo, mensaje }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-xs">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`border-2 border-ink shadow-brutal px-4 py-3 font-mono text-sm font-bold ${estilos[t.tipo]}`}
          >
            {t.mensaje}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotify() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error('useNotify debe usarse dentro de <NotificationProvider>');
  }
  return ctx.notify;
}
