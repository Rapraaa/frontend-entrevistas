import { http } from './api';
import type { CatalogItem, Paginated } from './types';

export type CatalogQuery = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'ASC' | 'DESC';
};

export type CatalogInput = {
  name: string;
  description?: string;
  isActive?: boolean;
};

export const CATALOGS = [
  { slug: 'roles', label: 'Roles' },
  { slug: 'interview-types', label: 'Tipos de entrevista' },
  { slug: 'seniority-levels', label: 'Niveles de seniority' },
  { slug: 'job-roles', label: 'Roles objetivo' },
  { slug: 'difficulty-levels', label: 'Dificultades' },
  { slug: 'companies', label: 'Empresas' },
] as const;

export type Tecnologia = {
  id: string;
  name: string;
  isActive?: boolean;
};

export async function listTechnologies(): Promise<Paginated<Tecnologia>> {
  const { data } = await http.get('/technologies', { params: { limit: 100 } });
  return data;
}

export async function listCatalog(
  name: string,
  query: CatalogQuery = {},
): Promise<Paginated<CatalogItem>> {
  const { data } = await http.get(`/catalogs/${name}`, { params: query });
  return data;
}

export async function getCatalogItem(name: string, id: string): Promise<CatalogItem> {
  const { data } = await http.get(`/catalogs/${name}/${id}`);
  return data;
}

export async function createCatalogItem(
  name: string,
  input: CatalogInput,
): Promise<CatalogItem> {
  const { data } = await http.post(`/catalogs/${name}`, input);
  return data;
}

export async function updateCatalogItem(
  name: string,
  id: string,
  input: CatalogInput,
): Promise<CatalogItem> {
  const { data } = await http.patch(`/catalogs/${name}/${id}`, input);
  return data;
}

export async function deleteCatalogItem(name: string, id: string): Promise<void> {
  await http.delete(`/catalogs/${name}/${id}`);
}
