import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../ui/Navbar';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useAuth } from '../auth/AuthContext';
import { ApiError, API_BASE_URL } from '../lib/api';
import { getCatalog } from '../lib/interviews';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Logo } from '../ui/Logo';

const NIVELES_POR_DEFECTO = ['Junior', 'Mid', 'Senior'];

export function Registro() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nivel, setNivel] = useState('');
  const [niveles, setNiveles] = useState<string[]>(NIVELES_POR_DEFECTO);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCatalog('seniority-levels')
      .then((res) => {
        if (res.data.length) setNiveles(res.data.map((c) => c.name));
      })
      .catch(() => setNiveles(NIVELES_POR_DEFECTO));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({
        email,
        password,
        firstName,
        lastName,
        ...(nivel ? { seniorityLevel: nivel } : {}),
      });
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
          to="/login"
          className="hidden sm:inline font-mono font-bold text-fg px-2 py-3 hover:text-acento"
        >
          INICIAR SESIÓN
        </Link>
        <Button variante="primario" onClick={() => navigate('/login')}>
          ENTRAR
        </Button>
      </Navbar>

      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 sm:p-6">
        <Card className="w-full max-w-md border-[3px] border-trazo p-6">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold font-mono text-fg uppercase">Crea tu cuenta</h1>
            <p className="text-muted font-mono text-sm mt-1">
              Empieza a practicar entrevistas técnicas hoy
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nombre"
                placeholder="Ana"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <Input
                label="Apellido"
                placeholder="Garcia"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

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
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />

            <Select
              label="Nivel de conocimiento"
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
            >
              <option value="">Prefiero no decirlo</option>
              {niveles.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </Select>

            {error && (
              <div
                role="alert"
                className="p-3 border-2 border-trazo bg-rojo text-ink font-mono text-sm font-bold"
              >
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Cuenta'}
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
              onClick={() => {
                window.location.href = `${API_BASE_URL}/auth/google`;
              }}
            >
              Continuar con Google
            </Button>
          </div>

          <p className="mt-6 text-center text-sm font-mono text-fg">
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/login"
              className="inline-flex min-h-[44px] items-center text-acento font-bold underline underline-offset-4"
            >
              Iniciar sesión
            </Link>
          </p>
        </Card>
      </main>
    </div>
  );
}
