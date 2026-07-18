import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../ui/Navbar';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useAuth } from '../auth/AuthContext';
import { ApiError } from '../lib/api';

export function Registro() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nivel, setNivel] = useState('');
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
      await register({ email, password, firstName, lastName });
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
        <Card className="w-full max-w-md border-[3px] border-ink">
          <div className="flex justify-center mb-6">
            <div className="bg-naranja p-3 border-2 border-ink font-mono font-bold text-ink"> _^ </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold font-mono text-fg">Crea tu cuenta</h2>
            <p className="text-muted font-mono text-sm mt-1">Empieza a practicar entrevistas técnicas hoy</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Nombre" placeholder="Ana" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              <Input label="Apellido" placeholder="Garcia" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>

            <Input label="Correo electrónico" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label="Contraseña" type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />

            <Select label="Nivel de conocimiento" value={nivel} onChange={(e) => setNivel(e.target.value)}>
              <option value="">Selecciona tu nivel</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
            </Select>

            {error && (
              <div className="p-3 border-2 border-ink bg-rojo text-ink font-mono text-sm font-bold">
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Cuenta'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm font-mono text-fg">
            ¿Ya tienes cuenta? <Link to="/login" className="text-naranja font-bold">Iniciar sesión</Link>
          </p>
        </Card>
      </main>
    </div>
  );
}
