import { http } from './api';
import type { CatalogItem, Interview, InterviewConfig, Paginated } from './types';

export async function getCatalog(name: string): Promise<Paginated<CatalogItem>> {
  const { data } = await http.get(`/catalogs/${name}`, { params: { limit: 100 } });
  return data;
}

export async function createInterview(config: InterviewConfig): Promise<Interview> {
  const { data } = await http.post('/interviews', config);
  return data;
}

export async function sendMessage(
  id: string,
  content: string,
  codeSnippet?: string,
): Promise<Interview> {
  const body = codeSnippet ? { content, code_snippet: codeSnippet } : { content };
  const { data } = await http.post(`/interviews/${id}/messages`, body);
  return data;
}

export async function finishInterview(id: string): Promise<Interview> {
  const { data } = await http.post(`/interviews/${id}/finish`);
  return data;
}

export async function getInterview(id: string): Promise<Interview> {
  const { data } = await http.get(`/interviews/${id}`);
  return data;
}

export async function getHistory(): Promise<Interview[]> {
  const { data } = await http.get('/interviews');
  return data;
}
