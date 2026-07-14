import { SetupScreen } from '../features/SetupScreen';
import { useNavigate } from 'react-router-dom';

export function SetupPage() {
  const navigate = useNavigate();

  const handleStart = (_data: any) => {
    // Al recibir el payload de inicio, navegamos a la pantalla de la entrevista.
    // (Luego aquí podrías guardar "_data" en un contexto global de React).
    navigate('/interview');
  };

  return <SetupScreen onStart={handleStart} />;
}
