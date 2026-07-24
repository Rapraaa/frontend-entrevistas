type Props = {
  iniciales: string;
  src?: string | null;
  size?: number;
};

export function Avatar({ iniciales, src, size = 32 }: Props) {
  const style = { width: size, height: size };

  if (src) {
    return (
      <img
        src={src}
        alt="Foto de perfil"
        style={style}
        className="object-cover border-2 border-trazo"
      />
    );
  }

  return (
    <div
      style={style}
      className="flex items-center justify-center bg-lila border-2 border-trazo font-mono font-bold text-xs text-ink"
    >
      {iniciales}
    </div>
  );
}
