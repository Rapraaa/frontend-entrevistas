const TRADUCCIONES: Record<string, string> = {
  technical: 'Técnica',
  theoretical: 'Teórica',
  behavioral: 'Comportamental',
  mixed: 'Mixta',
  frontend: 'Frontend Developer',
  backend: 'Backend Developer',
  fullstack: 'Fullstack Developer',
  mobile: 'Mobile Developer',
  devops: 'DevOps',
  data: 'Data Engineer',
  qa: 'QA Engineer',
  trainee: 'Trainee',
  junior: 'Junior',
  mid: 'Mid',
  ssr: 'Semi Senior',
  semisenior: 'Semi Senior',
  senior: 'Senior',
  lead: 'Tech Lead',
  easy: 'Fácil',
  medium: 'Media',
  hard: 'Difícil',
  admin: 'Administrador',
  user: 'Usuario',
};

export function etiqueta(valor: string | null | undefined): string {
  if (!valor) return '';
  const clave = valor.trim().toLowerCase().replace(/[\s_-]+/g, '');
  const directa = TRADUCCIONES[valor.trim().toLowerCase()] ?? TRADUCCIONES[clave];
  if (directa) return directa;
  return valor.charAt(0).toUpperCase() + valor.slice(1);
}
