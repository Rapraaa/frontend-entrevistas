import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../ui/Navbar';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Chip';
import { getCatalogItem, CATALOGS } from '../lib/catalogs';
import { ApiError } from '../lib/api';
import type { CatalogItem } from '../lib/types';

export function PublicCatalogDetail() {
  const { slug = '', id = '' } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState<CatalogItem | null>(null);
  const [error, setError] = useState('');

  const label = CATALOGS.find((c) => c.slug === slug)?.label ?? 'Catálogo';

  useEffect(() => {
    getCatalogItem(slug, id)
      .then(setItem)
      .catch((err) => setError(err instanceof ApiError ? err.message : 'Registro no encontrado'));
  }, [slug, id]);

  return (
    <div className="min-h-screen bg-base">
      <Navbar>
        <Button variante="secundario" onClick={() => navigate('/login')}>INICIAR SESIÓN</Button>
        <Button variante="primario" onClick={() => navigate('/registro')}>REGISTRARSE</Button>
      </Navbar>

      <main className="max-w-2xl mx-auto p-6 flex flex-col gap-6">
        <Link to={`/publico/${slug}`} className="font-mono text-sm text-naranja font-bold">← Volver a {label}</Link>

        {error && <div className="p-3 border-2 border-ink bg-rojo text-ink font-mono font-bold">{error}</div>}

        {item && (
          <Card className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b-2 border-ink pb-3">
              <h1 className="font-mono font-bold text-2xl text-fg">{item.name}</h1>
              <Chip tono={item.isActive === false ? 'rojo' : 'verde'}>
                {item.isActive === false ? 'INACTIVO' : 'ACTIVO'}
              </Chip>
            </div>
            <div>
              <h3 className="font-mono text-xs font-bold uppercase text-muted mb-1">Descripción</h3>
              <p className="font-mono text-sm text-fg">{item.description || 'Sin descripción.'}</p>
            </div>
            <div>
              <h3 className="font-mono text-xs font-bold uppercase text-muted mb-1">ID</h3>
              <p className="font-mono text-xs text-muted break-all">{item.id}</p>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
