import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '../ui/Sidebar';
import { Footer } from '../ui/Footer';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { Navbar } from '../ui/Navbar';
import { Avatar } from '../ui/Avatar';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';
import { useAuth } from '../auth/AuthContext';

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const iniciales = user?.email?.slice(0, 2).toUpperCase() ?? 'US';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-base overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar>
          <span className="font-mono text-xs text-fg hidden md:inline">{user?.email}</span>
          {user?.role && <Chip tono="lila">{user.role.toUpperCase()}</Chip>}
          <Avatar iniciales={iniciales} />
          <Button variante="secundario" onClick={handleLogout}>SALIR</Button>
        </Navbar>
        <Breadcrumbs />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
