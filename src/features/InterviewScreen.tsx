import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../ui/Navbar';
import { Avatar } from '../ui/Avatar';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';
import { ChatPanel } from './ChatPanel';
import { EditorPanel } from './EditorPanel';
import { getInterview, sendMessage, finishInterview } from '../lib/interviews';
import { ApiError } from '../lib/api';
import type { Interview } from '../lib/types';

export function InterviewScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState<Interview | null>(null);
  const [answer, setAnswer] = useState('');
  const [code, setCode] = useState('');
  const [sending, setSending] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getInterview(id)
      .then(setInterview)
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
      const finalContent = content || 'Envié mi solución en el editor.';
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
    <div className="flex flex-col h-screen bg-base">
      <Navbar>
        <Chip>MODO: {interview?.config.interview_type?.toUpperCase() ?? 'TÉCNICA'}</Chip>
        <Button variante="secundario" onClick={handleFinish} disabled={finishing || !interview}>
          {finishing ? 'FINALIZANDO...' : 'FINALIZAR'}
        </Button>
        <Avatar iniciales="RH" />
      </Navbar>

      {error && (
        <div className="m-4 p-3 border-2 border-ink bg-rojo text-ink font-mono font-bold">{error}</div>
      )}

      {interview ? (
        <div className="flex-1 flex gap-6 p-6 overflow-hidden">
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
