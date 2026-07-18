import { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Chip';
import { Avatar } from '../ui/Avatar';
import { useAuth } from '../auth/AuthContext';
import { getUser, type UserProfile } from '../lib/users';

function nombreRol(r: UserProfile['role']): string {
  if (!r) return '—';
  return typeof r === 'string' ? r : (r.name ?? '—');
}

export function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    getUser(user.id).then(setProfile).catch(() => setProfile(null));
  }, [user?.id]);

  const iniciales = user?.email?.slice(0, 2).toUpperCase() ?? 'US';
  const nombre = profile
    ? [profile.firstName, profile.lastName].filter(Boolean).join(' ')
    : '';

  return (
    <div className="max-w-2xl w-full mx-auto p-6 flex flex-col gap-6">
      <div className="border-b-2 border-ink pb-4">
        <h1 className="font-mono font-bold text-3xl text-fg uppercase">Mi Perfil</h1>
      </div>

      <Card className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Avatar iniciales={iniciales} />
          <div>
            <p className="font-mono font-bold text-xl text-fg">{nombre || user?.email}</p>
            <Chip tono="lila">{(user?.role ?? 'usuario').toUpperCase()}</Chip>
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
