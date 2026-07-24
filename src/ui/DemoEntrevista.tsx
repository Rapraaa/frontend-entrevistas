import { useEffect, useRef, useState } from 'react';
import { Bot, User, Terminal } from 'lucide-react';

type Turno = { autor: 'ia' | 'tu'; texto: string };

const GUION: Turno[] = [
  { autor: 'ia', texto: 'Explícame cómo funciona el Virtual DOM en React.' },
  { autor: 'tu', texto: 'Es una representación en memoria del DOM real. React compara árboles y aplica solo las diferencias.' },
  { autor: 'ia', texto: '¿Y qué estrategias usarías para evitar re-renders innecesarios?' },
  { autor: 'tu', texto: 'memo para componentes puros, useMemo para cálculos costosos y useCallback para funciones que viajan como props.' },
  { autor: 'ia', texto: 'Bien. Ahora escribe una función que memorice resultados costosos.' },
];

const VELOCIDAD = 18;
const PAUSA_ENTRE_TURNOS = 700;

export function DemoEntrevista() {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [parcial, setParcial] = useState('');
  const [indice, setIndice] = useState(0);
  const finalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducido =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducido) {
      setTurnos(GUION);
      setIndice(GUION.length);
      return;
    }

    if (indice >= GUION.length) {
      const reinicio = setTimeout(() => {
        setTurnos([]);
        setParcial('');
        setIndice(0);
      }, 4200);
      return () => clearTimeout(reinicio);
    }

    const turno = GUION[indice];
    let caracter = 0;

    const escribir = setInterval(() => {
      caracter += 1;
      setParcial(turno.texto.slice(0, caracter));

      if (caracter >= turno.texto.length) {
        clearInterval(escribir);
        setTimeout(() => {
          setTurnos((prev) => [...prev, turno]);
          setParcial('');
          setIndice((i) => i + 1);
        }, PAUSA_ENTRE_TURNOS);
      }
    }, VELOCIDAD);

    return () => clearInterval(escribir);
  }, [indice]);

  useEffect(() => {
    finalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [turnos.length, parcial]);

  const preguntas = turnos.filter((t) => t.autor === 'ia').length;
  const enCurso = GUION[indice];

  return (
    <div className="bg-surface border-[3px] border-trazo shadow-brutal-lg w-full">
      <div className="flex items-center justify-between gap-3 border-b-[3px] border-trazo bg-surface2 px-4 py-3">
        <span className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-fg">
          <Terminal size={15} strokeWidth={3} aria-hidden="true" />
          Demo en vivo
        </span>
        <span className="border-2 border-trazo bg-verde px-2 py-1 font-mono text-[10px] font-bold uppercase text-ink">
          Pregunta {Math.min(preguntas + (enCurso?.autor === 'ia' ? 1 : 0), 10)} / 10
        </span>
      </div>

      <div className="flex h-[300px] flex-col gap-3 overflow-hidden p-4 sm:h-[340px]">
        {turnos.map((t, i) => (
          <Burbuja key={i} turno={t} />
        ))}
        {enCurso && parcial && (
          <Burbuja turno={{ autor: enCurso.autor, texto: parcial }} escribiendo />
        )}
        <div ref={finalRef} />
      </div>

      <div className="flex items-center gap-2 border-t-[3px] border-trazo px-4 py-3">
        <div className="flex-1 border-2 border-trazo bg-base px-3 py-2 font-mono text-sm text-muted">
          {enCurso?.autor === 'tu' ? 'escribiendo_' : 'esperando pregunta_'}
        </div>
        <span className="border-2 border-trazo bg-naranja px-3 py-2 font-mono text-xs font-bold uppercase text-ink">
          Enviar
        </span>
      </div>
    </div>
  );
}

function Burbuja({ turno, escribiendo = false }: { turno: Turno; escribiendo?: boolean }) {
  const esIa = turno.autor === 'ia';

  return (
    <div className={`flex gap-2 ${esIa ? '' : 'flex-row-reverse'}`}>
      <div
        className={`grid h-8 w-8 shrink-0 place-items-center border-2 border-trazo ${
          esIa ? 'bg-lila' : 'bg-verde'
        }`}
      >
        {esIa ? (
          <Bot size={16} strokeWidth={3} className="text-ink" aria-hidden="true" />
        ) : (
          <User size={16} strokeWidth={3} className="text-ink" aria-hidden="true" />
        )}
      </div>
      <div
        className={`max-w-[82%] border-2 border-trazo px-3 py-2 font-mono text-[13px] leading-snug ${
          esIa ? 'bg-lila text-ink' : 'bg-base text-fg'
        }`}
      >
        <span className="mb-0.5 block text-[9px] font-bold uppercase tracking-widest opacity-60">
          {esIa ? 'Entrevistador' : 'Tú'}
        </span>
        {turno.texto}
        {escribiendo && <span className="cursor-parpadeo">▊</span>}
      </div>
    </div>
  );
}
