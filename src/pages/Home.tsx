import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  Code2,
  FileBarChart,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  Zap,
} from 'lucide-react';
import { Navbar } from '../ui/Navbar';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Marquesina } from '../ui/Marquesina';
import { Revelar } from '../ui/Revelar';
import { DemoEntrevista } from '../ui/DemoEntrevista';
import { TituloEscrito } from '../ui/TituloEscrito';
import { useAuth } from '../auth/AuthContext';

const TECNOLOGIAS = [
  'React', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'Docker',
  'NestJS', 'Java', 'Go', 'Kubernetes', 'GraphQL', 'AWS',
];

const PASOS = [
  {
    n: '01',
    titulo: 'Configura',
    detalle: 'Elige el rol, tu nivel y las tecnologías que quieres practicar.',
    icono: Target,
    fondo: 'bg-lila',
  },
  {
    n: '02',
    titulo: 'Conversa',
    detalle: 'Una IA te entrevista como un reclutador técnico y repregunta según respondas.',
    icono: Bot,
    fondo: 'bg-verde',
  },
  {
    n: '03',
    titulo: 'Mejora',
    detalle: 'Recibes un puntaje, tus fortalezas y qué estudiar antes de la entrevista real.',
    icono: FileBarChart,
    fondo: 'bg-amarillo',
  },
];

const CAPACIDADES = [
  {
    icono: Code2,
    titulo: 'Editor con consola real',
    detalle: 'Escribe y ejecuta código en 9 lenguajes sin salir de la entrevista.',
    fondo: 'bg-cian',
    ancho: 'md:col-span-2',
  },
  {
    icono: Bot,
    titulo: 'Repregunta de verdad',
    detalle: 'La IA lee tu respuesta y profundiza donde flaqueas.',
    fondo: 'bg-verde',
    ancho: '',
  },
  {
    icono: Timer,
    titulo: 'Sin presión',
    detalle: 'Guarda y sal cuando quieras. Tu progreso se conserva.',
    fondo: 'bg-amarillo',
    ancho: '',
  },
  {
    icono: FileBarChart,
    titulo: 'Reporte con puntaje',
    detalle: 'Fortalezas, puntos a mejorar y consejos concretos al terminar.',
    fondo: 'bg-cian',
    ancho: 'md:col-span-2',
  },
];

const CIFRAS = [
  { icono: Layers, dato: '9', etiqueta: 'lenguajes ejecutables' },
  { icono: Zap, dato: '~15', etiqueta: 'minutos por sesión' },
  { icono: Target, dato: '/100', etiqueta: 'puntaje detallado' },
  { icono: Timer, dato: '∞', etiqueta: 'intentos' },
];

