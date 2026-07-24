import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LogOut, Menu } from 'lucide-react';
import { Sidebar } from '../ui/Sidebar';
import { Footer } from '../ui/Footer';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { Navbar } from '../ui/Navbar';
import { Avatar } from '../ui/Avatar';
import { etiqueta } from '../lib/etiquetas';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAuth } from '../auth/AuthContext';

export function DashboardLayout() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const iniciales = user?.email?.slice(0, 2).toUpperCase() ?? 'US';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-base overflow-hidden">
      <div className="no-print contents">
        <Sidebar abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="no-print">
          <Navbar
            inicio={
              <button
                type="button"
                onClick={() => setMenuAbierto(true)}
                aria-label="Abrir menú de navegación"
                aria-expanded={menuAbierto}
                aria-controls="menu-lateral"
                className="md:hidden flex items-center justify-center w-11 h-11 border-2 border-trazo bg-surface2 text-fg presiona"
              >
                <Menu size={18} strokeWidth={3} />
              </button>
            }
          >
            <span className="font-mono text-xs text-fg hidden lg:inline">{user?.email}</span>
            {user?.role && (
              <Chip tono="lila" className="hidden sm:inline-flex">
                {etiqueta(user.role)}
              </Chip>
            )}
            <Avatar iniciales={iniciales} src={profile?.profilePicture} />
            <ThemeToggle />
            <Button variante="secundario" onClick={handleLogout}>
              <span className="flex items-center gap-2">
                <LogOut size={16} strokeWidth={3} />
                <span className="hidden sm:inline">SALIR</span>
              </span>
            </Button>
          </Navbar>
          <Breadcrumbs />
        </div>

        <main className="flex-1 overflow-auto bg-base patron-puntos">
          <Outlet />
        </main>

        <div className="no-print">
          <Footer />
        </div>
      </div>
    </div>
  );
}
