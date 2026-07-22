import { useState, useRef, type KeyboardEvent, type UIEvent } from 'react';
import { FileCode2, NotebookPen, Send, Play, Terminal, X, Loader2 } from 'lucide-react';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';
import { ejecutar, type Resultado } from '../lib/runner';
import { LENGUAJES, type Lenguaje } from '../lib/lenguajes';

type Tab = 'solucion' | 'notas';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  sending: boolean;
  lenguaje: Lenguaje;
  onLenguajeChange: (id: string) => void;
};

const COLOR_LOG: Record<string, string> = {
  log: 'text-papel',
  info: 'text-lila',
  warn: 'text-naranja',
  error: 'text-rojo',
};

export function EditorPanel({
  value,
  onChange,
  onSubmit,
  sending,
  lenguaje,
  onLenguajeChange,
}: Props) {
  const [tab, setTab] = useState<Tab>('solucion');
  const [notas, setNotas] = useState('');
  const [salida, setSalida] = useState<Resultado | null>(null);
  const [corriendo, setCorriendo] = useState(false);
  const [consola, setConsola] = useState(false);

  const gutterRef = useRef<HTMLDivElement>(null);

  const esSolucion = tab === 'solucion';
  const contenido = esSolucion ? value : notas;
  const setContenido = esSolucion ? onChange : setNotas;
  const lineas = contenido.split('\n').length;

  const sincronizarScroll = (e: UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) gutterRef.current.scrollTop = e.currentTarget.scrollTop;
  };

  const manejarTab = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const area = e.currentTarget;
    const inicio = area.selectionStart;
    const fin = area.selectionEnd;
    setContenido(contenido.slice(0, inicio) + '  ' + contenido.slice(fin));
    requestAnimationFrame(() => {
      area.selectionStart = area.selectionEnd = inicio + 2;
    });
  };

  const correr = async () => {
    setCorriendo(true);
    setConsola(true);
    setSalida(null);
    setSalida(await ejecutar(value, lenguaje));
    setCorriendo(false);
  };

  const tabCls = (activa: boolean) =>
    `flex items-center gap-2 px-4 py-3 border-r-2 border-ink font-mono text-sm transition-colors ${
      activa ? 'bg-surface text-fg font-bold' : 'bg-surface2 text-muted hover:text-fg'
    }`;

  return (
    <div className="flex flex-col flex-1 h-full bg-surface border-[3px] border-ink shadow-brutal overflow-hidden">
      <div className="flex items-center bg-surface2 border-b-[3px] border-ink">
        <button type="button" onClick={() => setTab('solucion')} className={tabCls(esSolucion)}>
          <FileCode2 size={15} strokeWidth={2.5} /> solucion.{lenguaje.extension}
        </button>
        <button type="button" onClick={() => setTab('notas')} className={tabCls(!esSolucion)}>
          <NotebookPen size={15} strokeWidth={2.5} /> notas.md
        </button>
        <div className="flex-1" />
        <span className="px-3 font-mono text-[11px] text-muted hidden lg:inline">
          {lineas} {lineas === 1 ? 'línea' : 'líneas'}
        </span>
        <select
          value={lenguaje.id}
          onChange={(e) => onLenguajeChange(e.target.value)}
          aria-label="Lenguaje del editor"
          title="Lenguaje de la solución"
          className="mr-2 bg-surface border-2 border-ink px-2 py-1 font-mono text-[11px] font-bold text-fg cursor-pointer focus:outline-none"
        >
          {LENGUAJES.map((l) => (
            <option key={l.id} value={l.id}>{l.nombre}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 flex bg-base overflow-hidden min-h-0">
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="shrink-0 overflow-hidden select-none border-r-2 border-ink/30 bg-surface2 px-2 py-4 font-mono text-sm leading-6 text-muted text-right"
        >
          {Array.from({ length: lineas }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          onScroll={sincronizarScroll}
          onKeyDown={manejarTab}
          spellCheck={false}
          aria-label={esSolucion ? 'Editor de solución' : 'Bloc de notas'}
          placeholder={
            esSolucion
              ? `${lenguaje.comentario} Escribe tu solución en ${lenguaje.nombre} y pulsa EJECUTAR para probarla.`
              : '# Notas personales (no se envían a la IA)'
          }
          className="flex-1 resize-none bg-base p-4 font-mono text-sm leading-6 text-fg placeholder:text-muted focus:outline-none"
        />
      </div>

      {consola && (
        <div className="shrink-0 border-t-[3px] border-ink bg-ink text-papel h-44 flex flex-col">
          <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-papel/20">
            <Terminal size={14} strokeWidth={3} />
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest">Consola</span>
            <span className="font-mono text-[11px] text-papel/50">{lenguaje.nombre}</span>
            <div className="flex-1" />
            {!corriendo && salida?.estado && (
              <span
                className={`font-mono text-[11px] font-bold ${
                  salida.estado === 'Accepted' ? 'text-verde' : 'text-naranja'
                }`}
              >
                {salida.estado}
              </span>
            )}
            {!corriendo && salida?.tiempo && (
              <span className="font-mono text-[11px] text-papel/50 hidden md:inline">
                {salida.tiempo}s · {salida.memoria ?? 0} KB
              </span>
            )}
            <button
              type="button"
              onClick={() => setConsola(false)}
              aria-label="Cerrar consola"
              className="hover:text-naranja"
            >
              <X size={15} strokeWidth={3} />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-3 font-mono text-xs leading-5 space-y-1">
            {corriendo && <p className="text-papel/60">Ejecutando en {lenguaje.nombre}_</p>}

            {!corriendo && salida?.aviso && (
              <p className="text-naranja">⚠ {salida.aviso}</p>
            )}

            {!corriendo && salida?.timeout && (
              <p className="text-rojo">
                ⏱ Tiempo excedido (3s). ¿Un bucle infinito? La ejecución fue detenida.
              </p>
            )}

            {!corriendo &&
              salida?.logs.map((l, i) => (
                <p key={i} className={COLOR_LOG[l.tipo] ?? 'text-papel'}>
                  <span className="text-papel/40 select-none">&gt; </span>
                  {l.texto}
                </p>
              ))}

            {!corriendo && salida?.error && (
              <p className="text-rojo">✕ {salida.error}</p>
            )}

            {!corriendo &&
              salida &&
              !salida.error &&
              !salida.timeout &&
              salida.logs.length === 0 && (
                <p className="text-papel/50">Sin salida. (Usa console.log para imprimir)</p>
              )}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 border-t-[3px] border-ink p-3">
        {esSolucion ? (
          <Chip tono="verde">SE ENVÍA</Chip>
        ) : (
          <Chip tono="lila">SOLO PARA TI</Chip>
        )}
        <div className="flex-1" />
        <Button variante="secundario" onClick={correr} disabled={corriendo || !esSolucion}>
          <span className="flex items-center gap-2">
            {corriendo ? (
              <Loader2 size={15} strokeWidth={3} className="animate-spin" />
            ) : (
              <Play size={15} strokeWidth={3} />
            )}
            EJECUTAR
          </span>
        </Button>
        <Button onClick={onSubmit} disabled={sending}>
          <span className="flex items-center gap-2">
            <Send size={15} strokeWidth={3} /> ENVIAR
          </span>
        </Button>
      </div>
    </div>
  );
}
