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

// Los IDs (uuid / ObjectId) no se muestran: no le dicen nada al usuario.
const esId = (s: string) => /^[0-9a-f]{16,}$/i.test(s) || /^[0-9a-f-]{30,}$/i.test(s);

// Solo enlazamos rutas que EXISTEN; si no, el crumb va como texto plano.
const esRutaReal = (p: string) =>
  ['/dashboard', '/perfil', '/setup'].includes(p) ||
  /^\/admin\/catalogos\/[^/]+$/.test(p) ||
  /^\/publico\/[^/]+$/.test(p);

export function Breadcrumbs() {
  const { pathname } = useLocation();

  // En el dashboard el breadcrumb sería circular ("Inicio / Dashboard"): se oculta.
  if (pathname === '/dashboard' || pathname === '/') return null;

  const partes = pathname.split('/').filter(Boolean).filter((p) => !esId(p));
  if (partes.length === 0) return null;

  return (
    <nav
      aria-label="Ruta de navegación"
      className="px-6 py-2 flex flex-wrap items-center gap-2 font-mono text-xs text-muted border-b-2 border-fg/20"
    >
      <Link to="/dashboard" className="hover:text-naranja">Inicio</Link>
      {partes.map((p, i) => {
        const to = '/' + partes.slice(0, i + 1).join('/');
        const label = LABELS[p] ?? p;
        const ultimo = i === partes.length - 1;
        return (
          <span key={to} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {ultimo || !esRutaReal(to) ? (
              <span className={ultimo ? 'text-fg font-bold' : ''}>{label}</span>
            ) : (
              <Link to={to} className="hover:text-naranja">{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
