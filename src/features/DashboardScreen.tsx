import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Chip } from '../ui/Chip';
import { getHistory } from '../lib/interviews';
import { ApiError } from '../lib/api';
import type { Interview } from '../lib/types';

const COLORS = ['#6bcb77', '#b79ced', '#e8622c', '#ef6461'];

export function DashboardScreen() {
  const navigate = useNavigate();

  const [history, setHistory] = useState<Interview[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getHistory()
      .then(setHistory)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : 'Error al cargar el historial'),
      );
  }, []);

  const completadas = history.filter((h) => h.status === 'completed');
  const scores = completadas
    .map((h) => h.evaluation?.score)
    .filter((s): s is number => typeof s === 'number');
  const averageScore = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;
  const bestScore = scores.length ? Math.max(...scores) : 0;

  const porMes = useMemo(() => {
    const map = new Map<string, number>();
    history.forEach((h) => {
      const key = (h.created_at ?? '').slice(0, 7);
      if (key) map.set(key, (map.get(key) ?? 0) + 1);
    });
    return Array.from(map.entries())
      .sort()
      .map(([mes, total]) => ({ mes, total }));
  }, [history]);

  const porEstado = useMemo(
    () => [
      { name: 'Completadas', value: completadas.length },
      { name: 'En curso', value: history.length - completadas.length },
    ],
    [history, completadas.length],
  );

  const openInterview = (item: Interview) => {
    navigate(item.status === 'completed' ? `/resultado/${item._id}` : `/interview/${item._id}`);
  };

  return (
    <div className="max-w-5xl w-full mx-auto p-6 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-2 border-ink pb-4">
        <div>
          <h1 className="font-mono font-bold text-3xl text-fg uppercase">Mi Dashboard</h1>
          <p className="font-mono text-sm text-muted">Resumen de tus entrevistas de simulación.</p>
        </div>
        <Button variante="primario" onClick={() => navigate('/setup')}>NUEVA SIMULACIÓN</Button>
      </div>

      {error && <div className="p-3 border-2 border-ink bg-rojo text-ink font-mono font-bold">{error}</div>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <h3 className="font-mono text-xs text-muted font-bold uppercase mb-2">Simulaciones</h3>
          <p className="font-mono text-3xl font-bold text-fg">{history.length}</p>
        </Card>
        <Card className="text-center p-4">
          <h3 className="font-mono text-xs text-muted font-bold uppercase mb-2">Promedio</h3>
          <p className="font-mono text-3xl font-bold text-verde">{averageScore}</p>
        </Card>
        <Card className="text-center p-4">
          <h3 className="font-mono text-xs text-muted font-bold uppercase mb-2">Mejor Puntaje</h3>
          <p className="font-mono text-3xl font-bold text-lila">{bestScore}</p>
        </Card>
        <Card className="text-center p-4">
          <h3 className="font-mono text-xs text-muted font-bold uppercase mb-2">Completadas</h3>
          <p className="font-mono text-3xl font-bold text-naranja">{completadas.length}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-mono font-bold text-sm text-fg uppercase mb-4">Entrevistas por mes</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={porMes}>
                <XAxis dataKey="mes" stroke="#6e6152" fontSize={11} />
                <YAxis stroke="#6e6152" fontSize={11} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="total" fill="#e8622c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="font-mono font-bold text-sm text-fg uppercase mb-4">Entrevistas por estado</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={porEstado} dataKey="value" nameKey="name" outerRadius={90} label>
                  {porEstado.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div>
        <h2 className="font-mono font-bold text-xl text-fg uppercase mb-4">Actividad Reciente</h2>
        <Card className="p-0 overflow-hidden">
          {history.length === 0 ? (
            <div className="p-6 text-center font-mono text-muted">No hay simulaciones recientes.</div>
          ) : (
            <div className="flex flex-col">
              {history.map((item, index) => (
                <button
                  key={item._id}
                  onClick={() => openInterview(item)}
                  className={`flex flex-col md:flex-row items-start md:items-center justify-between p-4 text-left hover:bg-surface2 transition-colors ${index !== history.length - 1 ? 'border-b-2 border-ink' : ''}`}
                >
                  <div className="flex flex-col mb-2 md:mb-0">
                    <span className="font-mono font-bold text-fg text-lg">{item.config.target_role}</span>
                    <span className="font-mono text-xs text-muted">{item.created_at?.slice(0, 10) ?? '—'}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Chip tono={item.status === 'completed' ? 'verde' : 'lila'}>
                      {item.status === 'completed' ? 'COMPLETADA' : 'EN CURSO'}
                    </Chip>
                    <div className="font-mono font-bold text-lg text-fg w-12 text-right">
                      {item.evaluation?.score ?? '—'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
