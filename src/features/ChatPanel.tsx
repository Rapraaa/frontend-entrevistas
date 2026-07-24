import { useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import { ChatBubble } from '../ui/ChatBubble';
import { Button } from '../ui/Button';
import { Chip } from '../ui/Chip';
import type { ChatMessage, InterviewConfig } from '../lib/types';

const META_PREGUNTAS = 10;

type Props = {
  messages: ChatMessage[];
  config?: InterviewConfig;
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  sending: boolean;
};

export function ChatPanel({ messages, config, value, onChange, onSend, sending }: Props) {
  const aiCount = messages.filter((m) => m.sender === 'ai').length;
  const total = Math.max(META_PREGUNTAS, aiCount);
  const progreso = Math.min(100, Math.round((aiCount / total) * 100));
  const finalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    finalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length, sending]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim() || sending) return;
    onSend();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (value.trim() && !sending) onSend();
    }
  };

  return (
    <div className="flex flex-col h-full w-full lg:w-[480px] lg:shrink-0 bg-surface border-[3px] border-trazo shadow-brutal">
      <div className="bg-surface2 border-b-[3px] border-trazo p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-mono font-bold text-fg">ENTREVISTA TÉCNICA</h2>
          <Chip tono="verde">
            PREGUNTA {aiCount} DE {total}
          </Chip>
        </div>

        <div
          className="h-2 w-full border-2 border-trazo bg-base overflow-hidden"
          role="progressbar"
          aria-valuenow={aiCount}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`Pregunta ${aiCount} de ${total}`}
        >
          <div
            className="h-full bg-verde transition-[width] duration-500 ease-out"
            style={{ width: `${progreso}%` }}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {config?.target_role && <Chip>ROL: {config.target_role.toUpperCase()}</Chip>}
          {config?.technologies.map((t) => (
            <Chip key={t}>{t.toUpperCase()}</Chip>
          ))}
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
        aria-live="polite"
        aria-busy={sending}
      >
        {messages.map((m) => (
          <ChatBubble key={m.sequence} variante={m.sender === 'ai' ? 'ia' : 'user'}>
            {m.content}
            {m.code_snippet && (
              <pre className="mt-2 p-2 bg-base border-2 border-trazo text-xs overflow-x-auto">
                {m.code_snippet}
              </pre>
            )}
          </ChatBubble>
        ))}
        {sending && (
          <div className="flex items-center gap-2 font-mono text-xs text-muted">
            <span className="flex gap-1" aria-hidden="true">
              <span className="h-2 w-2 bg-acento flota" style={{ animationDelay: '0ms' }} />
              <span className="h-2 w-2 bg-acento flota" style={{ animationDelay: '150ms' }} />
              <span className="h-2 w-2 bg-acento flota" style={{ animationDelay: '300ms' }} />
            </span>
            La IA está pensando tu siguiente pregunta_
          </div>
        )}
        <div ref={finalRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t-[3px] border-trazo p-3 flex flex-col gap-2">
        <label htmlFor="respuesta-entrevista" className="sr-only">
          Tu respuesta
        </label>
        <textarea
          id="respuesta-entrevista"
          rows={3}
          placeholder="Escribe tu respuesta_"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={sending}
          className="w-full resize-y min-h-[76px] bg-base border-2 border-trazo px-3 py-2.5 font-mono text-sm text-fg placeholder:text-muted disabled:opacity-60"
        />
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] text-muted">Ctrl + Enter para enviar</span>
          <Button type="submit" disabled={sending || !value.trim()}>
            ENVIAR &gt;
          </Button>
        </div>
      </form>
    </div>
  );
}