export function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const destino = isAuthenticated ? '/dashboard' : '/registro';

  return (
    <div className="min-h-screen bg-base">
      <Navbar>
        <ThemeToggle />
        {isAuthenticated ? (
          <Button variante="primario" onClick={() => navigate('/dashboard')}>
            IR AL DASHBOARD
          </Button>
        ) : (
          <>
            <Link
              to="/login"
              className="hidden sm:inline px-3 py-3 font-mono font-bold text-fg hover:text-acento"
            >
              INICIAR SESIÓN
            </Link>
            <Button variante="primario" onClick={() => navigate('/registro')}>
              EMPEZAR
            </Button>
          </>
        )}
      </Navbar>

      <section className="relative overflow-hidden border-b-[3px] border-trazo bg-base patron-rejilla">
        <div
          className="pointer-events-none absolute -left-16 top-24 hidden h-40 w-40 border-[3px] border-trazo bg-lila opacity-90 shadow-brutal lg:block flota"
          style={{ ['--giro' as string]: '12deg' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-12 bottom-16 hidden h-32 w-32 border-[3px] border-trazo bg-verde opacity-90 shadow-brutal lg:block flota"
          style={{ ['--giro' as string]: '-12deg', animationDelay: '1.2s' }}
          aria-hidden="true"
        />

        <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:py-20">
          <div className="aparece">
            <span className="inline-flex items-center gap-2 border-[3px] border-trazo bg-naranja px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-ink shadow-brutal">
              <Sparkles size={13} strokeWidth={3} aria-hidden="true" />
              Entrevistas técnicas con IA
            </span>

            <h1 className="mt-6 font-mono text-[2.6rem] font-bold leading-[1.05] text-fg sm:text-6xl lg:text-[4.2rem]">
              Practica hasta
              <br />
              que te salga
              <br />
              <TituloEscrito
                palabras={['natural', 'sin nervios', 'redondo', 'perfecto']}
                className="text-acento"
              />
            </h1>

            <p className="mt-6 max-w-lg font-mono text-[1rem] leading-relaxed text-muted sm:text-lg">
              Una IA te entrevista como lo haría un reclutador técnico. Respondes, escribes código,
              y al terminar recibes un reporte con tu puntaje y qué mejorar.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                variante="primario"
                onClick={() => navigate(destino)}
                className="text-[1rem] sm:px-6"
              >
                <span className="flex items-center justify-center gap-2">
                  EMPEZAR GRATIS
                  <ArrowRight size={18} strokeWidth={3} aria-hidden="true" />
                </span>
              </Button>
              <Link
                to="/publico/roles"
                className="inline-flex min-h-[44px] items-center justify-center border-2 border-trazo bg-surface px-5 py-3 font-mono font-bold uppercase text-fg shadow-brutal presiona"
              >
                Ver catálogo
              </Link>
            </div>

            <p className="mt-5 flex items-center gap-2 font-mono text-xs text-muted">
              <ShieldCheck size={15} strokeWidth={2.5} aria-hidden="true" />
              Sin tarjeta. Sin límite de intentos.
            </p>
          </div>

          <div className="aparece" style={{ animationDelay: '160ms' }}>
            <DemoEntrevista />
          </div>
        </div>
      </section>

      <Marquesina items={TECNOLOGIAS} fondo="bg-naranja" />

      <section className="border-b-[3px] border-trazo bg-surface px-5 py-16 sm:px-6 sm:py-20">
        <div className="container mx-auto">
          <Revelar>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-acento">
              Cómo funciona
            </p>
            <h2 className="mt-3 max-w-2xl font-mono text-3xl font-bold uppercase leading-tight text-fg sm:text-5xl">
              De cero a entrevista en tres pasos
            </h2>
          </Revelar>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PASOS.map((paso, i) => (
              <Revelar key={paso.n} retraso={i * 120}>
                <article className="flex h-full flex-col border-[3px] border-trazo bg-base shadow-brutal lift">
                  <div
                    className={`flex items-center justify-between border-b-[3px] border-trazo ${paso.fondo} px-4 py-3`}
                  >
                    <span className="font-mono text-3xl font-bold text-ink">{paso.n}</span>
                    <paso.icono size={26} strokeWidth={2.5} className="text-ink" aria-hidden="true" />
                  </div>
                  <div className="flex-1 p-5">
                    <h3 className="font-mono text-xl font-bold uppercase text-fg">{paso.titulo}</h3>
                    <p className="mt-2 font-mono text-sm leading-relaxed text-muted">
                      {paso.detalle}
                    </p>
                  </div>
                </article>
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-[3px] border-trazo bg-lila px-5 py-16 sm:px-6 sm:py-20">
        <div className="container mx-auto">
          <Revelar>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink">
              Lo que incluye
            </p>
            <h2 className="mt-3 max-w-2xl font-mono text-3xl font-bold uppercase leading-tight text-ink sm:text-5xl">
              Una entrevista completa, no un cuestionario
            </h2>
          </Revelar>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {CAPACIDADES.map((c, i) => (
              <Revelar key={c.titulo} retraso={i * 100} className={c.ancho}>
                <article
                  className={`flex h-full flex-col gap-3 border-[3px] border-trazo ${c.fondo} p-5 shadow-brutal lift`}
                >
                  <div className="grid h-11 w-11 place-items-center border-[3px] border-ink bg-surface">
                    <c.icono size={20} strokeWidth={2.5} className="text-fg" aria-hidden="true" />
                  </div>
                  <h3 className="font-mono text-lg font-bold uppercase leading-tight text-ink">
                    {c.titulo}
                  </h3>
                  <p className="font-mono text-sm leading-relaxed text-ink">{c.detalle}</p>
                </article>
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-[3px] border-trazo bg-base px-5 py-16 sm:px-6 sm:py-20">
        <div className="container mx-auto grid grid-cols-1 gap-10 lg:grid-cols-3">
          <Revelar className="lg:col-span-1">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-acento">
              Por qué funciona
            </p>
            <h2 className="mt-3 font-mono text-3xl font-bold uppercase leading-tight text-fg sm:text-4xl">
              El nervio se quita practicando
            </h2>
            <p className="mt-4 font-mono text-sm leading-relaxed text-muted">
              Nadie falla una entrevista por no saber: se falla por no haber dicho las cosas en voz
              alta antes. Praxis te da ese ensayo, todas las veces que necesites.
            </p>
          </Revelar>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:col-span-2">
            {CIFRAS.map((s, i) => (
              <Revelar key={s.etiqueta} retraso={i * 90}>
                <div className="flex h-full flex-col justify-between gap-3 border-[3px] border-trazo bg-surface p-4 shadow-brutal lift">
                  <s.icono size={22} strokeWidth={2.5} className="text-acento" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-3xl font-bold leading-none text-fg">{s.dato}</p>
                    <p className="mt-1.5 font-mono text-[11px] font-bold uppercase leading-tight tracking-wide text-muted">
                      {s.etiqueta}
                    </p>
                  </div>
                </div>
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-naranja px-5 py-16 sm:px-6 sm:py-24">
        <div className="container mx-auto max-w-3xl text-center">
          <Revelar>
            <h2 className="font-mono text-3xl font-bold uppercase leading-tight text-ink sm:text-5xl">
              Tu próxima entrevista
              <br />
              ya no será la primera
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-mono text-sm leading-relaxed text-ink sm:text-[1rem]">
              Practica hoy y llega con la respuesta ya dicha en voz alta.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to={destino}
                className="inline-flex min-h-[44px] items-center gap-2 border-[3px] border-ink bg-surface px-7 py-4 font-mono text-[1rem] font-bold uppercase text-fg shadow-brutal presiona"
              >
                Crear mi cuenta
                <ArrowRight size={18} strokeWidth={3} aria-hidden="true" />
              </Link>
            </div>
          </Revelar>
        </div>
      </section>

      <footer className="border-t-[3px] border-trazo bg-surface px-5 py-8 sm:px-6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-xs text-muted">
            Praxis — Proyecto integrador de Programación 3
          </p>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link to="/publico/roles" className="inline-flex min-h-[44px] items-center font-mono text-xs text-fg hover:text-acento">
              Catálogos
            </Link>
            <Link to="/login" className="inline-flex min-h-[44px] items-center font-mono text-xs text-fg hover:text-acento">
              Iniciar sesión
            </Link>
            <Link to="/registro" className="inline-flex min-h-[44px] items-center font-mono text-xs text-fg hover:text-acento">
              Crear cuenta
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
