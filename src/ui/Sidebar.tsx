import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Sparkles, User, Globe,
  Shield, MessageSquare, GaugeCircle, Briefcase, SlidersHorizontal, Building2,
  type LucideIcon,
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { CATALOGS } from '../lib/catalogs';

const ICONOS_CATALOGO: Record<string, LucideIcon> = {
  roles: Shield,
  'interview-types': MessageSquare,
  'seniority-levels': GaugeCircle,
  'job-roles': Briefcase,
  'difficulty-levels': SlidersHorizontal,
  companies: Building2,
};

type Props = {
  abierto?: boolean;
  onCerrar?: () => void;
};

export function Sidebar({ abierto = false, onCerrar }: Props) {
  const { isAdmin } = useAuth();

  const base =
    'flex items-center gap-2.5 px-3 py-3 min-h-[44px] font-mono text-sm border-2 border-transparent transition-colors';
  const activo = 'bg-naranja text-ink border-trazo font-bold shadow-brutal';
  const inactivo = 'text-fg hover:bg-surface2 hover:border-trazo';
  const cls = ({ isActive }: { isActive: boolean }) =>
    `${base} ${isActive ? activo : inactivo}`;

  return (
    <>
      {/* Capa oscura al abrir el menú en móvil */}
      {abierto && (
        <div
          onClick={onCerrar}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-ink/60 md:hidden"
        />
      )}

      <aside
        id="menu-lateral"
        aria-label="Navegación principal"
        aria-hidden={!abierto ? undefined : false}
        className={`fixed inset-y-0 left-0 z-50 w-60 shrink-0 bg-surface border-r-[3px] border-trazo flex flex-col gap-1.5 p-3 overflow-y-auto transition-transform duration-200 md:static md:translate-x-0 ${
          abierto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <p className="font-mono font-bold text-[10px] text-muted uppercase tracking-widest px-3 py-2">
          Menú
        </p>
        <NavLink to="/dashboard" className={cls} onClick={onCerrar}>
          <LayoutDashboard size={17} strokeWidth={2.5} /> Dashboard
        </NavLink>
        <NavLink to="/setup" className={cls} onClick={onCerrar}>
          <Sparkles size={17} strokeWidth={2.5} /> Nueva simulación
        </NavLink>
        <NavLink to="/perfil" className={cls} onClick={onCerrar}>
          <User size={17} strokeWidth={2.5} /> Mi perfil
        </NavLink>
        <NavLink to="/publico/roles" className={cls} onClick={onCerrar}>
          <Globe size={17} strokeWidth={2.5} /> Catálogo público
        </NavLink>

        {isAdmin && (
          <>
            <div className="flex items-center gap-2 px-3 pt-5 pb-2">
              <span className="font-mono font-bold text-[10px] text-muted uppercase tracking-widest">
                Administración
              </span>
              <div className="flex-1 h-0.5 bg-fg/20" />
            </div>
            {CATALOGS.map((c) => {
              const Icon = ICONOS_CATALOGO[c.slug] ?? Shield;
              return (
                <NavLink
                  key={c.slug}
                  to={`/admin/catalogos/${c.slug}`}
                  className={cls}
                  onClick={onCerrar}
                >
                  <Icon size={17} strokeWidth={2.5} /> {c.label}
                </NavLink>
              );
            })}
          </>
        )}
      </aside>
    </>
  );
}
