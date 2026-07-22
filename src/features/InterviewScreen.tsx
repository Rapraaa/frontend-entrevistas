import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Flag } from 'lucide-react';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';
import { ChatPanel } from './ChatPanel';
import { EditorPanel } from './EditorPanel';
import { getInterview, sendMessage, finishInterview } from '../lib/interviews';
import { detectarLenguaje, buscarLenguaje } from '../lib/lenguajes';
import { ApiError } from '../lib/api';
import type { Interview } from '../lib/types';

export function InterviewScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState<Interview | null>(null);
  const [answer, setAnswer] = useState('');
  const [code, setCode] = useState('');
  const [lenguajeId, setLenguajeId] = useState('javascript');
  const lenguaje = buscarLenguaje(lenguajeId);
  const [sending, setSending] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getInterview(id)
      .then((datos) => {
        setInterview(datos);
        setLenguajeId(detectarLenguaje(datos.config.technologies).id);
      })
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : 'Error al cargar la entrevista'),
      );
  }, [id]);

  const handleSend = async () => {
    if (!id || sending) return;
    const content = answer.trim();
    const snippet = code.trim();
    if (!content && !snippet) return;
    setSending(true);
    setError('');
    try {
      const finalContent = content || `Envié mi solución en ${lenguaje.nombre}.`;
      const updated = await sendMessage(id, finalContent, snippet || undefined);
      setInterview(updated);
      setAnswer('');
      setCode('');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Error al enviar el mensaje');
    } finally {
      setSending(false);
    }
  };

  const handleFinish = async () => {
    if (!id) return;
    setFinishing(true);
    setError('');
    try {
      await finishInterview(id);
      navigate(`/resultado/${id}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Error al finalizar');
      setFinishing(false);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[640px] p-6 gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className="font-mono font-bold text-2xl text-fg uppercase">Entrevista</h1>
          <Chip tono="lila">
            MODO: {interview?.config.interview_type?.toUpperCase() ?? 'TÉCNICA'}
          </Chip>
        </div>
        <Button variante="secundario" onClick={handleFinish} disabled={finishing || !interview}>
          <span className="flex items-center gap-2">
            <Flag size={16} strokeWidth={3} /> {finishing ? 'FINALIZANDO...' : 'FINALIZAR'}
          </span>
        </Button>
      </div>

      {error && (
        <div className="p-3 border-2 border-ink bg-rojo text-ink font-mono font-bold">{error}</div>
      )}

      {interview ? (
        <div className="flex-1 flex gap-6 min-h-0 overflow-hidden">
          <ChatPanel
            messages={interview.chat_history}
            config={interview.config}
            value={answer}
            onChange={setAnswer}
            onSend={handleSend}
            sending={sending}
          />
          <EditorPanel
            value={code}
            onChange={setCode}
            onSubmit={handleSend}
            sending={sending}
            lenguaje={lenguaje}
            onLenguajeChange={setLenguajeId}
          />
        </div>
      ) : (
        !error && (
          <div className="flex-1 flex items-center justify-center font-mono text-muted">
            Cargando entrevista_
          </div>
        )
      )}
    </div>
  );
}
