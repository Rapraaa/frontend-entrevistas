import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  sending: boolean;
};

export function EditorPanel({ value, onChange, onSubmit, sending }: Props) {
  return (
    <div className="flex flex-col flex-1 h-full bg-surface border-[3px] border-ink shadow-brutal">

      <div className="flex items-center bg-surface2 border-b-[3px] border-ink">
        <div className="px-4 py-3 bg-surface border-r-2 border-ink font-mono text-sm font-bold text-fg">solucion.ts</div>
        <div className="px-4 py-3 border-r-2 border-ink font-mono text-sm text-muted">notas.md</div>
        <div className="flex-1" />
      </div>

      <div className="flex-1 overflow-auto bg-base">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="// Escribe tu solución aquí (opcional)"
          spellCheck={false}
          className="w-full h-full min-h-[300px] resize-none bg-base p-4 font-mono text-sm leading-6 text-fg placeholder:text-muted focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2 border-t-[3px] border-ink p-3">
        <Chip tono="verde">✓ EDITOR</Chip>
        <div className="flex-1" />
        <Button onClick={onSubmit} disabled={sending}>ENVIAR SOLUCIÓN &gt;</Button>
      </div>

    </div>
  );
}
