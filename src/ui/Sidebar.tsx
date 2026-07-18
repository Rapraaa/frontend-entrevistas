import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { CATALOGS } from '../lib/catalogs';

export function Sidebar() {
  const { isAdmin } = useAuth();

  const base = 'block px-4 py-2 font-mono text-sm border-2 border-transparent';
  const activo = 'bg-naranja text-ink border-ink font-bold';
  const inactivo = 'text-fg hover:bg-surface2';
  const cls = ({ isActive }: { isActive: boolean }) =>
    `${base} ${isActive ? activo : inactivo}`;

  return (
    <aside className="w-60 shrink-0 bg-surface border-r-[3px] border-ink flex flex-col gap-1 p-3 overflow-y-auto">
      <p className="font-mono font-bold text-xs text-muted uppercase px-4 py-2">Menú</p>
      <NavLink to="/dashboard" className={cls}>Dashboard</NavLink>
      <NavLink to="/setup" className={cls}>Nueva simulación</NavLink>
      <NavLink to="/perfil" className={cls}>Mi perfil</NavLink>
      <NavLink to="/publico/roles" className={cls}>Catálogo público</NavLink>

      {isAdmin && (
        <>
          <p className="font-mono font-bold text-xs text-muted uppercase px-4 py-2 mt-4">Administración</p>
          {CATALOGS.map((c) => (
            <NavLink key={c.slug} to={`/admin/catalogos/${c.slug}`} className={cls}>
              {c.label}
            </NavLink>
          ))}
        </>
      )}
    </aside>
  );
}
