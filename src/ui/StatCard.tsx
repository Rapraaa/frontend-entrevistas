import type { LucideIcon } from 'lucide-react';

type Tono = 'naranja' | 'lila' | 'verde' | 'ink' | 'amarillo' | 'cian';

const tonos: Record<Tono, string> = {
  naranja: 'bg-naranja text-ink',
  lila: 'bg-lila text-ink',
  verde: 'bg-verde text-ink',
  ink: 'bg-cian text-ink',
  amarillo: 'bg-amarillo text-ink',
  cian: 'bg-cian text-ink',
};

type Props = {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tono?: Tono;
  detalle?: string;
};

export function StatCard({ label, value, icon: Icon, tono = 'naranja', detalle }: Props) {
  return (
    <div className={`border-[3px] border-trazo shadow-brutal lift p-4 flex flex-col gap-3 ${tonos[tono]}`}>
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-[11px] font-bold uppercase tracking-widest opacity-80">
          {label}
        </span>
        <Icon size={22} strokeWidth={2.5} aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-mono text-4xl sm:text-5xl font-bold leading-none tabular-nums break-words">
          {value}
        </span>
        {detalle && (
          <span className="font-mono text-[11px] font-bold uppercase opacity-70">{detalle}</span>
        )}
      </div>
    </div>
  );
}
