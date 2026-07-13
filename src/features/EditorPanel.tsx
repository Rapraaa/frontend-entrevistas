import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';

const codigo = `// PREGUNTA 3: Implementa un provider
import { Injectable } from '@nestjs/common';

@Injectable()
export class InterviewService {
  constructor(
    private readonly repo: InterviewRepo,
  ) {}

  async evaluate(answer: string) {
    return this.repo.score(answer);
  }
}`;

export function EditorPanel() {
  const lineas = codigo.split('\n');
  const numeros = lineas.map((_, i) => String(i + 1).padStart(2, '0')).join('\n');

  return (
    <div className="flex flex-col flex-1 h-[600px] bg-surface border-[3px] border-ink shadow-brutal">

      {/* TABS */}
      <div className="flex items-center bg-surface2 border-b-[3px] border-ink">
        <div className="px-4 py-3 bg-surface border-r-2 border-ink font-mono text-sm font-bold text-fg">solucion.ts</div>
        <div className="px-4 py-3 border-r-2 border-ink font-mono text-sm text-muted">notas.md</div>
        <div className="flex-1" />
        <div className="px-3">
          <Chip>PREGUNTA 3/10</Chip>
        </div>
      </div>

      {/* CÓDIGO */}
      <div className="flex-1 overflow-auto p-4 bg-base flex gap-4 font-mono text-sm leading-6">
        <pre className="text-muted select-none">{numeros}</pre>
        <pre className="text-fg">{codigo}</pre>
      </div>

      {/* FOOTER */}
      <div className="flex items-center gap-2 border-t-[3px] border-ink p-3">
        <Chip tono="verde">✓ AUTOGUARDADO</Chip>
        <div className="flex-1" />
        <Button variante="secundario">PISTA (-2 PTS)</Button>
        <Button>ENVIAR SOLUCIÓN &gt;</Button>
      </div>

    </div>
  );
}
