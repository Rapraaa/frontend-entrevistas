import { useState, type FormEvent } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Chip } from '../ui/Chip';

type Modo = 'login' | 'registro';

export function AuthPage() {
  const [modo, setModo] = useState<Modo>('login');
  const esLogin = modo === 'login';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base p-4 font-mono">
      <div className="w-full max-w-[440px]">
        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div>
                <Chip>{esLogin ? 'BIENVENIDO DE VUELTA' : 'ÚNETE AL SIMULADOR'}</Chip>
              </div>
              <h1 className="text-2xl font-bold uppercase text-fg">
                {esLogin ? 'Iniciar sesión' : 'Crear cuenta'}
              </h1>
              <p className="text-sm text-muted">
                {esLogin
                  ? 'Continúa donde lo dejaste. Tu entrevistadora IA te espera.'
                  : 'Crea tu cuenta y practica antes de tu entrevista real.'}
              </p>
            </div>

            {!esLogin && (
              <label className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase text-fg">Nombre completo</span>
                <Input type="text" placeholder="Ada Lovelace" required />
              </label>
            )}

            <label className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase text-fg">Email</span>
              <Input type="email" placeholder="dev@correo.com" required />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase text-fg">Contraseña</span>
              <Input type="password" placeholder="••••••••" required />
            </label>

            <Button type="submit">{esLogin ? 'Entrar >' : 'Crear cuenta >'}</Button>

            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-muted">
                {esLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              </span>
              <button
                type="button"
                onClick={() => setModo(esLogin ? 'registro' : 'login')}
                className="font-bold uppercase text-naranja"
              >
                {esLogin ? 'Regístrate' : 'Inicia sesión'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
