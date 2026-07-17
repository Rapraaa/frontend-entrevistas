import { Navbar } from '../ui/Navbar';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export function Login() {
  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-base">
      <Navbar>
        <button onClick={toggleTheme} className="px-3 border-2 border-ink bg-surface2"> ☀︎ </button>
        <a href="/login" className="font-mono font-bold text-fg">INICIAR SESIÓN</a>
        <Button variante="primario" onClick={() => window.location.href = '/setup'}>REGISTRARSE</Button>
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

          <div className="space-y-4">
            <Input label="Correo electrónico" placeholder="tu@email.com" />
            <Input label="Contraseña" type="password" placeholder="********" />
            
            <Button onClick={() => window.location.href = '/setup'}>
                Iniciar Sesión
            </Button>

          </div>

          <p className="mt-6 text-center text-sm font-mono text-fg">
            ¿No tienes cuenta? <a href="/setup" className="text-naranja font-bold">Registrate gratis</a>
          </p>
        </Card>
      </main>
    </div>
  );
}