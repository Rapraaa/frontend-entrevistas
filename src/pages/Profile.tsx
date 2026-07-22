import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { useAuth } from '../auth/AuthContext';
import { useNotify } from '../contexts/NotificationContext';
import { getUser, updateUser, type UserProfile } from '../lib/users';
import { ApiError } from '../lib/api';

const MAX_BYTES = 500 * 1024;

function nombreRol(r: UserProfile['role']): string {
  if (!r) return '—';
  return typeof r === 'string' ? r : (r.name ?? '—');
}

export function Profile() {
  const { user, refreshProfile } = useAuth();
  const notify = useNotify();
  const inputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [subiendo, setSubiendo] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    getUser(user.id).then(setProfile).catch(() => setProfile(null));
  }, [user?.id]);

  const iniciales = user?.email?.slice(0, 2).toUpperCase() ?? 'US';
  const nombre = profile
    ? [profile.firstName, profile.lastName].filter(Boolean).join(' ')
    : '';

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !user?.id) return;
    if (!file.type.startsWith('image/')) {
      notify('error', 'El archivo debe ser una imagen');
      return;
    }
    if (file.size > MAX_BYTES) {
      notify('error', 'La imagen no debe superar 500 KB');
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        setSubiendo(true);
        const updated = await updateUser(user.id, { profilePicture: reader.result as string });
        setProfile(updated);
        await refreshProfile(); // así el avatar de la barra superior también cambia
        notify('success', 'Foto de perfil actualizada');
      } catch (err) {
        notify('error', err instanceof ApiError ? err.message : 'Error al subir la foto');
      } finally {
        setSubiendo(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-2xl w-full mx-auto p-6 flex flex-col gap-6">
      <div>
        <h1 className="font-mono font-bold text-4xl text-fg uppercase leading-none">Mi perfil</h1>
        <div className="h-1.5 w-24 bg-naranja border-2 border-ink mt-2" />
      </div>

      <Card className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Avatar iniciales={iniciales} src={profile?.profilePicture} size={80} />
          <div className="flex flex-col gap-2">
            <p className="font-mono font-bold text-xl text-fg">{nombre || user?.email}</p>
            <Chip tono="lila">{(user?.role ?? 'usuario').toUpperCase()}</Chip>
            <div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFile}
              />
              <Button variante="secundario" disabled={subiendo} onClick={() => inputRef.current?.click()}>
                {subiendo ? 'SUBIENDO...' : 'CAMBIAR FOTO'}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <h3 className="font-mono text-xs font-bold uppercase text-muted mb-1">Correo</h3>
            <p className="font-mono text-sm text-fg">{profile?.email ?? user?.email ?? '—'}</p>
          </div>
          {nombre && (
            <div>
              <h3 className="font-mono text-xs font-bold uppercase text-muted mb-1">Nombre</h3>
              <p className="font-mono text-sm text-fg">{nombre}</p>
            </div>
          )}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase text-muted mb-1">Rol</h3>
            <p className="font-mono text-sm text-fg">{profile ? nombreRol(profile.role) : (user?.role ?? '—')}</p>
          </div>
          <div>
            <h3 className="font-mono text-xs font-bold uppercase text-muted mb-1">ID de usuario</h3>
            <p className="font-mono text-xs text-muted break-all">{user?.id ?? '—'}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
