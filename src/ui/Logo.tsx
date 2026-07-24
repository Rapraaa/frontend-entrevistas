import { Target } from 'lucide-react';

type Props = {
  size?: 'sm' | 'md';
  conTexto?: boolean;
};

export function Logo({ size = 'md', conTexto = true }: Props) {
  const caja = size === 'sm' ? 'w-6 h-6' : 'w-9 h-9';
  const icono = size === 'sm' ? 14 : 20;
  const texto = size === 'sm' ? 'text-sm' : 'text-xl';

  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`${caja} shrink-0 flex items-center justify-center bg-naranja border-2 border-trazo`}
      >
        <Target size={icono} strokeWidth={3} className="text-ink" />
      </div>
      {conTexto && (
        <span className={`font-mono font-bold ${texto} text-fg tracking-tight`}>
          PRAXIS
        </span>
      )}
    </div>
  );
}
