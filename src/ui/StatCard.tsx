import type { LucideIcon } from 'lucide-react';

type Tono = 'naranja' | 'lila' | 'verde' | 'ink';

const tonos: Record<Tono, string> = {
  naranja: 'bg-naranja text-ink',
  lila: 'bg-lila text-ink',
  verde: 'bg-verde text-ink',
  ink: 'bg-ink text-papel',
};

type Props = {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tono?: Tono;
};

export function StatCard({ label, value, icon: Icon, tono = 'naranja' }: Props) {
  return (
    <div className={`border-[3px] border-ink shadow-brutal lift p-4 flex flex-col gap-3 ${tonos[tono]}`}>
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-[11px] font-bold uppercase tracking-widest opacity-75">
          {label}
        </span>
        <Icon size={22} strokeWidth={2.5} />
      </div>
      <span className="font-mono text-5xl font-bold leading-none">{value}</span>
    </div>
  );
}
