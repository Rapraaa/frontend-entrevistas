import { useState, type FormEvent } from 'react';
import { ChatBubble } from '../ui/ChatBubble';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Chip } from '../ui/Chip';
import type { ChatMessage, InterviewConfig } from '../lib/types';

type Props = {
  messages: ChatMessage[];
  config?: InterviewConfig;
  onSend: (content: string) => void;
  sending: boolean;
};

export function ChatPanel({ messages, config, onSend, sending }: Props) {
  const [text, setText] = useState('');

  const aiCount = messages.filter((m) => m.sender === 'ai').length;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = text.trim();
    if (!value || sending) return;
    onSend(value);
    setText('');
  };

  return (
    <div className="flex flex-col h-full w-[480px] bg-surface border-[3px] border-ink shadow-brutal">

      <div className="bg-surface2 border-b-[3px] border-ink p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-mono font-bold text-fg">ENTREVISTA TÉCNICA</h2>
          <Chip>PREGUNTA {aiCount}</Chip>
        </div>
        <div className="flex gap-2 flex-wrap">
          {config?.target_role && <Chip>ROL: {config.target_role.toUpperCase()}</Chip>}
          {config?.technologies.map((t) => <Chip key={t}>{t.toUpperCase()}</Chip>)}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((m) => (
          <ChatBubble key={m.sequence} variante={m.sender === 'ai' ? 'ia' : 'user'}>
            {m.content}
            {m.code_snippet && (
              <pre className="mt-2 p-2 bg-base border-2 border-ink text-xs overflow-x-auto">{m.code_snippet}</pre>
            )}
          </ChatBubble>
        ))}
        {sending && <p className="font-mono text-xs text-muted">La IA está pensando_</p>}
      </div>

      <form onSubmit={handleSubmit} className="border-t-[3px] border-ink p-3 flex items-center gap-2">
        <div className="flex-1">
          <Input
            placeholder="Escribe tu respuesta_"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={sending}
          />
        </div>
        <Button type="submit" disabled={sending}>ENVIAR &gt;</Button>
      </form>

    </div>
  );
}
