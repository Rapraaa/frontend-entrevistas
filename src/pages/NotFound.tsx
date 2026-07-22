import { useNavigate } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Navbar } from '../ui/Navbar';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAuth } from '../auth/AuthContext';

export function NotFound() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-base patron-puntos flex flex-col">
      <Navbar>
        <ThemeToggle />
      </Navbar>

      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-lg flex flex-col items-center text-center gap-5 p-10">
          <div className="border-[3px] border-ink bg-naranja shadow-brutal p-5">
            <Compass size={40} strokeWidth={2.5} className="text-ink" />
          </div>
          <div>
            <p className="font-mono font-bold text-6xl text-fg leading-none">404</p>
            <h1 className="font-mono font-bold text-xl text-fg uppercase mt-3">
              Página no encontrada
            </h1>
          </div>
          <p className="font-mono text-sm text-muted">
            La dirección que buscas no existe o fue movida.
          </p>
          <Button
            variante="primario"
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}
          >
            <span className="flex items-center gap-2">
              <ArrowLeft size={18} strokeWidth={3} />
              {isAuthenticated ? 'VOLVER AL DASHBOARD' : 'VOLVER AL INICIO'}
            </span>
          </Button>
        </Card>
      </main>
    </div>
  );
}
