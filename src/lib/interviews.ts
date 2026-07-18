import { api } from './api';
import type {
  CatalogItem,
  Interview,
  InterviewConfig,
  Paginated,
} from './types';

export function getCatalog(name: string): Promise<Paginated<CatalogItem>> {
  return api<Paginated<CatalogItem>>(`/catalogs/${name}?limit=100`);
}

export function createInterview(config: InterviewConfig): Promise<Interview> {
  return api<Interview>('/interviews', {
    method: 'POST',
    body: JSON.stringify(config),
  });
}

export function sendMessage(
  id: string,
  content: string,
  codeSnippet?: string,
): Promise<Interview> {
  const body = codeSnippet ? { content, code_snippet: codeSnippet } : { content };
  return api<Interview>(`/interviews/${id}/messages`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function finishInterview(id: string): Promise<Interview> {
  return api<Interview>(`/interviews/${id}/finish`, { method: 'POST' });
}

export function getInterview(id: string): Promise<Interview> {
  return api<Interview>(`/interviews/${id}`);
}

export function getHistory(): Promise<Interview[]> {
  return api<Interview[]>('/interviews');
}
