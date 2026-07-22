import type { LucideIcon } from 'lucide-react';

type Props = {
  icon: LucideIcon;
  titulo: string;
  detalle?: string;
};

export function EmptyState({ icon: Icon, titulo, detalle }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 px-4 text-center">
      <div className="border-[3px] border-ink bg-lila shadow-brutal p-4">
        <Icon size={30} strokeWidth={2.5} className="text-ink" />
      </div>
      <p className="font-mono font-bold uppercase text-fg">{titulo}</p>
      {detalle && <p className="font-mono text-xs text-muted max-w-xs">{detalle}</p>}
    </div>
  );
}
