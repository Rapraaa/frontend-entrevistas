import { useState, useEffect, useCallback, type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Chip } from '../../ui/Chip';
import { Modal } from '../../ui/Modal';
import { useAuth } from '../../auth/AuthContext';
import { useNotify } from '../../contexts/NotificationContext';
import { ApiError } from '../../lib/api';
import {
  listCatalog,
  createCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
} from '../../lib/catalogs';
import type { CatalogItem } from '../../lib/types';

const schema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100, 'Máximo 100 caracteres'),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

type Props = {
  slug: string;
  label: string;
};

const LIMIT = 8;

export function CatalogCrud({ slug, label }: Props) {
  const { isAdmin } = useAuth();
  const notify = useNotify();

  const [items, setItems] = useState<CatalogItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [loading, setLoading] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<CatalogItem | null>(null);
  const [deleting, setDeleting] = useState<CatalogItem | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listCatalog(slug, { page, limit: LIMIT, search, sort: 'name', order });
      setItems(res.data);
      setTotalPages(res.meta.totalPages);
    } catch (err) {
      notify('error', err instanceof ApiError ? err.message : 'Error al cargar');
    } finally {
      setLoading(false);
    }
  }, [slug, page, search, order, notify]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setPage(1);
    setSearch('');
    setSearchInput('');
  }, [slug]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const openCreate = () => {
    setEditing(null);
    reset({ name: '', description: '', isActive: true });
    setFormOpen(true);
  };

  const openEdit = (item: CatalogItem) => {
    setEditing(item);
    reset({
      name: item.name,
      description: item.description ?? '',
      isActive: item.isActive ?? true,
    });
    setFormOpen(true);
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (editing) {
        await updateCatalogItem(slug, editing.id, data);
        notify('success', 'Registro actualizado');
      } else {
        await createCatalogItem(slug, data);
        notify('success', 'Registro creado');
      }
      setFormOpen(false);
      load();
    } catch (err) {
      notify('error', err instanceof ApiError ? err.message : 'Error al guardar');
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      await deleteCatalogItem(slug, deleting.id);
      notify('success', 'Registro eliminado');
      setDeleting(null);
      load();
    } catch (err) {
      notify('error', err instanceof ApiError ? err.message : 'Error al eliminar');
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto p-6 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-2 border-ink pb-4">
        <div>
          <h1 className="font-mono font-bold text-3xl text-fg uppercase">{label}</h1>
          <p className="font-mono text-sm text-muted">Gestión del catálogo.</p>
        </div>
        {isAdmin && (
          <Button variante="primario" onClick={openCreate}>NUEVO</Button>
        )}
      </div>

      <form onSubmit={onSearch} className="flex gap-2 items-end">
        <div className="flex-1">
          <Input
            label="Buscar"
            placeholder="Buscar por nombre..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <Button type="submit" variante="secundario">BUSCAR</Button>
        <Button
          type="button"
          variante="secundario"
          onClick={() => setOrder((o) => (o === 'ASC' ? 'DESC' : 'ASC'))}
        >
          NOMBRE {order === 'ASC' ? '↑' : '↓'}
        </Button>
      </form>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-sm">
            <thead>
              <tr className="bg-surface2 border-b-2 border-ink text-left">
                <th className="p-3 font-bold text-fg">Nombre</th>
                <th className="p-3 font-bold text-fg">Descripción</th>
                <th className="p-3 font-bold text-fg">Estado</th>
                {isAdmin && <th className="p-3 font-bold text-fg text-right">Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="p-6 text-center text-muted">Cargando_</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={4} className="p-6 text-center text-muted">Sin registros.</td></tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="border-b border-ink/20">
                    <td className="p-3 text-fg font-bold">{item.name}</td>
                    <td className="p-3 text-muted">{item.description || '—'}</td>
                    <td className="p-3">
                      <Chip tono={item.isActive === false ? 'rojo' : 'verde'}>
                        {item.isActive === false ? 'INACTIVO' : 'ACTIVO'}
                      </Chip>
                    </td>
                    {isAdmin && (
                      <td className="p-3">
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => openEdit(item)} className="font-bold text-naranja underline">Editar</button>
                          <button onClick={() => setDeleting(item)} className="font-bold text-rojo underline">Eliminar</button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex items-center justify-between font-mono text-sm">
        <Button
          variante="secundario"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
        >
          ← ANTERIOR
        </Button>
        <span className="text-muted">Página {page} de {totalPages}</span>
        <Button
          variante="secundario"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
        >
          SIGUIENTE →
        </Button>
      </div>

      <Modal isOpen={formOpen} onClose={() => setFormOpen(false)} title={editing ? 'Editar registro' : 'Nuevo registro'}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input label="Nombre" placeholder="Nombre del ítem" error={errors.name?.message} {...register('name')} />
          <Input label="Descripción" placeholder="Descripción (opcional)" {...register('description')} />
          <label className="flex items-center gap-2 font-mono text-sm text-fg">
            <input type="checkbox" {...register('isActive')} className="w-4 h-4 border-2 border-ink" />
            Activo
          </label>
          <div className="flex justify-end gap-2">
            <Button type="button" variante="secundario" onClick={() => setFormOpen(false)}>CANCELAR</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'GUARDANDO...' : 'GUARDAR'}</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleting} onClose={() => setDeleting(null)} title="Confirmar eliminación">
        <p className="font-mono text-sm text-fg mb-6">
          ¿Seguro que quieres eliminar <b>{deleting?.name}</b>? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-2">
          <Button variante="secundario" onClick={() => setDeleting(null)}>CANCELAR</Button>
          <Button variante="primario" onClick={confirmDelete}>ELIMINAR</Button>
        </div>
      </Modal>
    </div>
  );
}
