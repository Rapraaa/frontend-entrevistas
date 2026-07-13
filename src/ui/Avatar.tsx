type Props = {
  iniciales: string; //todo: mejorar para que saque las iniciales de el nombre
};

export function Avatar({ iniciales }: Props) {
  return (
    <div className="flex items-center justify-center w-8 h-8 bg-lila border-2 border-ink font-mono font-bold text-xs text-ink">
      {iniciales}
    </div>
  );
}
