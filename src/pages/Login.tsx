import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../ui/Navbar';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '../auth/AuthContext';
import { ApiError, API_BASE_URL } from '../lib/api';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Logo } from '../ui/Logo';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base patron-puntos">
      <Navbar>
        <ThemeToggle />
        <Link
          to="/registro"
          className="hidden sm:inline font-mono font-bold text-fg px-2 py-3 hover:text-acento"
        >
          REGISTRARSE
        </Link>
        <Button variante="primario" onClick={() => navigate('/registro')}>CREAR CUENTA</Button>
      </Navbar>

      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 sm:p-6">
        <Card className="w-full max-w-md border-[3px] border-trazo p-6">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold font-mono uppercase text-fg">Bienvenido de vuelta</h1>
            <p className="text-acento font-mono text-sm mt-1">Inicia sesión en tu cuenta</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Correo electrónico"
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Contraseña"
              type="password"
              placeholder="********"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <div role="alert" className="p-3 border-2 border-trazo bg-rojo text-ink font-mono text-sm font-bold">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 h-0.5 bg-fg/20" />
            <span className="font-mono text-xs text-muted">O</span>
            <div className="flex-1 h-0.5 bg-fg/20" />
          </div>
          <div className="mt-4">
            <Button
              variante="secundario"
              type="button"
              className="w-full"
              onClick={() => { window.location.href = `${API_BASE_URL}/auth/google`; }}
            >
              Continuar con Google
            </Button>
          </div>

          <p className="mt-6 text-center text-sm font-mono text-fg">
            ¿No tienes cuenta? <Link to="/registro" className="inline-flex min-h-[44px] items-center text-acento font-bold underline underline-offset-4">Registrate gratis</Link>
          </p>
        </Card>
      </main>
    </div>
  );
}
