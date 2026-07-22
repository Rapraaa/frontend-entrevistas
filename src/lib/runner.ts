import type { Lenguaje } from './lenguajes';

export type LogLinea = { tipo: 'log' | 'info' | 'warn' | 'error'; texto: string };
export type Resultado = {
  logs: LogLinea[];
  error?: string;
  timeout?: boolean;
  estado?: string;
  tiempo?: string;
  memoria?: number;
  aviso?: string;
};

const JUDGE0 = 'https://ce.judge0.com';
const LIMITE_MS = 25000;

const FUENTE_WORKER = `
self.onmessage = function (e) {
  var logs = [];
  function fmt(v) {
    if (typeof v === 'string') return v;
    if (v instanceof Error) return v.name + ': ' + v.message;
    try { return JSON.stringify(v); } catch (_) { return String(v); }
  }
  function add(tipo) {
    return function () {
      logs.push({ tipo: tipo, texto: Array.prototype.map.call(arguments, fmt).join(' ') });
    };
  }
  var consola = { log: add('log'), info: add('info'), warn: add('warn'), error: add('error') };
  try {
    var fn = new Function('console', e.data);
    fn(consola);
    self.postMessage({ logs: logs });
  } catch (err) {
    self.postMessage({ logs: logs, error: (err && err.message) ? err.message : String(err) });
  }
};
`;

export function ejecutarLocal(codigo: string, ms = 3000): Promise<Resultado> {
  return new Promise((resolve) => {
    let url = '';
    let worker: Worker;
    try {
      const blob = new Blob([FUENTE_WORKER], { type: 'application/javascript' });
      url = URL.createObjectURL(blob);
      worker = new Worker(url);
    } catch {
      resolve({ logs: [], error: 'Tu navegador no permite ejecutar código aquí.' });
      return;
    }

    const limpiar = () => {
      worker.terminate();
      if (url) URL.revokeObjectURL(url);
    };
    const temporizador = setTimeout(() => {
      limpiar();
      resolve({ logs: [], timeout: true });
    }, ms);

    worker.onmessage = (e: MessageEvent<Resultado>) => {
      clearTimeout(temporizador);
      limpiar();
      resolve(e.data);
    };
    worker.onerror = (e) => {
      clearTimeout(temporizador);
      limpiar();
      resolve({ logs: [], error: e.message || 'Error al ejecutar el código.' });
    };
    worker.postMessage(codigo);
  });
}

type RespuestaJudge0 = {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  time: string | null;
  memory: number | null;
  status?: { id: number; description: string };
};

const aLineas = (texto: string | null, tipo: LogLinea['tipo']): LogLinea[] =>
  (texto ?? '')
    .split('\n')
    .filter((l) => l.trim() !== '')
    .map((texto) => ({ tipo, texto }));

async function ejecutarRemoto(codigo: string, languageId: number): Promise<Resultado> {
  const control = new AbortController();
  const temporizador = setTimeout(() => control.abort(), LIMITE_MS);

  try {
    const res = await fetch(`${JUDGE0}/submissions?base64_encoded=false&wait=true`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source_code: codigo, language_id: languageId }),
      signal: control.signal,
    });
    if (!res.ok) throw new Error(`El servicio respondió ${res.status}`);

    const data: RespuestaJudge0 = await res.json();
    const logs = [
      ...aLineas(data.compile_output, 'error'),
      ...aLineas(data.stdout, 'log'),
      ...aLineas(data.stderr, 'error'),
    ];
    const estado = data.status?.description;

    return {
      logs,
      estado,
      tiempo: data.time ?? undefined,
      memoria: data.memory ?? undefined,
      error: estado && estado !== 'Accepted' && logs.length === 0 ? estado : undefined,
    };
  } finally {
    clearTimeout(temporizador);
  }
}

export async function ejecutar(codigo: string, lenguaje: Lenguaje): Promise<Resultado> {
  try {
    return await ejecutarRemoto(codigo, lenguaje.judge0Id);
  } catch {
    if (lenguaje.id === 'javascript') {
      const local = await ejecutarLocal(codigo);
      return { ...local, aviso: 'Ejecutado localmente: el servicio remoto no respondió.' };
    }
    return {
      logs: [],
      error: 'No se pudo ejecutar: el servicio de ejecución no está disponible ahora mismo.',
    };
  }
}
