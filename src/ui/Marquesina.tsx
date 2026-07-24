type Props = {
  items: string[];
  fondo?: string;
  className?: string;
};

export function Marquesina({ items, fondo = 'bg-naranja', className = '' }: Props) {
  const duplicados = [...items, ...items];

  return (
    <div
      className={`${fondo} border-y-[3px] border-trazo overflow-hidden py-3 ${className}`}
      aria-hidden="true"
    >
      <div className="flex w-max marquesina-pista">
        {duplicados.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-6 px-6 font-mono font-bold text-ink uppercase text-sm sm:text-[1rem] whitespace-nowrap"
          >
            {item}
            <span className="text-ink/50">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
