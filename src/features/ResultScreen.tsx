import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Chip } from '../ui/Chip';
import { Navbar } from '../ui/Navbar';
import { Avatar } from '../ui/Avatar';
import { getInterview } from '../lib/interviews';
import { ApiError } from '../lib/api';
import type { Interview } from '../lib/types';

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
    <div className="flex flex-col h-screen bg-base overflow-auto">
      <Navbar>
        <Avatar iniciales="RH" />
      </Navbar>

      <div className="flex-1 max-w-5xl w-full mx-auto p-6 flex flex-col gap-6">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-ink pb-4">
          <h1 className="font-mono font-bold text-3xl text-fg uppercase">Reporte de Simulación</h1>
        </div>

        {error && <div className="p-3 border-2 border-ink bg-rojo text-ink font-mono font-bold">{error}</div>}

        {!interview && !error && (
          <p className="font-mono text-muted">Cargando reporte_</p>
        )}

        {interview && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1 flex flex-col items-center justify-center p-8 bg-surface2">
                <h3 className="font-mono text-sm text-muted font-bold uppercase mb-4">Puntaje Final</h3>
                <span className={`font-mono text-7xl font-bold ${score >= 80 ? 'text-verde' : score >= 60 ? 'text-naranja' : 'text-rojo'}`}>
                  {score}
                </span>
                <span className="font-mono text-sm text-fg mt-4 font-bold uppercase tracking-widest">sobre 100</span>
              </Card>

              <div className="md:col-span-2 flex flex-col gap-6">
                <Card>
                  <h3 className="font-mono text-sm text-fg font-bold uppercase mb-2 border-b-2 border-ink inline-block pb-1">
                    Feedback General de IA
                  </h3>
                  <p className="font-mono text-sm text-fg leading-relaxed mt-2">
                    {evaluation?.general_feedback ?? 'No hay feedback disponible.'}
                  </p>
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <h3 className="font-mono text-sm text-fg font-bold uppercase mb-3">Fortalezas</h3>
                <ul className="flex flex-col gap-2">
                  {(evaluation?.strengths ?? []).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-mono text-sm text-fg">
                      <Chip tono="verde">✓</Chip> {item}
                    </li>
                  ))}
                  {!evaluation?.strengths?.length && <li className="font-mono text-xs text-muted">—</li>}
                </ul>
              </Card>

              <Card>
                <h3 className="font-mono text-sm text-fg font-bold uppercase mb-3">A Mejorar</h3>
                <ul className="flex flex-col gap-2">
                  {(evaluation?.weaknesses ?? []).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-mono text-sm text-fg">
                      <Chip tono="rojo">!</Chip> {item}
                    </li>
                  ))}
                  {!evaluation?.weaknesses?.length && <li className="font-mono text-xs text-muted">—</li>}
                </ul>
              </Card>

              <Card>
                <h3 className="font-mono text-sm text-fg font-bold uppercase mb-3">Tips de Mejora</h3>
                <ul className="flex flex-col gap-2">
                  {(evaluation?.improvement_tips ?? []).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-mono text-sm text-fg">
                      <Chip tono="lila">→</Chip> {item}
                    </li>
                  ))}
                  {!evaluation?.improvement_tips?.length && <li className="font-mono text-xs text-muted">—</li>}
                </ul>
              </Card>
            </div>

            <div className="flex flex-wrap justify-end gap-4 mt-2 mb-8">
              <Button variante="secundario" onClick={handlePrint}>DESCARGAR PDF</Button>
              <Button variante="secundario" onClick={() => navigate('/dashboard')}>VOLVER AL DASHBOARD</Button>
              <Button variante="primario" onClick={() => navigate('/setup')}>REPETIR SIMULACIÓN</Button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
