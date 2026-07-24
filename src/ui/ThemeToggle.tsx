import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const KEY = 'praxis_tema';

function temaInicial(): boolean {
  const guardado = localStorage.getItem(KEY);
  if (guardado === 'dark') return true;
  if (guardado === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ThemeToggle() {
  const [oscuro, setOscuro] = useState(temaInicial);

  // Aplica el tema al <html> y lo persiste, para que sobreviva a recargas.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', oscuro ? 'dark' : 'light');
    localStorage.setItem(KEY, oscuro ? 'dark' : 'light');
  }, [oscuro]);

  return (
    <button
      type="button"
      onClick={() => setOscuro((o) => !o)}
      title={oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      aria-label={oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      aria-pressed={oscuro}
      className="flex items-center justify-center w-11 h-11 shrink-0 border-2 border-trazo bg-surface2 text-fg presiona"
    >
      {oscuro ? <Sun size={18} strokeWidth={3} /> : <Moon size={18} strokeWidth={3} />}
    </button>
  );
}
