import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, CartesianGrid,
} from 'recharts';
import {
  Layers, TrendingUp, Trophy, CheckCircle2, BarChart3,
  PieChart as PieIcon, History, Inbox, Plus, ChevronRight, Rocket,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Chip } from '../ui/Chip';
import { StatCard } from '../ui/StatCard';
import { EmptyState } from '../ui/EmptyState';
import { getHistory } from '../lib/interviews';
import { ApiError } from '../lib/api';
import type { Interview } from '../lib/types';

const INK = 'var(--trazo)';
// Los ejes/rejilla usan la variable del tema para que se vean en claro Y en oscuro.
const EJE = 'var(--fg)';
const TOOLTIP = {
  border: '2px solid var(--trazo)',
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
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getHistory()
      .then(setHistory)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : 'Error al cargar el historial'),
      )
      .finally(() => setCargando(false));
  }, []);

  const completadas = history.filter((h) => h.status === 'completed');
  const scores = completadas
    .map((h) => h.evaluation?.score)
    .filter((s): s is number => typeof s === 'number');
  const averageScore = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : null;
  const bestScore = scores.length ? Math.max(...scores) : null;
  const sinDatos = !cargando && history.length === 0;

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
          <div className="h-1.5 w-24 bg-naranja border-2 border-trazo mt-2" />
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
        <div role="alert" className="p-3 border-2 border-trazo bg-rojo text-ink font-mono font-bold">
          {error}
        </div>
      )}

      {sinDatos && (
        <div className="border-[3px] border-trazo bg-lila text-ink shadow-brutal p-6 flex flex-col md:flex-row md:items-center gap-5 aparece">
          <div className="border-[3px] border-ink bg-surface shadow-brutal p-4 shrink-0 self-start">
            <Rocket size={32} strokeWidth={2.5} className="text-fg" />
          </div>
          <div className="flex-1">
            <h2 className="font-mono font-bold text-xl uppercase">Tu primera simulación te espera</h2>
            <p className="font-mono text-sm mt-2 max-w-xl">
              Elige un rol y unas tecnologías, y una IA te entrevistará como lo haría un reclutador
              técnico. Al terminar recibes un reporte con tu puntaje y qué mejorar. Dura unos 15
              minutos y puedes salir cuando quieras.
            </p>
          </div>
          <Button variante="primario" onClick={() => navigate('/setup')} className="shrink-0">
            <span className="flex items-center gap-2">
              <Plus size={18} strokeWidth={3} /> EMPEZAR
            </span>
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Simulaciones"
          value={cargando ? '—' : history.length}
          icon={Layers}
          tono="naranja"
        />
        <StatCard
          label="Promedio"
          value={cargando || averageScore === null ? '—' : averageScore}
          detalle={averageScore === null && !cargando ? 'Aún sin practicar' : 'sobre 100'}
          icon={TrendingUp}
          tono="verde"
        />
        <StatCard
          label="Mejor puntaje"
          value={cargando || bestScore === null ? '—' : bestScore}
          detalle={bestScore === null && !cargando ? 'Aún sin practicar' : 'sobre 100'}
          icon={Trophy}
          tono="lila"
        />
        <StatCard
          label="Completadas"
          value={cargando ? '—' : completadas.length}
          icon={CheckCircle2}
          tono="cian"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-0 overflow-hidden lift">
          <div className="flex items-center gap-2 bg-surface2 border-b-[3px] border-trazo px-4 py-3">
            <BarChart3 size={18} strokeWidth={2.5} className="text-fg" />
            <h2 className="font-mono font-bold text-sm text-fg uppercase">Entrevistas por mes</h2>
          </div>
          <div className="h-64 p-3">
            {porMes.length === 0 ? (
              <EmptyState
                icon={Inbox}
                titulo="Sin datos aún"
                detalle="Cuando completes simulaciones, aquí verás tu actividad por mes."
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={porMes}>
                  <CartesianGrid strokeDasharray="4 4" stroke={EJE} opacity={0.2} vertical={false} />
                  <XAxis dataKey="mes" stroke={EJE} fontSize={11} tickLine={false} />
                  <YAxis stroke={EJE} fontSize={11} allowDecimals={false} tickLine={false} />
                  <Tooltip contentStyle={TOOLTIP} />
                  <Bar dataKey="total" fill="#e8622c" stroke={INK} strokeWidth={2} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card className="p-0 overflow-hidden lift">
          <div className="flex items-center gap-2 bg-surface2 border-b-[3px] border-trazo px-4 py-3">
            <PieIcon size={18} strokeWidth={2.5} className="text-fg" />
            <h2 className="font-mono font-bold text-sm text-fg uppercase">Entrevistas por estado</h2>
          </div>
          <div className="h-64 p-3">
            {porEstado.length === 0 ? (
              <EmptyState
                icon={Inbox}
                titulo="Sin entrevistas"
                detalle="Inicia tu primera simulación para ver la distribución por estado."
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={porEstado} dataKey="value" nameKey="name" outerRadius={85} label>
                    {porEstado.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} stroke={INK} strokeWidth={2} />
                    ))}
                  </Pie>
                  <Legend />
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
                  className={`group flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-4 text-left hover:bg-surface2 transition-colors ${index !== history.length - 1 ? 'border-b-2 border-trazo' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 shrink-0 flex items-center justify-center border-2 border-trazo bg-naranja font-mono font-bold text-ink">
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
                    <ChevronRight size={18} className="text-muted group-hover:text-acento transition-colors" />
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
