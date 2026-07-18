import { Navbar } from '../ui/Navbar';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export function Registro() {
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
        <Button variante="primario" onClick={() => window.location.href = '/registro'}>REGISTRARSE</Button>
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
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Nombre" placeholder="Ana" />
              <Input label="Apellido" placeholder="Garcia" />
            </div>
            
            <Input label="Correo electrónico" placeholder="tu@email.com" />
            <Input label="Contraseña" type="password" placeholder="Mínimo 8 caracteres" />
            
            <Select label="Nivel de conocimiento">
              <option value="">Selecciona tu nivel</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
            </Select>

            <Button onClick={() => window.location.href = '/setup'}>
                Crear Cuenta
            </Button>
          </div>
          
          <p className="mt-6 text-center text-sm font-mono text-fg">
            ¿Ya tienes cuenta? <a href="/login" className="text-naranja font-bold">Iniciar sesión</a>
          </p>
        </Card>
      </main>
    </div>
  );
}