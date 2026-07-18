import { Link, useLocation } from 'react-router-dom';

const LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  setup: 'Nueva simulación',
  perfil: 'Mi perfil',
  admin: 'Administración',
  catalogos: 'Catálogos',
  publico: 'Catálogo público',
  interview: 'Entrevista',
  resultado: 'Resultado',
  roles: 'Roles',
  'interview-types': 'Tipos de entrevista',
  'seniority-levels': 'Niveles de seniority',
  'job-roles': 'Roles objetivo',
  'difficulty-levels': 'Dificultades',
  companies: 'Empresas',
};

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return null;

  return (
    <nav className="px-6 py-2 flex flex-wrap items-center gap-2 font-mono text-xs text-muted border-b-2 border-ink/20">
      <Link to="/dashboard" className="hover:text-naranja">Inicio</Link>
      {parts.map((p, i) => {
        const to = '/' + parts.slice(0, i + 1).join('/');
        const label = LABELS[p] ?? p;
        const last = i === parts.length - 1;
        return (
          <span key={to} className="flex items-center gap-2">
            <span>/</span>
            {last ? (
              <span className="text-fg font-bold">{label}</span>
            ) : (
              <Link to={to} className="hover:text-naranja">{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
