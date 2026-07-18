import { useParams, Navigate } from 'react-router-dom';
import { CatalogCrud } from '../../features/admin/CatalogCrud';
import { CATALOGS } from '../../lib/catalogs';

export function CatalogPage() {
  const { slug } = useParams();
  const cat = CATALOGS.find((c) => c.slug === slug);
  if (!cat) return <Navigate to="/dashboard" replace />;
  return <CatalogCrud slug={cat.slug} label={cat.label} />;
}
