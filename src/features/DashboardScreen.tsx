import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, CartesianGrid,
} from 'recharts';
import {
  Layers, TrendingUp, Trophy, CheckCircle2, BarChart3,
  PieChart as PieIcon, History, Inbox, Plus, ChevronRight,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Chip } from '../ui/Chip';
import { StatCard } from '../ui/StatCard';
import { EmptyState } from '../ui/EmptyState';
import { getHistory } from '../lib/interviews';
import { ApiError } from '../lib/api';
import type { Interview } from '../lib/types';

const INK = '#141110';
// Los ejes/rejilla usan la variable del tema para que se vean en claro Y en oscuro.
const EJE = 'var(--fg)';
const TOOLTIP = {
  border: `2px solid ${INK}`,
  borderRadius: 0,
  fontFamily: 'monospace',
  background: 'var(--surface)',
  color: 'var(--fg)',
};
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
    return Array.from(map.entries()).sort().map(([mes, total]) => ({ mes, total }));
  }, [history]);

  const porEstado = useMemo(
    () =>
      [
        { name: 'Completadas', value: completadas.length },
        { name: 'En curso', value: history.length - completadas.length },
      ].filter((d) => d.value > 0),
    [history, completadas.length],
  );

  const openInterview = (item: Interview) => {
    navigate(item.status === 'completed' ? `/resultado/${item._id}` : `/interview/${item._id}`);
  };

  return (
    <div className="max-w-5xl w-full mx-auto p-6 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-mono font-bold text-4xl text-fg uppercase leading-none">
            Mi Dashboard
          </h1>
          <div className="h-1.5 w-24 bg-naranja border-2 border-ink mt-2" />
          <p className="font-mono text-sm text-muted mt-3">
            Resumen de tus entrevistas de simulación.
          </p>
        </div>
        <Button variante="primario" onClick={() => navigate('/setup')}>
          <span className="flex items-center gap-2">
            <Plus size={18} strokeWidth={3} /> NUEVA SIMULACIÓN
          </span>
        </Button>
      </div>

      {error && (
        <div className="p-3 border-2 border-ink bg-rojo text-ink font-mono font-bold">{error}</div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Simulaciones" value={history.length} icon={Layers} tono="naranja" />
        <StatCard label="Promedio" value={averageScore} icon={TrendingUp} tono="verde" />
        <StatCard label="Mejor puntaje" value={bestScore} icon={Trophy} tono="lila" />
        <StatCard label="Completadas" value={completadas.length} icon={CheckCircle2} tono="ink" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-0 overflow-hidden lift">
          <div className="flex items-center gap-2 bg-surface2 border-b-[3px] border-ink px-4 py-3">
            <BarChart3 size={18} strokeWidth={2.5} className="text-fg" />
            <h3 className="font-mono font-bold text-sm text-fg uppercase">Entrevistas por mes</h3>
          </div>
          <div className="h-64 p-3 flex items-center justify-center">
            {porMes.length === 0 ? (
              <EmptyState
                icon={Inbox}
                titulo="Sin datos aún"
                detalle="Cuando completes simulaciones, aquí verás tu actividad por mes."
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={porMes} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke={EJE} opacity={0.2} vertical={false} />
                  <XAxis dataKey="mes" stroke={EJE} fontSize={11} tickLine={false} axisLine={{ strokeWidth: 2 }} />
                  <YAxis stroke={EJE} fontSize={11} allowDecimals={false} tickLine={false} axisLine={{ strokeWidth: 2 }} />
                  <Tooltip contentStyle={TOOLTIP} cursor={{ fill: EJE, opacity: 0.1 }} />
                  <Bar dataKey="total" fill="#e8622c" stroke={INK} strokeWidth={2} barSize={45} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card className="p-0 overflow-hidden lift">
          <div className="flex items-center gap-2 bg-surface2 border-b-[3px] border-ink px-4 py-3">
            <PieIcon size={18} strokeWidth={2.5} className="text-fg" />
            <h3 className="font-mono font-bold text-sm text-fg uppercase">Entrevistas por estado</h3>
          </div>
          <div className="h-64 p-3 flex items-center justify-center">
            {porEstado.length === 0 ? (
              <EmptyState
                icon={Inbox}
                titulo="Sin entrevistas"
                detalle="Inicia tu primera simulación para ver la distribución por estado."
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                  <Pie 
                    data={porEstado} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={80} 
                  >
                    {porEstado.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} stroke={INK} strokeWidth={2} />
                    ))}
                  </Pie>
                  <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 'bold' }} />
                  <Tooltip contentStyle={TOOLTIP} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <History size={22} strokeWidth={2.5} className="text-fg" />
          <h2 className="font-mono font-bold text-2xl text-fg uppercase">Actividad reciente</h2>
        </div>
        <Card className="p-0 overflow-hidden">
          {history.length === 0 ? (
            <EmptyState
              icon={Inbox}
              titulo="No hay simulaciones recientes"
              detalle="Pulsa «Nueva simulación» para practicar tu primera entrevista con la IA."
            />
          ) : (
            <div className="flex flex-col">
              {history.map((item, index) => (
                <button
                  key={item._id}
                  onClick={() => openInterview(item)}
                  className={`group flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-4 text-left hover:bg-surface2 transition-colors ${index !== history.length - 1 ? 'border-b-2 border-ink' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 shrink-0 flex items-center justify-center border-2 border-ink bg-naranja font-mono font-bold text-ink">
                      {item.config.target_role.slice(0, 1).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono font-bold text-fg">{item.config.target_role}</span>
                      <span className="font-mono text-xs text-muted">
                        {item.created_at?.slice(0, 10) ?? '—'} · {item.config.seniority}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Chip tono={item.status === 'completed' ? 'verde' : 'lila'}>
                      {item.status === 'completed' ? 'COMPLETADA' : 'EN CURSO'}
                    </Chip>
                    <span className="font-mono font-bold text-2xl text-fg w-12 text-right">
                      {item.evaluation?.score ?? '—'}
                    </span>
                    <ChevronRight size={18} className="text-muted group-hover:text-naranja transition-colors" />
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
