import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const KEY = 'praxis_tema';

export function ThemeToggle() {
  const [oscuro, setOscuro] = useState(() => localStorage.getItem(KEY) === 'dark');

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
      aria-label="Cambiar tema"
      className="flex items-center justify-center w-9 h-9 shrink-0 border-2 border-ink bg-surface2 text-fg hover:shadow-brutal transition-shadow"
    >
      {oscuro ? <Sun size={16} strokeWidth={3} /> : <Moon size={16} strokeWidth={3} />}
    </button>
  );
}
