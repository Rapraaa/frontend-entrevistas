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
        <Link to="/login" className="font-mono font-bold text-fg">INICIAR SESIÓN</Link>
        <Button variante="primario" onClick={() => navigate('/registro')}>REGISTRARSE</Button>
      </Navbar>

      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <Card className="w-full max-w-sm border-[3px] border-ink">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold font-mono uppercase text-fg">Bienvenido de vuelta</h2>
            <p className="text-naranja font-mono text-sm mt-1">Inicia sesión en tu cuenta</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Correo electrónico"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Contraseña"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <div className="p-3 border-2 border-ink bg-rojo text-ink font-mono text-sm font-bold">
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading}>
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
              onClick={() => { window.location.href = `${API_BASE_URL}/auth/google`; }}
            >
              Continuar con Google
            </Button>
          </div>

          <p className="mt-6 text-center text-sm font-mono text-fg">
            ¿No tienes cuenta? <Link to="/registro" className="text-naranja font-bold">Registrate gratis</Link>
          </p>
        </Card>
      </main>
    </div>
  );
}
