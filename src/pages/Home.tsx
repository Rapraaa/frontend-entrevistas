import { useNavigate } from 'react-router-dom';
import { Navbar } from '../ui/Navbar';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Chip';
import { ChatBubble } from '../ui/ChatBubble';

export function Home() {
  const navigate = useNavigate();

  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-base">
      <Navbar>
        <button onClick={toggleTheme} className="px-3 border-2 border-ink bg-surface2"> ☀︎ </button>
        <button onClick={() => navigate('/login')} className="font-mono font-bold text-fg">INICIAR SESIÓN</button>
        <Button variante="primario" onClick={() => navigate('/registro')}>REGISTRARSE</Button>
      </Navbar>

      <main className="container mx-auto px-6 py-16 grid grid-cols-2 gap-12 items-start">
        <section>
          <Chip tono="lila" className="mb-4">PROYECTO NESTJS - IA ENTREVISTADORA</Chip>
          <h1 className="text-6xl font-bold font-mono text-fg leading-tight mb-6">
            Practica tu entrevista técnica con IA_
          </h1>
          <p className="text-muted text-lg mb-8">
            Configura rol, seniority y tecnologías. Conversa con una IA que actúa como entrevistador real, resuelve código en el editor integrado y recibe un reporte con puntaje detallado.
          </p>
          <Button onClick={() => navigate('/login')}>EMPEZAR SIMULACIÓN →</Button>

          <div className="flex gap-12 mt-12">
            <div><p className="text-3xl font-bold font-mono text-fg">500+</p><p className="text-xs text-muted">PREGUNTAS</p></div>
            <div><p className="text-3xl font-bold font-mono text-fg">12+</p><p className="text-xs text-muted">TECNOLOGÍAS</p></div>
            <div><p className="text-3xl font-bold font-mono text-fg">100%</p><p className="text-xs text-muted">FEEDBACK IA</p></div>
          </div>
        </section>

        <div className="bg-surface2 p-6 border-2 border-ink shadow-brutal">
          <div className="flex justify-between mb-4">
            <span className="font-mono text-xs text-fg">SIM://SESSION_ACTIVA</span>
            <span className="font-mono text-xs text-fg bg-surface px-2 py-1 border border-ink">PREGUNTA 3/10</span>
          </div>
          <div className="space-y-4">
            <ChatBubble variante="ia">Explícame cómo funciona el Virtual DOM en React y por qué mejora el rendimiento.</ChatBubble>
            <ChatBubble variante="user">El Virtual DOM es una representación en memoria del DOM real. React lo usa para calcular el diff...</ChatBubble>
            <ChatBubble variante="ia">Bien. ¿Qué estrategias usarías para evitar re-renders innecesarios en componentes funcionales?</ChatBubble>
          </div>
          <div className="mt-4 flex gap-2">
            <input className="flex-1 bg-surface border-2 border-ink p-2 font-mono text-sm text-fg" placeholder="escribe aquí..." />
            <Button className="py-2">ENVIAR</Button>
          </div>
        </div>
      </main>

      <section className="container mx-auto px-6 py-16">
        <h2 className="font-mono font-bold text-lg mb-8 text-fg">// CÓMO FUNCIONA_ TODO EN UNA PLATAFORMA</h2>
        <div className="grid grid-cols-3 gap-6 mb-16">
          <Card>
            <p className="font-bold font-mono mb-2 text-fg">01</p>
            <h3 className="font-bold font-mono mb-2 text-fg">CONFIGURA_</h3>
            <p className="text-sm text-muted">Elige rol, nivel de seniority y tecnologías. La IA adapta cada pregunta a tu perfil exacto.</p>
          </Card>
          <Card>
            <p className="font-bold font-mono mb-2 text-fg">02</p>
            <h3 className="font-bold font-mono mb-2 text-fg">CONVERSA_</h3>
            <p className="text-sm text-muted">Chat en tiempo real con una IA entrevistadora. Editor de código integrado para los ejercicios prácticos.</p>
          </Card>
          <Card>
            <p className="font-bold font-mono mb-2 text-fg">03</p>
            <h3 className="font-bold font-mono mb-2 text-fg">MEJORA_</h3>
            <p className="text-sm text-muted">Reporte con puntaje por categoría, análisis de respuestas y recomendaciones personalizadas.</p>
          </Card>
        </div>

        <Card className="bg-surface2 border-[3px] border-ink">
          <p className="text-muted text-xs mb-2 font-mono">IA_ENTREVISTADOR &gt; ¿Estás listo para el desafío?</p>
          <h2 className="text-3xl font-bold font-mono text-fg mb-6">CREA TU CUENTA Y COMIENZA HOY</h2>
          <Button onClick={() => navigate('/registro')}>
            REGISTRARSE GRATIS →
          </Button>
        </Card>
      </section>
    </div>
  );
}
