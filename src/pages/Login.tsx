import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../ui/Navbar';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '../auth/AuthContext';
import { ApiError } from '../lib/api';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

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
    <div className="min-h-screen bg-base">
      <Navbar>
        <button onClick={toggleTheme} className="px-3 border-2 border-ink bg-surface2"> ☀︎ </button>
        <Link to="/login" className="font-mono font-bold text-fg">INICIAR SESIÓN</Link>
        <Button variante="primario" onClick={() => navigate('/registro')}>REGISTRARSE</Button>
      </Navbar>

      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <Card className="w-full max-w-sm border-[3px] border-ink">
          <div className="flex justify-center mb-6">
            <div className="bg-naranja p-3 border-2 border-ink font-mono font-bold text-ink"> _^ </div>
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

          <p className="mt-6 text-center text-sm font-mono text-fg">
            ¿No tienes cuenta? <Link to="/registro" className="text-naranja font-bold">Registrate gratis</Link>
          </p>
        </Card>
      </main>
    </div>
  );
}
