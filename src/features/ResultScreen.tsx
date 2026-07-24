import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Award, Sparkles, ThumbsUp, Check, AlertTriangle, Lightbulb,
  Printer, LayoutDashboard, RotateCcw,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { getInterview } from '../lib/interviews';
import { ApiError } from '../lib/api';
import type { Interview } from '../lib/types';

function mensajeDeApoyo(score: number): string {
  if (score >= 80) return 'Gran nivel. Estás listo para una entrevista real.';
  if (score >= 60) return 'Buena base. Repasa los puntos a mejorar y vuelve a intentarlo.';
  if (score >= 40) return 'Esto es práctica: aquí es exactamente donde conviene fallar. Revisa lo que sigue.';
  return 'La primera siempre es la más dura. Cada intento suma; sigue practicando.';
}

export function ResultScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState<Interview | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getInterview(id)
      .then(setInterview)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : 'Error al cargar el reporte'),
      );
  }, [id]);

  const evaluation = interview?.evaluation;
  const score = evaluation?.score ?? 0;

  const handlePrint = () => window.print();

  return (
    <div className="max-w-5xl w-full mx-auto p-6 flex flex-col gap-6">
      <div className="contents">

        <div>
          <h1 className="font-mono font-bold text-4xl text-fg uppercase leading-none">
            Reporte de simulación
          </h1>
          <div className="h-1.5 w-24 bg-naranja border-2 border-trazo mt-2" />
          {interview && (
            <p className="font-mono text-sm text-muted mt-3">
              {interview.config.target_role} · {interview.config.seniority} ·{' '}
              {interview.created_at?.slice(0, 10)}
            </p>
          )}
        </div>

        {error && <div className="p-3 border-2 border-trazo bg-rojo text-ink font-mono font-bold">{error}</div>}

        {!interview && !error && (
          <p className="font-mono text-muted">Cargando reporte_</p>
        )}

        {interview && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                className={`md:col-span-1 flex flex-col items-center justify-center p-8 lift ${
                  score >= 80 ? 'bg-verde' : score >= 60 ? 'bg-naranja' : 'bg-amarillo'
                }`}
              >
                <Award size={26} strokeWidth={2.5} className="text-ink mb-2" aria-hidden="true" />
                <h2 className="font-mono text-[11px] text-ink/70 font-bold uppercase tracking-widest mb-2">
                  Puntaje final
                </h2>
                <span className="font-mono text-7xl font-bold text-ink leading-none tabular-nums">
                  {score}
                </span>
                <span className="font-mono text-[11px] text-ink/70 mt-3 font-bold uppercase tracking-widest">
                  sobre 100
                </span>
                <p className="font-mono text-xs text-ink text-center mt-4 border-t-2 border-ink/30 pt-3">
                  {mensajeDeApoyo(score)}
                </p>
              </Card>

              <div className="md:col-span-2 flex flex-col gap-6">
                <Card className="lift">
                  <div className="flex items-center gap-2 mb-3 border-b-2 border-trazo pb-2">
                    <Sparkles size={18} strokeWidth={2.5} className="text-fg" />
                    <h3 className="font-mono text-sm text-fg font-bold uppercase">
                      Feedback general de la IA
                    </h3>
                  </div>
                  <p className="font-mono text-sm text-fg leading-relaxed">
                    {evaluation?.general_feedback ?? 'No hay feedback disponible.'}
                  </p>
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-0 overflow-hidden lift">
                <div className="flex items-center gap-2 bg-verde border-b-[3px] border-trazo px-4 py-3">
                  <ThumbsUp size={18} strokeWidth={2.5} className="text-ink" />
                  <h3 className="font-mono text-sm text-ink font-bold uppercase">Fortalezas</h3>
                </div>
                <ul className="flex flex-col gap-3 p-4">
                  {(evaluation?.strengths ?? []).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-mono text-sm text-fg">
                      <Check size={16} strokeWidth={3} className="text-verde shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                  {!evaluation?.strengths?.length && (
                    <li className="font-mono text-xs text-muted">Sin datos.</li>
                  )}
                </ul>
              </Card>

              <Card className="p-0 overflow-hidden lift">
                <div className="flex items-center gap-2 bg-rojo border-b-[3px] border-trazo px-4 py-3">
                  <AlertTriangle size={18} strokeWidth={2.5} className="text-ink" />
                  <h3 className="font-mono text-sm text-ink font-bold uppercase">A mejorar</h3>
                </div>
                <ul className="flex flex-col gap-3 p-4">
                  {(evaluation?.weaknesses ?? []).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-mono text-sm text-fg">
                      <AlertTriangle size={16} strokeWidth={3} className="text-rojo shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                  {!evaluation?.weaknesses?.length && (
                    <li className="font-mono text-xs text-muted">Sin datos.</li>
                  )}
                </ul>
              </Card>

              <Card className="p-0 overflow-hidden lift">
                <div className="flex items-center gap-2 bg-lila border-b-[3px] border-trazo px-4 py-3">
                  <Lightbulb size={18} strokeWidth={2.5} className="text-ink" />
                  <h3 className="font-mono text-sm text-ink font-bold uppercase">Tips de mejora</h3>
                </div>
                <ul className="flex flex-col gap-3 p-4">
                  {(evaluation?.improvement_tips ?? []).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-mono text-sm text-fg">
                      <Lightbulb size={16} strokeWidth={3} className="text-lila shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                  {!evaluation?.improvement_tips?.length && (
                    <li className="font-mono text-xs text-muted">Sin datos.</li>
                  )}
                </ul>
              </Card>
            </div>

            <div className="no-print flex flex-wrap justify-end gap-4 mt-2 mb-8">
              <Button variante="secundario" onClick={handlePrint}>
                <span className="flex items-center gap-2"><Printer size={16} strokeWidth={3} /> DESCARGAR PDF</span>
              </Button>
              <Button variante="secundario" onClick={() => navigate('/dashboard')}>
                <span className="flex items-center gap-2"><LayoutDashboard size={16} strokeWidth={3} /> VOLVER AL DASHBOARD</span>
              </Button>
              <Button variante="primario" onClick={() => navigate('/setup')}>
                <span className="flex items-center gap-2"><RotateCcw size={16} strokeWidth={3} /> REPETIR SIMULACIÓN</span>
              </Button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
