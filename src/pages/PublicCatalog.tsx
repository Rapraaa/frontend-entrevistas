import { useState, useEffect, useCallback, type FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../ui/Navbar';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Chip';
import { listCatalog, CATALOGS } from '../lib/catalogs';
import { ApiError } from '../lib/api';
import { useAuth } from '../auth/AuthContext';
import { ThemeToggle } from '../ui/ThemeToggle';
import type { CatalogItem } from '../lib/types';

const LIMIT = 9;

export function PublicCatalog() {
  const { slug = 'roles' } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [items, setItems] = useState<CatalogItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const label = CATALOGS.find((c) => c.slug === slug)?.label ?? 'Catálogo';

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await listCatalog(slug, { page, limit: LIMIT, search, sort: 'name', order });
      setItems(res.data);
      setTotalPages(res.meta.totalPages);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Error al cargar el catálogo');
    } finally {
      setLoading(false);
    }
  }, [slug, page, search, order]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); setSearch(''); setSearchInput(''); }, [slug]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  return (
    <div className="min-h-screen bg-base">
      <Navbar>
        <ThemeToggle />
        {isAuthenticated ? (
          <Button variante="primario" onClick={() => navigate('/dashboard')}>IR AL DASHBOARD</Button>
        ) : (
          <>
            <Button variante="secundario" onClick={() => navigate('/login')}>INICIAR SESIÓN</Button>
            <Button variante="primario" onClick={() => navigate('/registro')}>REGISTRARSE</Button>
          </>
        )}
      </Navbar>

      <main className="max-w-5xl mx-auto p-6 flex flex-col gap-6">
        <div className="border-b-2 border-trazo pb-4">
          <h1 className="font-mono font-bold text-3xl text-fg uppercase">{label}</h1>
          <p className="font-mono text-sm text-muted">Información pública del sistema.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {CATALOGS.map((c) => (
            <Link
              key={c.slug}
              to={`/publico/${c.slug}`}
              aria-current={c.slug === slug ? 'page' : undefined}
              className="inline-flex min-h-[44px] items-center"
            >
              <Chip
                tono={c.slug === slug ? 'lila' : 'neutro'}
                className={`px-3 py-2 ${c.slug === slug ? 'shadow-brutal' : ''}`}
              >
                {c.label}
              </Chip>
            </Link>
          ))}
        </div>

        <form onSubmit={onSearch} className="flex gap-2 items-end">
          <div className="flex-1">
            <Input label="Buscar" placeholder="Buscar por nombre..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          </div>
          <Button type="submit" variante="secundario">BUSCAR</Button>
          <Button type="button" variante="secundario" onClick={() => setOrder((o) => (o === 'ASC' ? 'DESC' : 'ASC'))}>
            NOMBRE {order === 'ASC' ? '↑' : '↓'}
          </Button>
        </form>

        {error && <div className="p-3 border-2 border-trazo bg-rojo text-ink font-mono font-bold">{error}</div>}

        {loading ? (
          <p className="font-mono text-muted">Cargando_</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {items.map((item) => (
              <Link key={item.id} to={`/publico/${slug}/${item.id}`}>
                <Card className="h-full hover:bg-surface2 transition-colors">
                  <h2 className="font-mono font-bold text-lg text-fg mb-2">{item.name}</h2>
                  <p className="font-mono text-sm text-muted line-clamp-3">{item.description || 'Sin descripción.'}</p>
                </Card>
              </Link>
            ))}
            {items.length === 0 && <p className="font-mono text-muted">Sin resultados.</p>}
          </div>
        )}

        <div className="flex items-center justify-between font-mono text-sm">
          <Button variante="secundario" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>← ANTERIOR</Button>
          <span className="text-muted">Página {page} de {totalPages}</span>
          <Button variante="secundario" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>SIGUIENTE →</Button>
        </div>
      </main>
    </div>
  );
}
