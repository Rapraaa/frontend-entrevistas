import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Flag, Save } from 'lucide-react';
import { Chip } from '../ui/Chip';
import { Modal } from '../ui/Modal';
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
  const [confirmando, setConfirmando] = useState(false);

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

  const respuestasDadas =
    interview?.chat_history.filter((m) => m.sender === 'user').length ?? 0;

  const handleFinish = async () => {
    if (!id) return;
    setConfirmando(false);
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
        <div className="flex items-center gap-2">
          <Button
            variante="secundario"
            onClick={() => navigate('/dashboard')}
            disabled={finishing}
          >
            <span className="flex items-center gap-2">
              <Save size={16} strokeWidth={3} /> GUARDAR Y SALIR
            </span>
          </Button>
          <Button
            variante="peligro"
            onClick={() => setConfirmando(true)}
            disabled={finishing || !interview}
          >
            <span className="flex items-center gap-2">
              <Flag size={16} strokeWidth={3} /> {finishing ? 'FINALIZANDO...' : 'FINALIZAR'}
            </span>
          </Button>
        </div>
      </div>

      {error && (
        <div role="alert" className="p-3 border-2 border-trazo bg-rojo text-ink font-mono font-bold">
          {error}
        </div>
      )}

      <Modal
        isOpen={confirmando}
        onClose={() => setConfirmando(false)}
        title="¿Terminar la entrevista?"
      >
        <p className="font-mono text-sm text-fg mb-2">
          Se evaluarán tus {respuestasDadas} {respuestasDadas === 1 ? 'respuesta' : 'respuestas'} y
          se generará el reporte final.
        </p>
        <p className="font-mono text-sm text-muted mb-6">
          No podrás seguir respondiendo en esta entrevista. Si solo quieres continuar más tarde, usa
          «Guardar y salir».
        </p>
        <div className="flex flex-wrap justify-end gap-3">
          <Button variante="secundario" onClick={() => setConfirmando(false)}>
            Seguir practicando
          </Button>
          <Button variante="peligro" onClick={handleFinish} disabled={finishing}>
            {finishing ? 'Finalizando...' : 'Sí, finalizar'}
          </Button>
        </div>
      </Modal>

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
