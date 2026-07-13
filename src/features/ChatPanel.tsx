import { ChatBubble } from '../ui/ChatBubble';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Chip } from '../ui/Chip';

export function ChatPanel() {
  return (
    <div className="flex flex-col h-[600px] w-[480px] bg-surface border-[3px] border-ink shadow-brutal">

      <div className="bg-surface2 border-b-[3px] border-ink p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-mono font-bold text-fg">ENTREVISTA TÉCNICA</h2>
          <Chip>PREGUNTA 3/10</Chip>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Chip>ROL: BACKEND JR</Chip>
          <Chip>NESTJS</Chip>
          <Chip>TYPESCRIPT</Chip>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        <ChatBubble variante="ia">
          Pregunta 3: ¿qué es la inyección de dependencias en NestJS y por qué el framework la usa?
        </ChatBubble>
        <ChatBubble variante="user">
          Es un patrón donde el framework crea las instancias y las provee donde se necesitan, en vez de que cada clase construya las suyas.
        </ChatBubble>
        <ChatBubble variante="ia">
          Correcto. Ahora demuéstralo: implementa un provider inyectable en el editor de la derecha.
        </ChatBubble>
      </div>

      <div className="border-t-[3px] border-ink p-3 flex items-center gap-2">
        <div className="flex-1">
          <Input placeholder="Escribe tu respuesta_" />
        </div>
        <Button>ENVIAR &gt;</Button>
      </div>

    </div>
  );
}
